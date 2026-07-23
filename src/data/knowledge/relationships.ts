import { airlines } from "@/data/seo/airlines";
import { airports } from "@/data/seo/airports";
import { countries } from "@/data/seo/countries";
import { routes } from "@/data/seo/routes";
import { flightNumberRelationships } from "@/data/flight-numbers/relationships";

export type RelationshipType =
  | "airline"
  | "airport"
  | "country"
  | "route"
  | "alliance"
  | "hub"
  | "law"
  | "article";

export type Relationship = {
  type: RelationshipType;
  slug: string;
};

export type EntityRelationships = {
  slug: string;
  relationships: Relationship[];
};

function getCountrySlug(countryName: string) {
  return countries.find(
    (country) => country.name.toLowerCase() === countryName.toLowerCase()
  )?.slug;
}

function getAirlineCountrySlugs(airline: (typeof airlines)[number]) {
  if (airline.countrySlugs?.length) {
    return airline.countrySlugs;
  }

  const countrySlug = getCountrySlug(airline.country);

  return countrySlug ? [countrySlug] : [];
}

function removeDuplicateRelationships(
  relationships: Relationship[]
): Relationship[] {
  const seen = new Set<string>();

  return relationships.filter((relationship) => {
    const key = `${relationship.type}:${relationship.slug}`;

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

const routesByAirportSlug = new Map<string, typeof routes>();
const routesByAirlineSlug = new Map<string, typeof routes>();
const routesByCountrySlug = new Map<string, typeof routes>();

for (const route of routes) {
  for (const airportSlug of [
    route.origin.slug,
    route.destination.slug,
  ]) {
    const airportRoutes = routesByAirportSlug.get(airportSlug) ?? [];
    airportRoutes.push(route);
    routesByAirportSlug.set(airportSlug, airportRoutes);
  }

  for (const airline of route.airlines) {
    const airlineRoutes = routesByAirlineSlug.get(airline.slug) ?? [];
    airlineRoutes.push(route);
    routesByAirlineSlug.set(airline.slug, airlineRoutes);
  }

  const countrySlugs = [
    getCountrySlug(route.origin.country),
    getCountrySlug(route.destination.country),
  ].filter((slug): slug is string => Boolean(slug));

  for (const countrySlug of new Set(countrySlugs)) {
    const countryRoutes = routesByCountrySlug.get(countrySlug) ?? [];
    countryRoutes.push(route);
    routesByCountrySlug.set(countrySlug, countryRoutes);
  }
}

const routeRelationships: EntityRelationships[] = routes.map((route) => {
  const originCountrySlug = getCountrySlug(route.origin.country);
  const destinationCountrySlug = getCountrySlug(
    route.destination.country
  );

  return {
    slug: route.slug,
    relationships: removeDuplicateRelationships([
      {
        type: "airport",
        slug: route.origin.slug,
      },
      {
        type: "airport",
        slug: route.destination.slug,
      },

      ...(originCountrySlug
        ? [
            {
              type: "country" as const,
              slug: originCountrySlug,
            },
          ]
        : []),

      ...(destinationCountrySlug
        ? [
            {
              type: "country" as const,
              slug: destinationCountrySlug,
            },
          ]
        : []),

      ...route.airlines.map((airline) => ({
        type: "airline" as const,
        slug: airline.slug,
      })),
    ]),
  };
});

const airportRelationships: EntityRelationships[] = airports.map(
  (airport) => {
    const countrySlug = getCountrySlug(airport.country);
    const airportRoutes =
      routesByAirportSlug.get(airport.slug) ?? [];

    return {
      slug: airport.slug,
      relationships: removeDuplicateRelationships([
        ...(countrySlug
          ? [
              {
                type: "country" as const,
                slug: countrySlug,
              },
            ]
          : []),

        ...(airport.mainAirlines ?? []).map((airlineSlug) => ({
          type: "airline" as const,
          slug: airlineSlug,
        })),

        ...airportRoutes.map((route) => ({
          type: "route" as const,
          slug: route.slug,
        })),
      ]),
    };
  }
);

const airlineRelationships: EntityRelationships[] = airlines.map(
  (airline) => {
    const countrySlugs = getAirlineCountrySlugs(airline);
    const airlineRoutes =
      routesByAirlineSlug.get(airline.slug) ?? [];

    return {
      slug: airline.slug,
      relationships: removeDuplicateRelationships([
        ...countrySlugs.map((countrySlug) => ({
          type: "country" as const,
          slug: countrySlug,
        })),

        ...airlineRoutes.flatMap((route) => [
          {
            type: "airport" as const,
            slug: route.origin.slug,
          },
          {
            type: "airport" as const,
            slug: route.destination.slug,
          },
        ]),

        ...airlineRoutes.map((route) => ({
          type: "route" as const,
          slug: route.slug,
        })),
      ]),
    };
  }
);

const countryRelationships: EntityRelationships[] = countries.map(
  (country) => {
    const countryAirports = airports.filter(
      (airport) =>
        airport.country.toLowerCase() === country.name.toLowerCase()
    );

    const countryAirlines = airlines.filter((airline) =>
      getAirlineCountrySlugs(airline).includes(country.slug)
    );

    const countryRoutes =
      routesByCountrySlug.get(country.slug) ?? [];

    return {
      slug: country.slug,
      relationships: removeDuplicateRelationships([
        ...countryAirports.map((airport) => ({
          type: "airport" as const,
          slug: airport.slug,
        })),

        ...countryAirlines.map((airline) => ({
          type: "airline" as const,
          slug: airline.slug,
        })),

        ...countryRoutes.map((route) => ({
          type: "route" as const,
          slug: route.slug,
        })),
      ]),
    };
  }
);

const flightNumberKnowledgeRelationships: EntityRelationships[] =
  flightNumberRelationships.map((flightNumber) => ({
    slug: flightNumber.slug,
    relationships: removeDuplicateRelationships([
      {
        type: "airline",
        slug: flightNumber.airline,
      },
      {
        type: "route",
        slug: flightNumber.route,
      },
      {
        type: "airport",
        slug: flightNumber.originAirport,
      },
      {
        type: "airport",
        slug: flightNumber.destinationAirport,
      },
      {
        type: "country",
        slug: flightNumber.originCountry,
      },
      {
        type: "country",
        slug: flightNumber.destinationCountry,
      },
    ]),
  }));

export const relationships: EntityRelationships[] = [
  ...routeRelationships,
  ...airportRelationships,
  ...airlineRelationships,
  ...countryRelationships,
  ...flightNumberKnowledgeRelationships,
];