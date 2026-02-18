'use client'

import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm py-3 px-6 bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto">
        {/* Home/Dashboard Link */}
        <a href="/dashboard" className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition whitespace-nowrap">
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </a>

        {/* Breadcrumb Items */}
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {item.href ? (
              <a 
                href={item.href} 
                className="text-gray-600 hover:text-gray-900 transition whitespace-nowrap"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-gray-900 font-medium whitespace-nowrap">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}
