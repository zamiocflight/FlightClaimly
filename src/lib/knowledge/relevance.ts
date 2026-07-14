import {
  relationships,
  type RelationshipType,
} from "@/data/knowledge/relationships";

export const relationshipWeights: Record<RelationshipType, number> = {
  airport: 100,
  airline: 98,
  route: 95,
  country: 75,
  hub: 65,
  alliance: 60,
  law: 45,
  article: 30,
};

export type EntityScoreBonuses = {
  sameAirport?: boolean;
  sameAirline?: boolean;
  sameCountry?: boolean;
  hub?: boolean;
  popular?: boolean;
};

export type EntityTraits = {
  hub?: boolean;
  popular?: boolean;
  capital?: boolean;
  international?: boolean;
  domestic?: boolean;
  flagCarrier?: boolean;
};

const bonusWeights: Record<keyof EntityScoreBonuses, number> = {
  sameAirport: 40,
  sameAirline: 30,
  sameCountry: 20,
  hub: 20,
  popular: 15,
};

const traitWeights: Record<keyof EntityTraits, number> = {
  hub: 20,
  popular: 15,
  capital: 10,
  international: 10,
  domestic: 5,
  flagCarrier: 20,
};

export function getRelationshipWeight(type: RelationshipType): number {
  return relationshipWeights[type] ?? 0;
}

export function getEntityScore(
  type: RelationshipType,
  relevanceBonus = 0,
  bonuses: EntityScoreBonuses = {}
): number {
  const contextualBonus = Object.entries(bonuses).reduce(
    (total, [key, enabled]) => {
      if (!enabled) return total;

      return (
        total +
        bonusWeights[key as keyof EntityScoreBonuses]
      );
    },
    0
  );

  return (
    getRelationshipWeight(type) +
    relevanceBonus +
    contextualBonus
  );
}
function getRelationshipSlugs(
  entitySlug: string,
  type: RelationshipType
): Set<string> {
  const entity = relationships.find(
    (item) => item.slug === entitySlug
  );

  return new Set(
    entity?.relationships
      .filter((relationship) => relationship.type === type)
      .map((relationship) => relationship.slug) ?? []
  );
}

function sharesRelationshipType(
  sourceSlug: string,
  targetSlug: string,
  type: RelationshipType
): boolean {
  const sourceSlugs = getRelationshipSlugs(sourceSlug, type);
  const targetSlugs = getRelationshipSlugs(targetSlug, type);

  return [...sourceSlugs].some((slug) => targetSlugs.has(slug));
}

export function getContextualBonuses(
  sourceSlug: string,
  targetSlug: string
): EntityScoreBonuses {
  return {
    sameCountry: sharesRelationshipType(
      sourceSlug,
      targetSlug,
      "country"
    ),
    sameAirline: sharesRelationshipType(
      sourceSlug,
      targetSlug,
      "airline"
    ),
    sameAirport: sharesRelationshipType(
      sourceSlug,
      targetSlug,
      "airport"
    ),
  };
}
export function getTraitScore(
  traits: EntityTraits = {}
): number {
  return Object.entries(traits).reduce(
    (total, [key, enabled]) => {
      if (!enabled) return total;

      return (
        total +
        traitWeights[key as keyof EntityTraits]
      );
    },
    0
  );
}