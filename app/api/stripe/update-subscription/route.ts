import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { newTierId } = await req.json()
  if (!newTierId) {
    return NextResponse.json({ error: 'newTierId is required' }, { status: 400 })
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  })

  if (!subscription || !['active', 'trialing'].includes(subscription.status)) {
    return NextResponse.json({ error: 'No active subscription found' }, { status: 400 })
  }

  const newTier = await prisma.subscriptionTier.findUnique({
    where: { id: newTierId },
  })

  if (!newTier) {
    return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
  }

  // Get current Stripe subscription to find the item ID
  const stripeSub: any = await stripe.subscriptions.retrieve(subscription.stripeSubscriptionId)

  // Update the subscription with the new price
  const updated: any = await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
    items: [
      {
        id: stripeSub.items.data[0].id,
        price: newTier.stripePriceId,
      },
    ],
    proration_behavior: 'create_prorations',
    metadata: { tierId: newTier.id },
  })

  // Update local record
  await prisma.subscription.update({
    where: { userId: user.id },
    data: {
      tierId: newTier.id,
      status: updated.status as string,
      currentPeriodStart: new Date(updated.current_period_start * 1000),
      currentPeriodEnd: new Date(updated.current_period_end * 1000),
    },
  })

  return NextResponse.json({ success: true, tier: newTier.displayName })
}
