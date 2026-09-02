import type { FlightNumber, FlightNumberSeed } from "./types";
import { getPriorityAirlineEntityBySlug } from "@/data/master/priorityAirlineEntities";
import { getAirlineBySlug } from "@/data/seo/airlines";

export type FlightNumberPublicationDecision = {
  publish: boolean;
  reasons: string[];
};

const IATA_AIRPORT_PATTERN = /^[A-Z]{3}$/;
const FLIGHT_NUMBER_PATTERN = /^[A-Z0-9]{2,3}\d{1,4}[A-Z]?$/;

export function evaluateFlightNumberSeedForPublication(
  seed: FlightNumberSeed
): FlightNumberPublicationDecision {
  const reasons: string[] = [];
  const flightNumber = seed.flightNumber.trim().replace(/\s+/g, "").toUpperCase();
  const originIata = seed.originIata.trim().toUpperCase();
  const destinationIata = seed.destinationIata.trim().toUpperCase();
  const airlineSlug = seed.airline.trim();
  const airline = airlineSlug
    ? getAirlineBySlug(airlineSlug) ?? getPriorityAirlineEntityBySlug(airlineSlug)
    : undefined;

  if (!FLIGHT_NUMBER_PATTERN.test(flightNumber)) {
    reasons.push("invalid-flight-number");
  }

  if (!airlineSlug) {
    reasons.push("missing-airline");
  } else if (!airline) {
    reasons.push("unknown-airline");
  } else {
    const airlineIata = airline.iata.trim().toUpperCase();

    // A public flight-number entity must belong to its marketing carrier.
    // FlightAware schedule responses can contain codeshare identifiers, so a
    // query for one operating carrier may surface another carrier's marketed
    // flight number. Without this check those records produce distinct
    // airline identities that collapse onto the same canonical URL slug.
    if (!flightNumber.startsWith(airlineIata)) {
      reasons.push("airline-flight-number-mismatch");
    }
  }

  if (!IATA_AIRPORT_PATTERN.test(originIata)) {
    reasons.push("invalid-origin-airport");
  }

  if (!IATA_AIRPORT_PATTERN.test(destinationIata)) {
    reasons.push("invalid-destination-airport");
  }

  if (originIata === destinationIata) {
    reasons.push("identical-origin-destination");
  }

  if (!["short", "medium", "long"].includes(seed.distanceBand)) {
    reasons.push("invalid-distance-band");
  }

  return {
    publish: reasons.length === 0,
    reasons,
  };
}

export function evaluateFlightNumberForPublication(
  flightNumber: FlightNumber
): FlightNumberPublicationDecision {
  const reasons: string[] = [];

  if (!flightNumber.slug || !flightNumber.flightNumber) {
    reasons.push("missing-identity");
  }

  if (!flightNumber.airline || !flightNumber.airlineIata) {
    reasons.push("missing-airline-relationship");
  }

  if (
    !flightNumber.originAirportSlug ||
    !flightNumber.destinationAirportSlug ||
    !flightNumber.routeSlug
  ) {
    reasons.push("missing-route-relationship");
  }

  if (!flightNumber.title || !flightNumber.description || !flightNumber.intro) {
    reasons.push("missing-seo-copy");
  }

  if (!flightNumber.metadata?.canonical) {
    reasons.push("missing-canonical");
  }

  if (!flightNumber.faq?.length || !flightNumber.claimProcess?.length) {
    reasons.push("missing-knowledge-content");
  }

  return {
    publish: reasons.length === 0,
    reasons,
  };
}

export function isFlightNumberPublishable(flightNumber: FlightNumber): boolean {
  return evaluateFlightNumberForPublication(flightNumber).publish;
}
