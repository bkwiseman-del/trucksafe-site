'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function SubscriptionSuccessPage() {
  const { update } = useSession()

  useEffect(() => {
    // Refresh the session so the new subscription role is reflected
    update()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="pt-32 pb-16 px-6">
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-3">
            Welcome to Compliance+!
          </h1>
          <p className="text-gray-600 mb-8">
            Your subscription is active. You now have access to all your plan features,
            including the Trucksafe Network and compliance resources.
          </p>

          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full py-3 px-6 text-white font-bold rounded-xl bg-[#dd8157] hover:bg-[#c86d47] transition"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/settings/billing"
              className="flex items-center justify-center gap-2 w-full py-3 px-6 text-gray-700 font-medium rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm"
            >
              Manage Subscription
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
