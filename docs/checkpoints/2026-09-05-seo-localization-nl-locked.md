# Dutch Flight Number Localization v1 — LOCKED

Date: **2026-09-05**
Status: **LOCKED**
Branch: `seo-localization-engine-v1`

## Purpose

This checkpoint is the authoritative crash-recovery record for Dutch Flight Number Localization v1 and the completion of Flight Number Localization Wave 1.

Read this checkpoint together with `docs/CURRENT_SPRINT_LATEST.md` and `docs/engines/LOCALIZATION_ENGINE.md`. Do not reconstruct NL from conversation memory after a session loss.

## Locked architecture and method

Dutch was built independently from canonical Flight Number facts. It was **not** translated from Swedish, Danish, Polish, German or Finnish.

```text
Canonical Flight Number facts
        ↓
Dutch market research / terminology
        ↓
Dutch localization builder
        ↓
quality gates
        ↓
SEO publication / hreflang / sitemap
        ↓
rendered Preview QA
        ↓
full production build
        ↓
LOCK
```

Canonical facts remain locale-neutral. Localization controls Dutch search intent, copy, labels, controlled city names and regulation-aware presentation without forking the underlying Flight Number entity.

No FlightAware population rerun was required.

## Authoritative terminology research

Dutch terminology was researched from authoritative public sources before implementation.

Primary sources:

1. Your Europe Dutch air-passenger-rights guidance:
   `https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_nl.htm`
2. Official Dutch EUR-Lex text of Regulation (EC) No 261/2004:
   `https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX%3A32004R0261`

Research established official/customer vocabulary including `Rechten van vliegtuigpassagiers`, `Annulering van uw vlucht`, `Vertraging`, `schadevergoeding`, `eindbestemming`, `buitengewone omstandigheden` and `luchtvaartmaatschappij`.

Locked terminology decision: use `vluchtcompensatie` for natural SEO/customer-facing metadata where appropriate, while legal/body copy primarily uses `schadevergoeding` / `compensatie` and preserves official passenger-rights meaning.

## Implementation coverage

Dutch Flight Number v1 covers:

- Flight Number detail pages
- Flight Number index
- Flight Number airline-group pages
- Dutch metadata
- Dutch hero/H1/CTA and fact labels
- FAQ and claim-process copy
- regulation-aware compensation presentation
- controlled Dutch city names
- canonical/hreflang publication
- sitemap exposure
- localization architecture audit coverage

Key implementation files:

- `src/lib/localization/flight-number-nl.ts`
- `src/lib/localization/locales.ts`
- `src/lib/localization/index.ts`
- `src/lib/seo/alternates.ts`
- `src/app/[locale]/flight-numbers/[slug]/page.tsx`
- `src/app/[locale]/flight-numbers/page.tsx`
- `src/app/[locale]/flight-numbers/airline/[airlineSlug]/page.tsx`
- `scripts/audit-localization-engine.ts`

## Controlled Dutch city names

The builder uses a conservative controlled map. Verified/implemented examples include:

- Athens → Athene
- Brussels → Brussel
- Bucharest → Boekarest
- Cologne → Keulen
- Copenhagen → Kopenhagen
- Florence → Florence
- Lisbon → Lissabon
- Milan → Milaan
- Moscow → Moskou
- Munich → München
- Naples → Napels
- Prague → Praag
- Rome → Rome
- Seville → Sevilla
- Thessaloniki → Thessaloniki
- Venice → Venetië
- Vienna → Wenen
- Warsaw → Warschau
- Zurich → Zürich

Names outside the controlled map retain the canonical form when that is safer/natural.

Rendered metadata for A3101 verified `Thessaloniki–Athene`.

## Regulation-aware compensation profiles

Four canonical legal/display profiles were explicitly rendered and inspected.

### EU-only — A3101

Verified:

- H1 `Compensatie voor vlucht A3101`
- €250 / €400 / €600
- heading `Passagiersrechten onder EU261`
- no UK fixed amounts
- title `Aegean Airlines A3101 vluchtcompensatie | FlightClaimly`

### UK-only — A33050

Verified:

- £220 / £350 / £520
- heading `Passagiersrechten onder UK261`
- no EU fixed amounts
- Dutch title

### EU261 + UK261 — A3632

Verified both amount structures:

- €250 / £220
- €400 / £350
- €600 / £520
- heading `Passagiersrechten onder EU261 of UK261`

### Neither / unresolved — A31124

Verified neutral/case-specific behavior:

- `Passagiersrechten voor vlucht A31124`
- `Per geval te beoordelen`
- `Te bepalen`
- no fixed €250 / €400 / €600 or £220 / £350 / £520 leakage

This is a locked safety invariant: localization must not invent fixed statutory compensation where canonical facts do not support a framework.

## QA chronology and evidence

### 1. Localization architecture audit

Command:

```bash
npx tsx scripts/audit-localization-engine.ts
```

Final result:

```text
PASS — canonical fallback isolation, quality gates, publishable-only hreflang, Swedish, Danish, Polish, German, Finnish and Dutch flight-number localization and EU261/UK261 compensation profiles behave as expected.
```

### 2. TypeScript validation

```bash
npx tsc --noEmit
```

Result: **PASS**, no output/errors.

### 3. Preview build

```bash
VERCEL_ENV=preview npm run build
```

