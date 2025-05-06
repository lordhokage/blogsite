// lib/rss.ts
import { Feed } from 'feed';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Site configuration
const siteConfig = {
  title: 'Blog Site',
  description: 'The personal blog site site created using mdx and nextjs',
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  author: {
    name: 'Rajiv Dahal',
    email: 'rajivdahal89@gmail.com',
    link: 'localhost:3000/about',
  },
};

// Post interface
export interface Post {
  slug: string;
  title: string;
  date: string;
  description?: string;
  excerpt: string;
  author?: string;
  category: string;
  [key: string]: any;
}

// Get all blog posts
export async function getAllPosts(): Promise<Post[]> {
  const contentDirectory = path.join(process.cwd(), 'content');
  const categories = fs
    .readdirSync(contentDirectory)
    .filter((item) =>
      fs.statSync(path.join(contentDirectory, item)).isDirectory()
    );

  const allPosts: Post[] = [];

  // Iterate through each category
  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith('.mdx'));

    // Process each MDX file
    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      // Skip drafts if they're marked as such
      if (data.draft === true) {
        continue;
      }

      // Create a slug from the file name
      const slug = `${category}/${file.replace(/\.mdx$/, '')}`;

      // Extract first paragraph as excerpt if excerpt not provided in frontmatter
      const excerpt =
        data.excerpt ||
        content.split('\n').filter((line) => line.trim().length > 0)[0] ||
        '';

      allPosts.push({
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        description: data.description || excerpt,
        excerpt,
        author: data.author,
        category,
        ...data,
      });
    }
  }

  // Sort posts by date in descending order
  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get posts from a specific category
export async function getCategoryPosts(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

// Generate RSS feed from posts
export function generateRssFeed(posts: Post[]): Feed {
  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.siteUrl,
    link: siteConfig.siteUrl,
    language: 'en',
    favicon: `${siteConfig.siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    updated: posts.length > 0 ? new Date(posts[0].date) : new Date(),
    author: siteConfig.author,
  });

  // Add each post to the feed
  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.siteUrl}/${post.slug}`,
      link: `${siteConfig.siteUrl}/${post.slug}`,
      description: post.description,
      content: post.excerpt,
      author: [
        {
          name: post.author || siteConfig.author.name,
          email: siteConfig.author.email,
          link: siteConfig.author.link,
        },
      ],
      date: new Date(post.date),
    });
  });

  // Add categories as feed categories
  const categories = [...new Set(posts.map((post) => post.category))];
  categories.forEach((category) => {
    feed.addCategory(category);
  });

  return feed;
}
