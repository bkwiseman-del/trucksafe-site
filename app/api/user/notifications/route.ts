import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser } from '@/lib/auth'

const DEFAULTS = {
  emailNotifications: true,
  pushNotifications: true,
  newPostAlerts: true,
  newCommentAlerts: true,
  directMessageAlerts: true,
  eventReminders: true,
  weeklyDigest: true,
  marketingEmails: false,
}

export async function GET() {
  try {
    const sessionUser = await getAuthenticatedUser()
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const prefs = await prisma.notificationPreferences.findUnique({
      where: { userId: sessionUser.id },
      select: {
        emailNotifications: true,
        pushNotifications: true,
        newPostAlerts: true,
        newCommentAlerts: true,
        directMessageAlerts: true,
        eventReminders: true,
        weeklyDigest: true,
        marketingEmails: true,
      },
    })

    return NextResponse.json(prefs ?? DEFAULTS)
  } catch (error: any) {
    console.error('[user/notifications GET] error:', error)
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

    const fields = {
      emailNotifications: Boolean(body.emailNotifications),
      pushNotifications: Boolean(body.pushNotifications),
      newPostAlerts: Boolean(body.newPostAlerts),
      newCommentAlerts: Boolean(body.newCommentAlerts),
      directMessageAlerts: Boolean(body.directMessageAlerts),
      eventReminders: Boolean(body.eventReminders),
      weeklyDigest: Boolean(body.weeklyDigest),
      marketingEmails: Boolean(body.marketingEmails),
    }

    await prisma.notificationPreferences.upsert({
      where: { userId: sessionUser.id },
      create: { userId: sessionUser.id, ...fields },
      update: fields,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[user/notifications PUT] error:', error)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
