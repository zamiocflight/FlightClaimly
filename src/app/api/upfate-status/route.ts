import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const { index, newStatus } = await req.json();

  const filePath = path.join(process.cwd(), 'claims.json');
  const fileData = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, 'utf8')
    : '[]';

  const claims = JSON.parse(fileData);
  if (claims[index]) {
    claims[index].status = newStatus;
    fs.writeFileSync(filePath, JSON.stringify(claims, null, 2));
  }

  return NextResponse.json({ success: true });
}
