import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin'

export async function GET() {
  const admin = await requireAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const [totalUsers, newThisWeek, newThisMonth, totalRoles, roleBreakdown, recentUsers] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: weekAgo } } }),
      prisma.user.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.userRole.count(),
      prisma.userRole.groupBy({
        by: ['role'],
        _count: { role: true },
        orderBy: { _count: { role: 'desc' } },
      }),
      prisma.user.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, createdAt: true },
      }),
    ])

  return NextResponse.json({
    totalUsers,
    newThisWeek,
    newThisMonth,
    totalRoles,
    roleBreakdown: roleBreakdown.map((r) => ({
      role: r.role,
      count: r._count.role,
    })),
    recentUsers,
    dbStatus: 'connected',
  })
}
