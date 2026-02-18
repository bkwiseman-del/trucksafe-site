'use client'

import { useSession } from 'next-auth/react'

interface UserAccess {
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

export function useUser() {
  const { data: session, status } = useSession()
  
  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name || '',
    firstName: session.user.name?.split(' ')[0] || '',
    email: session.user.email || '',
    initials: session.user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
  } : null

  const access: UserAccess | null = session?.user?.access || null

  return {
    user,
    access,
    isLoading: status === 'loading'
  }
}
