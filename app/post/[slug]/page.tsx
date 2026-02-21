import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ShareButtons from '@/components/ShareButtons'
import { getArticleBySlug, getRelatedArticles, incrementViewCount, estimateReadTime } from '@/lib/blog'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  if (!article) return { title: 'Article Not Found - Trucksafe' }

  return {
    title: article.metaTitle || `${article.title} - Trucksafe`,
    description: article.metaDescription || article.excerpt || '',
    keywords: article.metaKeywords || undefined,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt || '',
      type: 'article',
      publishedTime: article.publishedAt?.toISOString(),
      authors: [article.author.name || 'Trucksafe'],
      images: article.featuredImage ? [article.featuredImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt || '',
    },
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)
  if (!article) notFound()

  // Fire-and-forget view count increment
  incrementViewCount(article.id).catch(() => {})

  const categorySlugs = article.categories.map((c) => c.slug)
  const relatedArticles = await getRelatedArticles(article.id, categorySlugs)
  const readTime = estimateReadTime(article.content)
  const category = article.categories[0]

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Floating Share Sidebar */}
      <ShareButtons title={article.title} variant="sidebar" />

      {/* Article */}
      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#dd8157] transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>

          {/* Category Badge */}
          {category && (
            <Link
              href={`/blog/categories/${category.slug}`}
              className="inline-block px-3 py-1 bg-[#dd8157]/10 text-[#dd8157] rounded-full text-sm font-semibold uppercase tracking-wider mb-6 hover:bg-[#dd8157]/20 transition"
            >
              {category.name}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-8 border-b border-gray-200 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">{article.author.name}</span>
            </div>
            {formattedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formattedDate}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="relative w-full h-96 rounded-xl overflow-hidden mb-12">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#dd8157] prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200 mb-8">
              {article.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog?tag=${tag.slug}`}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* Share - Bottom */}
          <ShareButtons title={article.title} />
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => {
                const relatedCategory = related.categories[0]
                const relatedDate = related.publishedAt
                  ? new Date(related.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : ''

                return (
                  <Link
                    key={related.id}
                    href={`/post/${related.slug}`}
                    className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#dd8157] hover:shadow-lg transition"
                  >
                    {relatedCategory && (
                      <div className="text-sm font-semibold text-[#dd8157] uppercase tracking-wider mb-3">
                        {relatedCategory.name}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{related.title}</h3>
                    {relatedDate && (
                      <div className="text-sm text-gray-500">{relatedDate}</div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#363b57] to-[#2a2e42]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">Stay Updated on DOT Compliance</h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Get expert analysis and breaking regulatory news delivered to your inbox
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
