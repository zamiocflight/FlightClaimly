export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getClaimById, markFinishEmailSent } from "@/lib/claims";
import { sendStatusEmail } from "@/lib/statusEmail";

type Lang = "sv" | "en" | "da" | "de" | "pl" | "fi";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json().catch(() => ({}));
    const lang = (body?.locale || "en") as Lang;

    const claim = await getClaimById(id);

    if (!claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    if (!claim.email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

 if (claim.finishEmailSentAt) {
  return NextResponse.json({
    ok: true,
    alreadySent: true,
  });
}

const ok = await sendStatusEmail({
  id: claim.id,
  email: String(claim.email).toLowerCase(),
  name: claim.name,
  status: "new",
  flightNumber: claim.flightNumber,
  from: claim.from,
  to: claim.to,
  flightDate: claim.date,
  lang,
});

if (!ok) {
  return NextResponse.json(
    { error: "Mail failed" },
    { status: 500 }
  );
}

await markFinishEmailSent(claim.id);

return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("❌ Finish email failed:", err);
    return NextResponse.json(
      { error: "Failed to send finish email" },
      { status: 500 }
    );
  }
}