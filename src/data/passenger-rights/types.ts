export type PassengerRightCategory =
  | "compensation"
  | "care"
  | "rerouting"
  | "refund"
  | "information";

export type LegalOutcome =
  | "applies"
  | "does-not-apply"
  | "fact-specific";

export type LegalBurden = "passenger" | "airline" | "shared";

export interface PassengerRight {
  id: string;
  title: string;
  category: PassengerRightCategory;
  summary: string;
  regulationIds: string[];
  legalReferenceIds: string[];
}

export interface LegalRuleCondition {
  field: string;
  operator:
    | "equals"
    | "not-equals"
    | "greater-than"
    | "greater-than-or-equal"
    | "less-than"
    | "less-than-or-equal"
    | "includes"
    | "exists";
  value?: string | number | boolean | string[];
}

export interface LegalRule {
  id: string;
  title: string;
  description: string;
  jurisdiction: string;
  regulationId: string;
  passengerRightIds: string[];
  conditions: LegalRuleCondition[];
  outcome: LegalOutcome;
  burdenOfProof?: LegalBurden;
  exceptionRuleIds?: string[];
  authorityIds: string[];
  legalReferenceIds: string[];
  evidenceTargets: string[];
  assessmentQuestions: string[];
}

export interface PassengerRightsAssessment {
  applicableRuleIds: string[];
  passengerRightIds: string[];
  authorityIds: string[];
  legalReferenceIds: string[];
  evidenceTargets: string[];
  assessmentQuestions: string[];
}
