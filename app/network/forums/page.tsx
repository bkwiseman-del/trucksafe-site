'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useUser } from '@/hooks/useUser'
import { isEditorContentEmpty } from '@/lib/editor-utils'
import Link from 'next/link'
import { MessageCircle, Clock, Search, Lock, Plus, Eye, ChevronRight, X, Pin } from 'lucide-react'

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false })

interface ForumData {
  id: string
  name: string
  slug: string
  description: string | null
  accessLevel: string
  postCount: number
  lastPost: {
    title: string
    author: string
    time: string
  } | null
}

interface CategoryData {
  id: string
  name: string
  slug: string
  forums: ForumData[]
}

interface PostItem {
  id: string
  title: string
  pinned: boolean
  createdAt: string
  viewCount: number
  commentCount: number
  author: { id: string; name: string; initials: string }
  forum: { name: string; slug: string }
}

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function ForumsPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useUser()
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [pinnedPosts, setPinnedPosts] = useState<PostItem[]>([])
  const [recentPosts, setRecentPosts] = useState<PostItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // New post modal state
  const [showNewPost, setShowNewPost] = useState(false)
  const [selectedForumId, setSelectedForumId] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [posting, setPosting] = useState(false)
  const [postError, setPostError] = useState('')

  useEffect(() => {
    if (authLoading || !user) return

    async function fetchForums() {
      try {
        const res = await fetch('/api/network/forums')
        if (res.ok) {
          const data = await res.json()
          setCategories(data.categories)
          setPinnedPosts(data.pinnedPosts || [])
          setRecentPosts(data.recentPosts)
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }

    fetchForums()
  }, [authLoading, user?.id])

  // Filter forums by search query
  const filteredCategories = searchQuery.trim()
    ? categories
        .map((cat) => ({
          ...cat,
          forums: cat.forums.filter(
            (f) =>
              f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              f.description?.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((cat) => cat.forums.length > 0)
    : categories

  const totalForums = categories.reduce((sum, c) => sum + c.forums.length, 0)
  const allForums = categories.flatMap((c) =>
    c.forums.map((f) => ({ id: f.id, name: f.name, slug: f.slug, categoryName: c.name }))
  )

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || isEditorContentEmpty(newContent) || !selectedForumId) return

    setPosting(true)
    setPostError('')

    try {
      const res = await fetch('/api/network/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          forumId: selectedForumId,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setPostError(data.error || 'Failed to create post.')
        return
      }

      const data = await res.json()
      const selectedForum = allForums.find((f) => f.id === selectedForumId)
      setShowNewPost(false)
      setNewTitle('')
      setNewContent('')
      setSelectedForumId('')
      router.push(`/network/forums/${selectedForum?.slug}/${data.id}`)
    } catch {
      setPostError('Something went wrong.')
    } finally {
      setPosting(false)
    }
  }

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
    <div className="pt-32 pb-12 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Discussion Forums</h1>
            <p className="text-lg text-gray-600">
              Connect with fellow safety professionals, ask questions, and share your expertise.
            </p>
          </div>
          <button
            onClick={() => setShowNewPost(true)}
            className="inline-flex items-center gap-2 bg-[#dd8157] hover:bg-[#c86d47] text-white px-6 py-3 rounded-lg font-bold transition whitespace-nowrap flex-shrink-0 self-start"
          >
            <Plus className="w-5 h-5" />
            Create New Post
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content: Pinned + Recent Activity */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pinned Posts */}
              {pinnedPosts.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Pin className="w-5 h-5 text-[#dd8157]" />
                    Pinned
                  </h2>
                  <div className="space-y-2">
                    {pinnedPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/network/forums/${post.forum.slug}/${post.id}`}
                        className="block bg-white rounded-xl border-2 border-[#dd8157]/20 hover:border-[#dd8157] hover:shadow-md transition p-5"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-[#363b57] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {post.author.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900 truncate">{post.title}</h3>
                              <Pin className="w-3.5 h-3.5 text-[#dd8157] flex-shrink-0" />
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                              <span>{post.author.name}</span>
                              <span className="text-[#dd8157] font-medium">{post.forum.name}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {timeAgo(post.createdAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {post.commentCount}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {post.viewCount}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                {recentPosts.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">No posts yet.</p>
                    <p className="text-sm text-gray-400">Be the first to start a discussion in one of the forums!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recentPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/network/forums/${post.forum.slug}/${post.id}`}
                        className="block bg-white rounded-xl border border-gray-200 hover:border-[#dd8157] hover:shadow-md transition p-5"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-[#363b57] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {post.author.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 truncate mb-1">{post.title}</h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                              <span>{post.author.name}</span>
                              <span className="text-[#dd8157] font-medium">{post.forum.name}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {timeAgo(post.createdAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {post.commentCount}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {post.viewCount}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar: Forum Categories */}
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search forums..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent bg-white"
                />
              </div>

              {/* Categories */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  Browse Forums
                  <span className="text-sm font-normal text-gray-500 ml-2">({totalForums})</span>
                </h2>

                {filteredCategories.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                    <p className="text-sm text-gray-500">
                      {searchQuery ? 'No forums match your search.' : 'No forums available.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCategories.map((category) => (
                      <div key={category.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                          <h3 className="font-bold text-sm text-[#363b57]">{category.name}</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                          {category.forums.map((forum) => (
                            <Link
                              key={forum.id}
                              href={`/network/forums/${forum.slug}`}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition group"
                            >
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-[#363b57] flex-shrink-0 group-hover:bg-[#dd8157]/10 group-hover:text-[#dd8157] transition">
                                <MessageCircle className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#dd8157] transition">
                                    {forum.name}
                                  </span>
                                  {forum.accessLevel !== 'public' && (
                                    <Lock className="w-3 h-3 text-[#dd8157] flex-shrink-0" />
                                  )}
                                </div>
                                <span className="text-xs text-gray-500">
                                  {forum.postCount} {forum.postCount === 1 ? 'post' : 'posts'}
                                </span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* New Post Modal */}
        {showNewPost && (
          <>
            <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowNewPost(false)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Create New Post</h2>
                  <button
                    onClick={() => setShowNewPost(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleCreatePost} className="p-6 space-y-4">
                  {postError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                      {postError}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Forum</label>
                    <select
                      value={selectedForumId}
                      onChange={(e) => setSelectedForumId(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent bg-white"
                      required
                    >
                      <option value="">Select a forum...</option>
                      {categories.map((cat) => (
                        <optgroup key={cat.id} label={cat.name}>
                          {cat.forums.map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="What's your topic about?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <RichTextEditor
                      content={newContent}
                      onChange={setNewContent}
                      placeholder="Share your question, insight, or experience..."
                      variant="post"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewPost(false)}
                      className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={posting || !newTitle.trim() || isEditorContentEmpty(newContent) || !selectedForumId}
                      className="px-5 py-2 text-sm font-bold text-white bg-[#dd8157] hover:bg-[#c86d47] rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {posting ? 'Posting...' : 'Create Post'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
