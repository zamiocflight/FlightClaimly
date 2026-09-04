import type { ClaimRightsAssessmentInput } from "@/lib/claim-rights";
import type {
  EvidenceConfidence,
  EvidenceSourceType,
  ResearchFactKey,
  ResearchQuestion,
} from "./types";

export interface ResearchProviderRequest {
  claimId: string;
  question: ResearchQuestion;
  claimInput: ClaimRightsAssessmentInput;
}

/**
 * Raw evidence returned by a provider.
 *
 * Providers may describe what they found and how confident they are in the
 * extraction, but they do not decide whether a finding is legally verified.
 * Verification is owned by the Evidence Registry / resolver layer.
 */
export interface ResearchProviderFinding {
  sourceType: EvidenceSourceType;
  sourceName: string;
  sourceUrl?: string;
  sourceRecordId?: string;
  observedAt?: string;
  rawFinding: string;
  normalizedFinding?: string;
  factKey?: ResearchFactKey;
  factValue?: string | number | boolean;
  confidence: EvidenceConfidence;
  metadata?: Record<string, string | number | boolean | null>;
}

export interface ResearchEvidenceProvider {
  /** Stable machine identifier, e.g. `flightaware` or `manual-review`. */
  id: string;
  /** Human-readable provider name for operator surfaces and audit trails. */
  name: string;
  /** Return true only when this provider can meaningfully investigate the task. */
  supports(question: ResearchQuestion): boolean;
  /** Fetch or derive evidence. Must not mutate claim/legal state directly. */
  research(request: ResearchProviderRequest): Promise<ResearchProviderFinding[]>;
}
