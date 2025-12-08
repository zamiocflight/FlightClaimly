// src/app/api/claims/route.ts
import { NextResponse } from 'next/server';
import { addClaim } from '@/lib/claims';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      flightNumber,
      date,
      from,
      to,
      name,
      email,
      bookingNumber,
      phone,
    } = body ?? {};

    // Enkel validering (samma som innan)
    if (
      !flightNumber ||
      !date ||
      !from ||
      !to ||
      !name ||
      !email ||
      !bookingNumber
    ) {
      return NextResponse.json(
        {
          error:
            'Saknar nödvändig information. Fyll i flygnummer, datum, från, till, namn, e-post och bokningsnummer.',
        },
        { status: 400 }
      );
    }

    // Generera tracking-id (uuid)
    const id = crypto.randomUUID();

    // Kör Supabase-insert via vårt bibliotek
    const claim = await addClaim({
      id,
      flightNumber,
      date,
      from,
      to,
      name,
      email,
      bookingNumber,
      phone: phone ?? null,
    });

    console.log('✅ /api/claims – NYTT ärende skapat i Supabase:', claim);

    // Dummy-precheck (samma som innan)
    const precheck = {
      eligible: true,
      reason: 'Preliminär bedömning: flyget kan vara ersättningsberättigat enligt EU261.',
      amount: 400,
      amountHint: 400,
    };

    return NextResponse.json({
      id: claim.id,
      precheck,
    });
  } catch (err) {
    console.error('❌ ERROR i /api/claims:', err);
    return NextResponse.json(
      { error: 'Internt fel när ärendet skulle sparas.' },
      { status: 500 }
    );
  }
}
