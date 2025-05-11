'use client';
import { useEffect, useState } from 'react';
export default function ArticleView({
  slug,
  category,
}: {
  slug: string;
  category: string;
}) {
  const [views, setViews] = useState<number | null>(null);
  // const supabase = createClient();

  // useEffect(() => {
  //   fetch('/api/view', {
  //     method: 'POST',
  //     body: JSON.stringify({ slug }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }, [slug]);

  useEffect(() => {
    // Increment views (fire and forget)
    fetch(`/api/views/${category}/${slug}`, { method: 'POST' });

    // Get view count
    fetch(`/api/views/${category}/${slug}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch view count: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setViews(data.count))
      .catch((err) => {
        console.error('Error fetching view count:', err);
      });
  }, [category, slug]);

  return (
    <div className="flex items-center gap-4 ">
      <span className="text-black dark:text-gray-500">{views} views</span>
    </div>
  );
}
