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

function investigationBucket(kind: ResearchQuestionKind): string {
  switch (kind) {
    case "carrier":
    case "geography":
      return "eu261-scope";
    case "flight-operation":
      return "flight-operation";
    case "disruption-cause":
    case "airline-defence":
      return "cause-and-defence";
    case "passenger-right":
      return "passenger-rights";
    case "document":
    case "other":
      return "supporting-evidence";
  }
}

function genericIdentity(candidate: ResearchQuestion): string {
  if (candidate.factKey) return `fact:${candidate.factKey}`;

  // The Legal Engine may expose many precise unresolved rules. The planner keeps
  // those underlying gaps intact, but translates them into a much smaller set of
  // operator-facing investigation buckets that can often be solved together.
  return `investigation:${investigationBucket(candidate.kind)}`;
}

function preferCandidate(
  existing: ResearchQuestion | undefined,
  candidate: ResearchQuestion,
): ResearchQuestion {
  if (!existing) return candidate;
  if (existing.priority !== "high" && candidate.priority === "high") return candidate;

  // Prefer a concrete evidence target over a generic assessment question when both
  // belong to the same operator task. It is more actionable for a claims handler.
  if (!existing.target && candidate.target) return candidate;
  return existing;
}

function operatorQuestion(candidate: ResearchQuestion): string {
  switch (candidate.factKey) {
    case "departure-airport-eu261-territory":
      return "Verify whether the departure airport falls within EU261 territory.";
    case "arrival-airport-eu261-territory":
      return "Verify whether the arrival airport falls within EU261 territory.";
    case "operating-carrier-code":
      return "Verify the operating carrier for the disrupted flight.";
    case "operating-carrier-community-carrier":
      return "Verify whether the operating carrier is a Community carrier for EU261 scope.";
    case "disruption-type":
      return "Verify whether the disruption was a delay, cancellation, or denied boarding.";
    case "arrival-delay-minutes":
      return "Verify the passenger's final arrival delay in minutes.";
    case "departure-delay-minutes":
      return "Verify the departure delay in minutes.";
    case "delay-reason-slug":
      return "Establish and verify the disruption's root cause.";
    case "extraordinary-circumstances-claimed":
      return "Verify whether the airline is relying on an extraordinary-circumstances defence.";
    case "article8-engaged":
      return "Verify the passenger's rerouting, reimbursement, or refund circumstances under Article 8.";
    case "article9-engaged":
      return "Verify the passenger's care needs and expenses under Article 9.";
  }

  switch (investigationBucket(candidate.kind)) {
    case "eu261-scope":
      return "Verify the remaining carrier and geography facts needed to establish EU261 scope.";
    case "flight-operation":
      return "Verify the remaining operational flight facts and timing records.";
    case "cause-and-defence":
      return "Investigate the disruption cause and test any airline defence against the available evidence.";
    case "passenger-rights":
      return "Verify the facts needed to assess the passenger's remaining EU261 rights.";
    case "supporting-evidence":
      return "Collect and verify the remaining supporting documents and evidence.";
  }
}

function polishForOperator(candidate: ResearchQuestion): ResearchQuestion {
  return {
    ...candidate,
    question: operatorQuestion(candidate),
  };
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
    questions: [...byIdentity.values()]
      .map(polishForOperator)
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]),
  };
}
