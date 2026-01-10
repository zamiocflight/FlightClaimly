import { NextResponse } from 'next/server';
import { getClaimById, ensurePayoutToken } from '@/lib/claims';
import { sendStatusEmail } from '@/lib/statusEmail';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, lang } = body as { id?: string; lang?: 'sv' | 'en' };

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const claim = await getClaimById(id);
    if (!claim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
    }

    if (!claim.email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    // skapa / återanvänd token
    const { token } = await ensurePayoutToken(id);

    // skicka “approved”-mailet igen (payout-länken bygger på publicToken=t)
    const ok = await sendStatusEmail({
      id,
      email: claim.email,
      name: claim.name,
      status: 'approved' as any,
      flightNumber: claim.flightNumber,
      from: claim.from,
      to: claim.to,
      flightDate: (claim as any).date ?? null,
      publicToken: token,
      lang: lang ?? 'sv',
    });

    if (!ok) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Error in /api/admin/resend-payout-link:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
