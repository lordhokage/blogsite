'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getBookmarks,
  saveBookmark,
  removeBookmark,
  isBookmarked,
} from '@/lib/bookmark';
import { BookmarkPlus, BookmarkCheck } from 'lucide-react';

export default function ArticlesList({ posts }) {
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState([]);

  useEffect(() => {
    const bookmarks = getBookmarks().map((post) => post.slug);
    setBookmarkedSlugs(bookmarks);
  }, []);

  const toggleBookmark = (post) => {
    if (bookmarkedSlugs.includes(post.slug)) {
      removeBookmark(post.slug);
    } else {
      saveBookmark(post);
    }
    setBookmarkedSlugs(getBookmarks().map((post) => post.slug));
  };

  return (
    <section className="space-y-10">
      {posts.map((post, index) => (
        <article
          key={`${post.slug}-${index}`}
          className="flex flex-col prose dark:prose-invert"
        >
          <h2>
            <Link
              href={`/${post.category}/${post.slug}`}
              className="text-xl text-white dark:text-black font-bold hover:underline decoration-blue-300"
            >
              {post.frontMatter.title}
            </Link>
          </h2>
          <div>
            <p className="mt-2 text-justify">{post.frontMatter.description}</p>
            <div className="flex items-center mt-4">
              <button
                className="text-sm text-pink-400 font-semibold mr-4"
                onClick={() => toggleBookmark(post)}
              >
                {bookmarkedSlugs.includes(post.slug) ? (
                  <BookmarkCheck className="text-green-400" />
                ) : (
                  <BookmarkPlus />
                )}
              </button>
              <Link
                href={`/${post.category}/${post.slug}`}
                className="text-sm hover:text-pink-400  font-bold"
              >
                Read more
              </Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
