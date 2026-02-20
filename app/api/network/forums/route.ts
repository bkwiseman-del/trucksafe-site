import { NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Maps accessLevel to the roles that grant access
function userHasAccess(accessLevel: string, roles: string[]): boolean {
  switch (accessLevel) {
    case 'public':
      return true
    case 'basic':
      return roles.some((r) =>
        ['COMPLIANCE_BASIC', 'COMPLIANCE_PRO', 'COMPLIANCE_PREMIUM', 'ADMIN'].includes(r)
      )
    case 'pro':
      return roles.some((r) =>
        ['COMPLIANCE_PRO', 'COMPLIANCE_PREMIUM', 'ADMIN'].includes(r)
      )
    case 'premium':
      return roles.some((r) => ['COMPLIANCE_PREMIUM', 'ADMIN'].includes(r))
    case 'bootcamp':
      return roles.some((r) =>
        ['BOOTCAMP_ATTENDEE', 'BOOTCAMP_ALUMNI', 'ADMIN'].includes(r)
      )
    case 'certified':
      return roles.some((r) => ['TSC_CERTIFIED', 'ADMIN'].includes(r))
    default:
      return false
  }
}

export async function GET() {
  const sessionUser = await getAuthenticatedUser()
  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get user's roles
  const userRoles = await prisma.userRole.findMany({
    where: { userId: sessionUser.id },
    select: { role: true },
  })
  const roleNames = userRoles.map((r) => r.role)

  // Fetch all categories with forums
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: {
      forums: {
        orderBy: { order: 'asc' },
        include: {
          _count: { select: { posts: true } },
          posts: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
              title: true,
              createdAt: true,
              author: { select: { name: true } },
            },
          },
        },
      },
    },
  })

  // Get IDs of forums the user can access
  const accessibleForumIds = categories
    .flatMap((cat) => cat.forums)
    .filter((f) => userHasAccess(f.accessLevel, roleNames))
    .map((f) => f.id)

  const postSelect = {
    id: true,
    title: true,
    pinned: true,
    createdAt: true,
    viewCount: true,
    author: { select: { id: true, name: true } },
    forum: { select: { name: true, slug: true } },
    _count: { select: { comments: true } },
  } as const

  // Fetch pinned posts across all accessible forums
  const pinnedPosts = await prisma.post.findMany({
    where: { forumId: { in: accessibleForumIds }, pinned: true },
    orderBy: { createdAt: 'desc' },
    select: postSelect,
  })

  // Fetch recent non-pinned posts
  const recentPosts = await prisma.post.findMany({
    where: { forumId: { in: accessibleForumIds }, pinned: false },
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: postSelect,
  })

  // Filter forums by access level and format response
  const categoriesResult = categories
    .map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      forums: cat.forums
        .filter((f) => userHasAccess(f.accessLevel, roleNames))
        .map((f) => {
          const lastPost = f.posts[0] || null
          return {
            id: f.id,
            name: f.name,
            slug: f.slug,
            description: f.description,
            accessLevel: f.accessLevel,
            postCount: f._count.posts,
            lastPost: lastPost
              ? {
                  title: lastPost.title,
                  author: lastPost.author.name || 'Member',
                  time: lastPost.createdAt,
                }
              : null,
          }
        }),
    }))
    .filter((cat) => cat.forums.length > 0)

  const getInitials = (name: string | null) =>
    name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || '?'

  const formatPost = (p: (typeof pinnedPosts)[number]) => ({
    id: p.id,
    title: p.title,
    pinned: p.pinned,
    createdAt: p.createdAt,
    viewCount: p.viewCount,
    commentCount: p._count.comments,
    author: {
      id: p.author.id,
      name: p.author.name || 'Member',
      initials: getInitials(p.author.name),
    },
    forum: { name: p.forum.name, slug: p.forum.slug },
  })

  return NextResponse.json({
    categories: categoriesResult,
    pinnedPosts: pinnedPosts.map(formatPost),
    recentPosts: recentPosts.map(formatPost),
  })
}
