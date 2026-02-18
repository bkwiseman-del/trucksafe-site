'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Mic, Video, Users, CheckCircle2, ArrowRight, PlayCircle, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function ProductionsPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420 // Card width (400) + gap (20)
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount)
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
    }
  }
  const services = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Podcasts",
      description: "Turnkey podcast production, including show design, technology consulting, remote recording, limited editing, guest integration, and multi-platform distribution. Perfect for thought leadership on topics like fleet safety, technology, operations, etc.",
      image: "/productions-podcast.jpg"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Production",
      description: "Custom on- or off-site video production for safety modules, driver onboarding, or promos—scripted, filmed, and animated with transportation expertise. Includes assistance with LMS integration for easy access.",
      image: "/productions-video.jpg"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Live Events",
      description: "Full virtual or onsite event production, including webinars and other virtual events. For in-person events: projectors, sound, IMAG, multi-camera recording, and hybrid streaming for seminars, trade shows, or safety workshops.",
      image: "/productions-events.jpg"
    }
  ]

  const benefits = [
    "Industry expertise built into every production",
    "End-to-end service from concept to distribution",
    "Technology consulting and setup assistance",
    "Professional quality without the hassle",
    "Multi-platform distribution strategy",
    "Scalable solutions for any budget"
  ]

  const caseStudies = [
    {
      title: "Trucksafe LIVE!",
      description: "We launched Trucksafe LIVE! in 2021 as a monthly livestream podcast to share expert insights on FMCSA regulations, driver safety, compliance trends, and emerging technologies—positioning Trucksafe as a trusted authority in transportation without diverting resources from core consulting.",
      stats: [
        "60+ episodes produced",
        "Thousands of views per episode",
        "Live audience interaction",
        "Multi-platform distribution"
      ],
      link: "/live"
    },
    {
      title: "Fleet Compliance Bootcamp",
      description: "Trucksafe Consulting created the Fleet Compliance Bootcamp as an immersive, two-day in-person conference to equip trucking company owners, safety professionals, and risk advisors with practical tools to build and maintain cutting-edge DOT compliance programs.",
      stats: [
        "Annual 2-day conference",
        "Multi-camera recording",
        "Professional AV production",
        "Hybrid streaming capability"
      ],
      link: "/bootcamp"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/production-hero.jpg"
            alt="Trucksafe Productions"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd8157]/20 border border-[#dd8157]/30 rounded-full mb-6">
              <Mic className="w-4 h-4 text-[#dd8157]" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">Media Production</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Elevate Your Transportation Story
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              From podcasts that drive industry insights to training videos that boost safety and events that engage—your all-in-one media partner powered by industry experts. Launch your trucking content without the hassle!
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#services"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition inline-flex items-center gap-2 cursor-pointer"
              >
                Our Services
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#case-studies"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg font-bold transition cursor-pointer"
              >
                Case Studies
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                We Know Trucking. We Know Production.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Trucksafe Productions is the media innovation arm of Trucksafe Consulting, LLC, born from two decades of deep expertise in transportation safety, compliance, and operations, as well as video & event production.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Inspired by the success of our flagship Trucksafe LIVE! podcast and Trucksafe Bootcamp conference—which have engaged thousands of industry pros with real-talk episodes and seminars on trucking compliance—we're on a mission to empower trucking companies, logistics providers, and other industry leaders to launch their own high-impact audio, video, and visual content without the hassle.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Based in Greenfield, Indiana, we blend consulting know-how with cutting-edge production to create media that educates, cuts through the noise, and grows your business in the $8 trillion logistics world.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Comprehensive Production
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Whether you're a trucking company needing compliance training or a logistics association hosting events, our services are tailored to your niche. We handle everything from concept to distribution, ensuring premium quality and seamless execution.
              </p>
              <div className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#dd8157] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Our Production Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional media production tailored specifically for the trucking and logistics industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#dd8157] hover:shadow-lg transition">
                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#363b57]/60 to-[#2a2e42]/60 flex items-center justify-center">
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Productions - Horizontal Scroll with Arrows */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Sample Productions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See examples of our work from Trucksafe LIVE! and other productions.
            </p>
          </div>

          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Video 1 - Podcast */}
              <div className="flex-shrink-0 w-[400px] snap-start">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#dd8157] hover:shadow-lg transition h-full">
                  <div className="relative aspect-video bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/-GdHhNYdBGg"
                      title="Trucksafe LIVE! Episode"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-3">
                      <Mic className="w-3 h-3" />
                      Podcast
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Trucksafe LIVE! | Ep. 58 - 2025 year in review & 2026 outlook
                    </h3>
                    <p className="text-sm text-gray-600">
                      On this episode, we break down the top 10 regulatory developments of 2025 and what they mean for fleets heading into 2026.
                    </p>
                  </div>
                </div>
              </div>

              {/* Video 2 - Training Video */}
              <div className="flex-shrink-0 w-[400px] snap-start">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#dd8157] hover:shadow-lg transition h-full">
                  <div className="relative aspect-video bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/QoSHE4Xu0BQ"
                      title="Training Video Sample"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-3">
                      <Video className="w-3 h-3" />
                      Video Production
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Snow chain use for commercial vehicles
                    </h3>
                    <p className="text-sm text-gray-600">
                      In this video, we breakdown proper snow chain use by commercial drivers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Video 3 - Event Coverage */}
              <div className="flex-shrink-0 w-[400px] snap-start">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#dd8157] hover:shadow-lg transition h-full">
                  <div className="relative aspect-video bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/1CTYr-SK8y0"
                      title="Trucksafe Academy Preview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-3">
                      <Users className="w-3 h-3" />
                      Event Production
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Trucksafe Academy Preview 2024
                    </h3>
                    <p className="text-sm text-gray-600">
                      Professional video production showcasing our comprehensive online DOT compliance training courses.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg transition z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
            
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg transition z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Case Studies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-world examples of how we've helped organizations create impactful media.
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#dd8157] hover:shadow-lg transition">
                <div className="grid lg:grid-cols-3 gap-8 p-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {study.title}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      {study.description}
                    </p>
                    <a
                      href={study.link}
                      className="inline-flex items-center gap-2 text-[#dd8157] hover:text-[#c86d47] font-semibold transition"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                      Key Highlights
                    </h4>
                    <ul className="space-y-3">
                      {study.stats.map((stat, sidx) => (
                        <li key={sidx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#dd8157] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{stat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-[#363b57]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Contact us for a free discovery call. We're here to amplify your transportation voice.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#dd8157] hover:bg-[#c86d47] text-white px-10 py-5 rounded-lg font-bold text-lg transition"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
