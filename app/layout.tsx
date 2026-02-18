import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'
import { MemberBarWrapper } from '@/components/MemberBarWrapper'

export const metadata = {
  title: 'Trucksafe - DOT Compliance Solutions',
  description: 'DOT Compliance consulting, training, and resources for the trucking industry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MemberBarWrapper />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
