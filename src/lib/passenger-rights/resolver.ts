import { legalRulesRegistry } from "@/data/passenger-rights/rules";
import type { LegalRule, LegalRuleCondition, PassengerRightsAssessment } from "@/data/passenger-rights/types";

export type LegalFacts = Record<string, unknown>;

export interface ResolvedLegalRule {
  rule: LegalRule;
  status: "matched" | "not-matched" | "unresolved";
  unresolvedConditions: LegalRuleCondition[];
}

function getFactValue(facts: LegalFacts, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current === null || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[key];
  }, facts);
}

function evaluateCondition(condition: LegalRuleCondition, facts: LegalFacts): true | false | "unresolved" {
  const actual = getFactValue(facts, condition.field);

  if (condition.operator === "exists") return actual !== undefined && actual !== null;
  if (actual === undefined || actual === null) return "unresolved";

  switch (condition.operator) {
    case "equals": return actual === condition.value;
    case "not-equals": return actual !== condition.value;
    case "greater-than": return typeof actual === "number" && typeof condition.value === "number" && actual > condition.value;
    case "greater-than-or-equal": return typeof actual === "number" && typeof condition.value === "number" && actual >= condition.value;
    case "less-than": return typeof actual === "number" && typeof condition.value === "number" && actual < condition.value;
    case "less-than-or-equal": return typeof actual === "number" && typeof condition.value === "number" && actual <= condition.value;
    case "includes": return Array.isArray(actual) && actual.includes(condition.value);
  }
}

export function resolveLegalRule(rule: LegalRule, facts: LegalFacts): ResolvedLegalRule {
  const results = rule.conditions.map((condition) => ({ condition, result: evaluateCondition(condition, facts) }));
  if (results.some(({ result }) => result === false)) return { rule, status: "not-matched", unresolvedConditions: [] };

  const unresolvedConditions = results.filter(({ result }) => result === "unresolved").map(({ condition }) => condition);
  if (unresolvedConditions.length) return { rule, status: "unresolved", unresolvedConditions };

  return { rule, status: "matched", unresolvedConditions: [] };
}

export function resolvePassengerRights(facts: LegalFacts, rules: LegalRule[] = legalRulesRegistry): PassengerRightsAssessment {
  const candidates = rules.map((rule) => resolveLegalRule(rule, facts)).filter(({ status }) => status !== "not-matched");

  return {
    applicableRuleIds: candidates.map(({ rule }) => rule.id),
    passengerRightIds: [...new Set(candidates.flatMap(({ rule }) => rule.passengerRightIds))],
    authorityIds: [...new Set(candidates.flatMap(({ rule }) => rule.authorityIds))],
    legalReferenceIds: [...new Set(candidates.flatMap(({ rule }) => rule.legalReferenceIds))],
    evidenceTargets: [...new Set(candidates.flatMap(({ rule }) => rule.evidenceTargets))],
    assessmentQuestions: [...new Set(candidates.flatMap(({ rule }) => rule.assessmentQuestions))],
  };
}
