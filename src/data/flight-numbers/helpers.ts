import { getAirlineBySlug } from "@/data/seo/airlines";
import { routes } from "@/data/seo/routes";

import type { FlightNumberSeed } from "./types";

export function createFlightNumberSlug(
  flightNumber: string
) {
  return flightNumber
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export function getFlightNumberRoute(
  originIata: string,
  destinationIata: string
) {
  return routes.find(
    (route) =>
      route.origin.iata.toUpperCase() ===
        originIata.toUpperCase() &&
      route.destination.iata.toUpperCase() ===
        destinationIata.toUpperCase()
  );
}

export function validateFlightNumberSeed(
  seed: FlightNumberSeed
) {
  if (!seed.flightNumber.trim()) {
    throw new Error("Flight number is required.");
  }

  if (!seed.airline.trim()) {
    throw new Error(
      `${seed.flightNumber}: airline is required.`
    );
  }

  if (
    !["short", "medium", "long"].includes(
      seed.distanceBand
    )
  ) {
    throw new Error(
      `${seed.flightNumber}: invalid distanceBand "${seed.distanceBand}".`
    );
  }
}

export function resolveFlightNumberAirline(
  airlineSlug: string
) {
  const airline = getAirlineBySlug(airlineSlug);

  if (!airline) {
    throw new Error(
      `Flight-number airline not found: ${airlineSlug}`
    );
  }

  return airline;
}