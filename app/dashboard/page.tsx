'use client'

import { MessageCircle, Shield, GraduationCap, Calendar, ArrowRight, Clock, Users, TrendingUp, Video, FileText, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function DashboardPage() {
  const user = {
    firstName: 'John',
    name: 'John Doe'
  }

  const access = {
    networkMember: true,
    complianceMember: {
      tier: 'pro',
      status: 'active'
    },
    bootcampAttendee: {
      year: 2026
    },
    academyAccess: true
  }

  return (
    <div className="bg-gray-50">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-lg text-gray-600">
              Access your Trucksafe services below.
            </p>
          </div>

          {/* Service Access Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Network Card */}
            {access.networkMember && (
              <Link
                href="/network/forums"
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-blue-500 hover:shadow-xl transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Network
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Connect with safety professionals and access forums.
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold">
                  <span>Visit Network</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            )}

            {/* Compliance+ Card */}
            {access.complianceMember?.status === 'active' && (
              <Link
                href="/complianceplus/dashboard"
                className="bg-gradient-to-br from-[#363b57] to-[#2a2e42] rounded-xl border-2 border-[#363b57] p-6 hover:border-[#dd8157] hover:shadow-xl transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-[#dd8157]/20 rounded-lg group-hover:bg-[#dd8157]/30 transition">
                    <Shield className="w-6 h-6 text-[#dd8157]" />
                  </div>
                  <span className="px-2 py-1 bg-[#dd8157] text-white text-xs font-bold rounded uppercase">
                    {access.complianceMember.tier}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Compliance+
                </h2>
                <p className="text-sm text-white/80 leading-relaxed mb-3">
                  Compliance reports, webinars, and consulting hours.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#dd8157] font-semibold">
                  <span>Open Dashboard</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            )}

            {/* Academy Card */}
            {access.academyAccess && (
              <Link
                href="/academy/my-courses"
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-green-500 hover:shadow-xl transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Academy
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Compliance courses and certifications for your team.
                </p>
                <div className="flex items-center gap-2 text-xs text-green-600 font-semibold">
                  <span>View Courses</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            )}

            {/* Bootcamp Card */}
            {access.bootcampAttendee && (
              <Link
                href="/bootcamp/alumni"
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-purple-500 hover:shadow-xl transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Bootcamp
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Alumni resources and {access.bootcampAttendee.year} attendee network.
                </p>
                <div className="flex items-center gap-2 text-xs text-purple-600 font-semibold">
                  <span>Alumni Portal</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Recent Activity & Events */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Activity */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <MessageCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">
                          New reply in "Driver Qualification Files"
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Sarah M. responded to your question about medical certificate expiration tracking.
                        </p>
                        <div className="text-xs text-gray-500">2 hours ago</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <Shield className="w-5 h-5 text-[#dd8157]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">
                          Your monthly compliance report is ready
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Review your January CSA scores and violation trends. 3 action items require attention.
                        </p>
                        <div className="text-xs text-gray-500">1 day ago</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">
                          Course completed: Hours of Service Basics
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Congratulations on completing the course! Certificate available for download.
                        </p>
                        <div className="text-xs text-gray-500">3 days ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="text-center bg-[#dd8157] text-white rounded-lg p-3">
                          <div className="text-2xl font-bold">18</div>
                          <div className="text-xs uppercase">Feb</div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">
                          Compliance+ Webinar: New DOT Drug Testing Rules
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Join our experts for a deep dive into the latest drug testing requirements.
                        </p>
                        <div className="text-xs text-gray-500">2:00 PM EST • Pro & Premium Members</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="text-center bg-blue-600 text-white rounded-lg p-3">
                          <div className="text-2xl font-bold">20</div>
                          <div className="text-xs uppercase">Feb</div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">
                          Network Q&A: CSA Score Improvement
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Open discussion with fellow safety managers on strategies that work.
                        </p>
                        <div className="text-xs text-gray-500">11:00 AM EST • All Members</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Your Activity Stats */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Your Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Forum posts</span>
                    <span className="text-2xl font-bold text-gray-900">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Courses completed</span>
                    <span className="text-2xl font-bold text-gray-900">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Resources downloaded</span>
                    <span className="text-2xl font-bold text-gray-900">12</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">Member since</div>
                    <div className="text-sm font-semibold text-gray-900">Jan 2025</div>
                  </div>
                </div>
              </div>

              {/* Popular This Week */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Popular This Week</h3>
                <div className="space-y-3">
                  <a href="#" className="block group">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-4 h-4 text-[#dd8157] mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 group-hover:text-[#dd8157] transition">
                          Sample Drug Testing Policy
                        </div>
                        <div className="text-xs text-gray-500">142 downloads</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="block group">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-4 h-4 text-[#dd8157] mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 group-hover:text-[#dd8157] transition">
                          Driver File Checklist
                        </div>
                        <div className="text-xs text-gray-500">98 downloads</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="block group">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-4 h-4 text-[#dd8157] mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 group-hover:text-[#dd8157] transition">
                          HOS Violation Guide
                        </div>
                        <div className="text-xs text-gray-500">87 downloads</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
