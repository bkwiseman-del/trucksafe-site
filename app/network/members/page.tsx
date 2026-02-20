'use client'

import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@/hooks/useUser'
import Link from 'next/link'
import { Search, Users, MapPin, Building2, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react'

interface Member {
  id: string
  name: string
  initials: string
  image: string | null
  email: string | null
  company: string | null
  title: string | null
  location: string | null
  roles: string[]
  joinedAt: string
}

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  ADMIN: { label: 'Admin', color: 'bg-red-100 text-red-700' },
  NETWORK_MEMBER: { label: 'Network', color: 'bg-blue-100 text-blue-700' },
  COMPLIANCE_BASIC: { label: 'Basic', color: 'bg-green-100 text-green-700' },
  COMPLIANCE_PRO: { label: 'Pro', color: 'bg-green-100 text-green-600' },
  COMPLIANCE_PREMIUM: { label: 'Premium', color: 'bg-green-100 text-green-800' },
  BOOTCAMP_ATTENDEE: { label: 'Bootcamp', color: 'bg-purple-100 text-purple-700' },
  BOOTCAMP_ALUMNI: { label: 'Alumni', color: 'bg-purple-100 text-purple-600' },
  CLIENT: { label: 'Client', color: 'bg-amber-100 text-amber-700' },
  ACADEMY_ACCESS: { label: 'Academy', color: 'bg-indigo-100 text-indigo-700' },
  TSC_CERTIFIED: { label: 'Certified', color: 'bg-emerald-100 text-emerald-700' },
}

export default function MemberDirectoryPage() {
  const { user, isLoading: authLoading } = useUser()
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  const fetchMembers = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (roleFilter) params.set('role', roleFilter)
      params.set('page', page.toString())

      const res = await fetch(`/api/network/members?${params}`)
      if (res.ok) {
        const data = await res.json()
        setMembers(data.members)
        setTotalPages(data.totalPages)
        setTotal(data.total)
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [search, roleFilter, page])

  useEffect(() => {
    if (!authLoading && user) {
      fetchMembers()
    }
  }, [fetchMembers, authLoading, user?.id])

  // Debounce search
  const [searchInput, setSearchInput] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput)
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  if (authLoading) {
    return (
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Member Directory</h1>
          <p className="text-lg text-gray-600">
            Connect with safety professionals in the Trucksafe Network.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, company, or location..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setPage(1) }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent bg-white cursor-pointer"
            >
              <option value="">All Members</option>
              <option value="COMPLIANCE_BASIC">Compliance+ Basic</option>
              <option value="COMPLIANCE_PRO">Compliance+ Pro</option>
              <option value="COMPLIANCE_PREMIUM">Compliance+ Premium</option>
              <option value="BOOTCAMP_ALUMNI">Bootcamp Alumni</option>
              <option value="TSC_CERTIFIED">TSC Certified</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{total} member{total !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Member Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No members found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl border border-gray-200 hover:border-[#dd8157] hover:shadow-lg transition p-6"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-[#363b57] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {member.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{member.name}</h3>
                    {member.title && (
                      <p className="text-sm text-gray-600 flex items-center gap-1.5 mt-1 truncate">
                        <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
                        {member.title}
                      </p>
                    )}
                    {member.company && (
                      <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1 truncate">
                        <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                        {member.company}
                      </p>
                    )}
                    {member.location && (
                      <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1 truncate">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        {member.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Role Badges */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {member.roles
                    .filter((r) => ROLE_LABELS[r])
                    .slice(0, 3)
                    .map((r) => (
                      <span
                        key={r}
                        className={`px-2 py-0.5 text-xs font-semibold rounded ${ROLE_LABELS[r].color}`}
                      >
                        {ROLE_LABELS[r].label}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
