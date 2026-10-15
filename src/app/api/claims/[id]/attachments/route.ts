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



    const sb = supabaseAdmin();
    const token = req.headers.get("x-claim-token");
    const { data: authorizedClaim } = await sb.from("claims").select("viewer_token").eq("received_at", incomingId).maybeSingle();
    if (!authorizedClaim?.viewer_token || authorizedClaim.viewer_token !== token) {
      return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
    }

    const contentType = req.headers.get("content-type") || "";

if (contentType.includes("application/json")) {
  const body = await req.json();
  const incomingFiles = Array.isArray(body.files) ? body.files : [];

  if (incomingFiles.length === 0) {
    return NextResponse.json({ error: "No attachment metadata" }, { status: 400 });
  }

  const { data: row, error: readErr } = await sb
    .from("claims")
    .select("received_at, attachments")
    .eq("received_at", incomingId)
    .maybeSingle();

  if (readErr || !row) {
    return NextResponse.json({ error: "Claim not found for this id" }, { status: 404 });
  }

  const existing = Array.isArray(row.attachments) ? row.attachments : [];
  const now = new Date().toISOString();

  const validFiles = incomingFiles.every((f: any) =>
    f && typeof f.path === "string" &&
    f.path.startsWith(`claims/${incomingId}/`) &&
    !f.path.includes("..") &&
    typeof f.filename === "string" &&
    f.filename.length <= 255 &&
    Number.isFinite(f.size) && f.size >= 0 && f.size <= 10 * 1024 * 1024
  );
  if (!validFiles) return NextResponse.json({ error: "Invalid attachment metadata" }, { status: 400 });

  // Only register objects that actually exist in this claim's private folder.
  // Reject reserved authority.pdf: it is created exclusively by the signing flow.
  const paths = new Set<string>();
  for (const file of incomingFiles) {
    if (file.path === `claims/${incomingId}/authority.pdf` || paths.has(file.path)) {
      return NextResponse.json({ error: "Duplicate or reserved attachment path" }, { status: 400 });
    }
    paths.add(file.path);
    const filename = file.path.slice(`claims/${incomingId}/`.length);
    if (!filename || filename.includes("/") || filename.includes("\\\\")) {
      return NextResponse.json({ error: "Invalid attachment path" }, { status: 400 });
    }
    const { data: objects, error: listError } = await sb.storage.from("attachments").list(`claims/${incomingId}`, { search: filename, limit: 100 });
    if (listError || !objects?.some((obj) => obj.name === filename && Number(obj.metadata?.size) === file.size)) {
      return NextResponse.json({ error: "Attachment object missing or size mismatch" }, { status: 409 });
    }
  }

  const newFiles = incomingFiles.map((f: any) => ({
    path: f.path,
    filename: f.filename,
    size: f.size,
    contentType: f.contentType || "application/octet-stream",
    uploadedAt: now,
  }));

  const map = new Map();

  [...existing, ...newFiles].forEach((f) => {
    map.set(f.path, f);
  });

  const next = Array.from(map.values());

  const { error: updErr } = await sb
    .from("claims")
    .update({ attachments: next, updated_at: now })
    .eq("received_at", row.received_at);

  if (updErr) {
    return NextResponse.json(
      { error: "Failed to update claim attachments" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, count: newFiles.length }, { status: 200 });
}

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
  console.error('Claim lookup failed', readErr);
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

for (const [index, entry] of fileEntries.entries()) {
      if (!(entry instanceof File)) continue;

      if (entry.size > 10 * 1024 * 1024 || entry.size === 0) {
        return NextResponse.json({ error: 'File size must be between 1 byte and 10 MB' }, { status: 413 });
      }
      const originalName = entry.name || "file";

// 🔥 SANITIZE filename (kritisk fix)
const safeName = originalName
  .normalize("NFKD")
  .replace(/[^\w.\-]/g, "_"); // tar bort åäö, spaces, etc
      const uniquePart = `${Date.now()}-${index}-${crypto.randomUUID()}`;
const fileName = `${uniquePart}-${safeName}`;
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
      { error: 'Server error' },
      { status: 500 }
    );
  }
}