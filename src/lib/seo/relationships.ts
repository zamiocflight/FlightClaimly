import { getEntity } from "@/lib/entities";
import { getEntityHref } from "@/data/entities/registry";
import {
  relationships,
  type RelationshipType,
} from "@/data/knowledge/relationships";

export type RelatedKnowledgeItem = {
  label: string;
  href: string;
  type: string;
  entityType: RelationshipType;
};

type GetRelatedKnowledgeOptions = {
  allowedTypes?: RelationshipType[];
  limit?: number;
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

const typePriority: Record<RelationshipType, number> = {
  airport: 1,
  airline: 2,
  country: 3,
  route: 4,
  law: 5,
  article: 6,
  alliance: 7,
  hub: 8,
};

export function getRelationships(slug: string) {
  return relationships.find((entity) => entity.slug === slug);
}

export function getRelationshipsByType(
  slug: string,
  type: RelationshipType
) {
  const entity = getRelationships(slug);

  if (!entity) return [];

  return entity.relationships.filter(
    (relationship) => relationship.type === type
  );
}

export function getRelatedKnowledge(
  slug: string,
  locale: string,
  allowedTypesOrOptions?: RelationshipType[] | GetRelatedKnowledgeOptions
): RelatedKnowledgeItem[] {
  const entity = getRelationships(slug);

  if (!entity) return [];

  const options: GetRelatedKnowledgeOptions = Array.isArray(
    allowedTypesOrOptions
  )
    ? {
        allowedTypes: allowedTypesOrOptions,
        limit: 12,
      }
    : {
        allowedTypes: allowedTypesOrOptions?.allowedTypes,
        limit: allowedTypesOrOptions?.limit ?? 12,
      };

  return entity.relationships
    .filter((relationship) =>
      options.allowedTypes
        ? options.allowedTypes.includes(relationship.type)
        : true
    )
    .map((relationship) => {
      const relatedEntity = getEntity(relationship.slug);

      if (!relatedEntity) return null;

      const href = getEntityHref(relationship.slug, locale);

      if (href === "#") return null;

      return {
        label: relatedEntity.name,
        href,
        type: typeLabels[relationship.type],
        entityType: relationship.type,
      };
    })
    .filter(
      (item): item is RelatedKnowledgeItem =>
        item !== null
    )
    .sort((a, b) => {
      const priorityDifference =
        typePriority[a.entityType] - typePriority[b.entityType];

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return a.label.localeCompare(b.label);
    })
    .slice(0, options.limit);
}