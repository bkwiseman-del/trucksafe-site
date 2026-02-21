import { NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
    include: {
      tier: true,
    },
  })

  if (!subscription) {
    return NextResponse.json({ subscription: null })
  }

  return NextResponse.json({
    subscription: {
      id: subscription.id,
      status: subscription.status,
      tierName: subscription.tier.name,
      displayName: subscription.tier.displayName,
      price: subscription.tier.price,
      interval: subscription.tier.interval,
      features: subscription.tier.features,
      currentPeriodStart: subscription.currentPeriodStart,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      minimumTermEnd: subscription.minimumTermEnd,
      minimumTermMonths: subscription.tier.minimumTermMonths,
    },
  })
}
