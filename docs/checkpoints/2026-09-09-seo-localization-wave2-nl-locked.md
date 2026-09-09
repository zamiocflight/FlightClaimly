# SEO Localization Wave 2 — NL LOCKED

Date: 2026-09-09

## Scope

Dutch (`nl`) localization for Wave 2 SEO entity pages is complete and locked on branch `seo-localization-wave2-nl`.

Locked foundation inherited from prior Wave 2 locales: EN, SV, DA, PL, DE, FI.

## Lock commits

- Base FI checkpoint commit: `1a70064b3d9df0b49f9d8effab8e17bb18e2d62c`
- NL code lock commit: `30fa7fef626670a4a2fe922258c930f6c4e94702`
- NL checkpoint commit: this document's commit

## Change set

Compared with the FI checkpoint base:

- 29 implementation commits
- 26 changed files
- 0 commits behind base
- Dutch localization added for Routes, Airports, Airlines, Countries and Delay Reasons
- `nl` added to Wave 2 SEO locale alternates/static generation
- Existing Dutch Flight Number localization from Wave 1 preserved

## Validation

### TypeScript

`npm run typecheck` passed.

### Production build

`VERCEL_ENV=production npm run build` passed.

- Compiled successfully
- Type validation passed
- Page-data collection passed
- Static generation: **44,159 / 44,159**

### Sitemap

Local runtime sitemap contains **43,974** `<loc>` entries.

This is the expected NL expansion from the FI lock.

### Route generation

Wave 2 route detail pages now total:

- 3,141 canonical routes
- 7 locales: EN, SV, DA, PL, DE, FI, NL
- **21,987 route-detail paths**

### Canonical + hreflang

Representative route:

`/nl/routes/copenhagen-airport-to-stockholm-arlanda-airport`

Verified:

- self-canonical points to the NL URL
- hreflang contains exactly EN, SV, DA, PL, DE, FI and NL
- NL self-reference present

### Structured data

Representative NL route renders:

- `BreadcrumbList`
- `FAQPage`

### Delay Reason regression

Verified Dutch rendering while preserving canonical classification:

- `bad-weather` → `Slecht weer` + `Kan doorgaans buitengewoon zijn`
- `technical-problems` → `Technische problemen` + `Doorgaans geen buitengewone omstandigheid`

### Entity runtime checks

Verified representative pages:

- Airport: Copenhagen Airport → `Kopenhagen`, `Denemarken`, `Luchthaven`, `IATA-code`
- Airline: Norwegian → `Luchtvaartmaatschappij`, `IATA-code`, `Land`, `Noorwegen`
- Country: Sweden → `Zweden`, `Land`, `Regelgeving`, `Maximale standaardcompensatie`, rendered EU261 wording `EU261 indien van toepassing`
- Reverse route Stockholm → Copenhagen → `Stockholm`, `Kopenhagen`, `Vliegroute`

### Flight Number regression

Existing Wave 1 Dutch Flight Number page `/nl/flight-numbers/a3101` remains localized and functional.

Verified:

- `A3101`
- `vluchtnummer`
- Dutch compensation metadata/content

Flight Number scale remains unchanged:

- 2,841 canonical flight numbers
- 7 locales
- **19,887 detail paths**

### Worktree integrity

- `git diff --check` passed with no output
- `git status --short` clean at code lock
- An accidental local editor rollback of `RelatedRoutes.tsx` was detected before lock and restored exactly from HEAD; no unintended local changes remain
- Original parked Claims/Reijo worktree remains untouched

## Lock decision

**NL is LOCKED.**

Do not modify the Dutch Wave 2 implementation or previously locked locales unless a concrete bug, SEO regression, legal correction or localization defect is identified.

Next market should be selected separately using disruption/delay opportunity, passenger/flight volume and competitive-entry difficulty rather than language size alone.
