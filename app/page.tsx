'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Shield, TrendingUp, Users, BookOpen, Calendar, Mic, Award, ArrowRight, CheckCircle2, DollarSign, AlertTriangle, FileText, Scale, GraduationCap, FileCheck, BarChart3, FileSignature, Briefcase, PlayCircle } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: { end: number, duration?: number, suffix?: string, prefix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return <div ref={ref}>{prefix}{count.toLocaleString()}{suffix}</div>
}

function BootcampCounter({ end, suffix = '', isActive }: { end: number, suffix?: string, isActive: boolean }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isActive || hasAnimated) return

    setHasAnimated(true)
    let startTime: number | null = null
    const duration = 1500
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isActive, end, hasAnimated])

  // Reset when tab changes away
  useEffect(() => {
    if (!isActive) {
      setCount(0)
      setHasAnimated(false)
    }
  }, [isActive])

  return <div>{count.toLocaleString()}{suffix}</div>
}

export default function Homepage() {
  const [activeTab, setActiveTab] = useState<'network' | 'live' | 'bootcamp'>('network')

  return (
    <div className="min-h-screen bg-white">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-br from-[#363b57] to-[#2a2e42]">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/semitruckcrossingamericanwestwilderness20260108235953utc.jpeg"
            alt="Semi truck"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <Shield className="w-4 h-4 text-[#dd8157]" />
              <span className="text-sm font-semibold text-white">Trusted Leader in DOT Compliance</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Demystifying<br />
              DOT Compliance
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Trucksafe is run by a team of transportation attorneys and industry experts who've spent years assisting many of the nation's leading motor carriers with DOT compliance.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#services" className="group bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold text-lg transition flex items-center gap-2">
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#dd8157]" />
                <span className="text-white/80 text-sm">Industry Leading Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#dd8157]" />
                <span className="text-white/80 text-sm">Timely Articles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#dd8157]" />
                <span className="text-white/80 text-sm">Personalized Consulting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Stats */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">The Cost of Non-Compliance</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              DOT violations can devastate your business. Here's what's at stake.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-5xl font-black text-gray-900 mb-2">
                <AnimatedCounter end={7000} prefix="$" />
              </div>
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Average DOT Fine</div>
              <p className="text-gray-600 mt-3 text-sm">Monetary penalty for non-compliance following DOT compliance review.*</p>
              <p className="text-xs text-gray-500 mt-2">*Source: FMCSA Enforcement A&I Data, 2025</p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-5xl font-black text-gray-900 mb-2">
                <AnimatedCounter end={56} suffix="%" />
              </div>
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Inspection Violation Rate</div>
              <p className="text-gray-600 mt-3 text-sm">Of roadside inspections result in at least one violation.*</p>
              <p className="text-xs text-gray-500 mt-2">*Source: FMCSA A&I Data, CY 2025</p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-5xl font-black text-gray-900 mb-2">
                <AnimatedCounter end={36} prefix="$" suffix="M" />
              </div>
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Median Nuclear Verdict</div>
              <p className="text-gray-600 mt-3 text-sm">Average jury award in highway accident cases against trucking companies.*</p>
              <p className="text-xs text-gray-500 mt-2">*Source: ATRI Trucking Litigation Report, Dec. 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Real Content */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-[#dd8157] uppercase tracking-widest mb-4">What We Do</div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">DOT Compliance Consulting Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a range of DOT compliance consulting services based on your specific needs. Whether you're just setting up shop or looking to improve your safety program, we can help!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-7 h-7" />,
                title: "DOT Consulting Services",
                description: "Comprehensive DOT compliance support including policy development, CSA score improvement, safety program audits, and ongoing regulatory guidance tailored to your operations.",
                link: "/services/consulting"
              },
              {
                icon: <GraduationCap className="w-7 h-7" />,
                title: "Manager & Driver Training",
                description: "In-person and virtual training courses tailored to your unique operations, covering driver qualification, hours-of-service, drug/alcohol testing, and more.",
                link: "/academy"
              },
              {
                icon: <FileCheck className="w-7 h-7" />,
                title: "DOT Audit Prep & Guidance",
                description: "Be proactive and let us conduct a mock DOT audit using the same methodology as the DOT. We can also assist with safety rating upgrades and corrective action plans.",
                link: "/services/audit"
              },
              {
                icon: <BarChart3 className="w-7 h-7" />,
                title: "Trucksafe Risk Control",
                description: "Cutting-edge risk control and mitigation services featuring comprehensive fleet safety data review, AI-powered analysis, and predictive insights for fleets and insurers. Coming soon.",
                link: "/services",
                badge: "Coming Soon"
              },
              {
                icon: <Scale className="w-7 h-7" />,
                title: "Expert Witness & Consulting",
                description: "Our attorneys routinely serve as expert witnesses in complex lawsuits, advising on driver qualification, FMCSR compliance, vehicle maintenance, and more.",
                link: "/expertwitness"
              },
              {
                icon: <Mic className="w-7 h-7" />,
                title: "Trucksafe Productions",
                description: "Professional podcast, video, and event production services for trucking and logistics companies. From training videos to live conferences, we handle it all.",
                link: "/production"
              }
            ].map((service, idx) => (
              <a
                key={idx}
                href={service.link}
                className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-[#dd8157] hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 bg-gray-100 group-hover:bg-[#dd8157] rounded-lg flex items-center justify-center transition-colors text-[#363b57] group-hover:text-white">
                    {service.icon}
                  </div>
                  {service.badge && (
                    <span className="px-3 py-1 bg-[#dd8157]/10 text-[#dd8157] rounded-full text-xs font-semibold uppercase tracking-wider">
                      {service.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#dd8157] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                {!service.badge && (
                  <div className="flex items-center gap-2 text-[#dd8157] font-semibold text-sm group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </a>
            ))}
          </div>


        </div>
      </section>

      {/* Compliance Plus Preview */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 to-[#363b57] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/closeupsideviewlookingforwardofacommercial20260109092929utc.jpg"
            alt="Truck cab"
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-[#dd8157]/20 border border-[#dd8157]/30 rounded-full mb-6">
                <span className="text-sm font-bold text-[#dd8157]">NEW SUBSCRIPTION SERVICE</span>
              </div>
              <h2 className="text-5xl font-black text-white mb-6">
                Trucksafe Compliance Plus
              </h2>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                Comprehensive compliance support with regulatory updates, training access, monthly health assessments, and dedicated consulting time—all in one subscription.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Monthly compliance health reports",
                  "Access to regulatory updates & expert analysis",
                  "Quarterly group consultations with attorneys",
                  "Dedicated one-on-one consulting hours"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#dd8157] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/complianceplus" className="inline-block bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold text-lg transition">
                View Plans & Pricing
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">Basic Tier</div>
                  <div className="text-4xl font-black text-white mb-4">$95<span className="text-xl font-normal text-white/60">/month</span></div>
                  <ul className="space-y-2 text-white/80 text-sm">
                    <li>• Regulatory updates & briefings</li>
                    <li>• Resource library access</li>
                    <li>• Monthly webinars</li>
                    <li>• Trucksafe Network membership</li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-white/20">
                  <div className="text-sm text-white/60">Also available: <strong className="text-white">Pro ($495/mo)</strong> and <strong className="text-white">Premium ($995/mo)</strong> tiers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network / LIVE / Bootcamp - Pill Selector */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Explore Our Community & Events</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with industry professionals, tune into our monthly livestream, and attend our annual conference
            </p>
          </div>

          {/* Pill Selector */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 p-2 rounded-full">
              <button
                onClick={() => setActiveTab('network')}
                className={`px-8 py-3 rounded-full font-semibold text-sm transition-all ${
                  activeTab === 'network'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Trucksafe Network
              </button>
              <button
                onClick={() => setActiveTab('live')}
                className={`px-8 py-3 rounded-full font-semibold text-sm transition-all ${
                  activeTab === 'live'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Trucksafe LIVE!
              </button>
              <button
                onClick={() => setActiveTab('bootcamp')}
                className={`px-8 py-3 rounded-full font-semibold text-sm transition-all ${
                  activeTab === 'bootcamp'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Bootcamp
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="min-h-[500px]">
            {activeTab === 'network' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#363b57] rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Community</div>
                      <div className="text-2xl font-black text-gray-900">Trucksafe Network</div>
                    </div>
                  </div>
                  
                  <p className="text-xl text-gray-700 leading-relaxed mb-8">
                    A space for motor carrier safety professionals, risk advisors, and others to network, ask questions, learn from one another, and exchange ideas to help improve fleet compliance.
                  </p>

                  <div className="space-y-4 mb-8">
                    {[
                      "Connect with 2,800+ safety professionals",
                      "Ask questions & get expert answers",
                      "Share best practices & solutions",
                      "Access exclusive member resources"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#dd8157] flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition">
                    Join the Network
                  </button>
                </div>

                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Recent Discussions</div>
                  <div className="space-y-6">
                    {[
                      { title: "Best practices for ELD data retention?", author: "Mike R.", replies: 12, time: "2 hours ago" },
                      { title: "Pre-employment screening changes", author: "Jennifer K.", replies: 8, time: "5 hours ago" },
                      { title: "Mock audit preparation checklist", author: "David L.", replies: 24, time: "1 day ago" }
                    ].map((discussion, idx) => (
                      <div key={idx} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                        <div className="font-semibold text-gray-900 mb-2">{discussion.title}</div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{discussion.author}</span>
                          <span>•</span>
                          <span>{discussion.replies} replies</span>
                          <span>•</span>
                          <span>{discussion.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'live' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/videoseries?list=PLKFRi6fwIR2GTP5okXxJ-clPj0hqLwT_w"
                    title="Trucksafe LIVE!"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                      <Mic className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Monthly Livestream</div>
                      <div className="text-2xl font-black text-gray-900">Trucksafe LIVE!</div>
                    </div>
                  </div>
                  
                  <p className="text-xl text-gray-700 leading-relaxed mb-8">
                    Tune in and participate in our monthly live show where we invite special guests to discuss hot-button issues impacting highway safety like nuclear verdicts, rising insurance costs, and regulatory initiatives.
                  </p>

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Upcoming Show</div>
                    <div className="text-sm font-semibold text-[#dd8157] mb-1">Episode 61</div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">A conversation with Administrator Derek Barrs</div>
                    <div className="text-gray-600 mb-3">On this episode, we're excited to be joined by FMCSA Administrator Chief Derek Barrs to discuss some of the most pressing enforcement trends affecting the trucking industry today.</div>
                    <div className="text-sm text-gray-500">Feb 20, 2026 • 2:00 PM ET</div>
                  </div>

                  <a 
                    href="/live"
                    className="inline-block bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition"
                  >
                    Check It Out
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'bootcamp' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  <Image
                    src="/bootcamp-image.jpg"
                    alt="Trucksafe Bootcamp"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#363b57] rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Events</div>
                      <div className="text-2xl font-black text-gray-900">Trucksafe Bootcamp</div>
                    </div>
                  </div>
                  
                  <p className="text-xl text-gray-700 leading-relaxed mb-8">
                    An immersive, two-day conference for trucking company owners, safety professionals, and risk advisors to develop and maintain cutting-edge fleet safety & compliance programs.
                  </p>

                  <div className="flex flex-wrap gap-12 mb-8">
                    <div>
                      <div className="text-4xl font-black text-gray-900 mb-2">2</div>
                      <div className="text-sm text-gray-600 uppercase tracking-wider">Days</div>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-gray-900 mb-2">
                        <BootcampCounter end={15} suffix="+" isActive={activeTab === 'bootcamp'} />
                      </div>
                      <div className="text-sm text-gray-600 uppercase tracking-wider">Sessions</div>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-gray-900 mb-2">
                        <BootcampCounter end={100} suffix="+" isActive={activeTab === 'bootcamp'} />
                      </div>
                      <div className="text-sm text-gray-600 uppercase tracking-wider">Attendees</div>
                    </div>
                  </div>

                  <a 
                    href="/bootcamp"
                    className="inline-block bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">Trusted by Leading Fleets</h2>
            <p className="text-xl text-gray-600">
              See what fleet professionals are saying about Trucksafe
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "Trucksafe transformed how we approach DOT compliance. Their attorney-backed guidance gives us confidence that we're not just compliant—we're building a truly safe operation.",
                author: "John Martinez",
                role: "VP of Safety, Regional Carrier",
                company: "450+ power units"
              },
              {
                quote: "The Bootcamp was a game-changer. In two days, we learned more about practical compliance strategies than we had in years. The ROI was immediate.",
                author: "Sarah Chen",
                role: "Compliance Manager",
                company: "National LTL Carrier"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-5xl text-[#dd8157] mb-4">"</div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-2">Latest Insights</h2>
              <p className="text-lg text-gray-600">Expert analysis on DOT compliance & regulatory updates</p>
            </div>
            <a href="/blog" className="text-[#dd8157] font-semibold hover:text-[#c86d47] transition flex items-center gap-2">
              View All Articles <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: "Regulatory Update",
                title: "FMCSA Issues Final Rule on Non-Domiciled CDLs",
                excerpt: "New rule largely reaffirms September 2025 provisions restricting non-domiciled CDL eligibility to H-2A, H-2B, or E-2 visa holders.",
                date: "Feb 13, 2026",
                readTime: "6 min read",
                slug: "example"
              },
              {
                category: "Compliance Tips",
                title: "Compliance Theater: When Documentation Replaces Judgment",
                excerpt: "Many fleets document everything but miss the point—proper documentation doesn't replace sound operational judgment.",
                date: "Jan 25, 2026",
                readTime: "7 min read",
                slug: "compliance-theater-documentation"
              },
              {
                category: "Regulatory Update",
                title: "FMCSA Keeps Random Drug & Alcohol Testing Rates the Same for 2026",
                excerpt: "Minimum random drug testing rate remains at 50%, with alcohol testing at 10%—marking six consecutive years at these rates.",
                date: "Jan 13, 2026",
                readTime: "5 min read",
                slug: "drug-alcohol-testing-rates-2026"
              }
            ].map((post, idx) => (
              <a key={idx} href={`/post/${post.slug}`} className="group cursor-pointer block">
                <div className="bg-gray-100 h-48 rounded-xl mb-4 group-hover:bg-gray-200 transition" />
                <div className="text-sm font-semibold text-[#dd8157] uppercase tracking-wider mb-2">
                  {post.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#dd8157] transition">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Videos */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-2">Latest Videos</h2>
              <p className="text-lg text-gray-600">Quick DOT compliance updates from our experts</p>
            </div>
            <a 
              href="https://www.youtube.com/playlist?list=PLKFRi6fwIR2GO3yje9N3gFGjQCI84a93P" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dd8157] font-semibold hover:text-[#c86d47] transition flex items-center gap-2"
            >
              View All Videos <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: "ewKLrxn4zCM",
                title: "2026 DOT Compliance Outlook",
                description: "Key regulatory changes and enforcement trends fleets need to prepare for in 2026.",
                thumbnail: "https://i.ytimg.com/vi/ewKLrxn4zCM/sddefault.jpg"
              },
              {
                id: "RM92_yIMlmU", 
                title: "California Funding Freeze & Non-Domiciled CDLs",
                description: "Breaking down FMCSA's $40M funding freeze and the new non-domiciled CDL restrictions.",
                thumbnail: "https://i.ytimg.com/vi/RM92_yIMlmU/sddefault.jpg"
              },
              {
                id: "jh-sTfiOMPM",
                title: "FMCSA HOS Pilot Program",
                description: "Understanding the new hours-of-service flexibility pilot program and its implications.",
                thumbnail: "https://i.ytimg.com/vi/jh-sTfiOMPM/sddefault.jpg"
              }
            ].map((video, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const modal = document.createElement('div')
                  modal.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6'
                  modal.onclick = (e) => {
                    if (e.target === modal) modal.remove()
                  }
                  modal.innerHTML = `
                    <div class="relative w-full max-w-5xl">
                      <button onclick="this.closest('div[class*=fixed]').remove()" class="absolute -top-12 right-0 text-white hover:text-gray-300 text-4xl font-light">&times;</button>
                      <div class="relative aspect-video bg-black rounded-xl overflow-hidden">
                        <iframe
                          src="https://www.youtube.com/embed/${video.id}?autoplay=1"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                          class="absolute inset-0 w-full h-full"
                        ></iframe>
                      </div>
                    </div>
                  `
                  document.body.appendChild(modal)
                }}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#dd8157] hover:shadow-lg transition text-left w-full flex flex-col"
              >
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#dd8157] transition mb-3">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {video.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Stay Informed on DOT Compliance
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Get in-depth DOT compliance articles and breaking regulatory news delivered right to your inbox
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dd8157]"
            />
            <button className="bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold whitespace-nowrap transition">
              Subscribe
            </button>
          </div>
          
          <p className="text-sm text-white/60 mt-4">
            Join 5,000+ fleet professionals. Unsubscribe anytime.
          </p>
        </div>
      </section>

      
      <Footer />
    </div>
  )
}
