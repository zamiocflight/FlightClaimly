import type { FlightRoute } from "@/data/seo/routes";
import { authorityRelationships } from "@/data/authority/relationships";
import { getAuthoritySources } from "@/lib/authority/registry";
import { getRouteAuthority } from "@/lib/authority/rules";

export function getEntityAuthority(
  slug: string,
  route?: FlightRoute
) {
  const relationship = authorityRelationships.find(
    (entity) => entity.slug === slug
  );

  if (relationship) {
    return getAuthoritySources(relationship.authorityIds);
  }

  if (route) {
    return getRouteAuthority(route);
  }

  return [];
}