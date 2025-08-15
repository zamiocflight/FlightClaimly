import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'claims.json');

  try {
    const fileData = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf8')
      : '[]';

    const claims = JSON.parse(fileData);
    return NextResponse.json(claims);
  } catch (error) {
    console.error('💥 Kunde inte läsa claims:', error);
    return NextResponse.json(
      { error: 'Något gick fel vid läsning' },
      { status: 500 }
    );
  }
}
