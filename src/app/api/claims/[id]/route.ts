import { cookies } from 'next/headers';
import { validAdminSession } from '@/lib/adminSession';
// src/app/api/claims/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getClaimById, updateClaimStatus, type Claim } from '@/lib/claims';
import { sendStatusEmail } from '@/lib/statusEmail';

export const runtime = 'nodejs';

// Tillåtna statuskoder från admin
const ALLOWED_STATUS = [
  'new',
  'processing',
  'sent_to_airline',
  'paid_out',
  'rejected',
] as const;
type StatusCode = (typeof ALLOWED_STATUS)[number];

function isAllowedStatus(value: string): value is StatusCode {
  return (ALLOWED_STATUS as readonly string[]).includes(value);
}

// GET /api/claims/[id] – hämta ett enskilt claim
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const cookie = (await cookies()).get('admin_session')?.value;
  if (!(await validAdminSession(cookie, process.env.ADMIN_PASSWORD))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id: rawId } = await context.params;
    const id = decodeURIComponent(rawId);

    const claim = await getClaimById(id);

    if (!claim) {
      return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
    }

    return NextResponse.json(claim, { status: 200 });
  } catch (e) {
    console.error('GET /api/claims/[id] error', e);
    return NextResponse.json({ error: 'SERVER_ERROR' }, { status: 500 });
  }
}

// PATCH /api/claims/[id] – uppdatera status + skicka premium statusmail
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const cookie = (await cookies()).get('admin_session')?.value;
  if (!(await validAdminSession(cookie, process.env.ADMIN_PASSWORD))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id: rawId } = await context.params;
    const id = decodeURIComponent(rawId);

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const newStatus = String(body?.status ?? '').trim();

    if (!isAllowedStatus(newStatus)) {
      return NextResponse.json(
        { error: 'Invalid status', allowed: ALLOWED_STATUS },
        { status: 400 },
      );
    }

    // Hämta nuvarande claim (för att kunna hoppa över onödiga uppdateringar)
    const current = await getClaimById(id);
    if (!current) {
      return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
    }

    if (current.status === newStatus) {
      // Ingen förändring – returnera oförändrat
      return NextResponse.json({ ok: true, claim: current }, { status: 200 });
    }

    // Uppdatera i DB
    const updated = await updateClaimStatus(id, newStatus);

    // Skicka statusmail via Resend – får INTE krascha API:t om mailen failar
    try {
      if (updated.email && newStatus !== 'new') {
        await sendStatusEmail({
          id, // 👈 Viktigt: ditt tracking-ID (received_at / claim.id)
          email: updated.email,
          name: updated.name,
          status: newStatus as any,
          flightNumber: updated.flightNumber,
          from: updated.from,
          to: updated.to,
          flightDate: updated.date ?? null,
          publicToken: updated.viewerToken ?? undefined,
          lang: (updated as any).locale || 'en',
        });
      }
    } catch (e) {
      console.warn('[status-mail] kunde inte skicka:', e);
      // fortsätt ändå – admin ska få sin statusändring även om mail failar
    }

    return NextResponse.json({ ok: true, claim: updated }, { status: 200 });
  } catch (e) {
    console.error('PATCH /api/claims/[id] error', e);
    return NextResponse.json({ error: 'SERVER_ERROR' }, { status: 500 });
  }
}
