import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser } from '@/lib/auth'

export async function GET() {
  try {
    const sessionUser = await getAuthenticatedUser()
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: {
        name: true,
        email: true,
        password: true,
        createdAt: true,
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
          select: { role: true, metadata: true },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      hasPassword: user.password !== null,
      profile: user.profile ?? {
        company: null,
        title: null,
        bio: null,
        phone: null,
        location: null,
        website: null,
      },
      roles: user.roles,
    })
  } catch (error: any) {
    console.error('[user/profile GET] error:', error)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const sessionUser = await getAuthenticatedUser()
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, company, title, bio, phone, location, website } = await req.json()

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required.' },
        { status: 400 }
      )
    }

    await prisma.user.update({
      where: { id: sessionUser.id },
      data: { name: name.trim() },
    })

    await prisma.profile.upsert({
      where: { userId: sessionUser.id },
      create: {
        userId: sessionUser.id,
        company: company?.trim() || null,
        title: title?.trim() || null,
        bio: bio?.trim() || null,
        phone: phone?.trim() || null,
        location: location?.trim() || null,
        website: website?.trim() || null,
      },
      update: {
        company: company?.trim() || null,
        title: title?.trim() || null,
        bio: bio?.trim() || null,
        phone: phone?.trim() || null,
        location: location?.trim() || null,
        website: website?.trim() || null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[user/profile PUT] error:', error)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
