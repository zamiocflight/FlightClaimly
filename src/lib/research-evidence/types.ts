import type {
  ClaimRightsAssessment,
  ClaimRightsAssessmentInput,
} from "@/lib/claim-rights";

export type ResearchQuestionKind =
  | "flight-operation"
  | "disruption-cause"
  | "carrier"
  | "geography"
  | "passenger-right"
  | "airline-defence"
  | "document"
  | "other";

export type ResearchQuestionStatus = "open" | "resolved" | "blocked";

export type EvidenceSourceType =
  | "operational-provider"
  | "airline"
  | "airport"
  | "weather"
  | "atc"
  | "authority"
  | "court"
  | "customer-document"
  | "reputable-reporting"
  | "manual"
  | "other";

export type EvidenceConfidence = "low" | "medium" | "high";
export type EvidenceVerificationStatus =
  | "unverified"
  | "corroborated"
  | "verified"
  | "conflicting";

export type ResearchFactKey =
  | "departure-airport-eu261-territory"
  | "arrival-airport-eu261-territory"
  | "operating-carrier-code"
  | "operating-carrier-community-carrier"
  | "disruption-type"
  | "arrival-delay-minutes"
  | "departure-delay-minutes"
  | "delay-reason-slug"
  | "extraordinary-circumstances-claimed"
  | "article8-engaged"
  | "article9-engaged";

export interface ResearchQuestion {
  id: string;
  kind: ResearchQuestionKind;
  question: string;
  target?: string;
  factKey?: ResearchFactKey;
  status: ResearchQuestionStatus;
  priority: "high" | "medium" | "low";
}

export interface ResearchEvidence {
  id: string;
  questionId: string;
  sourceType: EvidenceSourceType;
  sourceName: string;
  sourceUrl?: string;
  retrievedAt: string;
  rawFinding: string;
  normalizedFinding?: string;
  factKey?: ResearchFactKey;
  factValue?: string | number | boolean;
  confidence: EvidenceConfidence;
  verificationStatus: EvidenceVerificationStatus;
  notes?: string;
}

export interface ResolvedResearchFact {
  key: ResearchFactKey;
  value?: string | number | boolean;
  status: "verified" | "supported" | "conflicting" | "unresolved";
  confidence?: EvidenceConfidence;
  evidenceIds: string[];
}

export interface ResearchPlan {
  questions: ResearchQuestion[];
}

export interface ResearchResolution {
  facts: ResolvedResearchFact[];
  resolvedQuestionIds: string[];
  unresolvedQuestionIds: string[];
  conflictingQuestionIds: string[];
}

export interface ResearchEvidenceAssessment {
  originalInput: ClaimRightsAssessmentInput;
  originalAssessment: ClaimRightsAssessment;
  plan: ResearchPlan;
  evidence: ResearchEvidence[];
  resolution: ResearchResolution;
  enrichedInput: ClaimRightsAssessmentInput;
  enrichedAssessment: ClaimRightsAssessment;
}
