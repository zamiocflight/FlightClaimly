# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-05**

> **Authoritative crash-recovery pointer. Read this first after any session loss.**

## Read order after session loss

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/checkpoints/2026-09-05-seo-localization-fi-locked.md`
3. `docs/checkpoints/2026-09-05-seo-localization-de-locked.md`
4. `docs/checkpoints/2026-09-05-seo-localization-pl-locked.md`
5. `docs/checkpoints/2026-09-05-seo-localization-da-implementation.md`
6. `docs/checkpoints/2026-09-04-build-deployment-cost-optimization-locked.md`
7. `docs/checkpoints/2026-09-04-seo-localization-wave1-sv-locked.md`
8. `docs/engines/LOCALIZATION_ENGINE.md`
9. `docs/checkpoints/2026-09-04-research-evidence-engine-v1-locked.md`
10. `docs/ROADMAP.md`
11. `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`
12. `docs/engines/README.md`
13. `docs/CLAIMS_DESK.md` — preserve local user modifications
14. `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md`
15. `docs/SYSTEM_PROCESS_MAP.md`
16. `docs/CURRENT_SPRINT.md` — historical record; preserve it

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
- 🟢 **Build / Deployment Cost Optimization — LOCKED 2026-09-04**
- 🔵 **ACTIVE NEXT: Dutch Flight Number Localization v1 from canonical facts**
- ⏭️ **THEN: Localization Wave 2 — market by market across Routes + Airports + Airlines + Countries + Delay Reasons**
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
- Flight Number detail cohort: **17,046 paths = 2,841 × 6 published SEO locales (EN + SV + DA + PL + DE + FI)**
- Flight Number airline-group cohort: **264 paths = 44 × 6 published SEO locales**
- Finnish Flight Number sitemap cluster: **2,886 URLs = 2,841 detail + 44 airline-group + 1 index**
- no FlightAware population required for current localization sprint

## Wave 1 locked markets

### Swedish Flight Number Localization v1 — LOCKED

Authoritative checkpoint: `docs/checkpoints/2026-09-04-seo-localization-wave1-sv-locked.md`

Do not reopen SV v1 without a concrete bug, legal change or planned v2 localization pass.

### Danish Flight Number Localization v1 — LOCKED

Authoritative checkpoint: `docs/checkpoints/2026-09-05-seo-localization-da-implementation.md`

Locked evidence includes Preview **759 / 759**, sitemap **2,886**, Flight Number details **8,523**, production **12,327 / 12,327**.

Do not reopen DA v1 without a concrete bug, legal change or planned v2 localization pass.

### Polish Flight Number Localization v1 — LOCKED

Authoritative checkpoint: `docs/checkpoints/2026-09-05-seo-localization-pl-locked.md`

Locked evidence includes Preview **827 / 827**, all four regulation profiles, controlled `Thessaloniki → Saloniki`, sitemap **2,886**, production **15,212 / 15,212**, Flight Number details **11,364**.

Do not reopen PL v1 without a concrete bug, legal change or planned v2 localization pass.

### German Flight Number Localization v1 — LOCKED

Authoritative checkpoint: `docs/checkpoints/2026-09-05-seo-localization-de-locked.md`

Locked evidence includes audit/typecheck PASS, Preview **895 / 895**, four regulation profiles, hreflang through DE, unsampled fallback 200, sitemap **2,886**, production **18,097 / 18,097**, Flight Number details **14,205**, airline groups **220**.

Do not reopen DE v1 without a concrete bug, legal change or planned v2 localization pass.

### Finnish Flight Number Localization v1 — LOCKED

Authoritative checkpoint: `docs/checkpoints/2026-09-05-seo-localization-fi-locked.md`

Finnish was built independently from canonical facts using authoritative Finnish EU passenger-rights terminology and natural Finnish market copy. The checkpoint records the complete implementation method, research sources, QA commands/results and troubleshooting chronology so FI can be recovered without relying on conversation memory.

Locked evidence:

- Localization Engine architecture audit: PASS
- TypeScript validation: PASS
- Preview build: **963 / 963** static pages
- all four regulation/display profiles: PASS
- Finnish rendered grammar/headings: PASS
- metadata/canonical/hreflang: PASS — `en`, `sv`, `da`, `pl`, `de`, `fi`
- unsampled Preview fallback `A31124`: HTTP **200**
- Finnish Flight Number index: PASS
- Finnish airline-group page: PASS
- Finnish Flight Number sitemap cluster: **2,886** URLs
- final production build: **20,982 / 20,982** static pages
- Flight Number detail cohort: **17,046 = 2,841 × 6**
- Flight Number airline-group cohort: **264 = 44 × 6**

Important recovered debugging lessons are in the FI checkpoint: the initial audit failure was a mismatched canonical/localization test fixture and was fixed without weakening resolver isolation; the apparent missing hreflang during rendered QA was a case-sensitive shell grep issue because Next rendered `hrefLang`.

Do not reopen FI v1 without a concrete bug, legal change, evidence of materially wrong Finnish market terminology/search intent, or a planned v2 pass.

## Build / Deployment Cost Optimization — LOCKED

Authoritative checkpoint: `docs/checkpoints/2026-09-04-build-deployment-cost-optimization-locked.md`

Locked strategy:

- production retains full SSG for publishable Flight Number and Route detail cohorts
- Vercel Preview builds use deterministic samples of 24 Flight Number entities and 24 Routes
- valid unsampled Flight Number and Route pages render on demand in Preview mode
- Vercel Ignored Build Step is configured with `bash ignore-build-step.sh`
- application-affecting changes build; docs/Markdown-only changes skip
- production remains full SSG; current post-FI production build is **20,982 / 20,982**
- localization architecture audit remains required

Do not move production to ISR/on-demand without a separate evidence-backed architecture decision and equivalent SEO/runtime verification.

## Localization rule

Localization is **not mechanical translation**. Canonical Knowledge facts remain shared and locale-neutral. Each market gets its own search-intent, terminology and copy layer while factual/legal meaning stays invariant.

```text
Canonical facts → Swedish market intent/copy
Canonical facts → Danish market intent/copy
Canonical facts → Polish market intent/copy
Canonical facts → German market intent/copy
Canonical facts → Finnish market intent/copy
Canonical facts → Dutch market intent/copy
```

Never chain translations between locale layers. Every market is built independently from canonical facts.

Current publishable Flight Number SEO locales:

- EN — publishable
- SV — publishable / LOCKED
- DA — publishable / LOCKED
- PL — publishable / LOCKED
- DE — publishable / LOCKED
- FI — publishable / LOCKED
- NL — not yet publishable / ACTIVE NEXT

Do not infer readiness for Route/Airport/Airline/Country/Delay Reason detail cohorts. Those remain separately controlled until Wave 2.

## LOCKED localization wave plan

### Wave 1 — Flight Numbers

Current order:

`SV LOCKED → DA LOCKED → PL LOCKED → DE LOCKED → FI LOCKED → NL ACTIVE NEXT`

Dutch is the **last Flight Number market in the currently locked Wave 1 plan**. Lock NL only after the same complete quality gate used for the preceding markets.

### Wave 2 — Knowledge cohorts

After NL is locked, Wave 1 is complete. Begin Wave 2 market by market, treating the following as one coordinated market package:

- Routes
- Airports
- Airlines
- Countries
- Delay Reasons

Wave 2 market order restarts with Swedish, then Danish, Polish, German, Finnish and Dutch unless an explicit evidence-backed planning decision changes priority.

For each market validate canonical-fact isolation, local search intent, terminology, metadata, internal linking, canonical/hreflang, sitemap exposure, representative rendered pages and production behavior before lock.

Flight Number publication does not automatically make another Knowledge cohort publishable.

## ACTIVE NEXT — Dutch Flight Number Localization v1

Dutch must be built independently from canonical facts using Dutch market search intent, aviation/passenger-rights terminology and natural Dutch copy. Do not translate from Swedish, Danish, Polish, German or Finnish.

Required method:

1. research authoritative Dutch passenger-rights terminology and market wording before implementation
2. build a Dutch Flight Number localization layer from canonical facts
3. keep NL non-publishable until quality gates pass
4. extend architecture audit for Dutch and verify canonical fallback isolation
5. run TypeScript validation
6. run optimized Preview build
7. render and inspect all four regulation/display profiles: EU-only, UK-only, both, neither
8. inspect Dutch grammar/headings and controlled city names
9. verify metadata, canonical and publishable-only hreflang
10. verify valid unsampled Preview fallback
11. verify Dutch Flight Number index and airline-group surfaces
12. verify exact Dutch Flight Number sitemap cluster
13. stop Preview server before final production build
14. run one meaningful full production build
15. write an authoritative NL lock checkpoint before beginning Wave 2

Do not rerun FlightAware.

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

Finnish Flight Number Localization v1 is locked by `docs/checkpoints/2026-09-05-seo-localization-fi-locked.md`.

## Exact resume action

If resuming after a crash:

**SV, DA, PL, DE and FI Flight Number Localization v1 are LOCKED. Continue Wave 1 with Dutch Flight Number Localization v1, built independently from canonical facts and kept non-publishable until its complete quality gate passes. Dutch is the last Flight Number market in the locked Wave 1 plan. After NL is locked, begin Wave 2 market by market across Routes + Airports + Airlines + Countries + Delay Reasons, starting with Swedish unless an explicit evidence-backed planning decision changes priority. Do not rerun FlightAware. Preserve parked Claims/Reijo local work.**
