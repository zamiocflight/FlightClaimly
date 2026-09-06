# SEO Localization Wave 2 — Swedish Locked

**Date:** 2026-09-06  
**Branch:** `seo-localization-wave2-sv`  
**Remote lock commit:** `93e965af7c7f429084a787cc01fe833f6f7e86bb`  
**Status:** SV LOCKED

## Why this checkpoint exists

This is the authoritative crash-recovery record for the Swedish Wave 2 localization work completed on 2026-09-06. A new ChatGPT session should read this file together with `docs/CURRENT_SPRINT_LATEST.md` before touching code.

## Worktree / branch safety

Wave 2 work was intentionally isolated in a separate Git worktree:

- original worktree: `flightclaimly`
- Wave 2 worktree: `flightclaimly-wave2-sv`
- Wave 2 branch: `seo-localization-wave2-sv`

The separate folder is NOT a different repository or fork. It is another worktree pointing at the same FlightClaimly repository/history.

The original worktree contains unrelated parked Claims/Reijo work and must remain untouched while localization work continues:

- `M docs/CLAIMS_DESK.md`
- `M scripts/test-manual-claim.ts`
- `?? scripts/create-reijo-claim.ts`

For continuing Wave 2 DA/PL/DE/FI/NL, stay in `flightclaimly-wave2-sv` unless there is a deliberate branch/worktree restructuring. Do not switch back to the original worktree merely because SV is locked.

## Scope

Wave 2 Swedish localization covers:

- Routes
- Airports
- Airlines
- Countries
- Delay Reasons

Wave 1 Flight Number localization remains locked and unchanged.

## Publication scope at SV lock

Wave 2 SEO locales:

- `en`
- `sv`

DA, PL, DE, FI and NL are not yet published for Wave 2.

Flight Number Wave 1 remains published in:

- EN
- SV
- DA
- PL
- DE
- FI
- NL

## Foundation built during Swedish Wave 2

Swedish was the expensive foundation market, not merely a translation pass. The work generalized the localization architecture needed by the remaining Wave 2 markets.

Implemented/fixed:

- Swedish deterministic localization builders for Routes, Airports, Airlines, Countries and Delay Reasons
- localized entity display names through optional `displayName` support
- localized route city display names, including `Copenhagen` → `Köpenhamn`
- localized country display names, including `Sweden` → `Sverige`
- localized route presentation while preserving canonical route identity/facts
- publication-aware internal Knowledge links
- locale-preserving related-route links
- Swedish Related Routes visible presentation
- Delay Reason metadata localization
- Swedish Delay Reason assessment presentation layer separated from canonical assessment/classification data
- Swedish Delay Reason headings, labels, badges, questions and next-step presentation
- Swedish extraordinary-circumstance true/false presentation
- Swedish BreadcrumbList output
- Swedish FAQPage schema output
- locale publication boundaries and hreflang behavior kept coherent
- sitemap publication arithmetic verified
- dynamic route fallback behavior verified

### Key implementation files changed for final SV lock

- `src/app/[locale]/delay-reasons/[slug]/page.tsx`
- `src/components/seo/RelatedRoutes.tsx`
- `src/components/seo/delay-reasons/ClaimAssessment.tsx`
- `src/components/seo/delay-reasons/CompensationRules.tsx`
- `src/components/seo/delay-reasons/DelayReasonKnowledgeTemplate.tsx`
- `src/components/seo/delay-reasons/DelayReasonOverview.tsx`
- `src/components/seo/delay-reasons/ExtraordinaryCircumstances.tsx`
- `src/components/seo/delay-reasons/FAQ.tsx`
- `src/components/seo/delay-reasons/PassengerRights.tsx`
- `src/components/seo/delay-reasons/RelatedKnowledge.tsx`
- `src/components/seo/delay-reasons/Statistics.tsx`
- `src/components/seo/delay-reasons/Timeline.tsx`
- `src/data/entities/registry.ts`
- `src/lib/delay-reasons/metadata.ts`
- `src/lib/localization/delay-reason-assessment-sv.ts`
- `src/lib/localization/entity.ts`
- `src/lib/localization/knowledge-sv.ts`
- `src/lib/localization/types.ts`
- `src/lib/seo/relationships.ts`

## Important architectural invariants

- canonical Knowledge facts remain locale-neutral
- localized display/presentation must not fork canonical facts
- legal/classification values remain canonical; localization changes textual presentation only
- missing publication support must fall back according to publication policy rather than leak a wrong locale
- Flight Number Wave 1 remains locked and should not be reopened for ordinary Wave 2 work
- no FlightAware population rerun is needed for localization
- do not hardcode one-off route/country special cases where a generic localization layer can solve the issue

## Representative rendered QA completed

### Five Swedish hubs

Verified Swedish H1s for:

- `/sv/routes`
- `/sv/airports`
- `/sv/airlines`
- `/sv/countries`
- `/sv/delay-reasons`

