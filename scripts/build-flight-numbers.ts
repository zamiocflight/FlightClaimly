import fs from "node:fs/promises";
import path from "node:path";

import { flightNumberSeeds } from "../src/data/master/flightNumberSeeds";
import { createFlightNumber } from "../src/data/flight-numbers/createFlightNumber";
import type { FlightNumberSeed } from "../src/data/flight-numbers/types";
import {
  evaluateFlightNumberForPublication,
  evaluateFlightNumberSeedForPublication,
} from "../src/data/flight-numbers/publication";

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
    const publication = evaluateFlightNumberSeedForPublication(seed);

    if (!publication.publish) {
      console.warn(
        `Skipping ${normalizeFlightNumber(seed.flightNumber)}: ${publication.reasons.join(", ")}`
      );
      continue;
    }

    const key = createSeedKey(seed);
    const existingSeed = uniqueSeeds.get(key);
    const normalizedSeed: FlightNumberSeed = {
      ...seed,
      flightNumber: normalizeFlightNumber(seed.flightNumber),
      airline: seed.airline.trim().toLowerCase(),
      originIata: seed.originIata.trim().toUpperCase(),
      destinationIata: seed.destinationIata.trim().toUpperCase(),
    };

    if (!existingSeed) {
      uniqueSeeds.set(key, normalizedSeed);
      continue;
    }

    const routeChanged =
      existingSeed.originIata !== normalizedSeed.originIata ||
      existingSeed.destinationIata !== normalizedSeed.destinationIata;

    if (routeChanged) {
      throw new Error(
        [
          `Ambiguous route identity for ${normalizeFlightNumber(seed.flightNumber)}.`,
          `Existing: ${describeSeed(existingSeed)}`,
          `Conflicting: ${describeSeed(normalizedSeed)}`,
          "Refusing to overwrite a published flight-number identity. Resolve the route history before rebuilding.",
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
  const builtFlightNumbers = sortedSeeds.map(createFlightNumber);

  const publicationFailures = builtFlightNumbers
    .map((flightNumber) => ({
      flightNumber,
      decision: evaluateFlightNumberForPublication(flightNumber),
    }))
    .filter(({ decision }) => !decision.publish);

  if (publicationFailures.length > 0) {
    throw new Error(
      [
        "Flight-number publication quality gate failed.",
        ...publicationFailures.map(
          ({ flightNumber, decision }) =>
            `${flightNumber.flightNumber}: ${decision.reasons.join(", ")}`
        ),
      ].join("\n")
    );
  }

  const duplicatesRemoved = importedCount - builtFlightNumbers.length;

  const output = `import type { FlightNumber } from "../flight-numbers/types";\n\nexport const flightNumbers: FlightNumber[] = ${JSON.stringify(
    builtFlightNumbers,
    null,
    2
  )};\n`;

  const outputPath = path.join(
    process.cwd(),
    "src/data/master/flightNumbers.ts"
  );

  await fs.mkdir(path.dirname(outputPath), {
    recursive: true,
  });

  await fs.writeFile(outputPath, output, "utf8");

  console.log("Flight-number seeds imported:", importedCount);
  console.log("Seeds rejected or duplicates removed:", duplicatesRemoved);
  console.log("Publishable flight numbers written:", builtFlightNumbers.length);
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