import Link from 'next/link'
import { estimateReadTime } from '@/lib/blog'
import type { ArticleListItem } from '@/lib/blog'

interface ArticleCardProps {
  article: ArticleListItem
  viewMode: 'grid' | 'list'
}

function formatDate(date: Date | null): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function ArticleCard({ article, viewMode }: ArticleCardProps) {
  const category = article.categories[0]
  const readTime = estimateReadTime(article.excerpt || '')

  if (viewMode === 'list') {
    return (
      <Link
        href={`/post/${article.slug}`}
        className="group flex gap-6 p-6 bg-white border border-gray-200 rounded-xl hover:border-[#dd8157] hover:shadow-lg transition"
      >
        <div className="w-48 h-32 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
          {article.featuredImage ? (
            <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              Article Image
            </div>
          )}
        </div>
        <div className="flex-1">
          {category && (
            <div className="text-sm font-semibold text-[#dd8157] uppercase tracking-wider mb-2">
              {category.name}
            </div>
          )}
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#dd8157] transition">
            {article.title}
          </h3>
          <p className="text-gray-600 mb-4">{article.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="font-semibold">{article.author.name}</span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/post/${article.slug}`} className="group cursor-pointer block">
      <div className="bg-gray-100 h-48 rounded-xl mb-4 group-hover:bg-gray-200 transition overflow-hidden">
        {article.featuredImage ? (
          <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Article Image
          </div>
        )}
      </div>
      {category && (
        <div className="text-sm font-semibold text-[#dd8157] uppercase tracking-wider mb-2">
          {category.name}
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#dd8157] transition">
        {article.title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>{formatDate(article.publishedAt)}</span>
        <span>•</span>
        <span>{readTime}</span>
      </div>
    </Link>
  )
}
