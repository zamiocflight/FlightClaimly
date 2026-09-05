# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-05**

> **Authoritative crash-recovery pointer. Read this first after any session loss.**

## Read order after session loss

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/checkpoints/2026-09-05-seo-localization-nl-locked.md`
3. `docs/checkpoints/2026-09-05-seo-localization-fi-locked.md`
4. `docs/checkpoints/2026-09-05-seo-localization-de-locked.md`
5. `docs/checkpoints/2026-09-05-seo-localization-pl-locked.md`
6. `docs/checkpoints/2026-09-05-seo-localization-da-implementation.md`
7. `docs/checkpoints/2026-09-04-build-deployment-cost-optimization-locked.md`
8. `docs/checkpoints/2026-09-04-seo-localization-wave1-sv-locked.md`
9. `docs/engines/LOCALIZATION_ENGINE.md`
10. `docs/checkpoints/2026-09-04-research-evidence-engine-v1-locked.md`
11. `docs/ROADMAP.md`
12. `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`
13. `docs/engines/README.md`
14. `docs/CLAIMS_DESK.md` — preserve local user modifications
15. `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md`
16. `docs/SYSTEM_PROCESS_MAP.md`
17. `docs/CURRENT_SPRINT.md` — historical record; preserve it

## Current state

- 🟢 Delay Reason Engine v1 — LOCKED
- 🟢 EU261 Legal Rule Layer v1 — LOCKED
- 🟢 Claim Rights Assessment Engine v1 — LOCKED
- 🟢 Claims Desk Assessment Integration phase 1 — VERIFIED
- 🟢 Research / Evidence Engine v1 foundation — LOCKED
- 🟢 Localization architecture — IMPLEMENTED / AUDIT GREEN
- 🟢 **Swedish Flight Number Localization v1 — LOCKED 2026-09-04**
- 🟢 **Danish Flight Number Localization v1 — LOCKED 2026-09-05**
- 🟢 **Polish Flight Number Localization v1 — LOCKED 2026-09-05**
- 🟢 **German Flight Number Localization v1 — LOCKED 2026-09-05**
- 🟢 **Finnish Flight Number Localization v1 — LOCKED 2026-09-05**
- 🟢 **Dutch Flight Number Localization v1 — LOCKED 2026-09-05**
- 🟢 **Flight Number Localization Wave 1 — COMPLETE / LOCKED**
- 🟢 **Build / Deployment Cost Optimization — LOCKED 2026-09-04**
- 🔵 **ACTIVE NEXT: Localization Wave 2 — Swedish coordinated Knowledge cohort package**
- ⏭️ **THEN: DA → PL → DE → FI → NL Wave 2 market packages**
- 🟡 PARALLEL: Content / Social Engine v1

## Secured SEO baseline

- 2,841 publishable canonical Flight Number entities
- 44 represented airlines
- 3,141 route paths
- pre-SV production build: **6,557 / 6,557** static pages
- post-SV production build: **9,442 / 9,442** static pages
- post-DA production build: **12,327 / 12,327** static pages
- post-PL production build: **15,212 / 15,212** static pages
- post-DE production build: **18,097 / 18,097** static pages
- post-FI production build: **20,982 / 20,982** static pages
- post-NL production build: **23,867 / 23,867** static pages
- Flight Number detail cohort: **19,887 paths = 2,841 × 7 published SEO locales (EN + SV + DA + PL + DE + FI + NL)**
- Flight Number airline-group cohort: **308 paths = 44 × 7 published SEO locales**
- each localized Flight Number market sitemap cluster: **2,886 URLs = 2,841 detail + 44 airline-group + 1 index**
- no FlightAware population required for current localization work

## Flight Number Localization Wave 1 — COMPLETE / LOCKED

Authoritative final Wave 1 checkpoint: `docs/checkpoints/2026-09-05-seo-localization-nl-locked.md`

```text
SV LOCKED → DA LOCKED → PL LOCKED → DE LOCKED → FI LOCKED → NL LOCKED
```

Published Flight Number SEO locales:

- EN — publishable
- SV — publishable / LOCKED
- DA — publishable / LOCKED
- PL — publishable / LOCKED
- DE — publishable / LOCKED
- FI — publishable / LOCKED
- NL — publishable / LOCKED

Do not reopen any locked Flight Number v1 market without a concrete bug, legal/regulatory change, evidence of materially wrong local terminology/search intent, or an explicit planned v2 pass.

## Dutch Flight Number Localization v1 — LOCKED

Authoritative checkpoint: `docs/checkpoints/2026-09-05-seo-localization-nl-locked.md`

Locked evidence includes:

- authoritative Dutch passenger-rights terminology research
- canonical-fact isolation and quality gates — PASS
- Localization Engine architecture audit — PASS
- TypeScript — PASS
- Preview build — **1,031 / 1,031**
- EU-only `A3101` — PASS
- UK-only `A33050` — PASS
- EU+UK `A3632` — PASS
- neither/unresolved `A31124` — PASS with no false fixed compensation amounts
- rendered Dutch copy/headings and controlled city names — PASS
- metadata/canonical/hreflang — PASS through `nl`
- unsampled Preview fallback — HTTP **200**
- Dutch Flight Number index — PASS
- Dutch airline-group page — PASS
- Dutch sitemap cluster — **2,886**
- production build — **23,867 / 23,867**
- Flight Number detail cohort — **19,887 = 2,841 × 7**
- Flight Number airline-group cohort — **308 = 44 × 7**

Important QA lesson: Preview sitemap URLs use the runtime origin (`http://localhost:3000`). A grep against the production hostname can therefore return zero in Preview without indicating a sitemap defect.

