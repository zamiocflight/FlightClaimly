# FlightClaimly — SEO Localization Wave 2 — Polish LOCKED

Date: **2026-09-07**

Status: **LOCKED**

Branch: `seo-localization-wave2-pl`

Code lock commit:

`205ead3d0b62a930e6141dfce71fc84af5e016c5`

Commit message at code lock:

`fix: expand Polish city localization`

## Scope

Polish Wave 2 publishes the coordinated Knowledge package for:

1. Routes
2. Airports
3. Airlines
4. Countries
5. Delay Reasons

Wave 2 publication scope after this lock is exactly:

`EN + SV + DA + PL`

Flight Number publication remains separately locked at:

`EN + SV + DA + PL + DE + FI + NL`

## Architectural result

PL reuses the locked Swedish + Danish Wave 2 architecture rather than recreating it.

The implementation adds Polish presentation while preserving canonical facts and canonical legal/classification values. Key additions include:

- `src/lib/localization/knowledge-pl.ts`
- `src/lib/localization/delay-reason-pl.ts`
- `src/lib/localization/delay-reason-assessment-pl.ts`
- PL support across Routes, Airports, Airlines, Countries and Delay Reasons
- Polish metadata, display names, related/internal route presentation and Delay Reason component copy
- Polish city/country exonym mapping for market-native visible presentation
- official airport and airline names preserved where canonical identity should remain unchanged
- Wave 2 SEO locale publication expanded from EN+SV+DA to EN+SV+DA+PL

No FlightAware population rerun was required.

## Git / remote verification

Compared against Danish documentation head:

`47e1a579ef498b493f5415394f6acdb949a9b1a9`

PL code lock is:

`205ead3d0b62a930e6141dfce71fc84af5e016c5`

Remote compare result at lock:

- status: ahead
- ahead: 27 commits
- behind: 0 commits
- changed files: 26
- 3 new Polish localization files
- remaining changes are the expected Wave 2 cohort/component/publication integration

## Build gates

All green:

- `npm run typecheck`
- `git diff --check`
- Preview build: **1,826 / 1,826** static pages generated
- Production build: **34,013 / 34,013** static pages generated

The production count matches the Danish baseline plus one full PL Wave 2 market:

`30,631 + 3,382 = 34,013`

After the final city-exonym source-map correction, typecheck + diff-check were rerun and remained green. A second full 34k-page production rebuild was intentionally not repeated for that isolated presentation-map correction; rendered development QA verified the corrected output directly.

## Rendered QA

### Route

`/pl/routes/copenhagen-airport-to-stockholm-arlanda-airport`

- H1: `Odszkodowanie za lot Kopenhaga – Sztokholm`
- title: `Kopenhaga – Sztokholm: odszkodowanie za lot | FlightClaimly`

This specifically verifies Polish city exonyms after the final correction.

Reverse route:

`/pl/routes/stockholm-arlanda-airport-to-copenhagen-airport`

- HTTP 200

### Country

`/pl/countries/sweden`

- H1: `Odszkodowanie za lot Szwecja`
- title: `Szwecja: odszkodowanie za lot | FlightClaimly`

### Airport

`/pl/airports/copenhagen-airport`

- H1: `Odszkodowanie za lot Copenhagen Airport`
- title: `Copenhagen Airport (CPH) – odszkodowanie za lot | FlightClaimly`

The official airport name is intentionally preserved.

### Airline

`/pl/airlines/norwegian`

- H1: `Odszkodowanie za lot Norwegian`
- title: `Norwegian – odszkodowanie za lot | FlightClaimly`

### Delay Reason — extraordinary=false

`/pl/delay-reasons/technical-problems`

Verified:

- `Problemy techniczne`
- `Ocena roszczenia FlightClaimly`
- `Co należy sprawdzić?`
- `Prawa pasażerów na podstawie EU261`
- `Najczęściej zadawane pytania`

### Delay Reason — extraordinary=true

`/pl/delay-reasons/bad-weather`

Verified:

- `Złe warunki pogodowe`
- `Zwykle może stanowić nadzwyczajną okoliczność`

This verifies both sides of the canonical extraordinary-circumstance classification while keeping localization as presentation rather than legal-source truth.

## Hub QA

All five PL cohort indexes rendered with Polish H1/title:

- Routes: `Odszkodowanie za lot według trasy`
- Airports: `Odszkodowanie za lot według lotniska`
- Airlines: `Odszkodowanie za lot według linii lotniczej`
- Countries: `Odszkodowanie za lot według kraju`
- Delay Reasons: `Przyczyny opóźnień lotów i odszkodowanie`

## Canonical / hreflang

Representative PL route verified:

- canonical points to the PL URL
- hreflang includes exactly `en`, `sv`, `da`, `pl`
- no `de`, `fi`, `nl` Wave 2 hreflang leakage

## Structured data

Representative PL Delay Reason page verified to contain:

- `BreadcrumbList`
- `FAQPage`

## Sitemap

Expected Wave 2 increase from DA lock:

- 3,382 PL entity URLs
- 5 PL cohort index URLs
- total PL Wave 2 sitemap increase: **3,387**

DA sitemap baseline: **30,426**

Expected after PL: **33,813**

Actual rendered `/sitemap.xml`: **33,813**

Difference: **0**

## Flight Number regression

Existing PL Flight Number Wave 1 remained intact.

Runtime-publishable example:

`/pl/flight-numbers/a3101`

- HTTP 200

The publishable runtime catalog was used to select the regression target rather than relying on a seed-only record.

## Worktree safety

The dedicated Wave 2 worktree remains:

`flightclaimly-wave2-sv`

Active branch for this lock:

`seo-localization-wave2-pl`

The original `flightclaimly` worktree with parked Claims/Reijo changes was not touched by this Wave 2 lock process.

Final local `git status --short` before documentation lock was clean.

## Lock decision

Polish Wave 2 is complete and locked.

Do not reopen PL Wave 2 without a concrete bug, SEO defect, legal issue or localization regression.

## Next market

Market order is now:

`SV LOCKED → DA LOCKED → PL LOCKED → DE NEXT → FI → NL`

German should reuse the same architecture and lock method. Do not rebuild the Swedish/Danish/Polish foundations and do not rerun FlightAware merely for localization.
