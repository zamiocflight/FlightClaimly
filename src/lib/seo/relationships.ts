import { airlines } from "@/data/seo/airlines";
import { airports } from "@/data/entities/airports";
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

const routePrefixes: Record<RelationshipType, string> = {
  airline: "airlines",
  airport: "airports",
  country: "countries",
  route: "routes",
  alliance: "alliances",
  hub: "airports",
  law: "laws",
  article: "guides",
};

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function resolveLabel(relationship: Relationship) {
  if (relationship.type === "airline") {
    const airline = airlines.find((item) => item.slug === relationship.slug);
    return airline?.name ?? humanizeSlug(relationship.slug);
  }

  if (relationship.type === "airport") {
  const airport = airports.find(
    (item) => item.slug === relationship.slug
  );

  return airport?.name ?? humanizeSlug(relationship.slug);
}

return humanizeSlug(relationship.slug);
}

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
    .map((relationship) => ({
      label: resolveLabel(relationship),
      href: `/${locale}/${routePrefixes[relationship.type]}/${relationship.slug}`,
      type: typeLabels[relationship.type],
    }));
}