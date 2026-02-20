'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  X,
  Plus,
  Shield,
  Mail,
  Calendar,
  Building2,
  Briefcase,
  Phone,
  MapPin,
  Globe,
  AlertCircle,
  Check,
} from 'lucide-react'

interface UserDetail {
  id: string
  name: string | null
  email: string
  createdAt: string
  image: string | null
  emailSubscribed: boolean
  lastActiveAt: string | null
  profile: {
    company: string | null
    title: string | null
    bio: string | null
    phone: string | null
    location: string | null
    website: string | null
  } | null
  roles: { id: string; role: string; createdAt: string }[]
}

const ALL_ROLES = [
  'ADMIN',
  'NETWORK_MEMBER',
  'COMPLIANCE_BASIC',
  'COMPLIANCE_PRO',
  'COMPLIANCE_PREMIUM',
  'CLIENT',
  'ACADEMY_ACCESS',
  'TSC_CERTIFIED',
  'BOOTCAMP_ATTENDEE',
  'BOOTCAMP_ALUMNI',
]

const ROLE_BADGE_COLORS: Record<string, string> = {
  ADMIN: 'bg-red-500/20 text-red-400 border-red-500/30',
  NETWORK_MEMBER: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  COMPLIANCE_BASIC: 'bg-green-500/20 text-green-400 border-green-500/30',
  COMPLIANCE_PRO: 'bg-green-500/20 text-green-300 border-green-500/30',
  COMPLIANCE_PREMIUM: 'bg-green-500/20 text-green-200 border-green-500/30',
  CLIENT: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  ACADEMY_ACCESS: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  TSC_CERTIFIED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  BOOTCAMP_ATTENDEE: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  BOOTCAMP_ALUMNI: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
}

function formatRoleName(role: string) {
  return role
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function AdminUserDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [user, setUser] = useState<UserDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedRole, setSelectedRole] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/admin/users/${id}`)
      if (!res.ok) {
        router.push('/admin/users')
        return
      }
      const data = await res.json()
      setUser(data)
    } catch {
      router.push('/admin/users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [id])

  const addRole = async () => {
    if (!selectedRole) return
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch(`/api/admin/users/${id}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRole }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Failed to add role.' })
        return
      }
      setMessage({ type: 'success', text: `Added ${formatRoleName(selectedRole)} role.` })
      setSelectedRole('')
      await fetchUser()
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong.' })
    } finally {
      setSaving(false)
    }
  }

  const removeRole = async (role: string) => {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch(`/api/admin/users/${id}/roles`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Failed to remove role.' })
        return
      }
      setMessage({ type: 'success', text: `Removed ${formatRoleName(role)} role.` })
      await fetchUser()
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null

  const currentRoleNames = user.roles.map((r) => r.role)
  const availableRoles = ALL_ROLES.filter((r) => !currentRoleNames.includes(r))

  const initials =
    user.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || '?'

  return (
    <div className="max-w-4xl space-y-6">
      {/* Back Button */}
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Users
      </Link>

      {/* Messages */}
      {message && (
        <div
          className={`rounded-lg p-3 flex items-start gap-2 text-sm ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          )}
          {message.text}
        </div>
      )}

      {/* User Info Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold text-gray-300 flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-100">
              {user.name || 'Unnamed User'}
            </h2>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Joined{' '}
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Profile Details */}
            {user.profile && (
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                {user.profile.company && (
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    {user.profile.company}
                  </span>
                )}
                {user.profile.title && (
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    {user.profile.title}
                  </span>
                )}
                {user.profile.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    {user.profile.phone}
                  </span>
                )}
                {user.profile.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {user.profile.location}
                  </span>
                )}
                {user.profile.website && (
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    {user.profile.website}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Roles Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-5 h-5 text-gray-400" />
          <h3 className="text-base font-semibold text-gray-100">Roles</h3>
        </div>

        {/* Current Roles */}
        <div className="flex flex-wrap gap-2 mb-6">
          {user.roles.map((r) => (
            <span
              key={r.id}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border ${
                ROLE_BADGE_COLORS[r.role] || 'bg-gray-700 text-gray-300 border-gray-600'
              }`}
            >
              {formatRoleName(r.role)}
              <button
                onClick={() => removeRole(r.role)}
                disabled={saving}
                className="ml-0.5 hover:text-white transition disabled:opacity-50"
                title={`Remove ${formatRoleName(r.role)}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
          {user.roles.length === 0 && (
            <p className="text-sm text-gray-500 italic">No roles assigned</p>
          )}
        </div>

        {/* Add Role */}
        {availableRoles.length > 0 && (
          <div className="flex items-center gap-3">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent"
            >
              <option value="">Select a role...</option>
              {availableRoles.map((r) => (
                <option key={r} value={r}>
                  {formatRoleName(r)}
                </option>
              ))}
            </select>
            <button
              onClick={addRole}
              disabled={!selectedRole || saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-[#dd8157] hover:bg-[#c86d47] rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Add Role
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
