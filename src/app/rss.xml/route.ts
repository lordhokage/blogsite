// app/rss.xml/route.ts
import { Feed } from 'feed';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

export async function GET() {
  const feed = new Feed({
    title: 'Rajiv Dahal',
    description: 'Blog created using nextjs and mdx',
    id: 'https://blogsite-plum-kappa.vercel.app/',
    link: 'https://blogsite-plum-kappa.vercel.app/',
    language: 'en',
    favicon: 'https://yourdomain.com/favicon.ico',
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    updated: new Date(),
    author: {
      name: 'Rajiv Dahal',
      email: 'rajivdahal89@gmail.com',
      link: 'https://blogsite-plum-kappa.vercel.app/',
    },
  });

  // Get all blog posts
  const posts = await getAllPosts();

  // Add each post to the feed
  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `https://blogsite-plum-kappa.vercel.app/${post.slug}`,
      link: `https://blogsite-plum-kappa.vercel.app/${post.slug}`,
      description: post.description,
      content: post.excerpt,
      author: [
        {
          name: post.author || 'Rajiv',
          email: 'rajivdahal89@gmail.com',
          link: 'https://blogsite-plum-kappa.vercel.app/',
        },
      ],
      date: new Date(post.date),
    });
  });

  // Return the RSS feed as XML
  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

// Helper function to get all blog posts
async function getAllPosts() {
  const contentDirectory = path.join(process.cwd(), 'content');
  const categories = fs
    .readdirSync(contentDirectory)
    .filter((item) =>
      fs.statSync(path.join(contentDirectory, item)).isDirectory()
    );

  const allPosts = [];

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

      // Create a slug from the file name
      const slug = `${category}/${file.replace(/\.mdx$/, '')}`;

      // Extract first paragraph as excerpt if excerpt not provided in frontmatter
      const excerpt =
        data.excerpt ||
        content.split('\n').filter((line) => line.trim().length > 0)[0] ||
        '';

      allPosts.push({
        slug,
        title: data.title,
        date: data.date,
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
