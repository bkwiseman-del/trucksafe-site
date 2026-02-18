'use client'

import Image from 'next/image'
import { Users, Target, Award } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function AboutPage() {
  const team = [
    {
      name: "Brandon Wiseman",
      title: "President",
      bio: "Brandon is a transportation attorney, safety consultant, and the founder of Trucksafe Consulting. Over the years, he has had the privilege of representing some of the nation's leading motor carriers and transportation providers on matters relating to USDOT safety and compliance.",
      image: "/team-brandon.jpg",
      linkedin: "https://www.linkedin.com/in/bkwiseman/"
    },
    {
      name: "Jerad Childress",
      title: "Vice President",
      bio: "Jerad is a transportation attorney and Managing Partner of Childress Law, PLLC. Jerad is also a safety consultant with Trucksafe Consulting and regularly assists motor carriers with ensuring their safety programs are compliant with the multitude of requirements that apply to commercial transportation.",
      image: "/team-jerad.jpg",
      linkedin: "https://www.linkedin.com/in/jerad-childress-b6403967/"
    },
    {
      name: "Rob Carpenter",
      title: "VP & Director of Managed Services",
      bio: "Rob is an experienced regulatory compliance, DOT, safety, security, OSHA, Fire and Life Compliance Executive with decades of experience in safety management within the motor carrier industry. Rob has been a commercial driver, a safety director at a large passenger carrier, and has even owned his own trucking & brokerage companies.",
      image: "/team-rob.jpg",
      linkedin: "https://www.linkedin.com/in/rob-carpenter-cds-cdm-e-74500977/"
    },
    {
      name: "Brian Runnels",
      title: "VP of Training & Sales",
      bio: "Brian is a transportation professional with almost 30 years in the trucking industry. For 19 years Brian drove over 2 million safe miles and spent eight years as a driver trainer. Over the next 5 years he dedicated his career to trucking safety and driver training, including creating and directing an in-house CDL training school for an Indianapolis based trucking company.",
      image: "/team-brian.jpg",
      linkedin: "https://www.linkedin.com/in/brian-runnels-cds-trs-274a2285/"
    },
    {
      name: "Tyler Biddle",
      title: "Consultant",
      bio: "Tyler is a transportation attorney and safety consultant who understands the legal, commercial, and regulatory challenges facing clients involved in the transportation industry. Tyler has represented small and large privately and publicly held transportation and logistics companies, warehouses, manufacturers, retailers, and distributors.",
      image: "/team-tyler.jpg",
      linkedin: "https://www.linkedin.com/in/tyler-biddle-3a20b8224/"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/about-hero.jpg"
            alt="About Trucksafe"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd8157]/20 border border-[#dd8157]/30 rounded-full mb-6">
              <Users className="w-4 h-4 text-[#dd8157]" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">About Us</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Who We Are
            </h1>
            
            <p className="text-xl text-white/90">
              Trucksafe Consulting is a full-service DOT regulatory compliance consulting and training service helping carriers build safer, more compliant operations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Video */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We bridge the gap between traditional safety consulting and comprehensive DOT resources. Our mission is to provide personalized DOT safety consulting services while offering industry-leading educational content and fully-customizable compliance documents.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                We believe DOT compliance shouldn't be a mystery. Through hands-on consulting, innovative training, and practical resources, we help carriers of all sizes understand their obligations and build programs that actually work.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our goal is simple: demystify DOT compliance and make it attainable for every carrier, which in turn makes our highways safer for everyone.
              </p>
            </div>

            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/nsxAnM7__Hk"
                title="About Trucksafe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-8 text-center">Our Story</h2>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              For over a decade, our founders worked as attorneys in the DOT Safety and Compliance practice group at the nation's largest transportation law firm. They represented transportation providers of all types and sizes—from one-truck operations to publicly-traded motor carriers and motor coach operators.
            </p>
            
            <p>
              Through this work, they advised clients on regulatory obligations and DOT safety best practices, guided them through compliance reviews and safety audits, and represented them in administrative and court appeals on some of the most complex legal issues facing the transportation industry. They helped carriers avoid conditional and unsatisfactory safety ratings, prevent out-of-service orders, and save thousands in DOT civil penalties.
            </p>
            
            <p>
              The consulting side of law practice was always the most fulfilling—helping carriers navigate federal and state safety regulations and communicating them in ways that make intuitive sense. This passion drove the creation of Trucksafe Consulting and Trucksafe Academy.
            </p>
            
            <p>
              Over the years, we observed that safety consultants generally come in two varieties: individual boots-on-the-ground consultants and large, faceless consulting corporations. Both have strengths and weaknesses. Individual consultants excel at personalized service tailored to each customer's specific circumstances. Large firms provide robust resources like compliance documents, but often lack the personal touch.
            </p>
            
            <p className="text-lg font-semibold text-gray-900">
              Trucksafe was founded to bridge that gap—delivering personalized DOT safety consulting combined with comprehensive training resources and customizable compliance documents, all designed to make DOT compliance accessible for carriers of every size and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">What Drives Us</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#dd8157]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-[#dd8157]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expertise</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team brings decades of combined experience from the nation's leading transportation law firms, working with the most sophisticated carriers in the industry.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#dd8157]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[#dd8157]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Accessibility</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe every carrier deserves access to top-tier compliance support, regardless of size or budget. Our scalable solutions meet you where you are.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#dd8157]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-[#dd8157]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Results</h3>
              <p className="text-gray-600 leading-relaxed">
                We're not just about checking boxes. We help carriers build sustainable safety programs that reduce violations, improve ratings, and keep trucks moving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Our Team</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#dd8157] transition group">
                <div className="relative aspect-square bg-gray-200">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <div className="text-[#dd8157] font-semibold mb-4">{member.title}</div>
                  <p className="text-gray-600 leading-relaxed text-sm mb-4">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#dd8157] font-semibold hover:text-[#c86d47] transition text-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">Let's Work Together</h2>
          <p className="text-xl text-gray-700 mb-10">
            Ready to build a safer, more compliant operation? We'd love to discuss how we can help your fleet succeed.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#dd8157] hover:bg-[#c86d47] text-white px-12 py-5 rounded-lg font-bold text-lg transition"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
