import { NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const billingHistory = await prisma.billingHistory.findMany({
    where: { userId: user.id },
    orderBy: { invoiceDate: 'desc' },
    take: 50,
    select: {
      id: true,
      description: true,
      amount: true,
      currency: true,
      status: true,
      invoiceDate: true,
      pdfUrl: true,
      receiptUrl: true,
    },
  })

  // Normalize for the frontend (amount is already in dollars from the webhook)
  const normalized = billingHistory.map((record) => ({
    id: record.id,
    description: record.description,
    amount: record.amount,
    currency: record.currency,
    status: record.status,
    date: record.invoiceDate,
    pdfUrl: record.pdfUrl,
    receiptUrl: record.receiptUrl,
  }))

  return NextResponse.json({ billingHistory: normalized })
}
