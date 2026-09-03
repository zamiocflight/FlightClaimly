# Passenger Rights / EU261 Legal Rules v1 — Start Checkpoint

Date: **2026-09-03**
Status: **🟡 ACTIVE — EU261 Legal Rule Layer v1 is the exact next build step**

## Why this checkpoint exists

This checkpoint is the recovery-safe handoff for the Knowledge Engine after Delay Reason Engine v1 was locked. If a browser/session crashes, resume here before doing new Product / Growth work.

## Completed immediately before this checkpoint

### Delay Reason Engine v1

Delay Reason Engine v1 is complete, verified and locked. Do not reopen it absent a concrete defect, new disruption category, legal update or later integration requirement.

### Passenger Rights v1 foundation

The first Passenger Rights / Legal Rules data-model foundation has been added on `main`:

- `src/data/passenger-rights/types.ts`
- `src/data/passenger-rights/registry.ts`
- `src/data/passenger-rights/rules.ts`
- `src/data/passenger-rights/index.ts`

Commits:

- `cf290fd` — `feat(passenger-rights): add v1 legal knowledge model`
- `eee4aad` — `feat(passenger-rights): add v1 rights registry`
- `8f9c3e3` — `feat(passenger-rights): add legal rules registry foundation`
- `1ddbe08` — `feat(passenger-rights): expose v1 knowledge model`

The Passenger Rights registry currently defines five high-level EU261 rights:

1. fixed compensation
2. care
3. rerouting at the earliest opportunity
4. ticket reimbursement
5. information about passenger rights

The legal rules registry is intentionally empty. Do **not** fill it with unverified legal conclusions. Executable legal rules must be traceable to verified official legal authority.

## Existing Authority foundation to extend — do not duplicate

Existing source-of-authority architecture:

- `src/data/authority/registry.ts`
- `src/data/authority/rules.ts`
- `src/data/authority/relationships.ts`
- `src/data/authority/shared/types.ts`
- `src/lib/authority/*`

The current authority registry already contains:

- Regulation (EC) No 261/2004 (`eu261`)
- European Commission EU Air Passenger Rights Interpretative Guidelines (`eu261-guidelines`)

The shared authority types already support `court-ruling` sources and `LegalReference` objects.

Architectural rule: **do not create a parallel legal-source system.** Passenger Rights / Legal Rules must consume and expand the existing Authority layer.

## EXACT NEXT BUILD STEP — EU261 Legal Rule Layer v1

Build the first source-backed executable EU261 rule layer.

### First official-law coverage

Verify against current official EU/EUR-Lex/CURIA sources before encoding substantive rules, then model at minimum:

- Article 3 — scope / applicability
- Article 4 — denied boarding where needed by the rights model
- Article 5 — cancellation
- Article 5(3) — extraordinary circumstances defence
- Article 6 — delay
- Article 7 — compensation and distance bands
- Article 8 — reimbursement / rerouting
- Article 9 — care and assistance
- Article 10 — upgrading / downgrading where appropriate for v1
- Article 14 — obligation to inform passengers

### Legal reasoning dimensions v1 must support

The rule layer must distinguish:

- legal regime applicability
- disruption type
- entitlement/right
- compensation amount/band
- care obligations
- reimbursement/rerouting obligations
- exceptions/defences
- causation
- extraordinary-circumstances analysis
- reasonable measures
- burden of proof / evidence targets
- final-destination logic
- questions that remain fact-specific rather than forcing a boolean conclusion

### CJEU / case-law layer

After the regulation rules are structured, attach verified official case-law/legal references for the doctrines needed by v1, including where applicable:

- arrival-delay compensation
- connecting flights / final destination
- ordinary technical defects
- extraordinary technical events / hidden manufacturing defects
- strikes
- bird strikes
- reasonable measures / causation / evidentiary burden

Do not encode case names/citations from memory. Verify them from official sources first.

## Intended architecture

`Flight / Route facts`
→ `applicable legal regime`
→ `structured EU261 rules`
→ `passenger rights`
→ `compensation / care / rerouting / reimbursement assessment`
→ `exceptions + causation + reasonable measures + evidence`
→ `authority + legal references`
→ `Delay Reason / Claims Desk / future AI Brain consumers`

## Separation rules

1. Source-backed law and editorial/product explanation are separate.
2. Applicability is separate from entitlement.
3. Entitlement is separate from compensation amount.
4. Compensation is separate from care/rerouting/reimbursement rights.
5. Extraordinary circumstances must not become a simplistic `true/false = no compensation` shortcut.
6. A defence must preserve causation and reasonable-measures analysis.
7. A root-cause description such as late incoming aircraft is not itself the legal cause.
8. Claims Desk integration comes after the reusable legal layer is stable; do not refactor Claims Desk broadly during this build.

## Verification required before v1 can be locked

Before declaring EU261 Legal Rule Layer v1 complete:

- add an integrity audit for passenger rights / legal rules / authority references
- ensure every referenced passenger right exists
- ensure every referenced authority/source exists
- ensure every legal reference points to a known authority source
- detect duplicate rule/right/reference IDs
- `npm run typecheck` must pass
- relevant audits must pass
- full `npm run build` must pass
- update this checkpoint and `docs/CURRENT_SPRINT_LATEST.md` with final commits and exact green state

## Safety / unrelated local work

Preserve unrelated local Claims/Reijo work. Do not use `git add .`, `git reset --hard`, `git clean` or force push. No FlightAware population calls are needed for this sprint.
