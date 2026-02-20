import { NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function POST() {
  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  })

  if (!subscription || !['active', 'trialing'].includes(subscription.status)) {
    return NextResponse.json({ error: 'No active subscription found' }, { status: 400 })
  }

  // Cancel at period end (user keeps access until billing period ends)
  await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
    cancel_at_period_end: true,
  })

  await prisma.subscription.update({
    where: { userId: user.id },
    data: { cancelAtPeriodEnd: true },
  })

  return NextResponse.json({
    success: true,
    cancelAt: subscription.currentPeriodEnd,
  })
}
