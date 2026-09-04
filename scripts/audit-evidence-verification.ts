import {
  applyLatestEvidenceReviews,
  createEvidenceReviewService,
  InMemoryEvidenceReviewRepository,
  type ResearchEvidence,
} from "../src/lib/research-evidence";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function main() {
  const evidence: ResearchEvidence[] = [
    {
      id: "evidence-1",
      questionId: "question-1",
      sourceType: "operational-provider",
      sourceName: "Audit provider",
      retrievedAt: "2026-09-04T08:00:00.000Z",
      rawFinding: "Final arrival delay was 246 minutes.",
      factKey: "arrival-delay-minutes",
      factValue: 246,
      confidence: "high",
      verificationStatus: "unverified",
    },
  ];

  const repository = new InMemoryEvidenceReviewRepository();
  const service = createEvidenceReviewService(repository);

  const first = await service.record({
    claimId: "claim-1",
    evidenceId: "evidence-1",
    status: "corroborated",
    reviewerType: "operator",
    reviewerId: "operator-1",
    method: "manual",
    note: "Matched against an independent movement record.",
  });
  await new Promise((resolve) => setTimeout(resolve, 2));
  const second = await service.record({
    claimId: "claim-1",
    evidenceId: "evidence-1",
    status: "verified",
    reviewerType: "operator",
    reviewerId: "operator-1",
    method: "manual",
    note: "Verified after source comparison.",
  });

  const reviews = await service.list("claim-1");
  assert(reviews.length === 2, "Review history must be append-only");
  assert(first.id !== second.id, "Each review event must have a unique identity");
  assert(reviews[0].status === "corroborated", "Earlier review history must be preserved");
  assert(reviews[1].status === "verified", "Later review history must be preserved");

  const effective = applyLatestEvidenceReviews(evidence, reviews);
  assert(
    effective[0].verificationStatus === "verified",
    "Latest review must determine the effective verification status",
  );
  assert(
    evidence[0].verificationStatus === "unverified",
    "Applying reviews must not mutate the immutable evidence row",
  );

  console.log("Evidence verification provenance audit");
  console.log("PASS — append-only review history, reviewer provenance, immutable evidence and latest-review status resolution behave as expected.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
