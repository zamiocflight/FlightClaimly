# Finnish Flight Number Localization v1 — LOCKED

Date: **2026-09-05**
Status: **LOCKED**
Branch: `seo-localization-engine-v1`

## Purpose

This checkpoint is the authoritative crash-recovery record for Finnish Flight Number Localization v1. It records what was built, the method used, the QA sequence, the issue found during QA and how it was diagnosed/fixed, and the final production evidence required before lock.

If a later session is lost, do not reconstruct Finnish localization from memory. Read this checkpoint together with `docs/CURRENT_SPRINT_LATEST.md` and `docs/engines/LOCALIZATION_ENGINE.md`.

## Locked architecture and method

Finnish was built independently from canonical Flight Number facts. It was **not** translated from Swedish, Danish, Polish or German.

Locked model:

```text
Canonical Flight Number facts
        ↓
Finnish market research / terminology
        ↓
Finnish localization builder
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

Canonical facts remain locale-neutral. Localization controls Finnish search intent, copy, labels, controlled city names and regulation-aware presentation without forking the underlying Flight Number entity.

No FlightAware population rerun was required.

## Authoritative terminology research

Finnish terminology was researched from authoritative public sources before implementation rather than mechanically translating another FlightClaimly locale.

Primary sources used:

1. Your Europe Finnish air-passenger-rights guidance:
   `https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_fi.htm`
2. Official Finnish EUR-Lex text of Regulation (EC) No 261/2004:
   `https://eur-lex.europa.eu/legal-content/fi/TXT/?uri=CELEX%3A32004R0261`
3. Your Europe Finnish air-passenger-rights FAQ:
   `https://europa.eu/youreurope/citizens/travel/passenger-rights/air/faq/indexamp_fi.htm`

Research established customer/legal vocabulary including `Lentomatkustajien oikeudet`, `korvaus`, `lento on peruuntunut`, `lento on viivästynyt`, `lennolle pääsy on evätty`, `poikkeukselliset olosuhteet`, `rahallinen korvaus`, `Oikeus korvaukseen` and the EU261 €250 / €400 / €600 compensation structure.

FlightClaimly uses natural customer-facing Finnish with `korvaus` as the primary SEO/customer term while preserving the official passenger-rights meaning.

## Implementation coverage

Finnish Flight Number v1 covers:

- Flight Number detail pages
- Flight Number index
- Flight Number airline-group pages
- Finnish metadata
- Finnish hero/H1/CTA and fact labels
- FAQ and claim-process copy
- regulation-aware compensation presentation
- controlled Finnish city names where appropriate
- canonical/hreflang publication
- sitemap exposure
- localization architecture audit coverage

Key implementation files:

- `src/lib/localization/flight-number-fi.ts`
- `src/lib/localization/locales.ts`
- `src/lib/localization/index.ts`
- `src/lib/seo/alternates.ts`
- `src/app/[locale]/flight-numbers/[slug]/page.tsx`
- `src/app/[locale]/flight-numbers/page.tsx`
- `src/app/[locale]/flight-numbers/airline/[airlineSlug]/page.tsx`
- `scripts/audit-localization-engine.ts`

## Controlled Finnish city names

The Finnish builder uses a conservative controlled map rather than blindly translating every city. Examples include:

- Athens → Ateena
- Brussels → Bryssel
- Bucharest → Bukarest
- Cairo → Kairo
- Copenhagen → Kööpenhamina
- Florence → Firenze
- Lisbon → Lissabon
- Milan → Milano
- Moscow → Moskova
- Munich → München
- Naples → Napoli
- Prague → Praha
- Rome → Rooma
- Seville → Sevilla
- Venice → Venetsia
- Vienna → Wien
- Warsaw → Varsova
- Zurich → Zürich

Names outside the controlled map retain the canonical name when that is the safer/natural choice.

## Regulation-aware compensation profiles

Rendered behavior was explicitly tested for four canonical legal/display profiles. The localization must never imply a fixed statutory amount where the canonical facts do not support one.

### EU-only

- €250
- €400
- up to €600
- no fixed UK pound amounts

### UK-only

- £220
- £350
- up to £520
- no fixed EU euro amounts

### EU261 + UK261

Both frameworks may be presented:

- €250 / £220
- €400 / £350
- up to €600 / £520

### Neither / unresolved framework

No false fixed euro or pound compensation amounts. Presentation remains case-specific, including Finnish concepts equivalent to `Tapauskohtainen`, `Yksilöllinen` and `Selvitettävä`.

## QA and debugging chronology

### 1. Localization architecture audit — initial failure investigated

The first Finnish audit attempt exposed a **test-fixture isolation problem**, not a Finnish production localization failure. The test mixed canonical entity `sk1421` with a Finnish localization built from `publishableFlightNumbers[0]`. Because the resolver correctly isolates localization to its canonical entity, FI was correctly excluded from hreflang for the mismatched fixture.

The audit was fixed to test Finnish localization against the matching canonical entity. The production isolation rule was not weakened.

Final audit result:

```text
PASS — canonical fallback isolation, quality gates, publishable-only hreflang, Swedish, Danish, Polish, German and Finnish flight-number localization and EU261/UK261 compensation profiles behave as expected.
```

This is important recovery context: if a similar hreflang/audit failure appears later, verify entity/localization fixture identity before changing resolver isolation.

### 2. TypeScript validation

Command:

```bash
npx tsc --noEmit
```

Result: **PASS** with no TypeScript errors.

### 3. Preview build

Preview build completed successfully:

```text
✓ Compiled successfully
✓ Checking validity of types
✓ Collecting page data
✓ Generating static pages (963/963)
✓ Collecting build traces
✓ Finalizing page optimization
```

Result: **963 / 963** Preview static pages.

