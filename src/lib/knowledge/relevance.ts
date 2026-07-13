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

export function getRelationshipWeight(type: RelationshipType): number {
  return relationshipWeights[type] ?? 0;
}
export function getEntityScore(
  type: RelationshipType,
  score = 0
): number {
  return getRelationshipWeight(type) + score;
}