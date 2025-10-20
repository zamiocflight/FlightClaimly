// src/app/api/submit/route.ts
import { NextResponse } from 'next/server';
import { readClaims, writeClaims } from '@/lib/claims';
import { Claim } from '@/types/claim';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const required = ['flightNumber','date','from','to','name','email','bookingNumber'] as const;
    for (const k of required) {
      if (!body[k]) {
        return NextResponse.json({ error: `Saknar fält: ${k}` }, { status: 400 });
      }
    }

    const newClaim: Claim = {
      flightNumber: String(body.flightNumber).trim(),
      date: String(body.date).trim(),
      from: String(body.from).trim(),
      to: String(body.to).trim(),
      name: String(body.name).trim(),
      email: String(body.email).trim(),
      bookingNumber: String(body.bookingNumber).trim(),
      receivedAt: new Date().toISOString(),
      status: 'Obehandlad', // ✅ default
    };

    const claims = readClaims();
    claims.push(newClaim);
    writeClaims(claims);

    return NextResponse.json({ success: true, claim: newClaim }, { status: 201 });
  } catch (err) {
    console.error('💥 submit error:', err);
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
