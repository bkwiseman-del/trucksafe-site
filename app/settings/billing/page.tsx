'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useUser } from '@/hooks/useUser'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import {
  CreditCard,
  Calendar,
  ArrowUpRight,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
  RefreshCw,
} from 'lucide-react'

interface SubscriptionData {
  id: string
  status: string
  tierName: string
  displayName: string
  price: number
  interval: string
  features: string[]
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  minimumTermEnd: string | null
  minimumTermMonths: number
}

interface PaymentRecord {
  id: string
  amount: number
  currency: string
  status: string
  description: string
  createdAt: string
}

interface BillingRecord {
  id: string
  description: string
  amount: number
  currency: string
  status: string
  date: string
  pdfUrl: string | null
  receiptUrl: string | null
}

export default function BillingPage() {
  const { user, access, isLoading: authLoading } = useUser()
  const { update } = useSession()
  const router = useRouter()

  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [billingHistory, setBillingHistory] = useState<BillingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [canceling, setCanceling] = useState(false)
  const [reactivating, setReactivating] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [actionError, setActionError] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }
    if (user) fetchData()
  }, [authLoading, user?.id])

  async function fetchData() {
    try {
      const [subRes, histRes] = await Promise.all([
        fetch('/api/stripe/subscription'),
        fetch('/api/stripe/billing-history'),
      ])

      if (subRes.ok) {
        const data = await subRes.json()
        setSubscription(data.subscription)
      }

      if (histRes.ok) {
        const data = await histRes.json()
        setBillingHistory(data.billingHistory || [])
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async () => {
    setCanceling(true)
    setActionError('')
    try {
      const res = await fetch('/api/stripe/cancel-subscription', { method: 'POST' })
      if (!res.ok) {
        const data = await res.json()
        setActionError(data.error || 'Failed to cancel')
        return
      }
      setShowCancelModal(false)
      await fetchData()
    } catch {
      setActionError('Something went wrong')
    } finally {
      setCanceling(false)
    }
  }

  const handleReactivate = async () => {
    setReactivating(true)
    setActionError('')
    try {
      const res = await fetch('/api/stripe/reactivate-subscription', { method: 'POST' })
      if (!res.ok) {
        const data = await res.json()
        setActionError(data.error || 'Failed to reactivate')
        return
      }
      await fetchData()
      await update()
    } catch {
      setActionError('Something went wrong')
    } finally {
      setReactivating(false)
    }
  }

  const handleManagePayment = async () => {
    try {
      const res = await fetch('/api/stripe/create-portal-session', { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        window.open(data.url, '_blank')
      }
    } catch {
      // silently fail
    }
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
            <CheckCircle className="w-3 h-3" /> Active
          </span>
        )
      case 'past_due':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
            <AlertCircle className="w-3 h-3" /> Past Due
          </span>
        )
      case 'canceled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
            <XCircle className="w-3 h-3" /> Canceled
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full">
            <Clock className="w-3 h-3" /> {status}
          </span>
        )
    }
  }

  if (authLoading || loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navigation />
        <div className="pt-32 pb-12 px-6">
          <div className="max-w-3xl mx-auto flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navigation />
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Billing</h1>
            <p className="text-gray-500 mt-1">Manage your subscription and payment details</p>
          </div>
          <Link
            href="/settings"
            className="text-sm text-gray-500 hover:text-[#dd8157] transition"
          >
            Back to Settings
          </Link>
        </div>

        {actionError && (
          <div className="p-3 mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
            {actionError}
          </div>
        )}

        {/* Current Plan */}
        {subscription && ['active', 'trialing', 'past_due'].includes(subscription.status) ? (
          <div className="bg-white rounded-xl border border-gray-200 mb-6">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Current Plan</h2>
                {statusBadge(subscription.status)}
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-black text-gray-900">
                  Compliance+ {subscription.displayName}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#dd8157]">
                  ${(subscription.price / 100).toLocaleString()}
                </span>
                <span className="text-gray-500">
                  /{subscription.interval === 'monthly' ? 'month' : 'year'}
                </span>
              </div>

              {subscription.cancelAtPeriodEnd && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Subscription cancels on{' '}
                      {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      You&apos;ll keep access until then.
                    </p>
                    <button
                      onClick={handleReactivate}
                      disabled={reactivating}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-yellow-800 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${reactivating ? 'animate-spin' : ''}`} />
                      {reactivating ? 'Reactivating...' : 'Keep Subscription'}
                    </button>
                  </div>
                </div>
              )}

              {subscription.status === 'past_due' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">
                    Your last payment failed. Please update your payment method to keep your subscription active.
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 flex items-center gap-4 text-sm text-gray-500 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Next billing:{' '}
                {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              {subscription.minimumTermEnd && new Date(subscription.minimumTermEnd) > new Date() && (
                <span className="flex items-center gap-1.5 text-[#dd8157]">
                  <Clock className="w-4 h-4" />
                  {subscription.minimumTermMonths}-month commitment through{' '}
                  {new Date(subscription.minimumTermEnd).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex flex-wrap gap-3">
              <Link
                href="/complianceplus"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#dd8157] hover:bg-[#c86d47] rounded-lg transition"
              >
                <ArrowUpRight className="w-4 h-4" />
                Change Plan
              </Link>
              <button
                onClick={handleManagePayment}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                <CreditCard className="w-4 h-4" />
                Manage Payment Method
              </button>
              {!subscription.cancelAtPeriodEnd && (
                subscription.minimumTermEnd && new Date(subscription.minimumTermEnd) > new Date() ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 rounded-lg cursor-not-allowed" title={`${subscription.minimumTermMonths}-month minimum commitment — cancellation available after ${new Date(subscription.minimumTermEnd).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}>
                    Cancel Subscription
                  </span>
                ) : (
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                  >
                    Cancel Subscription
                  </button>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center mb-6">
            <CreditCard className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-gray-900 mb-2">No Active Subscription</h2>
            <p className="text-gray-500 mb-6">
              Subscribe to Compliance+ for compliance tools, resources, and expert support.
            </p>
            <Link
              href="/complianceplus"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#dd8157] hover:bg-[#c86d47] rounded-lg transition"
            >
              View Plans
            </Link>
          </div>
        )}

        {/* Billing History */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Billing History</h2>
          </div>

          {billingHistory.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No billing history yet.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {billingHistory.map((record) => (
                <div key={record.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{record.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-900">
                      ${record.amount.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded ${
                        record.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : record.status === 'failed'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {record.status}
                    </span>
                    {(record.receiptUrl || record.pdfUrl) && (
                      <a
                        href={record.receiptUrl || record.pdfUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#dd8157] transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cancel Modal */}
        {showCancelModal && (
          <>
            <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowCancelModal(false)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">Cancel Subscription?</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Your subscription will remain active until the end of your current billing period on{' '}
                  <strong>
                    {subscription &&
                      new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                  </strong>
                  . After that, you&apos;ll lose access to Compliance+ features.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCancel}
                    disabled={canceling}
                    className="px-5 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition disabled:opacity-50"
                  >
                    {canceling ? 'Canceling...' : 'Yes, Cancel'}
                  </button>
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  >
                    Keep Subscription
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      </div>
      <Footer />
    </div>
  )
}
