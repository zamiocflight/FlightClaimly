import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { validAdminSession } from '@/lib/adminSession';
import { getClaimById } from '@/lib/claims';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Admin-only, short-lived document redirect. Never use public storage URLs.
export async function GET(req: NextRequest) {
  const cookie = (await cookies()).get('admin_session')?.value;
  if (!(await validAdminSession(cookie, process.env.ADMIN_PASSWORD))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get('id');
  const path = req.nextUrl.searchParams.get('path');
  if (!id || !path || path.includes('..') || path.startsWith('/') || path.includes('\\')) {
    return NextResponse.json({ error: 'Invalid document request' }, { status: 400 });
  }

  const claim = await getClaimById(id);
  if (!claim) return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
  const authorized = Array.isArray(claim.attachments) &&
    claim.attachments.some((item: { path?: string }) => item?.path === path);
  if (!authorized) return NextResponse.json({ error: 'Document not in claim' }, { status: 404 });

  const { data, error } = await supabaseAdmin().storage
    .from('attachments').createSignedUrl(path, 60);
  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: 'Document missing or unavailable' }, { status: 404 });
  }
  return NextResponse.redirect(data.signedUrl, {
    status: 302,
    headers: { 'Cache-Control': 'private, no-store' },
  });
}
