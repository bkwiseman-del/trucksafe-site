import { NextRequest, NextResponse } from 'next/server'
import { getPublishedArticles } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const result = await getPublishedArticles({
      page: parseInt(searchParams.get('page') || '1'),
      category: searchParams.get('category') || undefined,
      tag: searchParams.get('tag') || undefined,
      search: searchParams.get('q') || undefined,
    })
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}
