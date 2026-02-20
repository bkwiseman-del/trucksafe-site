import { DefaultSession } from 'next-auth'

interface UserAccess {
  isAdmin: boolean
  networkMember: boolean
  complianceMember?: {
    tier: 'basic' | 'pro' | 'premium'
    status: 'active' | 'canceled' | 'past_due'
  }
  bootcampAttendee?: {
    year: number
    status: 'registered' | 'attended'
  }
  clientAccess?: {
    status: 'active' | 'inactive'
  }
  academyAccess?: boolean
  tscCertification?: {
    status: 'active' | 'expired'
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      access: UserAccess
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    access: UserAccess
  }
}
