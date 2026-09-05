# German Flight Number Localization v1 — LOCKED

Date: **2026-09-05**
Status: **LOCKED**

## Scope

German Flight Number localization is implemented independently from canonical Flight Number facts, not translated from Swedish, Danish or Polish.

German market terminology was validated against authoritative German passenger-rights usage, including EUR-Lex / EU passenger-rights terminology. Customer-facing SEO copy uses `Entschädigung` as the primary term while legal/passenger-rights copy preserves German concepts such as `Fluggastrechte`, `Verspätung`, `Annullierung`, `Ausgleichszahlung` and `außergewöhnliche Umstände` where appropriate.

## Implemented

- German Flight Number localization builder
- German reviewed UI/SEO labels
- controlled German city exonyms
- natural German route and passenger-rights phrasing
- regulation-aware EU261-only, UK261-only, dual, and neither presentation
- German metadata, content, FAQ, process, disruption terminology and no-win-no-fee presentation
- Flight Number detail resolver integration
- German Flight Number index and airline-group copy
- German added to the Flight Number SEO locale cohort
- localization audit extended to German and all four legal/display profiles

## QA / lock evidence

All required gates passed on 2026-09-05:

- Localization Engine architecture audit: PASS
- TypeScript validation: PASS
- Preview build: PASS — **895/895** static pages
- Representative rendered QA:
  - EU261-only: `A3101` — correct EUR presentation; no GBP fixed amounts
  - UK261-only: `A33050` — correct GBP presentation; no EUR fixed amounts
  - EU261 + UK261: `A3632` — dual EUR/GBP presentation
  - neither / neutral rules: `A31124` — no false fixed compensation amounts; neutral `Einzelfallabhängig` / `Zu prüfen`
- German route/city rendering: PASS on `A3101` (`Thessaloniki–Athen`)
- Metadata and canonical: PASS on German Flight Number detail
- hreflang: PASS — exactly the published Flight Number SEO locale cohort `en`, `sv`, `da`, `pl`, `de`
- Preview on-demand fallback: PASS — unsampled German `A31124` returned HTTP **200**
- German Flight Number index: PASS — German title and H1
- German airline-group page: PASS — German title, H1 and CTA
- Sitemap: PASS — **2,886** German Flight Number-cluster URLs
  - 2,841 Flight Number detail URLs
  - 44 airline-group URLs
  - 1 Flight Number index URL
- Full production build: PASS — **18,097/18,097** static pages
- Production Flight Number detail cohort: **14,205** pages = 2,841 canonical Flight Numbers × 5 published SEO locales (`en`, `sv`, `da`, `pl`, `de`)
- Production Flight Number airline-group cohort: **220** pages = 44 airline groups × 5 published SEO locales

## Lock decision

German Flight Number Localization v1 is **LOCKED**.

Do not change German Flight Number localization behavior, legal/display profile mapping, SEO locale publication, compensation presentation, controlled exonyms, route-language strategy or German terminology casually. Any future change must preserve canonical-fact isolation, quality gates, regulation-aware compensation logic, hreflang publication rules, and the validated build/deployment behavior.

## Next localization market

**Finnish Flight Number Localization v1** is next.

Finnish must be built independently from canonical facts using Finnish market search intent, passenger-rights terminology and natural Finnish copy. Do not translate Finnish from Swedish, Danish, Polish or German. Keep Finnish non-publishable until the same quality gates, rendered legal-profile QA, metadata/canonical/hreflang checks, sitemap verification and final production build have passed.

After Finnish: **Dutch Flight Number Localization v1 → Localization Wave 2**.
