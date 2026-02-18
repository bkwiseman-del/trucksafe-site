'use client'

import Image from 'next/image'
import { Scale, FileText, TrendingUp, Shield, CheckCircle2, Users, ArrowRight } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function ExpertWitnessPage() {
  const services = [
    {
      icon: <Scale className="w-7 h-7" />,
      title: "Expert Witness Testimony",
      description: "Clear, authoritative expert testimony in state and federal courts nationwide. We explain complex regulatory issues in a way judges and juries understand."
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: "Case Strategy & Consulting",
      description: "From early case assessment through trial, we help legal teams identify regulatory exposure, evaluate responsibility, and analyze compliance gaps."
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Regulatory & Industry Standards Opinions",
      description: "Authoritative opinions on FMCSR applicability, driver fitness, carrier compliance, fatigue management, and standard-of-care determinations."
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Broker & Shipper Liability Analysis",
      description: "Comprehensive analysis of freight broker and shipper liability, including risk-based safety vetting and negligent selection theories."
    }
  ]

  const expertiseAreas = [
    "Federal Motor Carrier Safety Regulations (FMCSRs)",
    "Industry-standard safe-driving practices",
    "Driver qualification, training, and oversight requirements",
    "Hours-of-service rules, fatigue management, and ELD data",
    "Vehicle telematics, event recorders & cameras",
    "Vehicle inspection, repair, and maintenance mandates",
    "Load securement rules and cargo-related causes",
    "Rules of the road and defensive driving principles",
    "Broker and shipper liability frameworks",
    "Motor carrier safety management controls"
  ]

  const team = [
    {
      name: "Brandon Wiseman, Esq.",
      title: "President",
      image: "/team-brandon.jpg",
      linkedin: "https://www.linkedin.com/in/bkwiseman/",
      bio: "Brandon is a transportation attorney, safety consultant, and the founder of Trucksafe Consulting. Over the years, he has had the privilege of representing & counseling many of the nation's leading motor carriers and transportation providers on matters relating to USDOT safety and compliance.",
      specialties: [
        "FMCSR & regulatory compliance",
        "Hours of service & driver qualification",
        "Safety management controls & fleet policies",
        "CSA scores & compliance metrics"
      ],
      availability: "Case consultation, non-testifying expert opinion, case analysis & strategy",
      publications: [
        {
          title: "How fleets can best prioritize compliance issues",
          url: "https://www.trucksafe.com/post/how-best-to-prioritize-compliance-issues-for-fleet-safety-teams"
        },
        {
          title: "Vetting drivers can minimize lawsuit exposure",
          url: "https://www.ttnews.com/articles/minimize-drivers-lawsuit-exposure"
        }
      ]
    },
    {
      name: "Jerad Childress, Esq.",
      title: "Vice President",
      image: "/team-jerad.jpg",
      linkedin: "https://www.linkedin.com/in/jerad-childress-b6403967/",
      bio: "Jerad frequently serves as a named expert in state and federal highway accident litigation with regards to FMCSR compliance. As a transportation consultant through Trucksafe and the Managing Partner of Childress Law, Jerad has assisted all shapes and sizes of motor carriers in the area of safety and compliance.",
      specialties: [
        "FMCSR compliance & DOT audits",
        "Risk mitigation strategies",
        "Fleet safety technology & ELD compliance",
        "Driver licensing and credentialing"
      ],
      availability: "Case consultation, testifying expert opinion, case analysis and strategy"
    },
    {
      name: "Rob Carpenter, CDS, CDM/E, CDT",
      title: "VP of Compliance",
      image: "/team-rob.jpg",
      linkedin: "https://www.linkedin.com/in/rob-carpenter-cds-cdm-e-74500977/",
      bio: "Rob Carpenter is a transportation safety executive, crash investigation specialist, and nationally recognized subject matter expert with decades of real-world CDL-A driving experience, fleet ownership, brokerage, international forwarding, and enterprise-level safety, risk and claims leadership. Rob combines advanced crash reconstruction training from Northwestern University, IPTM, and NTSB coursework with frontline operational expertise that spans driver qualification, hours of service, hazmat, maintenance, claims, and compliance strategy.",
      specialties: [
        "Forensic crash investigation & evidence interpretation",
        "Driver qualification, training & supervision",
        "Telematics, AI dashcams & driver behavior analytics",
        "Fleet operations & risk mitigation"
      ],
      availability: "Case consultation, testifying expert opinion, case analysis and strategy",
      publications: [
        {
          title: "Evolving Beyond Reactive Maintenance Models",
          url: "https://www.freightwaves.com/news/evolving-beyond-reactive-maintenance-models-to-predictive-success"
        },
        {
          title: "DOT Finally Moves on Fentanyl Testing",
          url: "https://www.freightwaves.com/news/dot-finally-moves-on-fentanyl-testing-for-commercial-drivers"
        }
      ]
    },
    {
      name: "Tyler Biddle, Esq.",
      title: "Consultant",
      image: "/team-tyler.jpg",
      linkedin: "https://www.linkedin.com/in/tyler-biddle-3a20b8224/",
      bio: "Tyler is a transportation attorney and consultant at Trucksafe Consulting. Tyler has represented small and large privately and publicly held transportation and logistics companies, warehouses, manufacturers, retailers, and distributors in an array for commercial, transactional, corporate, and regulatory issues.",
      specialties: [
        "Broker and shipper liability",
        "Cargo loss/damage/theft claims",
        "Transportation commercial agreements",
        "Independent contractor issues"
      ],
      availability: "Case consultation, testifying expert opinion, case analysis and strategy"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/semitruckcrossingamericanwestwilderness20260108235953utc.jpeg"
            alt="Expert Witness"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd8157]/20 border border-[#dd8157]/30 rounded-full mb-6">
              <Scale className="w-4 h-4 text-[#dd8157]" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">Litigation Support</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Trucking Litigation Experts & Case Consultants
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Trusted expertise for high-stakes highway accident and trucking litigation. When cases turn on complex questions of FMCSA compliance, driver behavior, or motor carrier oversight, you need experts who live and breathe trucking regulations.
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
                href="#team"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg font-bold transition cursor-pointer"
              >
                Meet Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Litigators Choose Us */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Why Litigators Turn to Trucksafe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trucking cases involving commercial motor carriers are uniquely technical. Litigators rely on Trucksafe to provide clarity, credibility, and defensible opinions grounded in real-world experience and regulatory expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {expertiseAreas.map((area, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-[#dd8157] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Our Litigation Support Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From expert testimony to case strategy, we deliver clear, authoritative analysis that holds up in court.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-gray-200 hover:border-[#dd8157] hover:shadow-lg transition">
                <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-6 text-[#363b57]">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Areas */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-[#363b57]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-white mb-6">
                Regulatory & Industry Standards Opinions
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                We issue authoritative opinions on complex regulatory and operational matters that are critical to establishing standards of care and liability.
              </p>
              <div className="space-y-4">
                {[
                  "FMCSR applicability and interpretation",
                  "Driver fitness and qualification matters",
                  "Carrier compliance program sufficiency",
                  "Fatigue and HOS management",
                  "Reasonable safety expectations",
                  "Training and supervision adequacy",
                  "Standard-of-care determinations for carriers, shippers, and brokers"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#dd8157] flex-shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Broker & Shipper Liability
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                As claims involving freight brokers and shippers increase, attorneys rely on Trucksafe to assess:
              </p>
              <ul className="space-y-3">
                {[
                  "Applicability of FMCSA regulations",
                  "Risk-based safety vetting processes",
                  "Negligent selection theories",
                  "Industry standards for contractor oversight",
                  "Freight handling and cargo security standards"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/90">
                    <span className="text-[#dd8157] font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nationally recognized attorneys and compliance professionals with decades of experience in motor carrier safety and DOT regulatory requirements.
            </p>
          </div>

          <div className="space-y-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#dd8157] hover:shadow-lg transition">
                <div className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <div className="text-[#dd8157] font-semibold mb-3">
                        {member.title}
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#dd8157] transition"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          LinkedIn
                        </a>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{member.availability}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Specialties as compact list */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Areas of Specialty
                    </h4>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {member.specialties.join(' • ')}
                    </div>
                  </div>

                  {/* Publications */}
                  {member.publications && member.publications.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                        Sample Publications
                      </h4>
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {member.publications.map((pub, pidx) => (
                          <a
                            key={pidx}
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#dd8157] hover:text-[#c86d47] transition inline-flex items-center gap-1"
                          >
                            {pub.title}
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            Ready to Strengthen Your Case?
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            If you're handling a case involving a commercial motor vehicle, regulatory compliance, or freight-industry standards, Trucksafe can help you understand the issues, evaluate exposure, and develop a winning strategy.
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
