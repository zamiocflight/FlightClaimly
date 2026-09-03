# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-03**

> This file is intentionally short and authoritative. After session loss, read this before historical sprint documentation.

## Read Order After Session Loss

1. `docs/CURRENT_SPRINT_LATEST.md` — this pointer
2. `docs/engines/README.md` — engine documentation index and ownership map
3. `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md` — **NEXT engine contract / exact integration target**
4. `docs/checkpoints/2026-09-03-passenger-rights-legal-rules-v1-start.md` — locked EU261 Legal Rule Layer v1 checkpoint
5. `docs/checkpoints/2026-09-02-delay-reason-engine-expansion.md` — locked Delay Reason Engine v1 checkpoint
6. `docs/checkpoints/2026-09-02-flight-number-global-seo-google.md` — secured Flight Number/global SEO/Google checkpoint
7. `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md` — overall Knowledge Engine architecture
8. `docs/SYSTEM_PROCESS_MAP.md` — complete platform/process map
9. `docs/CURRENT_SPRINT.md` — historical sprint record; preserve it
10. `docs/CLAIMS_DESK.md` only when working on Claims Desk matters

## Current Product / Growth State

Status: **🟢 Delay Reason Engine v1 locked / 🟢 EU261 Legal Rule Layer v1 locked / 🟢 Engine documentation structure established / 🟡 Claim Rights Assessment Engine NEXT**

## Engine documentation architecture — ESTABLISHED 2026-09-03

Every significant reusable engine now has a developer-facing contract under `docs/engines/`.

Current documents:

- `AIRLINE_ENGINE.md`
- `AIRPORT_ENGINE.md`
- `COUNTRY_ENGINE.md`
- `ROUTE_ENGINE.md`
- `FLIGHT_NUMBER_ENGINE.md`
- `DELAY_REASON_ENGINE.md`
- `AUTHORITY_ENGINE.md`
- `PASSENGER_RIGHTS_ENGINE.md`
- `CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`
- `README.md` — index/documentation standard

Documentation responsibilities are now explicit:

```text
SYSTEM_PROCESS_MAP.md
  = entire FlightClaimly system/process map

FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md
  = overall Knowledge Engine family / philosophy / engine graph

FLIGHTCLAIMLY_KNOWLEDGE_MODEL.md
  = common entity / relationship / template model

docs/engines/*.md
  = detailed developer contract for each engine

CURRENT_SPRINT_LATEST.md
  = current recovery/work pointer only

checkpoints/*
  = historical verified lock states
```

Maintenance rule: update an engine document when its public contract, domain ownership, core flow, major dependency, audit or lock state changes. Do not churn engine docs for every small implementation edit.

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

- **11** structured disruption reasons
- **11** relationship entries
- **11** claim-assessment profiles
- `npm run audit:delay-reasons` → PASS
- `npm run typecheck` → PASS at lock
- production representative URLs → HTTP 200
- Delay Reason detail pages → SSG
- full build baseline → **6,557 / 6,557**

Final SSG commit:

`e5f9769` — `feat(delay-reasons): prerender delay reason detail pages`

Developer contract: `docs/engines/DELAY_REASON_ENGINE.md`.

Do not reopen without a concrete defect, new legal requirement/category, or integration requirement.

## EU261 Legal Rule Layer v1 — LOCKED GREEN

The reusable Passenger Rights / Legal Rules layer is complete for v1.

Implemented architecture:

`Flight / Route facts`
→ `applicable legal regime`
→ `structured EU261 rules`
→ `passenger rights`
→ `compensation / care / rerouting / reimbursement`
→ `exceptions + causation + reasonable measures + evidence`
→ `authority + legal references`

Core implementation includes:

- Passenger Rights registry/model
- **17** structured Legal Rules
- **7** authority sources
- **18** LegalReferences
- EU261 Articles 3, 4, 5, 5(3), 6, 7, 8, 9, 10 and 14
- verified CJEU doctrine layer for v1
- Legal Rule Resolver with matched / not-matched / unresolved states
- integrity audit across the legal graph

Key commits:

- `02fa034` — EU261 legal references v1
- `6c80eb1` — Legal Rule semantics
- `53da4da` — EU261 core rules
- `0e0d30e` — verified CJEU authority sources
- `a438406` — CJEU LegalReferences
- `9437178` — CJEU doctrine rules
- `d25e762` — Legal Rule Resolver
- `f7aa11c` — resolver exports
- `4ebfb27` — legal integrity audit
- `3852dc9` — `audit:passenger-rights` package command

### Final verification on 2026-09-03

`npm run audit:passenger-rights`:

- Authorities: **7**
- Legal references: **18**
- Passenger rights: **5**
- Legal rules: **17**
- **PASS**

`npm run typecheck`:

- **PASS**

`npm run build`:

- Next.js **15.5.7**
- optimized production build compiled successfully
- type validity passed
- static generation **6,557 / 6,557**
- build traces/page optimization completed
- **PASS**

Locked checkpoint:

`docs/checkpoints/2026-09-03-passenger-rights-legal-rules-v1-start.md`

Developer contracts:

- `docs/engines/AUTHORITY_ENGINE.md`
- `docs/engines/PASSENGER_RIGHTS_ENGINE.md`

## EXACT NEXT PRODUCT / GROWTH ACTION

Build the first **Claim Rights Assessment Engine** integration boundary using the contract now documented in:

`docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`

Purpose: combine existing structured facts and engines into one reusable claim-level legal assessment without embedding legal reasoning separately in Claims Desk or UI code.

Target flow:

`Claim / itinerary facts`
→ `Airport / Country / Route / Flight Number context`
→ `Disruption + Delay Reason facts`
→ `Authority + Passenger Rights Legal Rule Resolver`
→ `Claim Rights Assessment`
→ later `Claims Desk / demand letters / airline-reply analysis / AI Brain`

### First step before coding

Inspect the existing claim, precheck and itinerary models and current resolver consumers. Define the smallest normalized input fact shape and output assessment shape. Reuse existing models where possible; do not create a duplicate claim model.

The assessment should eventually expose, without forcing unsupported conclusions:

- applicable legal regime
- matched / unresolved legal rules
- potential passenger rights
- potential compensation entitlement and amount/band
- care rights
- rerouting/reimbursement rights
- extraordinary-circumstances defence status
- causation/reasonable-measures questions
- evidence still required
- supporting authority / legal references
- investigation/readiness status suitable for later AI/Claims Desk consumers

Do **not** wire this directly into automated customer-facing legal decisions until the assessment contract and tests/audits are stable.

## Architecture Rules

- Read the relevant `docs/engines/*.md` before modifying a reusable engine.
- `src/data/authority` remains the source-of-authority layer; do not create a parallel legal-source system.
- Keep source-backed legal facts separate from editorial explanation.
- Keep applicability, entitlement, amount, care, rerouting/reimbursement and defences as distinct dimensions.
- Missing facts must remain unresolved rather than silently becoming false.
- Extraordinary circumstances never automatically suppress care/rerouting/reimbursement rights.
- Claims Desk integration comes after the reusable assessment boundary is stable.
- EU261 first; add UK261/other regimes later through the same architecture.

## Safety

- Do not run `global-core:scale` or any unnecessary FlightAware population.
- Preserve unrelated local Claims/Reijo work.
- Do not use `git add .`, `git reset --hard`, `git clean`, or force push.
- Preserve historical sections in `docs/CURRENT_SPRINT.md`.
- Keep Product / Growth work separate from Claims Desk/Reijo work.
