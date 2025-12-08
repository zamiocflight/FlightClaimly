export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { addClaim } from '@/lib/claims';
import { z } from 'zod';

const CreateSchema = z.object({
  flightNumber: z.string().min(2),
  date: z.string().min(4),
  from: z.string().min(2),
  to: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  bookingNumber: z.string().min(2),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const parsed = CreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload', details: parsed.error.flatten() }, { status: 400 });
    }
    const claim = await addClaim(parsed.data);
    return NextResponse.json({ ok: true, claim }, { status: 201 });
  } catch (e) {
    console.error('submit route error', e);
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
