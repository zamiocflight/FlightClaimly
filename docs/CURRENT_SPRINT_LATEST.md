# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-06**

> **Authoritative crash-recovery pointer. Read this first after any session loss.**

## Read order after session loss

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/checkpoints/2026-09-06-wave1-google-handoff-wave2-resume.md`
3. `docs/checkpoints/2026-09-05-seo-localization-nl-locked.md`
4. `docs/checkpoints/2026-09-05-seo-localization-fi-locked.md`
5. `docs/checkpoints/2026-09-05-seo-localization-de-locked.md`
6. `docs/checkpoints/2026-09-05-seo-localization-pl-locked.md`
7. `docs/checkpoints/2026-09-05-seo-localization-da-implementation.md`
8. `docs/checkpoints/2026-09-04-seo-localization-wave1-sv-locked.md`
9. `docs/checkpoints/2026-09-04-build-deployment-cost-optimization-locked.md`
10. `docs/engines/LOCALIZATION_ENGINE.md`
11. `docs/ROADMAP.md`
12. `docs/checkpoints/2026-09-04-research-evidence-engine-v1-locked.md`
13. `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`
14. `docs/CLAIMS_DESK.md` — preserve local user modifications

## Current state

- 🟢 Delay Reason Engine v1 — LOCKED
- 🟢 EU261 Legal Rule Layer v1 — LOCKED
- 🟢 Claim Rights Assessment Engine v1 — LOCKED
- 🟢 Claims Desk Assessment Integration phase 1 — VERIFIED
- 🟢 Research / Evidence Engine v1 foundation — LOCKED
- 🟢 Build / Deployment Cost Optimization — LOCKED
- 🟢 Flight Number Localization Wave 1 — **COMPLETE / LOCKED / RELEASED**
- 🟢 Wave 1 markets — **SV → DA → PL → DE → FI → NL**
- 🟢 Production-scale Wave 1 baseline — **23,867 / 23,867** static pages
- 🟢 Google Search Console handoff — sitemap submitted/resubmitted; representative indexing requests accepted; DE and FI confirmed successful after DE's earlier transient failure
- 🔵 **ACTIVE NEXT: Localization Wave 2 — Swedish coordinated Knowledge package**
- ⏭️ THEN: DA → PL → DE → FI → NL Wave 2 packages
- ⏭️ AFTER WAVE 2: premium UX/design/conversion pass across public site + complete claim journey
- 🟡 LATER CLEANUP: Search Console legacy index-quality issues + analytics hygiene
- 🟡 PARALLEL/BACKLOG: Content/Social and Claims Operations roadmap

## Secured SEO baseline

- 2,841 publishable canonical Flight Number entities
- 44 represented airlines
- 3,141 route paths
- post-NL production build: **23,867 / 23,867**
- Flight Number detail cohort: **19,887 = 2,841 × 7 published SEO locales**
- Flight Number airline-group cohort: **308 = 44 × 7 published SEO locales**
- each localized Flight Number market sitemap cluster: **2,886 URLs = 2,841 detail + 44 airline-group + 1 index**
- published Flight Number locales: EN + SV + DA + PL + DE + FI + NL
- no FlightAware population required for current localization work

## Wave 1 lock rule

Do not reopen locked Flight Number v1 markets without a concrete bug, legal/regulatory change, materially wrong terminology/search intent, or an explicit planned v2 pass.

Flight Number publication does **not** imply that Route/Airport/Airline/Country/Delay Reason localization is ready. Those cohorts are controlled independently in Wave 2.

## Google handoff status

The production localization release has been handed to Google through Search Console. Sitemap discovery is the scaling mechanism; manual URL Inspection/indexing requests are only for representative strategic URLs/hubs.

Do not manually request thousands of programmatic URLs and do not block Wave 2 engineering while waiting for complete indexation/ranking. Google discovery, crawling, indexation and ranking are asynchronous and should be monitored over days/weeks.

The existing Search Console report includes legacy issues from the earlier URL footprint (duplicates, 404s, redirects, discovered/crawled-not-indexed). Preserve these as a later audit lane. Before fixing anything, sample current live URLs because Search Console reporting can lag production changes.

## ACTIVE NEXT — Localization Wave 2

Wave 2 proceeds **market by market** as one coordinated Knowledge cohort package:

- Routes
- Airports
- Airlines
- Countries
- Delay Reasons

Locked order:

```text
SV ACTIVE NEXT → DA → PL → DE → FI → NL
```

### Required method per market

1. inspect canonical cohort data and existing architecture for all five families
2. research authoritative/local terminology and actual search intent where needed
3. build locale copy directly from canonical facts
4. preserve canonical-fact isolation and legal/factual invariants
5. validate localization quality gates / publication eligibility
6. validate metadata and market search intent
7. validate internal linking across the coordinated package
8. validate canonical and publishable-only hreflang
9. validate sitemap exposure and exact cohort arithmetic
10. run architecture/type validation
11. use optimized Preview + representative rendered QA
12. verify unsampled Preview behavior where relevant
13. stop Preview before final meaningful production build
14. run one meaningful full production build
15. write authoritative market checkpoint before moving on

Do not rerun FlightAware merely for localization.

## AFTER WAVE 2 — Premium UX / Design / Conversion pass

This is explicitly planned and must not be lost after a crash.

After Wave 2, review the entire public site and customer claim process on desktop + mobile with the goal of making FlightClaimly feel more premium, trustworthy and professionally mature while improving conversion.

Scope includes:

- landing/search entry → claim completion
- typography, spacing, hierarchy and premium visual polish
- trust and authority signals
- CTA clarity
- progress/navigation through claim flow
- form friction and validation
- loading/error/empty/success states
- copy/reassurance
- responsive behavior
- useful microinteractions
- consistency between Knowledge/SEO pages and transactional flow
- analytics/conversion instrumentation

Do not mix cosmetic redesign work into Wave 2 unless a concrete localization blocker requires it.

## Later cleanup lanes

### Search Console

Audit legacy duplicate/canonical, 404, redirect, discovered-not-indexed and crawled-not-indexed cohorts after Google has had time to process the new sitemap/release. Diagnose samples against current live production before changing code.

### Analytics

GA4 showed a large 2026-08-24 page-view spike concentrated in claim-flow/admin paths and datacenter-like locations. Treat it as likely development/test/automated traffic unless proven otherwise. Later, improve analytics hygiene so internal/admin/automated traffic does not distort acquisition and conversion reporting.

## Architecture rules

- Claim Rights Assessment Engine v1 remains locked.
- Research and legal evaluation remain separate.
- Missing/conflicting facts remain unresolved until sufficiently verified.
- External facts retain source/provenance and append-only verification history.
- Canonical Knowledge facts are never forked per locale.
- Localization quality gates control SEO publication.
- App routing support does not equal publishable localization.
- Customer-specific data remains transactional.

## Local parked work — DO NOT DISTURB

Known unrelated Claims/Reijo local work remains outside Localization commits:

```text
 M docs/CLAIMS_DESK.md
 M scripts/test-manual-claim.ts
?? scripts/create-reijo-claim.ts
```

Never commit real customer PII from helper scripts. Do not use `git add .`, `git reset --hard`, `git clean` or force push.

## Branch / recovery position

Working branch: `seo-localization-engine-v1`

## Exact resume action

**Wave 1 Flight Number Localization is complete, locked, released and handed to Google. Google Search Console sitemap/indexing handoff is underway and representative requests including DE and FI succeeded. Do not wait for full Google indexation before continuing. Begin Wave 2 with Swedish Routes + Airports + Airlines + Countries + Delay Reasons as one coordinated package, then DA → PL → DE → FI → NL. After Wave 2, perform the planned premium UX/design/conversion review. Search Console legacy errors and analytics hygiene remain later cleanup lanes. Preserve parked Claims/Reijo work and do not rerun FlightAware.**
