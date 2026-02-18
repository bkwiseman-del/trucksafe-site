import Image from 'next/image'
import { CheckCircle2, FileText, Scale, Shield, ArrowRight, ChevronDown } from 'lucide-react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'

export default function PolicyDevelopmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/policy-hero.jpg"
            alt="Policy development"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 bg-[#dd8157]/20 border border-[#dd8157]/30 text-[#dd8157] rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Compliance Services
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Policy & Document Development
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Build a comprehensive, legally-sound compliance program with custom policies tailored to your fleet's specific operations and risk profile.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#get-started" className="bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition inline-flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#learn-more" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-bold transition">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section id="learn-more" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">What You Get</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive policy documentation that meets federal requirements and protects your company in litigation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Complete Policy Manual",
                description: "Customized policies covering all FMCSA regulations relevant to your operations"
              },
              {
                icon: Scale,
                title: "Litigation-Ready Documentation",
                description: "Policies drafted by transportation attorneys to withstand legal scrutiny"
              },
              {
                icon: Shield,
                title: "Driver Handbooks",
                description: "Clear, accessible documents your drivers can actually understand and follow"
              },
              {
                icon: CheckCircle2,
                title: "Forms & Templates",
                description: "Ready-to-use forms for daily operations, inspections, and incident reporting"
              },
              {
                icon: FileText,
                title: "Audit-Ready Organization",
                description: "Structured documentation that makes DOT audits straightforward"
              },
              {
                icon: Scale,
                title: "Annual Updates",
                description: "Ongoing revisions as regulations change and your operations evolve"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#dd8157] hover:shadow-lg transition">
                <div className="w-12 h-12 bg-[#dd8157]/10 rounded-lg flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-[#dd8157]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Who This Service Is For</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#dd8157] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">New Entrants</h3>
                    <p className="text-gray-600">Starting your DOT compliance program from scratch and need comprehensive documentation</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#dd8157] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Growing Fleets</h3>
                    <p className="text-gray-600">Outgrown informal policies and need professional, scalable documentation</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#dd8157] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Carriers Facing Audits</h3>
                    <p className="text-gray-600">Need to upgrade documentation before or during a FMCSA audit or investigation</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#dd8157] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Post-Accident Review</h3>
                    <p className="text-gray-600">Strengthening policies after incidents to demonstrate commitment to safety</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="/closeupsideviewlookingforwardofacommercial20260109092929utc.jpg"
                alt="Commercial truck"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to building policies that actually work for your operation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We analyze your current operations, equipment types, and specific compliance challenges"
              },
              {
                step: "02",
                title: "Drafting",
                description: "Our attorneys create customized policies based on your operational needs and risk profile"
              },
              {
                step: "03",
                title: "Review",
                description: "You review drafts and we incorporate feedback to ensure policies fit your company culture"
              },
              {
                step: "04",
                title: "Implementation",
                description: "We help you roll out policies to your team with training materials and guidance"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-black text-[#dd8157]/10 mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-[#dd8157]/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trucksafe */}
      <section className="py-20 px-6 bg-[#363b57] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Why Trucksafe</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our policies are built by transportation attorneys who understand both the regulations and the realities of running a trucking company
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-[#dd8157] mb-4">20+</div>
              <div className="text-xl font-bold mb-2">Years Experience</div>
              <p className="text-white/70">Working with motor carriers of all sizes</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#dd8157] mb-4">500+</div>
              <div className="text-xl font-bold mb-2">Fleets Served</div>
              <p className="text-white/70">From single-truck operations to major carriers</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#dd8157] mb-4">100%</div>
              <div className="text-xl font-bold mb-2">Attorney-Drafted</div>
              <p className="text-white/70">Every policy reviewed by transportation lawyers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing/CTA */}
      <section id="get-started" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            Ready to Build Your Compliance Program?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Contact us for a consultation and custom quote based on your fleet size and needs
          </p>
          <div className="bg-gray-50 rounded-2xl p-12 border border-gray-200">
            <div className="mb-8">
              <div className="text-5xl font-black text-gray-900 mb-2">Custom Pricing</div>
              <p className="text-gray-600">Based on fleet size and documentation needs</p>
            </div>
            <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#dd8157] flex-shrink-0" />
                <span className="text-gray-700">Complete policy manual</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#dd8157] flex-shrink-0" />
                <span className="text-gray-700">Driver handbooks & forms</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#dd8157] flex-shrink-0" />
                <span className="text-gray-700">Annual updates included</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#dd8157] flex-shrink-0" />
                <span className="text-gray-700">Implementation support</span>
              </li>
            </ul>
            <a href="/contact" className="inline-block bg-[#dd8157] hover:bg-[#c86d47] text-white px-12 py-4 rounded-lg font-bold text-lg transition">
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "How long does it take to develop a complete policy manual?",
                a: "Typically 4-6 weeks from initial consultation to final delivery, depending on the complexity of your operations and how quickly you can provide necessary information during discovery."
              },
              {
                q: "Can you update my existing policies instead of starting from scratch?",
                a: "Absolutely. We can review your current documentation and provide updates, revisions, or gap analysis to bring everything up to current standards."
              },
              {
                q: "Do you provide policies in Spanish?",
                a: "Yes, we can provide translated versions of driver-facing documents and handbooks to ensure all your drivers can access and understand safety policies."
              },
              {
                q: "What if regulations change after you create my policies?",
                a: "Our service includes annual updates to keep your policies current with regulatory changes. We'll notify you of significant updates and provide revised documentation."
              }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition">
                  <h3 className="text-lg font-bold text-gray-900 pr-8">{faq.q}</h3>
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

      {/* Related Services */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-12">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "DOT Audit Preparation",
                description: "Get ready for FMCSA audits with comprehensive document review and mock audits",
                href: "/services/audit-preparation"
              },
              {
                title: "Safety Manager Training",
                description: "Industry-leading courses to develop your safety team's expertise",
                href: "/services/training"
              },
              {
                title: "CSA Score Improvement",
                description: "Strategic consulting to reduce violations and improve your safety rating",
                href: "/services/csa-improvement"
              }
            ].map((service, idx) => (
              <a key={idx} href={service.href} className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#dd8157] hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#dd8157] transition">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <span className="text-[#dd8157] font-semibold inline-flex items-center gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
