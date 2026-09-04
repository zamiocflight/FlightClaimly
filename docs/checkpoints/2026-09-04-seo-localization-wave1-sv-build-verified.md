# Checkpoint — SEO Localization Wave 1 / Swedish Flight Numbers build-verified

Date: **2026-09-04**

Status: **🟢 architecture/audit/typecheck/build verified; final rendered-output QA still pending before lock**

## Why this checkpoint exists

This file is the crash-recovery pointer for the SEO Localization Engine work completed after Research / Evidence Engine v1 was locked.

If a session is lost, do **not** restart localization architecture from scratch. The Swedish Flight Number cohort is already implemented and verified through a full production build.

## Branch

`seo-localization-engine-v1`

Product code was locally synced through commit:

`e1493a9`

Documentation commits follow this checkpoint.

## Canonical architecture

```text
Canonical Knowledge Entity
        ↓
Locale Content Layer
        ↓
locale-specific SEO/search-intent copy
        ↓
quality gates
        ↓
publishable locale variants only
        ↓
metadata / canonical / hreflang / sitemap / internal links
        ↓
SSG
```

Localization is market-specific SEO localization, not word-for-word translation.

Canonical facts stay shared. Each locale derives wording independently from those facts so terminology/search intent can be correct per market without changing legal meaning.

## Implemented foundation

Files under `src/lib/localization/` now provide:

- localization types/contracts
- locale registry
- rollout/publication policy
- localization resolver
- canonical-fallback isolation
- publishable-only SEO helpers
- reviewed Swedish Knowledge labels
- Swedish Flight Number localization builder
- export surface for the Localization Engine

`npm run audit:localization` verifies canonical fallback isolation, quality gates, publishable-only hreflang and the Swedish builder.

## Implemented Swedish Flight Number integration

The actual programmatic Flight Number surfaces were integrated end-to-end rather than merely enabling `sv` in the locale list.

Updated areas include:

- `src/app/[locale]/flight-numbers/[slug]/page.tsx`
- `src/app/[locale]/flight-numbers/page.tsx`
- `src/app/[locale]/flight-numbers/airline/[airlineSlug]/page.tsx`
- `src/components/seo/Hero.tsx`
- `src/components/seo/KnowledgePageTemplate.tsx`
- `src/components/seo/ClaimProcess.tsx`
- `src/components/seo/CommonIssues.tsx`
- `src/components/seo/FAQ.tsx`
- `src/lib/seo/internalLinks.ts`
- `src/lib/seo/alternates.ts`

The important safety decision was to **not** expose `sv` while shared page/template/index surfaces were still English-only. Those surrounding surfaces were localized first.

## Swedish Flight Number coverage

Swedish pages now receive localized:

- metadata title/description
- Hero/H1/CTA
- breadcrumbs
- fact labels
- yes/no values
- Knowledge section headings
- compensation sections
- passenger-rights sections
- timeline
- claim process
- common issues
- FAQ content/presentation
- internal-link section headings
- canonical/hreflang behavior
- Flight Number index copy
- airline-group page copy

## Publication state

For Flight Number SEO:

- EN = publishable
- SV = enabled/publishable cohort
- DA = still blocked/not publishable
- FI = still blocked/not publishable

Do not infer that routes/airports/airlines/countries/delay-reason detail pages are Swedish-ready. Their detail cohorts remain independently controlled.

## Verification results

### Localization audit

Command:

`npm run audit:localization`

Result:

`PASS — canonical fallback isolation, quality gates, publishable-only hreflang and the Swedish flight-number localization builder behave as expected.`

### TypeScript

Command:

`npm run typecheck`

Result: PASS, no errors.

### Full production build

Command:

`npm run build`

Environment: Next.js 15.5.7

Result:

- compiled successfully
- type validity PASS
- page-data collection PASS
- static generation PASS
- **9,442 / 9,442** static pages generated

### Scale confirmation

Previous secured baseline before SV Flight Number publication:

- 6,557 static pages

After Swedish Flight Number cohort:

- 9,442 static pages

The build output explicitly showed both:

- `/en/flight-numbers/a3101`
- `/sv/flight-numbers/a3101`

and +5,679 additional paths under the Flight Number detail route, consistent with 2,841 EN + 2,841 SV detail pages.

Airline Flight Number group pages also showed EN/SV variants.

Route detail pages remained EN-only in this build, which is intentional at this stage.

Admin, Claims Desk and Claims/API routes remained present in the successful build.

## Current local working-tree safety state

After the successful 9,442-page build, local status was:

```text
## seo-localization-engine-v1...origin/seo-localization-engine-v1
 M docs/CLAIMS_DESK.md
 M scripts/test-manual-claim.ts
?? scripts/create-reijo-claim.ts
```

These are unrelated parked Claims/Reijo changes and must remain untouched by Localization work.

Never use `git add .`, `git reset --hard`, `git clean` or force-push around this state.

## Exact next action after recovery

Do **not** start Danish/Finnish generation yet.

First complete final Swedish rendered-output QA:

1. inspect representative Swedish Flight Number detail pages in the running app
2. confirm natural Swedish copy and absence of unintended English page chrome/content
3. confirm title/description/canonical/hreflang in rendered metadata/page source
4. confirm FAQ/schema uses localized FAQ
5. inspect localized internal links and targets
6. inspect `/sv/flight-numbers`
7. inspect at least one `/sv/flight-numbers/airline/[airlineSlug]`
8. validate sitemap exposure is exactly intended
9. if all green, mark Swedish Flight Number Wave 1 cohort LOCKED

Only after that:

- implement Danish independently from canonical Knowledge using Danish SEO/search terminology
- audit/typecheck/build/visual QA
- then Finnish independently using Finnish SEO/search terminology

## Translation rule

Never use:

`EN → SV → DA/FI`

Use:

```text
Canonical facts → Swedish market intent/copy
Canonical facts → Danish market intent/copy
Canonical facts → Finnish market intent/copy
```

Search intent and terminology are market-specific. Legal/factual meaning is invariant.
