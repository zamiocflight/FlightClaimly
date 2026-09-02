import type { LegalRule } from "./types";

/**
 * Legal rules are intentionally kept separate from passenger-right content.
 *
 * The registry starts empty until each EU261 rule is attached to verified
 * article/case-law references. This prevents product copy from silently
 * becoming executable legal logic without a traceable authority basis.
 */
export const legalRulesRegistry: LegalRule[] = [];

export function getLegalRule(id: string) {
  return legalRulesRegistry.find((rule) => rule.id === id);
}

export function getAllLegalRules() {
  return legalRulesRegistry;
}
