import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const BASIC_FEATURES = [
  'Regulatory updates & briefings',
  'Resource library access',
  'Training video library',
  'Trucksafe Network membership',
  'Monthly group webinars',
]

const PRO_FEATURES = [
  ...BASIC_FEATURES,
  'Monthly compliance health reports',
  '2 hours/quarter consulting time',
  'Policy review & recommendations',
  'Priority email support',
]

const PREMIUM_FEATURES = [
  ...PRO_FEATURES,
  '5 hours/quarter consulting time',
  'Custom policy drafting',
  'Emergency compliance hotline',
  'Mock DOT audit preparation',
  'Dedicated account manager',
]

const tiers = [
  {
    name: 'BASIC_MONTHLY',
    displayName: 'Basic',
    price: 9500,
    interval: 'monthly',
    features: BASIC_FEATURES,
    stripePriceId: 'price_basic_monthly_REPLACE_ME',
  },
  {
    name: 'BASIC_ANNUAL',
    displayName: 'Basic',
    price: 95000,
    interval: 'yearly',
    features: BASIC_FEATURES,
    stripePriceId: 'price_basic_annual_REPLACE_ME',
  },
  {
    name: 'PRO_MONTHLY',
    displayName: 'Pro',
    price: 49500,
    interval: 'monthly',
    features: PRO_FEATURES,
    stripePriceId: 'price_pro_monthly_REPLACE_ME',
  },
  {
    name: 'PRO_ANNUAL',
    displayName: 'Pro',
    price: 495000,
    interval: 'yearly',
    features: PRO_FEATURES,
    stripePriceId: 'price_pro_annual_REPLACE_ME',
  },
  {
    name: 'PREMIUM_MONTHLY',
    displayName: 'Premium',
    price: 99500,
    interval: 'monthly',
    features: PREMIUM_FEATURES,
    stripePriceId: 'price_premium_monthly_REPLACE_ME',
  },
  {
    name: 'PREMIUM_ANNUAL',
    displayName: 'Premium',
    price: 995000,
    interval: 'yearly',
    features: PREMIUM_FEATURES,
    stripePriceId: 'price_premium_annual_REPLACE_ME',
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
      },
      create: tier,
    })
    console.log(`  ✓ ${tier.name}: $${(tier.price / 100).toFixed(2)}/${tier.interval}`)
  }

  console.log('Done!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
