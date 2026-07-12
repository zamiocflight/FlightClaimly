import { routes, type FlightRoute } from "@/data/seo/routes";

const airportPriority: Record<string, number> = {
  LHR: 100,
  FRA: 98,
  CDG: 98,
  AMS: 97,
  MAD: 94,
  MUC: 93,
  BCN: 92,
  FCO: 91,
  CPH: 90,
  ARN: 88,
  OSL: 88,
  HEL: 87,
  LGW: 85,
  VIE: 84,
  ZRH: 84,
  BRU: 82,
  BER: 81,
  DUB: 80,
  LIS: 80,
  MAN: 79,
  WAW: 78,
  ATH: 78,
  MXP: 78,
};

function getAirportPriority(iata: string): number {
  return airportPriority[iata.toUpperCase()] ?? 50;
}

export function getRouteRelevanceScore(route: FlightRoute): number {
  const originScore = getAirportPriority(route.origin.iata);
  const destinationScore = getAirportPriority(route.destination.iata);

  const airlineScore = route.airlines.length * 10;

  const internationalBonus =
    route.origin.country !== route.destination.country ? 15 : 5;

  return originScore + destinationScore + airlineScore + internationalBonus;
}

export function sortRoutesByRelevance(
  inputRoutes: FlightRoute[]
): FlightRoute[] {
  return [...inputRoutes].sort((a, b) => {
    const scoreDifference =
      getRouteRelevanceScore(b) - getRouteRelevanceScore(a);

    if (scoreDifference !== 0) {
      return scoreDifference;
    }

    return a.name.localeCompare(b.name);
  });
}

export function getRoutesForAirport(iata: string): FlightRoute[] {
  const normalizedIata = iata.toUpperCase();

  return sortRoutesByRelevance(
    routes.filter(
      (route) =>
        route.origin.iata.toUpperCase() === normalizedIata ||
        route.destination.iata.toUpperCase() === normalizedIata
    )
  );
}

export function getRoutesFromAirport(iata: string): FlightRoute[] {
  const normalizedIata = iata.toUpperCase();

  return sortRoutesByRelevance(
    routes.filter(
      (route) => route.origin.iata.toUpperCase() === normalizedIata
    )
  );
}

export function getRoutesToAirport(iata: string): FlightRoute[] {
  const normalizedIata = iata.toUpperCase();

  return sortRoutesByRelevance(
    routes.filter(
      (route) => route.destination.iata.toUpperCase() === normalizedIata
    )
  );
}

export function getRoutesForCountry(country: string): FlightRoute[] {
  const normalizedCountry = country.toLowerCase();

  return sortRoutesByRelevance(
    routes.filter(
      (route) =>
        route.origin.country.toLowerCase() === normalizedCountry ||
        route.destination.country.toLowerCase() === normalizedCountry
    )
  );
}

export function getRoutesForAirline(
  airlineSlug: string
): FlightRoute[] {
  return sortRoutesByRelevance(
    routes.filter((route) =>
      route.airlines.some((airline) => airline.slug === airlineSlug)
    )
  );
}

export function getRelatedRoutes(
  route: FlightRoute
): FlightRoute[] {
  return sortRoutesByRelevance(
    routes
      .filter((candidate) => candidate.slug !== route.slug)
      .filter(
        (candidate) =>
          candidate.origin.iata === route.origin.iata ||
          candidate.destination.iata === route.destination.iata ||
          candidate.origin.iata === route.destination.iata ||
          candidate.destination.iata === route.origin.iata
      )
  );
}

export function getDomesticRoutes(): FlightRoute[] {
  return sortRoutesByRelevance(
    routes.filter(
      (route) => route.origin.country === route.destination.country
    )
  );
}

export function getInternationalRoutes(): FlightRoute[] {
  return sortRoutesByRelevance(
    routes.filter(
      (route) => route.origin.country !== route.destination.country
    )
  );
}

export function getPopularRoutes(limit = 12): FlightRoute[] {
  return sortRoutesByRelevance(routes).slice(0, limit);
}