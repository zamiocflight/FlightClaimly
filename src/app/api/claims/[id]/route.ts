import { NextResponse } from 'next/server';
import { z } from 'zod';
import { updateClaimStatus } from '@/lib/claims';

const StatusSchema = z.object({
  // undvik enum-array-cast, använd literals
  status: z.union([z.literal('new'), z.literal('processing'), z.literal('approved')]),
});

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const json = await req.json().catch(() => ({}));
    const parsed = StatusSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const updated = await updateClaimStatus(id, parsed.data.status);
    return NextResponse.json({ ok: true, claim: updated }, { status: 200 });
  } catch (err: any) {
    if (err?.message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
    }
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
