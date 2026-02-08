// src/app/api/claims/[id]/attachments/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type IncomingFile = {
  filename: string;
  size: number;
  path: string; // "<claimId>/<filename>"
  contentType?: string;
};

function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE;

  if (!url || !serviceKey) {
    throw new Error(
      'Missing Supabase env vars (SUPABASE_URL or SUPABASE_SERVICE_ROLE)'
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    if (!id) {
      return NextResponse.json({ error: 'Missing claim id' }, { status: 400 });
    }

    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.files)) {
      return NextResponse.json(
        { error: 'Missing files array in body' },
        { status: 400 }
      );
    }

    const files = body.files as IncomingFile[];
    const sb = supabaseAdmin();

    // ✅ RÄTT: slå upp claim på id
    const { data: row, error: readErr } = await sb
      .from('claims')
      .select('attachments')
      .eq('id', id)
      .single();

    if (readErr || !row) {
      return NextResponse.json(
        { error: 'Claim not found for this id' },
        { status: 404 }
      );
    }

    const existing = Array.isArray(row.attachments) ? row.attachments : [];
    const now = new Date().toISOString();

    const next = existing.concat(
      files.map((f) => ({
        path: f.path,
        filename: f.filename,
        size: f.size,
        contentType: f.contentType ?? null,
        uploadedAt: now,
      }))
    );

    const { error: updErr } = await sb
      .from('claims')
      .update({ attachments: next, updated_at: now })
      .eq('id', id);

    if (updErr) {
      return NextResponse.json(
        { error: 'Failed to update claim attachments' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ok: true, count: files.length },
      { status: 200 }
    );
  } catch (e: any) {
    console.error('Attachments route error:', e);
    return NextResponse.json(
      { error: 'Server error', details: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
