import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Claim } from '@/types/claim';

export async function POST(request: Request) {
  const { index, newStatus } = await request.json();

  if (typeof index !== 'number' || !newStatus) {
    return NextResponse.json({ error: 'index (number) och newStatus krävs' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'claims.json');

  try {
    const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '[]';
    const claims: Claim[] = JSON.parse(fileData);

    if (index < 0 || index >= claims.length) {
      return NextResponse.json({ error: 'Ogiltigt index' }, { status: 400 });
    }

    claims[index].status = String(newStatus);
    fs.writeFileSync(filePath, JSON.stringify(claims, null, 2));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('💥 Status-uppdatering misslyckades:', error);
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