### Route QA

Representative route:

`/sv/routes/copenhagen-airport-to-stockholm-arlanda-airport`

Verified rendered Swedish presentation including:

- `Ersättning för Köpenhamn till Stockholm`
- Swedish body copy
- `Köpenhamn → Stockholm`
- Related Routes in Swedish presentation
- no visible `Copenhagen to Stockholm` leak in tested output

Unsampled/dynamic route test:

`/sv/routes/stockholm-arlanda-airport-to-copenhagen-airport`

Result:

- HTTP 200
- Swedish H1
- Swedish title
- correct Swedish canonical

### Country QA

Representative country:

`/sv/countries/sweden`

Verified:

- `Ersättning för Sverige`
- Swedish metadata/title presentation
- no tested visible `Sweden` leak

### Delay Reason QA

`technical-problems` extraordinary=false path verified with Swedish presentation including:

- `Tekniska problem`
- `Översikt`
- `Extraordinär omständighet`
- `Normalt inte extraordinär`
- `FlightClaimlys kravbedömning`
- `Vad behöver utredas?`
- `Underlag att verifiera`
- `Frågor till flygbolaget`
- `Signaler som bör granskas närmare`
- `Nästa steg`
- `Passagerarrättigheter enligt EU261`
- `Ersättningsregler`
- `Fakta`
- `Så bedöms ärendet`
- `Vanliga frågor`
- `Relaterad kunskap`

`bad-weather` extraordinary=true path verified with Swedish presentation including:

- `Dåligt väder`
- `Extraordinär omständighet`
- `Kan normalt vara extraordinär`

### Schema QA

Representative Swedish route schema verified:

- `BreadcrumbList`
- Swedish breadcrumb names
- `FAQPage`
- Swedish FAQ questions/answers

## Static param / publication scope verification

Wave 2 `generateStaticParams()` cohorts use their dedicated SEO locale lists:

- `routeSeoLocales`
- `airportSeoLocales`
- `airlineSeoLocales`
- `countrySeoLocales`
- `delayReasonSeoLocales`

At SV lock each is exactly:

`["en", "sv"]`

No accidental DA/PL/DE/FI/NL Wave 2 publication was introduced.

## Sitemap verification

Entity inventory per locale:

- Routes: 3,141
- Airports: 98
- Airlines: 96
- Countries: 36
- Delay Reasons: 11
- Total Wave 2 entities per locale: 3,382

Wave 2 sitemap URLs:

- entity URLs: 6,764
- cohort index URLs: 10
- Wave 2 total: 6,774

Full sitemap arithmetic at SV lock:

- static localized URLs: 63
- Wave 2 URLs: 6,774
- Flight Number URLs: 20,202
- expected sitemap total: 27,039
- actual `/sitemap.xml`: 27,039
- difference: 0

## Build / quality gates

Completed successfully on exact lock source:

- Preview build green: 1,296 / 1,296 static pages
- `npm run typecheck` green
- `git diff --check` green
- rendered representative QA green
- dynamic/unsampled route QA green
- sitemap arithmetic green
- production build green

Production build result:

- compiled successfully
- type validation successful
- page-data collection successful
- **27,249 / 27,249 static pages generated**
- build traces successful
- final page optimization successful

## Git / lock history

Local lock commit was initially created as `26f88ab`, then rebased because the remote Wave 2 branch had advanced to `df688c8` (`docs: add exact new-chat resume protocol`).

The rebase completed without conflict.

Final pushed remote branch head after rebase:

`93e965af7c7f429084a787cc01fe833f6f7e86bb`

Commit message:

`Lock Swedish SEO localization Wave 2`

Do not force-push this branch.

## Lock decision

**Swedish Wave 2 is LOCKED.**

Do not reopen Swedish Wave 2 unless a concrete bug, SEO defect, legal issue or localization regression is identified.

## Next exact execution

Next market: **Danish (DA)**.

Continue in the Wave 2 worktree/branch lineage. The Danish pass should reuse the generic architecture created during SV rather than rebuild it.

Expected sequence:

1. inspect current branch/code after pulling any documentation-only remote updates
2. create/adapt Danish localization presentation for all five Wave 2 cohorts
3. preserve canonical facts/legal meaning
4. extend Wave 2 publication locale lists from EN+SV to include DA only when DA quality gates are satisfied
5. verify metadata, visible presentation, internal links, canonical/hreflang and schemas
6. verify sitemap arithmetic
7. run typecheck / diff check
8. run optimized Preview + representative and unsampled rendered QA
9. stop Preview
10. run one meaningful production build
11. checkpoint + lock DA
12. continue PL → DE → FI → NL

The remaining languages should be materially faster than Swedish because the generic Wave 2 localization plumbing, display-name support, Delay Reason localization separation, publication-aware linking and QA/lock method now exist. They are still not zero-work translation passes: each market needs terminology, SEO/legal meaning, rendered QA, sitemap and build validation.
