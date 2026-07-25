import type { FlightNumberBuildContext } from "./context";
import type { FlightNumber } from "./types";

type FlightNumberIdentity = Pick<
  FlightNumber,
  | "airline"
  | "airlineName"
  | "airlineCountry"
  | "airlineCountrySlugs"
  | "airlineIata"
  | "airlineIcao"
  | "originAirportSlug"
  | "destinationAirportSlug"
  | "routeSlug"
  | "originCountry"
  | "destinationCountry"
>;

export function buildFlightNumberIdentity({
  airline,
  route,
}: FlightNumberBuildContext): FlightNumberIdentity {
  return {
    airline: airline.slug,

    airlineName: airline.name,

    airlineCountry: airline.country,

    airlineCountrySlugs: airline.countrySlugs,

    airlineIata: airline.iata.toUpperCase(),

    airlineIcao: airline.icao.toUpperCase(),

    originAirportSlug: route.origin.slug,

    destinationAirportSlug: route.destination.slug,

    routeSlug: route.slug,

    originCountry: route.origin.country,

    destinationCountry: route.destination.country,
  };
}