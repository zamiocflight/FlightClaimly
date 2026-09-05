# SEO Localization Wave 1 — Swedish Flight Number v1 LOCKED

Date: **2026-09-04**
Status: **🟢 LOCKED**
Branch: `seo-localization-engine-v1`
Product-code head verified: `e7f38f3001fbfb358a311494e17578b85cc8d286`

## Scope

This checkpoint locks the Swedish (`sv`) Flight Number Knowledge SEO cohort. It does not lock Swedish localization for routes, airports, airline detail, countries or delay-reason detail families.

Canonical Knowledge facts remain locale-neutral. Swedish is a market-specific localization layer, not a fork of canonical data and not a translation source for future locales.

## Locked Swedish surfaces

- `/sv/flight-numbers`
- `/sv/flight-numbers/[slug]`
- `/sv/flight-numbers/airline/[airlineSlug]`
- Swedish title/meta description
- Hero/H1/CTA
- breadcrumbs
- fact labels / yes-no values
- `Snabbfakta`
- compensation / passenger-rights copy
- timeline / claim process / common issues
- FAQ content path and schema input
- internal-link headings
- controlled Swedish city exonyms
- canonical and publishable-only hreflang
- sitemap exposure

## Legal/regulation profiles verified

Dataset profile distribution at lock:

- EU261-only: 804
- UK261-only: 228
- both: 49
- neither: 1,760
- total: 2,841

Swedish presentation:

- EU-only: €250 / €400 / up to €600; EU261 wording
- UK-only: £220 / £350 / up to £520; UK261 wording
- both: €250 / £220, €400 / £350, up to €600 / £520; EU261 or UK261 wording
- neither: no false fixed currency/amount; `Varierar` and individual assessment / applicable passenger-rights framework

## Rendered QA

Representative pages were inspected for all four profiles:

- EU-only `a3101` — PASS
- UK-only `a33050` — PASS
- both `a3632` — PASS
- neither `a31124` — PASS

Additional rendered QA:

- Swedish Flight Number index — PASS
- Aegean Airlines Swedish Flight Number group — PASS
- `Quick facts` localization corrected to `Snabbfakta` — PASS
- controlled Swedish city exonym display confirmed (`Belgrade` → `Belgrad`) — PASS

## SEO QA

Representative `a31124`:

- Swedish title — PASS
- Swedish meta description — PASS
- canonical `/sv/flight-numbers/a31124` — PASS
- hreflang contains EN + SV and no DA/FI — PASS
- sitemap contains EN + SV and no DA/FI — PASS

## Machine verification

Final commands after all Swedish fixes:

- `npm run audit:localization` — PASS
  - canonical fallback isolation
  - quality gates
  - publishable-only hreflang
  - Swedish Flight Number localization
  - EU261/UK261 compensation profiles
- `npm run typecheck` — PASS
- `npm run build` — PASS

Final production build:

- Next.js 15.5.7
- compile PASS
- type validity PASS
- page-data collection PASS
- **9,442 / 9,442 static pages generated**
- build traces PASS
- page optimization PASS

Flight Number detail generation:

- 2,841 EN
- 2,841 SV
- **5,682 total Flight Number detail paths**

Total SSG grew from **6,557 pre-localization → 9,442 with SV**.

## Lock decision

**Swedish Flight Number Localization v1 is LOCKED.**

Do not modify the locked Swedish cohort except for:

- a concrete defect
- a verified legal/regulatory change
- canonical data correction
- an explicitly planned Swedish v2 localization/SEO pass

Future Danish and Finnish localization must be built independently from canonical facts, never translated from Swedish.

## Active next

Before DK, perform **Build / Deployment Cost Optimization**:

1. inspect Vercel preview-build trigger behavior
2. reduce unnecessary intermediate-commit preview builds where safely possible
3. inspect `generateStaticParams`, `dynamicParams`, sitemap and runtime rendering assumptions
4. evaluate full SSG vs hybrid SSG + ISR/on-demand
5. preserve indexable HTML, metadata, canonical, hreflang, schema and sitemap behavior
6. regression-test locked EN/SV output
7. checkpoint the deployment strategy
8. only then begin DK localization

Do not switch rendering strategy without proving SEO/runtime safety.
