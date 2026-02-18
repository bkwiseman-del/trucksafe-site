'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Search, FileText, Grid3x3, List, ChevronDown } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 9

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'breaking', label: 'Breaking' },
    { value: 'regulatory', label: 'Regulatory Update' },
    { value: 'compliance', label: 'Compliance Tips' },
    { value: 'industry', label: 'Industry News' },
  ]

  const tags = [
    { value: 'all', label: 'All Tags' },
    { value: 'driver-qualification', label: 'Driver Qualification' },
    { value: 'hos', label: 'Hours-of-Service' },
    { value: 'drug-testing', label: 'Drug/Alcohol Testing' },
    { value: 'cdl', label: 'CDL' },
    { value: 'safety-ratings', label: 'Safety Ratings' },
    { value: 'enforcement', label: 'Enforcement' },
  ]

  const articles = [
    {
      title: "FMCSA Issues Final Rule on Non-Domiciled CDLs",
      excerpt: "New rule largely reaffirms September 2025 provisions restricting non-domiciled CDL eligibility to H-2A, H-2B, or E-2 visa holders.",
      category: "Regulatory Update",
      categoryValue: "regulatory",
      tags: ["cdl", "enforcement"],
      author: "Brandon Wiseman",
      date: "Feb 13, 2026",
      readTime: "6 min read",
      slug: "example",
      image: "/article-placeholder.jpg"
    },
    {
      title: "Compliance Theater: When Documentation Replaces Judgment",
      excerpt: "Many fleets document everything but miss the point—proper documentation doesn't replace sound operational judgment.",
      category: "Compliance Tips",
      categoryValue: "compliance",
      tags: ["safety-ratings"],
      author: "Brandon Wiseman",
      date: "Jan 25, 2026",
      readTime: "7 min read",
      slug: "compliance-theater",
      image: "/article-placeholder.jpg"
    },
    {
      title: "FMCSA Keeps Random Drug & Alcohol Testing Rates the Same for 2026",
      excerpt: "Minimum random drug testing rate remains at 50%, with alcohol testing at 10%—marking six consecutive years at these rates.",
      category: "Regulatory Update",
      categoryValue: "regulatory",
      tags: ["drug-testing"],
      author: "Rob Carpenter",
      date: "Jan 13, 2026",
      readTime: "5 min read",
      slug: "drug-testing-rates-2026",
      image: "/article-placeholder.jpg"
    },
    {
      title: "CVSA Human Trafficking Awareness Week",
      excerpt: "Law enforcement agencies conducting outreach at truck stops and weigh stations during Human Trafficking Awareness Initiative.",
      category: "Industry News",
      categoryValue: "industry",
      tags: ["enforcement"],
      author: "Rob Carpenter",
      date: "Jan 12, 2026",
      readTime: "5 min read",
      slug: "human-trafficking-awareness",
      image: "/article-placeholder.jpg"
    },
    {
      title: "FMCSA Escalates Feud with California",
      excerpt: "Federal agency withholds $160M in funding over non-domiciled CDL compliance issues.",
      category: "Breaking",
      categoryValue: "breaking",
      tags: ["enforcement", "cdl"],
      author: "Brandon Wiseman",
      date: "Jan 8, 2026",
      readTime: "3 min read",
      slug: "california-funding",
      image: "/article-placeholder.jpg"
    },
    {
      title: "Top 10 Regulatory Developments Heading Into 2026",
      excerpt: "A comprehensive look at the most significant compliance initiatives and policy changes impacting motor carriers.",
      category: "Regulatory Update",
      categoryValue: "regulatory",
      tags: ["safety-ratings", "enforcement"],
      author: "Brandon Wiseman",
      date: "Dec 8, 2025",
      readTime: "8 min read",
      slug: "top-10-2026",
      image: "/article-placeholder.jpg"
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.categoryValue === selectedCategory
    const matchesTag = selectedTag === 'all' || article.tags.includes(selectedTag)
    return matchesSearch && matchesCategory && matchesTag
  })

  // Reset to page 1 when filters change
  const handleFilterChange = (setter: Function, value: any) => {
    setter(value)
    setCurrentPage(1)
  }

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage
  const currentArticles = filteredArticles.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/articles-hero.jpg"
            alt="Articles"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd8157]/20 border border-[#dd8157]/30 rounded-full mb-6">
              <FileText className="w-4 h-4 text-[#dd8157]" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">Articles</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Expert Insights on DOT Compliance
            </h1>
            
            <p className="text-xl text-white/90">
              In-depth analysis, regulatory updates, and practical compliance guidance from transportation attorneys and industry experts.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 px-6 bg-gray-50 border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent"
                />
              </div>

              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleFilterChange(setSelectedCategory, e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent bg-white cursor-pointer min-w-[200px]"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Tag Dropdown */}
              <div className="relative">
                <select
                  value={selectedTag}
                  onChange={(e) => handleFilterChange(setSelectedTag, e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent bg-white cursor-pointer min-w-[200px]"
                >
                  {tags.map(tag => (
                    <option key={tag.value} value={tag.value}>{tag.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
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
                onClick={() => setViewMode('list')}
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

          {/* Active Filters Display */}
          {(selectedCategory !== 'all' || selectedTag !== 'all' || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchQuery && (
                <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center gap-2">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">×</button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center gap-2">
                  {categories.find(c => c.value === selectedCategory)?.label}
                  <button onClick={() => setSelectedCategory('all')} className="text-gray-400 hover:text-gray-600">×</button>
                </span>
              )}
              {selectedTag !== 'all' && (
                <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center gap-2">
                  {tags.find(t => t.value === selectedTag)?.label}
                  <button onClick={() => setSelectedTag('all')} className="text-gray-400 hover:text-gray-600">×</button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedTag('all')
                }}
                className="text-sm text-[#dd8157] hover:text-[#c86d47] font-semibold"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedTag('all')
                }}
                className="text-[#dd8157] hover:text-[#c86d47] font-semibold"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.map((article, idx) => (
                <a key={idx} href={`/articles/${article.slug}`} className="group cursor-pointer block">
                  <div className="bg-gray-100 h-48 rounded-xl mb-4 group-hover:bg-gray-200 transition overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Article Image
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-[#dd8157] uppercase tracking-wider mb-2">
                    {article.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#dd8157] transition">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-6">
              {currentArticles.map((article, idx) => (
                <a
                  key={idx}
                  href={`/articles/${article.slug}`}
                  className="group flex gap-6 p-6 bg-white border border-gray-200 rounded-xl hover:border-[#dd8157] hover:shadow-lg transition"
                >
                  <div className="w-48 h-32 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      Article Image
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#dd8157] uppercase tracking-wider mb-2">
                      {article.category}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#dd8157] transition">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="font-semibold">{article.author}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // Show first page, last page, current page, and pages around current
                  const showPage = page === 1 || 
                                 page === totalPages || 
                                 (page >= currentPage - 1 && page <= currentPage + 1)
                  
                  const showEllipsis = (page === 2 && currentPage > 3) || 
                                      (page === totalPages - 1 && currentPage < totalPages - 2)
                  
                  if (showEllipsis) {
                    return <span key={page} className="px-3 py-2 text-gray-400">...</span>
                  }
                  
                  if (!showPage) return null
                  
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        currentPage === page
                          ? 'bg-[#dd8157] text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          )}

          {/* Results Summary */}
          {filteredArticles.length > 0 && (
            <div className="mt-6 text-center text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} of {filteredArticles.length} articles
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Never Miss an Update
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Get in-depth DOT compliance articles and breaking regulatory news delivered right to your inbox
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dd8157]"
            />
            <button
              type="submit"
              className="bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-sm text-white/60 mt-6">
            Join thousands of safety professionals staying informed on DOT compliance
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
