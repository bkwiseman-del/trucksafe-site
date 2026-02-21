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
    include: { tier: true },
  })

  if (!subscription || !['active', 'trialing'].includes(subscription.status)) {
    return NextResponse.json({ error: 'No active subscription found' }, { status: 400 })
  }

  // Enforce minimum term
  if (subscription.minimumTermEnd && new Date() < subscription.minimumTermEnd) {
    const endDate = subscription.minimumTermEnd.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    return NextResponse.json(
      {
        error: `Your ${subscription.tier.displayName} plan has a 12-month minimum commitment. You can cancel after ${endDate}.`,
        minimumTermEnd: subscription.minimumTermEnd,
      },
      { status: 403 }
    )
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
