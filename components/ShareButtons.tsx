'use client'

import { Linkedin, Twitter, Facebook, Link as LinkIcon } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  variant?: 'sidebar' | 'inline'
}

export default function ShareButtons({ title, variant = 'inline' }: ShareButtonsProps) {
  const getUrl = () => (typeof window !== 'undefined' ? window.location.href : '')

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`,
      '_blank',
      'width=600,height=400'
    )
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(title)}`,
      '_blank',
      'width=600,height=400'
    )
  }

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`,
      '_blank',
      'width=600,height=400'
    )
  }

  const copyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const buttonClass = 'w-10 h-10 bg-[#363b57] hover:bg-[#dd8157] text-white rounded-lg flex items-center justify-center transition'
  const copyClass = 'w-10 h-10 bg-gray-200 hover:bg-[#dd8157] text-gray-700 hover:text-white rounded-lg flex items-center justify-center transition'

  if (variant === 'sidebar') {
    return (
      <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
          <div className="flex flex-col gap-3">
            <button onClick={shareOnLinkedIn} className={buttonClass} aria-label="Share on LinkedIn">
              <Linkedin className="w-5 h-5" />
            </button>
            <button onClick={shareOnTwitter} className={buttonClass} aria-label="Share on X/Twitter">
              <Twitter className="w-5 h-5" />
            </button>
            <button onClick={shareOnFacebook} className={buttonClass} aria-label="Share on Facebook">
              <Facebook className="w-5 h-5" />
            </button>
            <button onClick={copyLink} className={copyClass} aria-label="Copy link">
              <LinkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-4 py-8 border-t border-gray-200">
      <span className="text-sm font-semibold text-gray-700">Share this article:</span>
      <div className="flex gap-2">
        <button onClick={shareOnLinkedIn} className={buttonClass} aria-label="Share on LinkedIn">
          <Linkedin className="w-5 h-5" />
        </button>
        <button onClick={shareOnTwitter} className={buttonClass} aria-label="Share on X/Twitter">
          <Twitter className="w-5 h-5" />
        </button>
        <button onClick={shareOnFacebook} className={buttonClass} aria-label="Share on Facebook">
          <Facebook className="w-5 h-5" />
        </button>
        <button onClick={copyLink} className={copyClass} aria-label="Copy link">
          <LinkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
