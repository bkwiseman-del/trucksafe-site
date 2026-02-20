import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { stripe, syncSubscriptionRoles } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        await handleSubscriptionChange(event.data.object as any)
        break
      }

      case 'customer.subscription.deleted': {
        await handleSubscriptionDeleted(event.data.object as any)
        break
      }

      case 'invoice.payment_succeeded': {
        await handlePaymentSucceeded(event.data.object as any)
        break
      }

      case 'invoice.payment_failed': {
        await handlePaymentFailed(event.data.object as any)
        break
      }
    }
  } catch (err) {
    console.error(`Error processing webhook ${event.type}:`, err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionChange(sub: any) {
  const stripeCustomerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id
  const stripePriceId = sub.items.data[0]?.price.id

  if (!stripePriceId) return

  // Find the tier for this price
  const tier = await prisma.subscriptionTier.findUnique({
    where: { stripePriceId },
  })

  if (!tier) {
    console.error(`No SubscriptionTier found for Stripe Price ID: ${stripePriceId}`)
    return
  }

  // Find or create subscription record
  const existing = await prisma.subscription.findFirst({
    where: {
      OR: [
        { stripeSubscriptionId: sub.id },
        { stripeCustomerId },
      ],
    },
  })

  const data = {
    tierId: tier.id,
    stripeCustomerId,
    stripeSubscriptionId: sub.id,
    status: sub.status,
    currentPeriodStart: new Date(sub.current_period_start * 1000),
    currentPeriodEnd: new Date(sub.current_period_end * 1000),
    cancelAtPeriodEnd: sub.cancel_at_period_end,
  }

  if (existing) {
    await prisma.subscription.update({
      where: { id: existing.id },
      data,
    })

    // Sync roles based on status
    await syncSubscriptionRoles(existing.userId, tier.name, sub.status)
  } else {
    // Try to find user from Stripe metadata or customer
    const userId = sub.metadata?.userId
    if (!userId) {
      console.error('No userId found in subscription metadata')
      return
    }

    await prisma.subscription.create({
      data: { userId, ...data },
    })

    await syncSubscriptionRoles(userId, tier.name, sub.status)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionDeleted(sub: any) {
  const record = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: sub.id },
  })

  if (!record) return

  await prisma.subscription.update({
    where: { id: record.id },
    data: { status: 'canceled', cancelAtPeriodEnd: false },
  })

  // Remove all compliance roles
  await syncSubscriptionRoles(record.userId, '', 'canceled')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handlePaymentSucceeded(invoice: any) {
  if (!invoice.subscription) return

  const subId = typeof invoice.subscription === 'string'
    ? invoice.subscription
    : invoice.subscription.id

  const record = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subId },
    include: { tier: true },
  })

  if (!record) return

  // Record payment
  await prisma.paymentHistory.upsert({
    where: { stripePaymentId: invoice.payment_intent as string || invoice.id },
    update: { status: 'succeeded' },
    create: {
      userId: record.userId,
      stripePaymentId: (invoice.payment_intent as string) || invoice.id,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: 'succeeded',
      description: `${record.tier.displayName} subscription - ${record.tier.interval}`,
    },
  })

  // Record in billing history
  await prisma.billingHistory.upsert({
    where: { source_sourceId: { source: 'stripe', sourceId: invoice.id } },
    update: { status: 'paid', lastSyncedAt: new Date() },
    create: {
      userId: record.userId,
      source: 'stripe',
      sourceId: invoice.id,
      category: 'subscription',
      description: `${record.tier.displayName} Compliance+ - ${record.tier.interval}`,
      amount: invoice.amount_paid / 100,
      currency: invoice.currency.toUpperCase(),
      status: 'paid',
      invoiceDate: new Date(invoice.created * 1000),
      pdfUrl: invoice.invoice_pdf || null,
      receiptUrl: invoice.hosted_invoice_url || null,
      lastSyncedAt: new Date(),
    },
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handlePaymentFailed(invoice: any) {
  if (!invoice.subscription) return

  const subId = typeof invoice.subscription === 'string'
    ? invoice.subscription
    : invoice.subscription.id

  const record = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subId },
  })

  if (!record) return

  // Update subscription status
  await prisma.subscription.update({
    where: { id: record.id },
    data: { status: 'past_due' },
  })

  // Record failed payment
  await prisma.paymentHistory.upsert({
    where: { stripePaymentId: (invoice.payment_intent as string) || invoice.id },
    update: { status: 'failed' },
    create: {
      userId: record.userId,
      stripePaymentId: (invoice.payment_intent as string) || invoice.id,
      amount: invoice.amount_due,
      currency: invoice.currency,
      status: 'failed',
      description: 'Payment failed',
    },
  })
}
