// /app/api/view/route.ts
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { slug } = await req.json();
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';

  await supabase
    .from('views')
    .insert([{ slug, ip_address: ip, user_agent: userAgent }]);

  return new Response('OK');
}
