# FlightClaimly Architecture

Status: v1  
Last Updated: 2026-07-03

---

# Core Principle

FlightClaimly does not build pages.

FlightClaimly builds knowledge.

Pages are generated from structured knowledge, reusable chapters, relationships and templates.

---

# Architecture Overview

Knowledge Data

↓

Entity Registry

↓

Relationship Graph

↓

SEO Engine

↓

Knowledge Chapters

↓

Pages

↓

Growth

---

# Main Layers

## 1. Knowledge Data

Location:

`src/data/seo/`

Contains structured content for entities such as airlines.

Current implementation:

- `airlines.ts`
- `shared/types.ts`

---

## 2. Entity Registry

Location:

`src/data/entities/`

Contains canonical information about real-world entities.

Current implementation:

- `airports.ts`

Purpose:

One source of truth for entity facts such as airport name, IATA code, city and country.

---

## 3. Relationship Graph

Location:

`src/data/knowledge/relationships.ts`

Purpose:

Defines how entities are connected.

Example:

Norwegian → Norway → Oslo Airport → EU261 → Flight Delay Compensation

The system stores relationships, not manual links.

---

## 4. SEO Engine

Location:

`src/lib/seo/`

Current files:

- `metadata.ts`
- `relationships.ts`

Purpose:

Transforms structured knowledge into SEO outputs such as:

- metadata
- canonical URLs
- OpenGraph
- related knowledge links

---

## 5. Knowledge Chapters

Location:

`src/components/seo/`

Current chapters:

- Hero
- QuickFacts
- Overview
- CompensationAmounts
- PassengerRights
- CompensationRules
- Statistics
- Timeline
- ClaimProcess
- CommonIssues
- FAQ
- FAQSchema
- BreadcrumbSchema
- RelatedKnowledge
- RelatedAirlines

Purpose:

Reusable content blocks that can be combined into templates.

---

# Airline Knowledge Engine v1

Status: LOCKED

The first complete implementation is the Airline Knowledge Engine.

It supports:

- structured airline data
- metadata generation
- schema
- reusable knowledge chapters
- related airline links
- related knowledge links
- relationship-based internal linking

This is the foundation for future engines.

---

# Next Engines

## Sprint 2

- Airport Engine
- Country Engine
- Route Engine

These should reuse the existing architecture instead of creating separate systems.

---

# Rules

1. Knowledge lives in `src/data`.
2. Logic lives in `src/lib`.
3. UI lives in `src/components`.
4. Pages compose existing knowledge, logic and UI.
5. Do not duplicate knowledge.
6. Do not hardcode relationships inside UI.
7. Build reusable chapters before scaling pages.
8. SEO is an output of the Knowledge Engine, not the source.

---

# Long-Term Goal

FlightClaimly should become Europe's most complete knowledge platform for passenger rights.

The website is one interface.

Search engines are another.

AI is another.

Support is another.

Future products are another.

Everything starts from the same knowledge foundation.