// src/app/api/claims/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getClaims, addClaim } from '@/lib/claims';
import { sendMail } from '@/lib/mailer';

const CreateSchema = z.object({
  flightNumber: z.string().min(2),
  date: z.string().min(4),
  from: z.string().min(2),
  to: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  bookingNumber: z.string().min(2),
});

// GET /api/claims
export async function GET() {
  try {
    const claims = await getClaims();
    return NextResponse.json(claims);
  } catch (error) {
    console.error('💥 Failed to read claims:', error);
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}

// POST /api/claims
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

    const claim = await addClaim(parsed.data);

    // Skicka ETT mail till kund, BCC till admin för att undvika rate limit
    const adminTo = process.env.ADMIN_EMAIL || process.env.FROM_EMAIL || parsed.data.email;

    try {
      const r = await sendMail({
        to: parsed.data.email,
        bcc: adminTo,
        subject: 'Vi har mottagit din ersättningsförfrågan',
        text:
`Hej ${parsed.data.name},

Vi har mottagit ditt ärende och börjar handlägga det.
Ärende-ID: ${claim.receivedAt}

Flyg: ${parsed.data.flightNumber} ${parsed.data.from} → ${parsed.data.to}
Datum: ${parsed.data.date}
Bokningsnummer: ${parsed.data.bookingNumber}

Vi hör av oss om vi behöver mer information.

Vänliga hälsningar,
FlightClaimly`,
      });
      if ((r as any)?.skipped) console.log('[mail] SKIPPED (no SMTP)');
      else console.log('[mail] skickat', (r as any)?.messageId || '');
    } catch (e) {
      console.warn('[mail] utskick misslyckades:', e);
    }

    return NextResponse.json({ ok: true, claim }, { status: 201 });
  } catch (e) {
    console.error('💥 Create claim error:', e);
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
