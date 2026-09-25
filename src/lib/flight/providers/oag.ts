import { FlightVerifyInput, FlightVerifyResult } from "../types";

type OagDateTime = {
  local?: string | null;
  utc?: string | null;
};

type OagStatusDetail = {
  state?: string | null;
  departure?: {
    actualTime?: {
      outGate?: OagDateTime;
      offGround?: OagDateTime;
    };
  };
  arrival?: {
    estimatedTime?: {
      inGate?: OagDateTime;
      onGround?: OagDateTime;
    };
    actualTime?: {
      inGate?: OagDateTime;
      onGround?: OagDateTime;
    };
  };
};

type OagFlight = {
  carrier?: {
    iata?: string;
    icao?: string;
  };
  flightNumber?: number | string;
  departure?: {
    airport?: { iata?: string; icao?: string };
    date?: { local?: string; utc?: string };
    time?: { local?: string; utc?: string };
  };
  arrival?: {
    airport?: { iata?: string; icao?: string };
    date?: { local?: string; utc?: string };
    time?: { local?: string; utc?: string };
  };
  distance?: {
    greatCircleKilometers?: number | null;
    accumulatedGreatCircleKilometers?: number | null;
  };
  statusDetails?: OagStatusDetail[];
};

function normalizeAirport(value: string) {
  const match = value.match(/\(([A-Z]{3})\)/);
  return (match?.[1] || value).trim().toUpperCase();
}

function parseFlightNumber(value: string) {
  const cleaned = value.replace(/\s+/g, "").toUpperCase();
  const match = cleaned.match(/^([A-Z0-9]{2})(\d+)$/);

  if (!match) return null;

  return {
    carrier: match[1],
    number: match[2],
  };
}

function scheduledUtc(
  date?: { utc?: string },
  time?: { utc?: string }
) {
  if (!date?.utc || !time?.utc) return null;
  return `${date.utc}T${time.utc}:00+00:00`;
}

function minutesBetween(a?: string | null, b?: string | null) {
  if (!a || !b) return null;

  const start = new Date(a).getTime();
  const end = new Date(b).getTime();

  if (Number.isNaN(start) || Number.isNaN(end)) return null;

  return Math.round((end - start) / 60000);
}

function isCancelled(state?: string | null) {
  if (!state) return false;

  const normalized = state.toLowerCase();
  return normalized.includes("cancel");
}

export async function verifyFlightOag(
  input: FlightVerifyInput
): Promise<FlightVerifyResult> {
  const apiKey = process.env.OAG_FLIGHT_INFO_API_KEY;

  if (!apiKey) {
    return {
      matched: false,
      arrivalDelayMinutes: null,
      cancelled: null,
      confidence: "low",
      source: "provider",
    };
  }

  const flight = parseFlightNumber(input.flightNumber);

  if (!flight) {
    return {
      matched: false,
      arrivalDelayMinutes: null,
      cancelled: null,
      confidence: "low",
      source: "provider",
    };
  }

  const from = normalizeAirport(input.from);
  const to = normalizeAirport(input.to);

  const params = new URLSearchParams({
    DepartureDateTime: input.date,
    DepartureAirport: from,
    ArrivalAirport: to,
    CarrierCode: flight.carrier,
    FlightNumber: flight.number,
    FlightType: "Scheduled",
    CodeType: "IATA",
    Content: "Status",
    version: "v2",
    Limit: "5",
  });

  const url = `https://api.oag.com/flight-instances/?${params.toString()}`;

  const res = await fetch(url, {
    headers: {
      "Subscription-Key": apiKey,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("OAG Flight Info error", res.status, await res.text());

    return {
      matched: false,
      arrivalDelayMinutes: null,
      cancelled: null,
      confidence: "low",
      source: "provider",
    };
  }

  const data = await res.json();
  const flights: OagFlight[] = data.data || [];

  const match =
    flights.find((item) => {
      const origin = item.departure?.airport?.iata?.toUpperCase();
      const destination = item.arrival?.airport?.iata?.toUpperCase();

      return origin === from && destination === to;
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

  const status = match.statusDetails?.[0];

  const scheduledDeparture = scheduledUtc(
    match.departure?.date,
    match.departure?.time
  );

  const scheduledArrival = scheduledUtc(
    match.arrival?.date,
    match.arrival?.time
  );

  const actualDeparture =
    status?.departure?.actualTime?.outGate?.utc ??
    status?.departure?.actualTime?.offGround?.utc ??
    null;

  const actualArrival =
    status?.arrival?.actualTime?.inGate?.utc ??
    status?.arrival?.estimatedTime?.inGate?.utc ??
    null;

  const cancelled = isCancelled(status?.state);

  const arrivalDelayMinutes = cancelled
    ? null
    : minutesBetween(scheduledArrival, actualArrival);

  const distanceKm =
    match.distance?.greatCircleKilometers ??
    match.distance?.accumulatedGreatCircleKilometers ??
    null;

  return {
    matched: true,
    arrivalDelayMinutes,
    cancelled,
    confidence:
      cancelled || status?.arrival?.actualTime?.inGate?.utc
        ? "high"
        : actualArrival
          ? "medium"
          : "low",
    source: "provider",

    scheduledDeparture,
    actualDeparture,

    scheduledArrival,
    actualArrival,

    distanceKm:
      typeof distanceKm === "number"
        ? Math.round(distanceKm)
        : null,
  };
}
