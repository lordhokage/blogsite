import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGFM from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
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
}

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

export async function getPostBySlug(category: string, slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(CONTENT_DIR, category, `${realSlug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error('File not found');
  }
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkGFM], rehypePlugins: [rehypePrism] },
  });

  return {
    slug: realSlug,
    frontMatter: data,
    content,
    mdxSource,
  };
}

export async function getAllPosts() {
  const categories = getAllCategories();

  const allPosts: {
    slug: string;
    category: string;
    frontMatter: any;
  }[] = [];

  for (const category of categories) {
    const slugs = getSlugsByCategory(category);

    for (const slug of slugs) {
      const post = await getPostBySlug(category, slug);
      allPosts.push({
        slug: post.slug,
        category,
        frontMatter: post.frontMatter,
      });
    }
  }

  return allPosts;
}

export function getSlugsByCategory(category: string): string[] {
  const categoryPath = path.join(CONTENT_DIR, category);
  return fs
    .readdirSync(categoryPath)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export async function getAllPostsByCategory(category: string) {
  const slugs = getSlugsByCategory(category);

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { frontMatter } = await getPostBySlug(category, slug);
      return { slug, frontMatter };
    })
  );

  return posts;
}
