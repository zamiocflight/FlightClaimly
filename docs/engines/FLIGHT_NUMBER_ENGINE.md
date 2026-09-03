# Flight Number Engine

**Status:** Production / locked global-scale checkpoint.

## Purpose

Own validated Flight Number entities that connect a carrier flight identifier to trustworthy airport/route context and reusable publication knowledge. It is both a data pipeline and a knowledge engine.

## Core implementation

Data/build layer:

- `src/data/master/flightNumberSeeds.ts`
- `src/data/master/flightNumbers.ts`
- `src/data/flight-numbers/types.ts`
- `src/data/flight-numbers/createFlightNumber.ts`
- `src/data/flight-numbers/buildIdentity.ts`
- `src/data/flight-numbers/buildKnowledge.ts`
- `src/data/flight-numbers/buildSeoCopy.ts`
- `src/data/flight-numbers/publication.ts`
- `src/data/flight-numbers/relationships.ts`

Pipeline scripts:

- `scripts/populate-flight-numbers.ts`
- `scripts/sanitize-flight-number-seeds.ts`
- `scripts/build-flight-numbers.ts`
- `scripts/audit-flight-number-scale.ts`

Public surface:

- `src/app/[locale]/flight-numbers/*`

## Inputs

```text
FlightAware population data
+ canonical Airport Registry
+ airline identity
+ Route knowledge
```

## Pipeline

```text
FlightAware
  → Population Engine
  → Flight Number Seeds
  → sanitizer / validation
  → identity builder
  → route/airport resolution
  → knowledge + SEO builder
  → publication rules
  → generated Flight Number master data
  → SSG pages / airline indexes / internal links
```

The sanitizer/builder must reject inconsistent airline-flight-number identity instead of publishing questionable entities.

## Outputs

Validated publishable Flight Number entities with stable identity, airline and route relationships, knowledge/SEO copy and publication eligibility.

## Consumers

- Flight Number detail pages
- airline Flight Number indexes
- route/internal-link graph
- Authority relationships where applicable
- sitemap/SEO
- future Claim Rights Assessment as a source of itinerary context

## Current locked scale baseline

- 2,894 seeds
- 53 rejected airline/flight-number mismatches
- 2,841 publishable Flight Number entities
- 0 blocked audit entities
- 0 duplicate slugs
- 0 duplicate identities
- 44 represented airlines

Checkpoint: `docs/checkpoints/2026-09-02-flight-number-global-seo-google.md`.

## Boundaries

- FlightAware is an upstream population source, not the canonical legal source.
- Do not bypass Airport/Route validation with flight-specific special cases.
- Do not repopulate completed global cohorts casually; population calls have cost and can destabilize a locked dataset.
- Legal entitlement does not belong here.

## Verification

Use the existing sanitizer/build/audit/typecheck/build pipeline. Any change that alters generated master data should be checkpointed with entity counts and duplicate/blocker status.
