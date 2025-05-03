import { NextResponse } from 'next/server';
import { buildSearchIndex, searchDocuments } from '@/utils/search';

// Cache for the search index
let searchCache = null;

export async function GET(request) {
  try {
    // Get search query from URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    // Build or retrieve the search index
    if (!searchCache) {
      console.log('Building search index...');
      searchCache = await buildSearchIndex();
    }

    // Perform the search
    const results = searchDocuments(searchCache.index, query);

    return NextResponse.json({
      results,
      query, // Include the query in the response for highlighting
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}
