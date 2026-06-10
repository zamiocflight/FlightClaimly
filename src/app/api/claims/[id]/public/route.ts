// src/app/api/claims/[id]/public/route.ts
import { NextResponse } from 'next/server';
import { getClaimById } from '@/lib/claims';

type PublicClaim = {
  id: string;
  status: string;
  flightNumber: string;
  from: string;
  to: string;
  date: string | null;
  bookingNumber: string;
  receivedAt: string;
  attachmentsSummary?: { filename: string; uploadedAt: string }[];
  sentToAirlineAt?: string | null; // 👈 NYTT FÄLT UT TILL FRONTEND
};

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Next 15: params är en Promise → vänta in den
    const { id: rawId } = await context.params;
    const id = decodeURIComponent(rawId).trim();

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const url = new URL(req.url);
    const tokenParam = url.searchParams.get('t') || undefined;

    // Hämta direkt från Supabase via lib/claims
    const claim = await getClaimById(id);

    if (!claim) {
      console.warn('[public-claim] Ingen claim hittades för id:', id);
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Token är frivillig – men om båda finns, verifiera
    const claimToken =
      (claim as any).publicToken ??
      (claim as any).viewerToken ??
      undefined;

    if (claimToken && tokenParam && tokenParam !== claimToken) {
      console.warn('[public-claim] Token mismatch', { id, tokenParam });
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    console.log('[public-claim] Hittade claim:', {
      id: (claim as any).id,
      receivedAt: claim.receivedAt,
      status: claim.status,
      flightNumber: claim.flightNumber,
      sentToAirlineAt: (claim as any).sentToAirlineAt ?? null,
    });

    const publicClaim: PublicClaim = {
      id: (claim as any).id?.toString() ?? claim.receivedAt,
      status: normalizeStatusFromStore(claim.status),
      flightNumber: claim.flightNumber || '',
      from: claim.from || '',
      to: claim.to || '',
      date: (claim as any).date ?? null,
      bookingNumber: claim.bookingNumber || '',
      receivedAt: claim.receivedAt || '',
      attachmentsSummary: (claim.attachments ?? []).map((a: any) => ({
  filename:
    a.filename?.trim() ||
    (a.path?.includes('authority')
      ? 'Authority.pdf'
      : 'Uploaded document'),
  uploadedAt: a.uploadedAt,
})),
      sentToAirlineAt: (claim as any).sentToAirlineAt ?? null,
    };

    return NextResponse.json(publicClaim, { status: 200 });
  } catch (err) {
    console.error('Error in /api/claims/[id]/public:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

function normalizeStatusFromStore(status: string): string {
  if (!status) return 'new';

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
