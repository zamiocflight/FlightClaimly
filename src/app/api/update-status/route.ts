import { NextResponse } from 'next/server';
import { getClaimById, updateClaimStatus, type Claim } from '@/lib/claims';
import { sendStatusEmail } from '@/lib/statusEmail';

type AllowedStatus =
  | 'new'
  | 'processing'
  | 'sent_to_airline'
  | 'paid_out'
  | 'rejected';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body as { id?: string; status?: string };

    console.log('🔵 API fick ID:', JSON.stringify(id), 'status:', status);

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing id or status' },
        { status: 400 },
      );
    }

    const internal = normalizeStatusInput(status) as AllowedStatus;

    // 1) Finns ärendet i DB?
    const existing = await getClaimById(id);
    if (!existing) {
      console.error('❌ Claim not found in DB for id:', id);
      return NextResponse.json(
        { error: 'Claim not found' },
        { status: 404 },
      );
    }

    // 2) Uppdatera status i DB
    const updated: Claim = await updateClaimStatus(id, internal);

    // Viktigt: tracking-ID = receivedAt (det som används i claims.json / public-API)
    const trackingId = String(updated.receivedAt ?? id);

    console.log('🔍 update-status tracking-id', {
      requestId: id,
      trackingId,
      receivedAt: updated.receivedAt,
    });

    // 3) Försök skicka statusmail via vår helper
    let emailSent = false;
    if (updated.email) {
      try {
        await sendStatusEmail({
          id: trackingId, // 👈 detta hamnar i /track/[id]
          email: updated.email,
          name: updated.name,
          status: internal as any, // matchar StatusCode i statusEmail.ts
          flightNumber: updated.flightNumber,
          from: updated.from,
          to: updated.to,
          flightDate: (updated as any).date ?? null,
          // publicToken kan kopplas på senare om vi vill ha ?t=...
          lang: 'sv',
        });
        emailSent = true;
      } catch (err) {
        emailSent = false;
        console.error('Kunde inte skicka statusmail:', err);
      }
    }

    return NextResponse.json(
      { ok: true, claim: updated, emailSent },
      { status: 200 },
    );
  } catch (err) {
    console.error('Error in /api/update-status:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

function normalizeStatusInput(status: string): AllowedStatus {
  const s = status.toLowerCase().trim();

  if (
    s === 'new' ||
    s === 'processing' ||
    s === 'sent_to_airline' ||
    s === 'paid_out' ||
    s === 'rejected'
  ) {
    return s;
  }

  if (s.includes('klar') || s.includes('utbetald')) return 'paid_out';
  if (s.includes('under behandling')) return 'processing';
  if (s.includes('skickat')) return 'sent_to_airline';
  if (s.includes('avslag')) return 'rejected';
  if (s.includes('obehandlad')) return 'new';

  return 'new';
}
