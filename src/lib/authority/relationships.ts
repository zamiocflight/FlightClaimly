import { authorityRelationships } from "@/data/authority/relationships";
import { getAuthoritySources } from "@/lib/authority/registry";

export function getEntityAuthority(slug: string) {
  const relationship = authorityRelationships.find(
    (entity) => entity.slug === slug
  );

  if (!relationship) {
    return [];
  }

  return getAuthoritySources(relationship.authorityIds);
}