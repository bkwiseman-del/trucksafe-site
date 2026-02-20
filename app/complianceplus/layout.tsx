import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function CompliancePlusLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
