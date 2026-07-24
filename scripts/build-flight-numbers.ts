import fs from "node:fs/promises";
import path from "node:path";

import { flightNumberSeeds } from "../src/data/master/flightNumberSeeds";
import type { FlightNumberSeed } from "../src/data/flight-numbers/types";

function createSeedKey(seed: FlightNumberSeed): string {
  return [
    seed.flightNumber,
    seed.airline,
    seed.originIata,
    seed.destinationIata,
    seed.schedule,
  ].join("|");
}

function deduplicateSeeds(
  seeds: FlightNumberSeed[]
): FlightNumberSeed[] {
  const uniqueSeeds = new Map<string, FlightNumberSeed>();

  for (const seed of seeds) {
    const key = createSeedKey(seed);

    if (!uniqueSeeds.has(key)) {
      uniqueSeeds.set(key, seed);
    }
  }

  return Array.from(uniqueSeeds.values());
}

function sortSeeds(
  seeds: FlightNumberSeed[]
): FlightNumberSeed[] {
  return [...seeds].sort((a, b) => {
    const flightNumberComparison = a.flightNumber.localeCompare(
      b.flightNumber
    );

    if (flightNumberComparison !== 0) {
      return flightNumberComparison;
    }

    const originComparison = a.originIata.localeCompare(
      b.originIata
    );

    if (originComparison !== 0) {
      return originComparison;
    }

    const destinationComparison =
      a.destinationIata.localeCompare(b.destinationIata);

    if (destinationComparison !== 0) {
      return destinationComparison;
    }

    return (a.schedule ?? "").localeCompare(b.schedule ?? "");
  });
}

async function main(): Promise<void> {
  console.log("Flight Number Builder starting...");

  const importedCount = flightNumberSeeds.length;

  const uniqueFlightNumbers = deduplicateSeeds(
    flightNumberSeeds
  );

  const flightNumbers = sortSeeds(uniqueFlightNumbers);

  const duplicatesRemoved =
    importedCount - flightNumbers.length;

  const output = `import type { FlightNumberSeed } from "../flight-numbers/types";

export const flightNumbers: FlightNumberSeed[] = ${JSON.stringify(
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

  console.log("Flight numbers imported:", importedCount);
  console.log("Duplicates removed:", duplicatesRemoved);
  console.log("Flight numbers written:", flightNumbers.length);
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