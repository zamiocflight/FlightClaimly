import fs from "node:fs/promises";
import path from "node:path";

import { flightNumberSeeds } from "../src/data/master/flightNumberSeeds";
import { createFlightNumber } from "../src/data/flight-numbers/createFlightNumber";
import type { FlightNumberSeed } from "../src/data/flight-numbers/types";

function normalizeFlightNumber(flightNumber: string): string {
  return flightNumber
    .trim()
    .replace(/\s+/g, "")
    .toUpperCase();
}

function createSeedKey(seed: FlightNumberSeed): string {
  return [
    seed.airline.trim().toLowerCase(),
    normalizeFlightNumber(seed.flightNumber),
  ].join("|");
}

function describeSeed(seed: FlightNumberSeed): string {
  return [
    normalizeFlightNumber(seed.flightNumber),
    `${seed.originIata.toUpperCase()} → ${seed.destinationIata.toUpperCase()}`,
    seed.schedule ?? "no schedule",
  ].join(" | ");
}

function deduplicateSeeds(
  seeds: FlightNumberSeed[]
): FlightNumberSeed[] {
  const uniqueSeeds = new Map<string, FlightNumberSeed>();

  for (const seed of seeds) {
    const key = createSeedKey(seed);
    const existingSeed = uniqueSeeds.get(key);

    if (!existingSeed) {
      uniqueSeeds.set(key, {
        ...seed,
        flightNumber: normalizeFlightNumber(seed.flightNumber),
        airline: seed.airline.trim().toLowerCase(),
        originIata: seed.originIata.trim().toUpperCase(),
        destinationIata: seed.destinationIata.trim().toUpperCase(),
      });

      continue;
    }

    const routeChanged =
      existingSeed.originIata !== seed.originIata.trim().toUpperCase() ||
      existingSeed.destinationIata !==
        seed.destinationIata.trim().toUpperCase();

    if (routeChanged) {
      console.warn(
        [
          `Conflicting route for ${normalizeFlightNumber(seed.flightNumber)}.`,
          `Keeping: ${describeSeed(existingSeed)}`,
          `Ignoring: ${describeSeed(seed)}`,
        ].join("\n")
      );
    }
  }

  return Array.from(uniqueSeeds.values());
}

function sortSeeds(
  seeds: FlightNumberSeed[]
): FlightNumberSeed[] {
  return [...seeds].sort((a, b) => {
    const airlineComparison = a.airline.localeCompare(b.airline);

    if (airlineComparison !== 0) {
      return airlineComparison;
    }

    return a.flightNumber.localeCompare(b.flightNumber, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
}

async function main(): Promise<void> {
  console.log("Flight Number Builder starting...");

  const importedCount = flightNumberSeeds.length;

  const uniqueSeeds = deduplicateSeeds(flightNumberSeeds);
  const sortedSeeds = sortSeeds(uniqueSeeds);

  const flightNumbers = sortedSeeds.map(createFlightNumber);

  const duplicatesRemoved =
    importedCount - flightNumbers.length;

  const output = `import type { FlightNumber } from "../flight-numbers/types";

export const flightNumbers: FlightNumber[] = ${JSON.stringify(
    flightNumbers,
    null,
    2
  )};
`;

  const outputPath = path.join(
    process.cwd(),
    "src/data/master/flightNumbers.ts"
  );

  await fs.mkdir(path.dirname(outputPath), {
    recursive: true,
  });

  await fs.writeFile(outputPath, output, "utf8");

  console.log("Flight-number seeds imported:", importedCount);
  console.log("Duplicate flight numbers removed:", duplicatesRemoved);
  console.log("Unique flight numbers written:", flightNumbers.length);
  console.log("Written:", outputPath);
}

main().catch((error: unknown) => {
  console.error("Flight Number Builder failed:");

  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }

  process.exitCode = 1;
});