import { prisma } from '@/lib/prisma'

const ARTICLES_PER_PAGE = 9

export interface ArticleListItem {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featuredImage: string | null
  publishedAt: Date | null
  viewCount: number
  author: { name: string | null }
  categories: { name: string; slug: string }[]
  tags: { name: string; slug: string }[]
}

export interface ArticleListResult {
  articles: ArticleListItem[]
  totalCount: number
  totalPages: number
  currentPage: number
}

export async function getPublishedArticles(options: {
  page?: number
  category?: string
  tag?: string
  search?: string
} = {}): Promise<ArticleListResult> {
  const page = Math.max(1, options.page || 1)

  const where: any = {
    status: 'published',
    publishedAt: { lte: new Date() },
  }

  if (options.category) {
    where.categories = { some: { slug: options.category } }
  }
  if (options.tag) {
    where.tags = { some: { slug: options.tag } }
  }
  if (options.search) {
    where.OR = [
      { title: { contains: options.search, mode: 'insensitive' } },
      { excerpt: { contains: options.search, mode: 'insensitive' } },
    ]
  }

  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * ARTICLES_PER_PAGE,
      take: ARTICLES_PER_PAGE,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        publishedAt: true,
        viewCount: true,
        author: { select: { name: true } },
        categories: { select: { name: true, slug: true } },
        tags: { select: { name: true, slug: true } },
      },
    }),
    prisma.article.count({ where }),
  ])

  return {
    articles,
    totalCount,
    totalPages: Math.ceil(totalCount / ARTICLES_PER_PAGE),
    currentPage: page,
  }
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findFirst({
    where: {
      slug,
      status: 'published',
      publishedAt: { lte: new Date() },
    },
    include: {
      author: { select: { name: true, image: true } },
      categories: { select: { name: true, slug: true } },
      tags: { select: { name: true, slug: true } },
    },
  })
}

export async function getRelatedArticles(articleId: string, categorySlugs: string[], limit = 3) {
  return prisma.article.findMany({
    where: {
      id: { not: articleId },
      status: 'published',
      publishedAt: { lte: new Date() },
      categories: categorySlugs.length > 0
        ? { some: { slug: { in: categorySlugs } } }
        : undefined,
    },
    orderBy: { publishedAt: 'desc' },
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      publishedAt: true,
      categories: { select: { name: true, slug: true } },
    },
  })
}

export async function getAllCategories() {
  const categories = await prisma.articleCategory.findMany({
    distinct: ['slug'],
    select: { name: true, slug: true },
    orderBy: { name: 'asc' },
  })
  const seen = new Set<string>()
  return categories.filter((c) => {
    if (seen.has(c.slug)) return false
    seen.add(c.slug)
    return true
  })
}

export async function getAllTags() {
  const tags = await prisma.articleTag.findMany({
    distinct: ['slug'],
    select: { name: true, slug: true },
    orderBy: { name: 'asc' },
  })
  const seen = new Set<string>()
  return tags.filter((t) => {
    if (seen.has(t.slug)) return false
    seen.add(t.slug)
    return true
  })
}

export async function incrementViewCount(articleId: string) {
  await prisma.article.update({
    where: { id: articleId },
    data: { viewCount: { increment: 1 } },
  })
}

export function estimateReadTime(content: string): string {
  const text = content.replace(/<[^>]*>/g, '')
  const words = text.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}
