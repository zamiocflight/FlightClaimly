# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-05**

> **Authoritative crash-recovery pointer. Read this first after any session loss.**

## Read order after session loss

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/checkpoints/2026-09-05-seo-localization-de-locked.md`
3. `docs/checkpoints/2026-09-05-seo-localization-pl-locked.md`
4. `docs/checkpoints/2026-09-05-seo-localization-da-implementation.md`
5. `docs/checkpoints/2026-09-04-build-deployment-cost-optimization-locked.md`
6. `docs/checkpoints/2026-09-04-seo-localization-wave1-sv-locked.md`
7. `docs/engines/LOCALIZATION_ENGINE.md`
8. `docs/checkpoints/2026-09-04-research-evidence-engine-v1-locked.md`
9. `docs/ROADMAP.md`
10. `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`
11. `docs/engines/README.md`
12. `docs/CLAIMS_DESK.md` — preserve local user modifications
13. `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md`
14. `docs/SYSTEM_PROCESS_MAP.md`
15. `docs/CURRENT_SPRINT.md` — historical record; preserve it

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
- 🟢 **Build / Deployment Cost Optimization — LOCKED 2026-09-04**
- 🔵 **ACTIVE NEXT: Finnish Flight Number Localization v1 from canonical facts**
- ⏭️ **THEN: Dutch Flight Number Localization v1**
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
- Flight Number detail cohort: **14,205 paths = 2,841 × 5 published SEO locales (EN + SV + DA + PL + DE)**
- German Flight Number sitemap cluster: **2,886 URLs = 2,841 detail + 44 airline-group + 1 index**
- no FlightAware population required for current localization sprint

## Swedish Flight Number Localization v1 — LOCKED

Authoritative checkpoint:

`docs/checkpoints/2026-09-04-seo-localization-wave1-sv-locked.md`

Locked coverage includes Flight Number detail, index and airline-group surfaces; Swedish market SEO copy; metadata; hero/H1/CTA; breadcrumbs; fact labels; `Snabbfakta`; FAQ/schema path; internal-link headings; controlled Swedish city exonyms; canonical/hreflang; and regulation-aware EU261/UK261 compensation presentation.

Do not reopen SV v1 without a concrete bug, legal change or planned v2 localization pass.

## Danish Flight Number Localization v1 — LOCKED

Authoritative checkpoint:

`docs/checkpoints/2026-09-05-seo-localization-da-implementation.md`

Danish Flight Number detail, index and airline-group localization is complete and locked. QA passed for the localization architecture audit, TypeScript validation, Preview build, all four regulation/display profiles, metadata/canonical/hreflang, Preview fallback, sitemap exposure and final production build.

Locked production evidence:

- Preview build: **759 / 759** static pages
- Danish Flight Number sitemap cluster: **2,886** URLs
- Flight Number detail cohort at DA lock: **8,523 = 2,841 EN + 2,841 SV + 2,841 DA**
- final production build at DA lock: **12,327 / 12,327** static pages

Do not reopen DA v1 without a concrete bug, legal change or planned v2 localization pass.

## Polish Flight Number Localization v1 — LOCKED

Authoritative checkpoint:

`docs/checkpoints/2026-09-05-seo-localization-pl-locked.md`

Polish Flight Number detail, index and airline-group localization is complete and locked. It was built independently from canonical facts using Polish market terminology with `odszkodowanie` as the primary legal/SEO term.

Locked QA evidence:

- Preview build after final exonym fix: **827 / 827** static pages
- all four regulation/display profiles rendered and verified: EU-only, UK-only, dual EU/UK, and neither
- controlled exonym fix `Thessaloniki → Saloniki` rendered correctly
- metadata/canonical/hreflang: PASS — Flight Number hreflang cohort `en`, `sv`, `da`, `pl`
- Preview fallback on unsampled `A31124`: PASS
- Polish Flight Number index: PASS
- Polish airline-group page: PASS
- Polish Flight Number sitemap cluster: **2,886** URLs
- Localization Engine architecture audit after final QA: PASS
- final production build: **15,212 / 15,212** static pages
- Flight Number detail cohort: **11,364 = 2,841 × 4 published SEO locales**

Do not reopen PL v1 without a concrete bug, legal change or planned v2 localization pass.

## German Flight Number Localization v1 — LOCKED

Authoritative checkpoint:

`docs/checkpoints/2026-09-05-seo-localization-de-locked.md`

German Flight Number detail, index and airline-group localization is complete and locked. It was built independently from canonical facts using German market search intent and passenger-rights terminology, with `Entschädigung` as the primary customer-facing SEO term.

Locked QA evidence:

- Localization Engine architecture audit: PASS
- TypeScript validation: PASS
- Preview build: **895 / 895** static pages
- all four regulation/display profiles rendered and verified: EU-only, UK-only, dual EU/UK, and neither
- metadata/canonical/hreflang: PASS — Flight Number hreflang cohort `en`, `sv`, `da`, `pl`, `de`
- Preview fallback on unsampled `A31124`: PASS — HTTP **200**
- German Flight Number index: PASS
- German airline-group page: PASS
- German Flight Number sitemap cluster: **2,886** URLs
- final production build: **18,097 / 18,097** static pages
- Flight Number detail cohort: **14,205 = 2,841 × 5 published SEO locales**
- Flight Number airline-group cohort: **220 = 44 × 5 published SEO locales**

Do not reopen DE v1 without a concrete bug, legal change or planned v2 localization pass.

## Build / Deployment Cost Optimization — LOCKED

Authoritative checkpoint:

`docs/checkpoints/2026-09-04-build-deployment-cost-optimization-locked.md`

Locked strategy:

- production retains full SSG for publishable Flight Number and Route detail cohorts
- Vercel Preview builds use deterministic samples of 24 Flight Number entities and 24 Routes
- valid unsampled Flight Number and Route pages render on demand in Preview mode
- Vercel Ignored Build Step is configured with `bash ignore-build-step.sh`
- application-affecting changes build; docs/Markdown-only changes skip
- production remains full SSG; current post-DE production build is **18,097 / 18,097**
- `npm run audit:localization` remains PASS

Do not move production to ISR/on-demand without a separate evidence-backed architecture decision and equivalent SEO/runtime verification.

## Localization rule

Localization is **not mechanical translation**. Canonical Knowledge facts remain shared and locale-neutral. Each market gets its own search-intent, terminology and copy layer while factual/legal meaning stays invariant.

Correct model:

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
- FI — not yet publishable
- NL — not yet publishable

Do not infer readiness for route/airport/airline/country/delay-reason detail cohorts. Those remain separately controlled.

## LOCKED localization wave plan

### Wave 1 — Flight Numbers

Complete Flight Number Localization v1 market by market. Each locale is built independently from canonical facts and locked only after its full quality gate.

Locked/current order:

`SV LOCKED → DA LOCKED → PL LOCKED → DE LOCKED → FI NEXT → NL`

After Dutch Flight Number Localization v1 is locked, Wave 1 for the currently prioritized market set is complete.

### Wave 2 — Knowledge cohorts

After Wave 1, return to each market separately and localize the next Knowledge SEO package **as one market-level wave**:

- Routes
- Airports
- Airlines
- Countries
- Delay Reasons

Wave 2 market order begins again from the established markets, starting with Swedish, then Danish, Polish, German, Finnish and Dutch unless a later evidence-backed prioritization decision explicitly changes the order.

For each Wave 2 market, treat the five cohorts as one coordinated localization package while retaining cohort-specific quality gates where needed. Validate market search intent, terminology, metadata, internal linking, canonical/hreflang, sitemap exposure, rendered pages and production behavior before locking that market's Wave 2 package and moving to the next market.

Wave 2 must continue to obey canonical-fact isolation. Do not mechanically translate between locale layers and do not assume Flight Number publication automatically makes any other Knowledge cohort publishable.

This Wave 1 → Wave 2 sequence is **LOCKED as the localization execution plan**. Change it only through an explicit planning decision, not opportunistically during implementation.

## ACTIVE NEXT — Finnish Flight Number Localization v1

Build Finnish independently from canonical facts using Finnish market search intent, aviation/passenger-rights terminology and natural Finnish copy. Do not translate from Swedish, Danish, Polish or German.

Use the same locked quality model as SV/DA/PL/DE: canonical-fact isolation, locale quality gates, regulation-aware EU261/UK261 compensation presentation, representative rendered QA, metadata/canonical/hreflang, sitemap verification, Preview build during iteration and one meaningful final production build before lock.

Keep FI non-publishable until all quality gates pass.

After FI: **Dutch Flight Number Localization v1 → Localization Wave 2**.

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

German Flight Number Localization v1 is locked by checkpoint `docs/checkpoints/2026-09-05-seo-localization-de-locked.md`.

German lock checkpoint commit: `40d183e35f770b5880d908243986b38d12d817ec` (`docs: lock German Flight Number localization v1`).

## Exact resume action

If resuming after a crash:

**SV, DA, PL and DE Flight Number Localization v1 are LOCKED. Continue Wave 1 with Finnish, then Dutch Flight Number Localization v1, each independently from canonical facts and locked separately. After NL is locked, begin Wave 2 market by market across Routes + Airports + Airlines + Countries + Delay Reasons, starting again with Swedish unless an explicit planning decision changes priority. Do not rerun FlightAware.**
