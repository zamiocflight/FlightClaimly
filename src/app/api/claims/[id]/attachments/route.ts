// src/app/api/claims/[id]/attachments/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
    const params = await ctx.params;
    const incomingId = Array.isArray((params as any).id) ? (params as any).id[0] : params.id;

    if (!incomingId) {
      return NextResponse.json({ error: 'Missing claim id' }, { status: 400 });
    }

    console.log('UPLOAD CLAIM ID:', incomingId);

    const sb = supabaseAdmin();

    const formData = await req.formData();
    const fileEntries = formData.getAll('files');

    if (!fileEntries || fileEntries.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    // 🔥 Viktigt: hitta claim via id ELLER received_at
let row: any = null;
let readErr: any = null;

// 1) Försök hitta på id först
{
  const res = await sb
    .from('claims')
    .select('received_at, attachments')
    .eq('received_at', incomingId)
    .maybeSingle();

  row = res.data;
  readErr = res.error;
}

// 2) Om inte hittad, försök på received_at
if (!row) {
  const res = await sb
    .from('claims')
    .select('id, received_at, attachments')
    .eq('received_at', incomingId)
    .maybeSingle();

  row = res.data;
  readErr = res.error;
}

if (readErr || !row) {
  console.error('Claim lookup failed', { incomingId, readErr, row });
  return NextResponse.json(
    { error: 'Claim not found for this id' },
    { status: 404 }
  );
}

    const existing = Array.isArray(row.attachments) ? row.attachments : [];
    const now = new Date().toISOString();

    const uploadedFiles: Array<{
      path: string;
      filename: string;
      size: number;
      contentType: string;
    }> = [];

    for (const entry of fileEntries) {
      if (!(entry instanceof File)) continue;

      const originalName = entry.name || "file";

// 🔥 SANITIZE filename (kritisk fix)
const safeName = originalName
  .normalize("NFKD")
  .replace(/[^\w.\-]/g, "_"); // tar bort åäö, spaces, etc
      const fileName = `${Date.now()}-${safeName}`;
      const filePath = `claims/${incomingId}/${fileName}`;

      const { error: uploadError } = await sb.storage
        .from('attachments')
        .upload(filePath, entry, {
          contentType: entry.type || 'application/octet-stream',
          upsert: false,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
      }

      uploadedFiles.push({
        path: filePath,
        filename: safeName,
        size: entry.size,
        contentType: entry.type || 'application/octet-stream',
      });
    }

   const newFiles = uploadedFiles.map((f) => ({
  path: f.path,
  filename: f.filename,
  size: f.size,
  contentType: f.contentType,
  uploadedAt: now,
}));

// 🔥 merge + dedupe (fixar overwrite-buggen)
const map = new Map();

[...existing, ...newFiles].forEach((f) => {
  map.set(f.path, f);
});

const next = Array.from(map.values());

    // 🔥 Uppdatera samma rad med samma identifierare som faktiskt matchade
  const { error: updErr } = await sb
  .from('claims')
  .update({ attachments: next, updated_at: now })
  .eq('received_at', row.received_at);

    if (updErr) {
      console.error('Update attachments failed:', updErr);
      return NextResponse.json(
        { error: 'Failed to update claim attachments' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ok: true, count: uploadedFiles.length },
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