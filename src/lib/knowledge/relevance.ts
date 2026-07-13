import type { RelationshipType } from "@/data/knowledge/relationships";

export const relationshipWeights: Record<RelationshipType, number> = {
  airport: 100,
  route: 95,
  airline: 90,
  country: 70,
  hub: 60,
  alliance: 55,
  law: 40,
  article: 20,
};

export type EntityScoreBonuses = {
  sameAirport?: boolean;
  sameAirline?: boolean;
  sameCountry?: boolean;
  hub?: boolean;
  popular?: boolean;
};

const bonusWeights: Record<keyof EntityScoreBonuses, number> = {
  sameAirport: 40,
  sameAirline: 30,
  sameCountry: 20,
  hub: 20,
  popular: 15,
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