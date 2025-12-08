// src/app/api/claims/[id]/attachments/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type IncomingFile = {
  filename: string;
  size: number;
  path: string;
  contentType?: string;
};

type Claim = {
  flightNumber: string;
  date?: string | null;
  from: string;
  to: string;
  name: string;
  email: string;
  bookingNumber: string;
  receivedAt: string; // används som "id"
  status?: string;
  publicToken?: string;
  connections?: string[];
  attachments?: IncomingFile[];
  attachmentsSummary?: { filename: string; uploadedAt: string }[];
  [key: string]: any;
};

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.files)) {
      return NextResponse.json(
        { error: 'Missing files array in body' },
        { status: 400 }
      );
    }

    const files = body.files as IncomingFile[];

    const filePath = path.join(process.cwd(), 'claims.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'claims.json not found' },
        { status: 500 }
      );
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const claims = (JSON.parse(raw) as Claim[]) || [];

    // Hitta rätt claim via receivedAt (det id vi skickar från frontend)
    const idx = claims.findIndex((c) => c.receivedAt === id);
    if (idx === -1) {
      return NextResponse.json(
        { error: 'Claim not found for this id' },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();

    // Lägg till rå-metadata (för admin / internt)
    const existingAttachments = Array.isArray(claims[idx].attachments)
      ? claims[idx].attachments!
      : [];
    const nextAttachments = existingAttachments.concat(files);

    // Lägg till enklare summary (för tracking-sidan)
    const existingSummary = Array.isArray(claims[idx].attachmentsSummary)
      ? claims[idx].attachmentsSummary!
      : [];

    const newSummary = files.map((f) => ({
      filename: f.filename,
      uploadedAt: now,
    }));

    claims[idx].attachments = nextAttachments;
    claims[idx].attachmentsSummary = existingSummary.concat(newSummary);

    fs.writeFileSync(filePath, JSON.stringify(claims, null, 2), 'utf8');

    return NextResponse.json(
      {
        ok: true,
        count: files.length,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error('Attachment metadata error (file-based):', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
