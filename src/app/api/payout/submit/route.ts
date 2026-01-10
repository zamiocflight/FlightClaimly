import { NextResponse } from 'next/server';
import { getClaimById, updateClaimPayoutDetails } from '@/lib/claims';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, accountHolder, iban, token } = body as {
  id?: string;
  accountHolder?: string;
  iban?: string;
  token?: string;
};

  if (!id || !accountHolder || !iban || !token) {
  return NextResponse.json(
    { error: 'Missing id, accountHolder, iban or token' },
    { status: 400 }
  );
}

    const cleanAccountHolder = accountHolder.trim();
    const cleanIban = iban.replace(/\s+/g, '').toUpperCase();

    if (cleanAccountHolder.length < 2) {
      return NextResponse.json({ error: 'Invalid accountHolder' }, { status: 400 });
    }

    // super basic IBAN sanity check (MVP)
    if (cleanIban.length < 12 || cleanIban.length > 34) {
      return NextResponse.json({ error: 'Invalid IBAN length' }, { status: 400 });
    }

    // 1) exists?
 const existing = await getClaimById(id);

if (!existing) {
  return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
}

// 🔒 verifiera token (MÅSTE ligga EFTER null-check)
if (
  !existing.payoutToken ||
  existing.payoutToken !== token ||
  !existing.payoutTokenExpiresAt ||
  new Date(existing.payoutTokenExpiresAt) < new Date()
) {
  return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 });
}


// 🔒 stoppa dubbel-submit (MVP-safe)
if (existing.payoutDetailsSubmittedAt) {
  return NextResponse.json(
    { error: 'Payout details already submitted' },
    { status: 409 }
  );
}


    // 2) save payout details
    const updated = await updateClaimPayoutDetails(id, {
      accountHolder: cleanAccountHolder,
      iban: cleanIban,
    });

    // Logga aldrig full IBAN
    console.log('✅ payout details saved', {
      id,
      ibanLast4: cleanIban.slice(-4),
      payoutDetailsSubmittedAt: (updated as any).payoutDetailsSubmittedAt ?? null,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Error in /api/payout/submit:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
