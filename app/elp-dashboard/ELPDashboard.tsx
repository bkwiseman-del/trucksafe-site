'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Info,
  ExternalLink,
  Clock,
} from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface ELPData {
  last_updated: string
  total_oos: number
  total_all: number
  oos_rate: number
  avg_per_month: number
  peak_month: string
  peak_count: number
  mom_change: number
  monthly: {
    labels: string[]
    oos: number[]
    all: number[]
  }
  states: Array<{ state: string; oos: number; all: number }>
  state_monthly: Record<string, Record<string, { oos: number; all: number }>>
  biggest_movers: {
    increases: Array<{ state: string; change: number; current: number; previous: number }>
    decreases: Array<{ state: string; change: number; current: number; previous: number }>
  }
}

const TIMELINE_EVENTS = [
  {
    date: '2005',
    title: 'CVSA Adds ELP',
    description: '2005 FMCSA policy memorandum and CVSA update adds English Language Proficiency violations to Out-of-Service criteria.',
  },
  {
    date: '2015',
    title: 'CVSA Removes ELP',
    description: 'ELP violations removed from OOS criteria, leading to less strict enforcement for 10 years.',
  },
  {
    date: 'Apr 2025',
    title: 'Executive Order',
    description: 'Executive Order 14286 directs agencies to enforce existing English proficiency requirements for commercial drivers.',
    link: 'https://www.whitehouse.gov/presidential-actions/2025/04/enforcing-commonsense-rules-of-the-road-for-americas-truck-drivers/',
    linkText: 'Read Executive Order',
  },
  {
    date: 'May 2025',
    title: 'FMCSA Policy',
    description: 'FMCSA issues enforcement guidance reinforcing ELP requirements during roadside inspections.',
    link: 'https://www.fmcsa.dot.gov/sites/fmcsa.dot.gov/files/2025-05/FMCSA%20ELP%20Guidance%20with%20Attachments%20Final%20%285-20-2025%29_Redacted.pdf',
    linkText: 'View Policy Document (PDF)',
  },
  {
    date: 'Jun 2025',
    title: 'OOS Restored',
    description: 'CVSA restores ELP to Out-of-Service criteria effective June 25, 2025.',
    link: 'https://cvsa.org/news/elp-oosc/',
    linkText: 'Read CVSA Announcement',
  },
  {
    date: 'Feb 2026',
    title: 'Codified into Law',
    description: 'Congress codifies ELP enforcement into permanent federal law via FY2026 spending bill.',
    link: 'https://www.congress.gov/bill/119th-congress/house-bill/7148/text',
    linkText: 'Read Bill Text',
  },
]

const TIME_RANGE_OPTIONS = [
  { value: 'all', label: 'Since Jun 2025' },
  { value: '1', label: 'Last Month' },
  { value: '3', label: 'Last 3 Months' },
  { value: '6', label: 'Last 6 Months' },
  { value: '12', label: 'Last 12 Months' },
]

