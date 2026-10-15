// src/app/api/claims/[id]/attachments/presign/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { filename, contentType, viewerToken } = await req.json();

    if (!id || !filename || typeof filename !== 'string' || filename.length > 180 || !/^[0-9a-f-]{36}$/i.test(id)) {
      return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 });
    }

    const sb = supabaseAdmin();
    const { data: claim, error: claimError } = await sb.from('claims').select('received_at, viewer_token').eq('received_at', id).maybeSingle();
    if (claimError || !claim) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
    if (!claim.viewer_token || viewerToken !== claim.viewer_token) return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });

    // Sanera filnamn — inga snedstreck eller konstiga tecken
    const clean = String(filename).replace(/[^A-Za-z0-9._-]/g, '_');
    if (!clean || clean === "." || clean === ".." || !["application/pdf","image/jpeg","image/png"].includes(contentType)) {
      return NextResponse.json({ error: 'UNSUPPORTED_FILE_TYPE' }, { status: 400 });
    }
    const path = `claims/${id}/${Date.now()}-${crypto.randomUUID()}-${clean}`;

    const { data, error } = await sb.storage
      .from('attachments')
      .createSignedUploadUrl(path);

    if (error || !data?.signedUrl) {
      console.error('presign error', error);
      return NextResponse.json({ error: 'PRESIGN_FAILED' }, { status: 500 });
    }

    return NextResponse.json({
      url: data.signedUrl,     // PUT direkt till denna
      path,                    // spara i DB sen
      contentType: contentType || 'application/octet-stream',
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'SERVER_ERROR' }, { status: 500 });
  }
}
