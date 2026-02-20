'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useUser } from '@/hooks/useUser'
import { isEditorContentEmpty } from '@/lib/editor-utils'
import RichTextContent from '@/components/RichTextContent'
import Link from 'next/link'
import {
  MessageCircle,
  Eye,
  Clock,
  Pin,
  Lock,
  Send,
  Pencil,
} from 'lucide-react'

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false })

interface CommentData {
  id: string
  content: string
  createdAt: string
  author: { id: string; name: string; initials: string }
}

interface PostData {
  id: string
  title: string
  content: string
  pinned: boolean
  locked: boolean
  viewCount: number
  createdAt: string
  author: { id: string; name: string; initials: string; joinedAt: string }
  forum: { id: string; name: string; slug: string; category: { name: string; slug: string } }
  comments: CommentData[]
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
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function PostDetailPage() {
  const { slug, postId } = useParams()
  const router = useRouter()
  const { user, access, isLoading: authLoading } = useUser()
  const [post, setPost] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)

  // Edit state
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [editError, setEditError] = useState('')

  // Pin state
  const [pinning, setPinning] = useState(false)

  // Comment state
  const [commentContent, setCommentContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [commentError, setCommentError] = useState('')

  useEffect(() => {
    if (authLoading || !user) return

    async function fetchPost() {
      try {
        const res = await fetch(`/api/network/posts/${postId}`)
        if (!res.ok) {
          router.push(`/network/forums/${slug}`)
          return
        }
        const data = await res.json()
        setPost(data)
      } catch {
        router.push(`/network/forums/${slug}`)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [authLoading, user?.id, postId, slug, router])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditorContentEmpty(commentContent) || !post) return

    setSubmitting(true)
    setCommentError('')

    try {
      const res = await fetch(`/api/network/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentContent }),
      })

      if (!res.ok) {
        const data = await res.json()
        setCommentError(data.error || 'Failed to post comment.')
        return
      }

      const newComment = await res.json()
      setPost((prev) =>
        prev ? { ...prev, comments: [...prev.comments, newComment] } : prev
      )
      setCommentContent('')
    } catch {
      setCommentError('Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  const canEdit =
    post &&
    user &&
    (post.author.id === user.id || access?.isAdmin)

  const handleStartEdit = () => {
    if (!post) return
    setEditTitle(post.title)
    setEditContent(post.content)
    setEditError('')
    setEditing(true)
  }

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editTitle.trim() || isEditorContentEmpty(editContent)) return

    setSaving(true)
    setEditError('')

    try {
      const res = await fetch(`/api/network/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      })

      if (!res.ok) {
        const data = await res.json()
        setEditError(data.error || 'Failed to save changes.')
        return
      }

      const updated = await res.json()
      setPost((prev) =>
        prev
          ? { ...prev, title: updated.title, content: updated.content }
          : prev
      )
      setEditing(false)
    } catch {
      setEditError('Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  const handleTogglePin = async () => {
    if (!post || pinning) return
    setPinning(true)
    try {
      const res = await fetch(`/api/network/posts/${postId}`, { method: 'PATCH' })
      if (res.ok) {
        const data = await res.json()
        setPost((prev) => (prev ? { ...prev, pinned: data.pinned } : prev))
      }
    } catch {
      // silently fail
    } finally {
      setPinning(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (!post) return null

  return (
    <div className="pt-32 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/network/forums" className="hover:text-[#dd8157] transition">
            Forums
          </Link>
          <span>/</span>
          <span className="text-gray-400">{post.forum.category.name}</span>
          <span>/</span>
          <Link
            href={`/network/forums/${post.forum.slug}`}
            className="hover:text-[#dd8157] transition"
          >
            {post.forum.name}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{post.title}</span>
        </div>

        {/* Post */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          {/* Post Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {post.pinned && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-[#dd8157]/10 text-[#dd8157] rounded">
                    <Pin className="w-3 h-3" />
                    Pinned
                  </span>
                )}
                {post.locked && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-500 rounded">
                    <Lock className="w-3 h-3" />
                    Locked
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {access?.isAdmin && !editing && (
                  <button
                    onClick={handleTogglePin}
                    disabled={pinning}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                      post.pinned
                        ? 'text-[#dd8157] bg-[#dd8157]/10 hover:bg-[#dd8157]/20'
                        : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <Pin className="w-3.5 h-3.5" />
                    {pinning ? '...' : post.pinned ? 'Unpin' : 'Pin'}
                  </button>
                )}
                {canEdit && !editing && (
                  <button
                    onClick={handleStartEdit}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </button>
                )}
              </div>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.viewCount} views
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {post.comments.length} {post.comments.length === 1 ? 'reply' : 'replies'}
              </span>
            </div>
          </div>

          {/* Post Body */}
          <div className="p-6">
            <div className="flex gap-4">
              {/* Author */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="w-12 h-12 bg-[#363b57] rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {post.author.initials}
                </div>
                <span className="text-xs font-semibold text-gray-900">{post.author.name}</span>
                <span className="text-[10px] text-gray-400">
                  Joined {new Date(post.author.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>

              {/* Content or Edit Form */}
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-400 mb-3">
                  {formatDate(post.createdAt)}
                </div>
                {editing ? (
                  <form onSubmit={handleSaveEdit} className="space-y-3">
                    {editError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                        {editError}
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Content</label>
                      <RichTextEditor
                        content={editContent}
                        onChange={setEditContent}
                        variant="post"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        disabled={saving || !editTitle.trim() || isEditorContentEmpty(editContent)}
                        className="px-4 py-1.5 text-sm font-bold text-white bg-[#dd8157] hover:bg-[#c86d47] rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditing(false)}
                        className="px-4 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <RichTextContent content={post.content} className="text-gray-800" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {post.comments.length} {post.comments.length === 1 ? 'Reply' : 'Replies'}
          </h2>

          {post.comments.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">No replies yet. Be the first to respond!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white rounded-xl border border-gray-200 p-5"
                >
                  <div className="flex gap-4">
                    {/* Author Avatar */}
                    <div className="w-10 h-10 bg-[#363b57] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {comment.author.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-900 text-sm">
                          {comment.author.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {timeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <RichTextContent content={comment.content} className="text-gray-700 text-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Comment */}
        {post.locked ? (
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
            <Lock className="w-5 h-5 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">This post is locked and cannot receive new replies.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Post a Reply</h3>
            {commentError && (
              <div className="p-3 mb-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                {commentError}
              </div>
            )}
            <form onSubmit={handleSubmitComment}>
              <div className="mb-3">
                <RichTextEditor
                  content={commentContent}
                  onChange={setCommentContent}
                  placeholder="Write your reply..."
                  variant="comment"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting || isEditorContentEmpty(commentContent)}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#dd8157] hover:bg-[#c86d47] rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Posting...' : 'Post Reply'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
