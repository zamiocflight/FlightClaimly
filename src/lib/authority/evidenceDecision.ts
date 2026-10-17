export type StoredAuthorityDecision = "legacy" | "verified" | "recover_reference" | "manual_review" | "integrity_mismatch";

/** Pure decision function. Never invent evidence for an orphaned PDF. */
export function decideStoredAuthority(hasEvidence: boolean, hasReference: boolean, hashMatches: boolean): StoredAuthorityDecision {
  if (!hasEvidence) return hasReference ? "legacy" : "manual_review";
  if (!hashMatches) return "integrity_mismatch";
  return hasReference ? "verified" : "recover_reference";
}
