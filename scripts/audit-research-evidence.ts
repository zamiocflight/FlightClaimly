import {
  assessClaimWithResearchEvidence,
  type ResearchEvidence,
} from "../src/lib/research-evidence";
import type { ClaimRightsAssessmentInput } from "../src/lib/claim-rights";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const incompleteClaim: ClaimRightsAssessmentInput = {
  departureAirport: { iata: "CPH", eu261Territory: true },
  arrivalAirport: { iata: "LIS", eu261Territory: true },
  operatingCarrier: { code: "TP", communityCarrier: true },
  disruption: { type: "delay" },
};

const initial = assessClaimWithResearchEvidence(incompleteClaim);
const arrivalQuestion = initial.plan.questions.find(
  (item) => item.factKey === "arrival-delay-minutes",
);
const causeQuestion = initial.plan.questions.find(
  (item) => item.factKey === "delay-reason-slug",
);

assert(arrivalQuestion, "Planner should ask for final arrival delay when it is missing");
assert(causeQuestion, "Planner should ask for disruption cause when it is missing");
assert(
  initial.enrichedInput.disruption.arrivalDelayMinutes === undefined,
  "Missing evidence must not invent an arrival delay",
);

const verifiedEvidence: ResearchEvidence[] = [
  {
    id: "evidence-arrival-1",
    questionId: arrivalQuestion.id,
    sourceType: "operational-provider",
    sourceName: "Operational flight record",
    retrievedAt: "2026-09-04T08:00:00.000Z",
    rawFinding: "Final arrival delay recorded as 246 minutes.",
    normalizedFinding: "arrivalDelayMinutes=246",
    factKey: "arrival-delay-minutes",
    factValue: 246,
    confidence: "high",
    verificationStatus: "verified",
  },
  {
    id: "evidence-cause-1",
    questionId: causeQuestion.id,
    sourceType: "airline",
    sourceName: "Airline disruption notice",
    retrievedAt: "2026-09-04T08:02:00.000Z",
    rawFinding: "Airline stated that the disruption was caused by a technical problem.",
    normalizedFinding: "delayReasonSlug=technical-problems",
    factKey: "delay-reason-slug",
    factValue: "technical-problems",
    confidence: "high",
    verificationStatus: "verified",
  },
];

const enriched = assessClaimWithResearchEvidence(incompleteClaim, verifiedEvidence);
assert(
  enriched.enrichedInput.disruption.arrivalDelayMinutes === 246,
  "Verified operational evidence should enrich final arrival delay",
);
assert(
  enriched.enrichedInput.disruption.delayReasonSlug === "technical-problems",
  "Verified cause evidence should enrich the disruption reason",
);
assert(
  enriched.enrichedAssessment.compensation.status === "potentially-entitled",
  "Verified four-hour technical delay should allow the legal engine to establish potential compensation",
);
assert(
  enriched.resolution.resolvedQuestionIds.includes(arrivalQuestion.id),
  "Arrival-delay research question should resolve after verified evidence",
);

const unverified = assessClaimWithResearchEvidence(incompleteClaim, [
  {
    ...verifiedEvidence[0],
    id: "unverified-arrival",
    verificationStatus: "unverified",
  },
]);
assert(
  unverified.enrichedInput.disruption.arrivalDelayMinutes === undefined,
  "Unverified evidence must never be promoted into legal facts",
);

const conflicting = assessClaimWithResearchEvidence(incompleteClaim, [
  verifiedEvidence[0],
  {
    ...verifiedEvidence[0],
    id: "evidence-arrival-conflict",
    sourceType: "airline",
    sourceName: "Airline response",
    factValue: 95,
    rawFinding: "Airline states final arrival delay was 95 minutes.",
    verificationStatus: "corroborated",
  },
]);
assert(
  conflicting.enrichedInput.disruption.arrivalDelayMinutes === undefined,
  "Conflicting evidence must not be promoted into legal facts",
);
assert(
  conflicting.resolution.conflictingQuestionIds.includes(arrivalQuestion.id),
  "Conflicting evidence should mark the research question as conflicting",
);

const cancellation: ClaimRightsAssessmentInput = {
  departureAirport: { eu261Territory: true },
  arrivalAirport: { eu261Territory: true },
  operatingCarrier: { communityCarrier: true },
  disruption: { type: "cancellation" },
};
const cancellationResearch = assessClaimWithResearchEvidence(cancellation);
assert(
  cancellationResearch.originalAssessment.care.potentiallyEngaged,
  "Research layer must preserve Article 9 care assessment for cancellations",
);
assert(
  cancellationResearch.originalAssessment.reroutingOrRefund.potentiallyEngaged,
  "Research layer must preserve Article 8 rerouting/refund assessment for cancellations",
);

const noisyAssessmentInput: ClaimRightsAssessmentInput = {
  departureAirport: {},
  arrivalAirport: {},
  disruption: {},
};
const consolidated = assessClaimWithResearchEvidence(noisyAssessmentInput);
const factKeys = consolidated.plan.questions
  .map((item) => item.factKey)
  .filter((value): value is NonNullable<typeof value> => Boolean(value));
assert(
  new Set(factKeys).size === factKeys.length,
  "Planner must emit at most one investigation task per structured fact key",
);
const genericKinds = consolidated.plan.questions
  .filter((item) => !item.factKey)
  .map((item) => item.kind);
assert(
  new Set(genericKinds).size === genericKinds.length,
  "Planner must consolidate semantically overlapping non-fact tasks by investigation kind",
);
assert(
  consolidated.plan.questions.length <= 16,
  `Planner quality guard: expected at most 16 actionable tasks, received ${consolidated.plan.questions.length}`,
);

console.log("Research / Evidence Engine audit");
console.log("Scenarios: 6");
console.log("PASS — planning, consolidation, verified enrichment, unverified isolation, conflict safety and rights preservation behave as expected.");
