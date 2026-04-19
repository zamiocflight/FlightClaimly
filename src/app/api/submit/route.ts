export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { addClaim } from '@/lib/claims';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const CreateSchema = z.object({
  flightNumber: z.string().min(2),
  date: z.string().min(4),
  from: z.string().min(2),
  to: z.string().min(2),
  name: z.string().min(2),
  address: z.string().optional(),
postalCode: z.string().optional(),
city: z.string().optional(),
country: z.string().optional(),
phone: z.string().optional(),
  email: z.string().email(),
  bookingNumber: z.string().min(2),
  locale: z.string().optional(), // tas emot men skickas ej till addClaim
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const parsed = CreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const locale = parsed.data.locale ?? 'en';

    // 🔹 Skapa claim (oförändrad addClaim-signatur)
    const claim = await addClaim({
  ...parsed.data,
  address: body.address,
  postalCode: body.postalCode,
  city: body.city,
  country: body.country,
  phone: body.phone,
});

    // 🔹 Läs tracking-id säkert (utan TS-antaganden)
    const claimId = (claim as any).received_at;

    if (!claimId) {
      throw new Error('Missing claim id (received_at)');
    }

    const base =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.headers.get('origin') ||
      'http://localhost:3000';

    const trackingUrl = `${base.replace(/\/$/, '')}/${locale}/track/${claimId}`;

    // 🔹 Skicka första mail direkt
    await resend.emails.send({
      from: 'FlightClaimly <onboarding@resend.dev>',
      to: parsed.data.email,
      subject: 'Vi har tagit emot ditt ärende – följ status här',
      html: `
        <p>Hej ${parsed.data.name},</p>
        <p>Vi har tagit emot ditt ärende hos FlightClaimly.</p>
        <p>Du kan följa status här:</p>
        <p><a href="${trackingUrl}">${trackingUrl}</a></p>
        <p>Vänliga hälsningar,<br/>FlightClaimly</p>
      `,
    });

    return NextResponse.json({ ok: true, claim }, { status: 201 });
  } catch (e) {
    console.error('submit route error', e);
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
