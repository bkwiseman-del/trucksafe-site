'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Shield, ArrowLeft, Lock } from 'lucide-react'
import Link from 'next/link'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface TierInfo {
  id: string
  name: string
  displayName: string
  price: number
  interval: string
  features: string[]
}

function CheckoutForm({ tierInfo }: { tierInfo: TierInfo }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)
    setError('')

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message || 'Payment validation failed')
      setProcessing(false)
      return
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/complianceplus/success`,
      },
    })

    if (confirmError) {
      setError(confirmError.message || 'Payment failed. Please try again.')
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-3 px-6 text-white font-bold rounded-xl bg-[#dd8157] hover:bg-[#c86d47] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : `Subscribe — $${(tierInfo.price / 100).toLocaleString()}/${tierInfo.interval === 'monthly' ? 'mo' : 'yr'}`}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
        <Lock className="w-3.5 h-3.5" />
        <span>Secured by Stripe. Your card info never touches our servers.</span>
      </div>
    </form>
  )
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, isLoading: authLoading } = useUser()
  const [tierInfo, setTierInfo] = useState<TierInfo | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const initRef = useRef(false)

  const tierId = searchParams.get('tierId')

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.push('/login')
      return
    }
    if (!tierId) {
      router.push('/complianceplus')
      return
    }
    // Prevent double-initialization (React StrictMode, HMR, webhook-triggered re-renders)
    if (initRef.current) return
    initRef.current = true

    async function initCheckout() {
      try {
        // Fetch tier info
        const tiersRes = await fetch('/api/stripe/tiers')
        if (tiersRes.ok) {
          const tiers = await tiersRes.json()
          for (const tier of tiers) {
            if (tier.monthly?.id === tierId) {
              setTierInfo({ ...tier.monthly, displayName: tier.displayName, name: tier.displayName, features: tier.features, interval: 'monthly' })
              break
            }
            if (tier.annual?.id === tierId) {
              setTierInfo({ ...tier.annual, displayName: tier.displayName, name: tier.displayName, features: tier.features, interval: 'yearly' })
              break
            }
          }
        }

        // Create subscription and get client secret
        const res = await fetch('/api/stripe/create-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tierId }),
        })

        const text = await res.text()
        let data
        try {
          data = JSON.parse(text)
        } catch {
          console.error('Non-JSON response from create-subscription:', text.substring(0, 500))
          setError('Server error. Please try again.')
          return
        }

        if (!res.ok) {
          // If user already has an active subscription, redirect to success page
          // (this happens when payment went through but redirect didn't fire)
          if (res.status === 400 && data.error?.includes('active subscription')) {
            router.push('/complianceplus/success')
            return
          }
          setError(data.error || 'Failed to initialize checkout')
          return
        }

        setClientSecret(data.clientSecret)
      } catch (err) {
        console.error('Checkout init error:', err)
        setError('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    initCheckout()
  }, [authLoading, user?.id, tierId, router])

  if (authLoading || loading) {
    return (
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-lg mx-auto flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8">
            <p className="text-red-700 mb-4">{error}</p>
            <Link
              href="/complianceplus"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#dd8157] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to plans
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-16 px-6">
      <div className="max-w-lg mx-auto">
        <Link
          href="/complianceplus"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#dd8157] transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to plans
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Order Summary */}
          {tierInfo && (
            <div className="p-6 bg-[#363b57] text-white">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-[#dd8157]" />
                <h1 className="text-xl font-black">
                  Compliance+ {tierInfo.displayName}
                </h1>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black">
                  ${(tierInfo.price / 100).toLocaleString()}
                </span>
                <span className="text-white/70">
                  /{tierInfo.interval === 'monthly' ? 'month' : 'year'}
                </span>
              </div>
              {tierInfo.interval === 'yearly' && (
                <p className="text-sm text-white/60 mt-1">
                  Billed annually (2 months free)
                </p>
              )}
            </div>
          )}

          {/* Payment Form */}
          <div className="p-6">
            {clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#dd8157',
                      borderRadius: '8px',
                    },
                  },
                }}
              >
                <CheckoutForm tierInfo={tierInfo!} />
              </Elements>
            ) : (
              <div className="flex items-center justify-center h-32">
                <div className="w-6 h-6 border-3 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-12 px-6">
          <div className="max-w-lg mx-auto flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