## Previous Wave 1 checkpoints

- Swedish: `docs/checkpoints/2026-09-04-seo-localization-wave1-sv-locked.md`
- Danish: `docs/checkpoints/2026-09-05-seo-localization-da-implementation.md`
- Polish: `docs/checkpoints/2026-09-05-seo-localization-pl-locked.md`
- German: `docs/checkpoints/2026-09-05-seo-localization-de-locked.md`
- Finnish: `docs/checkpoints/2026-09-05-seo-localization-fi-locked.md`

These remain authoritative for their market-specific implementation and QA histories.

## Build / Deployment Cost Optimization — LOCKED

Authoritative checkpoint: `docs/checkpoints/2026-09-04-build-deployment-cost-optimization-locked.md`

Locked strategy:

- production retains full SSG for publishable Flight Number and Route detail cohorts
- Vercel Preview builds use deterministic samples of 24 Flight Number entities and 24 Routes
- valid unsampled Flight Number and Route pages render on demand in Preview mode
- Vercel Ignored Build Step is configured with `bash ignore-build-step.sh`
- application-affecting changes build; docs/Markdown-only changes skip
- production remains full SSG; current post-NL production build is **23,867 / 23,867**
- localization architecture audit remains required

Do not move production to ISR/on-demand without a separate evidence-backed architecture decision and equivalent SEO/runtime verification.

## Localization rule

Localization is **not mechanical translation**. Canonical Knowledge facts remain shared and locale-neutral. Every market gets an independent search-intent, terminology and copy layer while factual/legal meaning stays invariant.

Never chain translations between locale layers.

Flight Number Wave 1 is locked, but this does **not** infer readiness for Route/Airport/Airline/Country/Delay Reason detail cohorts. Those remain separately controlled by Wave 2.

## ACTIVE NEXT — Localization Wave 2

Wave 2 proceeds **market by market**, treating the following as one coordinated Knowledge cohort package per market:

- Routes
- Airports
- Airlines
- Countries
- Delay Reasons

Default locked market order:

```text
SV ACTIVE NEXT → DA → PL → DE → FI → NL
```

Start with Swedish unless an explicit evidence-backed planning decision changes priority.

### Required Wave 2 method per market

1. inspect current canonical cohort data and existing page architecture before changes
2. research authoritative/local market terminology and actual search intent where needed
3. build locale copy from canonical facts; never translate from another locale layer
4. preserve canonical-fact isolation and legal/factual invariants
5. validate localization quality gates / publication eligibility
6. validate metadata and market search intent
7. validate internal linking across the coordinated package
8. validate canonical and publishable-only hreflang
9. validate sitemap exposure and exact expected cohort arithmetic
10. run architecture/type validation
11. use optimized Preview build and representative rendered QA
12. verify unsampled Preview behavior where relevant
13. stop Preview before the final meaningful production build
14. run one meaningful full production build after the market package is ready
15. write an authoritative market lock checkpoint before moving to the next market

Do not rerun FlightAware merely for localization.

## Research / Evidence Engine v1

Status: **🟢 LOCKED 2026-09-04**.

External autonomous research providers are not yet production-connected. Future FlightAware/weather/ATC/airline/airport/OpenAI/case-law providers must enter through the locked provider → registry → verification → resolver path. Research and legal evaluation remain separate; missing/conflicting facts stay unresolved until sufficiently verified.

## Architecture rules

- Claim Rights Assessment Engine v1 remains locked.
- Research and legal evaluation remain separate layers.
- Missing facts remain unresolved.
- External facts retain source/provenance and append-only verification history.
- Provider confidence is not legal verification.
- Canonical Knowledge facts are not forked per locale.
- Localization quality gates control SEO publication.
- App routing support does not equal publishable Knowledge localization.
- Customer-specific data remains transactional.

## Local parked work — DO NOT DISTURB

Known unrelated Claims/Reijo local work remains intentionally outside Localization commits:

```text
 M docs/CLAIMS_DESK.md
 M scripts/test-manual-claim.ts
?? scripts/create-reijo-claim.ts
```

Rules:

- do not commit current `docs/CLAIMS_DESK.md` local modifications as part of Localization
- do not commit real customer PII from helper scripts
- do not use `git add .`
- do not use `git reset --hard`
- do not use `git clean`
- do not force push

## Branch / recovery position

Working branch: `seo-localization-engine-v1`

Flight Number Localization Wave 1 is complete and locked. Dutch is the final Wave 1 checkpoint. Wave 2 is now active next.

## Exact resume action

If resuming after a crash:

**Flight Number Localization Wave 1 is COMPLETE and LOCKED: SV, DA, PL, DE, FI and NL are all locked. Current production baseline is 23,867 / 23,867 static pages with 19,887 Flight Number detail paths and 308 Flight Number airline-group paths across seven published SEO locales. Begin Localization Wave 2 with the Swedish coordinated Knowledge cohort package: Routes + Airports + Airlines + Countries + Delay Reasons. Build from canonical facts, validate the complete market package before lock, and do not infer cohort readiness from Flight Number publication. Do not rerun FlightAware. Preserve parked Claims/Reijo local work.**
