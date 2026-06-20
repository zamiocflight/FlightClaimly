import { FlightVerifyInput, FlightVerifyResult } from "../types";

type AeroFlight = {
  ident?: string;
  fa_flight_id?: string;

  scheduled_out?: string | null;
  actual_out?: string | null;

  scheduled_in?: string | null;
  estimated_in?: string | null;
  actual_in?: string | null;

  cancelled?: boolean;

  route_distance?: number | null;

  origin?: { code_iata?: string; code?: string };
  destination?: { code_iata?: string; code?: string };
};

function normalizeAirport(value: string) {
  const match = value.match(/\(([A-Z]{3})\)/);
  return (match?.[1] || value).trim().toUpperCase();
}

function minutesBetween(a?: string | null, b?: string | null) {
  if (!a || !b) return null;
  const start = new Date(a).getTime();
  const end = new Date(b).getTime();
  if (Number.isNaN(start) || Number.isNaN(end)) return null;
  return Math.round((end - start) / 60000);
}

function toFlightAwareIdent(flightNumber: string) {
  const cleaned = flightNumber.replace(/\s+/g, "").toUpperCase();

  const iataToIcao: Record<string, string> = {
    SK: "SAS",
    BA: "BAW",
    LH: "DLH",
    KL: "KLM",
    AF: "AFR",
    IB: "IBE",
    LO: "LOT",
    AY: "FIN",
    FR: "RYR",
    W6: "WZZ",
    U2: "EZY",
    DY: "NOZ",
    D8: "NSZ",
    TK: "THY",
  };

  const match = cleaned.match(/^([A-Z0-9]{2})(\d+)$/);
  if (!match) return cleaned;

  const [, prefix, number] = match;
  return `${iataToIcao[prefix] || prefix}${number}`;
}

export async function verifyFlightFlightAware(
  input: FlightVerifyInput
): Promise<FlightVerifyResult> {
  const apiKey = process.env.FLIGHTAWARE_API_KEY;

  if (!apiKey) {
    return {
      matched: false,
      arrivalDelayMinutes: null,
      cancelled: null,
      confidence: "low",
      source: "provider",
    };
  }

  const xApiKey = apiKey;

  const ident = toFlightAwareIdent(input.flightNumber);
  const from = normalizeAirport(input.from);
  const to = normalizeAirport(input.to);

const params = new URLSearchParams({
  start: `${input.date}T00:00:00Z`,
  end: `${input.date}T23:59:59Z`,
  max_pages: "1",
});

async function fetchFlights(useHistory: boolean) {
  const p = new URLSearchParams(params);

  if (useHistory) {
    p.set("ident_type", "designator");
  }

  const endpoint = useHistory
    ? `/history/flights/${encodeURIComponent(ident)}`
    : `/flights/${encodeURIComponent(ident)}`;

  const url = `https://aeroapi.flightaware.com/aeroapi${endpoint}?${p.toString()}`;

  return fetch(url, {
    headers: {
      "x-apikey": xApiKey,
      Accept: "application/json",
    },
    cache: "no-store",
  });
}

let res = await fetchFlights(false);

if (!res.ok) {
  console.error("FlightAware live error", res.status, await res.text());
  res = await fetchFlights(true);
}

  if (!res.ok) {
    console.error("FlightAware history error", res.status, await res.text());
    return {
      matched: false,
      arrivalDelayMinutes: null,
      cancelled: null,
      confidence: "low",
      source: "provider",
    };
  }

  const data = await res.json();
  const flights: AeroFlight[] = data.flights || [];

  const match =
    flights.find((f) => {
      const origin = (f.origin?.code_iata || f.origin?.code || "").toUpperCase();
      const dest = (f.destination?.code_iata || f.destination?.code || "").toUpperCase();
      return origin === from && dest === to;
    }) || flights[0];

  if (!match) {
    return {
      matched: false,
      arrivalDelayMinutes: null,
      cancelled: null,
      confidence: "low",
      source: "provider",
    };
  }

  const arrivalDelayMinutes = minutesBetween(
    match.scheduled_in,
    match.actual_in || match.estimated_in
  );

return {
  matched: true,
  arrivalDelayMinutes,
  cancelled: match.cancelled ?? false,
  confidence:
    arrivalDelayMinutes !== null || match.cancelled
      ? "high"
      : "medium",
  source: "provider",

  scheduledDeparture: match.scheduled_out ?? null,
  actualDeparture: match.actual_out ?? null,

  scheduledArrival: match.scheduled_in ?? null,
  actualArrival: match.actual_in ?? match.estimated_in ?? null,

  distanceKm:
  typeof match.route_distance === "number"
    ? Math.round(match.route_distance * 1.60934)
    : null,
};
}