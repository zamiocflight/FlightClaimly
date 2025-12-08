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
    const { filename, contentType } = await req.json();

    if (!id || !filename) {
      return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 });
    }

    // Sanera filnamn — inga snedstreck eller konstiga tecken
    const clean = String(filename).replace(/[^A-Za-z0-9._-]/g, '_');
    const path = `${id}/${Date.now()}-${clean}`;

    const sb = supabaseAdmin();
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
