'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBookmarks, removeBookmark } from '@/lib/bookmark';

export default function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const handleRemove = (slug: string | number) => {
    removeBookmark(slug);
    setBookmarks(getBookmarks());
  };

  if (bookmarks.length === 0) {
    return <p className="px-6 pt-10  text-center">No bookmarks yet.</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-lg mb-6 text-pink-600 uppercase">
        Your Bookmarked Articles
      </h1>
      <div className="space-y-6">
        {bookmarks.map((post, index) => (
          <article
            key={`${post.slug}-${index}`}
            className=" border-b border-gray-700 pb-4"
          >
            <h2>
              <Link
                href={`/${post.category}/${post.slug}`}
                className="text-xl   font-bold hover:underline"
              >
                {post.frontMatter.title}
              </Link>
            </h2>
            <p className="">{post.frontMatter.description}</p>
            <button
              onClick={() => handleRemove(post.slug)}
              className="mt-2 text-sm text-red-400  hover:underline"
            >
              Remove Bookmark
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
