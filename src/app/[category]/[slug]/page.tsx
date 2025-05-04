import { getPostBySlug } from '@/lib/mdx';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';
import MDXContent from '@/app/components/MDXContent';
import LikeButton from '@/app/components/LikeButton';
import ArticleView from '@/app/components/ArticleView';
import Comments from '@/app/components/Comments';

export const dynamicParams = true;

const components = {
  code: (props: MDXRemoteProps) => (
    <code
      className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm text-gray-800 dark:text-gray-200"
      {...props}
    />
  ),
  pre: (props: MDXRemoteProps) => (
    <pre
      className="bg-gray-100 dark:bg-gray-800 rounded p-4 my-4 overflow-x-auto"
      {...props}
    />
  ),
  p: (props: MDXRemoteProps) => <p {...props} className="mb-6 text-lg"></p>,
  a: (props: MDXRemoteProps) => (
    <a
      {...props}
      className="text-blue-400 underline hover:text-blue-300 transition"
    />
  ),
  h1: (props: MDXRemoteProps) => (
    <h1 {...props} className="text-lg lg:text-xl font-semibold mt-10" />
  ),
  blockquote: (props: MDXRemoteProps) => (
    <blockquote
      className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic text-gray-600 dark:text-gray-400"
      {...props}
    />
  ),
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; category: string }>;
}) {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);
  return {
    title: post.frontMatter.title,
    description: post.frontMatter.description,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string; category: string }>;
}) {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);

  return (
    <main className=" flex flex-col gap-12 py-10 lg:flex-row">
      <article className=" relative prose prose-invert prose-neutral max-w-2xl mx-auto p-8">
        <h1 className="text-center text-2xl lg:text-4xl font-bold mb-10">
          {post.frontMatter.title}
        </h1>
        {/* <BlogView slug={slug} /> */}

        <div className="text-center text-md italic text-gray-400 mt-1 ">
          Filed under <span className="font-medium ">General</span> on{' '}
          {/* {formatDate(post.frontMatter.date)} */}
          <br />
          <span className="text-md ">
            Last updated on{' '}
            {/* <strong>{formatDate(post.frontMatter.updated)}</strong> */}
          </span>
          <br />
          {/* <span>Likes and Views</span> <br /> */}
          <div className="flex justify-around items-center gap-4">
            <LikeButton />
            <ArticleView />
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none mt-20">
          <MDXRemote
            source={post.content}
            components={components}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypePrism],
              },
            }}
          />
        </div>
        {/* <Comments /> */}
      </article>
    </main>
  );
}
