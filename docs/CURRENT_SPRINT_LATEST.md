# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-05**

> **Authoritative crash-recovery pointer. Read this first after any session loss.**

## Read order after session loss

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/checkpoints/2026-09-05-seo-localization-pl-locked.md`
3. `docs/checkpoints/2026-09-05-seo-localization-da-implementation.md`
4. `docs/checkpoints/2026-09-04-build-deployment-cost-optimization-locked.md`
5. `docs/checkpoints/2026-09-04-seo-localization-wave1-sv-locked.md`
6. `docs/engines/LOCALIZATION_ENGINE.md`
7. `docs/checkpoints/2026-09-04-research-evidence-engine-v1-locked.md`
8. `docs/ROADMAP.md`
9. `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`
10. `docs/engines/README.md`
11. `docs/CLAIMS_DESK.md` — preserve local user modifications
12. `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md`
13. `docs/SYSTEM_PROCESS_MAP.md`
14. `docs/CURRENT_SPRINT.md` — historical record; preserve it

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
- 🟢 **Build / Deployment Cost Optimization — LOCKED 2026-09-04**
- 🔵 **ACTIVE NEXT: German Flight Number Localization v1 from canonical facts**
- ⏭️ AFTER DE: Finnish, Dutch and further priority markets independently from canonical facts
- 🟡 PARALLEL: Content / Social Engine v1

## Secured SEO baseline

- 2,841 publishable canonical Flight Number entities
- 44 represented airlines
- 3,141 route paths
- pre-SV production build: **6,557 / 6,557** static pages
- post-SV production build: **9,442 / 9,442** static pages
- post-DA production build: **12,327 / 12,327** static pages
- post-PL production build: **15,212 / 15,212** static pages
- Flight Number detail cohort: **11,364 paths = 2,841 EN + 2,841 SV + 2,841 DA + 2,841 PL**
- Polish Flight Number sitemap cluster: **2,886 URLs = 2,841 detail + 44 airline-group + 1 index**
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

## Build / Deployment Cost Optimization — LOCKED

Authoritative checkpoint:

`docs/checkpoints/2026-09-04-build-deployment-cost-optimization-locked.md`

Locked strategy:

- production retains full SSG for publishable Flight Number and Route detail cohorts
- Vercel Preview builds use deterministic samples of 24 Flight Number entities and 24 Routes
- valid unsampled Flight Number and Route pages render on demand in Preview mode
- Vercel Ignored Build Step is configured with `bash ignore-build-step.sh`
- application-affecting changes build; docs/Markdown-only changes skip
- production remains full SSG; current post-PL production build is **15,212 / 15,212**
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
- DE — not yet publishable
- FI — not yet publishable
- NL — not yet publishable

Do not infer readiness for route/airport/airline/country/delay-reason detail cohorts. Those remain separately controlled.

## ACTIVE NEXT — German Flight Number Localization v1

Build German independently from canonical facts using German market search intent, aviation/passenger-rights terminology and natural German copy. Do not translate from Swedish, Danish or Polish.

Use the same locked quality model as SV/DA/PL: canonical-fact isolation, locale quality gates, regulation-aware EU261/UK261 compensation presentation, representative rendered QA, metadata/canonical/hreflang, sitemap verification, Preview build during iteration and one meaningful final production build before lock.

Keep DE non-publishable until all quality gates pass.

Planned localization order after DE: **Finnish → Dutch → further priority markets**.

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

Polish implementation/final exonym fix head before lock docs: `32d1c8dee28bbfdca28a401dba3f5335bf36dc84` (`fix: use Polish exonym for Thessaloniki`).

Polish lock checkpoint commit: `66d20dc95083e9bae851185b5efff7f61e190d3a` (`docs: lock Polish Flight Number localization v1`).

## Exact resume action

If resuming after a crash:

**SV, DA and PL Flight Number Localization v1 are LOCKED. Start German Flight Number Localization v1 independently from canonical facts. Keep DE non-publishable until all quality gates pass. Then continue Finnish, Dutch and further priority markets. Do not rerun FlightAware.**
