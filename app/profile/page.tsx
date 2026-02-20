'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Pencil, X, Check, AlertCircle, MapPin, Building2, Briefcase, Phone, Globe, Mail, Calendar } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useUser } from '@/hooks/useUser'

interface ProfileData {
  name: string
  email: string
  createdAt: string
  hasPassword: boolean
  profile: {
    company: string | null
    title: string | null
    bio: string | null
    phone: string | null
    location: string | null
    website: string | null
  }
  roles: { role: string; metadata: any }[]
}

export default function ProfilePage() {
  const { user, access, isLoading } = useUser()
  const { update: updateSession } = useSession()
  const router = useRouter()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    title: '',
    bio: '',
    phone: '',
    location: '',
    website: '',
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [isLoading, user, router])

  useEffect(() => {
    if (user) {
      fetch('/api/user/profile')
        .then((res) => res.json())
        .then((data) => {
          setProfileData(data)
          setFormData({
            name: data.name || '',
            company: data.profile?.company || '',
            title: data.profile?.title || '',
            bio: data.profile?.bio || '',
            phone: data.profile?.phone || '',
            location: data.profile?.location || '',
            website: data.profile?.website || '',
          })
        })
        .catch(() => setMessage({ type: 'error', text: 'Failed to load profile.' }))
    }
  }, [user?.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#dd8157] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user || !access) return null

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Failed to save.' })
        return
      }
      setProfileData((prev) =>
        prev
          ? {
              ...prev,
              name: formData.name,
              profile: {
                company: formData.company || null,
                title: formData.title || null,
                bio: formData.bio || null,
                phone: formData.phone || null,
                location: formData.location || null,
                website: formData.website || null,
              },
            }
          : prev
      )
      setIsEditing(false)
      setMessage({ type: 'success', text: 'Profile updated successfully.' })
      await updateSession()
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setMessage(null)
    if (profileData) {
      setFormData({
        name: profileData.name || '',
        company: profileData.profile?.company || '',
        title: profileData.profile?.title || '',
        bio: profileData.profile?.bio || '',
        phone: profileData.profile?.phone || '',
        location: profileData.profile?.location || '',
        website: profileData.profile?.website || '',
      })
    }
  }

  const displayName = profileData?.name || user.name
  const initials = displayName
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase() || 'U'

  const memberSince = profileData?.createdAt
    ? new Date(profileData.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : ''

  const roleBadges = [
    { key: 'networkMember', label: 'Network Member', color: 'bg-blue-100 text-blue-800' },
    { key: 'complianceMember', label: `Compliance+ ${access.complianceMember ? `(${access.complianceMember.tier})` : ''}`, color: 'bg-green-100 text-green-800', show: !!access.complianceMember },
    { key: 'bootcampAttendee', label: `Bootcamp ${access.bootcampAttendee ? access.bootcampAttendee.year : ''}`, color: 'bg-purple-100 text-purple-800', show: !!access.bootcampAttendee },
    { key: 'clientAccess', label: 'Client', color: 'bg-amber-100 text-amber-800', show: !!access.clientAccess },
    { key: 'academyAccess', label: 'Academy', color: 'bg-indigo-100 text-indigo-800', show: !!access.academyAccess },
    { key: 'tscCertification', label: 'TSC Certified', color: 'bg-emerald-100 text-emerald-800', show: !!access.tscCertification },
  ].filter((b) => b.show !== false)

  const inputClass =
    'block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8157] focus:border-transparent text-sm'

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navigation />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black text-gray-900">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => {
                  setIsEditing(true)
                  setMessage(null)
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#dd8157] hover:bg-orange-50 rounded-lg transition"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#dd8157] hover:bg-[#c86d47] rounded-lg transition disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Messages */}
          {message && (
            <div
              className={`mb-6 rounded-lg p-4 flex items-start gap-3 ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <AlertCircle
                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  message.type === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              />
              <p
                className={`text-sm ${
                  message.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {message.text}
              </p>
            </div>
          )}

          {/* Profile Header Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#363b57] rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {initials}
              </div>
              <div>
                {isEditing ? (
                  <div className="mb-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass + ' max-w-xs'}
                      placeholder="Your full name"
                    />
                  </div>
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900">{displayName}</h2>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    {profileData?.email || user.email}
                  </span>
                  {memberSince && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Member since {memberSince}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Profile Details</h3>
            {isEditing ? (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={inputClass}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className={inputClass}
                      placeholder="Your role"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={inputClass}
                      placeholder="City, State"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className={inputClass}
                      placeholder="https://yoursite.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className={inputClass + ' resize-none'}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <ProfileField icon={Building2} label="Company" value={profileData?.profile?.company} />
                  <ProfileField icon={Briefcase} label="Job Title" value={profileData?.profile?.title} />
                  <ProfileField icon={Phone} label="Phone" value={profileData?.profile?.phone} />
                  <ProfileField icon={MapPin} label="Location" value={profileData?.profile?.location} />
                  <div className="md:col-span-2">
                    <ProfileField icon={Globe} label="Website" value={profileData?.profile?.website} />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bio</p>
                  <p className={`text-sm ${profileData?.profile?.bio ? 'text-gray-900' : 'text-gray-400 italic'}`}>
                    {profileData?.profile?.bio || 'Not set'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Memberships Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Memberships</h3>
            <div className="flex flex-wrap gap-2">
              {roleBadges.map((badge) => (
                <span
                  key={badge.key}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full ${badge.color}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

function ProfileField({
  icon: Icon,
  label,
  value,
}: {
  icon: any
  label: string
  value: string | null | undefined
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-400" />
        <p className={`text-sm ${value ? 'text-gray-900' : 'text-gray-400 italic'}`}>
          {value || 'Not set'}
        </p>
      </div>
    </div>
  )
}
