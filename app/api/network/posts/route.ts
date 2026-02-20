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

export async function POST(req: NextRequest) {
  const sessionUser = await getAuthenticatedUser()
  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { title, content, forumId } = body

  const sanitized = content ? sanitizeContent(content) : ''

  if (!title?.trim() || isSanitizedContentEmpty(sanitized) || !forumId) {
    return NextResponse.json(
      { error: 'Title, content, and forumId are required.' },
      { status: 400 }
    )
  }

  // Verify forum exists and user has access
  const forum = await prisma.forum.findUnique({
    where: { id: forumId },
    select: { id: true, accessLevel: true },
  })

  if (!forum) {
    return NextResponse.json({ error: 'Forum not found' }, { status: 404 })
  }

  const userRoles = await prisma.userRole.findMany({
    where: { userId: sessionUser.id },
    select: { role: true },
  })
  const roleNames = userRoles.map((r) => r.role)

  if (!userHasAccess(forum.accessLevel, roleNames)) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  const post = await prisma.post.create({
    data: {
      title: title.trim(),
      content: sanitized,
      forumId: forum.id,
      authorId: sessionUser.id,
    },
    select: { id: true },
  })

  return NextResponse.json({ id: post.id }, { status: 201 })
}
