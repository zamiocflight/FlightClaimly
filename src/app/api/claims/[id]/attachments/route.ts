import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { addAttachmentToClaim } from '@/lib/claims';
import type { Attachment } from '@/lib/claimTypes';

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const form = await req.formData();
    const files = form.getAll('files').filter(Boolean) as File[];
    if (!files.length) return NextResponse.json({ error: 'No files' }, { status: 400 });

    const uploadDir = path.join(process.cwd(), 'src', 'data', 'uploads', id);
    await fs.mkdir(uploadDir, { recursive: true });

    let saved: Attachment[] = [];

    for (const f of files) {
      const ab = await f.arrayBuffer();
      const buf = Buffer.from(ab);
      const safe = `${Date.now()}-${f.name}`.replace(/[^\w.\-]+/g, '_');
      const filePath = path.join(uploadDir, safe);
      await fs.writeFile(filePath, buf);

      const meta: Attachment = {
        filename: safe,
        size: buf.length,
        path: filePath,
        uploadedAt: new Date().toISOString(),
        contentType: f.type || undefined,
      };
      await addAttachmentToClaim(id, meta);
      saved.push(meta);
    }

    return NextResponse.json({ ok: true, savedCount: saved.length });
  } catch (e) {
    console.error('Upload error', e);
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
