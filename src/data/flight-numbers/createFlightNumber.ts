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

  const context = {
    airline,
    route,
    flightNumber,
    routeLabel,
    eu261Eligible: seed.eu261Eligible,
  } satisfies FlightNumberBuildContext;

  const seo = buildFlightNumberSeoCopy(context);
  const knowledge = buildFlightNumberKnowledge();
  const identity = buildFlightNumberIdentity(context);

  return {
    slug: createFlightNumberSlug(flightNumber),

    flightNumber,

    ...identity,

    distanceBand: seed.distanceBand,

    eu261Eligible: seed.eu261Eligible,

    ...seo,

    ...knowledge,

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