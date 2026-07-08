import { routes, type FlightRoute } from "@/data/seo/routes";

export function getRoutesForAirport(iata: string): FlightRoute[] {
  return routes.filter(
    (route) =>
      route.origin.iata.toUpperCase() === iata.toUpperCase() ||
      route.destination.iata.toUpperCase() === iata.toUpperCase()
  );
}

export function getRoutesFromAirport(iata: string): FlightRoute[] {
  return routes.filter(
    (route) => route.origin.iata.toUpperCase() === iata.toUpperCase()
  );
}

export function getRoutesToAirport(iata: string): FlightRoute[] {
  return routes.filter(
    (route) => route.destination.iata.toUpperCase() === iata.toUpperCase()
  );
}

export function getRoutesForCountry(country: string): FlightRoute[] {
  return routes.filter(
    (route) =>
      route.origin.country.toLowerCase() === country.toLowerCase() ||
      route.destination.country.toLowerCase() === country.toLowerCase()
  );
}

export function getRoutesForAirline(airlineSlug: string): FlightRoute[] {
  return routes.filter((route) =>
    route.airlines.some((airline) => airline.slug === airlineSlug)
  );
}

export function getRelatedRoutes(route: FlightRoute): FlightRoute[] {
  return routes
    .filter((candidate) => candidate.slug !== route.slug)
    .filter(
      (candidate) =>
        candidate.origin.iata === route.origin.iata ||
        candidate.destination.iata === route.destination.iata ||
        candidate.origin.iata === route.destination.iata ||
        candidate.destination.iata === route.origin.iata
    );
}

export function getDomesticRoutes(): FlightRoute[] {
  return routes.filter(
    (route) => route.origin.country === route.destination.country
  );
}

export function getInternationalRoutes(): FlightRoute[] {
  return routes.filter(
    (route) => route.origin.country !== route.destination.country
  );
}

export function getPopularRoutes(limit = 12): FlightRoute[] {
  return routes.slice(0, limit);
}