# Country Engine

**Status:** Production knowledge layer.

## Purpose

Own reusable country knowledge and geographic relationships used by airport, route, authority and public knowledge surfaces. It answers **which country is this entity associated with and what reusable country context do we expose?**

## Core implementation

- `src/data/seo/countries.ts` — current structured country knowledge.
- `src/app/[locale]/countries/*` — public country pages.
- relationship and SEO helpers under `src/lib/knowledge/` and `src/lib/seo/` where applicable.

## Inputs

Curated country entities and geography relationships from airport/route data.

## Outputs

Country entities and IDs used by Airport/Route relationships, public pages, internal linking and legal-regime context.

## Relationships

```text
Airport → Country
Route → origin/destination Country
Country → Authority context
Country → public knowledge / SEO
```

## Boundaries

Country Engine supplies geography and reusable country knowledge. It must not itself decide legal entitlement. EU261/UK261 applicability belongs in Authority + Passenger Rights reasoning using country/territory/carrier facts.

## Extension rule

Add country facts centrally and reference them by stable IDs. Avoid duplicating jurisdiction rules inside country editorial data.
