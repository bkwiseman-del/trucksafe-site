'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useUser } from '@/hooks/useUser'
import { isEditorContentEmpty } from '@/lib/editor-utils'
import Link from 'next/link'
import {
  MessageCircle,
  Eye,
  Clock,
  Plus,
  Pin,
  Lock,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false })

interface PostItem {
  id: string
  title: string
  pinned: boolean
  locked: boolean
  viewCount: number
  commentCount: number
  createdAt: string
  author: { id: string; name: string; initials: string }
}

interface ForumInfo {
  id: string
  name: string
  slug: string
  description: string | null
  accessLevel: string
  category: { name: string; slug: string }
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

export default function ForumDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const { user, isLoading: authLoading } = useUser()
  const [forum, setForum] = useState<ForumInfo | null>(null)
  const [posts, setPosts] = useState<PostItem[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)

  // New post modal state
  const [showNewPost, setShowNewPost] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [posting, setPosting] = useState(false)
  const [postError, setPostError] = useState('')

  const fetchForum = async () => {
    try {
      const res = await fetch(`/api/network/forums/${slug}?page=${page}`)
      if (!res.ok) {
        router.push('/network/forums')
        return
      }
      const data = await res.json()
      setForum(data.forum)
      setPosts(data.posts)
      setTotalPages(data.totalPages)
      setTotalPosts(data.totalPosts)
    } catch {
      router.push('/network/forums')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading && user) {
      fetchForum()
    }
  }, [authLoading, user?.id, slug, page])

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || isEditorContentEmpty(newContent) || !forum) return

    setPosting(true)
    setPostError('')

    try {
      const res = await fetch('/api/network/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          forumId: forum.id,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setPostError(data.error || 'Failed to create post.')
        return
      }

      const data = await res.json()
      setShowNewPost(false)
      setNewTitle('')
      setNewContent('')
      // Navigate to the new post
      router.push(`/network/forums/${slug}/${data.id}`)
    } catch {
      setPostError('Something went wrong.')
    } finally {
      setPosting(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (!forum) return null

  return (
    <div className="pt-32 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/network/forums" className="hover:text-[#dd8157] transition">
            Forums
          </Link>
          <span>/</span>
          <span className="text-gray-400">{forum.category.name}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{forum.name}</span>
        </div>

        {/* Forum Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">{forum.name}</h1>
              {forum.description && (
                <p className="text-gray-600">{forum.description}</p>
              )}
            </div>
            <button
              onClick={() => setShowNewPost(true)}
              className="inline-flex items-center gap-2 bg-[#dd8157] hover:bg-[#c86d47] text-white px-5 py-2.5 rounded-lg font-bold transition whitespace-nowrap flex-shrink-0"
            >
              <Plus className="w-5 h-5" />
              New Post
            </button>
          </div>
        </div>

        {/* Post Count */}
        <div className="text-sm text-gray-500 mb-4">
          {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
        </div>

        {/* Post List */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No posts yet. Be the first to start a discussion!</p>
            <button
              onClick={() => setShowNewPost(true)}
              className="inline-flex items-center gap-2 bg-[#dd8157] hover:bg-[#c86d47] text-white px-5 py-2.5 rounded-lg font-bold transition"
            >
              <Plus className="w-5 h-5" />
              Create First Post
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/network/forums/${slug}/${post.id}`}
                className="block bg-white rounded-xl border border-gray-200 hover:border-[#dd8157] hover:shadow-md transition p-5"
              >
                <div className="flex items-start gap-4">
                  {/* Author Avatar */}
                  <div className="w-10 h-10 bg-[#363b57] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {post.author.initials}
                  </div>

                  {/* Post Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {post.pinned && (
                        <Pin className="w-3.5 h-3.5 text-[#dd8157] flex-shrink-0" />
                      )}
                      {post.locked && (
                        <Lock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      )}
                      <h3 className="font-bold text-gray-900 truncate">{post.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{post.author.name}</span>
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
                  <h2 className="text-xl font-bold text-gray-900">New Post in {forum.name}</h2>
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
                      disabled={posting || !newTitle.trim() || isEditorContentEmpty(newContent)}
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
