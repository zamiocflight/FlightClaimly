import type {
  ClaimRightsAssessment,
  ClaimRightsAssessmentInput,
} from "@/lib/claim-rights";
import type {
  ResearchPlan,
  ResearchQuestion,
  ResearchQuestionKind,
  ResearchFactKey,
} from "./types";

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

function inferKind(text: string): ResearchQuestionKind {
  const value = text.toLowerCase();
  if (value.includes("carrier") || value.includes("operating airline")) return "carrier";
  if (value.includes("airport") || value.includes("departure") || value.includes("arrival territory")) return "geography";
  if (value.includes("delay") || value.includes("arrival time") || value.includes("flight movement")) return "flight-operation";
  if (value.includes("cause") || value.includes("reason") || value.includes("technical") || value.includes("weather")) return "disruption-cause";
  if (value.includes("extraordinary") || value.includes("defence") || value.includes("defense")) return "airline-defence";
  if (value.includes("document") || value.includes("booking") || value.includes("ticket") || value.includes("receipt")) return "document";
  if (value.includes("article") || value.includes("right") || value.includes("rerout") || value.includes("care")) return "passenger-right";
  return "other";
}

function inferFactKey(text: string): ResearchFactKey | undefined {
  const value = text.toLowerCase();
  if (value.includes("arrival delay") || value.includes("final arrival") || value.includes("actual arrival")) return "arrival-delay-minutes";
  if (value.includes("departure delay") || value.includes("actual departure")) return "departure-delay-minutes";
  if (value.includes("community carrier") || value.includes("eu carrier")) return "operating-carrier-community-carrier";
  if (value.includes("operating carrier") || value.includes("operating airline")) return "operating-carrier-code";
  if (value.includes("disruption type") || value.includes("cancel") || value.includes("denied boarding")) return "disruption-type";
  if (value.includes("cause") || value.includes("reason for") || value.includes("root cause")) return "delay-reason-slug";
  if (value.includes("extraordinary")) return "extraordinary-circumstances-claimed";
  if (value.includes("article 8") || value.includes("rerout") || value.includes("refund")) return "article8-engaged";
  if (value.includes("article 9") || value.includes("care") || value.includes("meal") || value.includes("hotel")) return "article9-engaged";
  return undefined;
}

function question(
  text: string,
  source: "assessment-question" | "evidence-target" | "missing-fact",
  priority: ResearchQuestion["priority"],
): ResearchQuestion {
  return {
    id: `${source}:${slug(text)}`,
    kind: inferKind(text),
    question: text,
    target: source === "evidence-target" ? text : undefined,
    factKey: inferFactKey(text),
    status: "open",
    priority,
  };
}

function explicitMissingFacts(input: ClaimRightsAssessmentInput): ResearchQuestion[] {
  const missing: Array<[boolean, string, ResearchFactKey, ResearchQuestionKind]> = [
    [input.departureAirport.eu261Territory === undefined, "Establish whether the departure airport is within EU261 territory.", "departure-airport-eu261-territory", "geography"],
    [input.arrivalAirport.eu261Territory === undefined, "Establish whether the arrival airport is within EU261 territory.", "arrival-airport-eu261-territory", "geography"],
    [!input.operatingCarrier?.code, "Verify the operating carrier for the disrupted flight.", "operating-carrier-code", "carrier"],
    [input.operatingCarrier?.communityCarrier === undefined, "Establish whether the operating carrier is a Community carrier for EU261 scope.", "operating-carrier-community-carrier", "carrier"],
    [input.disruption.type === undefined, "Establish the disruption type: delay, cancellation or denied boarding.", "disruption-type", "flight-operation"],
    [input.disruption.arrivalDelayMinutes === undefined, "Establish the final arrival delay in minutes.", "arrival-delay-minutes", "flight-operation"],
    [!input.disruption.delayReasonSlug, "Establish the verified reason or root cause for the disruption.", "delay-reason-slug", "disruption-cause"],
  ];

  return missing
    .filter(([isMissing]) => isMissing)
    .map(([, text, factKey, kind]) => ({
      id: `missing-fact:${factKey}`,
      kind,
      question: text,
      factKey,
      status: "open" as const,
      priority: "high" as const,
    }));
}

function genericIdentity(candidate: ResearchQuestion): string {
  if (candidate.factKey) return `fact:${candidate.factKey}`;

  // Assessment questions and evidence targets often express the same investigation
  // in slightly different legal language. For non-fact tasks, one task per kind is
  // enough for v1; the deterministic assessment still retains every underlying gap.
  return `investigation:${candidate.kind}`;
}

function preferCandidate(
  existing: ResearchQuestion | undefined,
  candidate: ResearchQuestion,
): ResearchQuestion {
  if (!existing) return candidate;
  if (existing.priority !== "high" && candidate.priority === "high") return candidate;

  // Prefer a concrete evidence target over a generic assessment question when both
  // map to the same investigation bucket. It is more actionable for an operator.
  if (!existing.target && candidate.target) return candidate;
  return existing;
}

export function createResearchPlan(
  input: ClaimRightsAssessmentInput,
  assessment: ClaimRightsAssessment,
): ResearchPlan {
  const candidates = [
    ...explicitMissingFacts(input),
    ...assessment.assessmentQuestions.map((text) => question(text, "assessment-question", "medium")),
    ...assessment.evidenceTargets.map((text) => question(text, "evidence-target", "medium")),
  ];

  const byIdentity = new Map<string, ResearchQuestion>();
  for (const candidate of candidates) {
    const identity = genericIdentity(candidate);
    byIdentity.set(identity, preferCandidate(byIdentity.get(identity), candidate));
  }

  const priorityOrder = { high: 0, medium: 1, low: 2 } as const;
  return {
    questions: [...byIdentity.values()].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
    ),
  };
}
