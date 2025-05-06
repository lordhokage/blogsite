// /app/api/like/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { slug } = await req.json();

  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || req.ip || '127.0.0.1'; // fallback for localhost

  const { data, error } = await supabase.rpc('toggle_like', {
    article_slug: slug,
    user_ip: ip,
  });

  if (error) {
    console.error('Supabase RPC error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ likes: data });
}
