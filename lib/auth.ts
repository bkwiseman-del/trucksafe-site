import { NextAuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import * as bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

// Maps UserRole records from DB into the UserAccess shape the frontend expects
function buildAccess(roles: { role: string; metadata: unknown }[]) {
  const roleNames = roles.map((r) => r.role)

  const access: any = {
    isAdmin: roleNames.includes('ADMIN'),
    networkMember: roleNames.includes('NETWORK_MEMBER'),
  }

  const complianceTier = roleNames.includes('COMPLIANCE_PREMIUM')
    ? 'premium'
    : roleNames.includes('COMPLIANCE_PRO')
      ? 'pro'
      : roleNames.includes('COMPLIANCE_BASIC')
        ? 'basic'
        : null

  if (complianceTier) {
    access.complianceMember = { tier: complianceTier, status: 'active' }
  }

  const bootcamp = roles.find((r) => r.role === 'BOOTCAMP_ATTENDEE' || r.role === 'BOOTCAMP_ALUMNI')
  if (bootcamp) {
    const meta = bootcamp.metadata as { year?: number; status?: string } | null
    access.bootcampAttendee = {
      year: meta?.year ?? new Date().getFullYear(),
      status: (meta?.status as string) ?? 'attended',
    }
  }

  if (roleNames.includes('CLIENT')) {
    access.clientAccess = { status: 'active' }
  }

  if (roleNames.includes('ACADEMY_ACCESS')) {
    access.academyAccess = true
  }

  if (roleNames.includes('TSC_CERTIFIED')) {
    access.tscCertification = { status: 'active' }
  }

  return access
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        })

        if (!user || !user.password) return null

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)
        if (!passwordMatch) return null

        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      // For Google OAuth: create user + default role if first time
      if (account?.provider === 'google') {
        if (!user.email) return false

        const existing = await prisma.user.findUnique({
          where: { email: user.email },
        })

        if (!existing) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name ?? null,
              image: user.image ?? null,
              emailVerified: new Date(),
            },
          })
          await prisma.userRole.create({
            data: { userId: newUser.id, role: 'NETWORK_MEMBER' },
          })
          user.id = newUser.id
        } else {
          user.id = existing.id
        }
      }
      return true
    },

    async jwt({ token, user, trigger }) {
      // user is only present on initial sign-in, not on every token refresh
      if (user) {
        token.id = user.id

        const roles = await prisma.userRole.findMany({
          where: { userId: user.id },
          select: { role: true, metadata: true },
        })

        token.access = buildAccess(roles)
      }

      // Re-fetch name from DB when client calls update() (e.g. after profile save)
      if (trigger === 'update' && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { name: true },
        })
        if (dbUser) token.name = dbUser.name
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.access = token.access
      }
      return session
    },
  },
}

export async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return null
  return session.user
}
