'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@/hooks/useUser'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { FileText, Lock, Download, TrendingDown, BarChart3, Star } from 'lucide-react'
import {
  CSA_SCORE_TREND,
  COMPLIANCE_OVERVIEW,
  MONTHLY_REPORTS,
  canAccessTier,
} from '../data'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function ReportsPage() {
  const { user, access, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) router.push('/login')
    if (!isLoading && user && access?.complianceMember?.status !== 'active') router.push('/complianceplus')
  }, [isLoading, user, access, router])

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 px-6 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user || !access?.complianceMember) return null

  const tier = access.complianceMember.tier
  const data = CSA_SCORE_TREND
  const overview = COMPLIANCE_OVERVIEW

  const severityColor: Record<string, string> = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Unsafe Driving',
        data: data.unsafe,
        borderColor: '#ef4444',
        backgroundColor: '#ef444420',
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Hours of Service',
        data: data.hos,
        borderColor: '#dd8157',
        backgroundColor: '#dd815720',
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Vehicle Maintenance',
        data: data.vehicleMaint,
        borderColor: '#363b57',
        backgroundColor: '#363b5720',
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Driver Fitness',
        data: data.driverFitness,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f620',
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Controlled Substances',
        data: data.controlledSubstances,
        borderColor: '#22c55e',
        backgroundColor: '#22c55e20',
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: '#363b57',
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'BASIC Percentile',
          font: { size: 12 },
          color: '#6b7280',
        },
        grid: { color: '#f3f4f6' },
        ticks: { color: '#6b7280' },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280' },
      },
    },
  }

  const tierLabel: Record<string, string> = { pro: 'Pro', premium: 'Premium' }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Compliance Reports</h1>
          <p className="text-lg text-gray-600">
            Track your CSA scores, violation trends, and monthly compliance performance.
          </p>
        </div>

        {/* CSA Score Trend Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">CSA Score Trends</h2>
              <p className="text-sm text-gray-500">BASIC category percentiles over time</p>
            </div>
            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded">Sample Data</span>
          </div>
          <div className="h-[350px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Violation Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Violation Breakdown</h2>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-700">
              <TrendingDown className="w-4 h-4" />
              Improving
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {overview.recentViolations.map((v, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{v.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900">{v.count}</span>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded ${severityColor[v.severity]}`}>
                    {v.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Reports */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Monthly Reports</h2>
          <div className="space-y-4">
            {MONTHLY_REPORTS.map((report) => {
              const hasAccess = canAccessTier(tier, report.tier)
              return (
                <div
                  key={report.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border border-gray-100 ${
                    hasAccess ? 'hover:bg-gray-50' : 'bg-gray-50/50'
                  } transition`}
                >
                  <div className="p-2 bg-[#363b57]/10 rounded-lg flex-shrink-0">
                    <FileText className="w-5 h-5 text-[#363b57]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-gray-900">{report.title}</h3>
                      {report.tier !== 'all' && (
                        <span className="px-2 py-0.5 bg-[#dd8157]/10 text-[#dd8157] text-xs font-bold rounded uppercase">
                          {tierLabel[report.tier]}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{report.summary}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {hasAccess ? (
                      <button className="flex items-center gap-1.5 px-3 py-2 bg-[#363b57] hover:bg-[#2a2f47] text-white rounded-lg text-sm font-semibold transition">
                        <Download className="w-4 h-4" />
                        View
                      </button>
                    ) : (
                      <Link
                        href="/complianceplus"
                        className="flex items-center gap-1.5 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg text-sm font-semibold hover:bg-gray-300 transition"
                      >
                        <Lock className="w-4 h-4" />
                        Upgrade
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pro/Premium Advanced Analytics */}
        {(tier === 'pro' || tier === 'premium') && (
          <div className="bg-gradient-to-br from-[#363b57] to-[#2a2e42] rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Star className="w-6 h-6 text-[#dd8157]" />
              <h2 className="text-lg font-bold">Advanced Analytics</h2>
            </div>
            <p className="text-white/80 text-sm mb-4">
              {tier === 'premium'
                ? 'As a Premium member, you have access to custom fleet analysis reports, driver-level breakdowns, and predictive compliance scoring. Contact your account manager to request a custom report.'
                : 'As a Pro member, you have access to expanded BASIC category analysis and quarterly trend comparisons. Upgrade to Premium for custom fleet analysis.'}
            </p>
            {tier === 'premium' ? (
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#dd8157] hover:bg-[#c86d47] text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Request Custom Report
              </Link>
            ) : (
              <Link
                href="/complianceplus"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Upgrade to Premium
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
