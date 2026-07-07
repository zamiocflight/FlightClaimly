import { getEntity } from "@/lib/entities";
import { getEntityHref } from "@/data/entities/registry";
import {
  relationships,
  type Relationship,
  type RelationshipType,
} from "@/data/knowledge/relationships";

type RelatedKnowledgeItem = {
  label: string;
  href: string;
  type: string;
};

const typeLabels: Record<RelationshipType, string> = {
  airline: "Airline",
  airport: "Airport",
  country: "Country",
  route: "Route",
  alliance: "Alliance",
  hub: "Hub",
  law: "Law",
  article: "Guide",
};


export function getRelationships(slug: string) {
  return relationships.find((entity) => entity.slug === slug);
}

export function getRelationshipsByType(slug: string, type: RelationshipType) {
  const entity = getRelationships(slug);

  if (!entity) return [];

  return entity.relationships.filter(
    (relationship) => relationship.type === type
  );
}

export function getRelatedKnowledge(
  slug: string,
  locale: string,
  allowedTypes?: RelationshipType[]
): RelatedKnowledgeItem[] {
  const entity = getRelationships(slug);

  if (!entity) return [];

  return entity.relationships
    .filter((relationship) =>
      allowedTypes ? allowedTypes.includes(relationship.type) : true
    )
    .map((relationship) => {
      const relatedEntity = getEntity(relationship.slug);

      if (!relatedEntity) return null;

      return {
        label: relatedEntity.name,
        href: getEntityHref(relationship.slug, locale),
        type: typeLabels[relationship.type],
      };
    })
    .filter((item): item is RelatedKnowledgeItem => item !== null);
}