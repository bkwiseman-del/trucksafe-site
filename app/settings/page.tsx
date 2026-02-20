'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Bell, Shield, AlertCircle, Check, Info } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useUser } from '@/hooks/useUser'

interface NotificationPrefs {
  emailNotifications: boolean
  pushNotifications: boolean
  newPostAlerts: boolean
  newCommentAlerts: boolean
  directMessageAlerts: boolean
  eventReminders: boolean
  weeklyDigest: boolean
  marketingEmails: boolean
}

interface PrivacySettings {
  showInDirectory: boolean
  allowDirectMessages: boolean
  showEmail: boolean
  showPhone: boolean
  showCompany: boolean
  profileVisibility: string
}

export default function SettingsPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()

  const [hasPassword, setHasPassword] = useState<boolean | null>(null)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [notifications, setNotifications] = useState<NotificationPrefs | null>(null)
  const [privacy, setPrivacy] = useState<PrivacySettings | null>(null)

  const [savingPassword, setSavingPassword] = useState(false)
  const [savingNotifications, setSavingNotifications] = useState(false)
  const [savingPrivacy, setSavingPrivacy] = useState(false)

  const [messages, setMessages] = useState<Record<string, { type: 'success' | 'error'; text: string }>>({})

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [isLoading, user, router])

  useEffect(() => {
    if (user) {
      Promise.all([
        fetch('/api/user/profile').then((r) => r.json()),
        fetch('/api/user/notifications').then((r) => r.json()),
        fetch('/api/user/privacy').then((r) => r.json()),
      ]).then(([profileData, notifData, privacyData]) => {
        setHasPassword(profileData.hasPassword ?? false)
        setNotifications(notifData)
        setPrivacy(privacyData)
      })
    }
  }, [user?.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null

  const setMsg = (section: string, type: 'success' | 'error', text: string) => {
    setMessages((prev) => ({ ...prev, [section]: { type, text } }))
  }

  const clearMsg = (section: string) => {
    setMessages((prev) => {
      const next = { ...prev }
      delete next[section]
      return next
    })
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMsg('password')

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMsg('password', 'error', 'New passwords do not match.')
      return
    }
    if (passwordForm.newPassword.length < 8) {
      setMsg('password', 'error', 'New password must be at least 8 characters.')
      return
    }

    setSavingPassword(true)
    try {
      const res = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMsg('password', 'error', data.error || 'Failed to update password.')
        return
      }
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setMsg('password', 'success', 'Password updated successfully.')
    } catch {
      setMsg('password', 'error', 'Something went wrong.')
    } finally {
      setSavingPassword(false)
    }
  }

  const handleNotificationsSave = async () => {
    if (!notifications) return
    clearMsg('notifications')
    setSavingNotifications(true)
    try {
      const res = await fetch('/api/user/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notifications),
      })
      const data = await res.json()
      if (!res.ok) {
        setMsg('notifications', 'error', data.error || 'Failed to save.')
        return
      }
      setMsg('notifications', 'success', 'Notification preferences saved.')
    } catch {
      setMsg('notifications', 'error', 'Something went wrong.')
    } finally {
      setSavingNotifications(false)
    }
  }

  const handlePrivacySave = async () => {
    if (!privacy) return
    clearMsg('privacy')
    setSavingPrivacy(true)
    try {
      const res = await fetch('/api/user/privacy', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(privacy),
      })
      const data = await res.json()
      if (!res.ok) {
        setMsg('privacy', 'error', data.error || 'Failed to save.')
        return
      }
      setMsg('privacy', 'success', 'Privacy settings saved.')
    } catch {
      setMsg('privacy', 'error', 'Something went wrong.')
    } finally {
      setSavingPrivacy(false)
    }
  }

  const inputClass =
    'block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent text-sm'

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navigation />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900 mb-8">Account Settings</h1>

          {/* Change Password Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Password</h2>
                <p className="text-sm text-gray-500">Manage your account password</p>
              </div>
            </div>

            <SectionMessage message={messages.password} />

            {hasPassword === false ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  Your account uses Google sign-in. Your password is managed through your Google account.
                </p>
              </div>
            ) : hasPassword === true ? (
              <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                    }
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Min. 8 characters"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    }
                    className={inputClass}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#dd8157] hover:bg-[#c86d47] rounded-lg transition disabled:opacity-50"
                >
                  {savingPassword ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  Update Password
                </button>
              </form>
            ) : null}
          </div>

          {/* Notification Preferences Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-500">Choose how you want to be notified</p>
              </div>
            </div>

            <SectionMessage message={messages.notifications} />

            {notifications && (
              <div className="space-y-6">
                <ToggleGroup title="General">
                  <Toggle
                    label="Email Notifications"
                    description="Receive notifications via email"
                    checked={notifications.emailNotifications}
                    onChange={(v) => setNotifications({ ...notifications, emailNotifications: v })}
                  />
                  <Toggle
                    label="Push Notifications"
                    description="Receive browser push notifications"
                    checked={notifications.pushNotifications}
                    onChange={(v) => setNotifications({ ...notifications, pushNotifications: v })}
                  />
                </ToggleGroup>

                <ToggleGroup title="Activity">
                  <Toggle
                    label="New Post Alerts"
                    description="When someone creates a new post in your forums"
                    checked={notifications.newPostAlerts}
                    onChange={(v) => setNotifications({ ...notifications, newPostAlerts: v })}
                  />
                  <Toggle
                    label="New Comment Alerts"
                    description="When someone replies to your posts"
                    checked={notifications.newCommentAlerts}
                    onChange={(v) => setNotifications({ ...notifications, newCommentAlerts: v })}
                  />
                  <Toggle
                    label="Direct Message Alerts"
                    description="When you receive a direct message"
                    checked={notifications.directMessageAlerts}
                    onChange={(v) =>
                      setNotifications({ ...notifications, directMessageAlerts: v })
                    }
                  />
                </ToggleGroup>

                <ToggleGroup title="Events & Updates">
                  <Toggle
                    label="Event Reminders"
                    description="Reminders for upcoming events and bootcamps"
                    checked={notifications.eventReminders}
                    onChange={(v) => setNotifications({ ...notifications, eventReminders: v })}
                  />
                  <Toggle
                    label="Weekly Digest"
                    description="A weekly summary of activity in your network"
                    checked={notifications.weeklyDigest}
                    onChange={(v) => setNotifications({ ...notifications, weeklyDigest: v })}
                  />
                  <Toggle
                    label="Marketing Emails"
                    description="Product updates, promotions, and news"
                    checked={notifications.marketingEmails}
                    onChange={(v) => setNotifications({ ...notifications, marketingEmails: v })}
                  />
                </ToggleGroup>

                <button
                  onClick={handleNotificationsSave}
                  disabled={savingNotifications}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#dd8157] hover:bg-[#c86d47] rounded-lg transition disabled:opacity-50"
                >
                  {savingNotifications ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  Save Notifications
                </button>
              </div>
            )}
          </div>

          {/* Privacy Settings Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Privacy</h2>
                <p className="text-sm text-gray-500">Control your profile visibility and data sharing</p>
              </div>
            </div>

            <SectionMessage message={messages.privacy} />

            {privacy && (
              <div className="space-y-6">
                <div className="space-y-0 divide-y divide-gray-100">
                  <Toggle
                    label="Show in Member Directory"
                    description="Allow other members to find you in the directory"
                    checked={privacy.showInDirectory}
                    onChange={(v) => setPrivacy({ ...privacy, showInDirectory: v })}
                  />
                  <Toggle
                    label="Allow Direct Messages"
                    description="Let other members send you direct messages"
                    checked={privacy.allowDirectMessages}
                    onChange={(v) => setPrivacy({ ...privacy, allowDirectMessages: v })}
                  />
                  <Toggle
                    label="Show Email on Profile"
                    description="Display your email address on your public profile"
                    checked={privacy.showEmail}
                    onChange={(v) => setPrivacy({ ...privacy, showEmail: v })}
                  />
                  <Toggle
                    label="Show Phone on Profile"
                    description="Display your phone number on your public profile"
                    checked={privacy.showPhone}
                    onChange={(v) => setPrivacy({ ...privacy, showPhone: v })}
                  />
                  <Toggle
                    label="Show Company on Profile"
                    description="Display your company name on your public profile"
                    checked={privacy.showCompany}
                    onChange={(v) => setPrivacy({ ...privacy, showCompany: v })}
                  />
                </div>

                <div className="max-w-xs">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Profile Visibility
                  </label>
                  <select
                    value={privacy.profileVisibility}
                    onChange={(e) =>
                      setPrivacy({ ...privacy, profileVisibility: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="public">Public</option>
                    <option value="members">Members Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <button
                  onClick={handlePrivacySave}
                  disabled={savingPrivacy}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#dd8157] hover:bg-[#c86d47] rounded-lg transition disabled:opacity-50"
                >
                  {savingPrivacy ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  Save Privacy Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

function SectionMessage({ message }: { message?: { type: 'success' | 'error'; text: string } }) {
  if (!message) return null
  return (
    <div
      className={`mb-4 rounded-lg p-3 flex items-start gap-2 text-sm ${
        message.type === 'success'
          ? 'bg-green-50 border border-green-200 text-green-800'
          : 'bg-red-50 border border-red-200 text-red-800'
      }`}
    >
      {message.type === 'success' ? (
        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      )}
      {message.text}
    </div>
  )
}

function ToggleGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        {title}
      </h3>
      <div className="space-y-0 divide-y divide-gray-100">{children}</div>
    </div>
  )
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:ring-offset-2 ${
          checked ? 'bg-[#dd8157]' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}