### 4. Rendered compensation-profile QA

Representative pages were rendered and visible text inspected after stripping Next.js script payloads.

Test entities:

- EU-only: `A3101` — PASS
- UK-only: `A33050` — PASS
- EU261 + UK261: `A3632` — PASS
- neither/unresolved: `A31124` — PASS

The EU-only page contained euro amounts and no fixed pound amounts. The UK-only page contained pound amounts and no fixed euro amounts. The dual page contained both. The neither page used case-specific/unresolved language without false fixed amounts.

### 5. Finnish heading/grammar QA

Rendered H1/H2/H3 output was inspected directly for `A3101`.

Important verified heading:

```text
Lentomatkustajien oikeudet EU261:n nojalla
```

This resolved the pre-QA concern that a shared string composition could produce unnatural Finnish word order. The rendered production path uses natural Finnish wording, so no grammar workaround was required.

Other rendered headings included natural Finnish FlightClaimly terminology for compensation, quick facts, claim eligibility, claim process, disruption scenarios and FAQ.

### 6. Metadata / canonical / hreflang QA

Representative detail page:

`/fi/flight-numbers/a3101`

Verified:

- title: `Aegean Airlines A3101 lentokorvaus | FlightClaimly`
- Finnish description
- canonical: `https://www.flightclaimly.com/fi/flight-numbers/a3101`
- alternate locales: `en`, `sv`, `da`, `pl`, `de`, `fi`

Debugging note: the first shell grep looked for lowercase `hreflang` and returned nothing. Raw Next.js HTML renders the attribute as `hrefLang`. A case-insensitive/raw inspection confirmed all six alternate links were present. This was a QA-command issue, not missing hreflang output.

### 7. Unsampled Preview fallback

Unsampled representative page:

`/fi/flight-numbers/a31124`

HTTP result: **200**.

This confirms the locked Preview optimization still allows valid unsampled Flight Number entities to render on demand while production remains full SSG.

### 8. Finnish Flight Number index

Rendered `/fi/flight-numbers` verified Finnish market copy including:

- `Lentonumerot ja korvaukset`
- H1 `Lentokorvaus lentonumeron mukaan`
- CTA `Näytä lentonumerot`
- title `Lentokorvaus lentonumeron mukaan | FlightClaimly`

Result: **PASS**.

### 9. Finnish airline-group page

Rendered Aegean Airlines group page verified:

- `Kaikki lentonumerot`
- H1 `Aegean Airlines lentonumerot ja lentokorvaukset`
- CTA `Tarkista korvaus`
- title `Aegean Airlines lentonumerot | Lentokorvaus | FlightClaimly`

Result: **PASS**.

### 10. Sitemap

Finnish Flight Number sitemap cluster count:

**2,886 URLs**

Exact composition:

- 2,841 Flight Number detail URLs
- 44 airline-group URLs
- 1 Flight Number index URL

Result: **PASS**.

### 11. Final production build

Preview server was stopped before the final production build.

Command:

```bash
npm run build
```

Final evidence:

```text
✓ Compiled successfully in 8.9s
✓ Checking validity of types
✓ Collecting page data
✓ Generating static pages (20982/20982)
✓ Collecting build traces
✓ Finalizing page optimization
```

Result: **20,982 / 20,982** static pages.

Production cohort evidence:

- Flight Number detail paths: **17,046 = 2,841 × 6 published SEO locales**
- Flight Number airline-group paths: **264 = 44 × 6 published SEO locales**
- production total increased from post-DE **18,097** to post-FI **20,982**, a net increase of **2,885** pages

The difference between the 2,886-locale sitemap cluster and +2,885 net full-build growth is expected from the broader shared/index build arithmetic. Actual build output is authoritative.

## Final locked quality gate

Finnish Flight Number Localization v1 passed:

- canonical-fact isolation — PASS
- authoritative Finnish terminology research — PASS
- localization quality flags — PASS
- architecture audit — PASS
- TypeScript — PASS
- Preview build — PASS
- EU-only profile — PASS
- UK-only profile — PASS
- EU+UK profile — PASS
- neither/unresolved profile — PASS
- rendered Finnish grammar/headings — PASS
- metadata — PASS
- canonical — PASS
- hreflang — PASS
- unsampled Preview fallback — PASS
- Flight Number index — PASS
- airline-group page — PASS
- sitemap exact count — PASS
- full production build — PASS

## LOCK decision

**Finnish Flight Number Localization v1 is LOCKED as of 2026-09-05.**

Do not reopen FI v1 without one of:

- a concrete bug
- a legal/regulatory change
- evidence of materially wrong Finnish market terminology/search intent
- an explicit planned v2 localization pass

Do not casually refactor locked Finnish behavior while implementing Dutch.

## Resume position after this lock

Wave 1 state:

```text
SV LOCKED → DA LOCKED → PL LOCKED → DE LOCKED → FI LOCKED → NL ACTIVE NEXT
```

Dutch is the **last Flight Number market in the currently locked Wave 1 plan**. After Dutch Flight Number Localization v1 passes the same quality gates and is locked, begin Localization Wave 2 market by market across:

- Routes
- Airports
- Airlines
- Countries
- Delay Reasons

Wave 2 restarts with Swedish, then Danish, Polish, German, Finnish and Dutch unless an explicit evidence-backed planning decision changes priority.

## Safety / parked local work

Unrelated Claims/Reijo local work remains outside this localization lock. Preserve it and do not mix it into localization commits.

Known parked work at this checkpoint:

```text
 M docs/CLAIMS_DESK.md
 M scripts/test-manual-claim.ts
?? scripts/create-reijo-claim.ts
```

Do not use destructive Git cleanup. Do not commit customer PII helper scripts. Do not use `git add .`.
