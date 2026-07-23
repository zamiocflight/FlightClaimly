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
  | "originAirport"
  | "destinationAirport"
  | "route"
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

    originAirport: route.origin.slug,

    destinationAirport: route.destination.slug,

    route: route.slug,

    originCountry: route.origin.country,

    destinationCountry: route.destination.country,
  };
}