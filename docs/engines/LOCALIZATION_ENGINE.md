# Localization Engine

Status: **ACTIVE — Wave 1 Swedish Flight Number Localization v1 LOCKED; deployment optimization next**

Last updated: **2026-09-04**

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

Application routing support does not make a programmatic Knowledge locale publishable. Canonical fallback may render for runtime safety, but fallback remains `review-required` and non-publishable.

Publication requires all independent quality gates to pass:

- metadata review
- terminology review
- legal-meaning review
- content review

Only explicitly publishable localization that passes every gate may become indexable/hreflang-visible.

## Rollout waves

- Wave 1: Swedish, Danish, Finnish
- Wave 2: German, Polish, Dutch
- Wave 3: Spanish, French, Italian
- Wave 4: additional European markets by search demand, economics, legal coverage and operational readiness

Each locale is built independently from canonical facts. Never translate one secondary locale from another.

## Swedish Flight Number Localization v1 — LOCKED 2026-09-04

Implemented on branch `seo-localization-engine-v1`.

### Locked surfaces

- Flight Number detail pages
- Flight Number index
- Flight Number airline-group pages
- localized SEO title/description
- Hero/H1/CTA
- breadcrumbs
- fact labels and yes/no values
- `Snabbfakta`
- Knowledge section headings
- compensation and passenger-rights sections
- timeline / claim process / common issues
- FAQ presentation and FAQ schema input
- internal-link section headings
- canonical/hreflang metadata
- controlled Swedish city exonyms

### Regulation-aware Swedish output

Swedish Flight Number content is derived from canonical route/regulation facts and handles four profiles:

- EU261-only: EUR 250 / 400 / up to 600
- UK261-only: GBP 220 / 350 / up to 520
- both: dual EUR/GBP values and EU261/UK261 wording
- neither: no assumed fixed compensation; neutral passenger-rights and individual-assessment wording

This prevents false EU261 assumptions on UK-only or non-covered routes.

## Current publishable Flight Number SEO locales

- `en` — publishable
- `sv` — publishable / LOCKED
- `da` — not yet publishable
- `fi` — not yet publishable

Other Knowledge entity detail families remain separately controlled. Swedish Flight Number lock does not imply Swedish route/airport/airline/country/delay-reason detail readiness.

## Final Swedish verification

Completed 2026-09-04:

- representative EU-only rendered page — PASS
- representative UK-only rendered page — PASS
- representative both-regimes rendered page — PASS
- representative neither-regime rendered page — PASS
- Swedish Flight Number index — PASS
- Swedish airline-group page — PASS
- title/meta/canonical — PASS
- hreflang EN + SV only on tested detail — PASS
- sitemap EN + SV only on tested detail — PASS
- `npm run audit:localization` — PASS
- `npm run typecheck` — PASS
- final `npm run build` — PASS
- Next.js 15.5.7
- **9,442 / 9,442 static pages generated**

Scale at lock:

- 2,841 canonical publishable Flight Numbers
- 2,841 EN detail pages
- 2,841 SV detail pages
- 5,682 total Flight Number detail paths
- 44 airline groups with EN/SV variants
- total SSG: 6,557 pre-SV → 9,442 post-SV

Authoritative lock checkpoint:

`docs/checkpoints/2026-09-04-seo-localization-wave1-sv-locked.md`

## Next before Danish — Build / Deployment Cost Optimization

The next locale must not be activated before reviewing build/deployment scaling. The current full SSG model generates 9,442 pages and will grow materially with every locale.

Review:

1. Vercel preview-build triggers and intermediate-commit waste
2. `generateStaticParams` / `dynamicParams` behavior
3. sitemap and publishable-locale coupling
4. full SSG versus hybrid SSG + ISR/on-demand
5. preservation of SEO HTML, metadata, canonical, hreflang and schema
6. smallest safe optimization
7. EN/SV regression verification
8. deployment-strategy checkpoint

Do not adopt ISR blindly. Prove arbitrary valid slug rendering and SEO correctness first.

## Danish/Finnish rule

After deployment optimization is verified, build Danish directly from canonical facts using Danish search behavior/terminology. Keep DA non-publishable until its own gates, audit, rendered QA, metadata/hreflang/sitemap verification and checkpoint pass. Then repeat independently for FI.

## Branch / recovery

Branch: `seo-localization-engine-v1`

Last product-code commit included in SV lock: `e7f38f3001fbfb358a311494e17578b85cc8d286`.

Known unrelated local Claims/Reijo files remain parked and must not be mixed into Localization work:

- `docs/CLAIMS_DESK.md`
- `scripts/test-manual-claim.ts`
- `scripts/create-reijo-claim.ts`
