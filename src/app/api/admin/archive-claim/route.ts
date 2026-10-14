import { cookies } from 'next/headers';
import { validAdminSession } from '@/lib/adminSession';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  const cookie = (await cookies()).get('admin_session')?.value;
  if (!(await validAdminSession(cookie, process.env.ADMIN_PASSWORD))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const sb = supabaseAdmin();

    const { error } = await sb
      .from('claims')
      .update({ archived_at: new Date().toISOString() })
      .eq('received_at', id);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('archive-claim error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
