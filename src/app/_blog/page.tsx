import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

const categories = ['Nextjs', 'React', 'CSS', 'HTML', 'MDX'];

export default async function BlogListPage() {
  const posts = await getAllPosts();

  console.log(posts);

  return (
    <main className="flex flex-col gap-12 py-10 lg:flex-row">
      <div>
        <h1 className="text-lg mb-6 text-pink-600 uppercase">
          Articles and Tutorials
        </h1>
        <section className="space-y-16 lg:w-2/3">
          {posts.map((post, index) => (
            <article key={`${post.slug}-${index}`} className="flex flex-col ">
              <h2 className="">
                <Link
                  href={`/${post.category}/${post.slug}`}
                  className="text-xl font-bold hover:underline decoration-blue-300"
                >
                  {post.frontMatter.title}
                </Link>
              </h2>
              <div>
                <p className="mt-2 text-gray-600 text-justify">
                  {post.frontMatter.description}
                </p>
                <button className="mt-3 text-sm hover:text-pink-400 hover:cursor-pointer">
                  Read more
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>

      <aside className="space-y-8 lg:w-3/3">
        <div className="flex flex-col gap-6">
          <h3 className="text-sm font-semibold tracking-wide text-pink-600 uppercase">
            Browse by Category
          </h3>
          <div className="mt-2 flex flex-wrap gap-3">
            {categories.map((item, index) => {
              return (
                <span
                  key={index}
                  className="rounded-lg  bg-[#b1dff6]  text-black px-2 py-1 text-sm"
                >
                  {item}
                </span>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-pink-600 uppercase">
            Popular Content
          </h3>
          <ul className="mt-2 space-y-5 text-sm">
            <li className="text-md">→ An Interactive Guide to Flexbox</li>
            <li>→ A Modern CSS Reset</li>
            <li>→ An Interactive Guide to CSS</li>
          </ul>
        </div>
      </aside>
    </main>
  );
}
