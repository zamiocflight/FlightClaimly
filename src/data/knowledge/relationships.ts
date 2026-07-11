import { airlines } from "@/data/seo/airlines";
import { airports } from "@/data/seo/airports";
import { countries } from "@/data/seo/countries";
import { routes } from "@/data/seo/routes";

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
  return countries.find((country) => country.name === countryName)?.slug;
}

function removeDuplicateRelationships(
  relationships: Relationship[]
): Relationship[] {
  const seen = new Set<string>();

  return relationships.filter((relationship) => {
    const key = `${relationship.type}:${relationship.slug}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

const routeRelationships: EntityRelationships[] = routes.map((route) => {
  const originCountrySlug = getCountrySlug(route.origin.country);
  const destinationCountrySlug = getCountrySlug(route.destination.country);

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

const airportRelationships: EntityRelationships[] = airports.map((airport) => {
  const countrySlug = getCountrySlug(airport.country);

  const airportRoutes = routes.filter(
    (route) =>
      route.origin.slug === airport.slug ||
      route.destination.slug === airport.slug
  );

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
});

const airlineRelationships: EntityRelationships[] = airlines.map((airline) => {
  const countrySlugs =
  airline.countrySlugs ??
  [getCountrySlug(airline.country)].filter(
    (slug): slug is string => Boolean(slug)
  );

  const airlineRoutes = routes.filter((route) =>
    route.airlines.some(
      (routeAirline) => routeAirline.slug === airline.slug
    )
  );

  const airlineAirportRelationships = airlineRoutes.flatMap((route) => [
    {
      type: "airport" as const,
      slug: route.origin.slug,
    },
    {
      type: "airport" as const,
      slug: route.destination.slug,
    },
  ]);

  return {
    slug: airline.slug,
    relationships: removeDuplicateRelationships([
      ...countrySlugs.map((countrySlug) => ({
  type: "country" as const,
  slug: countrySlug,
})),

      ...airlineAirportRelationships,

      ...airlineRoutes.map((route) => ({
        type: "route" as const,
        slug: route.slug,
      })),
    ]),
  };
});

const countryRelationships: EntityRelationships[] = countries.map((country) => {
  const countryAirports = airports.filter(
    (airport) => airport.country === country.name
  );

  const countryAirlines = airlines.filter(
    (airline) => airline.country === country.name
  );

  const countryRoutes = routes.filter(
    (route) =>
      route.origin.country === country.name ||
      route.destination.country === country.name
  );

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
});

export const relationships: EntityRelationships[] = [
  ...routeRelationships,
  ...airportRelationships,
  ...airlineRelationships,
  ...countryRelationships,
];