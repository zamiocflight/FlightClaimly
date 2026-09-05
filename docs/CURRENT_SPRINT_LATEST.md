# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-05**

> **Authoritative crash-recovery pointer. Read this first after any session loss.**

## Read order after session loss

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/checkpoints/2026-09-05-seo-localization-da-implementation.md`
3. `docs/checkpoints/2026-09-04-build-deployment-cost-optimization-locked.md`
4. `docs/checkpoints/2026-09-04-seo-localization-wave1-sv-locked.md`
5. `docs/engines/LOCALIZATION_ENGINE.md`
6. `docs/checkpoints/2026-09-04-research-evidence-engine-v1-locked.md`
7. `docs/ROADMAP.md`
8. `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`
9. `docs/engines/README.md`
10. `docs/CLAIMS_DESK.md` — preserve local user modifications
11. `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md`
12. `docs/SYSTEM_PROCESS_MAP.md`
13. `docs/CURRENT_SPRINT.md` — historical record; preserve it

## Current state

- 🟢 Delay Reason Engine v1 — LOCKED
- 🟢 EU261 Legal Rule Layer v1 — LOCKED
- 🟢 Claim Rights Assessment Engine v1 — LOCKED
- 🟢 Claims Desk Assessment Integration phase 1 — VERIFIED
- 🟢 Research / Evidence Engine v1 foundation — LOCKED
- 🟢 Localization architecture — IMPLEMENTED / AUDIT GREEN
- 🟢 **Swedish Flight Number Localization v1 — LOCKED 2026-09-04**
- 🟢 **Danish Flight Number Localization v1 — LOCKED 2026-09-05**
- 🟢 **Build / Deployment Cost Optimization — LOCKED 2026-09-04**
- 🔵 **ACTIVE NEXT: Polish Flight Number Localization v1 from canonical facts**
- ⏭️ AFTER PL: German Flight Number localization independently from canonical facts
- ⏭️ THEN: Finnish, Dutch and further priority markets independently from canonical facts
- 🟡 PARALLEL: Content / Social Engine v1

## Secured SEO baseline

- 2,841 publishable canonical Flight Number entities
- 44 represented airlines
- 3,141 route paths
- pre-SV production build: **6,557 / 6,557** static pages
- post-SV production build: **9,442 / 9,442** static pages
- post-DA production build: **12,327 / 12,327** static pages
- Flight Number detail cohort: **8,523 paths = 2,841 EN + 2,841 SV + 2,841 DA**
- Danish Flight Number sitemap cluster: **2,886 URLs = 2,841 detail + 44 airline-group + 1 index**
- no FlightAware population required for current localization sprint

## Swedish Flight Number Localization v1 — LOCKED

Authoritative checkpoint:

`docs/checkpoints/2026-09-04-seo-localization-wave1-sv-locked.md`

Locked coverage includes Flight Number detail, index and airline-group surfaces; Swedish market SEO copy; metadata; hero/H1/CTA; breadcrumbs; fact labels; `Snabbfakta`; FAQ/schema path; internal-link headings; controlled Swedish city exonyms; canonical/hreflang; and regulation-aware EU261/UK261 compensation presentation.

Four legal/display profiles were explicitly verified:

- EU261-only — EUR 250 / 400 / up to 600
- UK261-only — GBP 220 / 350 / up to 520
- EU261 + UK261 — dual EUR/GBP presentation
- neither — no false fixed compensation; neutral individual-assessment language

Final QA completed:

- representative rendered Swedish detail pages — PASS
- Swedish Flight Number index — PASS
- Swedish airline-group page — PASS
- title/meta/canonical — PASS
- hreflang exactly EN + SV for tested Flight Number detail — PASS
- sitemap exactly EN + SV for tested Flight Number detail — PASS
- `npm run audit:localization` — PASS
- `npm run typecheck` — PASS
- `npm run build` — PASS, **9,442 / 9,442** static pages

Do not reopen SV v1 without a concrete bug, legal change or planned v2 localization pass.

## Danish Flight Number Localization v1 — LOCKED

Authoritative checkpoint:

`docs/checkpoints/2026-09-05-seo-localization-da-implementation.md`

Danish Flight Number detail, index and airline-group localization is complete and locked. QA passed for the localization architecture audit, TypeScript validation, Preview build, all four regulation/display profiles, metadata/canonical/hreflang, Preview fallback, sitemap exposure and final production build.

Locked production evidence:

- Preview build: **759 / 759** static pages
- Danish Flight Number sitemap cluster: **2,886** URLs
- Flight Number detail cohort: **8,523 = 2,841 EN + 2,841 SV + 2,841 DA**
- final production build: **12,327 / 12,327** static pages

Do not reopen DA v1 without a concrete bug, legal change or planned v2 localization pass.

## Build / Deployment Cost Optimization — LOCKED

Authoritative checkpoint:

`docs/checkpoints/2026-09-04-build-deployment-cost-optimization-locked.md`

Locked strategy:

- production retains full SSG for publishable Flight Number and Route detail cohorts
- Vercel Preview builds use deterministic samples of 24 Flight Number entities and 24 Routes
- valid unsampled Flight Number and Route pages were verified to render on demand in Preview mode
- Preview build generates **691 / 691** static pages versus the secured **9,442 / 9,442** production baseline before DA localization
- this was approximately **92.7% fewer prerendered pages** in Preview at that secured baseline; it is not asserted as an identical billing/CPU reduction
- Vercel Ignored Build Step is configured with `bash ignore-build-step.sh`
- application-affecting changes return exit 1/build; docs/Markdown-only changes return exit 0/skip
- production remains full SSG; current post-DA production build is **12,327 / 12,327**
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
- PL — not yet publishable
- DE — not yet publishable
- FI — not yet publishable
- NL — not yet publishable

Do not infer readiness for route/airport/airline/country/delay-reason detail cohorts. Those remain separately controlled.

## ACTIVE NEXT — Polish Flight Number Localization v1

Build Polish independently from canonical facts using Polish market search intent, aviation/passenger-rights terminology and natural copy. Do not translate from Swedish or Danish.

Use the same locked quality model as SV/DA: canonical-fact isolation, locale quality gates, regulation-aware EU261/UK261 compensation presentation, representative rendered QA, metadata/canonical/hreflang, sitemap verification, Preview build during iteration and one meaningful final production build before lock.

Planned localization order after PL: **German → Finnish → Dutch → further priority markets**.

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

Danish lock commit: `1a2c70948f69581e26892f9ac6624c8320933317` (`docs: lock Danish Flight Number localization v1`).

## Exact resume action

If resuming after a crash:

**SV and DA Flight Number Localization v1 are LOCKED. Build Polish Flight Number Localization v1 independently from canonical facts, keep PL non-publishable until all quality gates pass, then lock PL before starting German. Planned order after that: Finnish, Dutch, then further priority markets. Do not rerun FlightAware.**
