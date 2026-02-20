export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/portal/:path*',
    '/network/forums/:path*',
    '/network/members/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/billing/:path*',
    '/complianceplus/checkout/:path*',
    '/complianceplus/success/:path*',
    '/admin/:path*',
  ],
}
