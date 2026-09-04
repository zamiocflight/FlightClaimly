import { assessClaimRights } from "@/lib/claim-rights";
import type { ClaimRightsAssessmentInput } from "@/lib/claim-rights";
import { createResearchPlan } from "./planner";
import { resolveResearchEvidence } from "./resolver";
import type {
  ResearchEvidence,
  ResearchEvidenceAssessment,
  ResolvedResearchFact,
} from "./types";

function accepted(fact: ResolvedResearchFact | undefined): fact is ResolvedResearchFact & { value: string | number | boolean } {
  return Boolean(
    fact &&
    (fact.status === "verified" || fact.status === "supported") &&
    fact.value !== undefined,
  );
}

function asBoolean(value: string | number | boolean | undefined): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function asNumber(value: string | number | boolean | undefined): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asString(value: string | number | boolean | undefined): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export function enrichClaimRightsInput(
  input: ClaimRightsAssessmentInput,
  facts: ResolvedResearchFact[],
): ClaimRightsAssessmentInput {
  const byKey = new Map(facts.map((fact) => [fact.key, fact]));
  const value = (key: ResolvedResearchFact["key"]) => {
    const fact = byKey.get(key);
    return accepted(fact) ? fact.value : undefined;
  };

  const disruptionType = asString(value("disruption-type"));

  return {
    ...input,
    departureAirport: {
      ...input.departureAirport,
      eu261Territory:
        asBoolean(value("departure-airport-eu261-territory")) ??
        input.departureAirport.eu261Territory,
    },
    arrivalAirport: {
      ...input.arrivalAirport,
      eu261Territory:
        asBoolean(value("arrival-airport-eu261-territory")) ??
        input.arrivalAirport.eu261Territory,
    },
    operatingCarrier: {
      ...input.operatingCarrier,
      code: asString(value("operating-carrier-code")) ?? input.operatingCarrier?.code,
      communityCarrier:
        asBoolean(value("operating-carrier-community-carrier")) ??
        input.operatingCarrier?.communityCarrier,
    },
    disruption: {
      ...input.disruption,
      type:
        disruptionType === "delay" ||
        disruptionType === "cancellation" ||
        disruptionType === "denied-boarding" ||
        disruptionType === "other"
          ? disruptionType
          : input.disruption.type,
      arrivalDelayMinutes:
        asNumber(value("arrival-delay-minutes")) ?? input.disruption.arrivalDelayMinutes,
      departureDelayMinutes:
        asNumber(value("departure-delay-minutes")) ?? input.disruption.departureDelayMinutes,
      delayReasonSlug:
        asString(value("delay-reason-slug")) ?? input.disruption.delayReasonSlug,
    },
    airline: {
      ...input.airline,
      extraordinaryCircumstancesClaimed:
        asBoolean(value("extraordinary-circumstances-claimed")) ??
        input.airline?.extraordinaryCircumstancesClaimed,
    },
    rights: {
      ...input.rights,
      article8Engaged:
        asBoolean(value("article8-engaged")) ?? input.rights?.article8Engaged,
      article9Engaged:
        asBoolean(value("article9-engaged")) ?? input.rights?.article9Engaged,
    },
  };
}

export function assessClaimWithResearchEvidence(
  input: ClaimRightsAssessmentInput,
  evidence: ResearchEvidence[] = [],
): ResearchEvidenceAssessment {
  const originalAssessment = assessClaimRights(input);
  const plan = createResearchPlan(input, originalAssessment);
  const resolution = resolveResearchEvidence(plan, evidence);
  const enrichedInput = enrichClaimRightsInput(input, resolution.facts);
  const enrichedAssessment = assessClaimRights(enrichedInput);

  return {
    originalInput: input,
    originalAssessment,
    plan,
    evidence,
    resolution,
    enrichedInput,
    enrichedAssessment,
  };
}
