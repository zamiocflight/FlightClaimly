# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-04**

> **Authoritative crash-recovery pointer. Read this first after any session loss.**

## Read order after session loss

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/checkpoints/2026-09-04-seo-localization-wave1-sv-locked.md`
3. `docs/engines/LOCALIZATION_ENGINE.md`
4. `docs/checkpoints/2026-09-04-research-evidence-engine-v1-locked.md`
5. `docs/ROADMAP.md`
6. `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`
7. `docs/engines/README.md`
8. `docs/CLAIMS_DESK.md` — preserve local user modifications
9. `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md`
10. `docs/SYSTEM_PROCESS_MAP.md`
11. `docs/CURRENT_SPRINT.md` — historical record; preserve it

## Current state

- 🟢 Delay Reason Engine v1 — LOCKED
- 🟢 EU261 Legal Rule Layer v1 — LOCKED
- 🟢 Claim Rights Assessment Engine v1 — LOCKED
- 🟢 Claims Desk Assessment Integration phase 1 — VERIFIED
- 🟢 Research / Evidence Engine v1 foundation — LOCKED
- 🟢 Localization architecture — IMPLEMENTED / AUDIT GREEN
- 🟢 **Swedish Flight Number Localization v1 — LOCKED 2026-09-04**
- 🔵 **ACTIVE NEXT: Build / Deployment Cost Optimization before DK**
- ⏭️ AFTER OPTIMIZATION: Danish Flight Number localization independently from canonical facts, then Finnish
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

## ACTIVE NEXT — Build / Deployment Cost Optimization

This review happens **before DK** because the SV rollout increased full static generation from 6,557 to 9,442 pages and every additional locale would increase build work further.

Required review sequence:

1. inspect Vercel/Git preview-build trigger behavior and prevent waste from intermediate commits where safely possible
2. inspect `generateStaticParams`, `dynamicParams`, revalidation/runtime behavior and current SSG assumptions
3. inspect sitemap generation and confirm it remains publishable-locale driven
4. evaluate full SSG versus hybrid SSG + ISR/on-demand for high-volume programmatic Knowledge pages
5. preserve server-rendered SEO HTML, canonical, hreflang, schema and sitemap discoverability
6. make the smallest safe optimization only if architecture evidence supports it
7. verify EN/SV regression safety with audit/typecheck and targeted rendered/SEO checks; use a full build only at a meaningful checkpoint
8. document/lock the deployment strategy before activating DK

Do **not** switch blindly to ISR. First prove that arbitrary valid slugs can render safely outside full `generateStaticParams` enumeration and that metadata/schema/canonical/hreflang remain correct.

## Then — Danish localization

Only after deployment/build strategy is verified:

1. build Danish from canonical facts using Danish search intent and terminology
2. keep DA non-publishable until all quality gates pass
3. audit/typecheck/rendered SEO QA
4. verify canonical/hreflang/sitemap exposure
5. perform one meaningful final build/checkpoint
6. lock DK
7. repeat independently for FI

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

Last product-code commit included in the SV lock: `e7f38f3001fbfb358a311494e17578b85cc8d286` (`fix: localize Swedish city exonyms in flight SEO`).

## Exact resume action

If resuming after a crash:

**SV Flight Number Localization v1 is LOCKED. Do not rebuild it. Do not rerun FlightAware. Do not start DK yet. Resume with Build / Deployment Cost Optimization, verify the deployment strategy, then begin Danish independently from canonical facts.**
