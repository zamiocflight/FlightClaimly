# FlightClaimly — SEO Localization Wave 2 — Danish LOCKED

Date: **2026-09-07**

Status: **LOCKED**

Branch: `seo-localization-wave2-da`

Code lock commit:

`558ee8e8d6a848fd9226247eb42ea191b73a8b79`

Commit message at code lock:

`fix: correct Danish airport index wording`

## Scope

Danish Wave 2 publishes the coordinated Knowledge package for:

1. Routes
2. Airports
3. Airlines
4. Countries
5. Delay Reasons

Wave 2 publication scope after this lock is exactly:

`EN + SV + DA`

Flight Number publication remains separately locked at:

`EN + SV + DA + PL + DE + FI + NL`

## Architectural result

DA reuses the Swedish Wave 2 foundation rather than recreating it.

The implementation adds Danish presentation while preserving canonical facts and canonical legal/classification values. Key additions include:

- `src/lib/localization/knowledge-da.ts`
- `src/lib/localization/delay-reason-da.ts`
- `src/lib/localization/delay-reason-assessment-da.ts`
- DA support across Routes, Airports, Airlines, Countries and Delay Reasons
- DA metadata, visible display names, internal/related route presentation and Delay Reason component copy
- Wave 2 SEO locale publication expanded from EN+SV to EN+SV+DA

No FlightAware population rerun was required.

## Git / remote verification

Compared against Swedish documentation head:

`521ce4b29a7e2f8da7bdc4c823d7b17037ed2683`

DA code lock is:

`558ee8e8d6a848fd9226247eb42ea191b73a8b79`

Remote compare result at lock:

- status: ahead
- ahead: 28 commits
- behind: 0 commits
- changed files: 26
- 3 new Danish localization files
- remaining changes are the expected Wave 2 cohort/component/publication integration

## Build gates

All green:

- `npm run typecheck`
- `git diff --check`
- Preview build: **1,561 / 1,561** static pages generated
- Production build: **30,631 / 30,631** static pages generated

The production count matches the expected Swedish baseline plus one full DA Wave 2 market:

`27,249 + 3,382 = 30,631`

## Rendered QA

Representative production-rendered QA passed for all five cohorts.

### Route

`/da/routes/copenhagen-airport-to-stockholm-arlanda-airport`

- H1: `Kompensation for København til Stockholm`
- title: `København til Stockholm flykompensation | FlightClaimly`

Reverse route:

`/da/routes/stockholm-arlanda-airport-to-copenhagen-airport`

- HTTP 200
- H1: `Kompensation for Stockholm til København`
- title: `Stockholm til København flykompensation | FlightClaimly`

### Country

`/da/countries/sweden`

- H1: `Kompensation for Sverige`
- title: `Flykompensation i Sverige | FlightClaimly`

### Airport

`/da/airports/copenhagen-airport`

- H1: `Kompensation for Copenhagen Airport`
- title: `Copenhagen Airport (CPH) flykompensation | FlightClaimly`

The official airport name is intentionally preserved.

### Airline

`/da/airlines/norwegian`

- H1: `Kompensation for Norwegian`
- title: `Norwegian flykompensation | FlightClaimly`

### Delay Reason — extraordinary=false

`/da/delay-reasons/technical-problems`

Verified:

- `Tekniske problemer`
- `Normalt ikke ekstraordinær`
- `FlightClaimlys kravvurdering`
- `Hvad skal undersøges?`
- `Passagerrettigheder efter EU261`
- `Ofte stillede spørgsmål`

### Delay Reason — extraordinary=true

`/da/delay-reasons/bad-weather`

Verified:

- `Dårligt vejr`
- `Ekstraordinær omstændighed`
- `Kan normalt være ekstraordinær`
- `FlightClaimlys kravvurdering`

This verifies both sides of the canonical extraordinary-circumstance classification while keeping localization as presentation rather than legal-source truth.

## Hub QA

All five DA cohort indexes rendered with Danish H1/title:

- Routes: `Flykompensation efter flyrute`
- Airports: `Flykompensation efter lufthavn`
- Airlines: `Flykompensation efter flyselskab`
- Countries: `Flykompensation efter land`
- Delay Reasons: `Årsager til flyforsinkelser og kompensation`

## Canonical / hreflang

Representative DA route verified:

- canonical points to the DA URL
- hreflang includes exactly `en`, `sv`, `da`
- no `pl`, `de`, `fi`, `nl` Wave 2 hreflang leakage

## Structured data

Representative DA Delay Reason page verified to contain:

- `BreadcrumbList`
- `FAQPage`
- Danish entity text: `Tekniske problemer`

## Sitemap

Expected Wave 2 increase from SV lock:

- 3,382 DA entity URLs
- 5 DA cohort index URLs
- total DA Wave 2 sitemap increase: **3,387**

SV sitemap baseline: **27,039**

Expected after DA: **30,426**

Actual rendered `/sitemap.xml`: **30,426**

Difference: **0**

Representative DA route and Delay Reason URLs each appeared exactly once.

## Flight Number regression

Existing DA Flight Number Wave 1 remained intact.

`/da/flight-numbers/a3101`

- HTTP 200
- H1: `Kompensation for A3101`
- title: `Aegean Airlines A3101 flykompensation | FlightClaimly`

## Worktree safety

The dedicated Wave 2 worktree remains:

`flightclaimly-wave2-sv`

Active branch for this lock:

`seo-localization-wave2-da`

The original `flightclaimly` worktree with parked Claims/Reijo changes was not touched by this Wave 2 lock process.

Do not reset, clean or stage those unrelated files from localization work.

## Lock decision

Danish Wave 2 is complete and locked.

Do not reopen DA Wave 2 without a concrete bug, SEO defect, legal issue or localization regression.

## Next market

Market order is now:

`SV LOCKED → DA LOCKED → PL NEXT → DE → FI → NL`

Polish should reuse the same architecture and lock method. Do not rebuild the Swedish/Danish foundations and do not rerun FlightAware merely for localization.
