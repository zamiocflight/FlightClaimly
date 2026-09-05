# Polish Flight Number Localization v1 — LOCKED

Date: **2026-09-05**
Status: **LOCKED**

## Scope

Polish Flight Number localization is implemented independently from canonical Flight Number facts, not translated from Swedish or Danish.

Polish market terminology was validated against Polish passenger-rights usage. The primary legal/SEO term is `odszkodowanie`, with supporting terminology for delayed/cancelled flights, passenger rights and extraordinary circumstances.

## Implemented

- Polish Flight Number localization builder
- Polish reviewed UI/SEO labels
- controlled Polish city exonyms, including `Thessaloniki → Saloniki`
- nominative-safe route phrasing to avoid Polish case-inflection errors
- regulation-aware EU261-only, UK261-only, dual, and neither presentation
- Polish metadata, content, FAQ, process, disruption terminology and no-win-no-fee presentation
- Flight Number detail resolver integration
- Polish Flight Number index and airline-group copy
- Polish added to the Flight Number SEO locale cohort
- localization audit extended to Polish and all four legal/display profiles

## QA / lock evidence

All required gates passed on 2026-09-05:

- Localization Engine architecture audit: PASS
- TypeScript validation: PASS as part of Next.js builds
- Preview build after final exonym fix: PASS — **827/827** static pages
- Representative rendered QA:
  - EU261-only: `A3101` — correct EUR presentation and Polish route copy
  - UK261-only: `A33050` — GBP fixed amounts only; EU261 shown only as factual protection field with `Nie`
  - EU261 + UK261: `A3632` — dual EUR/GBP presentation with Polish conjunction `lub`
  - neither / neutral rules: `A31124` — no false fixed compensation amounts; neutral `Zależy od przypadku` / `Do ustalenia`
- Polish exonym rendered QA: `A3101` displays `na trasie Saloniki–Ateny`
- Metadata and canonical: PASS on Polish Flight Number detail
- hreflang: PASS — `en`, `sv`, `da`, `pl`; unpublished locales excluded
- Preview on-demand fallback: PASS — unsampled Polish `A31124` rendered successfully
- Polish Flight Number index: PASS — Polish title and H1
- Polish airline-group page: PASS — Polish title, H1 and CTA
- Sitemap: PASS — **2,886** Polish Flight Number-cluster URLs
  - 2,841 Flight Number detail URLs
  - 44 airline-group URLs
  - 1 Flight Number index URL
- Localization Engine architecture audit rerun after final rendered QA: PASS
- Full production build: PASS — **15,212/15,212** static pages
- Production Flight Number detail cohort: **11,364** pages = 2,841 canonical Flight Numbers × 4 published SEO locales (`en`, `sv`, `da`, `pl`)
- Production Flight Number airline-group cohort: **176** pages = 44 airline groups × 4 published SEO locales

## Lock decision

Polish Flight Number Localization v1 is **LOCKED**.

Do not change Polish Flight Number localization behavior, legal/display profile mapping, SEO locale publication, compensation presentation, controlled exonyms, or route-language strategy casually. Any future change must preserve canonical-fact isolation, quality gates, regulation-aware compensation logic, hreflang publication rules, and the validated build/deployment behavior.

## Next localization market

**German Flight Number Localization v1** is next.

German must be built independently from canonical facts using German market search intent, passenger-rights terminology and natural German copy. Do not translate German from Swedish, Danish or Polish. Keep German non-publishable until the same quality gates, rendered legal-profile QA, metadata/canonical/hreflang checks, sitemap verification and final production build have passed.