// Animated counter component (matches homepage pattern)
function AnimatedCounter({ end, duration = 1500, suffix = '', prefix = '' }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return
    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

export default function ELPDashboard({ data }: { data: ELPData }) {
  const [showOOS, setShowOOS] = useState(true)
  const [selectedState, setSelectedState] = useState('')
  const [timeRange, setTimeRange] = useState('all')
  const [activeTimelineEvent, setActiveTimelineEvent] = useState<number | null>(null)

  const stateList = useMemo(() => {
    return Object.keys(data.state_monthly).sort()
  }, [data.state_monthly])

  // Compute the MoM comparison label using last two FULL months (skip current incomplete month)
  const momLabel = useMemo(() => {
    const labels = data.monthly.labels
    if (labels.length >= 3) {
      return `${labels[labels.length - 2]} vs ${labels[labels.length - 3]}`
    }
    if (labels.length >= 2) {
      return `${labels[labels.length - 1]} vs ${labels[labels.length - 2]}`
    }
    return ''
  }, [data.monthly.labels])

  // Number of months with OOS data (for "Last N months" label on avg card)
  const monthsWithData = useMemo(() => {
    return data.monthly.oos.filter((v) => v > 0).length
  }, [data.monthly.oos])

  // Filtered labels for time range (minimum 2 so chart renders a line)
  const filteredLabels = useMemo(() => {
    if (timeRange === 'all') return data.monthly.labels
    const n = Math.max(parseInt(timeRange), 2)
    return data.monthly.labels.slice(-n)
  }, [timeRange, data.monthly.labels])

  const selectedStateData = useMemo(() => {
    if (!selectedState || !data.state_monthly[selectedState]) return null
    const stateData = data.state_monthly[selectedState]
    const months = filteredLabels
    const oos: number[] = []
    const all: number[] = []
    months.forEach((label) => {
      const entry = stateData[label]
      oos.push(entry?.oos ?? 0)
      all.push(entry?.all ?? 0)
    })

    const totalOOS = oos.reduce((a, b) => a + b, 0)
    const totalAll = all.reduce((a, b) => a + b, 0)

    // Compute rank from ALL states in state_monthly by total OOS (descending)
    const allStateOOS = Object.entries(data.state_monthly)
      .filter(([st]) => st.toUpperCase() !== 'US')
      .map(([st, months]) => ({
        state: st,
        oos: Object.values(months).reduce((sum, m) => sum + (m.oos ?? 0), 0),
      }))
      .sort((a, b) => b.oos - a.oos)
    const rank = allStateOOS.findIndex((s) => s.state === selectedState) + 1

    const lastMonth = oos[oos.length - 1] ?? 0
    const prevMonth = oos[oos.length - 2] ?? 0
    const trend = prevMonth > 0 ? ((lastMonth - prevMonth) / prevMonth) * 100 : 0

    return { months, oos, all, totalOOS, totalAll, rank: rank > 0 ? rank : null, trend }
  }, [selectedState, data, filteredLabels])

  return (
    <div className="space-y-8 -mt-10 relative z-10">
      {/* Data Freshness Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#363b57]/10 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-[#363b57]" />
          </div>
          <div className="text-sm text-gray-600">
            Source data last updated by FMCSA on <span className="font-semibold text-[#363b57]">{data.last_updated}</span>.
            FMCSA updates enforcement data daily.
          </div>
        </div>
        <a
          href="https://data.transportation.gov"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#dd8157] hover:underline shrink-0"
        >
          View Source <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* About This Dashboard */}
      <div className="bg-gradient-to-r from-[#363b57] to-[#2a2e42] text-white rounded-xl shadow-xl p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-3">About This Dashboard</h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              This dashboard tracks <strong className="text-white">English Language Proficiency (ELP)</strong> violations
              under 49 CFR 391.11(b)(2), which requires commercial motor vehicle drivers to read and speak English
              sufficiently to converse with the general public, understand highway traffic signs, respond to official
              inquiries, and make entries on reports and records.
            </p>
            <p className="text-white/80 mb-4 leading-relaxed">
              Following <strong className="text-white">Executive Order 14286</strong> (April 2025), the restoration
              of ELP to Out-of-Service criteria (June 25, 2025), and Congressional codification in the FY2026 spending
              bill, enforcement has intensified dramatically.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://data.transportation.gov/Trucking-and-Motorcoaches/Vehicle-Inspections-and-Violations/876r-jsdb/about_data"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                <BarChart3 className="w-4 h-4" />
                View Raw FMCSA Data
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.trucksafe.com/post/trump-cracks-down-on-english-proficiency-among-truck-drivers-in-new-executive-order"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                <ExternalLink className="w-4 h-4" />
                Read Full Analysis
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/QWXvrCsjjFQ?start=137"
                title="ELP Enforcement Explained"
                width="100%"
                height="200"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="block"
              />
            </div>
            <p className="text-xs text-white/50 mt-2 text-center">Expert analysis by Trucksafe Consulting</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KPICard
          label="Total OOS"
          numericValue={data.total_oos}
          description={`Since ${data.monthly.labels[0]}`}
          icon={<AlertTriangle className="w-5 h-5" />}
          accent
        />
        <KPICard
          label="Month over Month"
          numericValue={Math.abs(data.mom_change)}
          suffix="%"
          prefix={data.mom_change > 0 ? '+' : data.mom_change < 0 ? '-' : ''}
          description={momLabel}
          icon={data.mom_change >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          trend={data.mom_change >= 0 ? 'up' : 'down'}
        />
        <KPICard
          label="Avg per Month"
          numericValue={data.avg_per_month}
          description={`Last ${monthsWithData} months`}
          icon={<Activity className="w-5 h-5" />}
        />
        <KPICard
          label="Peak Month"
          textValue={data.peak_month}
          description={`${data.peak_count.toLocaleString()} violations`}
          icon={<BarChart3 className="w-5 h-5" />}
        />
      </div>

      {/* Regulatory Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Regulatory Timeline</h2>
        {/* Desktop horizontal */}
        <div className="hidden md:block relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />
          <div className="flex justify-between relative">
            {TIMELINE_EVENTS.map((event, i) => (
              <div key={i} className="flex flex-col items-center relative" style={{ width: `${100 / TIMELINE_EVENTS.length}%` }}>
                <button
                  onClick={() => setActiveTimelineEvent(activeTimelineEvent === i ? null : i)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all z-10 ${
                    activeTimelineEvent === i
                      ? 'bg-[#dd8157] border-[#dd8157] text-white scale-110'
                      : 'bg-white border-[#363b57] text-[#363b57] hover:border-[#dd8157] hover:text-[#dd8157]'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-current" />
                </button>
                <span className="text-xs font-semibold text-gray-500 mt-2 text-center">{event.date}</span>
                <span className="text-xs text-gray-700 mt-1 text-center font-medium leading-tight px-1">{event.title}</span>
                {activeTimelineEvent === i && (
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-[#363b57] text-white rounded-lg p-4 shadow-xl z-20 w-72 text-sm">
                    <p className="text-white/90 leading-relaxed">{event.description}</p>
                    {event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#dd8157] text-xs mt-3 hover:underline font-semibold"
                      >
                        {event.linkText} <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Mobile vertical */}
        <div className="md:hidden space-y-4">
          {TIMELINE_EVENTS.map((event, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#363b57] shrink-0 mt-1.5" />
                {i < TIMELINE_EVENTS.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-1" />}
              </div>
              <div className="pb-4">
                <span className="text-xs font-semibold text-[#dd8157]">{event.date}</span>
                <h3 className="text-sm font-bold text-gray-900">{event.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{event.description}</p>
                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#dd8157] text-xs mt-1 hover:underline font-semibold"
                  >
                    {event.linkText} <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle + Monthly Trend */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Monthly Trend</h2>
          <div className="inline-flex bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setShowOOS(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                showOOS ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              OOS Violations
            </button>
            <button
              onClick={() => setShowOOS(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                !showOOS ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Violations
            </button>
          </div>
        </div>
        <div className="h-[350px]">
          <Line
            key={showOOS ? 'oos' : 'all'}
            data={{
              labels: data.monthly.labels,
              datasets: [
                {
                  label: showOOS ? 'OOS Violations' : 'All Violations',
                  data: showOOS ? data.monthly.oos : data.monthly.all,
                  borderColor: showOOS ? '#363b57' : '#dd8157',
                  backgroundColor: showOOS ? 'rgba(54, 59, 87, 0.08)' : 'rgba(221, 129, 87, 0.08)',
                  borderWidth: 3,
                  fill: true,
                  tension: 0.4,
                  pointRadius: 5,
                  pointBackgroundColor: showOOS ? '#363b57' : '#dd8157',
                  pointBorderColor: '#fff',
                  pointBorderWidth: 2,
                  pointHoverRadius: 8,
                  pointHoverBackgroundColor: '#dd8157',
                  pointHoverBorderColor: '#fff',
                  pointHoverBorderWidth: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: '#363b57',
                  titleFont: { size: 13, weight: 'bold' },
                  bodyFont: { size: 12 },
                  padding: 12,
                  cornerRadius: 8,
                  callbacks: {
                    label: (ctx) => `${ctx.parsed.y.toLocaleString()} violations`,
                  },
                },
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { font: { size: 11 }, color: '#9ca3af' },
                },
                y: {
                  grid: { color: 'rgba(0,0,0,0.05)' },
                  ticks: {
                    font: { size: 11 },
                    color: '#9ca3af',
                    callback: (value) => Number(value).toLocaleString(),
                  },
                },
              },
            }}
          />
        </div>
        <div className="mt-4 flex items-start gap-2 bg-[#dd8157]/5 border border-[#dd8157]/20 rounded-lg p-4">
          <Info className="w-4 h-4 text-[#dd8157] shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Key Insight:</span> OOS violations surged after CVSA
            restored ELP to Out-of-Service criteria in June 2025, going from near-zero to over{' '}
            {data.peak_count.toLocaleString()} in {data.peak_month}.
          </p>
        </div>
      </div>

      {/* Top States + Biggest Movers side by side */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top 10 States */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Top 10 States — {showOOS ? 'OOS' : 'All'} Violations
          </h2>
          <div className="space-y-3">
            {data.states
              .filter((s) => s.state.toUpperCase() !== 'US')
              .slice(0, 10)
              .map((state, i) => {
                const maxVal = data.states.filter((s) => s.state.toUpperCase() !== 'US')[0]
                const max = showOOS ? maxVal.oos : maxVal.all
                const val = showOOS ? state.oos : state.all
                const pct = max > 0 ? (val / max) * 100 : 0
                return (
                  <div key={state.state} className="flex items-center gap-3">
                    <span className="w-6 text-sm font-bold text-[#363b57] text-right">{i + 1}</span>
                    <span className="w-10 text-sm font-bold text-gray-700">{state.state}</span>
                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#363b57] to-[#5a6094] rounded-lg flex items-center justify-end px-3 transition-all duration-500"
                        style={{ width: `${Math.max(pct, 8)}%` }}
                      >
                        <span className="text-white text-xs font-semibold whitespace-nowrap">
                          {val.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Biggest Movers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Biggest Movers (Month-over-Month)</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Largest Increases
              </h3>
              <div className="space-y-2">
                {data.biggest_movers.increases.map((mover) => (
                  <div
                    key={mover.state}
                    className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <ArrowUpRight className="w-5 h-5 text-red-500" />
                      <span className="font-bold text-gray-900">{mover.state}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-red-600 font-bold text-sm">
                        +{Math.abs(mover.change).toFixed(1)}%
                      </span>
                      <span className="text-gray-500 text-xs ml-2">
                        {mover.previous} → {mover.current}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Largest Decreases
              </h3>
              <div className="space-y-2">
                {data.biggest_movers.decreases.map((mover) => (
                  <div
                    key={mover.state}
                    className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <ArrowDownRight className="w-5 h-5 text-green-500" />
                      <span className="font-bold text-gray-900">{mover.state}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-green-600 font-bold text-sm">
                        {mover.change.toFixed(1)}%
                      </span>
                      <span className="text-gray-500 text-xs ml-2">
                        {mover.previous} → {mover.current}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* State Detail Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">State Detail Analysis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* State selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Select State
            </label>
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="appearance-none block w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent text-sm bg-white"
              >
                <option value="">Choose a state...</option>
                {stateList.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          {/* Time range selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Time Range
            </label>
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none block w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent text-sm bg-white"
              >
                {TIME_RANGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {selectedState && selectedStateData ? (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatBox label="Total Violations" value={selectedStateData.totalAll.toLocaleString()} />
              <StatBox label="OOS Violations" value={selectedStateData.totalOOS.toLocaleString()} />
              <StatBox
                label="Trend"
                value={`${selectedStateData.trend >= 0 ? '+' : ''}${selectedStateData.trend.toFixed(1)}%`}
                color={selectedStateData.trend >= 0 ? 'text-red-600' : 'text-green-600'}
              />
              <StatBox label="National Rank" value={selectedStateData.rank ? `#${selectedStateData.rank}` : '—'} />
            </div>
            {/* State chart */}
            <div className="h-[300px]">
              <Line
                key={`${selectedState}-${timeRange}`}
                data={{
                  labels: filteredLabels,
                  datasets: [
                    {
                      label: 'OOS Violations',
                      data: selectedStateData.oos,
                      borderColor: '#363b57',
                      backgroundColor: 'rgba(54, 59, 87, 0.08)',
                      borderWidth: 2,
                      fill: false,
                      tension: 0.4,
                      pointRadius: 4,
                      pointBackgroundColor: '#363b57',
                    },
                    {
                      label: 'All Violations',
                      data: selectedStateData.all,
                      borderColor: '#dd8157',
                      backgroundColor: 'rgba(221, 129, 87, 0.08)',
                      borderWidth: 2,
                      fill: false,
                      tension: 0.4,
                      pointRadius: 4,
                      pointBackgroundColor: '#dd8157',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: { usePointStyle: true, pointStyle: 'circle', padding: 20 },
                    },
                    tooltip: {
                      backgroundColor: '#363b57',
                      titleFont: { size: 13, weight: 'bold' },
                      bodyFont: { size: 12 },
                      padding: 12,
                      cornerRadius: 8,
                      callbacks: {
                        label: (ctx) =>
                          `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()} violations`,
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      ticks: { font: { size: 11 }, color: '#9ca3af' },
                    },
                    y: {
                      grid: { color: 'rgba(0,0,0,0.05)' },
                      ticks: {
                        font: { size: 11 },
                        color: '#9ca3af',
                        callback: (value) => Number(value).toLocaleString(),
                      },
                    },
                  },
                }}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Select a state above to view detailed analysis</p>
          </div>
        )}
      </div>

      {/* Footer attribution */}
      <div className="text-center space-y-2 pb-4">
        <p className="text-xs text-gray-400">
          Data sourced from the FMCSA Motor Carrier Management Information System (MCMIS) via{' '}
          <a
            href="https://data.transportation.gov/Trucking-and-Motorcoaches/Vehicle-Inspections-and-Violations/876r-jsdb/about_data"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dd8157] hover:underline"
          >
            data.transportation.gov
          </a>
          . Updated daily.
        </p>
        <p className="text-xs text-gray-400">
          <a
            href="https://www.trucksafe.com/post/trump-cracks-down-on-english-proficiency-among-truck-drivers-in-new-executive-order"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dd8157] hover:underline"
          >
            Read Full Analysis
          </a>
        </p>
      </div>
    </div>
  )
}

function KPICard({
  label,
  numericValue,
  textValue,
  description,
  suffix = '',
  prefix = '',
  icon,
  accent,
  trend,
}: {
  label: string
  numericValue?: number
  textValue?: string
  description?: string
  suffix?: string
  prefix?: string
  icon: React.ReactNode
  accent?: boolean
  trend?: 'up' | 'down'
}) {
  return (
    <div
      className={`rounded-xl border p-5 md:p-6 transition-all hover:shadow-lg ${
        accent
          ? 'bg-[#363b57] border-[#363b57] text-white'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            accent ? 'text-white/60' : 'text-gray-500'
          }`}
        >
          {label}
        </span>
        <div className={accent ? 'text-[#dd8157]' : 'text-[#363b57]/40'}>{icon}</div>
      </div>
      <div
        className={`text-2xl md:text-3xl font-black ${
          accent
            ? 'text-white'
            : trend === 'up'
            ? 'text-red-600'
            : trend === 'down'
            ? 'text-green-600'
            : 'text-[#363b57]'
        }`}
      >
        {numericValue !== undefined ? (
          <AnimatedCounter end={numericValue} prefix={prefix} suffix={suffix} />
        ) : (
          textValue
        )}
      </div>
      {description && (
        <div className={`text-sm mt-1 ${accent ? 'text-white/60' : 'text-gray-500'}`}>{description}</div>
      )}
    </div>
  )
}

function StatBox({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color?: string
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-xl font-black ${color || 'text-[#363b57]'}`}>{value}</div>
    </div>
  )
}
