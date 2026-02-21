'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react'
import { Search, Grid3x3, List, ChevronDown } from 'lucide-react'

interface BlogFiltersProps {
  categories: { name: string; slug: string }[]
  tags: { name: string; slug: string }[]
  currentCategory?: string
  currentTag?: string
  currentSearch?: string
  currentViewMode?: string
  basePath?: string
}

export default function BlogFilters({
  categories,
  tags,
  currentCategory,
  currentTag,
  currentSearch,
  currentViewMode = 'grid',
  basePath = '/blog',
}: BlogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(currentSearch || '')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(
    (currentViewMode as 'grid' | 'list') || 'grid'
  )

  useEffect(() => {
    setSearchValue(currentSearch || '')
  }, [currentSearch])

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString())
      // Reset to page 1 on filter change
      params.delete('page')
      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== 'all') {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      })
      const qs = params.toString()
      router.push(`${basePath}${qs ? `?${qs}` : ''}`, { scroll: false })
    },
    [router, searchParams, basePath]
  )

  const handleSearch = useCallback(() => {
    updateParams({ q: searchValue || undefined })
  }, [updateParams, searchValue])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  const clearAll = () => {
    setSearchValue('')
    router.push(basePath, { scroll: false })
  }

  const hasActiveFilters = currentCategory || currentTag || currentSearch

  return (
    <>
      <section className="py-8 px-6 bg-gray-50 border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSearch}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div className="relative">
                <select
                  value={currentCategory || 'all'}
                  onChange={(e) => updateParams({ category: e.target.value })}
                  className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent bg-white cursor-pointer min-w-[200px]"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Tag */}
              <div className="relative">
                <select
                  value={currentTag || 'all'}
                  onChange={(e) => updateParams({ tag: e.target.value })}
                  className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent bg-white cursor-pointer min-w-[200px]"
                >
                  <option value="all">All Tags</option>
                  {tags.map((tag) => (
                    <option key={tag.slug} value={tag.slug}>
                      {tag.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => {
                  setViewMode('grid')
                  updateParams({ view: 'grid' })
                }}
                className={`p-2 rounded transition ${
                  viewMode === 'grid'
                    ? 'bg-[#dd8157] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Grid view"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setViewMode('list')
                  updateParams({ view: 'list' })
                }}
                className={`p-2 rounded transition ${
                  viewMode === 'list'
                    ? 'bg-[#dd8157] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-sm text-gray-600">Active filters:</span>
              {currentSearch && (
                <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center gap-2">
                  Search: &ldquo;{currentSearch}&rdquo;
                  <button
                    onClick={() => {
                      setSearchValue('')
                      updateParams({ q: undefined })
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {currentCategory && (
                <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center gap-2">
                  {categories.find((c) => c.slug === currentCategory)?.name || currentCategory}
                  <button
                    onClick={() => updateParams({ category: undefined })}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {currentTag && (
                <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center gap-2">
                  {tags.find((t) => t.slug === currentTag)?.name || currentTag}
                  <button
                    onClick={() => updateParams({ tag: undefined })}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </span>
              )}
              <button onClick={clearAll} className="text-sm text-[#dd8157] hover:text-[#c86d47] font-semibold">
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
