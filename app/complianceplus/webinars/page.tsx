'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@/hooks/useUser'
import { Video, Play, Lock, Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { UPCOMING_WEBINARS, RECORDED_WEBINARS, canAccessTier } from '../data'

export default function WebinarsPage() {
  const { user, access, isLoading } = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'upcoming' | 'recordings'>('upcoming')

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
  const webinars = activeTab === 'upcoming' ? UPCOMING_WEBINARS : RECORDED_WEBINARS

  const tierLabel: Record<string, string> = { pro: 'Pro', premium: 'Premium' }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Webinars</h1>
          <p className="text-lg text-gray-600">
            Live compliance training sessions and on-demand recordings from industry experts.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="mb-8">
          <div className="inline-flex bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('recordings')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'recordings'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Recordings
            </button>
          </div>
        </div>

        {/* Webinar Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {webinars.map((webinar) => {
            const hasAccess = canAccessTier(tier, webinar.tier)
            const d = new Date(webinar.date + 'T12:00:00')

            return (
              <div
                key={webinar.id}
                className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition ${
                  !hasAccess ? 'opacity-75' : ''
                }`}
              >
                {/* Top bar */}
                <div className="bg-[#363b57] px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {webinar.type === 'upcoming' ? (
                      <>
                        <div className="bg-[#dd8157] text-white rounded-lg px-3 py-1.5 text-center">
                          <div className="text-lg font-bold leading-none">{d.getDate()}</div>
                          <div className="text-[10px] uppercase">{d.toLocaleDateString('en-US', { month: 'short' })}</div>
                        </div>
                        <div className="text-white text-sm">
                          <div className="font-semibold">{webinar.time}</div>
                          <div className="text-white/70">{webinar.duration}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-white/20 text-white rounded-lg p-2">
                          <Play className="w-5 h-5" />
                        </div>
                        <div className="text-white text-sm">
                          <div className="font-semibold">Recorded</div>
                          <div className="text-white/70">
                            {d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} &middot; {webinar.duration}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {webinar.tier !== 'all' && (
                    <span className="px-2 py-1 bg-[#dd8157] text-white text-xs font-bold rounded uppercase">
                      {tierLabel[webinar.tier]}+
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{webinar.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{webinar.description}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <User className="w-4 h-4" />
                    <span>{webinar.presenter}</span>
                  </div>

                  {hasAccess ? (
                    <button className="w-full flex items-center justify-center gap-2 bg-[#363b57] hover:bg-[#2a2f47] text-white py-2.5 rounded-lg font-semibold text-sm transition">
                      {webinar.type === 'upcoming' ? (
                        <>
                          <Calendar className="w-4 h-4" />
                          Register
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Watch Recording
                        </>
                      )}
                    </button>
                  ) : (
                    <Link
                      href="/complianceplus"
                      className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-500 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-200 transition"
                    >
                      <Lock className="w-4 h-4" />
                      Upgrade to {tierLabel[webinar.tier]}
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {webinars.length === 0 && (
          <div className="text-center py-16">
            <Video className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No {activeTab} webinars at this time.</p>
          </div>
        )}
      </div>
    </div>
  )
}
