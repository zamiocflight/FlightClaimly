# Localization Engine

Status: **ACTIVE — Wave 1 Swedish Flight Number cohort implemented and build-verified**

Last updated: **2026-09-04**

## Purpose

The Localization Engine reuses canonical Knowledge entities across markets without duplicating or mutating the underlying operational/legal facts.

Localization is **not** mechanical translation. Each locale must use natural market terminology and search intent while preserving factual accuracy and legal meaning.

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
SSG / indexability
```

## Core safety rule

A locale being supported by application routing does **not** make its programmatic Knowledge pages publishable.

Non-reviewed locale content may render as canonical fallback for internal/runtime safety, but fallback content must remain non-publishable and must never be treated as localized SEO content.

## Publication contract

Localization quality is gated independently across:

- metadata review
- terminology review
- legal-meaning review
- content review

Only a localization explicitly marked publishable **and** passing every quality gate may become indexable/hreflang-visible.

Canonical fallback remains `review-required`.

## Rollout waves

- Wave 1: Swedish, Danish, Finnish
- Wave 2: German, Polish, Dutch
- Wave 3: Spanish, French, Italian
- Wave 4: additional European markets according to search demand, economics, legal coverage and operational readiness

Each locale is built from canonical facts independently. Do not translate one secondary locale from another secondary locale.

## Current implementation — Swedish Flight Number cohort

Implemented on branch `seo-localization-engine-v1`.

### Foundation

- locale-neutral Knowledge contracts
- locale registry
- localization publication policy
- resolver with canonical-fallback isolation
- localized metadata + publishable-only hreflang helpers
- Swedish reviewed Knowledge labels
- Swedish Flight Number localization builder
- localization architecture audit

### Swedish Flight Number page integration

The Flight Number detail page now resolves EN/SV content through the Localization Engine.

Swedish coverage includes:

- localized SEO title and description
- localized Hero/H1/CTA
- localized breadcrumbs
- localized fact labels and yes/no values
- localized Knowledge section headings
- localized compensation copy
- localized passenger-rights copy
- localized timeline
- localized claim process
- localized common issues
- localized FAQ and FAQ schema input
- localized internal-link section headings
- localized canonical/hreflang metadata

Shared SEO components were changed to accept locale-specific labels while preserving English defaults for existing entity types.

### Index + airline group integration

Because enabling `sv` for Flight Number SEO also exposes the Flight Number index and airline-group pages through sitemap/static generation, those pages were localized before Swedish indexability was enabled.

This avoids publishing a Swedish detail cohort behind English surrounding navigation/copy.

## Current publishable SEO locale state

Flight Number detail/index/airline-group:

- `en` — publishable
- `sv` — publishable in current branch cohort
- `da` — not yet publishable
- `fi` — not yet publishable

Other programmatic Knowledge entity detail families (routes, airports, airlines, countries, delay reasons) remain on their existing controlled locale exposure. Do not infer Swedish detail readiness for those families from the Flight Number cohort.

## Verification — 2026-09-04

Local verification after Swedish integration:

- `npm run audit:localization` — PASS
- `npm run typecheck` — PASS
- `npm run build` — PASS
- Next.js 15.5.7
- 9,442 / 9,442 static pages generated

Flight Number detail generation visibly includes both EN and SV paths.

Expected scale change:

- 2,841 publishable canonical Flight Number entities
- EN + SV detail cohort = 5,682 Flight Number detail paths
- Flight Number airline groups also generate EN + SV variants
- total production build increased from 6,557 to 9,442 static pages

The rest of Claims/Admin/API routes remained present in the successful production build.

## NOT YET LOCKED

Swedish code/build verification is green, but Wave 1 SV is **not yet declared fully locked** until final rendered-output/SEO visual QA is completed.

Do not start mass DA/FI publication before this QA.

## Exact next steps

1. inspect representative rendered Swedish Flight Number pages
2. inspect page source/metadata for localized title, description, canonical and EN/SV hreflang
3. inspect FAQ/schema output and internal links
4. inspect Swedish Flight Number index and airline-group pages
5. validate sitemap exposure is exactly EN + SV for the Flight Number cohort
6. confirm no half-English Swedish page surfaces remain
7. if green, create SV Wave 1 lock checkpoint
8. then build Danish as its own market/SEO localization from canonical facts
9. repeat for Finnish

Do not simply translate Swedish into Danish/Finnish.

## Branch / recovery state

Current working branch at this checkpoint:

`seo-localization-engine-v1`

Last known remote/local synced product commit before documentation update:

`e1493a9`

Known unrelated local parked user work remains intentionally untouched:

- modified `docs/CLAIMS_DESK.md`
- modified `scripts/test-manual-claim.ts`
- untracked `scripts/create-reijo-claim.ts`

Never commit those files as part of Localization work without separately reviewing/sanitizing them.
