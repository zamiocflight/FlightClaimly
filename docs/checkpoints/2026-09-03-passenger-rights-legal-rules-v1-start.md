# Passenger Rights / EU261 Legal Rules v1 — LOCKED Checkpoint

Date: **2026-09-03**
Status: **🟢 COMPLETE / VERIFIED / LOCKED**

## Purpose

This checkpoint records the completed first reusable EU261 legal reasoning layer for FlightClaimly. It is the legal foundation between flight/disruption facts and later claim assessment, Claims Desk and AI consumers.

Architecture:

`Flight / Route facts`
→ `applicable legal regime`
→ `structured EU261 rules`
→ `passenger rights`
→ `compensation / care / rerouting / reimbursement assessment`
→ `exceptions + causation + reasonable measures + evidence`
→ `authority + legal references`
→ `Delay Reason / Claims Desk / future AI Brain consumers`

## Completed v1

### Passenger Rights model

Implemented under `src/data/passenger-rights/`:

- typed Passenger Rights / Legal Rule model
- Passenger Rights registry
- source-backed Legal Rules registry
- public exports

Foundation commits:

- `cf290fd` — `feat(passenger-rights): add v1 legal knowledge model`
- `eee4aad` — `feat(passenger-rights): add v1 rights registry`
- `8f9c3e3` — `feat(passenger-rights): add legal rules registry foundation`
- `1ddbe08` — `feat(passenger-rights): expose v1 knowledge model`

### EU261 regulation authority layer

Structured legal references were added for Articles 3, 4, 5, 5(3), 6, 7, 8, 9, 10 and 14.

Core executable rules cover the v1 dimensions for:

- territorial / carrier applicability
- denied boarding
- cancellation
- delay assistance
- compensation distance bands
- reimbursement / rerouting
- care
- extraordinary-circumstances defence
- upgrading / downgrading
- passenger information

Relevant commits include:

- `02fa034` — `feat(authority): add EU261 legal references v1`
- `6c80eb1` — `feat(passenger-rights): model EU261 rule semantics`
- `53da4da` — `feat(passenger-rights): add source-backed EU261 core rules`

### Verified CJEU case-law layer

The Authority layer was expanded with verified official court-ruling sources and LegalReferences for the v1 doctrines needed by the rules. The rules include structured reasoning for long arrival delay / final destination, technical problems, extraordinary technical events, bird strikes, internal airline staff strikes and mixed causal delay.

Commits:

- `0e0d30e` — verified CJEU authority sources
- `a438406` — case-law LegalReferences
- `9437178` — CJEU doctrine rules connected to the legal reasoning layer

Architectural rule preserved: **there is no parallel legal-source system**. Passenger Rights / Legal Rules consume the existing `src/data/authority` source-of-authority layer.

### Legal Rule Resolver

Implemented:

- `src/lib/passenger-rights/resolver.ts`
- `src/lib/passenger-rights/index.ts`

The resolver evaluates structured claim facts against Legal Rule conditions and preserves three states:

- matched
- not matched
- unresolved because required facts are missing

This is intentional. Fact-specific legal questions must remain unresolved rather than being forced into a false yes/no conclusion.

Commits:

- `d25e762` — Legal Rule Resolver
- `f7aa11c` — resolver exports

### Integrity audit

Implemented:

- `scripts/audit-passenger-rights.ts`
- `npm run audit:passenger-rights`

The audit checks the legal graph for duplicate and missing IDs/references across authorities, legal references, passenger rights, legal rules and exception-rule links.

Commits:

- `4ebfb27` — Passenger Rights / Legal Rules integrity audit
- `3852dc9` — package audit command

## Final verified state — 2026-09-03

Local verification after pulling through commit `3852dc9`:

`npm run audit:passenger-rights`:

- Authorities: **7**
- Legal references: **18**
- Passenger rights: **5**
- Legal rules: **17**
- **PASS — authority, legal references, passenger rights and legal rules are internally aligned.**

`npm run typecheck`:

- **PASS** — `tsc --noEmit` completed without errors.

`npm run build`:

- **PASS**
- Next.js **15.5.7**
- optimized production build compiled successfully
- type validity check passed
- static generation: **6,557 / 6,557** pages
- build traces collected
- page optimization finalized

The build remains at the expected 6,557-page baseline because this sprint adds reusable data/reasoning infrastructure rather than a new public static-page cohort.

## Separation rules preserved

1. Source-backed law and editorial/product explanation remain separate.
2. Applicability is separate from entitlement.
3. Entitlement is separate from compensation amount.
4. Compensation is separate from care/rerouting/reimbursement rights.
5. Extraordinary circumstances are not reduced to `true = no compensation`.
6. Defence analysis preserves causation and reasonable-measures questions.
7. A root-cause description such as late incoming aircraft is not itself the legal cause.
8. Missing facts remain representable as unresolved/fact-specific.
9. Claims Desk was not broadly refactored during this reusable-engine build.

## v1 lock rule

Do not reopen/refactor this v1 foundation merely for cleanup. Reopen it only for a concrete legal defect, verified legal update, missing rule required by the next integration, or extension to another legal regime such as UK261.

## Next Product / Growth integration direction

The next meaningful step is to connect this locked legal layer to a real claim-assessment consumer rather than adding disconnected rules indefinitely. The preferred direction is a **Claim Rights Assessment Engine** that combines route/flight facts, disruption/delay-reason facts and the Legal Rule Resolver into one structured assessment result for later Claims Desk and AI Brain use.

Before implementation, inspect existing claim/precheck models and choose the smallest reusable integration boundary. Do not broadly refactor Claims Desk and do not touch unrelated Reijo local work.

## Safety / unrelated local work

Preserve unrelated local Claims/Reijo work. Do not use `git add .`, `git reset --hard`, `git clean` or force push. No FlightAware population calls are needed for the next legal integration work.