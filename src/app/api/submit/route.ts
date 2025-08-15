import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const newClaim = await request.json();
  console.log('🔍 API-route körs, ny claim:', newClaim);

  const filePath = path.join(process.cwd(), 'claims.json');
  console.log('📁 Filväg till claims.json:', filePath);

  try {
    const fileData = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf8')
      : '[]';

    const claims = JSON.parse(fileData);

    claims.push({
  ...newClaim,
  receivedAt: new Date().toISOString(),
  status: 'Obehandlad', // 👈 Lägg till statusfält
});


    console.log('✏️ Försöker skriva fil...');
    fs.writeFileSync(filePath, JSON.stringify(claims, null, 2));
    console.log('✅ Fil sparad!');

    return NextResponse.json({ message: 'Claim sparad ✅' });
  } catch (error) {
    console.error('💥 Fel vid filhantering:', error);
    return NextResponse.json(
      { error: 'Något gick fel vid sparande' },
      { status: 500 }
    );
  }
}