Result: **1,031 / 1,031** static pages.

Preview Flight Number arithmetic:

- detail sample: **168 = 24 × 7 locales**
- airline groups: **308 = 44 × 7 locales**

### 4. Rendered profile QA

All four profiles listed above passed after stripping Next.js script payloads from visible-text inspection.

### 5. Metadata / canonical / hreflang

Representative detail page: `/nl/flight-numbers/a3101`.

Verified:

- title: `Aegean Airlines A3101 vluchtcompensatie | FlightClaimly`
- description: Dutch compensation copy for delay/cancellation, route `Thessaloniki–Athene`, EU261
- canonical: `https://www.flightclaimly.com/nl/flight-numbers/a3101`
- alternate locales: `en`, `sv`, `da`, `pl`, `de`, `fi`, `nl`

Next.js rendered alternate attributes as `hrefLang`; do not misdiagnose a lowercase-grep miss as missing hreflang.

### 6. Unsampled Preview fallback

`/nl/flight-numbers/a31124` returned HTTP **200** although it was outside the deterministic 24-entity Preview sample.

This confirms the locked Preview optimization still supports valid unsampled Flight Number pages on demand while production remains full SSG.

### 7. Dutch Flight Number index

Rendered `/nl/flight-numbers` verified:

- H1 `Vluchtcompensatie op vluchtnummer`
- Dutch number formatting: `2.841`
- Dutch `vluchtnummers` copy/CTAs

Result: **PASS**.

### 8. Dutch airline-group page

Rendered Aegean Airlines group page verified:

- H1 `Aegean Airlines vluchtnummers en vluchtcompensatie`
- Dutch passenger-rights body copy
- CTA `Controleer compensatie`

Result: **PASS**.

### 9. Sitemap

Dutch Flight Number sitemap cluster: **2,886 URLs**.

Exact composition:

- 2,841 Flight Number detail URLs
- 44 airline-group URLs
- 1 Flight Number index URL

Preview sitemap uses runtime origin `http://localhost:3000`; an initial grep for the production hostname returned zero and was correctly diagnosed as a QA-command/origin mismatch, not a sitemap defect. Rechecking against the Preview runtime origin returned exactly **2,886**.

### 10. Final production build

Preview server was stopped before the final production build.

Command:

```bash
VERCEL_ENV=production npm run build
```

Final evidence:

```text
✓ Compiled successfully in 8.6s
✓ Checking validity of types
✓ Collecting page data
✓ Generating static pages (23867/23867)
✓ Collecting build traces
✓ Finalizing page optimization
```

Result: **23,867 / 23,867** static pages.

Production cohort evidence:

- Flight Number detail paths: **19,887 = 2,841 × 7 published SEO locales**
- Flight Number airline-group paths: **308 = 44 × 7 published SEO locales**
- production total increased from post-FI **20,982** to post-NL **23,867**, a net increase of **2,885** pages

As in preceding locales, the per-locale sitemap cluster is 2,886 while net full-build growth is 2,885 because of broader shared/index build arithmetic. Actual build output is authoritative.

## Final locked quality gate

Dutch Flight Number Localization v1 passed:

- canonical-fact isolation — PASS
- authoritative Dutch terminology research — PASS
- localization quality flags — PASS
- architecture audit — PASS
- TypeScript — PASS
- Preview build — PASS
- EU-only profile — PASS
- UK-only profile — PASS
- EU+UK profile — PASS
- neither/unresolved profile — PASS
- rendered Dutch grammar/headings — PASS
- controlled city-name rendering — PASS
- metadata — PASS
- canonical — PASS
- hreflang — PASS
- unsampled Preview fallback — PASS
- Flight Number index — PASS
- airline-group page — PASS
- sitemap exact count — PASS
- full production build — PASS

## LOCK decision

**Dutch Flight Number Localization v1 is LOCKED as of 2026-09-05.**

Do not reopen NL v1 without a concrete bug, legal/regulatory change, evidence of materially wrong Dutch market terminology/search intent, or an explicit planned v2 localization pass.

## Wave 1 completion

Flight Number Localization Wave 1 is now complete:

```text
SV LOCKED → DA LOCKED → PL LOCKED → DE LOCKED → FI LOCKED → NL LOCKED
```

Published Flight Number SEO locales are now:

- EN
- SV
- DA
- PL
- DE
- FI
- NL

## Resume position after this lock — Wave 2

**ACTIVE NEXT: Localization Wave 2**, market by market across the coordinated Knowledge cohort package:

- Routes
- Airports
- Airlines
- Countries
- Delay Reasons

Locked default market order:

```text
SV → DA → PL → DE → FI → NL
```

Start with Swedish unless an explicit evidence-backed planning decision changes priority.

For each market package validate canonical-fact isolation, local search intent, terminology, metadata, internal linking, canonical/hreflang, sitemap exposure, representative rendered pages and production behavior before lock.

Flight Number publication does not automatically make another Knowledge cohort publishable.

## Safety / parked local work

Unrelated Claims/Reijo local work remains outside this localization lock. Preserve it and do not mix it into localization commits.

Known parked work:

```text
 M docs/CLAIMS_DESK.md
 M scripts/test-manual-claim.ts
?? scripts/create-reijo-claim.ts
```

Do not use destructive Git cleanup. Do not commit customer PII helper scripts. Do not use `git add .`.
