'use client'

import Image from 'next/image'
import { Shield, FileText, BarChart3, Clock, Users, CheckCircle2, ArrowRight, TrendingUp } from 'lucide-react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'

export default function DOTConsultingPage() {
  const services = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Policy Development & Review",
      description: "Expert development and review of driver safety policies, drug/alcohol testing programs, and compliance procedures tailored to your operations.",
      features: [
        "Custom policy creation aligned with FMCSRs",
        "Comprehensive policy review and gap analysis",
        "Driver handbook development",
        "Safety management system documentation",
        "Ongoing policy updates for regulatory changes"
      ]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "CSA Score Improvement",
      description: "Strategic analysis and action plans to improve your CSA scores and reduce enforcement targeting.",
      features: [
        "Comprehensive CSA score analysis",
        "BASIC-specific improvement strategies",
        "Driver behavior monitoring programs",
        "Violation trend analysis and prevention",
        "SMS score tracking and reporting"
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety Program Audits",
      description: "In-depth evaluation of your safety programs to identify compliance gaps and operational improvements.",
      features: [
        "Mock DOT compliance reviews",
        "Driver qualification file audits",
        "Maintenance record reviews",
        "Drug & alcohol testing program audits",
        "Hours of service compliance assessment"
      ]
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Hourly Consulting",
      description: "On-demand expert guidance for specific compliance questions, regulatory interpretation, and strategic planning.",
      features: [
        "One-on-one consulting sessions",
        "Regulatory interpretation and guidance",
        "Enforcement response strategy",
        "DataQ challenge assistance",
        "Operational compliance planning"
      ]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Ongoing Regulatory Updates",
      description: "Stay ahead of regulatory changes with timely updates, analysis, and implementation guidance.",
      features: [
        "Monthly regulatory briefings",
        "Federal Register monitoring",
        "Industry trend analysis",
        "Compliance deadline tracking",
        "Impact assessment for your operations"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Safety Rating Upgrades",
      description: "Comprehensive support to upgrade your safety rating following a downgrade or conditional rating.",
      features: [
        "Rating upgrade strategy development",
        "Corrective action plan creation",
        "Documentation preparation",
        "FMCSA communication support",
        "Follow-up compliance monitoring"
      ]
    }
  ]

  const benefits = [
    "20+ years of transportation law expertise",
    "Former representation of nation's largest carriers",
    "Practical, operations-focused solutions",
    "Responsive support when you need it",
    "Industry-leading regulatory knowledge",
    "Proven track record of results"
  ]

  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "We start by understanding your operations, current compliance posture, and specific challenges."
    },
    {
      number: "02",
      title: "Assessment",
      description: "Comprehensive review of your safety programs, policies, and performance metrics."
    },
    {
      number: "03",
      title: "Strategy",
      description: "Development of customized action plans tailored to your operational needs and resources."
    },
    {
      number: "04",
      title: "Implementation",
      description: "Hands-on support to execute improvements and establish sustainable compliance practices."
    },
    {
      number: "05",
      title: "Monitoring",
      description: "Ongoing tracking and refinement to ensure continued compliance and operational excellence."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/consulting-hero.jpg"
            alt="DOT Consulting Services"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd8157]/20 border border-[#dd8157]/30 rounded-full mb-6">
              <Shield className="w-4 h-4 text-[#dd8157]" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">Consulting Services</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              DOT Compliance Consulting Services
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Comprehensive DOT compliance support including policy development, CSA score improvement, safety program audits, and ongoing regulatory guidance tailored to your operations.
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
                href="/contact"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg font-bold transition"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Expert Guidance from Transportation Attorneys
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our team of transportation attorneys and compliance professionals brings decades of experience counseling the nation's largest and most sophisticated motor carriers on USDOT safety regulations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Whether you're just setting up shop or looking to improve your existing safety program, we provide practical, operations-focused solutions that work in the real world.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition"
              >
                Schedule a Consultation
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Carriers Choose Trucksafe
              </h3>
              <div className="space-y-4">
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
              Comprehensive Consulting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From policy development to CSA score improvement, we offer the full range of DOT compliance consulting services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#dd8157] hover:shadow-lg transition">
                <div className="p-8">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-6 text-[#363b57]">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-[#dd8157] flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-[#363b57]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-6">
              Our Consulting Process
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A proven methodology for identifying compliance gaps and implementing sustainable solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition">
                  <div className="text-4xl font-black text-[#dd8157] mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {idx < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-white/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Areas of Regulatory Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep knowledge across all aspects of FMCSA regulations and motor carrier safety management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Driver Qualification",
              "Hours of Service",
              "Drug & Alcohol Testing",
              "Vehicle Maintenance",
              "Cargo Securement",
              "Hazmat Transportation",
              "New Entrant Registration",
              "Safety Ratings",
              "CSA & SMS",
              "DOT Audits",
              "Clearinghouse Compliance",
              "ELD Requirements",
              "Medical Examiner Certification",
              "DataQ Challenges",
              "Broker Operations",
              "Shipper Compliance"
            ].map((area, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-[#dd8157] hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#dd8157] flex-shrink-0" />
                  <span className="text-gray-900 font-semibold">{area}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            Ready to Improve Your Compliance?
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Whether you need help with a specific compliance issue or ongoing regulatory support, our team is here to help. Contact us today to discuss your needs.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#dd8157] hover:bg-[#c86d47] text-white px-10 py-5 rounded-lg font-bold text-lg transition"
          >
            Contact Us Today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
