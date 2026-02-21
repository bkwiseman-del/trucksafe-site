import Image from 'next/image'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BlogFilters from '@/components/BlogFilters'
import ArticleCard from '@/components/ArticleCard'
import { getPublishedArticles, getAllCategories, getAllTags } from '@/lib/blog'

export const metadata = {
  title: 'Blog - Trucksafe',
  description:
    'Expert insights on DOT compliance, regulatory updates, and practical guidance for motor carriers from Trucksafe.',
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; tag?: string; q?: string; view?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const { articles, totalCount, totalPages, currentPage } = await getPublishedArticles({
    page,
    category: searchParams.category,
    tag: searchParams.tag,
    search: searchParams.q,
  })
  const categories = await getAllCategories()
  const tags = await getAllTags()
  const viewMode = (searchParams.view as 'grid' | 'list') || 'grid'

  const startIndex = (currentPage - 1) * 9
  const endIndex = Math.min(startIndex + articles.length, totalCount)

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/articles-hero.jpg" alt="Articles" fill className="object-cover" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd8157]/20 border border-[#dd8157]/30 rounded-full mb-6">
              <FileText className="w-4 h-4 text-[#dd8157]" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">Articles</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Expert Insights on DOT Compliance
            </h1>

            <p className="text-xl text-white/90">
              In-depth analysis, regulatory updates, and practical compliance guidance from
              transportation attorneys and industry experts.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <BlogFilters
        categories={categories}
        tags={tags}
        currentCategory={searchParams.category}
        currentTag={searchParams.tag}
        currentSearch={searchParams.q}
        currentViewMode={viewMode}
      />

      {/* Articles */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {totalCount === 0 && !searchParams.q && !searchParams.category && !searchParams.tag
                  ? 'Coming Soon'
                  : 'No articles found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {totalCount === 0 && !searchParams.q && !searchParams.category && !searchParams.tag
                  ? 'New articles and regulatory updates are on the way. Check back soon!'
                  : 'Try adjusting your filters or search query'}
              </p>
              {(searchParams.q || searchParams.category || searchParams.tag) && (
                <Link href="/blog" className="text-[#dd8157] hover:text-[#c86d47] font-semibold">
                  Clear all filters
                </Link>
              )}
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} viewMode="list" />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={buildPageUrl(searchParams, currentPage - 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Previous
                </Link>
              )}

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const showPage =
                    p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)
                  if (!showPage) {
                    const isEllipsis =
                      (p === 2 && currentPage > 3) ||
                      (p === totalPages - 1 && currentPage < totalPages - 2)
                    if (isEllipsis) {
                      return (
                        <span key={p} className="px-3 py-2 text-gray-400">
                          ...
                        </span>
                      )
                    }
                    return null
                  }
                  return (
                    <Link
                      key={p}
                      href={buildPageUrl(searchParams, p)}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        currentPage === p
                          ? 'bg-[#dd8157] text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {p}
                    </Link>
                  )
                })}
              </div>

              {currentPage < totalPages && (
                <Link
                  href={buildPageUrl(searchParams, currentPage + 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Next
                </Link>
              )}
            </div>
          )}

          {/* Results Summary */}
          {totalCount > 0 && (
            <div className="mt-6 text-center text-sm text-gray-600">
              Showing {startIndex + 1}-{endIndex} of {totalCount} articles
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">Never Miss an Update</h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Get in-depth DOT compliance articles and breaking regulatory news delivered right to your
            inbox
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
            Join thousands of safety professionals staying informed on DOT compliance
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function buildPageUrl(
  searchParams: { page?: string; category?: string; tag?: string; q?: string; view?: string },
  page: number
): string {
  const params = new URLSearchParams()
  if (page > 1) params.set('page', String(page))
  if (searchParams.category) params.set('category', searchParams.category)
  if (searchParams.tag) params.set('tag', searchParams.tag)
  if (searchParams.q) params.set('q', searchParams.q)
  if (searchParams.view && searchParams.view !== 'grid') params.set('view', searchParams.view)
  const qs = params.toString()
  return `/blog${qs ? `?${qs}` : ''}`
}
