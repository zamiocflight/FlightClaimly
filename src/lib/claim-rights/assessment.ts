import { legalRulesRegistry } from "@/data/passenger-rights/rules";
import { getDelayReasonAssessment } from "@/lib/delay-reasons/assessment";
import { resolveLegalRule } from "@/lib/passenger-rights/resolver";
import { normalizeClaimRightsFacts } from "./normalize";
import type {
  ClaimRightsAssessment,
  ClaimRightsAssessmentInput,
  CompensationAssessmentStatus,
} from "./types";

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function determineEu261Status(
  matchedIds: Set<string>,
  unresolvedIds: Set<string>,
): ClaimRightsAssessment["legalRegime"]["eu261"] {
  if (matchedIds.has("eu261-scope-departure-eu")) return "applies";
  if (matchedIds.has("eu261-scope-arrival-eu-eu-carrier")) return "potentially-applies";
  if (
    unresolvedIds.has("eu261-scope-departure-eu") ||
    unresolvedIds.has("eu261-scope-arrival-eu-eu-carrier")
  ) {
    return "potentially-applies";
  }
  return "not-established";
}

function determineCompensationStatus(
  matchedIds: Set<string>,
  extraordinaryClaimed: boolean,
): CompensationAssessmentStatus {
  const hasCompensationTrigger =
    matchedIds.has("eu261-long-delay-compensation") ||
    matchedIds.has("eu261-cancellation-rights") ||
    matchedIds.has("eu261-denied-boarding-rights");

  if (!hasCompensationTrigger) return "not-established";
  if (extraordinaryClaimed) return "defence-under-review";
  return "potentially-entitled";
}

export function assessClaimRights(input: ClaimRightsAssessmentInput): ClaimRightsAssessment {
  const facts = normalizeClaimRightsFacts(input);
  const resolved = legalRulesRegistry.map((rule) => resolveLegalRule(rule, facts));
  const matched = resolved.filter((entry) => entry.status === "matched");
  const unresolved = resolved.filter((entry) => entry.status === "unresolved");
  const notMatched = resolved.filter((entry) => entry.status === "not-matched");

  const matchedIds = new Set(matched.map(({ rule }) => rule.id));
  const unresolvedIds = new Set(unresolved.map(({ rule }) => rule.id));
  const extraordinaryClaimed = input.airline?.extraordinaryCircumstancesClaimed === true;
  const delayReason = input.disruption.delayReasonSlug
    ? getDelayReasonAssessment(input.disruption.delayReasonSlug)
    : undefined;

  const activeCandidates = [...matched, ...unresolved];
  const passengerRightIds = unique(
    activeCandidates.flatMap(({ rule }) => rule.passengerRightIds),
  );
  const evidenceTargets = unique([
    ...activeCandidates.flatMap(({ rule }) => rule.evidenceTargets),
    ...(delayReason?.evidenceTargets ?? []),
  ]);
  const assessmentQuestions = unique([
    ...activeCandidates.flatMap(({ rule }) => rule.assessmentQuestions),
    ...(delayReason?.airlineQuestions ?? []),
  ]);
  const authorityIds = unique(
    activeCandidates.flatMap(({ rule }) => rule.authorityIds),
  );
  const legalReferenceIds = unique(
    activeCandidates.flatMap(({ rule }) => rule.legalReferenceIds),
  );

  const eu261 = determineEu261Status(matchedIds, unresolvedIds);
  const compensationStatus = determineCompensationStatus(matchedIds, extraordinaryClaimed);
  const carePotentiallyEngaged =
    matchedIds.has("eu261-care-obligation") ||
    matchedIds.has("eu261-delay-assistance") ||
    matchedIds.has("eu261-cancellation-rights") ||
    matchedIds.has("eu261-denied-boarding-rights");
  const reroutingOrRefundPotentiallyEngaged =
    matchedIds.has("eu261-reimbursement-rerouting-choice") ||
    matchedIds.has("eu261-cancellation-rights") ||
    matchedIds.has("eu261-denied-boarding-rights");

  const status: ClaimRightsAssessment["status"] =
    eu261 === "not-established"
      ? "insufficient-facts"
      : unresolved.length > 0 || extraordinaryClaimed || delayReason?.rootCauseRequired
        ? "investigation-required"
        : "ready-for-legal-review";

  return {
    status,
    legalRegime: { eu261 },
    rules: { matched, unresolved, notMatched },
    passengerRightIds,
    compensation: {
      status: compensationStatus,
      amountReason:
        compensationStatus === "not-established"
          ? undefined
          : "Article 7 amount is not calculated until entitlement, route category and any reduction are established.",
    },
    care: { potentiallyEngaged: carePotentiallyEngaged },
    reroutingOrRefund: { potentiallyEngaged: reroutingOrRefundPotentiallyEngaged },
    extraordinaryCircumstances: {
      claimed: extraordinaryClaimed,
      requiresReview:
        extraordinaryClaimed ||
        matchedIds.has("eu261-extraordinary-circumstances-defence") ||
        Boolean(delayReason && delayReason.liabilityBaseline !== "usually-compensable"),
    },
    delayReason,
    evidenceTargets,
    assessmentQuestions,
    authorityIds,
    legalReferenceIds,
  };
}
