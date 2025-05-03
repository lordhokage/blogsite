'use client';
// useViews.ts
import { useEffect } from 'react';

export function useTrackViews(slug: string) {
  useEffect(() => {
    fetch(`/api/article/${slug}/views`, { method: 'POST' });
  }, [slug]);
}

export async function getLikesAndViews(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles?slug=eq.${slug}`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    }
  );
  return res.json();
}
