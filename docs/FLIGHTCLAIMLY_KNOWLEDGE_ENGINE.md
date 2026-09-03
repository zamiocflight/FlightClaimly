# FLIGHTCLAIMLY KNOWLEDGE ENGINE

> **Document type:** Overall Knowledge Engine architecture and philosophy  
> **Last updated:** 2026-09-03  
> **Detailed engine contracts:** `docs/engines/README.md`

## Mission

FlightClaimly does not start with pages. It starts with structured knowledge.

Entities, relationships, facts, sources and rules should exist before a page, FAQ, schema object, claim assessment or AI response is generated from them. The website is one consumer of the knowledge platform; Claims Desk, AI, support, SEO and future APIs are others.

The long-term goal is one reusable knowledge graph for passenger rights and aviation context rather than separate stores of duplicated page content.

## Documentation hierarchy

This file explains the **whole Knowledge Engine family**. It is intentionally not the place for every internal implementation detail.

- `docs/SYSTEM_PROCESS_MAP.md` — entire FlightClaimly system/process map, including transactional Claims Platform.
- `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md` — this file; overall Knowledge Engine architecture/philosophy.
- `docs/FLIGHTCLAIMLY_KNOWLEDGE_MODEL.md` — common Entity / Relationship / Template / Generator concepts.
- `docs/engines/README.md` — engine index and documentation standard.
- `docs/engines/*.md` — developer source-of-truth for each engine's purpose, inputs, outputs, files, consumers and boundaries.
- `docs/CURRENT_SPRINT_LATEST.md` — current work/recovery pointer, not permanent engine documentation.
- `docs/checkpoints/*` — historical verified lock states.

## Core principles

1. **Knowledge before content.** Pages render knowledge; they do not own domain truth.
2. **One authoritative home per fact.** Never duplicate a fact simply because another component needs it.
3. **Stable engine boundaries.** Each engine owns one domain and exposes reusable outputs to downstream consumers.
4. **Resolvers own interpretation.** UI/page code should not recreate domain/business/legal resolution.
5. **Source-backed law.** Legal sources live in Authority Engine; executable legal rules live in Passenger Rights Engine.
6. **Uncertainty is data.** Missing facts must remain unresolved rather than silently becoming `false`.
7. **Claims and public knowledge remain separated.** Raw customer-specific facts never flow directly into public Knowledge Engine registries.
8. **Engines strengthen one another.** New entities/relationships should improve multiple surfaces rather than one isolated page.

## Current engine graph

```text
Airport Engine ─────┐
                    ├→ Route Engine ───────────────┐
Country Engine ─────┘                              │
                                                   ├→ Flight Number Engine
Airline Engine ────────────────────────────────────┘

Delay Reason Engine ───────────────────────────────┐
                                                  │
Authority Engine → Passenger Rights Engine ───────┼→ Claim Rights Assessment Engine
                                                  │
Claim / Precheck / Itinerary facts ───────────────┘

Knowledge entities / relationships
  → templates / metadata / schema / internal links
  → public pages / sitemap / search

Claim Rights Assessment
  → later Claims Desk / demand letters / airline-reply analysis / AI Brain
```

## Engine responsibilities

### Airline Engine

Owns structured airline knowledge and relationships. Public airline pages and downstream aviation engines consume it. It does not own claim-specific entitlement.

Detailed contract: `docs/engines/AIRLINE_ENGINE.md`.

### Airport Engine

Owns canonical airport identity and richer airport knowledge. Canonical airport identity is a foundational validator for Route and Flight Number engines.

Detailed contract: `docs/engines/AIRPORT_ENGINE.md`.

### Country Engine

Owns reusable country/geographic knowledge and relationships. Supplies context used by airports, routes and later legal applicability reasoning.

Detailed contract: `docs/engines/COUNTRY_ENGINE.md`.

### Route Engine

Owns validated origin/destination airport-pair knowledge. Supplies route context to Flight Number, Authority, SEO and later claim assessment.

Detailed contract: `docs/engines/ROUTE_ENGINE.md`.

### Flight Number Engine

Owns the population → seed → validation → build → publication pipeline for specific carrier flight-number entities. Its locked expanded baseline contains 2,841 publishable entities across 44 airlines.

Detailed contract: `docs/engines/FLIGHT_NUMBER_ENGINE.md`.

### Delay Reason Engine

Owns the disruption taxonomy and reason-specific investigation profiles. v1 is locked with 11 reasons, 11 relationships and 11 assessment profiles. It describes what must be investigated; it does not alone decide the legal outcome.

Detailed contract: `docs/engines/DELAY_REASON_ENGINE.md`.

### Authority Engine

Owns verified official legal/authority sources and structured LegalReferences. It is the source-of-authority layer used by legal reasoning and knowledge surfaces.

Detailed contract: `docs/engines/AUTHORITY_ENGINE.md`.

### Passenger Rights Engine

Turns verified authority into structured PassengerRight and LegalRule objects and resolves them against known facts. EU261 Legal Rule Layer v1 is locked with 7 authorities, 18 legal references, 5 rights and 17 rules.

Detailed contract: `docs/engines/PASSENGER_RIGHTS_ENGINE.md`.

### Claim Rights Assessment Engine

The next integration layer. It will combine claim/itinerary, aviation, disruption and legal-rule outputs into one claim-level structured assessment without duplicating rules inside Claims Desk/UI code.

Detailed contract/design: `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`.

## Knowledge vs transactional claims

FlightClaimly has two related but distinct platform domains:

```text
Knowledge Platform
  → canonical reusable entities/rules/sources
  → SEO / public content / AI context

Claims Platform
  → customer-specific claim state/evidence/communications/payout
  → Claim Rights Assessment consumes normalized facts
```

Customer claims may eventually create anonymized operational findings, but those findings may enter reusable knowledge only after validation and removal of customer-specific information.

## Resolver pattern

When an engine needs interpretation rather than simple retrieval, expose a reusable resolver/domain API. Consumers should ask the responsible engine for an answer rather than reimplementing its logic.

Examples now include Authority resolution and Passenger Rights Legal Rule resolution. The Claim Rights Assessment Engine will compose existing engine outputs rather than replacing them.

## Publication model

```text
canonical/master data
  → structured entities + relationships
  → domain/knowledge resolvers
  → SEO metadata / internal links / templates
  → Next.js pages / SSG
  → sitemap / search engines / users
```

Programmatic pages are outputs of structured knowledge. Creating a new URL family is not, by itself, a new engine.

## Engine maintenance rule

Every significant reusable engine must have a file under `docs/engines/`. Update the relevant engine document when its public contract, core flow, ownership boundary, major dependency, audit or lock state changes. Do not churn these files for every small implementation edit.

Before modifying a locked engine, read its engine document and associated checkpoint first.

## Current direction

Delay Reason Engine v1 and EU261 Passenger Rights/Legal Rule Layer v1 are locked green. The next product/growth architecture step is the Claim Rights Assessment Engine, which will connect the aviation/disruption/legal engines to real normalized claim facts before Claims Desk or AI automation is expanded.
