'use client';
import { useState, useEffect } from 'react';
import { useTrackViews, getLikesAndViews } from '@/hooks/useViews';

export default function ArticleMeta({ slug }: { slug: string }) {
  useTrackViews(slug);
  const [data, setData] = useState<{ views: number; likes: number }>({
    views: 0,
    likes: 0,
  });

  useEffect(() => {
    getLikesAndViews(slug).then((res) => {
      if (res.length > 0) {
        setData(res[0]);
      }
    });
  }, [slug]);

  return (
    <div className="flex items-center gap-4">
      <span>{data.views} views</span>
    </div>
  );
}
