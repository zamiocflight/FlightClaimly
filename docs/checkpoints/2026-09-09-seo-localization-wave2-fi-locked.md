# FlightClaimly — SEO Localization Wave 2 — Finnish LOCKED

Date: **2026-09-09**

Status: **LOCKED**

Branch: `seo-localization-wave2-fi`

Code lock commit:

`6d6ba10db2a65013e9534e31c01b0c65ee54276b`

## Scope

Finnish Wave 2 publishes the coordinated Knowledge package for:

1. Routes
2. Airports
3. Airlines
4. Countries
5. Delay Reasons

Wave 2 publication scope after this lock is exactly:

`EN + SV + DA + PL + DE + FI`

Flight Number publication remains separately locked at:

`EN + SV + DA + PL + DE + FI + NL`

## Architectural result

FI reuses the locked Swedish + Danish + Polish + German Wave 2 architecture rather than recreating it.

The implementation adds Finnish presentation while preserving canonical facts and canonical legal/classification values. Key additions include:

- `src/lib/localization/knowledge-fi.ts`
- `src/lib/localization/delay-reason-fi.ts`
- `src/lib/localization/delay-reason-assessment-fi.ts`
- FI support across Routes, Airports, Airlines, Countries and Delay Reasons
- Finnish metadata, display names, related/internal route presentation and Delay Reason component copy
- Finnish city/country localization for market-native visible presentation
- official airport and airline names preserved where canonical identity should remain unchanged
- Wave 2 SEO locale publication expanded from EN+SV+DA+PL+DE to EN+SV+DA+PL+DE+FI

No FlightAware population rerun was required.

## Git / remote verification

FI was branched from the German checkpoint/documentation head:

`066e61bc3d6ec8a6b2d26233dbba847061f86715`

FI code lock is:

`6d6ba10db2a65013e9534e31c01b0c65ee54276b`

Pre-QA remote compare verified:

- status: ahead
- ahead: 26 commits
- behind: 0 commits
- changed files: exactly 26
- 3 new Finnish localization files
- remaining changes are the expected Wave 2 cohort/component/publication integration

## Build gates

All green:

- `npm run typecheck`
- Production build: **40,777 / 40,777** static pages generated
- `git diff --check`: clean
- final local `git status --short`: clean

The production build retained **18,846** Wave 2 route detail paths across six Wave 2 locales and **19,887** Flight Number detail paths across the seven separately locked Wave 1 locales.

## Runtime QA

Representative Finnish pages were checked locally on the FI branch, including:

- `/fi/routes/copenhagen-airport-to-stockholm-arlanda-airport`
- `/fi/routes/stockholm-arlanda-airport-to-copenhagen-airport`
- `/fi/airports/copenhagen-airport`
- `/fi/airlines/norwegian`
- `/fi/countries/sweden`
- `/fi/delay-reasons/bad-weather`
- `/fi/delay-reasons/technical-problems`
- `/fi/flight-numbers/a3101`

Verified Finnish presentation included:

- `Kööpenhamina`
- `Tukholma`
- `Tanska`
- `Norja`
- `Ruotsi`
- `Lentoreitti`
- `Lentoasema`
- `Lentoyhtiö`
- `Säännöstö`
- `Enimmäiskorvaus`
- `Lentonumero`

## Delay Reason classification regression

Both canonical classification directions were explicitly checked after localization:

- `Huono sää` renders `Voi yleensä olla poikkeuksellinen`
- `Tekniset ongelmat` renders `Ei yleensä ole poikkeuksellinen`

This confirms Finnish presentation did not invert the canonical extraordinary-circumstance classification in the representative regression checks.

## Canonical / hreflang

Representative Finnish route verified:

- canonical points to the matching `/fi/routes/...` URL
- hreflang includes exactly `en`, `sv`, `da`, `pl`, `de`, `fi`
- no `nl` Wave 2 hreflang leakage

## Structured data

Representative FI route page verified to contain:

- `BreadcrumbList`
- `FAQPage`

## Sitemap

Expected Wave 2 increase from DE lock:

- 3,382 FI entity URLs
- 5 FI cohort index URLs
- total FI Wave 2 sitemap increase: **3,387**

DE sitemap baseline: **37,200**

Expected after FI: **40,587**

Actual rendered `/sitemap.xml`: **40,587**

Difference: **0**

## Flight Number regression

Existing Flight Number Wave 1 remains separately published across all seven Wave 1 locales. Representative Finnish Flight Number `/fi/flight-numbers/a3101` rendered `A3101`, `Lentonumero` and FlightClaimly correctly after the FI Wave 2 implementation.

## Worktree safety

The dedicated Wave 2 worktree remains:

`flightclaimly-wave2-sv`

Active branch for this lock:

`seo-localization-wave2-fi`

The original `flightclaimly` worktree with parked Claims/Reijo changes was not touched by this Wave 2 lock process.

Final local `git status --short` before documentation lock was clean.

## Lock decision

Finnish Wave 2 is complete and locked.

Do not reopen FI Wave 2 without a concrete bug, SEO defect, legal issue or localization regression.

## Next market

Market order is now:

`SV LOCKED → DA LOCKED → PL LOCKED → DE LOCKED → FI LOCKED → NL NEXT`

Dutch should reuse the same architecture and lock method. Do not rebuild the locked foundations and do not rerun FlightAware merely for localization.
