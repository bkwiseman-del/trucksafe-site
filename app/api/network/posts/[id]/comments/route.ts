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

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionUser = await getAuthenticatedUser()
  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { content } = body

  const sanitized = content ? sanitizeContent(content) : ''

  if (isSanitizedContentEmpty(sanitized)) {
    return NextResponse.json(
      { error: 'Comment content is required.' },
      { status: 400 }
    )
  }

  // Verify post exists and user has access to its forum
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      locked: true,
      forum: { select: { accessLevel: true } },
    },
  })

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  if (post.locked) {
    return NextResponse.json(
      { error: 'This post is locked and cannot receive new comments.' },
      { status: 403 }
    )
  }

  const userRoles = await prisma.userRole.findMany({
    where: { userId: sessionUser.id },
    select: { role: true },
  })
  const roleNames = userRoles.map((r) => r.role)

  if (!userHasAccess(post.forum.accessLevel, roleNames)) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  const comment = await prisma.comment.create({
    data: {
      content: sanitized,
      postId: post.id,
      authorId: sessionUser.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: {
        select: { id: true, name: true },
      },
    },
  })

  return NextResponse.json(
    {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      author: {
        id: comment.author.id,
        name: comment.author.name || 'Member',
        initials:
          comment.author.name
            ?.split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase() || '?',
      },
    },
    { status: 201 }
  )
}
