// src/app/api/update-status/route.ts
import { NextResponse } from 'next/server';
import { readClaims, writeClaims } from '@/lib/claims';
import { Claim } from '@/types/claim';

const ALLOWED = ['Obehandlad', 'Under behandling', 'Klar'];

// ✅ Test-GET så du kan se att routen lever i browsern
export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/update-status' });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, bookingNumber, receivedAt, newStatus } = body;

    if (!newStatus) return NextResponse.json({ error: 'Saknar newStatus' }, { status: 400 });
    if (!ALLOWED.includes(newStatus)) {
      return NextResponse.json({ error: `Ogiltig status: ${newStatus}` }, { status: 400 });
    }

    const claims: Claim[] = readClaims();
    if (!claims.length) return NextResponse.json({ error: 'Inga claims' }, { status: 404 });

    // 1) matcha på receivedAt (unikast), 2) fallback email+bookingNumber
    let idx = typeof receivedAt === 'string'
      ? claims.findIndex(c => c.receivedAt === receivedAt)
      : -1;
    if (idx === -1 && email && bookingNumber) {
      idx = claims.findIndex(c => c.email === email && c.bookingNumber === bookingNumber);
    }
    if (idx === -1) {
      return NextResponse.json(
        { error: 'Hittade ingen claim (receivedAt och/eller email+bookingNumber)' },
        { status: 404 }
      );
    }

    claims[idx] = { ...claims[idx], status: newStatus };
    writeClaims(claims);

    return NextResponse.json({ success: true, updated: claims[idx] });
  } catch (error) {
    console.error('💥 update-status error:', error);
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
