import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  {
    name: 'DOT Compliance',
    slug: 'dot-compliance',
    order: 1,
    forums: [
      { name: 'Driver Qualification', slug: 'driver-qualification', description: 'DQ file requirements, medical certificates, and driver records', accessLevel: 'public', order: 1 },
      { name: 'Drug & Alcohol Testing', slug: 'drug-alcohol-testing', description: 'DOT testing requirements, random pools, and SAP programs', accessLevel: 'public', order: 2 },
      { name: 'CSA & Safety Ratings', slug: 'csa-safety-ratings', description: 'CSA scores, DataQs, interventions, and safety management', accessLevel: 'public', order: 3 },
    ],
  },
  {
    name: 'Hours of Service',
    slug: 'hours-of-service',
    order: 2,
    forums: [
      { name: 'HOS Regulations', slug: 'hos-regulations', description: 'Rules, exemptions, and regulatory updates', accessLevel: 'public', order: 1 },
      { name: 'ELD & Technology', slug: 'eld-technology', description: 'Electronic logging devices, setup, and troubleshooting', accessLevel: 'public', order: 2 },
    ],
  },
  {
    name: 'Driver Management',
    slug: 'driver-management',
    order: 3,
    forums: [
      { name: 'Hiring & Retention', slug: 'hiring-retention', description: 'Recruiting, onboarding, and keeping good drivers', accessLevel: 'public', order: 1 },
      { name: 'Training & Development', slug: 'training-development', description: 'Driver training programs, certifications, and skill development', accessLevel: 'public', order: 2 },
    ],
  },
  {
    name: 'Vehicle Maintenance',
    slug: 'vehicle-maintenance',
    order: 4,
    forums: [
      { name: 'Preventive Maintenance', slug: 'preventive-maintenance', description: 'PM schedules, inspections, and maintenance best practices', accessLevel: 'public', order: 1 },
      { name: 'Roadside Inspections', slug: 'roadside-inspections', description: 'Preparing for inspections, common violations, and remediation', accessLevel: 'public', order: 2 },
    ],
  },
  {
    name: 'Safety Programs',
    slug: 'safety-programs',
    order: 5,
    forums: [
      { name: 'Accident Prevention', slug: 'accident-prevention', description: 'Safety programs, incident analysis, and risk management', accessLevel: 'public', order: 1 },
      { name: 'Insurance & Risk', slug: 'insurance-risk', description: 'Insurance requirements, claims management, and risk mitigation', accessLevel: 'public', order: 2 },
    ],
  },
  {
    name: 'Community',
    slug: 'community',
    order: 6,
    forums: [
      { name: 'General Discussion', slug: 'general-discussion', description: 'Off-topic conversations and community chat', accessLevel: 'public', order: 1 },
      { name: 'Introductions', slug: 'introductions', description: 'Welcome new members and introduce yourself', accessLevel: 'public', order: 2 },
      { name: 'Compliance+ Lounge', slug: 'compliance-plus-lounge', description: 'Exclusive forum for Compliance+ subscribers', accessLevel: 'basic', order: 3 },
      { name: 'Bootcamp Alumni', slug: 'bootcamp-alumni', description: 'Connect with fellow bootcamp graduates', accessLevel: 'bootcamp', order: 4 },
    ],
  },
]

async function main() {
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      create: { name: cat.name, slug: cat.slug, order: cat.order },
      update: { name: cat.name, order: cat.order },
    })

    for (const forum of cat.forums) {
      await prisma.forum.upsert({
        where: { slug: forum.slug },
        create: {
          name: forum.name,
          slug: forum.slug,
          description: forum.description,
          accessLevel: forum.accessLevel,
          order: forum.order,
          categoryId: category.id,
        },
        update: {
          name: forum.name,
          description: forum.description,
          accessLevel: forum.accessLevel,
          order: forum.order,
          categoryId: category.id,
        },
      })
    }

    console.log(`Category: ${cat.name} (${cat.forums.length} forums)`)
  }

  const totalForums = await prisma.forum.count()
  console.log(`\nDone! ${totalForums} forums seeded.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
