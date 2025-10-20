import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getClaims } from '@/lib/claims';

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string; filename: string }> }
) {
  try {
    const { id, filename } = await ctx.params;
    if (!id || !filename) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Verifiera att filen verkligen tillhör claimet
    const claims = await getClaims();
    const claim = claims.find(c => c.receivedAt === id || (c as any).id === id);
    if (!claim) return NextResponse.json({ error: 'Claim not found' }, { status: 404 });

    const att = (claim.attachments || []).find(a => a.filename === filename);
    if (!att) return NextResponse.json({ error: 'File not found' }, { status: 404 });

    // Begränsa sökväg till vår uploads-katalog
    const uploadsRoot = path.join(process.cwd(), 'src', 'data', 'uploads');
    const filePath = path.join(uploadsRoot, id, filename);
    if (!filePath.startsWith(path.join(uploadsRoot, id))) {
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
