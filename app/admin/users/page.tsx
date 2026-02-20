'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react'

interface UserRow {
  id: string
  name: string | null
  email: string
  createdAt: string
  roles: { role: string }[]
}

const ROLE_BADGE_COLORS: Record<string, string> = {
  ADMIN: 'bg-red-500/20 text-red-400',
  NETWORK_MEMBER: 'bg-blue-500/20 text-blue-400',
  COMPLIANCE_BASIC: 'bg-green-500/20 text-green-400',
  COMPLIANCE_PRO: 'bg-green-500/20 text-green-300',
  COMPLIANCE_PREMIUM: 'bg-green-500/20 text-green-200',
  CLIENT: 'bg-amber-500/20 text-amber-400',
  ACADEMY_ACCESS: 'bg-indigo-500/20 text-indigo-400',
  TSC_CERTIFIED: 'bg-emerald-500/20 text-emerald-400',
  BOOTCAMP_ATTENDEE: 'bg-purple-500/20 text-purple-400',
  BOOTCAMP_ALUMNI: 'bg-purple-500/20 text-purple-300',
}

function formatRoleName(role: string) {
  return role
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [perPage, setPerPage] = useState(25)
  const [loading, setLoading] = useState(true)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({
      page: String(page),
      search: debouncedSearch,
    })
    try {
      const res = await fetch(`/api/admin/users?${params}`)
      const data = await res.json()
      setUsers(data.users)
      setTotal(data.total)
      setPerPage(data.perPage)
    } catch {
      console.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const totalPages = Math.ceil(total / perPage)

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent"
          />
        </div>
        <span className="text-sm text-gray-500">
          {total} user{total !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Users Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">
                User
              </th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">
                Roles
              </th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">
                Joined
              </th>
              <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center">
                  <div className="w-6 h-6 border-3 border-[#dd8157] border-t-transparent rounded-full animate-spin mx-auto" />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-sm text-gray-500">
                  {debouncedSearch ? 'No users match your search.' : 'No users found.'}
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-gray-800/50 transition"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-gray-300 flex-shrink-0">
                        {u.name
                          ?.split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-200">
                          {u.name || 'Unnamed'}
                        </p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {u.roles.map((r) => (
                        <span
                          key={r.role}
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            ROLE_BADGE_COLORS[r.role] || 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          {formatRoleName(r.role)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-400">
                    {new Date(u.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/users/${u.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
