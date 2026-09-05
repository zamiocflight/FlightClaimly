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
- 🟢 **Flight Number Localization Wave 1 — COMPLETE / LOCKED / LIVE IN PRODUCTION 2026-09-05**
- 🟢 **SV → DA → PL → DE → FI → NL Flight Number markets — LOCKED**
- 🟢 **Production SEO launch verification — PASS 2026-09-05**
- 🟡 **Google discovery/indexing handoff — IN PROGRESS**
- 🔵 **ACTIVE NEXT: Localization Wave 2 — Swedish coordinated Knowledge cohort package**
- ⏭️ **THEN: DA → PL → DE → FI → NL Wave 2 market packages**
- 🟡 PARALLEL: Content / Social Engine v1

## Production launch / Google handoff — 2026-09-05

Wave 1 was promoted through PR #1 from `seo-localization-engine-v1` to `main` and successfully deployed by Vercel Production.

Live verification completed after deployment:

- representative Dutch detail URL `/nl/flight-numbers/a3101` changed from pre-release HTTP 404 to **HTTP 200**
- `robots.txt` allows public crawling and disallows `/admin` and `/api`
- `robots.txt` references `https://www.flightclaimly.com/sitemap.xml`
- live `sitemap.xml` returns **HTTP 200** with `application/xml`
- live Dutch Flight Number sitemap cluster count verified at **2,886 URLs**
- representative Dutch detail canonical points to its exact NL URL
- representative Dutch detail hreflang contains exactly the seven published SEO locales: EN, SV, DA, PL, DE, FI, NL
- representative Dutch detail has no `noindex` / Googlebot meta blocker

Google Search Console state at handoff:

- existing sitemap registration is healthy / processed
- Search Console still showed **6,336 discovered pages** and `Last read: 2026-09-04`, therefore it had not yet re-read the newly deployed 2026-09-05 sitemap at the time of verification
- manual URL Inspection request accepted (green `Indexing requested`) for Dutch detail `/nl/flight-numbers/a3101`
- manual hub indexing requests accepted for `/nl/flight-numbers`, `/sv/flight-numbers`, `/da/flight-numbers`, `/pl/flight-numbers`
- manual request for `/de/flight-numbers` returned a temporary Search Console error (`Could not submit indexing request. Try again later.`) after several rapid requests
- stop manual requests for now; retry DE and FI later rather than repeatedly submitting
- do not manually submit thousands of detail URLs; sitemap discovery is the mass-discovery mechanism

### Google follow-up

On the next check, inspect the existing sitemap in Search Console. The first useful milestone is that `Last read` advances beyond 2026-09-04 and discovered-page counts begin reflecting the new sitemap. Do not interpret lack of immediate indexing as a production defect.

If manual URL Inspection is available again, request the remaining strategic hubs only:

1. `/de/flight-numbers`
2. `/fi/flight-numbers`

Then stop manual requests and let sitemap/crawl discovery proceed.

## Secured SEO baseline

- 2,841 publishable canonical Flight Number entities
- 44 represented airlines
- 3,141 route paths
- production build after Wave 1: **23,867 / 23,867** static pages
- Flight Number detail cohort: **19,887 paths = 2,841 × 7 published SEO locales (EN + SV + DA + PL + DE + FI + NL)**
- Flight Number airline-group cohort: **308 paths = 44 × 7 published SEO locales**
- each localized Flight Number market sitemap cluster: **2,886 URLs = 2,841 detail + 44 airline-group + 1 index**
- no FlightAware population required for current localization work

## Flight Number Localization Wave 1 — COMPLETE / LOCKED

Authoritative final Wave 1 checkpoint: `docs/checkpoints/2026-09-05-seo-localization-nl-locked.md`

```text
SV LOCKED → DA LOCKED → PL LOCKED → DE LOCKED → FI LOCKED → NL LOCKED → PRODUCTION LIVE
```

Do not reopen any locked Flight Number v1 market without a concrete bug, legal/regulatory change, evidence of materially wrong local terminology/search intent, or an explicit planned v2 pass.

## Build / Deployment Cost Optimization — LOCKED

Authoritative checkpoint: `docs/checkpoints/2026-09-04-build-deployment-cost-optimization-locked.md`

Locked strategy:

- production retains full SSG for publishable Flight Number and Route detail cohorts
- Vercel Preview builds use deterministic samples of 24 Flight Number entities and 24 Routes
- valid unsampled Flight Number and Route pages render on demand in Preview mode
- Vercel Ignored Build Step is configured with `bash ignore-build-step.sh`
- application-affecting changes build; docs/Markdown-only changes skip
- production remains full SSG; current production baseline is **23,867 / 23,867**
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

Wave 1 source branch: `seo-localization-engine-v1`.

Wave 1 is merged to `main` and live in Production. Do not continue new Wave 2 implementation on the completed Wave 1 branch without an explicit branch decision. Parked local Claims/Reijo work must remain untouched.

## Exact resume action

If resuming after a pause/crash:

**Flight Number Localization Wave 1 is COMPLETE, LOCKED, merged to main and LIVE in Production. Production SEO launch verification passed: representative NL detail is HTTP 200, robots/sitemap are healthy, NL sitemap cluster is 2,886, canonical/hreflang are correct, and no noindex blocker exists. Google Search Console had not yet re-read the 2026-09-05 sitemap at pause time; manual indexing was accepted for NL detail plus NL/SV/DA/PL hubs, while DE hit a temporary request error and FI was not attempted. Retry only DE/FI later, then rely on sitemap discovery. ACTIVE NEXT implementation is Localization Wave 2 starting with the Swedish coordinated package Routes + Airports + Airlines + Countries + Delay Reasons, then DA → PL → DE → FI → NL. Build from canonical facts, validate the complete market package before lock, do not rerun FlightAware, and preserve parked Claims/Reijo local work.**
