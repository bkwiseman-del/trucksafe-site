'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@/hooks/useUser'
import { FileText, CheckSquare, BookOpen, ClipboardList, Download, Lock, Search, FolderOpen } from 'lucide-react'
import { RESOURCES, RESOURCE_CATEGORIES, canAccessTier } from '../data'
import type { DemoResource } from '../data'

const categoryIcons: Record<string, typeof FileText> = {
  templates: FileText,
  checklists: CheckSquare,
  guides: BookOpen,
  forms: ClipboardList,
}

export default function ResourcesPage() {
  const { user, access, isLoading } = useUser()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

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
  const tierLabel: Record<string, string> = { pro: 'Pro', premium: 'Premium' }

  const filteredResources = RESOURCES.filter((r) => {
    const matchesCategory = activeCategory === 'all' || r.category === activeCategory
    const matchesSearch =
      !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Resource Library</h1>
          <p className="text-lg text-gray-600">
            Downloadable templates, checklists, guides, and forms for DOT compliance.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent text-sm"
            />
          </div>
          <div className="inline-flex bg-gray-100 p-1 rounded-full flex-shrink-0 overflow-x-auto">
            {RESOURCE_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const hasAccess = canAccessTier(tier, resource.tier)
              const Icon = categoryIcons[resource.category] || FileText

              return (
                <div
                  key={resource.id}
                  className={`bg-white rounded-xl border border-gray-200 p-6 flex flex-col ${
                    hasAccess ? 'hover:shadow-lg' : 'opacity-75'
                  } transition`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-[#363b57]/10 rounded-lg">
                      <Icon className="w-5 h-5 text-[#363b57]" />
                    </div>
                    {resource.tier !== 'all' && (
                      <span className="px-2 py-0.5 bg-[#dd8157]/10 text-[#dd8157] text-xs font-bold rounded uppercase">
                        {tierLabel[resource.tier]}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded">
                        {resource.fileType}
                      </span>
                      <span className="text-xs text-gray-400">{resource.fileSize}</span>
                    </div>
                    {hasAccess ? (
                      <button className="flex items-center gap-1 text-sm font-semibold text-[#363b57] hover:text-[#dd8157] transition">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    ) : (
                      <Link
                        href="/complianceplus"
                        className="flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-gray-600 transition"
                      >
                        <Lock className="w-4 h-4" />
                        Upgrade
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No resources found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
