import { NextResponse } from "next/server";

type Leg = {
  id: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
};

type DirectInput = {
  from: string;
  to: string;
  date: string;
  flightNumber: string;
};

type ItineraryInput = {
  legs: Leg[];
  disruptionType: "delayed" | "cancelled" | "denied" | null;
  affectedLegId: string | null;
  outcome: "gte3" | "lt3" | "never" | null;
  cancelNotice: "lt14" | "gte14" | null;
  volunteer: "yes" | "no" | null;
};

export async function POST(req: Request) {
  let input: any;

  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 1) DIRECT kontrakt
  const hasDirect =
    typeof input?.from === "string" &&
    typeof input?.to === "string" &&
    typeof input?.date === "string" &&
    typeof input?.flightNumber === "string" &&
    input.from &&
    input.to &&
    input.date &&
    input.flightNumber;

  if (hasDirect) {
    // MOCK: vi “matchar” alltid om fields finns
    return NextResponse.json({
      matched: true,
      eligible: true, // mock tills provider finns
      source: "mock" as const,
    });
  }

  // 2) ITINERARY kontrakt
  const {
    legs,
    disruptionType,
    affectedLegId,
    outcome,
    cancelNotice,
    volunteer,
  } = input as ItineraryInput;

  if (!Array.isArray(legs) || legs.length === 0) {
    return NextResponse.json({ error: "Missing legs" }, { status: 400 });
  }
  if (!disruptionType || !affectedLegId || !outcome) {
    return NextResponse.json({ error: "Missing disruption data" }, { status: 400 });
  }

  // MOCK eligibility
  let eligible = false;
  let reasonCode: string | undefined;

  if (disruptionType === "cancelled") {
    if (cancelNotice === "lt14") eligible = true;
    else reasonCode = "CANCELLED_TOO_EARLY_NOTICE";
  }

  if (disruptionType === "delayed") {
    if (outcome === "gte3" || outcome === "never") eligible = true;
    else reasonCode = "DELAY_LT_3H";
  }

  if (disruptionType === "denied") {
    if (volunteer === "no") eligible = true;
    else reasonCode = "VOLUNTARY_DENIED";
  }

  return NextResponse.json({
    matched: true,
    eligible,
    source: "mock" as const,
    ...(reasonCode ? { reasonCode } : {}),
  });
}
