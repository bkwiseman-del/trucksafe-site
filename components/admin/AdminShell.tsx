'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react'

interface AdminShellProps {
  user: { id: string; name?: string | null; email?: string | null }
  children: React.ReactNode
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin/users' },
]

export function AdminShell({ user, children }: AdminShellProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname?.startsWith(href)
  }

  const pageTitle = pathname === '/admin'
    ? 'Dashboard'
    : pathname?.startsWith('/admin/users')
      ? 'User Management'
      : 'Admin'

  const initials = user.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'A'

  return (
    <div className="flex h-screen bg-[#0f1117]">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? 'w-16' : 'w-64'
        } bg-[#1a1d2e] border-r border-gray-800 flex flex-col transition-all duration-200 flex-shrink-0 z-10 relative`}
      >
        {/* Logo + collapse toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
          {!collapsed && (
            <Image
              src="/Horizontal_TM_Light.svg"
              alt="Trucksafe"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 min-w-[2rem] min-h-[2rem] flex items-center justify-center bg-gray-700 hover:bg-[#dd8157] text-gray-300 hover:text-white rounded-full transition shadow-md flex-shrink-0"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                  active
                    ? 'bg-white/10 text-[#dd8157]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom: Back to Site */}
        <div className="border-t border-gray-800 p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition"
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-[#0f1117] border-b border-gray-800 flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="text-xl font-black text-gray-100">{pageTitle}</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Back to Site
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#dd8157] rounded-full flex items-center justify-center text-white text-sm font-bold">
                {initials}
              </div>
              {user.name && (
                <span className="text-sm text-gray-300">{user.name}</span>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
