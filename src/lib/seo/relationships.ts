import { getEntity } from "@/lib/entities";
import { getEntityHref } from "@/data/entities/registry";
import { getRouteRelevanceScore } from "@/lib/knowledge/routes";
import { getRouteBySlug } from "@/data/seo/routes";
import {
  relationships,
  type RelationshipType,
} from "@/data/knowledge/relationships";
import {
  getContextualBonuses,
  getEntityScore,
} from "@/lib/knowledge/relevance";

export type RelatedKnowledgeItem = {
  slug: string;
  label: string;
  href: string;
  type: string;
  entityType: RelationshipType;
  score: number;
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

      const route =
  relationship.type === "route"
    ? getRouteBySlug(relationship.slug)
    : undefined;

const relevanceBonus =
  route ? getRouteRelevanceScore(route) : 0;

const contextualBonuses = getContextualBonuses(
  slug,
  relationship.slug
);

      return {
        slug: relationship.slug,
        label: relatedEntity.name,
        href,
        type: typeLabels[relationship.type],
        entityType: relationship.type,
score: getEntityScore(
  relationship.type,
  relevanceBonus,
  contextualBonuses
),
      };
    })
    .filter(
      (item): item is RelatedKnowledgeItem =>
        item !== null
    )
 .sort((a, b) => {
  const scoreDifference = b.score - a.score;

  if (scoreDifference !== 0) {
    return scoreDifference;
  }

  return a.label.localeCompare(b.label);
})
    .slice(0, options.limit);
}