# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-03**

> This file is intentionally short. It exists so a new ChatGPT/browser/session can find the latest authoritative project state immediately without deleting or rewriting historical sprint documentation.

## Read Order After Session Loss

1. `docs/CURRENT_SPRINT_LATEST.md` — this pointer
2. `docs/checkpoints/2026-09-03-passenger-rights-legal-rules-v1-start.md` — **ACTIVE recovery checkpoint / exact next build step**
3. `docs/checkpoints/2026-09-02-delay-reason-engine-expansion.md` — locked Delay Reason Engine v1 checkpoint
4. `docs/checkpoints/2026-09-02-flight-number-global-seo-google.md` — secured Flight Number/global SEO/Google checkpoint
5. `docs/CURRENT_SPRINT.md` — full historical sprint record; preserve all older sections
6. `docs/SYSTEM_PROCESS_MAP.md` — architecture/process map
7. `docs/CLAIMS_DESK.md` only when working on Claims Desk matters

## Current Product / Growth State

Status: **🟢 Delay Reason Engine v1 locked / 🟡 EU261 Legal Rule Layer v1 ACTIVE**

### Flight Number / Google baseline remains secured

- Flight Number checkpoint: `643266e`
- final Flight Number entities: **2,841 publishable / 0 blocked / 0 duplicate identities**
- airlines represented: **44**
- Route paths: **3,141**
- Google sitemap read successfully on 2026-09-02
- Search Console discovered pages at that checkpoint: **6,326**
- control URL `SK1415` passed Google Live Test and indexing was requested

Do not repopulate FlightAware or rebuild the Flight Number architecture while Google is processing that surface.

## Delay Reason Engine v1 — LOCKED GREEN

The Delay Reason knowledge layer contains **11 structured disruption reasons**, **11 relationship entries** and **11 structured claim-assessment profiles**.

Final verification completed:

- `npm run audit:delay-reasons` → **PASS**
- `npm run typecheck` → **PASS**
- representative production Delay Reason URLs → **HTTP 200**
- Claim Assessment content verified live
- sitemap Delay Reason detail entries → **11**
- Delay Reason detail pages converted to **SSG**
- final production build → **6,557 / 6,557** pages
- build output shows **11 English Delay Reason SSG detail paths**

Final SSG commit:

`e5f9769` — `feat(delay-reasons): prerender delay reason detail pages`

Do not reopen Delay Reason Engine v1 without a concrete defect, new legal requirement, new disruption category, or later integration requirement.

## Current Sprint — EU261 Legal Rule Layer v1

The Passenger Rights / Legal Rules foundation is now present on `main`.

Created:

- `src/data/passenger-rights/types.ts`
- `src/data/passenger-rights/registry.ts`
- `src/data/passenger-rights/rules.ts`
- `src/data/passenger-rights/index.ts`

Foundation commits:

- `cf290fd` — `feat(passenger-rights): add v1 legal knowledge model`
- `eee4aad` — `feat(passenger-rights): add v1 rights registry`
- `8f9c3e3` — `feat(passenger-rights): add legal rules registry foundation`
- `1ddbe08` — `feat(passenger-rights): expose v1 knowledge model`

The Passenger Rights registry currently defines five high-level EU261 rights: fixed compensation, care, rerouting, reimbursement and passenger-rights information.

The executable `legalRulesRegistry` is intentionally empty until substantive rules are verified against official legal sources.

The repository's existing Authority architecture remains the source-of-authority layer:

- `src/data/authority/registry.ts`
- `src/data/authority/rules.ts`
- `src/data/authority/relationships.ts`
- `src/data/authority/shared/types.ts`
- `src/lib/authority/*`

It already contains Regulation (EC) No 261/2004 and European Commission interpretative guidance, and its types already support court rulings and legal references.

### Architectural rule

Do not build a second legal-source system beside `src/data/authority`. Expand the existing authority layer and make Passenger Rights / Legal Rules consume it.

Desired direction:

`Legal source -> structured authority/rules -> applicability resolver -> claim-rights assessment -> Delay Reason / Route / Airline / Flight Number / Claims / AI consumers`

The legal engine must distinguish source-backed rules from editorial explanation and must not reduce nuanced legal questions to a single boolean where causation, evidence, reasonable measures or jurisdiction still require assessment.

## EXACT NEXT ACTION — DO THIS NOW

Build **EU261 Legal Rule Layer v1**.

Before encoding substantive legal conclusions, verify them against current official EU sources (EUR-Lex / European Commission / CURIA as appropriate).

First v1 coverage should model:

- Article 3 — scope / applicability
- Article 4 — denied boarding where needed
- Article 5 — cancellation
- Article 5(3) — extraordinary circumstances defence
- Article 6 — delay
- Article 7 — compensation / distance bands
- Article 8 — reimbursement / rerouting
- Article 9 — care / assistance
- Article 10 — upgrading / downgrading where appropriate
- Article 14 — passenger-rights information

Then attach verified case-law/legal references needed for arrival-delay compensation, final-destination/connecting-flight logic, technical defects, extraordinary circumstances, strikes, bird strikes, causation, reasonable measures and evidentiary burden.

The rule layer must keep applicability, entitlement, compensation amount, care, rerouting/reimbursement, exceptions, causation, reasonable measures and burden/evidence as distinct reasoning dimensions.

Full recovery-safe specification:

`docs/checkpoints/2026-09-03-passenger-rights-legal-rules-v1-start.md`

## Definition of Done for EU261 Legal Rule Layer v1

- structured EU261 v1 rules are source-backed and traceable
- relevant Passenger Rights entities are linked
- authority and legal-reference integrity is auditable
- duplicate/missing references are detected
- legal uncertainty remains representable as fact-specific rather than forced boolean output
- `npm run typecheck` passes
- legal/passenger-right integrity audit passes
- full `npm run build` passes
- final commits and green verification are written back to the active checkpoint and this resume pointer

## Safety

- Do not run `global-core:scale` for the already completed Flight Number population cohort.
- No FlightAware calls are needed for EU261 Legal Rule Layer v1.
- Do not run `git add .` while unrelated Claims/Reijo files are present locally.
- Never use `git reset --hard`, `git clean`, or force-push as recovery steps.
- Preserve historical sections in `docs/CURRENT_SPRINT.md`.
- Keep Product / Growth work separate from Claims Desk/Reijo work.

Latest active checkpoint:

`docs/checkpoints/2026-09-03-passenger-rights-legal-rules-v1-start.md`
