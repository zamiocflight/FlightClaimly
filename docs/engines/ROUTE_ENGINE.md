# Route Engine

**Status:** Production knowledge engine.

## Purpose

Own validated airport-pair route knowledge. A Route is not merely a URL; it is a reusable relationship between canonical origin and destination airports that can be consumed by Flight Number, Authority, SEO and later claim assessment.

## Core implementation

- `src/data/seo/routes.ts` — current structured route knowledge.
- canonical airport input from `src/data/master/airportRegistry.ts`.
- `src/app/[locale]/routes/*` — route index/detail presentation.
- route relationship/SEO helpers under `src/lib/knowledge/` and `src/lib/seo/` where applicable.

## Inputs

Canonical origin/destination airport identities and reusable geography/airline relationships.

## Outputs

Stable Route entities containing/deriving origin, destination and relationship context for public pages, Flight Number construction and legal applicability resolution.

## Processing model

```text
Airport Registry
  → valid origin + destination identity
  → Route entity
  → Route relationships
  → Flight Number context / Authority context / SEO
  → route page + internal links
```

## Consumers

- Flight Number Engine
- Authority resolver
- public route pages
- sitemap/internal links
- future Claim Rights Assessment for itinerary/legal-regime facts

## Boundaries

- Route Engine does not invent flight schedules.
- Flight-number identity belongs to Flight Number Engine.
- EU261 entitlement does not belong to Route Engine; it supplies the geographic facts used by legal reasoning.
- Avoid N² route generation. Publish routes supported by actual/validated knowledge rather than every theoretical airport pair.

## Extension rule

Fix bad route identity through canonical airport/route data. Do not add one-off route exceptions to compensate for broken upstream airport identity.
