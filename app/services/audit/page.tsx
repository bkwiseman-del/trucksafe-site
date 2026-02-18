'use client'

import Image from 'next/image'
import { Shield, FileCheck, Users, ClipboardCheck, AlertTriangle, CheckCircle2, ArrowRight, TrendingUp, Search, FileText } from 'lucide-react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'

export default function AuditPrepPage() {
  const services = [
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "Mock DOT Audits",
      description: "Proactive compliance reviews that mirror FMCSA methodology to identify gaps before real audits.",
      features: [
        "Comprehensive compliance reviews",
        "Focused audits on problem areas",
        "On-site or off-site options",
        "Detailed violation reports",
        "Proposed safety rating assessment",
        "Actionable improvement recommendations"
      ]
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Real Audit Support",
      description: "Expert guidance during actual DOT audits to help you navigate the process and achieve the best outcome.",
      features: [
        "Pre-audit preparation and strategy",
        "Document organization assistance",
        "On-site representation during audits",
        "Real-time violation mitigation",
        "Communication with investigators",
        "Post-audit corrective action plans"
      ]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Safety Rating Upgrades",
      description: "Comprehensive support to upgrade your safety rating following a downgrade or conditional rating.",
      features: [
        "Rating upgrade strategy development",
        "Corrective action plan creation",
        "Documentation preparation",
        "FMCSA communication support",
        "Follow-up compliance monitoring",
        "Re-audit preparation"
      ]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Audit Readiness Programs",
      description: "Ongoing compliance monitoring to ensure your operation is always audit-ready.",
      features: [
        "Regular file compliance reviews",
        "SMS account monitoring",
        "Quarterly readiness assessments",
        "Document management systems",
        "Staff training on audit procedures",
        "Continuous improvement planning"
      ]
    }
  ]

  const mockAuditTypes = [
    {
      title: "Comprehensive Compliance Review",
      description: "A full review of your compliance program mirroring FMCSA's complete audit process.",
      coverage: [
        "General compliance & operations",
        "Driver qualification files",
        "Hours-of-service compliance",
        "Vehicle maintenance records",
        "Drug & alcohol testing program",
        "Hazardous materials (if applicable)",
        "Accident register and reporting"
      ],
      outcome: "Results in a proposed safety rating (Satisfactory, Conditional, or Unsatisfactory) based on violations discovered."
    },
    {
      title: "Focused Audit",
      description: "Targeted review of specific compliance areas where you need the most help.",
      coverage: [
        "Driver qualification deep dive",
        "Hours-of-service analysis",
        "Maintenance program review",
        "Drug/alcohol testing audit",
        "Clearinghouse compliance check",
        "ELD regulation compliance"
      ],
      outcome: "Provides detailed findings and recommendations for targeted improvement in problem areas."
    }
  ]

  const auditProcess = [
    {
      number: "01",
      title: "Pre-Audit Planning",
      description: "5-7 days before: We request your active driver/vehicle lists and SMS access. We provide a pre-audit questionnaire.",
      timeframe: "5-7 days prior"
    },
    {
      number: "02",
      title: "File Selection",
      description: "2-3 days before: We notify you of selected files for review. Sampling targets drivers/vehicles with recent violations or accidents.",
      timeframe: "2-3 days prior"
    },
    {
      number: "03",
      title: "Audit Execution",
      description: "We spend 2-5 days reviewing records to identify violations. Your point of contact should be available for questions.",
      timeframe: "2-5 days"
    },
    {
      number: "04",
      title: "Report & Recommendations",
      description: "7-14 days after: Detailed written report with all violations, proposed rating (if applicable), and improvement recommendations.",
      timeframe: "7-14 days after"
    }
  ]

  const whyChooseUs = [
    "Performed by transportation attorneys with extensive DOT audit experience",
    "Same methodology as FMCSA for accurate assessment",
    "Detailed reports with actionable recommendations",
    "Available for on-site or off-site audits",
    "Minimized disruption to your operations",
    "Post-audit support and guidance"
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/audit-hero.jpg"
            alt="DOT Audit Prep & Guidance"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd8157]/20 border border-[#dd8157]/30 rounded-full mb-6">
              <Shield className="w-4 h-4 text-[#dd8157]" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">Audit Services</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              DOT Audit Preparation & Guidance
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Expert mock audits to identify compliance gaps before real DOT reviews, plus hands-on support during actual audits to achieve the best possible outcome.
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#mock-audits"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('mock-audits')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition inline-flex items-center gap-2 cursor-pointer"
              >
                Learn About Mock Audits
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="/contact"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg font-bold transition"
              >
                Request Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Audit Preparation Matters */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Why DOT Audit Preparation Matters
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The Federal Motor Carrier Safety Administration (FMCSA) and its state partners routinely audit motor carriers to assess compliance with federal and state safety regulations. The FMCSA prioritizes carriers for audit by taking into account roadside safety violations, accidents, driver complaints, and other factors.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Violations discovered during these audits can result in civil penalties, out-of-service orders, and safety rating downgrades. Being unprepared can cost your business tens of thousands of dollars and put your operating authority at risk.
              </p>
              <div className="bg-[#dd8157]/10 border-l-4 border-[#dd8157] p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-gray-900">
                  Our mock audits use the exact same methodology as FMCSA so you know precisely how you would fare in a real audit—before it happens.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose Trucksafe
              </h3>
              <div className="space-y-4">
                {whyChooseUs.map((benefit, idx) => (
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

      {/* Services Overview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Our Audit Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From proactive mock audits to real-time audit support, we help you navigate the DOT compliance review process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
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

      {/* Mock Audit Types */}
      <section id="mock-audits" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Types of Mock Audits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the audit type that best fits your needs—comprehensive or focused.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {mockAuditTypes.map((type, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-[#363b57] to-[#2a2e42] p-8">
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {type.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {type.description}
                  </p>
                </div>
                <div className="p-8">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                    What We Review
                  </h4>
                  <ul className="space-y-3 mb-6">
                    {type.coverage.map((item, cidx) => (
                      <li key={cidx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#dd8157] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-[#dd8157]/10 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900">
                      Outcome: <span className="font-normal">{type.outcome}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-6">
              All audits can be performed on-site or off-site depending on your preference and operational needs.
            </p>
          </div>
        </div>
      </section>

      {/* Mock Audit Process */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-[#363b57]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-6">
              Our Mock Audit Process
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A streamlined process designed to minimize disruption while providing maximum value.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {auditProcess.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition h-full">
                  <div className="text-4xl font-black text-[#dd8157] mb-4">
                    {step.number}
                  </div>
                  <div className="inline-block px-3 py-1 bg-[#dd8157]/20 rounded-full mb-4">
                    <span className="text-xs font-semibold text-[#dd8157] uppercase tracking-wider">
                      {step.timeframe}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {idx < auditProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-white/30" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 inline-block">
              <p className="text-white/90 text-lg">
                <span className="font-bold text-white">Typical Timeline:</span> Mock audits typically take 2-5 full days to complete, with reports delivered 7-14 days after the audit concludes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost & Pricing */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-12">
            <h2 className="text-4xl font-black text-gray-900 mb-6 text-center">
              Mock Audit Pricing
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
              Several factors influence the cost of a mock audit:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#dd8157]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-8 h-8 text-[#dd8157]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Audit Type</h3>
                <p className="text-sm text-gray-600">Comprehensive vs. focused review</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#dd8157]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#dd8157]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Fleet Size</h3>
                <p className="text-sm text-gray-600">Number of drivers & vehicles</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#dd8157]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-[#dd8157]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Location</h3>
                <p className="text-sm text-gray-600">On-site or off-site audit</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-gray-700 leading-relaxed">
                Mock audits typically require a team of two Trucksafe consultants for 2-5 full days, plus additional time to prepare the detailed report. Audits are billed at our standard hourly rates, plus travel expenses for on-site audits.
              </p>
            </div>

            <div className="text-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition"
              >
                Request a Custom Quote
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            Don't Wait for a Real Audit
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Find and fix compliance gaps before FMCSA does. Schedule your mock audit today and gain peace of mind knowing exactly where you stand.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#dd8157] hover:bg-[#c86d47] text-white px-10 py-5 rounded-lg font-bold text-lg transition"
          >
            Schedule Your Mock Audit
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
