import { getAllPosts } from '@/lib/mdx';
import Link from 'next/link';
import ArticlesList from '../components/ArticleList';

// Article Categories
const categories = ['Nextjs', 'React', 'CSS', 'HTML'];

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <div className="flex flex-col gap-10 py-10 lg:flex-row lg:gap-5 ">
      {/* Article Section */}
      <div className="w-full px-4 sm:px-6 lg:px-0 flex-1">
        <h1 className="text-lg mb-6 text-pink-600 uppercase">
          Articles and Tutorials
        </h1>
        <ArticlesList posts={posts} />
      </div>

      {/* Sidebar */}
      <aside className="w-full px-4 sm:px-6 lg:px-0 lg:w-1/3 xl:w-1/4 space-y-8">
        <div className="flex flex-col gap-6">
          <h3 className="text-sm font-semibold tracking-wide text-pink-600 uppercase">
            Browse by Category
          </h3>
          <div className="mt-2 flex flex-wrap gap-3">
            {categories.map((item, index) => (
              <Link
                href={`/${item.toLowerCase()}`}
                key={index}
                className="rounded-lg bg-[#b1dff6] text-black px-2 py-1 text-sm"
              >
                {item}
              </Link>
            ))}
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
    </div>
  );
}
