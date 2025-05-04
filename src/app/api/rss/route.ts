import { NextResponse } from 'next/server';
import { getAllPosts, generateRssFeed } from '@/lib/rss';

export const revalidate = 3600; // Revalidate at most once per hour

export async function GET() {
  try {
    // Get all blog posts
    const posts = await getAllPosts();

    // Generate the RSS feed
    const feed = generateRssFeed(posts);

    // Return the RSS feed as XML
    return new NextResponse(feed.rss2(), {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
