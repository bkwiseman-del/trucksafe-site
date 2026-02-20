'use client'

import { useState, useEffect } from 'react'
import { Users, UserPlus, Shield, Activity, Clock, Database, BarChart3, FileText, Calendar, CreditCard } from 'lucide-react'

interface DashboardData {
  totalUsers: number
  newThisWeek: number
  newThisMonth: number
  totalRoles: number
  roleBreakdown: { role: string; count: number }[]
  recentUsers: { id: string; name: string | null; email: string; createdAt: string }[]
  dbStatus: string
}

const ROLE_COLORS: Record<string, string> = {
  ADMIN: 'bg-red-500',
  NETWORK_MEMBER: 'bg-blue-500',
  COMPLIANCE_BASIC: 'bg-green-400',
  COMPLIANCE_PRO: 'bg-green-500',
  COMPLIANCE_PREMIUM: 'bg-green-600',
  CLIENT: 'bg-amber-500',
  ACADEMY_ACCESS: 'bg-indigo-500',
  TSC_CERTIFIED: 'bg-emerald-500',
  BOOTCAMP_ATTENDEE: 'bg-purple-500',
  BOOTCAMP_ALUMNI: 'bg-purple-600',
}

function formatRoleName(role: string) {
  return role
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function timeAgo(dateStr: string) {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!data) return null

  const maxRoleCount = Math.max(...data.roleBreakdown.map((r) => r.count), 1)

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value={data.totalUsers}
          color="text-blue-400"
        />
        <StatCard
          icon={UserPlus}
          label="New This Week"
          value={data.newThisWeek}
          color="text-green-400"
        />
        <StatCard
          icon={Activity}
          label="New This Month"
          value={data.newThisMonth}
          color="text-purple-400"
        />
        <StatCard
          icon={Shield}
          label="Total Roles Assigned"
          value={data.totalRoles}
          color="text-amber-400"
        />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Breakdown */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-gray-400" />
            <h2 className="text-base font-semibold text-gray-100">Users by Role</h2>
          </div>
          <div className="space-y-3">
            {data.roleBreakdown.map((r) => (
              <div key={r.role}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">{formatRoleName(r.role)}</span>
                  <span className="text-sm font-semibold text-gray-100">{r.count}</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${ROLE_COLORS[r.role] || 'bg-gray-500'}`}
                    style={{ width: `${(r.count / maxRoleCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {data.roleBreakdown.length === 0 && (
              <p className="text-sm text-gray-500 italic">No roles assigned yet</p>
            )}
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-gray-400" />
            <h2 className="text-base font-semibold text-gray-100">Recent Registrations</h2>
          </div>
          <div className="space-y-3">
            {data.recentUsers.map((u) => (
              <a
                key={u.id}
                href={`/admin/users/${u.id}`}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-800/50 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-gray-300">
                    {u.name
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase() || '?'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-200 group-hover:text-white">
                      {u.name || 'Unnamed'}
                    </p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{timeAgo(u.createdAt)}</span>
              </a>
            ))}
            {data.recentUsers.length === 0 && (
              <p className="text-sm text-gray-500 italic">No users registered yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Coming Soon Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ComingSoonCard icon={CreditCard} label="Subscriptions" />
        <ComingSoonCard icon={FileText} label="Content" />
        <ComingSoonCard icon={Calendar} label="Events" />
        <ComingSoonCard icon={Database} label="Site Health" />
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any
  label: string
  value: number
  color: string
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <p className="text-3xl font-bold text-gray-100">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  )
}

function ComingSoonCard({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center">
      <Icon className="w-6 h-6 text-gray-600 mb-2" />
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-xs text-gray-600 mt-1">Coming Soon</p>
    </div>
  )
}
