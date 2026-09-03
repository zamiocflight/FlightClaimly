import type { ResolvedLegalRule } from "@/lib/passenger-rights/resolver";
import type { DelayReasonAssessmentProfile } from "@/lib/delay-reasons/assessment";

export type ClaimDisruptionType = "delay" | "cancellation" | "denied-boarding" | "other";

export interface ClaimRightsAssessmentInput {
  departureAirport: {
    iata?: string;
    eu261Territory?: boolean;
  };
  arrivalAirport: {
    iata?: string;
    eu261Territory?: boolean;
  };
  operatingCarrier?: {
    code?: string;
    communityCarrier?: boolean;
  };
  disruption: {
    type?: ClaimDisruptionType;
    arrivalDelayMinutes?: number;
    departureDelayMinutes?: number;
    multipleCauses?: boolean;
    delayReasonSlug?: string;
  };
  airline?: {
    extraordinaryCircumstancesClaimed?: boolean;
  };
  rights?: {
    article8Engaged?: boolean;
    article9Engaged?: boolean;
  };
  journey?: {
    classChanged?: boolean;
  };
  evidence?: string[];
}

export type ClaimRightsInvestigationStatus =
  | "insufficient-facts"
  | "investigation-required"
  | "ready-for-legal-review";

export type CompensationAssessmentStatus =
  | "not-established"
  | "potentially-entitled"
  | "defence-under-review";

export interface ClaimRightsAssessment {
  status: ClaimRightsInvestigationStatus;
  legalRegime: {
    eu261: "applies" | "potentially-applies" | "not-established";
  };
  rules: {
    matched: ResolvedLegalRule[];
    unresolved: ResolvedLegalRule[];
    notMatched: ResolvedLegalRule[];
  };
  passengerRightIds: string[];
  compensation: {
    status: CompensationAssessmentStatus;
    amountEur?: 250 | 400 | 600;
    amountReason?: string;
  };
  care: {
    potentiallyEngaged: boolean;
  };
  reroutingOrRefund: {
    potentiallyEngaged: boolean;
  };
  extraordinaryCircumstances: {
    claimed: boolean;
    requiresReview: boolean;
  };
  delayReason?: DelayReasonAssessmentProfile;
  evidenceTargets: string[];
  assessmentQuestions: string[];
  authorityIds: string[];
  legalReferenceIds: string[];
}
