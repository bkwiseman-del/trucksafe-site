import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser } from '@/lib/auth'

const DEFAULTS = {
  showInDirectory: true,
  allowDirectMessages: true,
  showEmail: false,
  showPhone: false,
  showCompany: true,
  profileVisibility: 'public',
}

const VALID_VISIBILITIES = ['public', 'members', 'private']

export async function GET() {
  try {
    const sessionUser = await getAuthenticatedUser()
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settings = await prisma.privacySettings.findUnique({
      where: { userId: sessionUser.id },
      select: {
        showInDirectory: true,
        allowDirectMessages: true,
        showEmail: true,
        showPhone: true,
        showCompany: true,
        profileVisibility: true,
      },
    })

    return NextResponse.json(settings ?? DEFAULTS)
  } catch (error: any) {
    console.error('[user/privacy GET] error:', error)
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

    const body = await req.json()

    if (body.profileVisibility && !VALID_VISIBILITIES.includes(body.profileVisibility)) {
      return NextResponse.json(
        { error: 'Profile visibility must be public, members, or private.' },
        { status: 400 }
      )
    }

    const fields = {
      showInDirectory: Boolean(body.showInDirectory),
      allowDirectMessages: Boolean(body.allowDirectMessages),
      showEmail: Boolean(body.showEmail),
      showPhone: Boolean(body.showPhone),
      showCompany: Boolean(body.showCompany),
      profileVisibility: body.profileVisibility || 'public',
    }

    await prisma.privacySettings.upsert({
      where: { userId: sessionUser.id },
      create: { userId: sessionUser.id, ...fields },
      update: fields,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[user/privacy PUT] error:', error)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
