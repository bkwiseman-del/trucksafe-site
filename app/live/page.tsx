'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Calendar, Mic, PlayCircle, ArrowRight, X } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function TrucksafeLivePage() {
  const [showAllEpisodes, setShowAllEpisodes] = useState(false)
  const [showGuestModal, setShowGuestModal] = useState(false)
  
  // All episodes - will be replaced with API/database call
  const allEpisodes = [
    {
      id: 'XveDN8ZKYc0',
      slug: 'episode-60-catching-chameleons',
      episodeNumber: 60,
      title: 'Trucksafe LIVE! | Ep. 60 - Catching the Chameleons',
      description: 'Chameleon carriers—fleets that shut down and reappear under new identities to escape enforcement—are posing a growing safety and fraud risk across the trucking industry. On this episode, we\'re joined by former FMCSA Chief Safety Officer Jack Van Steenburg to break down how these operations work, why they\'re so difficult to stop, and what fleets and regulators should understand about the evolving threat.',
      thumbnail: 'https://i.ytimg.com/vi/XveDN8ZKYc0/hqdefault.jpg'
    },
    {
      id: '244KkuMbzUQ',
      slug: 'episode-59-marijuana-rescheduling',
      episodeNumber: 59,
      title: 'Trucksafe LIVE! | Ep. 59 - Marijuana Rescheduling',
      description: 'In this episode of Trucksafe LIVE!, we\'re joined by special guest Patrice Kelly, former Director of USDOT\'s Office of Drug and Alcohol Policy and Compliance, to discuss what marijuana rescheduling could mean for DOT testing programs and where things stand with oral fluid testing.',
      thumbnail: 'https://i.ytimg.com/vi/244KkuMbzUQ/hqdefault.jpg'
    },
    {
      id: '-GdHhNYdBGg',
      slug: 'episode-58-2025-year-in-review',
      episodeNumber: 58,
      title: 'Trucksafe LIVE! | Ep. 58 - 2025 year in review & 2026 outlook',
      description: 'On this episode, we break down the top 10 regulatory developments of 2025 and what they mean for fleets heading into 2026.',
      thumbnail: 'https://i.ytimg.com/vi/-GdHhNYdBGg/hqdefault.jpg'
    },
    {
      id: '32jROa55cng',
      slug: 'episode-57-cdl-training-crackdown',
      episodeNumber: 57,
      title: 'Trucksafe LIVE! | Ep. 57 - CDL training crackdown',
      description: 'The Trucksafe team breaks down FMCSA\'s unprecedented removal of 3,000 CDL training providers from the federal registry.',
      thumbnail: 'https://i.ytimg.com/vi/32jROa55cng/hqdefault.jpg'
    },
    {
      id: 'B71YyydmH4g',
      slug: 'episode-56-eld-purge',
      episodeNumber: 56,
      title: 'Trucksafe LIVE! | Ep. 56 - The great ELD purge of 2025?',
      description: 'We break down FMCSA\'s newly announced overhaul of the ELD self-certification process.',
      thumbnail: 'https://i.ytimg.com/vi/B71YyydmH4g/hqdefault.jpg'
    },
    {
      id: 'J2FAwn8a5hs',
      slug: 'episode-55-non-domiciled-cdl-halt',
      episodeNumber: 55,
      title: 'Trucksafe LIVE! | Ep. 55 - Federal court halts non-domiciled CDL rule',
      description: 'Special episode discussing breaking news that a federal court of appeals has temporarily halted enforcement of the FMCSA\'s Interim Final Rule.',
      thumbnail: 'https://i.ytimg.com/vi/J2FAwn8a5hs/hqdefault.jpg'
    },
    {
      id: 'PsFIHUcC0vE',
      slug: 'episode-54-mcsap-funding',
      episodeNumber: 54,
      title: 'Trucksafe LIVE! | Ep. 54 - Understanding MCSAP Funding',
      description: 'Tackling the Motor Carrier Safety Assistance Program in wake of FMCSA withholding funding from California.',
      thumbnail: 'https://i.ytimg.com/vi/PsFIHUcC0vE/hqdefault.jpg'
    },
    {
      id: 'J7fXIyB6CEg',
      slug: 'episode-53-non-domiciled-cdl-rules',
      episodeNumber: 53,
      title: 'Trucksafe LIVE! | Ep. 53 - Tightening non-domiciled CDL rules',
      description: 'Breaking down the FMCSA\'s Interim Final Rule on non-domiciled CDLs.',
      thumbnail: 'https://i.ytimg.com/vi/J7fXIyB6CEg/hqdefault.jpg'
    },
    {
      id: 'Q-ptmwesr4k',
      slug: 'episode-52-driver-health-wellness',
      episodeNumber: 52,
      title: 'Trucksafe LIVE! | Ep. 52 - Tackling driver health & wellness',
      description: 'Talking with Jeremy Reymer and Dr. Mark Manera of Project 61 about raising the 61-year life expectancy of America\'s truck drivers.',
      thumbnail: 'https://i.ytimg.com/vi/Q-ptmwesr4k/hqdefault.jpg'
    },
    {
      id: 'lUhlvY2fv9Q',
      slug: 'episode-51-werner-dataqs-driver-initiatives',
      episodeNumber: 51,
      title: 'Trucksafe LIVE! | Ep. 51 - Werner, DataQs & Driver Initiatives',
      description: 'USDOT announced comprehensive initiatives, pilot programs, and regulatory updates aimed at supporting truck drivers.',
      thumbnail: 'https://i.ytimg.com/vi/lUhlvY2fv9Q/hqdefault.jpg'
    }
  ]
  
  const displayedEpisodes = showAllEpisodes ? allEpisodes : allEpisodes.slice(0, 6)

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/live-hero-bg.jpg"
            alt="Podcast studio"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd8157]/20 border border-[#dd8157]/30 rounded-full mb-6">
              <Mic className="w-4 h-4 text-[#dd8157]" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">Livestream</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Trucksafe LIVE!
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed mb-10">
              Join transportation attorneys Brandon Wiseman and Jerad Childress for off-the-cuff discussions on highway safety news and regulatory developments
            </p>

            <div className="space-y-4">
              <div className="text-sm font-semibold text-white/80 uppercase tracking-wider">Subscribe</div>
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.youtube.com/playlist?list=PLKFRi6fwIR2GTP5okXxJ-clPj0hqLwT_w" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition group"
                >
                  <div className="w-10 h-10 bg-white/10 group-hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                    <PlayCircle className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">YouTube</span>
                </a>
                <a 
                  href="https://open.spotify.com/show/4cmb26xL2KPByA0rsrc0mT" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition group"
                >
                  <div className="w-10 h-10 bg-white/10 group-hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                    <Mic className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">Spotify</span>
                </a>
                <a 
                  href="https://podcasts.apple.com/us/podcast/trucksafe-live/id1580328278" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition group"
                >
                  <div className="w-10 h-10 bg-white/10 group-hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                    <Mic className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">Apple Podcasts</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Episode */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12">Upcoming Show</h2>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/WCKs4v9iruE"
                  title="Trucksafe LIVE! Upcoming Episode"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
                <div className="text-sm font-semibold text-[#dd8157] uppercase tracking-wider mb-2">Episode 61</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  A conversation with Administrator Derek Barrs
                </h3>
                <div className="flex items-center gap-4 text-gray-700 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Feb 20, 2026</span>
                  </div>
                  <span>•</span>
                  <span className="font-medium">2:00 PM ET</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-8">
                  On this episode, we're excited to be joined by FMCSA Administrator Chief Derek Barrs to discuss some of the most pressing enforcement trends affecting the trucking industry today, including English Language Proficiency enforcement, non-domiciled CDLs, and the growing problem of chameleon carriers.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://evt.to/1421qff6x7lk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#dd8157] hover:bg-[#c86d47] text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    <Calendar className="w-4 h-4" />
                    Add to Calendar
                  </a>
                  <a 
                    href="https://www.youtube.com/watch?v=WCKs4v9iruE" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Special Guest</div>
                <img 
                  src="/guest-derek-barrs.jpg" 
                  alt="Derek Barrs"
                  className="w-32 h-32 rounded-xl mb-4 object-cover"
                />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Derek Barrs</h4>
                <div className="text-[#dd8157] font-semibold mb-3">FMCSA Administrator</div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  With nearly 35 years of experience in law enforcement and roadway safety, including more than 25 years focused on commercial motor vehicle safety.
                </p>
                <button 
                  onClick={() => setShowGuestModal(true)}
                  className="text-[#dd8157] font-semibold hover:text-[#c86d47] transition"
                >
                  Read full bio →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">About Trucksafe LIVE!</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            A production of Trucksafe Consulting. Join transportation attorneys Brandon Wiseman and Jerad Childress (and special guests) for off-the-cuff discussions on highway safety news and regulatory developments. Topics include hours-of-service, driver qualification, nuclear verdicts, DOT enforcement, and more.
          </p>
        </div>
      </section>

      {/* Past Episodes */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12">Past Episodes</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedEpisodes.map((episode, idx) => (
              <a
                key={idx}
                href={`/live/${episode.slug}`}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#dd8157] hover:shadow-lg transition block"
              >
                <div className="relative aspect-video bg-gray-200">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-[#dd8157] mb-2">
                    Episode {episode.episodeNumber}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#dd8157] transition line-clamp-2 mb-3">
                    {episode.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {episode.description}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12 flex items-center justify-center gap-6">
            {!showAllEpisodes && allEpisodes.length > 6 && (
              <button 
                onClick={() => setShowAllEpisodes(true)}
                className="text-[#dd8157] font-semibold hover:text-[#c86d47] transition inline-flex items-center gap-2"
              >
                Load More Episodes <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <a 
              href="https://www.youtube.com/playlist?list=PLKFRi6fwIR2GTP5okXxJ-clPj0hqLwT_w" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#dd8157] font-semibold hover:text-[#c86d47] transition inline-flex items-center gap-2"
            >
              View All on YouTube <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Hosts */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">Your Hosts</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Brandon Wiseman</h3>
              <div className="text-[#dd8157] font-semibold mb-4">Trucksafe & Childress Law</div>
              <p className="text-gray-600 leading-relaxed">
                Transportation attorney, safety consultant, and founder of Trucksafe Consulting
              </p>
            </div>

            <div className="text-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rob Carpenter</h3>
              <div className="text-[#dd8157] font-semibold mb-4">Trucksafe</div>
              <p className="text-gray-600 leading-relaxed">
                Experienced regulatory compliance and DOT safety executive
              </p>
            </div>

            <div className="text-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Jerad Childress</h3>
              <div className="text-[#dd8157] font-semibold mb-4">Trucksafe & Childress Law</div>
              <p className="text-gray-600 leading-relaxed">
                Transportation attorney and Managing Partner of Childress Law
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Never Miss an Episode
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Subscribe to get notified about upcoming shows
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
        </div>
      </section>

      {/* Guest Bio Modal */}
      {showGuestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setShowGuestModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Derek Barrs</h3>
              <button 
                onClick={() => setShowGuestModal(false)}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-6 mb-6">
                <img 
                  src="/guest-derek-barrs.jpg" 
                  alt="Derek Barrs"
                  className="w-32 h-32 rounded-xl flex-shrink-0 object-cover"
                />
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Derek Barrs</h4>
                  <div className="text-[#dd8157] font-semibold text-lg mb-4">FMCSA Administrator</div>
                </div>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Derek D. Barrs serves as the Administrator of the Federal Motor Carrier Safety Administration (FMCSA) within the U.S. Department of Transportation. Nominated by President Donald J. Trump on March 25, 2025, and confirmed by the U.S. Senate on October 7, 2025, he leads the agency's mission to enhance commercial motor vehicle safety, improve the efficiency of the nation's freight and passenger transportation systems, and bring commonsense principles to regulatory oversight.
                </p>
                <p>
                  With nearly 35 years of experience in law enforcement and roadway safety, including more than 25 years focused on commercial motor vehicle safety, Barrs has built a distinguished career at the local, state, and national levels. He previously served as Associate Vice President for Strategic Mobility Solutions at HNTB Corporation, and earlier as a Deputy Sheriff in Madison County, Florida, and as a Florida State Trooper. Rising through the ranks, he retired as Chief of the Florida Highway Patrol.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
