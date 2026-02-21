import sgMail from '@sendgrid/mail'
import { prisma } from '@/lib/prisma'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const FROM = {
  email: process.env.SENDGRID_FROM_EMAIL || 'no-reply@trucksafe.com',
  name: process.env.SENDGRID_FROM_NAME || 'Trucksafe',
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'

const TEMPLATES = {
  WELCOME: process.env.SENDGRID_TEMPLATE_WELCOME!,
  PASSWORD_RESET: process.env.SENDGRID_TEMPLATE_PASSWORD_RESET!,
  PASSWORD_CHANGED: process.env.SENDGRID_TEMPLATE_PASSWORD_CHANGED!,
  SUBSCRIPTION_CONFIRMATION: process.env.SENDGRID_TEMPLATE_SUBSCRIPTION_CONFIRMATION!,
  PAYMENT_FAILED: process.env.SENDGRID_TEMPLATE_PAYMENT_FAILED!,
}

// ---------- Low-level send ----------

async function sendEmail(
  to: string,
  templateId: string,
  dynamicTemplateData: Record<string, unknown>
): Promise<void> {
  if (!templateId) {
    console.warn(`[sendgrid] Template ID not configured, skipping email to ${to}`)
    return
  }
  try {
    await sgMail.send({
      to,
      from: FROM,
      templateId,
      dynamicTemplateData,
    })
    console.log(`[sendgrid] Email sent: template=${templateId} to=${to}`)
  } catch (error: any) {
    console.error(
      `[sendgrid] Failed to send email: template=${templateId} to=${to}`,
      error?.response?.body || error
    )
  }
}

// ---------- Notification preference check ----------

async function shouldSendEmail(userId: string): Promise<boolean> {
  const prefs = await prisma.notificationPreferences.findUnique({
    where: { userId },
    select: { emailNotifications: true },
  })
  return prefs?.emailNotifications ?? true
}

// ---------- High-level email functions ----------

export async function sendWelcomeEmail(user: { email: string; name: string | null }) {
  await sendEmail(user.email, TEMPLATES.WELCOME, {
    name: user.name?.split(' ')[0] || 'there',
    login_url: `${APP_URL}/login`,
    dashboard_url: `${APP_URL}/dashboard`,
  })
}

export async function sendPasswordResetEmail(
  user: { email: string; name: string | null },
  resetToken: string
) {
  const resetUrl = `${APP_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(user.email)}`
  await sendEmail(user.email, TEMPLATES.PASSWORD_RESET, {
    name: user.name?.split(' ')[0] || 'there',
    reset_url: resetUrl,
    expires_in: '1 hour',
  })
}

export async function sendPasswordChangedEmail(user: { email: string; name: string | null }) {
  await sendEmail(user.email, TEMPLATES.PASSWORD_CHANGED, {
    name: user.name?.split(' ')[0] || 'there',
    changed_at: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
    support_email: 'brandon@trucksafe.com',
  })
}

export async function sendSubscriptionConfirmationEmail(
  userId: string,
  user: { email: string; name: string | null },
  subscription: {
    tierName: string
    amount: number
    currency: string
    periodStart: Date
    periodEnd: Date
  }
) {
  if (!(await shouldSendEmail(userId))) return

  await sendEmail(user.email, TEMPLATES.SUBSCRIPTION_CONFIRMATION, {
    name: user.name?.split(' ')[0] || 'there',
    tier_name: `Compliance+ ${subscription.tierName}`,
    amount: (subscription.amount / 100).toFixed(2),
    currency: subscription.currency.toUpperCase(),
    period_start: subscription.periodStart.toLocaleDateString('en-US'),
    period_end: subscription.periodEnd.toLocaleDateString('en-US'),
    dashboard_url: `${APP_URL}/dashboard`,
    billing_url: `${APP_URL}/settings/billing`,
  })
}

export async function sendPaymentFailedEmail(
  userId: string,
  user: { email: string; name: string | null },
  payment: {
    amount: number
    currency: string
    description: string
  }
) {
  if (!(await shouldSendEmail(userId))) return

  await sendEmail(user.email, TEMPLATES.PAYMENT_FAILED, {
    name: user.name?.split(' ')[0] || 'there',
    amount: (payment.amount / 100).toFixed(2),
    currency: payment.currency.toUpperCase(),
    description: payment.description,
    billing_url: `${APP_URL}/settings/billing`,
    support_email: 'brandon@trucksafe.com',
  })
}
