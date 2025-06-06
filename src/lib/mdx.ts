import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGFM from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import { cache } from 'react';
import { components } from '@/app/components/CustomMDXComponents';

type FrontMatter = {
  title: string;
  date: string;
  description: string;
  tags?: string[];
};

type Post = {
  content: React.ReactNode;
  frontMatter: FrontMatter;
  slug: string;
};
const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getAllPostsMeta() {
  const fileNames = fs.readdirSync(CONTENT_DIR);

  return fileNames.map((fileName) => {
    const fullPath = path.join(CONTENT_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      ...data,
      slug: fileName.replace(/\.mdx?$/, ''),
    };
  });
}

const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.mdx')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
};

export function generateSearchIndex() {
  const files = getAllFiles(CONTENT_DIR);
  return files.map((filePath) => {
    const mdxContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(mdxContent);
    const slug = filePath
      .replace(CONTENT_DIR, '')
      .replace(/\.mdx$/, '')
      .split(path.sep)
      .filter(Boolean)
      .join('/');

    return {
      title: data.title || 'Untitled',
      category: filePath.split(path.sep).slice(-2)[0],
      slug,
      excerpt: content.slice(0, 200), // or use gray-matter `excerpt` if available
      content,
    };
  });
}

// Gets the directory name of the blog categories stored in content
export function getAllCategories(): string[] {
  return fs.readdirSync(CONTENT_DIR);
}

export async function getPostBySlug(
  category: string,
  slug: string
): Promise<Post | null> {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(CONTENT_DIR, category, `${realSlug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error('File not found');
  }
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContents);
  const mdxSource = await compileMDX({
    components,
    source: content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [rehypePrism],
      },
    },
  });

  return {
    slug: realSlug,
    frontMatter: data as FrontMatter,
    content: mdxSource.content,
  };
}

export const getAllPosts = cache(async () => {
  const categories = getAllCategories();

  const allPosts: {
    slug: string;
    category: string;
    frontMatter: FrontMatter;
  }[] = [];

  for (const category of categories) {
    const slugs = getSlugsByCategory(category);

    for (const slug of slugs) {
      const post = await getPostBySlug(category, slug);
      allPosts.push({
        slug: post!.slug,
        category,
        frontMatter: post!.frontMatter,
      });
    }
  }

  return allPosts;
});

export function getSlugsByCategory(category: string): string[] {
  const categoryPath = path.join(CONTENT_DIR, category);
  return fs
    .readdirSync(categoryPath)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export const getAllPostsByCategory = cache(async (category: string) => {
  const slugs = getSlugsByCategory(category);

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { frontMatter } = await getPostBySlug(category, slug);
      return { slug, frontMatter };
    })
  );

  return posts;
});
