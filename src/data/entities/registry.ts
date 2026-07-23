import { flightNumbers } from "@/data/flight-numbers/flightNumbers";
import { airlines } from "@/data/seo/airlines";
import { airports } from "@/data/seo/airports";
import { countries } from "@/data/seo/countries";
import { routes } from "@/data/seo/routes";

export type EntityType =
  | "airline"
  | "airport"
  | "country"
  | "route"
  | "law"
  | "article"
  | "flight-number";

export type RegistryEntity = {
  type: EntityType;
  slug: string;
  name: string;
  hrefBase: string;
};

export const registry: RegistryEntity[] = [
  ...airlines.map((airline) => ({
    type: "airline" as const,
    slug: airline.slug,
    name: airline.name,
    hrefBase: "airlines",
  })),

  ...airports.map((airport) => ({
    type: "airport" as const,
    slug: airport.slug,
    name: airport.name,
    hrefBase: "airports",
  })),

  ...countries.map((country) => ({
    type: "country" as const,
    slug: country.slug,
    name: country.name,
    hrefBase: "countries",
  })),

  ...routes.map((route) => ({
    type: "route" as const,
    slug: route.slug,
    name: route.name,
    hrefBase: "routes",
  })),

  ...flightNumbers.map((flightNumber) => ({
    type: "flight-number" as const,
    slug: flightNumber.slug,
    name: flightNumber.flightNumber,
    hrefBase: "flight-numbers",
  })),
];

export function getEntity(slug: string) {
  return registry.find((entity) => entity.slug === slug);
}

export function getEntitiesByType(type: EntityType) {
  return registry.filter((entity) => entity.type === type);
}

export function getEntityHref(slug: string, locale: string) {
  const entity = getEntity(slug);

  if (!entity) return "#";

  return `/${locale}/${entity.hrefBase}/${entity.slug}`;
}