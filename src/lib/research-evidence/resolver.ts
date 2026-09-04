import type {
  EvidenceConfidence,
  ResearchEvidence,
  ResearchFactKey,
  ResearchPlan,
  ResearchResolution,
  ResolvedResearchFact,
} from "./types";

const confidenceRank: Record<EvidenceConfidence, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

function comparable(value: string | number | boolean | undefined): string {
  return `${typeof value}:${String(value)}`;
}

function resolveFact(key: ResearchFactKey, evidence: ResearchEvidence[]): ResolvedResearchFact {
  const usable = evidence.filter(
    (item) =>
      item.factKey === key &&
      item.factValue !== undefined &&
      item.verificationStatus !== "unverified",
  );

  if (!usable.length) {
    return { key, status: "unresolved", evidenceIds: [] };
  }

  const values = new Map<string, ResearchEvidence[]>();
  for (const item of usable) {
    const identity = comparable(item.factValue);
    values.set(identity, [...(values.get(identity) ?? []), item]);
  }

  if (values.size > 1 || usable.some((item) => item.verificationStatus === "conflicting")) {
    return {
      key,
      status: "conflicting",
      evidenceIds: usable.map((item) => item.id),
    };
  }

  const best = [...usable].sort((a, b) => {
    const verificationRank = { verified: 3, corroborated: 2, conflicting: 1, unverified: 0 } as const;
    const verificationDelta = verificationRank[b.verificationStatus] - verificationRank[a.verificationStatus];
    return verificationDelta || confidenceRank[b.confidence] - confidenceRank[a.confidence];
  })[0];

  const hasVerified = usable.some((item) => item.verificationStatus === "verified");
  return {
    key,
    value: best.factValue,
    status: hasVerified ? "verified" : "supported",
    confidence: best.confidence,
    evidenceIds: usable.map((item) => item.id),
  };
}

export function resolveResearchEvidence(
  plan: ResearchPlan,
  evidence: ResearchEvidence[],
): ResearchResolution {
  const factKeys = [...new Set(plan.questions.flatMap((item) => (item.factKey ? [item.factKey] : [])))];
  const facts = factKeys.map((key) => resolveFact(key, evidence));
  const factByKey = new Map(facts.map((fact) => [fact.key, fact]));

  const resolvedQuestionIds: string[] = [];
  const unresolvedQuestionIds: string[] = [];
  const conflictingQuestionIds: string[] = [];

  for (const question of plan.questions) {
    const directEvidence = evidence.filter((item) => item.questionId === question.id);
    const fact = question.factKey ? factByKey.get(question.factKey) : undefined;

    if (fact?.status === "conflicting" || directEvidence.some((item) => item.verificationStatus === "conflicting")) {
      conflictingQuestionIds.push(question.id);
    } else if (
      fact?.status === "verified" ||
      fact?.status === "supported" ||
      directEvidence.some((item) => item.verificationStatus === "verified" || item.verificationStatus === "corroborated")
    ) {
      resolvedQuestionIds.push(question.id);
    } else {
      unresolvedQuestionIds.push(question.id);
    }
  }

  return {
    facts,
    resolvedQuestionIds,
    unresolvedQuestionIds,
    conflictingQuestionIds,
  };
}
