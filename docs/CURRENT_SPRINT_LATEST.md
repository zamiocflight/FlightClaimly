# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-04**

> **Authoritative crash-recovery pointer. Read this first after any session loss.**

## Read order after session loss

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/checkpoints/2026-09-04-build-deployment-cost-optimization-locked.md`
3. `docs/checkpoints/2026-09-04-seo-localization-wave1-sv-locked.md`
4. `docs/engines/LOCALIZATION_ENGINE.md`
5. `docs/checkpoints/2026-09-04-research-evidence-engine-v1-locked.md`
6. `docs/ROADMAP.md`
7. `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`
8. `docs/engines/README.md`
9. `docs/CLAIMS_DESK.md` — preserve local user modifications
10. `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md`
11. `docs/SYSTEM_PROCESS_MAP.md`
12. `docs/CURRENT_SPRINT.md` — historical record; preserve it

## Current state

- 🟢 Delay Reason Engine v1 — LOCKED
- 🟢 EU261 Legal Rule Layer v1 — LOCKED
- 🟢 Claim Rights Assessment Engine v1 — LOCKED
- 🟢 Claims Desk Assessment Integration phase 1 — VERIFIED
- 🟢 Research / Evidence Engine v1 foundation — LOCKED
- 🟢 Localization architecture — IMPLEMENTED / AUDIT GREEN
- 🟢 **Swedish Flight Number Localization v1 — LOCKED 2026-09-04**
- 🟢 **Build / Deployment Cost Optimization — LOCKED 2026-09-04**
- 🔵 **ACTIVE NEXT: Danish Flight Number Localization v1 from canonical facts**
- ⏭️ AFTER DK: Finnish Flight Number localization independently from canonical facts
- 🟡 PARALLEL: Content / Social Engine v1

## Secured SEO baseline

- 2,841 publishable canonical Flight Number entities
- 44 represented airlines
- 3,141 route paths
- pre-SV production build: **6,557 / 6,557** static pages
- post-SV production build: **9,442 / 9,442** static pages
- Flight Number detail cohort: **5,682 paths = 2,841 EN + 2,841 SV**
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

## Build / Deployment Cost Optimization — LOCKED

Authoritative checkpoint:

`docs/checkpoints/2026-09-04-build-deployment-cost-optimization-locked.md`

Locked strategy:

- production retains full SSG for publishable Flight Number and Route detail cohorts
- Vercel Preview builds use deterministic samples of 24 Flight Number entities and 24 Routes
- valid unsampled Flight Number and Route pages were verified to render on demand in Preview mode
- Preview build generates **691 / 691** static pages versus the secured **9,442 / 9,442** production baseline
- this is approximately **92.7% fewer prerendered pages** in Preview; it is not asserted as an identical billing/CPU reduction
- Vercel Ignored Build Step is configured with `bash ignore-build-step.sh`
- application-affecting changes return exit 1/build; docs/Markdown-only changes return exit 0/skip
- final production-mode build remains **9,442 / 9,442** with 5,682 Flight Number detail paths and 3,141 Route detail paths
- `npm run audit:localization` remains PASS

Do not move production to ISR/on-demand without a separate evidence-backed architecture decision and equivalent SEO/runtime verification.

## Localization rule

Localization is **not mechanical translation**. Canonical Knowledge facts remain shared and locale-neutral. Each market gets its own search-intent, terminology and copy layer while factual/legal meaning stays invariant.

Correct model:

```text
Canonical facts → Swedish market intent/copy
Canonical facts → Danish market intent/copy
Canonical facts → Finnish market intent/copy
```

Never use `EN → SV → DA/FI` or translate Danish/Finnish from Swedish.

Current publishable Flight Number SEO locales:

- EN — publishable
- SV — publishable / LOCKED
- DA — not yet publishable
- FI — not yet publishable

Do not infer Swedish readiness for route/airport/airline/country/delay-reason detail cohorts. Those remain separately controlled.

## ACTIVE NEXT — Danish Flight Number Localization v1

Build Danish independently from canonical facts using Danish market search intent, terminology and natural copy. Do not translate from Swedish.

Required sequence:

1. inspect canonical Flight Number facts and existing localization interfaces/quality gates
2. define Danish market terminology, search-intent patterns and controlled city-name localization where appropriate
3. implement Danish Flight Number detail/index/airline-group localization without changing canonical facts or locked Swedish behavior
4. keep DA non-publishable until all quality gates pass
5. verify all EU261-only, UK261-only, dual EU261+UK261 and neither regulation/display profiles
6. verify metadata, hero/H1/CTA, breadcrumbs, fact labels, FAQ/schema and internal-link surfaces
7. verify canonical/hreflang/sitemap exposure only after DA publication gates are green
8. run localization audit/typecheck and representative rendered SEO QA
9. use Preview build strategy during iteration; perform one meaningful final production build/checkpoint before locking DK
10. lock Danish v1, then repeat independently for Finnish

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

Optimization implementation head before documentation lock: `66b2786938d3cd5ebb3064ee43cb4f446ef06c1f` (`fix: allow preview route fallback rendering`).

## Exact resume action

If resuming after a crash:

**SV Flight Number Localization v1 and Build / Deployment Cost Optimization are LOCKED. Do not rerun FlightAware. Begin Danish Flight Number Localization v1 independently from canonical facts, keep DA non-publishable until all quality gates pass, then lock DK before starting FI.**
