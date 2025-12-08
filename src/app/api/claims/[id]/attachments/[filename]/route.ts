// src/app/api/claims/[id]/attachments/[filename]/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getClaims } from '@/lib/claims';
import { uploadsRoot } from '@/lib/paths';

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string; filename: string }> }
) {
  try {
    const { id, filename } = await ctx.params;
    const claims = await getClaims();
    const claim = claims.find(c => c.receivedAt === id);
    if (!claim) return NextResponse.json({ error: 'Claim not found' }, { status: 404 });

    const att = (claim.attachments ?? []).find(a => a.filename === filename);
    if (!att) return NextResponse.json({ error: 'File not found' }, { status: 404 });

    const root = uploadsRoot();
    const filePath = path.join(root, id, filename);
    if (!filePath.startsWith(path.join(root, id))) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const buff = await fs.readFile(filePath);
    return new NextResponse(buff, {
      status: 200,
      headers: {
        'Content-Type': att.contentType || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${att.filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    console.error('GET attachment error', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
