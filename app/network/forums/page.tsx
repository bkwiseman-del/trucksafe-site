'use client'

import { useState } from 'react'
import { MessageCircle, TrendingUp, Clock, Search, Filter, Plus, Settings, BookOpen, Home, ChevronRight } from 'lucide-react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'

export default function ForumsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const categories = [
    { id: 'all', name: 'All Categories', count: 621 },
    { id: 'compliance', name: 'DOT Compliance', count: 234 },
    { id: 'hos', name: 'Hours of Service', count: 156 },
    { id: 'driver-mgmt', name: 'Driver Management', count: 189 },
    { id: 'maintenance', name: 'Vehicle Maintenance', count: 98 },
    { id: 'safety', name: 'Safety Programs', count: 142 },
  ]

  const forums = [
    {
      id: 1,
      icon: MessageCircle,
      name: "Driver Qualification",
      description: "DQ files, medical exams, MVRs, background checks, and driver hiring",
      topics: 87,
      posts: 342,
      lastPost: {
        title: "New FMCSA guidance on medical certificates",
        author: "Sarah M.",
        time: "2 hours ago"
      },
      category: 'compliance'
    },
    {
      id: 2,
      icon: Clock,
      name: "Hours of Service",
      description: "ELD compliance, logbook rules, exemptions, and HOS violations",
      topics: 64,
      posts: 289,
      lastPost: {
        title: "Question about adverse driving conditions",
        author: "Mike R.",
        time: "5 hours ago"
      },
      category: 'hos'
    },
    {
      id: 3,
      icon: BookOpen,
      name: "Drug & Alcohol Testing",
      description: "Random testing, Clearinghouse compliance, policies, and procedures",
      topics: 42,
      posts: 156,
      lastPost: {
        title: "Best practices for return-to-duty process",
        author: "Jennifer K.",
        time: "1 day ago"
      },
      category: 'compliance'
    },
    {
      id: 4,
      icon: Settings,
      name: "Vehicle Maintenance",
      description: "Inspections, preventive maintenance, repairs, and recordkeeping",
      topics: 53,
      posts: 198,
      lastPost: {
        title: "Annual inspection documentation requirements",
        author: "Tom D.",
        time: "3 hours ago"
      },
      category: 'maintenance'
    },
    {
      id: 5,
      icon: TrendingUp,
      name: "CSA & Safety Ratings",
      description: "SMS scores, BASICs, DataQs, and FMCSA interventions",
      topics: 71,
      posts: 234,
      lastPost: {
        title: "Improving vehicle maintenance BASIC",
        author: "Brandon W.",
        time: "6 hours ago"
      },
      category: 'safety'
    },
    {
      id: 6,
      icon: MessageCircle,
      name: "General Discussion",
      description: "Industry news, introductions, success stories, and community chat",
      topics: 143,
      posts: 567,
      lastPost: {
        title: "Introduce yourself!",
        author: "Network Admin",
        time: "30 minutes ago"
      },
      category: 'all'
    }
  ]

  const filteredForums = selectedCategory === 'all' 
    ? forums 
    : forums.filter(f => f.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-4">Discussion Forums</h1>
            <p className="text-lg text-gray-600">
              Connect with fellow safety professionals, ask questions, and share your expertise.
            </p>
          </div>

          {/* Actions Bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Left: Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full lg:w-auto">
                <div className="relative flex-1 lg:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search forums..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent bg-white cursor-pointer"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.count})
                      </option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Right: Create Post Button */}
              <button className="inline-flex items-center gap-2 bg-[#dd8157] hover:bg-[#c86d47] text-white px-6 py-2 rounded-lg font-bold transition whitespace-nowrap">
                <Plus className="w-5 h-5" />
                Create New Post
              </button>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              Showing {filteredForums.length} forum{filteredForums.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent bg-white cursor-pointer"
              >
                <option value="recent">Recent Activity</option>
                <option value="popular">Most Popular</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Forum List */}
          <div className="space-y-4">
            {filteredForums.map((forum) => {
              const IconComponent = forum.icon
              return (
                <div key={forum.id} className="bg-white rounded-xl border border-gray-200 hover:border-[#dd8157] hover:shadow-lg transition">
                  <div className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-[#363b57]">
                          <IconComponent className="w-7 h-7" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <a href={`/network/forums/${forum.id}`} className="block group">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#dd8157] transition mb-2">
                            {forum.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {forum.description}
                          </p>
                        </a>

                        {/* Stats & Last Post */}
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MessageCircle className="w-4 h-4" />
                              <span>{forum.topics} topics</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <span>•</span>
                              <span>{forum.posts} posts</span>
                            </div>
                          </div>
                          <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 ml-auto">
                            <Clock className="w-4 h-4" />
                            <span>
                              <span className="font-medium text-gray-700">{forum.lastPost.title}</span>
                              <span className="mx-1">by</span>
                              <span className="font-medium">{forum.lastPost.author}</span>
                              <span className="mx-1">•</span>
                              <span>{forum.lastPost.time}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

