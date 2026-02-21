import { NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function getCurrentQuarter(): string {
  const now = new Date()
  const q = Math.ceil((now.getMonth() + 1) / 3)
  return `${now.getFullYear()}-Q${q}`
}

export async function GET() {
  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const quarterYear = getCurrentQuarter()

  const record = await prisma.consultingHours.findUnique({
    where: {
      userId_quarterYear: {
        userId: user.id,
        quarterYear,
      },
    },
  })

  if (!record) {
    return NextResponse.json({ hours: null })
  }

  return NextResponse.json({
    hours: {
      quarterYear: record.quarterYear,
      hoursAllotted: record.hoursAllotted,
      hoursUsed: record.hoursUsed,
    },
  })
}
