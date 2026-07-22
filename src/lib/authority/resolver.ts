import type { FlightRoute } from "@/data/seo/routes";
import { authorityRelationships } from "@/data/authority/relationships";
import { getAuthoritySources } from "@/lib/authority/registry";
import { getRouteAuthority } from "@/lib/authority/rules";

export type AuthorityEntityType =
  | "route"
  | "airline"
  | "airport"
  | "country"
  | "delay-reason";

export interface AuthorityResolverInput<T = unknown> {
  entityType: AuthorityEntityType;
  slug: string;
  entity?: T;
}

export function resolveAuthority<T>({
  entityType,
  slug,
  entity,
}: AuthorityResolverInput<T>) {

  const relationship = authorityRelationships.find(
    (entity) => entity.slug === slug
  );

  if (relationship) {
    return getAuthoritySources(relationship.authorityIds);
  }

  switch (entityType) {
    case "route":
      const route = entity as FlightRoute | undefined;
    return route ? getRouteAuthority(route) : [];

    case "airline":
    case "airport":
    case "country":
    case "delay-reason":
      return [];
  }
}