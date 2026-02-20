import { getAuthenticatedUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function requireAdmin() {
  const sessionUser = await getAuthenticatedUser()
  if (!sessionUser) return null

  const adminRole = await prisma.userRole.findUnique({
    where: {
      userId_role: {
        userId: sessionUser.id,
        role: 'ADMIN',
      },
    },
  })

  if (!adminRole) return null
  return sessionUser
}
