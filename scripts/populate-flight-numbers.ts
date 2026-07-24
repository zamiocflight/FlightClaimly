import fs from "node:fs/promises";
import path from "node:path";

import type { FlightNumberSeed } from "../src/data/flight-numbers/types";
import {
  calculateGreatCircleDistanceKm,
  getDistanceBand,
} from "../src/lib/aviation/distance";

const API_KEY = process.env.FLIGHTAWARE_API_KEY;

if (!API_KEY) {
  throw new Error("Missing FLIGHTAWARE_API_KEY");
}

type FlightAwareSchedule = {
  ident?: string | null;
  ident_iata?: string | null;
  ident_icao?: string | null;

  aircraft_type?: string | null;

  scheduled_out?: string | null;
  scheduled_in?: string | null;

  origin?: string | null;
  origin_iata?: string | null;
  origin_icao?: string | null;

  destination?: string | null;
  destination_iata?: string | null;
  destination_icao?: string | null;
};

function normalizeFlightNumber(
  schedule: FlightAwareSchedule
): string | null {
  const flightNumber =
    schedule.ident_iata ||
    schedule.ident ||
    schedule.ident_icao;

  if (!flightNumber) {
    return null;
  }

  return flightNumber.replace(/\s+/g, "").toUpperCase();
}

function normalizeAirport(
  iata?: string | null,
  fallback?: string | null
): string | null {
  const value = iata || fallback;

  if (!value) {
    return null;
  }

  const normalized = value.trim().toUpperCase();

  return /^[A-Z]{3}$/.test(normalized) ? normalized : null;
}

function toSeed(
  schedule: FlightAwareSchedule
): FlightNumberSeed | null {
  const flightNumber = normalizeFlightNumber(schedule);

  const originIata = normalizeAirport(
    schedule.origin_iata,
    schedule.origin
  );

  const destinationIata = normalizeAirport(
    schedule.destination_iata,
    schedule.destination
  );

  if (!flightNumber || !originIata || !destinationIata) {
    return null;
  }

  const distanceKm = calculateGreatCircleDistanceKm(
    originIata,
    destinationIata
  );

  if (distanceKm === null) {
    return null;
  }

  return {
    flightNumber,
    airline: "sas",
    originIata,
    destinationIata,
    distanceBand: getDistanceBand(distanceKm),
    eu261Eligible: true,
    aircraft: schedule.aircraft_type || undefined,
    schedule:
      schedule.scheduled_out && schedule.scheduled_in
        ? `${schedule.scheduled_out} → ${schedule.scheduled_in}`
        : undefined,
  };
}

async function main() {
  console.log("Population Engine starting...");

  const startDate = "2026-07-25";
  const endDate = "2026-07-26";

  const params = new URLSearchParams({
    airline: "SK",
    include_codeshares: "false",
    include_regional: "true",
    max_pages: "1",
  });

  const url =
    `https://aeroapi.flightaware.com/aeroapi/schedules/${startDate}/${endDate}?${params.toString()}`;

  const res = await fetch(url, {
  headers: {
    "x-apikey": API_KEY!,
    Accept: "application/json",
  },
 });

  if (!res.ok) {
    throw new Error(`FlightAware returned ${res.status}`);
  }

  const json = await res.json();

  const schedules: FlightAwareSchedule[] =
    json.scheduled ??
    json.schedules ??
    json.flights ??
    [];

  const flightNumberSeeds = schedules
    .map(toSeed)
    .filter(
      (seed): seed is FlightNumberSeed => seed !== null
    );

  console.log("Schedules returned:", schedules.length);
  console.log("Valid seeds:", flightNumberSeeds.length);
  console.log(
    "Rejected schedules:",
    schedules.length - flightNumberSeeds.length
  );

  console.log("First normalized seed:");
  console.dir(flightNumberSeeds[0], { depth: null });

  if (flightNumberSeeds[0]) {
    const distanceKm = calculateGreatCircleDistanceKm(
      flightNumberSeeds[0].originIata,
      flightNumberSeeds[0].destinationIata
    );

    console.log("First seed distance:", distanceKm, "km");
  }

  const outputPath = path.join(
    process.cwd(),
    "src/data/master/flightNumberSeeds.ts"
  );

  const output = `import type { FlightNumberSeed } from "../flight-numbers/types";

export const flightNumberSeeds: FlightNumberSeed[] = ${JSON.stringify(
    flightNumberSeeds,
    null,
    2
  )};
`;

  await fs.mkdir(path.dirname(outputPath), {
    recursive: true,
  });

  await fs.writeFile(outputPath, output, "utf8");

  console.log("Written:", outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});