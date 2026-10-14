import { cookies } from 'next/headers';
import { validAdminSession } from '@/lib/adminSession';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const cookie = (await cookies()).get('admin_session')?.value;
  if (!(await validAdminSession(cookie, process.env.ADMIN_PASSWORD))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const sb = supabaseAdmin();

    const { data, error } = await sb
      .from('claims')
      .select('*')
      .not('archived_at', 'is', null)
      .order('archived_at', { ascending: false });

    if (error) throw error;

    const normalized =
      (data ?? []).map((c: any, i: number) => {
        const stableId =
          c.id ??
          c.receivedAt ??
          c.received_at ??
          c.createdAt ??
          c.created_at ??
          `arch-${i}`;

        return {
          ...c,
          id: stableId,
          receivedAt: c.receivedAt ?? c.received_at ?? stableId,
        };
      });

    return NextResponse.json(normalized);
  } catch (err) {
    console.error('Error in /api/admin/archived-claims:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
