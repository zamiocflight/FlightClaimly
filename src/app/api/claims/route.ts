// src/app/api/claims/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { addClaim } from '@/lib/claims';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function detectLocale(req: Request, bodyLocale?: unknown) {
  // 1) body.locale (bäst om ni skickar från UI)
  if (typeof bodyLocale === 'string' && (bodyLocale === 'sv' || bodyLocale === 'en')) {
    return bodyLocale;
  }

  // 2) referer /sv/... eller /en/...
  const referer = req.headers.get('referer') || '';
  const m = referer.match(/\/(sv|en)(\/|$)/);
  if (m?.[1]) return m[1];

  // 3) accept-language (grov fallback)
  const al = req.headers.get('accept-language') || '';
  if (al.toLowerCase().includes('sv')) return 'sv';

  return 'en';
}

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
      locale: bodyLocale,
    } = body ?? {};

    if (!flightNumber || !date || !from || !to || !name || !email || !bookingNumber) {
      return NextResponse.json(
        {
          error:
            'Saknar nödvändig information. Fyll i flygnummer, datum, från, till, namn, e-post och bokningsnummer.',
        },
        { status: 400 }
      );
    }

    const locale = detectLocale(req, bodyLocale);

    // Generera tracking-id (uuid)
    const id = crypto.randomUUID();

    // Spara claim (locale sparas inte här än – kräver addClaim/tabell)
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

    // Bygg tracking-url korrekt
    const base =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.headers.get('origin') ||
      'http://localhost:3000';

    const trackingUrl = `${String(base).replace(/\/$/, '')}/${locale}/track/${claim.id}`;

    // Skicka bekräftelsemail (non-blocking fail: vi vill inte faila claimen om mail strular)
    try {
      const res = await resend.emails.send({
        from: 'FlightClaimly <onboarding@resend.dev>',
        to: String(email).toLowerCase(),
        subject: 'Vi har tagit emot ditt ärende – följ status här',
        html: `
          <p>Hej ${name},</p>
          <p>Vi har tagit emot ditt ärende hos FlightClaimly.</p>
          <p>Du kan följa status här:</p>
          <p><a href="${trackingUrl}">${trackingUrl}</a></p>
          <p>Vänliga hälsningar,<br/>FlightClaimly</p>
        `,
      });

      console.log('✅ Bekräftelsemail skickat:', { to: email, trackingUrl, id: res?.data?.id });
    } catch (mailErr) {
      console.error('❌ Kunde inte skicka bekräftelsemail (claim sparad ändå):', mailErr);
    }

    // Dummy-precheck (som innan)
    const precheck = {
      eligible: true,
      reason: 'Preliminär bedömning: flyget kan vara ersättningsberättigat enligt EU261.',
      amount: 400,
      amountHint: 400,
    };

    return NextResponse.json({
      id: claim.id,
      precheck,
      // kan vara nice för UI/debug:
      trackingUrl,
      locale,
    });
  } catch (err) {
    console.error('❌ ERROR i /api/claims:', err);
    return NextResponse.json(
      { error: 'Internt fel när ärendet skulle sparas.' },
      { status: 500 }
    );
  }
}
