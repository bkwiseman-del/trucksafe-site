import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const tiers = await prisma.subscriptionTier.findMany({
    orderBy: { price: 'asc' },
  })

  // Group by display name (Basic, Pro, Premium) with monthly + annual prices
  const grouped: Record<string, {
    displayName: string
    features: unknown
    minimumTermMonths: number
    monthly: { id: string; price: number; stripePriceId: string } | null
    annual: { id: string; price: number; stripePriceId: string } | null
  }> = {}

  for (const tier of tiers) {
    const key = tier.displayName
    if (!grouped[key]) {
      grouped[key] = {
        displayName: tier.displayName,
        features: tier.features,
        minimumTermMonths: tier.minimumTermMonths,
        monthly: null,
        annual: null,
      }
    }
    if (tier.interval === 'monthly') {
      grouped[key].monthly = { id: tier.id, price: tier.price, stripePriceId: tier.stripePriceId }
    } else {
      grouped[key].annual = { id: tier.id, price: tier.price, stripePriceId: tier.stripePriceId }
    }
  }

  return NextResponse.json(Object.values(grouped))
}
