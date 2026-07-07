import { airlines } from "@/data/seo/airlines";
import { airports } from "@/data/seo/airports";
import { countries } from "@/data/seo/countries";

export type EntityType =
  | "airline"
  | "airport"
  | "country"
  | "route"
  | "law"
  | "article";

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
];

export function getEntity(slug: string) {
  return registry.find((entity) => entity.slug === slug);
}

export function getEntitiesByType(type: EntityType) {
  return registry.filter((entity) => entity.type === type);
}
export function getEntityHref(
  slug: string,
  locale: string
) {
  const entity = getEntity(slug);

  if (!entity) return "#";

  return `/${locale}/${entity.hrefBase}/${entity.slug}`;
}