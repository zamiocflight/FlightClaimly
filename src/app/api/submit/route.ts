import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Claim } from '@/types/claim';

export async function POST(request: Request) {
  const incoming = await request.json();

  // Validera minimalt
  const required = ['flightNumber', 'date', 'from', 'to', 'name', 'email', 'bookingNumber'] as const;
  for (const key of required) {
    if (!incoming[key]) {
      return NextResponse.json({ error: `Saknar fält: ${key}` }, { status: 400 });
    }
  }

  const newClaim: Claim = {
    flightNumber: String(incoming.flightNumber),
    date: String(incoming.date),
    from: String(incoming.from),
    to: String(incoming.to),
    name: String(incoming.name),
    email: String(incoming.email),
    bookingNumber: String(incoming.bookingNumber),
    receivedAt: new Date().toISOString(),
    status: incoming.status ? String(incoming.status) : 'Obehandlad',
  };

  const filePath = path.join(process.cwd(), 'claims.json');

  try {
    const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '[]';
    const claims: Claim[] = JSON.parse(fileData);
    claims.push(newClaim);
    fs.writeFileSync(filePath, JSON.stringify(claims, null, 2));
    return NextResponse.json({ message: 'Claim sparad ✅' });
  } catch (error) {
    console.error('💥 Fel vid filhantering:', error);
    return NextResponse.json({ error: 'Något gick fel vid sparande' }, { status: 500 });
  }
}
