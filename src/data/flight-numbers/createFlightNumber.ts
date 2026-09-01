import type {
  FlightNumber,
  FlightNumberSeed,
} from "@/data/flight-numbers/types";
import type { FlightNumberBuildContext } from "./context";

import {
  buildFlightNumberIdentity,
  buildFlightNumberKnowledge,
  buildFlightNumberSeoCopy,
} from "./builders";

import {
  createFlightNumberSlug,
  getFlightNumberRoute,
  resolveFlightNumberAirline,
  validateFlightNumberSeed,
} from "./helpers";
import { resolvePassengerRightsCoverage } from "@/lib/aviation/passengerRightsCoverage";

export function createFlightNumber(
  seed: FlightNumberSeed
): FlightNumber {
  validateFlightNumberSeed(seed);

  const route = getFlightNumberRoute(
    seed.originIata,
    seed.destinationIata
  );

  const airline = resolveFlightNumberAirline(seed.airline);

  if (!route) {
    throw new Error(
      `Flight-number route not found: ${seed.originIata} → ${seed.destinationIata}`
    );
  }

  const flightNumber = seed.flightNumber.toUpperCase();
  const routeLabel = `${route.origin.city} to ${route.destination.city}`;
  const coverage = resolvePassengerRightsCoverage({
    originCountry: route.origin.country,
    destinationCountry: route.destination.country,
    airline,
  });

  const context = {
    airline,
    route,
    flightNumber,
    routeLabel,
    eu261Eligible: coverage.eu261,
    uk261Eligible: coverage.uk261,
  } satisfies FlightNumberBuildContext;

  const seo = buildFlightNumberSeoCopy(context);
  const knowledge = buildFlightNumberKnowledge();
  const identity = buildFlightNumberIdentity(context);

  const relationships = {
    airline: airline.slug,
    originAirport: route.origin.slug,
    destinationAirport: route.destination.slug,
    route: route.slug,
  };

  const metadata = {
    canonical: `/flight-numbers/${createFlightNumberSlug(flightNumber)}`,
  };

  return {
    slug: createFlightNumberSlug(flightNumber),

    flightNumber,

    ...identity,

    distanceBand: seed.distanceBand,

    eu261Eligible: coverage.eu261,
    uk261Eligible: coverage.uk261,

    ...seo,

    ...knowledge,

    relationships,

    metadata,

    ...(seed.aircraft
      ? {
          aircraft: seed.aircraft,
        }
      : {}),

    ...(seed.schedule
      ? {
          schedule: seed.schedule,
        }
      : {}),
  };
}
