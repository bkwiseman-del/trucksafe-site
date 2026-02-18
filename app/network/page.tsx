'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Users, MessageCircle, Award, Calendar, BookOpen, TrendingUp, CheckCircle2, ArrowRight, Lock, Star, Video, Shield, Briefcase, Clock } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function NetworkPage() {
  const [stats, setStats] = useState({ members: 0, posts: 0, categories: 0 })

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    const targets = { members: 500, posts: 2400, categories: 15 }
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setStats({
        members: Math.floor(targets.members * progress),
        posts: Math.floor(targets.posts * progress),
        categories: Math.floor(targets.categories * progress)
      })

      if (currentStep >= steps) {
        setStats(targets)
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Discussion Forums",
      description: "Connect with fellow safety managers, share experiences, and get answers to your toughest compliance questions.",
      access: "All Members"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Resource Library",
      description: "Access member-contributed templates, best practices, and real-world solutions to common challenges.",
      access: "All Members"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Member Directory",
      description: "Find and connect with safety professionals across the country. Build your network of trusted peers.",
      access: "All Members"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Recognition & Badges",
      description: "Earn recognition for your contributions, expertise, and engagement within the community.",
      access: "All Members"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Exclusive Webinars",
      description: "Access premium webinars, expert-led Q&A sessions, and in-depth training on hot compliance topics.",
      access: "Compliance+ Only",
      premium: true
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Bootcamp Event Pages",
      description: "Dedicated networking and discussion spaces for Bootcamp attendees to stay connected year-round.",
      access: "Bootcamp Attendee",
      premium: true
    }
  ]

  const accessLevels = [
    {
      name: "Basic Membership",
      price: "Free",
      description: "Join the community and start connecting with safety professionals.",
      features: [
        "Access to public discussion forums",
        "Member directory and profiles",
        "Post questions and share knowledge",
        "Resource library access",
        "Community badges and recognition",
        "Connect with peers nationwide"
      ],
      cta: "Join Free",
      ctaLink: "/signup",
      highlighted: false
    },
    {
      name: "Compliance+ Access",
      price: "From $95/month",
      description: "Unlock premium content, exclusive webinars, and advanced resources.",
      features: [
        "Everything in Basic, plus:",
        "Exclusive webinar library",
        "Private Compliance+ forums",
        "Expert-led discussion groups",
        "Premium regulatory updates",
        "Priority support access",
        "Advanced compliance tools"
      ],
      cta: "Learn More",
      ctaLink: "/complianceplus",
      highlighted: true
    },
    {
      name: "Bootcamp Alumni",
      price: "Event Registration",
      description: "Year-round networking for Bootcamp attendees.",
      features: [
        "Dedicated Bootcamp alumni forums",
        "Event-specific discussion threads",
        "Continued access to speakers",
        "Alumni-only networking events",
        "Exclusive follow-up content",
        "Alumni badge recognition"
      ],
      cta: "View Bootcamp",
      ctaLink: "/bootcamp",
      highlighted: false
    }
  ]

  const forumHighlights = [
    {
      name: "DOT Compliance Q&A",
      description: "Get your compliance questions answered by experts and experienced peers",
      icon: MessageCircle,
      access: "Free"
    },
    {
      name: "Hours of Service",
      description: "ELD compliance, logbook rules, and HOS best practices",
      icon: Clock,
      access: "Free"
    },
    {
      name: "Compliance+ Webinar Library",
      description: "Exclusive recorded webinars on regulatory updates and best practices",
      icon: Video,
      access: "Compliance+ Only"
    },
    {
      name: "Bootcamp Attendees",
      description: "Continue the conversation with fellow Bootcamp attendees",
      icon: Award,
      access: "Bootcamp Attendee"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/network-hero.jpg"
            alt="Trucksafe Network"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd8157]/20 border border-[#dd8157]/30 rounded-full mb-6">
              <Users className="w-4 h-4 text-[#dd8157]" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">Community</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Trucksafe Network
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join hundreds of safety professionals in a free community built for knowledge sharing, peer support, and industry connections. Connect, learn, and grow with fellow fleet safety managers.
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="/signup"
                className="bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition inline-flex items-center gap-2"
              >
                Join Free
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="/login"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg font-bold transition"
              >
                Log In
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#dd8157]" />
                <span className="text-sm font-medium">Free to join</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#dd8157]" />
                <span className="text-sm font-medium">No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#dd8157]" />
                <span className="text-sm font-medium">Instant access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Everything You Need to Connect & Learn
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From free community forums to premium content for Compliance+ members and dedicated spaces for Bootcamp alumni.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className={`bg-white p-8 rounded-xl border-2 transition ${
                feature.premium 
                  ? 'border-[#dd8157]/30 bg-[#dd8157]/5' 
                  : 'border-gray-200 hover:border-[#dd8157] hover:shadow-lg'
              }`}>
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 ${
                  feature.premium ? 'bg-[#dd8157]/10 text-[#dd8157]' : 'bg-gray-100 text-[#363b57]'
                }`}>
                  {feature.icon}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  {feature.premium && (
                    <Lock className="w-4 h-4 text-[#dd8157]" />
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className={`text-xs font-semibold uppercase tracking-wider ${
                  feature.premium ? 'text-[#dd8157]' : 'text-gray-500'
                }`}>
                  {feature.access}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forum Highlights */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Active Discussion Spaces
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Public forums for all members, plus exclusive spaces for Compliance+ subscribers and Bootcamp alumni.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {forumHighlights.map((forum, idx) => {
              const IconComponent = forum.icon
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#dd8157] transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-[#363b57]">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    {forum.access !== "Free" && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#dd8157]/10 text-[#dd8157] text-xs font-semibold rounded">
                        <Lock className="w-3 h-3" />
                        {forum.access}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {forum.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {forum.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Compliance+ Upsell */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#363b57] to-[#2a2e42] rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div className="p-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd8157]/20 border border-[#dd8157]/30 rounded-full mb-6">
                  <Shield className="w-4 h-4 text-[#dd8157]" />
                  <span className="text-sm font-semibold text-white uppercase tracking-wider">Premium Access</span>
                </div>

                <h2 className="text-4xl font-black text-white mb-6">
                  Go Deeper with Compliance+
                </h2>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Unlock exclusive Network features, premium webinars, expert-led discussions, and advanced compliance resources with a Compliance+ subscription.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#dd8157] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-white mb-1">Premium Live & Recorded Webinars</div>
                      <div className="text-white/70 text-sm">Join exclusive live sessions with experts and access the full library of recordings</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#dd8157] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-white mb-1">Private Compliance+ Forums</div>
                      <div className="text-white/70 text-sm">Connect with other subscribers in exclusive discussion spaces</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#dd8157] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-white mb-1">Expert-Led Discussion Groups</div>
                      <div className="text-white/70 text-sm">Participate in quarterly group consultations with Trucksafe experts</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#dd8157] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-white mb-1">Priority Support</div>
                      <div className="text-white/70 text-sm">Get faster responses and personalized consulting time</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#dd8157] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-white mb-1">Advanced Compliance Tools</div>
                      <div className="text-white/70 text-sm">Monthly compliance reports, policy reviews, and CSA score analysis</div>
                    </div>
                  </div>
                </div>

                <a
                  href="/complianceplus"
                  className="inline-flex items-center gap-2 bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition"
                >
                  Explore Compliance+
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              {/* Right: Image/Visual */}
              <div className="hidden lg:block relative h-full min-h-[500px]">
                <Image
                  src="/compliance-plus-preview.jpg"
                  alt="Compliance+ Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Phone Mockup */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative w-full max-w-md">
                <Image
                  src="/2024_App_Mockup_copy.png"
                  alt="Trucksafe Network Mobile App"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd8157]/10 border border-[#dd8157]/30 rounded-full mb-6">
                <Briefcase className="w-4 h-4 text-[#dd8157]" />
                <span className="text-sm font-semibold text-[#dd8157] uppercase tracking-wider">Mobile Experience</span>
              </div>

              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Access Anywhere, Anytime
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The Trucksafe Network works seamlessly on any device. Install it on your phone's home screen for an app-like experience with instant access to the community, notifications, and all your discussions.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#dd8157]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-[#dd8157]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Real-Time Discussions</h3>
                    <p className="text-gray-600 text-sm">Post, comment, and engage with the community from anywhere</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#dd8157]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-[#dd8157]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Event Access</h3>
                    <p className="text-gray-600 text-sm">View webinars, register for events, and access exclusive content on the go</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#dd8157]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[#dd8157]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Install to Home Screen</h3>
                    <p className="text-gray-600 text-sm">Add the Network to your phone for quick access and push notifications</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#dd8157]/10 border border-[#dd8157]/30 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong className="text-gray-900">Works on all devices:</strong> Access from your desktop, tablet, or phone. No app store downloads required—just open in your browser and optionally install to your home screen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              A Thriving Community
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-[#dd8157] mb-2">{stats.members}+</div>
              <div className="text-gray-600 font-semibold">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#dd8157] mb-2">{stats.posts.toLocaleString()}</div>
              <div className="text-gray-600 font-semibold">Forum Posts</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#dd8157] mb-2">{stats.categories}+</div>
              <div className="text-gray-600 font-semibold">Forum Categories</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#dd8157] mb-2">24h</div>
              <div className="text-gray-600 font-semibold">Avg Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-[#363b57]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to Join the Community?
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Create your free account today and start connecting with safety professionals across the country.
          </p>
          <a
            href="/signup"
            className="inline-block bg-[#dd8157] hover:bg-[#c86d47] text-white px-10 py-5 rounded-lg font-bold text-lg transition"
          >
            Join Free Now
          </a>
          <p className="text-white/60 mt-6">
            Already have an account? <a href="/login" className="text-[#dd8157] hover:text-[#c86d47] font-semibold">Sign in</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

