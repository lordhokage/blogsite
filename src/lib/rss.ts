// lib/rss.ts
import { Feed } from 'rss';

// This assumes your blog posts are stored as .mdx files in a folder
import { getAllPosts } from './mdx'; // You’ll create this or already have it

export async function generateRssFeed() {
  const siteUrl = 'localhost'; // CHANGE THIS
  const allPosts = await getAllPosts(); // Your logic to get blog post metadata

  const feed = new Feed({
    title: 'Your Blog Title',
    description: 'Your blog description',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    image: `${siteUrl}/logo.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
    },
  });

  allPosts.forEach((post) => {
    feed.addItem({
      title: post.frontMatter.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.frontMatter.description,
    });
  });

  return feed.rss2(); // Returns RSS XML as string
}
