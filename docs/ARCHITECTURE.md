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
# FlightClaimly Architecture

## Vision

FlightClaimly is not built as a traditional website.

It is built as a scalable knowledge platform where every SEO page is generated from reusable engines and structured data.

The long-term goal is to become Europe's largest knowledge library for passenger rights and flight compensation.

---

# Core Principles

1. Build engines before content.
2. Every new engine must be reusable.
3. Every entity has one source of truth.
4. Prefer generators over manually written pages.
5. Content should be data-driven whenever possible.

---

# Layer Architecture

Pages

↓

Components

↓

lib/

↓

data/

Pages should never contain business logic.

Components render UI.

lib contains reusable engines.

data contains structured knowledge only.

---

# Core Engines

## Metadata Engine

Responsible for:

- titles
- descriptions
- canonical URLs
- OpenGraph

Used by:

- Airline Engine
- Airport Engine

Entry point:

src/lib/seo/metadata.ts

Status:

LOCKED ✅

---

## Knowledge Page Template

Reusable page template for all knowledge pages.

Responsible for rendering:

- Hero
- Quick Facts
- Overview
- Passenger Rights
- Compensation
- Statistics
- Timeline
- Claim Process
- FAQ

Used by:

- Airline Engine
- Airport Engine

Future:

- Country Engine
- Route Engine

Status:

LOCKED ✅

---

## Internal Linking Engine

Responsible for:

- Related guides
- Related airports
- Related airlines
- Related laws

Entry point:

src/lib/seo/relationships.ts

Powered by:

Entity Registry

Status:

LOCKED ✅

---

## Relationship Engine

Defines relationships between entities.

Examples:

Airline

↓

Airport

↓

Country

↓

Law

↓

Guide

Entry point:

src/data/knowledge/relationships.ts

Status:

LOCKED ✅

---

## Entity Registry

Single source of truth.

Responsible for:

- slug
- entity type
- display name
- canonical URL

Everything should query the registry.

Nothing should duplicate entity information.

Entry points:

src/data/entities/registry.ts

src/lib/entities.ts

Status:

LOCKED ✅

---

# Data Generators

## Airline Generator

Creates airline knowledge pages.

Entry point:

src/data/seo/airlines.ts

Status:

LOCKED ✅

---

## Airport Generator

Creates airport knowledge pages from AirportSeed objects.

Pattern:

AirportSeed

↓

createAirport()

↓

Airport

↓

Knowledge Page

Entry point:

src/data/seo/airports.ts

Status:

ACTIVE

---

# Current Engines

✅ Airline Engine

✅ Airport Engine

🚧 Country Engine

⬜ Route Engine

⬜ Alliance Engine

---

# Knowledge Graph

Relationships currently supported:

- airline
- airport
- country
- route
- alliance
- hub
- law
- article

Future entity types should extend the registry rather than introducing special-case logic.

---

# Development Workflow

Always work in sprints.

One sprint.

One objective.

One commit per checkpoint.

Build first.

Populate afterwards.

Never mix architecture work with content work.

---

# Current Philosophy

We no longer build pages.

We build engines.

The engines generate pages.

The content feeds the engines.
# Architecture Decisions

## Why Entity Registry exists

Avoid duplicated knowledge.

Only the registry knows:

- entity name
- entity type
- canonical URL

Every other engine queries the registry.

---

## Why KnowledgePageTemplate exists

Every knowledge page should share the same structure.

Changing the template updates every engine.

---

## Why AirportSeed exists

One airport should be added in minutes.

Not hours.

The generator creates the page.

Developers only provide structured data.