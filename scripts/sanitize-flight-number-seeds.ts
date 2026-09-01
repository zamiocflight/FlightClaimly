import fs from "node:fs/promises";
import path from "node:path";

import { flightNumberSeeds } from "../src/data/master/flightNumberSeeds";
import type { FlightNumberSeed } from "../src/data/flight-numbers/types";
import { getAirportByIata } from "../src/lib/knowledge/airports";
import { getAirportRegistryEntryByIata } from "../src/data/master/airportRegistry";

const OUTPUT_PATH = path.join(
  process.cwd(),
  "src/data/master/flightNumberSeeds.ts"
);

function normalizeIata(value: string): string {
  return value.trim().toUpperCase();
}

function airportIsSupported(iata: string): boolean {
  const normalized = normalizeIata(iata);

  return Boolean(
    getAirportByIata(normalized) ||
      getAirportRegistryEntryByIata(normalized)
  );
}

function normalizeSeed(seed: FlightNumberSeed): FlightNumberSeed {
  return {
    ...seed,
    flightNumber: seed.flightNumber.trim().replace(/\s+/g, "").toUpperCase(),
    airline: seed.airline.trim().toLowerCase(),
    originIata: normalizeIata(seed.originIata),
    destinationIata: normalizeIata(seed.destinationIata),
  };
}

function sortSeeds(seeds: FlightNumberSeed[]): FlightNumberSeed[] {
  return [...seeds].sort((a, b) =>
    a.airline.localeCompare(b.airline) ||
    a.flightNumber.localeCompare(b.flightNumber, "en", { numeric: true })
  );
}

async function main(): Promise<void> {
  const normalized = flightNumberSeeds.map(normalizeSeed);
  const rejected: FlightNumberSeed[] = [];

  const accepted = normalized.filter((seed) => {
    const supported =
      airportIsSupported(seed.originIata) &&
      airportIsSupported(seed.destinationIata);

    if (!supported) rejected.push(seed);
    return supported;
  });

  const sorted = sortSeeds(accepted);

  const output = `import type { FlightNumberSeed } from "../flight-numbers/types";\n\nexport const flightNumberSeeds: FlightNumberSeed[] = ${JSON.stringify(
    sorted,
    null,
    2
  )};\n`;

  await fs.writeFile(OUTPUT_PATH, output, "utf8");

  console.log("Flight Number Seed Sanitizer");
  console.log("============================");
  console.log("Input seeds:", normalized.length);
  console.log("Accepted:", sorted.length);
  console.log("Rejected unsupported routes:", rejected.length);

  if (rejected.length > 0) {
    const unsupportedAirports = [
      ...new Set(
        rejected.flatMap((seed) =>
          [seed.originIata, seed.destinationIata].filter(
            (iata) => !airportIsSupported(iata)
          )
        )
      ),
    ].sort();

    console.log(
      "Unsupported airport IATA codes:",
      unsupportedAirports.join(", ")
    );
  }
}

main().catch((error: unknown) => {
  console.error("Flight Number Seed Sanitizer failed:");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});