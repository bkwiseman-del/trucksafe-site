import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe, getOrCreateStripeCustomer } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { tierId } = await req.json()
  if (!tierId) {
    return NextResponse.json({ error: 'tierId is required' }, { status: 400 })
  }

  // Get the tier to find the Stripe Price ID
  const tier = await prisma.subscriptionTier.findUnique({
    where: { id: tierId },
  })

  if (!tier) {
    return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
  }

  // Check if user already has an active subscription
  const existingSub = await prisma.subscription.findUnique({
    where: { userId: user.id },
  })

  if (existingSub && ['active', 'trialing'].includes(existingSub.status)) {
    return NextResponse.json(
      { error: 'You already have an active subscription. Please manage it from your billing page.' },
      { status: 400 }
    )
  }

  // Get user details for Stripe customer creation
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { email: true, name: true },
  })

  if (!dbUser?.email) {
    return NextResponse.json({ error: 'User email not found' }, { status: 400 })
  }

  const stripeCustomerId = await getOrCreateStripeCustomer(
    user.id,
    dbUser.email,
    dbUser.name
  )

  // Create Stripe Subscription with incomplete status (waits for payment)
  // Cast to any to handle Stripe SDK v20 type differences
  const subscription: any = await stripe.subscriptions.create({
    customer: stripeCustomerId,
    items: [{ price: tier.stripePriceId }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
    metadata: { userId: user.id, tierId: tier.id },
  })

  const clientSecret = subscription.latest_invoice?.payment_intent?.client_secret

  if (!clientSecret) {
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 })
  }

  // Store preliminary subscription record
  const subData = {
    tierId: tier.id,
    stripeCustomerId,
    stripeSubscriptionId: subscription.id,
    status: subscription.status as string,
    currentPeriodStart: new Date(subscription.current_period_start * 1000),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    cancelAtPeriodEnd: false,
  }

  if (existingSub) {
    await prisma.subscription.update({
      where: { userId: user.id },
      data: subData,
    })
  } else {
    await prisma.subscription.create({
      data: { userId: user.id, ...subData },
    })
  }

  return NextResponse.json({
    subscriptionId: subscription.id,
    clientSecret,
  })
}
