import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'brandon@trucksafe.com' },
  })

  if (!user) {
    console.error(
      'User brandon@trucksafe.com not found. Sign in first to create the account.'
    )
    process.exit(1)
  }

  await prisma.userRole.upsert({
    where: { userId_role: { userId: user.id, role: 'ADMIN' } },
    create: { userId: user.id, role: 'ADMIN' },
    update: {},
  })

  console.log(`ADMIN role assigned to ${user.email} (${user.id})`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
