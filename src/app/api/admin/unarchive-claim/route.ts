import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const sb = supabaseAdmin();

    const { error } = await sb
      .from('claims')
      .update({ archived_at: null })
      .eq('received_at', id);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('unarchive-claim error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
