import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sanitizeContent, isSanitizedContentEmpty } from '@/lib/sanitize'

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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionUser = await getAuthenticatedUser()
  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      author: {
        select: { id: true, name: true, image: true, createdAt: true },
      },
      forum: {
        select: {
          id: true,
          name: true,
          slug: true,
          accessLevel: true,
          category: { select: { name: true, slug: true } },
        },
      },
      comments: {
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          content: true,
          createdAt: true,
          author: {
            select: { id: true, name: true, image: true },
          },
        },
      },
    },
  })

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  // Check access
  const userRoles = await prisma.userRole.findMany({
    where: { userId: sessionUser.id },
    select: { role: true },
  })
  const roleNames = userRoles.map((r) => r.role)

  if (!userHasAccess(post.forum.accessLevel, roleNames)) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  // Increment view count
  await prisma.post.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  })

  const getInitials = (name: string | null) =>
    name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || '?'

  return NextResponse.json({
    id: post.id,
    title: post.title,
    content: post.content,
    pinned: post.pinned,
    locked: post.locked,
    viewCount: post.viewCount + 1,
    createdAt: post.createdAt,
    author: {
      id: post.author.id,
      name: post.author.name || 'Member',
      initials: getInitials(post.author.name),
      joinedAt: post.author.createdAt,
    },
    forum: {
      id: post.forum.id,
      name: post.forum.name,
      slug: post.forum.slug,
      category: post.forum.category,
    },
    comments: post.comments.map((c) => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      author: {
        id: c.author.id,
        name: c.author.name || 'Member',
        initials: getInitials(c.author.name),
      },
    })),
  })
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionUser = await getAuthenticatedUser()
  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const post = await prisma.post.findUnique({
    where: { id: params.id },
    select: { authorId: true },
  })

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  // Only the author or an admin can edit
  const userRoles = await prisma.userRole.findMany({
    where: { userId: sessionUser.id },
    select: { role: true },
  })
  const isAdmin = userRoles.some((r) => r.role === 'ADMIN')

  if (post.authorId !== sessionUser.id && !isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { title, content } = body

  const sanitized = content ? sanitizeContent(content) : ''

  if (!title?.trim() || isSanitizedContentEmpty(sanitized)) {
    return NextResponse.json(
      { error: 'Title and content are required.' },
      { status: 400 }
    )
  }

  const updated = await prisma.post.update({
    where: { id: params.id },
    data: {
      title: title.trim(),
      content: sanitized,
      updatedAt: new Date(),
    },
    select: { id: true, title: true, content: true, updatedAt: true },
  })

  return NextResponse.json(updated)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionUser = await getAuthenticatedUser()
  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Only admins can pin/unpin
  const userRoles = await prisma.userRole.findMany({
    where: { userId: sessionUser.id },
    select: { role: true },
  })
  const isAdmin = userRoles.some((r) => r.role === 'ADMIN')

  if (!isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const post = await prisma.post.findUnique({
    where: { id: params.id },
    select: { id: true, pinned: true },
  })

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const updated = await prisma.post.update({
    where: { id: params.id },
    data: { pinned: !post.pinned },
    select: { id: true, pinned: true },
  })

  return NextResponse.json(updated)
}
