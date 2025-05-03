import { notFound } from 'next/navigation';
import { getAllPostsByCategory, getAllCategories } from '@/lib/mdx'; // Add a helper to fetch valid categories
import Link from 'next/link';

type CategoryParams = {
  category: string;
};
type Props = {
  params: Promise<CategoryParams>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  // Optional: Validate against allowed categories
  const validCategories = await getAllCategories(); // You need to implement this in your lib
  if (!validCategories.includes(category)) {
    notFound(); // Redirects to 404
  }

  const posts = await getAllPostsByCategory(category);

  if (!posts || posts.length === 0) {
    notFound(); // Alternatively, show a custom empty state instead
  }

  return (
    <main className="max-w-5xl mx-auto py-10">
      <header className="flex items-center justify-between mb-8">
        <span className="text-3xl font-bold capitalize">
          {category === 'blog' ? 'General' : category}
        </span>
        <span>{posts.length} Articles</span>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <div
            className=" rounded-lg shadow-md p-6 border-gray-300 border-2"
            key={index}
          >
            <Link href={`/${category}/${post.slug}`}>
              <h3 className="text-xl font-bold  ">{post.frontMatter.title}</h3>
            </Link>
            <p className="mb-4 mt-3">{post.frontMatter.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              {post.frontMatter.date}
            </p>
            <a
              href={`/${category}/${post.slug}`}
              className="text-sm font-semibold text-indigo-600 hover:underline"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
