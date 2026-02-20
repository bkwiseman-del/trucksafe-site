'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/hooks/useUser'
import Link from 'next/link'
import { Check, Crown, Shield, Zap, ArrowRight } from 'lucide-react'

interface TierGroup {
  displayName: string
  features: string[]
  monthly: { id: string; price: number } | null
  annual: { id: string; price: number } | null
}

const TIER_META: Record<string, { icon: typeof Shield; color: string; description: string; popular?: boolean }> = {
  Basic: {
    icon: Shield,
    color: '#363b57',
    description: 'Essential compliance tools for small fleets',
  },
  Pro: {
    icon: Zap,
    color: '#dd8157',
    description: 'Advanced support with consulting hours',
    popular: true,
  },
  Premium: {
    icon: Crown,
    color: '#363b57',
    description: 'Full-service compliance partnership',
  },
}

export default function CompliancePlusPage() {
  const { user, access, isLoading } = useUser()
  const [tiers, setTiers] = useState<TierGroup[]>([])
  const [interval, setInterval] = useState<'monthly' | 'annual'>('monthly')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTiers() {
      try {
        const res = await fetch('/api/stripe/tiers')
        if (res.ok) {
          const data = await res.json()
          setTiers(data)
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    fetchTiers()
  }, [])

  const currentTier = access?.complianceMember?.tier

  return (
    <div className="pt-32 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#dd8157]/10 border border-[#dd8157]/20 rounded-full mb-6">
            <span className="text-sm font-bold text-[#dd8157]">COMPLIANCE+</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive compliance support tailored to your fleet&apos;s needs.
            All plans include Trucksafe Network membership.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${interval === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setInterval(interval === 'monthly' ? 'annual' : 'monthly')}
            className="relative w-14 h-7 rounded-full bg-gray-200 transition"
          >
            <div
              className={`absolute top-0.5 w-6 h-6 rounded-full bg-[#dd8157] transition-transform ${
                interval === 'annual' ? 'translate-x-7' : 'translate-x-0.5'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${interval === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
            Annual
          </span>
          {interval === 'annual' && (
            <span className="inline-block px-3 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full">
              Save 2 months free
            </span>
          )}
        </div>

        {/* Tier Cards */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {tiers.map((tier) => {
              const meta = TIER_META[tier.displayName] || TIER_META.Basic
              const Icon = meta.icon
              const price = interval === 'monthly' ? tier.monthly : tier.annual
              const monthlyEquivalent = interval === 'annual' && price
                ? Math.round(price.price / 12)
                : null
              const isCurrentTier = currentTier === tier.displayName.toLowerCase()
              const monthlySavings = interval === 'annual' && tier.monthly && price
                ? (tier.monthly.price * 12) - price.price
                : 0

              return (
                <div
                  key={tier.displayName}
                  className={`relative bg-white rounded-2xl border-2 p-8 flex flex-col ${
                    meta.popular
                      ? 'border-[#dd8157] shadow-lg shadow-[#dd8157]/10'
                      : 'border-gray-200'
                  }`}
                >
                  {meta.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 text-xs font-bold text-white bg-[#dd8157] rounded-full">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${meta.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: meta.color }} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-1">
                      {tier.displayName}
                    </h2>
                    <p className="text-sm text-gray-500">{meta.description}</p>
                  </div>

                  <div className="mb-6">
                    {price ? (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-gray-900">
                            ${(price.price / 100).toLocaleString()}
                          </span>
                          <span className="text-gray-500">
                            /{interval === 'monthly' ? 'mo' : 'yr'}
                          </span>
                        </div>
                        {monthlyEquivalent && (
                          <p className="text-sm text-gray-500 mt-1">
                            ${(monthlyEquivalent / 100).toLocaleString()}/mo equivalent
                          </p>
                        )}
                        {monthlySavings > 0 && (
                          <p className="text-sm text-green-600 font-medium mt-1">
                            Save ${(monthlySavings / 100).toLocaleString()}/yr
                          </p>
                        )}
                      </>
                    ) : (
                      <span className="text-gray-400">Not available</span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {(tier.features as string[]).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: meta.color }}
                        />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrentTier ? (
                    <Link
                      href="/settings/billing"
                      className="block w-full text-center py-3 px-6 rounded-xl font-bold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    >
                      Current Plan &mdash; Manage
                    </Link>
                  ) : price ? (
                    <Link
                      href={`/complianceplus/checkout?tierId=${price.id}`}
                      className={`block w-full text-center py-3 px-6 rounded-xl font-bold text-sm transition ${
                        meta.popular
                          ? 'bg-[#dd8157] hover:bg-[#c86d47] text-white'
                          : 'bg-[#363b57] hover:bg-[#2a2f47] text-white'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        Get Started <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  ) : null}
                </div>
              )
            })}
          </div>
        )}

        {/* FAQ / Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-500">
            Questions? Reach out at{' '}
            <a href="mailto:brandon@trucksafe.com" className="text-[#dd8157] hover:underline font-medium">
              brandon@trucksafe.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
