'use client'

import Image from 'next/image'
import { ArrowLeft, Clock, Calendar, User, Share2, Linkedin, Twitter, Facebook, Link as LinkIcon } from 'lucide-react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'

export default function ArticlePage() {
  const shareOnLinkedIn = () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400')
  }

  const shareOnTwitter = () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const title = typeof document !== 'undefined' ? document.title : ''
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank', 'width=600,height=400')
  }

  const shareOnFacebook = () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400')
  }

  const copyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Floating Share Sidebar - Hidden on mobile */}
      <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
          <div className="flex flex-col gap-3">
            <button
              onClick={shareOnLinkedIn}
              className="w-10 h-10 bg-[#363b57] hover:bg-[#dd8157] text-white rounded-lg flex items-center justify-center transition"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </button>
            <button
              onClick={shareOnTwitter}
              className="w-10 h-10 bg-[#363b57] hover:bg-[#dd8157] text-white rounded-lg flex items-center justify-center transition"
              aria-label="Share on X/Twitter"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button
              onClick={shareOnFacebook}
              className="w-10 h-10 bg-[#363b57] hover:bg-[#dd8157] text-white rounded-lg flex items-center justify-center transition"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button
              onClick={copyLink}
              className="w-10 h-10 bg-gray-200 hover:bg-[#dd8157] text-gray-700 hover:text-white rounded-lg flex items-center justify-center transition"
              aria-label="Copy link"
            >
              <LinkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <a href="/articles" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#dd8157] transition mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </a>

          {/* Category Badge */}
          <div className="inline-block px-3 py-1 bg-[#dd8157]/10 text-[#dd8157] rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
            Regulatory Update
          </div>

          {/* Title */}
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
            FMCSA Issues Final Rule on Non-Domiciled CDLs
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-8 border-b border-gray-200 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Brandon Wiseman</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">February 13, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">6 min read</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-96 rounded-xl overflow-hidden mb-12">
            <Image
              src="/semitruckcrossingamericanwestwilderness20260108235953utc.jpeg"
              alt="Article cover"
              fill
              className="object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              The Federal Motor Carrier Safety Administration (FMCSA) has issued a new final rule on non-domiciled Commercial Learner's Permits (CLPs) and Commercial Driver's Licenses (CDLs). Scheduled for publication in the Federal Register on February 13, 2026, this rule largely reaffirms the provisions of the September 29, 2025, Interim Final Rule with minor clarifications, despite intense legal scrutiny, a court-imposed stay, and thousands of public comments.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Backstory</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The framework for non-domiciled CDLs traces its roots to the Commercial Motor Vehicle Safety Act of 1986, which established national standards for commercial licensing to enhance road safety. These credentials enable foreign nationals legally present in the U.S. with work authorization to operate commercial motor vehicles.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Historically, State Driver's Licensing Agencies could issue non-domiciled CDLs to individuals presenting proof of lawful presence, such as an unexpired Employment Authorization Document or a foreign passport with Form I-94. However, FMCSA's recent Annual Program Reviews uncovered persistent issues like widespread non-compliance with validity periods and inadequate verification processes.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Key Provisions of the Rule</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The rule restricts non-domiciled CLP/CDL eligibility to foreign-domiciled holders of H-2A, H-2B, or E-2 visa statuses, requiring proof through an unexpired foreign passport. State agencies are mandated to limit credential validity to the immigration document's expiration (maximum one year, renewable with renewed proof).
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Implications for Trucking</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              For fleets, FMCSA concluded that any reduction in the non-domiciled driver population would likely occur gradually as licenses expire and are not renewed under the new eligibility standards. The agency emphasized that many drivers will have several years before their credentials expire, giving both drivers and carriers time to adjust.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              This rule fits into a larger pattern. Over the past several years, FMCSA has increasingly focused on credential integrity—whether in the context of English-language proficiency enforcement, licensing oversight, or fraudulent documentation cases. The agency appears determined to tighten the front end of the licensing process as a way to prevent safety and enforcement problems downstream.
            </p>

            {/* Call-out Box */}
            <div className="bg-[#363b57] text-white p-8 rounded-xl my-12">
              <h3 className="text-2xl font-bold mb-4">Key Takeaway</h3>
              <p className="text-white/90 leading-relaxed">
                For fleets, the takeaway is straightforward: expect closer scrutiny of driver credentials, fewer gray areas in eligibility, and a licensing system that is becoming more standardized—and more restrictive—at the same time.
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200 mb-8">
            {['FMCSA', 'Regulations', 'CDL', 'Driver Qualification'].map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* Social Share - Bottom of Article */}
          <div className="flex items-center justify-center gap-4 py-8 border-t border-gray-200">
            <span className="text-sm font-semibold text-gray-700">Share this article:</span>
            <div className="flex gap-2">
              <button
                onClick={shareOnLinkedIn}
                className="w-10 h-10 bg-[#363b57] hover:bg-[#dd8157] text-white rounded-lg flex items-center justify-center transition"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                onClick={shareOnTwitter}
                className="w-10 h-10 bg-[#363b57] hover:bg-[#dd8157] text-white rounded-lg flex items-center justify-center transition"
                aria-label="Share on X/Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={shareOnFacebook}
                className="w-10 h-10 bg-[#363b57] hover:bg-[#dd8157] text-white rounded-lg flex items-center justify-center transition"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={copyLink}
                className="w-10 h-10 bg-gray-200 hover:bg-[#dd8157] text-gray-700 hover:text-white rounded-lg flex items-center justify-center transition"
                aria-label="Copy link"
              >
                <LinkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-12">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Compliance Theater: When Documentation Replaces Judgment",
                category: "Compliance Tips",
                date: "Jan 25, 2026",
                readTime: "7 min read"
              },
              {
                title: "FMCSA Keeps Random Drug & Alcohol Testing Rates the Same for 2026",
                category: "Regulatory Update",
                date: "Jan 13, 2026",
                readTime: "5 min read"
              },
              {
                title: "Top 10 Regulatory Developments Heading Into 2026",
                category: "Industry News",
                date: "Dec 8, 2025",
                readTime: "8 min read"
              }
            ].map((article, idx) => (
              <article key={idx} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#dd8157] hover:shadow-lg transition cursor-pointer">
                <div className="text-sm font-semibold text-[#dd8157] uppercase tracking-wider mb-3">
                  {article.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{article.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Stay Updated on DOT Compliance
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Get expert analysis and breaking regulatory news delivered to your inbox
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dd8157]"
            />
            <button
              type="submit"
              className="bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-sm text-white/60 mt-6">
            Join thousands of safety professionals staying informed
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            <div className="lg:col-span-2">
              <Image 
                src="/Horizontal_TM_Light.svg" 
                alt="Trucksafe" 
                width={200} 
                height={60}
                className="h-12 w-auto mb-6"
              />
              <p className="text-gray-400 leading-relaxed max-w-md mb-6">
                Learn about DOT compliance with Trucksafe, the United States leader in safety consulting and online training.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://twitter.com/TrucksafeLLC" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/trucksafeconsulting" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://www.facebook.com/TrucksafeConsulting" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
                <a href="https://www.youtube.com/channel/UCekMTCpS9EIH-aeC3XtYfeg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Consulting</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Trucksafe Academy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Bootcamp</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Compliance Plus</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Trucksafe Network</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Articles</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Trucksafe LIVE!</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Regulatory Updates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Shop</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#dd8157] transition text-sm">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              © 2026 Trucksafe Consulting, LLC. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
