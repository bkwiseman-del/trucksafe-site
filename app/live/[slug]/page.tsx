'use client'

import Image from 'next/image'
import { ArrowLeft, Clock, Calendar, User, Tag } from 'lucide-react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'

// This would come from your CMS/database
const episodeData = {
  slug: 'episode-60-catching-chameleons',
  episodeNumber: 60,
  title: 'Catching the Chameleons',
  fullTitle: 'Trucksafe LIVE! | Ep. 60 - Catching the Chameleons',
  youtubeId: 'XveDN8ZKYc0',
  publishDate: 'January 16, 2026',
  duration: '45 min',
  guest: {
    name: 'Jack Van Steenburg',
    title: 'Former FMCSA Chief Safety Officer',
    image: '/guest-jack-vansteenburg.jpg',
    bio: 'Jack Van Steenburg served as Chief Safety Officer at FMCSA from 2018-2024, leading the agency\'s safety programs and enforcement initiatives.'
  },
  summary: 'Chameleon carriers—fleets that shut down and reappear under new identities to escape enforcement—are posing a growing safety and fraud risk across the trucking industry. On this episode, we\'re joined by former FMCSA Chief Safety Officer Jack Van Steenburg to break down how these operations work, why they\'re so difficult to stop, and what fleets and regulators should understand about the evolving threat.',
  topics: [
    'Chameleon Carriers',
    'FMCSA Enforcement',
    'Safety Ratings',
    'Carrier Fraud'
  ],
  keyTakeaways: [
    'Chameleon carriers often use shell companies and nominee officers to hide ownership and evade safety oversight',
    'The average chameleon operation resurfaces under a new identity within 90 days of shutdown',
    'Technology and data sharing between agencies is key to identifying and preventing chameleon activity',
    'Legitimate carriers can protect themselves by vetting partners and monitoring DOT numbers of companies they work with'
  ],
  transcript: `[Auto-generated transcript would go here - this would be pulled from YouTube or a transcription service]

Brandon Wiseman: Welcome back to another episode of Trucksafe LIVE! Today we're diving into one of the most concerning trends in motor carrier enforcement...

[Full transcript continues...]`,
  relatedEpisodes: [
    {
      slug: 'episode-59-marijuana-rescheduling',
      episodeNumber: 59,
      title: 'Marijuana Rescheduling & Oral Fluid Testing',
      thumbnail: 'https://i.ytimg.com/vi/244KkuMbzUQ/hqdefault.jpg'
    },
    {
      slug: 'episode-58-2025-year-in-review',
      episodeNumber: 58,
      title: '2025 Year in Review & 2026 Outlook',
      thumbnail: 'https://i.ytimg.com/vi/-GdHhNYdBGg/hqdefault.jpg'
    },
    {
      slug: 'episode-57-cdl-training-crackdown',
      episodeNumber: 57,
      title: 'CDL Training Crackdown',
      thumbnail: 'https://i.ytimg.com/vi/32jROa55cng/hqdefault.jpg'
    }
  ],
  relatedArticles: [],
  resources: [
    {
      title: 'FMCSA Chameleon Carrier Task Force Report',
      url: 'https://www.fmcsa.dot.gov/chameleon-report'
    },
    {
      title: 'SMS Methodology',
      url: 'https://www.fmcsa.dot.gov/sms'
    }
  ]
}

export default function ShowNotesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <article className="pt-32 pb-12">
        <div className="max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <a href="/live" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#dd8157] transition mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Trucksafe LIVE!
          </a>

          {/* Category Badge */}
          <div className="inline-block px-3 py-1 bg-[#dd8157]/10 text-[#dd8157] rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
            Episode {episodeData.episodeNumber}
          </div>

          {/* Title */}
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
            {episodeData.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-8 border-b border-gray-200 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{episodeData.publishDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{episodeData.duration}</span>
            </div>
            {episodeData.guest && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">Guest: {episodeData.guest.name}</span>
              </div>
            )}
          </div>

          {/* Video Embed */}
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-12 shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${episodeData.youtubeId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Guest Info (if present) */}
          {episodeData.guest && (
            <div className="bg-gradient-to-br from-[#363b57] to-[#2a2e42] rounded-xl p-8 mb-12">
              <div className="flex items-start gap-6">
                <img
                  src={episodeData.guest.image}
                  alt={episodeData.guest.name}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                />
                <div>
                  <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
                    Special Guest
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {episodeData.guest.name}
                  </h3>
                  <div className="text-[#dd8157] font-semibold mb-3">
                    {episodeData.guest.title}
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    {episodeData.guest.bio}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Episode Summary */}
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Episode Summary</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {episodeData.summary}
            </p>
          </div>

          {/* Topics Covered */}
          {episodeData.topics.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Topics Covered</h3>
              <div className="flex flex-wrap gap-2">
                {episodeData.topics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          {episodeData.keyTakeaways.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Takeaways</h3>
              <ul className="space-y-4">
                {episodeData.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#dd8157] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-gray-700 leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources Mentioned */}
          {episodeData.resources.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Resources Mentioned</h3>
              <div className="space-y-3">
                {episodeData.resources.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-[#dd8157] transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{resource.title}</span>
                      <ArrowLeft className="w-5 h-5 text-[#dd8157] transform rotate-180" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Full Transcript (Collapsible) */}
          <details className="mb-12">
            <summary className="text-2xl font-bold text-gray-900 mb-6 cursor-pointer hover:text-[#dd8157] transition">
              Full Episode Transcript
            </summary>
            <div className="mt-6 p-6 bg-gray-50 rounded-xl">
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                {episodeData.transcript}
              </div>
            </div>
          </details>
        </div>
      </article>

      {/* Related Content */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* Related Episodes */}
          {episodeData.relatedEpisodes.length > 0 && (
            <div>
              <h3 className="text-3xl font-black text-gray-900 mb-8">More Episodes</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {episodeData.relatedEpisodes.map((episode) => (
                  <a
                    key={episode.slug}
                    href={`/live/${episode.slug}`}
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#dd8157] hover:shadow-lg transition"
                  >
                    <div className="relative aspect-video bg-gray-200">
                      <img
                        src={episode.thumbnail}
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#dd8157] border-b-8 border-b-transparent ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-sm font-semibold text-[#dd8157] mb-2">
                        Episode {episode.episodeNumber}
                      </div>
                      <h4 className="font-bold text-gray-900 group-hover:text-[#dd8157] transition">
                        {episode.title}
                      </h4>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Never Miss an Episode
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Get notified when new Trucksafe LIVE! episodes drop, plus exclusive DOT compliance insights
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dd8157]"
            />
            <button
              type="submit"
              className="bg-[#dd8157] hover:bg-[#c86d47] text-white px-8 py-4 rounded-lg font-bold transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-sm text-white/60 mt-6">
            Join thousands of safety professionals staying informed
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
