import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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
  { params }: { params: { slug: string } }
) {
  const sessionUser = await getAuthenticatedUser()
  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = params
  const { searchParams } = new URL(req.url)
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = 20

  // Fetch forum with category
  const forum = await prisma.forum.findUnique({
    where: { slug },
    include: {
      category: { select: { name: true, slug: true } },
    },
  })

  if (!forum) {
    return NextResponse.json({ error: 'Forum not found' }, { status: 404 })
  }

  // Check access
  const userRoles = await prisma.userRole.findMany({
    where: { userId: sessionUser.id },
    select: { role: true },
  })
  const roleNames = userRoles.map((r) => r.role)

  if (!userHasAccess(forum.accessLevel, roleNames)) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  // Fetch posts
  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      where: { forumId: forum.id },
      orderBy: [{ pinned: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        title: true,
        pinned: true,
        locked: true,
        viewCount: true,
        createdAt: true,
        author: {
          select: { id: true, name: true },
        },
        _count: { select: { comments: true } },
      },
    }),
    prisma.post.count({ where: { forumId: forum.id } }),
  ])

  return NextResponse.json({
    forum: {
      id: forum.id,
      name: forum.name,
      slug: forum.slug,
      description: forum.description,
      accessLevel: forum.accessLevel,
      category: forum.category,
    },
    posts: posts.map((p) => ({
      id: p.id,
      title: p.title,
      pinned: p.pinned,
      locked: p.locked,
      viewCount: p.viewCount,
      commentCount: p._count.comments,
      createdAt: p.createdAt,
      author: {
        id: p.author.id,
        name: p.author.name || 'Member',
        initials:
          p.author.name
            ?.split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase() || '?',
      },
    })),
    totalPosts,
    page,
    totalPages: Math.ceil(totalPosts / limit),
  })
}
