'use client'

import { usePathname } from 'next/navigation'
import { MemberBar } from './MemberBar'

export function MemberBarWrapper() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return <MemberBar />
}
