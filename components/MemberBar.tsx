'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useUser } from '@/hooks/useUser'
import Link from 'next/link'
import { Home, MessageCircle, GraduationCap, Shield, Calendar, Briefcase, Award, Bell, Settings, ChevronDown, LogOut, Users, BookOpen, Video, FileText, Search, BookMarked } from 'lucide-react'

export function MemberBar() {
  const pathname = usePathname()
  const { user, access } = useUser()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  if (!user || !access) return null

  // Determine current section based on pathname
  const getCurrentSection = () => {
    if (pathname.startsWith('/network')) return 'network'
    if (pathname.startsWith('/academy')) return 'academy'
    if (pathname.startsWith('/complianceplus')) return 'compliance'
    if (pathname.startsWith('/bootcamp/alumni')) return 'bootcamp'
    if (pathname.startsWith('/portal')) return 'client'
    if (pathname.startsWith('/tsc')) return 'tsc'
    return 'dashboard'
  }

  const currentSection = getCurrentSection()

  // Get context-aware navigation items based on current section
  const getContextNavItems = () => {
    switch (currentSection) {
      case 'dashboard':
        // On dashboard, show all available sections as quick access
        const dashboardItems = []
        
        if (access.networkMember) {
          dashboardItems.push({ icon: MessageCircle, label: 'Network', href: '/network/forums' })
        }
        if (access.academyAccess || access.complianceMember) {
          dashboardItems.push({ icon: GraduationCap, label: 'Academy', href: '/academy/my-courses' })
        }
        if (access.complianceMember?.status === 'active') {
          dashboardItems.push({
            icon: Shield,
            label: 'Compliance+',
            href: '/complianceplus/dashboard'
          })
        }
        if (access.bootcampAttendee) {
          dashboardItems.push({ icon: Calendar, label: 'Bootcamp', href: '/bootcamp/alumni' })
        }
        if (access.clientAccess?.status === 'active') {
          dashboardItems.push({ icon: Briefcase, label: 'Client Portal', href: '/portal' })
        }
        if (access.tscCertification?.status === 'active') {
          dashboardItems.push({ icon: Award, label: 'TSC', href: '/tsc/dashboard' })
        }
        
        return dashboardItems
      
      case 'network':
        return [
          { icon: MessageCircle, label: 'Forums', href: '/network/forums' },
          { icon: Users, label: 'Members', href: '/network/members' },
          { icon: Calendar, label: 'Events', href: '/network/events' },
          { icon: BookOpen, label: 'Resources', href: '/network/resources' }
        ]
      
      case 'academy':
        return [
          { icon: BookMarked, label: 'My Courses', href: '/academy/my-courses' },
          { icon: Search, label: 'Browse', href: '/academy/browse' },
          { icon: Award, label: 'Certificates', href: '/academy/certificates' }
        ]
      
      case 'compliance':
        return [
          { icon: Home, label: 'Dashboard', href: '/complianceplus/dashboard' },
          { icon: Video, label: 'Webinars', href: '/complianceplus/webinars' },
          { icon: FileText, label: 'Reports', href: '/complianceplus/reports' },
          { icon: BookOpen, label: 'Resources', href: '/complianceplus/resources' }
        ]
      
      case 'bootcamp':
        return [
          { icon: MessageCircle, label: 'Forums', href: '/bootcamp/alumni/forums' },
          { icon: BookOpen, label: 'Resources', href: '/bootcamp/alumni/resources' },
          { icon: Calendar, label: 'Events', href: '/bootcamp/alumni/events' }
        ]
      
      case 'client':
        return [
          { icon: FileText, label: 'Documents', href: '/portal/documents' },
          { icon: MessageCircle, label: 'Messages', href: '/portal/messages' },
          { icon: Briefcase, label: 'Projects', href: '/portal/projects' }
        ]
      
      case 'tsc':
        return [
          { icon: Home, label: 'Dashboard', href: '/tsc/dashboard' },
          { icon: BookOpen, label: 'Courses', href: '/tsc/courses' },
          { icon: Award, label: 'Certification', href: '/tsc/certification' }
        ]
      
      default:
        return []
    }
  }

  const contextNavItems = getContextNavItems()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className="bg-white border-b border-gray-200 sticky top-[72px] z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Navigation Items */}
          <nav className="flex items-center gap-1 overflow-x-auto">
            {/* Dashboard - Always visible */}
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm font-medium whitespace-nowrap ${
                currentSection === 'dashboard'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            {/* Separator - only show if we have context items */}
            {contextNavItems.length > 0 && (
              <div className="text-gray-300 mx-2">|</div>
            )}

            {/* Context-aware navigation items */}
            {contextNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm font-medium whitespace-nowrap ${
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-[#dd8157] text-white text-xs font-bold rounded uppercase">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right: User Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button 
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {/* Unread indicator */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#dd8157] rounded-full"></span>
            </button>

            {/* Settings */}
            <a
              href="/settings"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </a>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                <div className="w-8 h-8 bg-[#363b57] rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.initials}
                </div>
                <span className="font-medium text-gray-900 text-sm hidden md:block">
                  {user.firstName}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <>
                  {/* Backdrop to close menu */}
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfileMenu(false)}
                  />
                  
                  {/* Menu */}
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {/* User Info */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="font-semibold text-gray-900 text-sm">{user.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{user.email}</div>
                      
                      {/* Access Level Badges */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {access.networkMember && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                            Network
                          </span>
                        )}
                        {access.complianceMember && (
                          <span className="px-2 py-1 bg-[#dd8157]/10 text-[#dd8157] text-xs font-semibold rounded uppercase">
                            {access.complianceMember.tier}
                          </span>
                        )}
                        {access.bootcampAttendee && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                            Bootcamp
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <a 
                        href="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        My Profile
                      </a>
                      <a 
                        href="/settings" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Account Settings
                      </a>
                      <a
                        href="/settings/billing"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Billing & Subscriptions
                      </a>
                    </div>

                    {/* Admin Link */}
                    {access?.isAdmin && (
                      <div className="border-t border-gray-100 py-2">
                        <a
                          href="/admin"
                          className="block px-4 py-2 text-sm font-semibold text-[#dd8157] hover:bg-orange-50 transition"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          Admin Dashboard
                        </a>
                      </div>
                    )}

                    {/* Logout */}
                    <div className="border-t border-gray-100 py-2">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
