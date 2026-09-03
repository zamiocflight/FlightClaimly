import type { LegalFacts } from "@/lib/passenger-rights/resolver";
import type { ClaimRightsAssessmentInput } from "./types";

function mapDelayReasonToRootCause(slug?: string): string | undefined {
  switch (slug) {
    case "technical-problems":
      return "technical-problem";
    case "hidden-manufacturing-defect":
      return "hidden-manufacturing-defect";
    case "bird-strike":
      return "bird-strike";
    case "airline-staff-strike":
      return "airline-staff-strike";
    default:
      return undefined;
  }
}

export function normalizeClaimRightsFacts(input: ClaimRightsAssessmentInput): LegalFacts {
  const article8Engaged =
    input.rights?.article8Engaged ??
    (input.disruption.type === "cancellation" || input.disruption.type === "denied-boarding"
      ? true
      : undefined);

  const article9Engaged =
    input.rights?.article9Engaged ??
    (input.disruption.type === "cancellation" || input.disruption.type === "denied-boarding"
      ? true
      : undefined);

  const rootCauseCategory = mapDelayReasonToRootCause(input.disruption.delayReasonSlug);

  return {
    departureAirport: {
      eu261Territory: input.departureAirport.eu261Territory,
    },
    arrivalAirport: {
      eu261Territory: input.arrivalAirport.eu261Territory,
    },
    operatingCarrier: {
      communityCarrier: input.operatingCarrier?.communityCarrier,
    },
    disruption: {
      type: input.disruption.type,
    },
    arrivalDelayMinutes: input.disruption.arrivalDelayMinutes,
    delay: {
      multipleCauses: input.disruption.multipleCauses,
    },
    airline: {
      defence: {
        extraordinaryCircumstancesClaimed: input.airline?.extraordinaryCircumstancesClaimed,
      },
    },
    rights: {
      article8Engaged,
      article9Engaged,
    },
    rootCause: {
      category: rootCauseCategory,
    },
    journey: {
      classChanged: input.journey?.classChanged,
    },
  };
}
