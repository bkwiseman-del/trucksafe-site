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

  if (!subscription || !subscription.cancelAtPeriodEnd) {
    return NextResponse.json({ error: 'No pending cancellation found' }, { status: 400 })
  }

  // Remove the cancellation
  await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
    cancel_at_period_end: false,
  })

  await prisma.subscription.update({
    where: { userId: user.id },
    data: { cancelAtPeriodEnd: false },
  })

  return NextResponse.json({ success: true })
}
