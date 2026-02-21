'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@/hooks/useUser'
import {
  Shield, Check, ArrowRight, Video, FileText, BookOpen, CreditCard,
  TrendingUp, TrendingDown, AlertTriangle, Clock, Calendar, ChevronRight,
} from 'lucide-react'
import { COMPLIANCE_OVERVIEW, UPCOMING_WEBINARS, canAccessTier } from '../data'

interface SubscriptionData {
  tierName: string
  displayName: string
  price: number
  interval: string
  features: string[]
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  status: string
}

interface ConsultingHoursData {
  quarterYear: string
  hoursAllotted: number
  hoursUsed: number
}

export default function CompliancePlusDashboard() {
  const { user, access, isLoading } = useUser()
  const router = useRouter()
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [consultingHours, setConsultingHours] = useState<ConsultingHoursData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
    if (!isLoading && user && access?.complianceMember?.status !== 'active') {
      router.push('/complianceplus')
    }
  }, [isLoading, user, access, router])

  useEffect(() => {
    if (!user) return
    Promise.all([
      fetch('/api/stripe/subscription').then(r => r.json()),
      fetch('/api/complianceplus/consulting-hours').then(r => r.json()),
    ]).then(([subData, hoursData]) => {
      setSubscription(subData.subscription)
      setConsultingHours(hoursData.hours)
    }).finally(() => setLoading(false))
  }, [user])

  if (isLoading || loading) {
    return (
      <div className="pt-32 pb-20 px-6 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user || !access?.complianceMember) return null

  const tier = access.complianceMember.tier
  const overview = COMPLIANCE_OVERVIEW
  const upcomingPreview = UPCOMING_WEBINARS.filter(w => canAccessTier(tier, w.tier)).slice(0, 2)

  const severityColor = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-black text-gray-900">
                Compliance+ Dashboard
              </h1>
              <span className="px-3 py-1 bg-[#dd8157] text-white text-xs font-bold rounded-full uppercase">
                {tier}
              </span>
            </div>
            <p className="text-lg text-gray-600">
              Welcome back, {user.firstName}. Here&apos;s your compliance overview.
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subscription Status */}
            {subscription && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Your Plan</h2>
                  <Link
                    href="/settings/billing"
                    className="text-sm text-[#dd8157] hover:text-[#c86d47] font-semibold flex items-center gap-1"
                  >
                    Manage <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#363b57]/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#363b57]" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {subscription.displayName}
                    </div>
                    <div className="text-sm text-gray-500">
                      ${(subscription.price / 100).toLocaleString()}/{subscription.interval === 'monthly' ? 'mo' : 'yr'}
                    </div>
                  </div>
                </div>

                {subscription.cancelAtPeriodEnd && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-yellow-800">
                      Your subscription will end on {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
                      <Link href="/settings/billing" className="ml-1 font-semibold text-yellow-900 hover:underline">
                        Reactivate
                      </Link>
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Renews {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {(subscription.features as string[]).slice(0, 6).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#dd8157] flex-shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Consulting Hours - Pro/Premium only */}
            {(tier === 'pro' || tier === 'premium') && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Consulting Hours</h2>
                  {consultingHours && (
                    <span className="text-sm text-gray-500">{consultingHours.quarterYear}</span>
                  )}
                </div>
                {consultingHours ? (
                  <>
                    <div className="flex items-end gap-2 mb-3">
                      <span className="text-3xl font-black text-gray-900">
                        {consultingHours.hoursUsed.toFixed(1)}
                      </span>
                      <span className="text-lg text-gray-500 mb-0.5">
                        / {consultingHours.hoursAllotted.toFixed(1)} hours
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                      <div
                        className="bg-[#363b57] h-3 rounded-full transition-all"
                        style={{ width: `${Math.min((consultingHours.hoursUsed / consultingHours.hoursAllotted) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      {(consultingHours.hoursAllotted - consultingHours.hoursUsed).toFixed(1)} hours remaining this quarter
                    </p>
                  </>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Your consulting hours for this quarter will be available once your first session is scheduled.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Compliance Overview (Demo) */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Compliance Overview</h2>
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded">Sample Data</span>
              </div>

              {/* CSA Score + Trend */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Overall CSA Score</div>
                  <div className="text-5xl font-black text-gray-900">{overview.csaScore}</div>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
                  overview.csaTrend === 'improving'
                    ? 'bg-green-100 text-green-700'
                    : overview.csaTrend === 'declining'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {overview.csaTrend === 'improving' ? (
                    <TrendingDown className="w-4 h-4" />
                  ) : (
                    <TrendingUp className="w-4 h-4" />
                  )}
                  {overview.csaTrend.charAt(0).toUpperCase() + overview.csaTrend.slice(1)}
                </div>
              </div>

              {/* Recent Violations */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Violations by BASIC</h3>
                <div className="grid grid-cols-2 gap-3">
                  {overview.recentViolations.map((v, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <span className="text-sm text-gray-700">{v.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">{v.count}</span>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded ${severityColor[v.severity]}`}>
                          {v.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Items */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Action Items</h3>
                <div className="space-y-2">
                  {overview.actionItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        item.priority === 'urgent' ? 'bg-red-500' : 'bg-gray-400'
                      }`} />
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">{item.text}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          Due {new Date(item.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { icon: Video, label: 'Webinars', desc: 'Live & recorded sessions', href: '/complianceplus/webinars', color: 'text-blue-600 bg-blue-50' },
                  { icon: FileText, label: 'Reports', desc: 'Compliance reports & CSA data', href: '/complianceplus/reports', color: 'text-green-600 bg-green-50' },
                  { icon: BookOpen, label: 'Resources', desc: 'Templates, guides & forms', href: '/complianceplus/resources', color: 'text-purple-600 bg-purple-50' },
                  { icon: CreditCard, label: 'Billing', desc: 'Manage subscription & payments', href: '/settings/billing', color: 'text-gray-600 bg-gray-100' },
                ].map((action) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">{action.label}</div>
                        <div className="text-xs text-gray-500">{action.desc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Upcoming Webinars */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Upcoming Webinars</h3>
                <Link href="/complianceplus/webinars" className="text-xs text-[#dd8157] hover:text-[#c86d47] font-semibold">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingPreview.map((webinar) => {
                  const d = new Date(webinar.date + 'T12:00:00')
                  return (
                    <div key={webinar.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0 text-center bg-[#dd8157] text-white rounded-lg p-2 w-12">
                        <div className="text-lg font-bold leading-none">{d.getDate()}</div>
                        <div className="text-[10px] uppercase">{d.toLocaleDateString('en-US', { month: 'short' })}</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 leading-snug">{webinar.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{webinar.time} &middot; {webinar.duration}</div>
                      </div>
                    </div>
                  )
                })}
                {upcomingPreview.length === 0 && (
                  <p className="text-sm text-gray-500">No upcoming webinars at this time.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
