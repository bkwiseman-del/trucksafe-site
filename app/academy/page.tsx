'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { GraduationCap, PlayCircle, CheckCircle2, BookOpen, Smartphone, TrendingDown, Award, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function AcademyPage() {
  const [activeTab, setActiveTab] = useState('safety-managers')
  const [featureSlide, setFeatureSlide] = useState(0)

  // Animated stats
  const [avgFine, setAvgFine] = useState(0)
  const [violations, setViolations] = useState(0)
  const [outOfService, setOutOfService] = useState(0)

  useEffect(() => {
    const timer1 = setInterval(() => {
      setAvgFine(prev => prev < 5959 ? prev + 150 : 5959)
    }, 20)
    const timer2 = setInterval(() => {
      setViolations(prev => prev < 250000 ? prev + 5000 : 250000)
    }, 15)
    const timer3 = setInterval(() => {
      setOutOfService(prev => prev < 15 ? prev + 0.3 : 15)
    }, 30)

    return () => {
      clearInterval(timer1)
      clearInterval(timer2)
      clearInterval(timer3)
    }
  }, [])

  const platformFeatures = [
    {
      title: "Structured Courses & Premium Content",
      description: "Our courses are carefully structured with high-quality video lessons, downloadable resources, and comprehensive materials to ensure you master DOT compliance.",
      image: "/platform-1.jpg"
    },
    {
      title: "Interactive Quizzes & Handouts",
      description: "Test your knowledge with interactive quizzes throughout each course and access helpful handouts to reinforce your learning.",
      image: "/platform-2.jpg"
    },
    {
      title: "Take Your Courses On-the-Go",
      description: "Access your training from any device, anywhere. Perfect for drivers and safety managers who are always on the move.",
      image: "/platform-3.jpg"
    },
    {
      title: "Custom Completion Certificates",
      description: "Earn professional certificates upon course completion that you can download, print, and add to your records.",
      image: "/platform-4.jpg"
    }
  ]

  const nextFeature = () => setFeatureSlide((prev) => (prev + 1) % platformFeatures.length)
  const prevFeature = () => setFeatureSlide((prev) => (prev - 1 + platformFeatures.length) % platformFeatures.length)

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/academy-hero.jpg"
            alt="Trucksafe Academy"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd8157]/20 border border-[#dd8157]/30 rounded-full mb-6">
            <GraduationCap className="w-4 h-4 text-[#dd8157]" />
            <span className="text-sm font-semibold text-white uppercase tracking-wider">Online Training</span>
          </div>
          
          <div className="max-w-md mx-auto mb-8">
            <Image
              src="/academy-logo.svg"
              alt="Trucksafe Academy"
              width={400}
              height={300}
              className="w-full h-auto"
            />
          </div>

          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your journey towards understanding and achieving compliance with the Federal Motor Carrier Safety Regulations begins here!
          </p>
        </div>
      </section>

      {/* Toggle Section */}
      <section className="py-12 px-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Training Path</h2>
          <p className="text-gray-700 mb-8">
            We offer comprehensive training for both safety managers and drivers. Select which training you're interested in to view relevant courses.
          </p>
          
          <div className="inline-flex bg-gray-100 rounded-full p-1.5">
            <button
              onClick={() => setActiveTab('safety-managers')}
              className={`px-8 py-3 rounded-full font-semibold transition ${
                activeTab === 'safety-managers'
                  ? 'bg-[#dd8157] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Safety Managers
            </button>
            <button
              onClick={() => setActiveTab('driver-training')}
              className={`px-8 py-3 rounded-full font-semibold transition ${
                activeTab === 'driver-training'
                  ? 'bg-[#dd8157] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Driver Training
            </button>
          </div>
        </div>
      </section>

      {activeTab === 'safety-managers' ? (
        <>
          {/* Unparalleled Content with Video */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Unparalleled Content</h2>
              
              <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
                <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/cVASp_3Fqc0"
                    title="Course Walkthrough"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    Trucksafe Academy's online training courses are unlike any others! Specifically built to bring safety team members and drivers up to speed on the most significant components of the Federal Motor Carrier Safety Regulations, our courses break these complex topics down to their basic components and present them in an engaging fashion.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Why choose from an a la carte menu of mundane, outdated training videos when you can receive comprehensive training on all pertinent topics in one engaging course?
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: BookOpen,
                    title: "In-Depth Content",
                    description: "Video lessons, helpful written resources and quizzes to keep you on your toes!"
                  },
                  {
                    icon: Award,
                    title: "Expert Instruction",
                    description: "Top quality, relevant and up-to-date material taught by industry experts"
                  },
                  {
                    icon: CheckCircle2,
                    title: "Made Intuitive",
                    description: "Complex regulatory topics made clear through engaging training videos and content"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-[#dd8157]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <item.icon className="w-8 h-8 text-[#dd8157]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* All Courses */}
          <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Our Courses</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "DOT Compliance for Safety Managers",
                    description: "An in-depth course designed for business owners and safety managers, covering all major components of the Federal Motor Carrier Safety Regulations.",
                    link: "https://trucksafeacademy.thinkific.com/courses/dot-compliance-for-safety-managers",
                    badge: "Featured"
                  },
                  {
                    title: "DOT Compliance for Drivers",
                    description: "Comprehensive regulatory training materials for commercial drivers covering topics like driver qualification, hours-of-service, vehicle maintenance, and more.",
                    link: "https://trucksafeacademy.thinkific.com/courses/dot-compliance-for-drivers",
                    badge: "Featured"
                  },
                  {
                    title: "Reasonable Suspicion Supervisor Training",
                    description: "DOT-mandated training for driver supervisors covering the signs and symptoms of alcohol and drug use.",
                    link: "https://trucksafeacademy.thinkific.com/courses/reasonable-suspicion",
                    badge: "Featured"
                  },
                  {
                    title: "Hazardous Materials Training",
                    description: "An in-depth course for hazmat employees designed to assist motor carriers meet their regulatory requirement to provide training every 3 years.",
                    link: "https://trucksafeacademy.thinkific.com/courses/hazmat",
                    badge: "Featured"
                  },
                  {
                    title: "Driver Qualification",
                    description: "A detailed look at the federal driver qualification rules in 49 C.F.R. Part 391, including minimum standards, medical cards, road tests, and more.",
                    link: "https://trucksafeacademy.thinkific.com/courses/driver-qualification",
                    badge: "Mini Course"
                  },
                  {
                    title: "Hours-of-Service",
                    description: "A mini course focused on the hours-of-service rules in 49 C.F.R. Part 395, including duty status, driving limits, ELDs, and exemptions.",
                    link: "https://trucksafeacademy.thinkific.com/courses/hours-of-service",
                    badge: "Mini Course"
                  }
                ].map((course, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#dd8157] transition group">
                    <div className="relative aspect-video bg-gray-200">
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#dd8157] text-white text-xs font-bold rounded-full">
                          {course.badge}
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        Course Image
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#dd8157] transition">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-6 leading-relaxed">{course.description}</p>
                      <a
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-[#dd8157] font-semibold hover:text-[#c86d47] transition"
                      >
                        Learn More →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Trucksafe Academy */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Why Trucksafe Academy?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: BookOpen,
                    title: "One-Stop DOT Training",
                    description: "Your one-stop shop for intuitive, no-nonsense DOT regulatory training courses."
                  },
                  {
                    icon: Smartphone,
                    title: "Mobile-Friendly",
                    description: "Courses designed for both desktop and mobile users. Perfect for drivers on the road!"
                  },
                  {
                    icon: TrendingDown,
                    title: "Improve Safety Metrics",
                    description: "Avoid costly fines, increased insurance premiums, and out-of-service orders."
                  },
                  {
                    icon: Award,
                    title: "Insurance Savings",
                    description: "Many insurers offer premium discounts to carriers whose teams complete comprehensive safety training."
                  }
                ].map((benefit, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-16 h-16 bg-[#dd8157]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="w-8 h-8 text-[#dd8157]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Animated Stats */}
          <section className="py-20 px-6 bg-[#363b57]">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-black text-white mb-12 text-center">The Cost of Non-Compliance</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-5xl font-black text-[#dd8157] mb-2">
                    ${avgFine.toLocaleString()}
                  </div>
                  <div className="text-white/80">Average Fine Per Violation</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-black text-[#dd8157] mb-2">
                    {violations.toLocaleString()}+
                  </div>
                  <div className="text-white/80">Violations Issued Annually</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-black text-[#dd8157] mb-2">
                    {outOfService.toFixed(1)}%
                  </div>
                  <div className="text-white/80">Out-of-Service Rate</div>
                </div>
              </div>
              <p className="text-center text-white/90 max-w-3xl mx-auto text-lg">
                Regulatory violations can cost thousands in fines, increased insurance premiums, and lost revenue from out-of-service orders. Invest in training for a fraction of these costs and protect your fleet from enforcement risks.
              </p>
            </div>
          </section>

          {/* Platform Features Slider */}
          <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      Screenshot {featureSlide + 1}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">
                      {platformFeatures[featureSlide].title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {platformFeatures[featureSlide].description}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={prevFeature}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg transition"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                
                <button 
                  onClick={nextFeature}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg transition"
                >
                  <ChevronRight className="w-6 h-6 text-gray-900" />
                </button>

                <div className="flex justify-center gap-2 mt-8">
                  {platformFeatures.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFeatureSlide(idx)}
                      className={`w-2 h-2 rounded-full transition ${
                        idx === featureSlide ? 'bg-[#dd8157] w-8' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Free Preview Form */}
          <section className="py-20 px-6">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
                <h2 className="text-4xl font-black text-gray-900 mb-4">Free Preview!</h2>
                <p className="text-xl text-gray-700 mb-8">
                  Want to take our courses for a test drive? Enter your email to view a sample lesson!
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dd8157]"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition"
                  >
                    Get Free Preview
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {[
                  {
                    q: "How long do I have access to the courses?",
                    a: "Once you enroll, you have lifetime access to the course materials, including any future updates."
                  },
                  {
                    q: "Do I get a certificate upon completion?",
                    a: "Yes! Upon successful completion of a course, you'll receive a custom certificate that you can download and print."
                  },
                  {
                    q: "Can I take courses on my mobile device?",
                    a: "Absolutely! All courses are mobile-friendly and work great on tablets and smartphones."
                  },
                  {
                    q: "Are the courses self-paced?",
                    a: "Yes, all courses are self-paced. You can complete them on your own schedule."
                  }
                ].map((faq, idx) => (
                  <details key={idx} className="group bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition">
                      <h3 className="font-bold text-gray-900 pr-8">{faq.q}</h3>
                      <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* YouTube Videos */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-gray-900 mb-4">Check Out Our Free Content!</h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  Looking for a short video on a particular regulatory topic? Check out our full library of DOT compliance videos.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
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
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#dd8157] transition text-left group flex flex-col"
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
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#dd8157] transition">{video.title}</h3>
                      <p className="text-sm text-gray-600">{video.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <a
                  href="https://www.youtube.com/playlist?list=PLKFRi6fwIR2GO3yje9N3gFGjQCI84a93P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#dd8157] font-semibold hover:text-[#c86d47] transition text-lg"
                >
                  View Full Playlist on YouTube →
                </a>
              </div>
            </div>
          </section>

          {/* Custom Training */}
          <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden">
                  <Image
                    src="/custom-training.jpg"
                    alt="Custom Training"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-gray-900 mb-6">Custom Training Solutions</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Need something tailored to your fleet's specific needs? We offer custom training development and in-person training sessions designed around your unique requirements.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-8">
                    Our team of industry experts can create customized curriculum, deliver on-site training at your facility, and provide ongoing support to ensure your team stays compliant and confident.
                  </p>
                  <a
                    href="/contact"
                    className="inline-block bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition"
                  >
                    Contact Us for Details
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        // Driver Training Tab - Coming Soon
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd8157]/10 border border-[#dd8157]/30 rounded-full mb-8">
              <span className="text-sm font-bold text-[#dd8157] uppercase tracking-wider">Coming Soon</span>
            </div>
            
            <h2 className="text-5xl font-black text-gray-900 mb-6">Driver Training</h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              We're building something special! Our comprehensive driver training platform is coming soon, featuring interactive courses, real-world scenarios, and cutting-edge training technology.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {[
                  "Interactive video-based training modules",
                  "Real-world driving scenarios",
                  "Compliance certification tracking",
                  "Mobile-first learning experience",
                  "Progress tracking and reporting",
                  "Gamified learning experience"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#dd8157] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-lg mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Notified When We Launch</h3>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dd8157]"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition"
                >
                  Notify Me
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
