// app/api/article/[slug]/views/route.ts
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  return NextResponse.json({ success: true });
}
