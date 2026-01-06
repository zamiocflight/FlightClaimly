// src/app/api/precheck/route.ts
import { NextResponse } from 'next/server';
import { precheckStub } from '@/lib/precheck';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { from, to, date, flightNumber } = body as {
      from?: string;
      to?: string;
      date?: string;
      flightNumber?: string;
    };

    if (!from || !to || !date || !flightNumber) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Saknar fält',
          details: { required: ['from', 'to', 'date', 'flightNumber'] },
        },
        { status: 400 }
      );
    }

    // 🔹 Försök läsa locale (från referer eller header)
    const referer = req.headers.get('referer') || '';
    const localeMatch = referer.match(/\/(sv|en)\//);
    const locale = localeMatch?.[1] ?? 'en';

    const out = precheckStub({ from, to, date, flightNumber });

    const amount = (out as any).amount ?? (out as any).payoutHint ?? null;
    const reason = out.reason ?? 'Indikativ bedömning';
    const eligible = !!out.eligible;

    return NextResponse.json({
      ok: true,
      eligible,
      reason,
      amount,
      amountHint: amount,
      locale, // 🔹 VIKTIGT: skickas vidare till submit
    });
  } catch (e) {
    console.error('POST /precheck error', e);
    return NextResponse.json({ ok: false, error: 'Serverfel' }, { status: 500 });
  }
}
