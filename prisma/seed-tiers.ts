import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const BASIC_FEATURES = [
  'Regulatory updates & briefings',
  'Resource library access',
  'Training video library',
  'Trucksafe Network membership',
]

const PRO_FEATURES = [
  ...BASIC_FEATURES,
  'Quarterly group webinars',
  'Monthly compliance health reports',
  '2 hours/quarter consulting time',
  'Policy review & recommendations',
  'Priority email support',
]

const PREMIUM_FEATURES = [
  ...PRO_FEATURES.filter(f => f !== '2 hours/quarter consulting time'),
  '4 hours/quarter consulting time',
  'Custom policy drafting',
  'Emergency compliance hotline',
  'Mock DOT audit preparation',
]

const tiers = [
  {
    name: 'BASIC_MONTHLY',
    displayName: 'Basic',
    price: 9500,
    interval: 'monthly',
    features: BASIC_FEATURES,
    stripePriceId: 'price_1T3HwcLtG4BUJxO0DeIjYVBG',
    minimumTermMonths: 0,
  },
  {
    name: 'BASIC_ANNUAL',
    displayName: 'Basic',
    price: 95000,
    interval: 'yearly',
    features: BASIC_FEATURES,
    stripePriceId: 'price_1T3HxULtG4BUJxO0iPFi5z6J',
    minimumTermMonths: 0,
  },
  {
    name: 'PRO_MONTHLY',
    displayName: 'Pro',
    price: 29500,
    interval: 'monthly',
    features: PRO_FEATURES,
    stripePriceId: 'price_1T3I1CLtG4BUJxO0PLkrxPWk',
    minimumTermMonths: 12,
  },
  {
    name: 'PRO_ANNUAL',
    displayName: 'Pro',
    price: 295000,
    interval: 'yearly',
    features: PRO_FEATURES,
    stripePriceId: 'price_1T3I1YLtG4BUJxO08We2kMR8',
    minimumTermMonths: 12,
  },
  {
    name: 'PREMIUM_MONTHLY',
    displayName: 'Premium',
    price: 59500,
    interval: 'monthly',
    features: PREMIUM_FEATURES,
    stripePriceId: 'price_1T3I1pLtG4BUJxO0qQubFO4p',
    minimumTermMonths: 12,
  },
  {
    name: 'PREMIUM_ANNUAL',
    displayName: 'Premium',
    price: 595000,
    interval: 'yearly',
    features: PREMIUM_FEATURES,
    stripePriceId: 'price_1T3I26LtG4BUJxO0kXnMgdU1',
    minimumTermMonths: 12,
  },
]

async function main() {
  console.log('Seeding subscription tiers...')

  for (const tier of tiers) {
    await prisma.subscriptionTier.upsert({
      where: { name: tier.name },
      update: {
        displayName: tier.displayName,
        price: tier.price,
        interval: tier.interval,
        features: tier.features,
        stripePriceId: tier.stripePriceId,
        minimumTermMonths: tier.minimumTermMonths,
      },
      create: tier,
    })
    const termLabel = tier.minimumTermMonths > 0 ? ` (${tier.minimumTermMonths}-mo minimum)` : ''
    console.log(`  ✓ ${tier.name}: $${(tier.price / 100).toFixed(2)}/${tier.interval}${termLabel}`)
  }

  console.log('Done!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
