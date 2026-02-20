import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/admin'
import { AdminShell } from '@/components/admin/AdminShell'

export const metadata = {
  title: 'Admin | Trucksafe',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await requireAdmin()
  if (!admin) {
    redirect('/dashboard')
  }

  return (
    <AdminShell user={{ id: admin.id, name: admin.name, email: admin.email }}>
      {children}
    </AdminShell>
  )
}
