import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ELPDashboard from './ELPDashboard'

export const metadata = {
  title: 'ELP Violation Tracker - Trucksafe',
  description: 'Track FMCSA English Language Proficiency (ELP) violation enforcement data across all 50 states. Real-time dashboard powered by federal MCMIS data.',
}

export const revalidate = 3600

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

async function getELPData(): Promise<ELPData | null> {
  try {
    const res = await fetch(
      'https://bkwiseman-del.github.io/elp-dashboard-data/elp_data.json',
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function ELPDashboardPage() {
  const data = await getELPData()

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navigation />

      {/* Full-width Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-br from-[#363b57] to-[#2a2e42]">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/semitruckcrossingamericanwestwilderness20260108235953utc.jpeg"
            alt="Semi truck on highway"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <svg className="w-4 h-4 text-[#dd8157]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-semibold text-white">FMCSA Enforcement Data</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              ELP Violation<br />Tracker
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Tracking FMCSA enforcement of English Language Proficiency requirements
              (49 CFR §391.11(b)(2)) for commercial motor vehicle drivers across all 50 states.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <div className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {data ? (
            <ELPDashboard data={data} />
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Unable to load dashboard data. Please try again later.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
