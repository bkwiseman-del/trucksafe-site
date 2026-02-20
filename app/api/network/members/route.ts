import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const sessionUser = await getAuthenticatedUser()
  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search')?.trim() || ''
  const role = searchParams.get('role') || ''
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = 20

  // Build where clause
  const where: any = {}

  // Only show users who have showInDirectory = true (or no PrivacySettings record, which defaults to true)
  // AND profileVisibility is not 'private'
  where.OR = [
    { privacySettings: null },
    {
      privacySettings: {
        showInDirectory: true,
        profileVisibility: { not: 'private' },
      },
    },
  ]

  // Search by name, company, or location
  if (search) {
    where.AND = [
      {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { profile: { company: { contains: search, mode: 'insensitive' } } },
          { profile: { location: { contains: search, mode: 'insensitive' } } },
        ],
      },
    ]
  }

  // Filter by role
  if (role) {
    where.roles = { some: { role } }
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        profile: {
          select: {
            company: true,
            title: true,
            location: true,
          },
        },
        roles: {
          select: { role: true },
        },
        privacySettings: {
          select: {
            showEmail: true,
            showPhone: true,
            showCompany: true,
            profileVisibility: true,
          },
        },
      },
      orderBy: { name: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.user.count({ where }),
  ])

  // Apply privacy rules to the response
  const members = users.map((u) => {
    const privacy = u.privacySettings
    const initials =
      u.name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase() || '?'

    return {
      id: u.id,
      name: u.name || 'Member',
      initials,
      image: u.image,
      email: privacy?.showEmail ? u.email : null,
      company: privacy?.showCompany !== false ? u.profile?.company : null,
      title: u.profile?.title || null,
      location: u.profile?.location || null,
      roles: u.roles.map((r) => r.role),
      joinedAt: u.createdAt,
    }
  })

  return NextResponse.json({
    members,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  })
}
