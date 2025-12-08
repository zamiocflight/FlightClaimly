// src/app/api/precheck/route.ts
import { NextResponse } from 'next/server';
import { precheckStub } from '@/lib/precheck';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { from, to, date, flightNumber } = body as {
      from?: string; to?: string; date?: string; flightNumber?: string;
    };

    // Minimal validering
    if (!from || !to || !date || !flightNumber) {
      return NextResponse.json(
        { ok: false, error: 'Saknar fält', details: { required: ['from', 'to', 'date', 'flightNumber'] } },
        { status: 400 }
      );
    }

    // Enkel proxy till vår stub (enda sanningskällan)
    const out = precheckStub({ from, to, date, flightNumber });

    // Normalisera fältnamn så de matchar övrig kod
    const amount = (out as any).amount ?? (out as any).payoutHint ?? null;
    const reason = out.reason ?? 'Indikativ bedömning';
    const eligible = !!out.eligible;

    // Skicka både `amount` och `amountHint` för bakåtkompatibilitet i UI
    return NextResponse.json({
      ok: true,
      eligible,
      reason,
      amount,
      amountHint: amount,
    });
  } catch (e) {
    console.error('POST /precheck error', e);
    return NextResponse.json({ ok: false, error: 'Serverfel' }, { status: 500 });
  }
}
