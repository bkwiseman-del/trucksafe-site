import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe, getOrCreateStripeCustomer } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
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

    // Check if user already has a subscription
    const existingSub = await prisma.subscription.findUnique({
      where: { userId: user.id },
    })

    if (existingSub && ['active', 'trialing'].includes(existingSub.status)) {
      return NextResponse.json(
        { error: 'You already have an active subscription. Please manage it from your billing page.' },
        { status: 400 }
      )
    }

    // Cancel any previous incomplete Stripe subscription to avoid orphans
    if (existingSub?.stripeSubscriptionId && existingSub.status === 'incomplete') {
      try {
        await stripe.subscriptions.cancel(existingSub.stripeSubscriptionId)
      } catch {
        // Already canceled or doesn't exist — safe to ignore
      }
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
    // Clover API (2026-01-28): invoice.payment_intent removed, use invoice.payments instead
    const subscription: any = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: tier.stripePriceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payments'],
      metadata: { userId: user.id, tierId: tier.id },
    })

    // In Clover API, payment_intent is accessed via invoice.payments.data[0].payment.payment_intent
    const invoicePayments = subscription.latest_invoice?.payments?.data
    const paymentIntentId = invoicePayments?.[0]?.payment?.payment_intent

    if (!paymentIntentId) {
      console.error('Missing payment intent. Subscription:', subscription.id)
      return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 })
    }

    // Retrieve the PaymentIntent to get the client_secret
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const clientSecret = paymentIntent.client_secret

    if (!clientSecret) {
      console.error('Missing client_secret on PaymentIntent:', paymentIntentId)
      return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 })
    }

    // Calculate minimum term end date if applicable
    const minimumTermEnd = tier.minimumTermMonths > 0
      ? new Date(Date.now() + tier.minimumTermMonths * 30.44 * 24 * 60 * 60 * 1000) // ~months in ms
      : null

    // Store preliminary subscription record
    // Clover API: current_period_start/end moved from subscription to items.data[0]
    const item = subscription.items.data[0]
    const subData = {
      tierId: tier.id,
      stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      status: subscription.status as string,
      currentPeriodStart: new Date(item.current_period_start * 1000),
      currentPeriodEnd: new Date(item.current_period_end * 1000),
      cancelAtPeriodEnd: false,
      minimumTermEnd,
    }

    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: subData,
      create: { userId: user.id, ...subData },
    })

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret,
    })
  } catch (err: any) {
    console.error('create-subscription error:', err?.message || err)
    return NextResponse.json(
      { error: err?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
