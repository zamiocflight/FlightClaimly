import { NextResponse } from 'next/server';
import { getClaimById } from '@/lib/claims';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const token = searchParams.get('t');

  if (!id) {
    return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
  }

  if (!token) {
    return NextResponse.json({ ok: false, error: 'Missing token' }, { status: 403 });
  }

  const claim = await getClaimById(id);
  if (!claim) {
    return NextResponse.json({ ok: false, error: 'Claim not found' }, { status: 404 });
  }

  // 🔒 Token-check (skydda status-endpointen)
  if (
    !(claim as any).payoutToken ||
    (claim as any).payoutToken !== token ||
    !(claim as any).payoutTokenExpiresAt ||
    new Date((claim as any).payoutTokenExpiresAt) < new Date()
  ) {
    return NextResponse.json(
      { ok: false, error: 'Invalid or expired token' },
      { status: 403 }
    );
  }

  const submittedAt = (claim as any).payoutDetailsSubmittedAt ?? null;

  return NextResponse.json(
    {
      ok: true,
      hasSubmitted: Boolean(submittedAt),
      payout: submittedAt
        ? {
            accountHolder: (claim as any).payoutAccountHolder ?? null,
            ibanLast4: (claim as any).payoutIbanLast4 ?? null,
            submittedAt,
          }
        : null,
    },
    { status: 200 }
  );
}
