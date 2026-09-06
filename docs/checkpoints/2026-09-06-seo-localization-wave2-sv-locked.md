# SEO Localization Wave 2 — Swedish Locked

**Date:** 2026-09-06  
**Branch:** `seo-localization-wave2-sv`  
**Status:** SV LOCKED

## Scope

Wave 2 Swedish localization covers:

- Routes
- Airports
- Airlines
- Countries
- Delay Reasons

Wave 1 Flight Number localization remains locked and unchanged.

## Publication scope

Wave 2 SEO locales are currently:

- `en`
- `sv`

DA, PL, DE, FI and NL are not yet published for Wave 2.

## Swedish implementation

Swedish localization now covers:

- metadata
- entity display names
- route city names
- country names
- knowledge-page content
- related-route presentation
- internal knowledge links
- delay-reason assessment presentation
- delay-reason component headings and labels
- breadcrumbs
- FAQ schema
- extraordinary-circumstance presentation

Canonical legal/classification data remains separate from Swedish presentation localization.

## Verification

Completed successfully:

- Preview build
- `npm run typecheck`
- `git diff --check`
- representative rendered QA across all five Wave 2 cohorts
- dynamic route fallback verified with HTTP 200
- Swedish route metadata and canonical verified
- Swedish country display name verified
- extraordinary=true delay reason verified
- extraordinary=false delay reason verified
- Swedish BreadcrumbList verified
- Swedish FAQPage schema verified
- DA Flight Number related-link fallback regression preserved
- Wave 2 locale scope verified as EN + SV only

## Sitemap

Wave 2 entity inventory per locale:

- Routes: 3,141
- Airports: 98
- Airlines: 96
- Countries: 36
- Delay Reasons: 11
- Total entities per locale: 3,382

Wave 2 sitemap URLs:

- Entity URLs: 6,764
- Cohort index URLs: 10
- Total Wave 2 URLs: 6,774

Full sitemap arithmetic:

- Static localized URLs: 63
- Wave 2 URLs: 6,774
- Flight Number URLs: 20,202
- Expected total: 27,039
- Actual `/sitemap.xml`: 27,039
- Difference: 0

## Production build

Production build completed successfully with:

- compilation successful
- type validation successful
- page-data collection successful
- 27,249 / 27,249 static pages generated
- build traces successful
- page optimization successful

## Lock decision

Swedish Wave 2 is locked.

Next Wave 2 market: Danish (DA).

Do not reopen Swedish Wave 2 unless a concrete bug, SEO defect, legal issue or localization regression is identified.
