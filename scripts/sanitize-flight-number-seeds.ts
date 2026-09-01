import { flightNumberSeeds } from "../src/data/master/flightNumberSeeds";
import type { FlightNumberSeed } from "../src/data/flight-numbers/types";
import { getAirportByIata } from "../src/lib/knowledge/airports";
import { getAirportRegistryEntryByIata } from "../src/data/master/airportRegistry";

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

async function main(): Promise<void> {
  const normalized = flightNumberSeeds.map(normalizeSeed);
  const rejected = normalized.filter(
    (seed) =>
      !airportIsSupported(seed.originIata) ||
      !airportIsSupported(seed.destinationIata)
  );

  console.log("Flight Number Seed Support Audit");
  console.log("================================");
  console.log("Input seeds:", normalized.length);
  console.log("Supported:", normalized.length - rejected.length);
  console.log("Unsupported routes:", rejected.length);

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
    console.error(
      "Support audit failed. Seeds were NOT modified. Expand the airport registry before publishing."
    );
    process.exitCode = 1;
    return;
  }

  console.log("Support audit passed. Seeds were not modified.");
}

main().catch((error: unknown) => {
  console.error("Flight Number Seed Support Audit failed:");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});