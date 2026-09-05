import {
  assessClaimWithResearchEvidence,
  createEvidenceRegistry,
  InMemoryEvidenceRegistryRepository,
  type ResearchEvidence,
  type ResearchEvidenceProvider,
} from "../src/lib/research-evidence";
import type { ClaimRightsAssessmentInput } from "../src/lib/claim-rights";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function main() {
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
    arrivalQuestion.question === "Verify the passenger's final arrival delay in minutes.",
    "Arrival-delay task should be phrased as a clear operator action",
  );
  assert(
    causeQuestion.question === "Establish and verify the disruption's root cause.",
    "Cause task should be phrased as a clear operator action",
  );
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
  assert(
    consolidated.plan.questions.every((item) => /^(Verify|Establish|Investigate|Collect)/.test(item.question)),
    "Every operator-facing research task should begin with a clear action verb",
  );

  const mockProvider: ResearchEvidenceProvider = {
    id: "audit-operational-provider",
    name: "Audit Operational Provider",
    supports(question) {
      return question.factKey === "arrival-delay-minutes";
    },
    async research() {
      return [
        {
          sourceType: "operational-provider",
          sourceName: "Audit flight movement record",
          sourceRecordId: "movement-123",
          rawFinding: "Final arrival delay was 246 minutes.",
          normalizedFinding: "arrivalDelayMinutes=246",
          factKey: "arrival-delay-minutes",
          factValue: 246,
          confidence: "high",
          metadata: { providerRecordVersion: 1 },
        },
      ];
    },
  };

  const repository = new InMemoryEvidenceRegistryRepository();
  const registry = createEvidenceRegistry(repository);
  const firstCollection = await registry.collect({
    claimId: "claim-audit-1",
    question: arrivalQuestion,
    claimInput: incompleteClaim,
    provider: mockProvider,
  });
  const secondCollection = await registry.collect({
    claimId: "claim-audit-1",
    question: arrivalQuestion,
    claimInput: incompleteClaim,
    provider: mockProvider,
  });
  const persisted = await registry.list("claim-audit-1");

  assert(firstCollection.length === 1, "Supported provider should produce registry evidence");
  assert(
    firstCollection[0].verificationStatus === "unverified",
    "Provider findings must enter the registry as unverified",
  );
  assert(
    firstCollection[0].providerId === mockProvider.id,
    "Registry must preserve provider provenance",
  );
  assert(
    Boolean(firstCollection[0].contentHash),
    "Registry must fingerprint evidence for idempotent persistence",
  );
  assert(
    secondCollection[0].id === firstCollection[0].id && persisted.length === 1,
    "Repeated provider collection must be idempotent",
  );
  const registryAssessment = assessClaimWithResearchEvidence(incompleteClaim, persisted);
  assert(
    registryAssessment.enrichedInput.disruption.arrivalDelayMinutes === undefined,
    "Fresh provider evidence must not bypass verification and enter the legal engine",
  );

  console.log("Research / Evidence Engine audit");
  console.log("Scenarios: 7");
  console.log("PASS — planning, consolidation, actionable wording, provider boundary, provenance, idempotent registry persistence, verified enrichment, unverified isolation, conflict safety and rights preservation behave as expected.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
