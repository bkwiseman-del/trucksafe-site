'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Calendar, MapPin, Users, BookOpen, Award, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Quote, X, Utensils, Scale, Clipboard, Wrench, FileText, BarChart3, ShieldCheck, FileCheck, Clock, Truck } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function BootcampPage() {
  const [venueSlide, setVenueSlide] = useState(0)
  const [gallerySlide, setGallerySlide] = useState(null)

  const venueImages = [
    { src: '/venue-1.jpg', alt: 'Crowne Plaza Indianapolis exterior' },
    { src: '/venue-2.jpg', alt: 'Crowne Plaza Indianapolis train cars' }
  ]

  // Placeholder gallery images - will be admin-uploaded
  const galleryImages = Array(12).fill(null).map((_, idx) => ({
    src: `/gallery-${idx + 1}.jpg`,
    alt: `Bootcamp photo ${idx + 1}`
  }))

  const nextVenueSlide = () => setVenueSlide((prev) => (prev + 1) % venueImages.length)
  const prevVenueSlide = () => setVenueSlide((prev) => (prev - 1 + venueImages.length) % venueImages.length)

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/bootcamp-hero.jpg"
            alt="Fleet Compliance Bootcamp"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd8157]/20 border border-[#dd8157]/30 rounded-full mb-6">
              <Calendar className="w-4 h-4 text-[#dd8157]" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">Event</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Fleet Compliance Bootcamp
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed">
              An immersive, two-day conference for trucking company owners, safety professionals, and risk advisors to learn how to develop and maintain cutting-edge fleet safety & compliance programs. Through collective brainstorming, networking, education, case studies, exercises, and ongoing support, attendees leave equipped to build industry-leading programs.
            </p>
          </div>
        </div>
      </section>

      {/* Next Event */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12">Next Bootcamp</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden">
              <Image
                src="/bootcamp-event.jpg"
                alt="Bootcamp 2026"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-5 h-5 text-[#dd8157]" />
                  <span className="font-semibold">Sept 16-18, 2026</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-[#dd8157]" />
                  <span className="font-semibold">Indianapolis, IN</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Bootcamp helps attendees kick start their DOT compliance programs. Whether you're entirely new to DOT safety regulations and building a safety program from scratch, transitioning into a compliance-related role, or have years of experience under your belt, Bootcamp is the place for you.
              </p>

              <div className="bg-[#dd8157]/10 border border-[#dd8157]/30 rounded-lg p-6 mb-8">
                <div className="font-bold text-gray-900 mb-2">NEW THIS YEAR!</div>
                <p className="text-gray-700">
                  Optional third half-day (Sept 18) featuring a live deposition simulation and 30(b)(6) prep session. You won't want to miss this!
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://www.trucksafe.com/event-details/fleet-compliance-bootcamp-fall-2026" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition"
                >
                  Register Now
                </a>
                <a 
                  href="#details" 
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-bold transition"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes It Unique */}
      <section id="details" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Demystifying DOT Compliance</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/4hi8JFoE2zw"
                title="Fleet Compliance Bootcamp Promo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                In military parlance, "bootcamp" describes an intense basic training aimed at equipping service members with the basic tools necessary to perform the roles that will be assigned to them throughout their service. Trucksafe's Fleet Compliance Bootcamp adapts that idea to folks involved in fleet safety & compliance, providing cutting-edge, in-depth and in-person DOT compliance training to equip those folks with the tools they need to run successful compliance programs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Bootcamp is NOT a typical conference where you take notes, go home and then try to figure out how to manage a compliance program on your own. Instead, it is about applying what you learn while you are at the event, making important connections with like-minded safety professionals, and equipping you with the tools you need to put your knowledge to practice back home.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Speakers",
                description: "Led by fleet compliance experts and industry attorneys who have assisted the nation's largest motor carriers for over a decade."
              },
              {
                icon: BookOpen,
                title: "Intensive Sessions",
                description: "Covering registration, insurance, driver qualification, HOS, maintenance, drug/alcohol testing, and more with case studies and group work."
              },
              {
                icon: CheckCircle2,
                title: "Interactivity",
                description: "Hands-on exercises like driver log audits, simulated driver qualification, and DataQs drafting."
              },
              {
                icon: Users,
                title: "Collaboration",
                description: "Build lasting relationships with fellow safety professionals and gain access to the Trucksafe Network."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-[#dd8157]/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#dd8157]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional Deposition Session */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square bg-gray-200 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Courtroom Photo
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#dd8157]/20 border border-[#dd8157]/30 rounded-full mb-4">
                <span className="text-xs font-bold text-[#dd8157] uppercase tracking-wider">New This Year</span>
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Live Deposition Simulation & 30(b)(6) Prep</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                This year's Bootcamp features a brand-new, optional half-day (Sept 18) immersive session designed to prepare fleet safety professionals for one of the most high-risk moments in post-crash litigation: the deposition.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                In this live, courtroom-style simulation, attendees will watch a realistic deposition of a fleet safety director in a serious highway accident case—conducted by actual plaintiff and defense attorneys. This is not theory. This is what it actually looks like when your policies, records, decisions, and credibility are under a microscope.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.trucksafe.com/_files/ugd/bb03f1_99bb388b129b47aca8f4554a67e9a5ae.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#dd8157] font-semibold hover:text-[#c86d47] transition"
                >
                  Learn More →
                </a>
                <a 
                  href="https://www.trucksafe.com/event-details/fleet-compliance-bootcamp-fall-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#dd8157] font-semibold hover:text-[#c86d47] transition"
                >
                  Register →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">What You'll Learn</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Scale, title: "Complex Regulatory Topics", desc: "Breaking down regulations into actionable insights" },
              { icon: Truck, title: "Safety Foundation", desc: "Building policies & procedures" },
              { icon: FileCheck, title: "DOT Registration", desc: "Understanding registration & insurance" },
              { icon: Users, title: "Driver Qualification", desc: "How to properly vet and qualify drivers" },
              { icon: Clock, title: "Hours of Service", desc: "Driver logging & ELDs" },
              { icon: Wrench, title: "Vehicle Maintenance", desc: "Maintenance & inspection programs" },
              { icon: ShieldCheck, title: "Drug & Alcohol Testing", desc: "Effectively managing testing programs" },
              { icon: BarChart3, title: "CSA & DataQs", desc: "Interpreting scores and utilizing DataQs" }
            ].map((topic, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#dd8157] transition group">
                <div className="w-12 h-12 bg-[#dd8157]/10 group-hover:bg-[#dd8157]/20 rounded-lg flex items-center justify-center mb-4 transition">
                  <topic.icon className="w-6 h-6 text-[#dd8157]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-sm text-gray-600">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid - Full Width */}
      <section className="py-20">
        <div className="px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setGallerySlide(idx)}
                className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition group"
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Photo {idx + 1}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Modal */}
        {gallerySlide !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setGallerySlide(null)}>
            <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xl">
                  Gallery Photo {gallerySlide + 1}
                </div>
              </div>

              <button 
                onClick={() => setGallerySlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              
              <button 
                onClick={() => setGallerySlide((prev) => (prev + 1) % galleryImages.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>

              <button 
                onClick={() => setGallerySlide(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition"
              >
                <X className="w-6 h-6 text-gray-900" />
              </button>

              <div className="text-center mt-4 text-white text-sm">
                {gallerySlide + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Hear From Past Attendees</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "The Bootcamp exceeded my expectations. The hands-on exercises and real-world scenarios made complex regulations much easier to understand.",
                author: "Sarah Mitchell",
                company: "Regional Transport Co."
              },
              {
                quote: "Best investment I've made in my safety career. The networking alone was worth it, but the quality of instruction was outstanding.",
                author: "Mike Johnson",
                company: "Midwest Logistics"
              },
              {
                quote: "I came in overwhelmed by DOT compliance. I left with a clear roadmap and the confidence to implement best practices at my fleet.",
                author: "Jennifer Torres",
                company: "Sunrise Carriers"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-8">
                <Quote className="w-10 h-10 text-[#dd8157]/20 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-6">{testimonial.quote}</p>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue & Hotel with Slider */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12">Venue Details</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Crowne Plaza - Indianapolis Union Station</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our 2026 Bootcamp will take place at the beautiful Crowne Plaza - Union Station in downtown Indianapolis, IN, located just 15 minutes from the Indianapolis International Airport.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Listed on the National Register of Historic Places, the newly redesigned property combines classic historic charm with modern amenities. The hotel features 273 guest rooms, including 26 that are inside early 1900s authentic Pullman train cars.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#dd8157]/10 rounded-lg flex items-center justify-center">
                    <Utensils className="w-5 h-5 text-[#dd8157]" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Bootcamp Reception</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Bootcamp attendees are invited to an evening of music, good food, and free drinks at our Bootcamp Reception! This year, the reception will take place next to the historic early 1900s authentic Pullman train cars situated in the Crowne Plaza hotel!
                </p>
              </div>

              <a 
                href="https://www.ihg.com/redirect?path=asearch&brandCode=CP&localeCode=en&regionCode=1&hotelCode=INDDT&checkInDate=15&checkInMonthYear=082026&checkOutDate=18&checkOutMonthYear=082026&rateCode=6CBARC&_PMID=99801505&GPC=TRK&cn=no&adjustMonth=false&showApp=true&monthIndex=00" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition"
              >
                Book Your Room
              </a>
            </div>

            <div className="relative">
              <div className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden">
                <img
                  src={venueImages[venueSlide].src}
                  alt={venueImages[venueSlide].alt}
                  className="w-full h-full object-cover"
                />
              </div>

              <button 
                onClick={prevVenueSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              
              <button 
                onClick={nextVenueSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>

              <div className="flex justify-center gap-2 mt-4">
                {venueImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setVenueSlide(idx)}
                    className={`w-2 h-2 rounded-full transition ${
                      idx === venueSlide ? 'bg-[#dd8157] w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Presenters */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Presenters</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Brandon Wiseman", role: "Trucksafe", bio: "Transportation attorney, safety consultant, and founder of Trucksafe Consulting." },
              { name: "Jerad Childress", role: "Trucksafe & Childress Law", bio: "Transportation attorney and Managing Partner of Childress Law, PLLC." },
              { name: "Rob Carpenter", role: "Trucksafe", bio: "Experienced regulatory compliance and DOT safety executive." },
              { name: "Tyler Biddle", role: "Childress Law", bio: "Transportation attorney specializing in regulatory challenges." },
              { name: "Brian Runnels", role: "TVC Pro Driver", bio: "Transportation professional with almost 30 years in the industry and 2 million safe miles." },
              { name: "Jack Van Steenburg", role: "CMV Safety Experts, LLC", bio: "Former FMCSA Chief Safety Officer with 15 years at the agency." }
            ].map((presenter, idx) => (
              <div key={idx} className="text-center">
                <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{presenter.name}</h3>
                <div className="text-[#dd8157] font-semibold mb-3">{presenter.role}</div>
                <p className="text-gray-600 leading-relaxed">{presenter.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Attendees Receive */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Attendees Receive</h2>
            <div className="text-2xl font-bold text-[#dd8157]">A $500+ Value!</div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Printed copy of Trucksafe's \"DOT Compliance | The Basics\" book",
              "Printed and electronic Bootcamp outline and workbook",
              "Full library of Trucksafe's electronic DOT compliance forms",
              "50% discount on Trucksafe's online courses through Trucksafe Academy"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-lg p-6">
                <Award className="w-6 h-6 text-[#dd8157] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Reasons */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">5 Reasons to Attend Bootcamp</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                num: "01",
                title: "Learn from Experts", 
                text: "You'll learn precisely what it takes to manage a DOT safety program from industry experts with decades of experience."
              },
              { 
                num: "02",
                title: "Get Key Tools", 
                text: "You'll receive essential tools to help you implement effective safety management controls at your fleet."
              },
              { 
                num: "03",
                title: "Build Relationships", 
                text: "You'll create lasting relationships with fellow safety professionals in an intimate setting."
              },
              { 
                num: "04",
                title: "Apply Your Learning", 
                text: "You'll participate in targeted exercises to help you apply what you're learning to your own situation."
              },
              { 
                num: "05",
                title: "Have Fun", 
                text: "You'll enjoy networking with like-minded professionals and exploring Indianapolis hotspots!"
              }
            ].map((reason, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#dd8157] transition">
                <div className="text-5xl font-black text-[#dd8157]/20 mb-4">{reason.num}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: "Who is Bootcamp for?",
                a: "Bootcamp is ideal for trucking company owners, safety directors, safety managers, dispatchers, risk advisors, or anyone tasked with keeping fleets compliant with federal and state motor carrier safety regulations."
              },
              {
                q: "How are the sessions structured?",
                a: "Bootcamp is broken into discrete sessions covering key components of DOT compliance. Sessions feature educational presentations, hands-on exercises, and group collaboration."
              },
              {
                q: "Are meals provided?",
                a: "Yes! Breakfast and lunch are provided both days. Bootcamp attendees are also invited to our evening Reception featuring food, drinks, and live music!"
              },
              {
                q: "Where do attendees stay?",
                a: "The Bootcamp takes place at the Crowne Plaza - Union Station in downtown Indianapolis. We secure a room block at special rates approximately 3-5 months in advance."
              },
              {
                q: "How many folks can attend?",
                a: "We limit attendance to around 70-100 attendees per event to facilitate better collaboration and more hands-on training."
              }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-100 transition">
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

      {/* Sponsors */}
      <section className="py-20 px-6 bg-[#363b57]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-12 text-center">Thanks to Our Sponsors</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            {[
              "Fleetworthy", "eRegs", "Childress Law"
            ].map((sponsor, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 flex items-center justify-center aspect-video">
                <div className="text-white/60 text-center font-semibold">{sponsor}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/80 mb-3">Interested in sponsoring?</p>
            <a 
              href="/sponsorship-prospectus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dd8157] font-semibold hover:text-[#c86d47] transition"
            >
              Learn More →
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed">
            Don't miss this opportunity to elevate your DOT compliance knowledge and connect with industry leaders.
          </p>
          <a 
            href="https://www.trucksafe.com/event-details/fleet-compliance-bootcamp-fall-2026" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#dd8157] hover:bg-[#c86d47] text-white px-12 py-5 rounded-lg font-bold text-lg transition"
          >
            Register for Bootcamp
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
