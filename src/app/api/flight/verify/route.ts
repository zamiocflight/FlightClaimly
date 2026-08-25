import { NextResponse } from "next/server";
import { verifyFlightFlightAware } from "@/lib/flight/providers/flightaware";
import { calculateGreatCircleDistanceKm } from "@/lib/aviation/distance";

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

function extractIataCode(value: string): string | null {
  const trimmed = value.trim().toUpperCase();

  if (/^[A-Z]{3}$/.test(trimmed)) {
    return trimmed;
  }

  const match = trimmed.match(/\(([A-Z]{3})\)/);
  return match ? match[1] : null;
}

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
  const result = await verifyFlightFlightAware({
    from: input.from,
    to: input.to,
    date: input.date,
    flightNumber: input.flightNumber,
  });

  const eligible =
    result.cancelled === true ||
    (typeof result.arrivalDelayMinutes === "number" &&
      result.arrivalDelayMinutes >= 180);

      const originIata = extractIataCode(input.from);
const destinationIata = extractIataCode(input.to);

const distanceKm =
  typeof result.distanceKm === "number"
    ? result.distanceKm
    : originIata && destinationIata
      ? calculateGreatCircleDistanceKm(originIata, destinationIata)
      : null;

return NextResponse.json({
  matched: result.matched,
  eligible,
  source: result.source,
  arrivalDelayMinutes: result.arrivalDelayMinutes,
  cancelled: result.cancelled,
  confidence: result.confidence,

  scheduledDeparture: result.scheduledDeparture ?? null,
  actualDeparture: result.actualDeparture ?? null,
  scheduledArrival: result.scheduledArrival ?? null,
  actualArrival: result.actualArrival ?? null,
  distanceKm,
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

    const journeyOrigin = legs[0]?.fromCode;
  const journeyDestination = legs[legs.length - 1]?.toCode;

  const distanceKm =
    journeyOrigin && journeyDestination
      ? calculateGreatCircleDistanceKm(
          journeyOrigin,
          journeyDestination
        )
      : null;

  return NextResponse.json({
    matched: true,
    eligible,
    source: "mock" as const,
    distanceKm,
    ...(reasonCode ? { reasonCode } : {}),
  });
}
