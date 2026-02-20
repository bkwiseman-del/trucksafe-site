import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await requireAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      image: true,
      emailSubscribed: true,
      lastActiveAt: true,
      profile: {
        select: {
          company: true,
          title: true,
          bio: true,
          phone: true,
          location: true,
          website: true,
        },
      },
      roles: {
        select: { id: true, role: true, createdAt: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}
