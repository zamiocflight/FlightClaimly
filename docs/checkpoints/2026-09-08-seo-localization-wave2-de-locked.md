# FlightClaimly — SEO Localization Wave 2 — German LOCKED

Date: **2026-09-08**

Status: **LOCKED**

Branch: `seo-localization-wave2-de`

Code lock commit:

`7022310e79fdd01415e0eb982e1ba9106f25b4c0`

## Scope

German Wave 2 publishes the coordinated Knowledge package for:

1. Routes
2. Airports
3. Airlines
4. Countries
5. Delay Reasons

Wave 2 publication scope after this lock is exactly:

`EN + SV + DA + PL + DE`

Flight Number publication remains separately locked at:

`EN + SV + DA + PL + DE + FI + NL`

## Architectural result

DE reuses the locked Swedish + Danish + Polish Wave 2 architecture rather than recreating it.

The implementation adds German presentation while preserving canonical facts and canonical legal/classification values. Key additions include:

- `src/lib/localization/knowledge-de.ts`
- `src/lib/localization/delay-reason-de.ts`
- `src/lib/localization/delay-reason-assessment-de.ts`
- DE support across Routes, Airports, Airlines, Countries and Delay Reasons
- German metadata, display names, related/internal route presentation and Delay Reason component copy
- German city/country localization for market-native visible presentation
- official airport and airline names preserved where canonical identity should remain unchanged
- Wave 2 SEO locale publication expanded from EN+SV+DA+PL to EN+SV+DA+PL+DE

No FlightAware population rerun was required.

## Git / remote verification

Compared against Polish documentation head:

`1a3f30c0f81a1cd0774f0ae6f113d7c2bb3556cd`

DE code lock is:

`7022310e79fdd01415e0eb982e1ba9106f25b4c0`

Remote compare result at lock:

- status: ahead
- ahead: 27 commits
- behind: 0 commits
- changed files: exactly 26
- 3 new German localization files
- remaining changes are the expected Wave 2 cohort/component/publication integration

## Build gates

All green:

- `npm run typecheck`
- Production build: **37,395 / 37,395** static pages generated
- final local `git status --short`: clean

## Rendered QA

Representative German Wave 2 pages were rendered locally and visually checked, including:

- `/de/routes/copenhagen-airport-to-stockholm-arlanda-airport`
- `/de/airports/copenhagen-airport`
- `/de/airlines/norwegian`
- `/de/countries/sweden`
- `/de/delay-reasons/technical-problems`

The Delay Reason template was specifically audited after an initial mixed-language UI issue was detected. German labels were wired across the shared Delay Reason components and the corrected page was rechecked against the locked Polish layout. PL and DE layouts were confirmed identical while German visible copy rendered correctly.

Representative corrected German Delay Reason copy includes:

- `Technische Probleme`
- `Überblick`
- `Außergewöhnlicher Umstand`
- `Gilt normalerweise NICHT als außergewöhnlich`
- `FLIGHTCLAIMLY ANSPRUCHSPRÜFUNG`
- `Was muss geprüft werden?`
- `Entschädigung bleibt häufig möglich`

## Canonical / hreflang

Representative German route verified:

- canonical DE URL verified on representative DE content
- hreflang includes exactly `en`, `sv`, `da`, `pl`, `de`
- no `fi` or `nl` Wave 2 hreflang leakage

## Structured data

Representative DE Delay Reason page verified to contain:

- `BreadcrumbList`
- `FAQPage`

## Sitemap

Expected Wave 2 increase from PL lock:

- 3,382 DE entity URLs
- 5 DE cohort index URLs
- total DE Wave 2 sitemap increase: **3,387**

PL sitemap baseline: **33,813**

Expected after DE: **37,200**

Actual rendered `/sitemap.xml`: **37,200**

Difference: **0**

## Flight Number regression

Existing Flight Number Wave 1 remains separately published across all seven Wave 1 locales. The production build retained the full Flight Number detail generation cohort while DE Wave 2 was added.

## Worktree safety

The dedicated Wave 2 worktree remains:

`flightclaimly-wave2-sv`

Active branch for this lock:

`seo-localization-wave2-de`

The original `flightclaimly` worktree with parked Claims/Reijo changes was not touched by this Wave 2 lock process.

Final local `git status --short` before documentation lock was clean.

## Lock decision

German Wave 2 is complete and locked.

Do not reopen DE Wave 2 without a concrete bug, SEO defect, legal issue or localization regression.

## Next market

Market order is now:

`SV LOCKED → DA LOCKED → PL LOCKED → DE LOCKED → FI NEXT → NL`

Finnish should reuse the same architecture and lock method. Do not rebuild the Swedish/Danish/Polish/German foundations and do not rerun FlightAware merely for localization.
