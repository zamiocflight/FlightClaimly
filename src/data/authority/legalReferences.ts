import type { LegalReference } from "./shared/types";

export const legalReferences: LegalReference[] = [
  { id: "eu261-art-3", title: "EU261 Article 3 — Scope", citation: "Regulation (EC) No 261/2004, Article 3", explanation: "Defines the Regulation's territorial and carrier-related scope and core passenger conditions for application.", sourceId: "eu261" },
  { id: "eu261-art-4", title: "EU261 Article 4 — Denied boarding", citation: "Regulation (EC) No 261/2004, Article 4", explanation: "Sets the denied-boarding framework, including volunteers and rights of passengers denied boarding against their will.", sourceId: "eu261" },
  { id: "eu261-art-5", title: "EU261 Article 5 — Cancellation", citation: "Regulation (EC) No 261/2004, Article 5", explanation: "Sets passenger rights following cancellation and the conditions affecting compensation liability.", sourceId: "eu261" },
  { id: "eu261-art-5-3", title: "EU261 Article 5(3) — Extraordinary circumstances", citation: "Regulation (EC) No 261/2004, Article 5(3)", explanation: "Provides the compensation defence where the operating carrier proves extraordinary circumstances and that the cancellation could not have been avoided even if all reasonable measures had been taken.", sourceId: "eu261" },
  { id: "eu261-art-6", title: "EU261 Article 6 — Delay", citation: "Regulation (EC) No 261/2004, Article 6", explanation: "Defines delay thresholds that trigger assistance obligations according to flight distance and expected delay.", sourceId: "eu261" },
  { id: "eu261-art-7", title: "EU261 Article 7 — Compensation", citation: "Regulation (EC) No 261/2004, Article 7", explanation: "Defines fixed compensation amounts and distance bands, subject to the Regulation and relevant Court of Justice case law.", sourceId: "eu261" },
  { id: "eu261-art-8", title: "EU261 Article 8 — Reimbursement or rerouting", citation: "Regulation (EC) No 261/2004, Article 8", explanation: "Defines choices between reimbursement and rerouting, including rerouting at the earliest opportunity under comparable transport conditions.", sourceId: "eu261" },
  { id: "eu261-art-9", title: "EU261 Article 9 — Right to care", citation: "Regulation (EC) No 261/2004, Article 9", explanation: "Defines care obligations including meals and refreshments, hotel accommodation where necessary, transport and communications.", sourceId: "eu261" },
  { id: "eu261-art-10", title: "EU261 Article 10 — Upgrading and downgrading", citation: "Regulation (EC) No 261/2004, Article 10", explanation: "Governs upgrading without supplementary payment and reimbursement where a passenger is placed in a lower class.", sourceId: "eu261" },
  { id: "eu261-art-14", title: "EU261 Article 14 — Passenger information", citation: "Regulation (EC) No 261/2004, Article 14", explanation: "Requires operating carriers to inform passengers about their rights in the circumstances specified by the Regulation.", sourceId: "eu261" },
];

export function getLegalReference(id: string) {
  return legalReferences.find((reference) => reference.id === id);
}
