import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin'

const VALID_ROLES = [
  'ADMIN',
  'NETWORK_MEMBER',
  'COMPLIANCE_BASIC',
  'COMPLIANCE_PRO',
  'COMPLIANCE_PREMIUM',
  'CLIENT',
  'ACADEMY_ACCESS',
  'TSC_CERTIFIED',
  'BOOTCAMP_ATTENDEE',
  'BOOTCAMP_ALUMNI',
]

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await requireAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { role } = await req.json()

  if (!role || !VALID_ROLES.includes(role)) {
    return NextResponse.json(
      { error: 'Invalid role.' },
      { status: 400 }
    )
  }

  const userExists = await prisma.user.findUnique({
    where: { id: params.id },
    select: { id: true },
  })

  if (!userExists) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 })
  }

  try {
    await prisma.userRole.create({
      data: { userId: params.id, role },
    })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'User already has this role.' },
        { status: 409 }
      )
    }
    throw error
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await requireAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { role } = await req.json()

  if (!role) {
    return NextResponse.json(
      { error: 'Role is required.' },
      { status: 400 }
    )
  }

  try {
    await prisma.userRole.delete({
      where: {
        userId_role: { userId: params.id, role },
      },
    })
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json(
        { error: 'Role not found on this user.' },
        { status: 404 }
      )
    }
    throw error
  }

  return NextResponse.json({ success: true })
}
