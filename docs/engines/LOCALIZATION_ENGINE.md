# Localization Engine

Status: **ACTIVE — Flight Number Wave 1 LOCKED/RELEASED; coordinated Knowledge Wave 2 NEXT**

Last updated: **2026-09-06**

## Purpose

The Localization Engine reuses canonical Knowledge entities across markets without duplicating or mutating underlying operational/legal facts. Localization is not mechanical translation: every locale uses market-specific search intent, terminology and copy while preserving factual accuracy and legal meaning.

```text
Canonical Knowledge Entity
        ↓
Locale Content Layer
        ↓
localized metadata / copy / labels / CTA
        ↓
quality gates
        ↓
canonical + hreflang + sitemap + internal links
        ↓
publishable SEO output
```

## Core safety / publication contract

Application routing support does not make a programmatic Knowledge locale publishable. Canonical fallback may render for runtime safety, but fallback remains review-required and non-publishable.

Publication requires independent quality gates for metadata, terminology, legal meaning and content. Only explicitly publishable localization that passes every required gate may become indexable/hreflang-visible.

Each locale is built independently from canonical facts. Never translate one secondary locale from another.

## Flight Number Localization Wave 1 — COMPLETE / LOCKED / RELEASED

Locked market order and completion:

```text
SV → DA → PL → DE → FI → NL
```

Published Flight Number SEO locales are now:

- EN
- SV
- DA
- PL
- DE
- FI
- NL

Final locked scale:

- 2,841 canonical publishable Flight Numbers
- 19,887 Flight Number detail paths = 2,841 × 7
- 44 represented airlines
- 308 Flight Number airline-group paths = 44 × 7
- 2,886 sitemap URLs per localized Flight Number market
- final full production build: 23,867 / 23,867 static pages

The final Wave 1 market checkpoint is `docs/checkpoints/2026-09-05-seo-localization-nl-locked.md`.

The Google handoff/resume checkpoint is `docs/checkpoints/2026-09-06-wave1-google-handoff-wave2-resume.md`.

Do not reopen locked Flight Number v1 markets without a concrete defect, legal/regulatory change, evidence of materially wrong terminology/search intent, or an explicit v2 plan.

## Google handoff

After production verification, the sitemap was submitted/resubmitted in Google Search Console and representative strategic URLs/hubs were manually requested for indexing. German initially encountered a transient request failure and later succeeded; Finnish also succeeded.

Normal large-scale discovery must now happen through sitemap/crawling. Do not manually request indexing for thousands of programmatic pages and do not block Wave 2 while waiting for full indexation/ranking.

Legacy Search Console duplicate/canonical/404/redirect/discovered-not-indexed/crawled-not-indexed cohorts are a later audit lane and must be checked against current production before code changes because Search Console can lag.

## ACTIVE — Localization Wave 2

Wave 2 extends localization beyond Flight Numbers. It is organized **market by market**, with five Knowledge families treated as one coordinated package per market:

- Routes
- Airports
- Airlines
- Countries
- Delay Reasons

Execution order:

```text
SV ACTIVE NEXT → DA → PL → DE → FI → NL
```

Flight Number publication does not imply readiness for any of these five cohorts.

### Required Wave 2 method

For each market:

1. inspect canonical data and current page architecture for all five cohorts
2. establish market terminology/search intent from authoritative/local evidence where needed
3. build localized content directly from canonical facts
4. preserve legal/factual invariants and canonical-fact isolation
5. enforce publication quality gates
6. verify metadata/search intent
7. verify internal linking across all five localized families
8. verify canonical + publishable-only hreflang
9. verify sitemap exposure and exact expected arithmetic
10. run localization architecture audit and TypeScript validation
11. run optimized Preview and representative rendered QA
12. test unsampled Preview rendering where relevant
13. stop Preview before final production build
14. run one meaningful full production build
15. write a market lock checkpoint before advancing

Do not rerun FlightAware merely for localization.

## Build/deployment strategy remains locked

Production retains full SSG for publishable programmatic cohorts. Preview uses the previously locked deterministic sampling/on-demand strategy to control build cost. Vercel docs-only skip behavior remains in force.

Do not move production to ISR/on-demand without a separate evidence-backed architecture decision and equivalent SEO/runtime verification.

## Planned phase after Wave 2

After Wave 2, run a dedicated premium UX/design/conversion review across the public website and complete claim journey, desktop + mobile. Keep this separate from localization unless a real blocker requires overlap.

The review should cover visual hierarchy, typography, spacing, trust signals, CTAs, form/progress UX, validation, loading/error/success states, responsive behavior, useful microinteractions, copy reassurance, Knowledge-to-claim consistency and conversion instrumentation.

## Later monitoring/cleanup

- Google Search Console index-quality cleanup after the new release has had time to process
- analytics hygiene for internal/admin/automated test traffic
- ongoing indexation/ranking monitoring by cohort and market

## Branch / recovery

Working branch: `seo-localization-engine-v1`.

Authoritative immediate recovery pointer: `docs/CURRENT_SPRINT_LATEST.md`.

Known unrelated local Claims/Reijo files remain parked and must not be mixed into Localization work:

- `docs/CLAIMS_DESK.md`
- `scripts/test-manual-claim.ts`
- `scripts/create-reijo-claim.ts`
