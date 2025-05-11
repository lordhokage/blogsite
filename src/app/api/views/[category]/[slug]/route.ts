// src/app/api/views/[category]/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ category: string; slug: string }> }
) {
  const { category, slug } = await context.params;

  try {
    const { data: existing, error: fetchError } = await supabase
      .from('views')
      .select('*')
      .eq('category', category)
      .eq('slug', slug)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (existing) {
      const { error: updateError } = await supabase
        .from('views')
        .update({ count: existing.count + 1 })
        .eq('category', category)
        .eq('slug', slug);

      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabase
        .from('views')
        .insert({ category, slug, count: 1 });

      if (insertError) throw insertError;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('View count update error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ category: string; slug: string }> }
) {
  const { category, slug } = await context.params;

  try {
    const { data, error } = await supabase
      .from('views')
      .select('count')
      .eq('category', category)
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json({ count: 0 }, { status: 500 });
    }

    const count = data?.count ?? 0;

    return NextResponse.json({ count });
  } catch (err) {
    console.error('Unexpected error fetching view count:', err);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
