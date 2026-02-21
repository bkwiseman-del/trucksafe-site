'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LogIn, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

export default function Navigation() {
  const { data: session } = useSession()
  const isLoggedIn = !!session

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      await signOut({ callbackUrl: '/' })
    } else {
      window.location.href = '/login'
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/">
              <Image 
                src="/Horizontal_TM_Dark.svg" 
                alt="Trucksafe" 
                width={180} 
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-[#dd8157] transition">
                About
              </Link>
              <Link href="/#services" className="text-sm font-medium text-gray-700 hover:text-[#dd8157] transition">
                Services
              </Link>
              <div className="relative group">
                <button className="text-sm font-medium text-gray-700 hover:text-[#dd8157] transition flex items-center gap-1">
                  Resources
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/academy" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#dd8157] transition">
                    Trucksafe Academy
                  </Link>
                  <Link href="/network" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#dd8157] transition">
                    Trucksafe Network
                  </Link>
                  <Link href="/bootcamp" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#dd8157] transition">
                    Bootcamp
                  </Link>
                  <Link href="/live" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#dd8157] transition">
                    Trucksafe LIVE!
                  </Link>
                  <Link href="/shop" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#dd8157] transition rounded-b-lg">
                    Shop
                  </Link>
                </div>
              </div>
              <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-[#dd8157] transition">
                Articles
              </Link>
            </div>
          </div>
          
          {/* Auth & Contact Buttons */}
          <div className="flex items-center gap-3">
            {!isLoggedIn && (
              <button
                onClick={handleAuthAction}
                className="border-2 border-[#dd8157] text-[#dd8157] hover:bg-[#dd8157] hover:text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition inline-flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </button>
            )}
            <Link 
              href="/contact" 
              className="bg-[#dd8157] hover:bg-[#c86d47] text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
