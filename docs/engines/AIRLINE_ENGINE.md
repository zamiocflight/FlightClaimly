# Airline Engine

**Status:** Production knowledge engine.

## Purpose

Own structured airline knowledge used by FlightClaimly's public airline pages and relationship graph. It answers **which airline is this and what reusable airline-specific knowledge do we know?** It must not become the source of claim-specific legal conclusions.

## Core implementation

- `src/data/seo/airlines.ts` — current structured airline knowledge registry.
- `src/app/[locale]/airlines/page.tsx` — airline index presentation.
- `src/app/[locale]/airlines/[slug]/page.tsx` — airline detail presentation.
- shared SEO/knowledge components under `src/components/seo/` and relationship helpers under `src/lib/knowledge/` / `src/lib/seo/` where applicable.

## Inputs

Curated airline metadata and reusable knowledge: names/codes, operating context, editorial knowledge blocks and relationships to other entities.

## Outputs

Airline entities consumable by page templates, internal-link logic, Authority resolution, Route/Flight Number relationships and later claim-intelligence consumers.

## Platform relationships

```text
Airline Engine
  ↔ Airport Engine
  ↔ Route Engine
  ↔ Flight Number Engine
  → Authority Engine / legal applicability context
  → SEO templates / sitemap / internal linking
```

## Boundaries

- Do not hardcode route truth that belongs to Route/Flight Number engines.
- Do not encode source-of-law objects here; use Authority Engine.
- Do not decide compensation entitlement here; that belongs to Passenger Rights + Claim Rights Assessment.
- Airline operational patterns learned from real claims must be anonymized and validated before becoming reusable knowledge.

## Extension rule

Add airline facts once in the airline registry/source layer, then let relationships/templates consume them. Avoid airline-specific exceptions in generic resolvers unless a genuine domain rule requires one.
