// src/app/api/claims/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { addClaim } from '@/lib/claims';
import { sendStatusEmail } from '@/lib/statusEmail';

type Lang = 'sv' | 'en';

function detectLocale(req: Request, bodyLocale?: unknown): Lang {
  // 1) body.locale (bäst om ni skickar från UI)
  if (
    typeof bodyLocale === 'string' &&
    (bodyLocale === 'sv' || bodyLocale === 'en')
  ) {
    return bodyLocale;
  }

  // 2) referer /sv/... eller /en/...
  const referer = req.headers.get('referer') || '';
  const m = referer.match(/\/(sv|en)(\/|$)/);
  if (m?.[1] === 'sv' || m?.[1] === 'en') return m[1];

  // 3) accept-language (grov fallback)
  const al = (req.headers.get('accept-language') || '').toLowerCase();
  if (al.includes('sv')) return 'sv';

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

    // tracking-id (uuid)
    const id = crypto.randomUUID();

    // Spara claim
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

    // (valfritt men nice för UI/debug)
    const base =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.headers.get('origin') ||
      'http://localhost:3000';
    const trackingUrl = `${String(base).replace(/\/$/, '')}/${locale}/track/${claim.id}`;

    // ✅ Skicka bekräftelsemail med SAMMA snygga template (non-blocking)
    try {
      const ok = await sendStatusEmail({
        id: claim.id,
        email: String(email).toLowerCase(),
        name,
        status: 'new',
        flightNumber,
        from,
        to,
        flightDate: date,
        lang: locale,
      });

      console.log('✅ Onboarding-mail skickat:', { ok, to: email, trackingUrl });
    } catch (mailErr) {
      console.error('❌ Kunde inte skicka onboarding-mail (claim sparad ändå):', mailErr);
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
