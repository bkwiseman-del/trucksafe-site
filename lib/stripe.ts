import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-01-28.clover',
    })
  }
  return _stripe
}

// Convenience alias
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as any)[prop]
  },
})

/**
 * Gets an existing Stripe Customer ID for the user, or creates a new one.
 */
export async function getOrCreateStripeCustomer(
  userId: string,
  email: string,
  name?: string | null
): Promise<string> {
  // Check if user already has a subscription with a Stripe Customer ID
  const existing = await prisma.subscription.findUnique({
    where: { userId },
    select: { stripeCustomerId: true },
  })

  if (existing?.stripeCustomerId) {
    return existing.stripeCustomerId
  }

  // Create a new Stripe Customer
  const customer = await stripe.customers.create({
    email,
    name: name || undefined,
    metadata: { userId },
  })

  return customer.id
}

/**
 * Maps a SubscriptionTier name (e.g. BASIC_MONTHLY) to a UserRole role name.
 */
export function tierNameToRole(tierName: string): string {
  if (tierName.startsWith('PREMIUM')) return 'COMPLIANCE_PREMIUM'
  if (tierName.startsWith('PRO')) return 'COMPLIANCE_PRO'
  return 'COMPLIANCE_BASIC'
}

/**
 * Maps a SubscriptionTier name to a display tier for the frontend.
 */
export function tierNameToDisplayTier(tierName: string): 'basic' | 'pro' | 'premium' {
  if (tierName.startsWith('PREMIUM')) return 'premium'
  if (tierName.startsWith('PRO')) return 'pro'
  return 'basic'
}

const COMPLIANCE_ROLES = ['COMPLIANCE_BASIC', 'COMPLIANCE_PRO', 'COMPLIANCE_PREMIUM']

/**
 * Syncs UserRole records based on subscription status.
 * Removes old compliance roles and adds the correct one if active.
 */
export async function syncSubscriptionRoles(
  userId: string,
  tierName: string,
  status: string
) {
  // Remove all existing compliance roles
  await prisma.userRole.deleteMany({
    where: {
      userId,
      role: { in: COMPLIANCE_ROLES },
    },
  })

  // Add the correct role if subscription is active or trialing
  if (status === 'active' || status === 'trialing') {
    const role = tierNameToRole(tierName)
    await prisma.userRole.create({
      data: { userId, role },
    })
  }
}
