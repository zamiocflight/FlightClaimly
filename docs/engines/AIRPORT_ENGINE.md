# Airport Engine

**Status:** Production foundation; canonical identity is shared by multiple engines.

## Purpose

Own airport identity and reusable airport knowledge. The Airport Engine is a foundational dependency because Route and Flight Number entities cannot be trusted unless their origin/destination airports resolve to canonical airport records.

## Core implementation

- `src/data/master/airportRegistry.ts` — canonical/generated airport master registry.
- `src/data/airports.min.json` — airport lookup/support dataset.
- `src/data/seo/airports.ts` — richer public/SEO airport knowledge.
- `scripts/generate-airport-registry.ts` — registry generation.
- `src/app/[locale]/airports/*` — public airport presentation.

## Inputs

Airport source datasets and generated/validated airport identity data.

## Outputs

Canonical airport IDs/codes/names/geography for downstream validation, plus richer airport entities for public knowledge pages.

## Processing model

```text
Airport source data
  → Airport Registry Generator
  → canonical Airport Registry
  → Route / Flight Number validation
  → airport knowledge + SEO relationships
  → public Airport pages / internal linking
```

## Important separation

Canonical **airport identity/master data** and rich **airport SEO knowledge** are related but not the same layer. Downstream engines should depend on canonical identity when validating aviation facts and on richer knowledge only when rendering explanatory/public content.

## Consumers

- Route Engine
- Flight Number Population/Builder
- airline/route relationships
- airport search APIs
- public airport pages
- sitemap/internal linking
- later Claim Rights Assessment through itinerary geography

## Boundaries

Airport Engine does not determine whether a route is legally covered by EU261. It supplies geography/identity facts; Authority/Passenger Rights reasoning determines legal applicability.

## Verification

Changes to canonical airport identity must be treated as high-impact because they can affect route and flight-number generation. Do not patch missing routes with airport-specific hardcoded exceptions; repair the canonical airport identity/source logic instead.
