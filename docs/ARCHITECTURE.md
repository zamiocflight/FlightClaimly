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

# Architecture

Last Updated: 2026-07-08

---

# Overview

FlightClaimly is built as a modular platform where every major feature is implemented as an independent engine.

Each engine is responsible for one knowledge domain while exposing reusable data to the rest of the platform.

The objective is to avoid duplicated logic and make every future SEO expansion significantly faster.

---

# Current Architecture

Presentation Layer

↓

SEO Engines

↓

Shared Knowledge Objects

↓

Reusable Components

↓

Claim Platform

---

# Current Engines

## Route Engine

Status:

✅ Foundation completed

Responsibilities:

- Route generation
- Route knowledge objects
- Airport relationships
- Airline relationships
- Internal linking
- Route SEO
- Route metadata
- Route knowledge library

The Route Engine consumes Airport and Airline knowledge rather than duplicating information.

## Airline Engine

Status:

✅ Complete

Location:

src/data/seo/airlines.ts

Responsibilities:

- Airline metadata
- Passenger rights
- Compensation information
- SEO content
- Timeline
- Statistics
- FAQ
- Standard reusable sections

This engine acts as the primary airline knowledge source.

---

## Airport Engine

Status:

Foundation complete

Responsibilities:

- Airport metadata
- Airport pages
- Airline relationships
- Route relationships

---

## Country Engine

Status:

Operational

Responsibilities:

- Country metadata
- Country landing pages
- Airline relationships
- Airport relationships

---

## Route Engine

Status:

Next Sprint

Responsibilities:

- Airport → Airport relationships
- City → City relationships
- Compensation by route
- Airline availability
- Internal linking

The Route Engine will consume data from both the Airline Engine and Airport Engine rather than duplicating information.

---

# Shared Components

Reusable components include:

- Hero
- Compensation Cards
- Timeline
- Statistics
- FAQ
- Claim Process
- Common Issues
- CTA sections

Every SEO page should be assembled from reusable components wherever possible.

---

# Data Flow

Country

↓

Airport

↓

Route

↓

Airline

↓

Claim Flow

Relationships exist in both directions whenever practical.

---

# Internal Linking

Every engine strengthens every other engine.

Examples:

Airline

↔ Airport

Airport

↔ Route

Route

↔ Country

Country

↔ Airline

Flight Number

↔ Route

Delay Guide

↔ Airline

The objective is to continuously increase topical authority through dense internal linking.

---

# Scalability Principles

Every new engine should:

- Reuse existing knowledge.
- Avoid duplicated content.
- Generate structured pages.
- Strengthen internal linking.
- Be maintainable through centralized data.

---

# Development Rules

The project follows these principles:

- Build reusable systems instead of isolated pages.
- Complete one engine before starting another.
- Keep business logic centralized.
- Prefer configuration over hardcoding.
- Keep templates generic.
- Make every engine reusable by future engines.

---

# Current Milestone

Completed:

✅ Airline Engine

Next:

🚧 Route Engine Foundation

The Airline Engine now serves as the base layer for all upcoming SEO engines.

---

# Authority Engine v1

Status:

✅ LOCKED

Completed:

2026-07-18

Purpose:

The Authority Engine provides reusable legal and official sources for every knowledge page.

Rather than embedding legal references directly into airline, airport or route content, the engine exposes authority data through a centralized registry.

Current architecture:

Authority Registry

↓

Authority Relationships

↓

Authority Lookup

↓

Knowledge Page Template

↓

Authority Section

Current implementation:

Data:

- src/data/authority/registry.ts
- src/data/authority/relationships.ts
- src/data/authority/shared/types.ts

Logic:

- src/lib/authority/index.ts
- src/lib/authority/registry.ts
- src/lib/authority/relationships.ts

UI:

- src/components/authority/AuthoritySection.tsx

Integrated into:

- KnowledgePageTemplate
- Airline Engine

Capabilities:

- Central Authority Registry
- Typed authority sources
- Multiple authority sources per entity
- Official source links
- Reusable authority rendering
- Type-safe architecture

Example:

SAS

↓

EU261 Regulation

+

EU Passenger Rights Interpretative Guidelines

↓

Authority Section

Design Principles:

- Authority data lives in src/data.
- Authority logic lives in src/lib.
- Rendering lives in src/components.
- Knowledge pages never contain authority logic.
- New authority sources should be added once and reused everywhere.

Future evolution:

Authority Engine v2 will introduce a Rules Engine capable of attaching authority sources automatically based on reusable business rules (for example EU carriers, UK carriers or US airlines), while still supporting manual overrides for exceptional cases.

The existing architecture is designed so this upgrade can be implemented without changing the Knowledge Page Template or the rendering layer.

---

# Authority Rules Engine (v2)

## Status

✅ ACTIVE

## Purpose

The Authority Rules Engine extends the Authority Engine from simple entity lookups to rule-based authority resolution.

Instead of requiring every entity to define authority sources manually, the Rules Engine can infer applicable legislation and official sources based on the entity's context.

This allows FlightClaimly to scale authority coverage without maintaining thousands of explicit mappings.

---

## Current Architecture

Authority Registry
↓
Authority Relationships
↓
Authority Rules
↓
Authority Resolver
↓
Knowledge Engine

---

## Current Rules

### EU → EU Routes

If both the origin and destination airports are located within the European Union:

- EU261
- European Commission Guidelines

are automatically attached as authority sources.

No manual route relationship is required.

---

## Resolution Order

Authority resolution follows a deterministic order.

1. Explicit Relationships
2. Rules Engine
3. No Authority

Explicit relationships always override automatic inference.

---

## Design Principles

- Explicit relationships always have highest priority.
- Rules should be deterministic.
- Rules should never duplicate registry data.
- Rules may only reference registered authority sources.
- Engines consume authority through a single resolver.

---

## Planned Rules

Future rules may include:

- UK261
- EU → UK
- UK → EU
- Montreal Convention
- National Enforcement Bodies
- Civil Aviation Authorities
- ECJ Case Law
- ADR Organisations

The goal is for FlightClaimly to determine applicable legal authority from structured knowledge rather than manually maintained mappings.

## Authority Resolver

The Authority Engine is accessed exclusively through a single public resolver.


### Design Principles

- Every authority lookup passes through `resolveAuthority<T>()`.
- The resolver is the single public entry point for the Authority Engine.
- Resolution is determined by the entity type.
- Entity-specific logic is isolated inside the resolver.
- Future entity types can be added without changing the resolver API.

### Resolution Order

1. Explicit Authority Relationships
2. Entity-specific Authority Resolution
3. No Authority

Architecture decisions are frozen during an active sprint.

New architectural improvements discovered during implementation are recorded as CTO Notes and evaluated after the sprint.

Avoid mid-sprint refactors unless they fix a correctness issue or provide overwhelming long-term value.

---

# Foundation Lock Update (2026-07-22)

## Status

🟢 Foundation v1 is now considered feature complete.

The core architecture has been unified around reusable engines rather than page-specific implementations.

Completed since the previous architecture update:

- ✅ Delay Reason Engine completed
- ✅ Shared Knowledge Templates finalized
- ✅ Central Metadata Engine adopted across Knowledge Engines
- ✅ Delay Reason integrated into the Authority Engine architecture
- ✅ Legal Graph foundation established for Delay Reasons
- ✅ Route Engine completed as part of the Knowledge Foundation

## Foundation Engines

The following engines are now considered locked:

- Metadata Engine
- Entity Registry
- Relationship Engine
- Authority Engine
- Knowledge Components
- Knowledge Templates

Future development should extend these engines rather than redesign them.

## Next Sprint

With Foundation complete, development moves to:

1. Flight Number Engine
2. Content Engine
3. Publishing & Growth

No architectural refactoring should be performed unless a correctness issue is discovered.

## Flight Number Population Engine

The Flight Number Population Engine is responsible for importing
scheduled flights from FlightAware and producing deterministic
FlightNumberSeed data.

Architecture principles:

- Profile-based population
- Multi-airline support
- Incremental merge
- Idempotent writes
- Structured execution reports
- Environment validation
- Date validation
- Request timeout
- Failure reporting
---

# Claims Platform Architecture Update — 2026-08-24

## Status

🟢 Production verified

FlightClaimly's claim platform now supports individual authority management for multiple adult passengers within the same claim.

This claims architecture is separate from the Knowledge Engine architecture and should not be confused with the SEO Authority Engine.

---

## Claim Structure

One claim represents the shared travel case.

A claim may contain:

- Claim owner
- One or more additional passengers
- Individual authority documents
- Supporting documents
- Booking information
- Flight information
- Claim status
- Claim correspondence

Additional passengers do not create separate claims.

They are connected to the parent claim through `claim_id`.

---

## Passenger Authority Architecture

Database:

`passenger_authorizations`

Each adult additional passenger receives an individual authorization record containing:

- passenger identity
- claim relationship
- email
- authorization status
- invite token
- invited timestamp
- signed timestamp
- authority document path

Authorization lifecycle:

    pending
    ↓
    invite email successfully sent
    ↓
    invited
    ↓
    passenger opens secure token link
    ↓
    reviews authority
    ↓
    signs
    ↓
    signed

A failed invitation email must never fail or invalidate the parent claim.

The passenger remains `pending` if delivery is unsuccessful.

---

## Secure Passenger Signing

Public route:

`/[locale]/passenger-authority/[token]`

The token identifies the individual passenger authorization.

The signing page:

- resolves the authorization securely by token
- loads the associated parent claim
- displays passenger and journey information
- explains why individual authority is required
- allows the passenger to review the authority before signing
- allows the passenger to sign electronically
- prevents duplicate signing

Signing API:

`/[locale]/passenger-authority/[token]/sign`

Successful signing:

1. generates the passenger's authority PDF
2. stores the PDF in Supabase Storage
3. marks the authorization `signed`
4. records `signed_at`
5. records `authority_path`
6. adds the document to the parent claim attachments

---

## Authority Document Storage

Claim owner authority:

    claims/{claimId}/authority.pdf

Additional adult passenger authority:

    claims/{claimId}/passenger-authorities/{passengerAuthorizationId}.pdf

Individual passenger authorities must never overwrite the claim owner's authority.

---

## Authority PDF Rendering

Both primary and additional-passenger authorities now use the same HTML-based signature rendering architecture.

Authority document:

`src/app/[locale]/power-of-attorney/page.tsx`

PDF renderer:

`src/lib/authority/renderHtmlToPdf.ts`

The signature is inserted into:

`#authority-signature-box`

before Puppeteer generates the PDF.

Do not return to fixed PDF x/y signature placement.

The HTML signature box is the source of truth for signature placement.

Signature images are trimmed before PDF generation to remove unnecessary transparent canvas space.

Production verification completed:

- two-page authority document
- signature inside Passenger Signature box
- primary passenger working
- additional passenger working

---

## Legal Authority Model

The standard FlightClaimly authority remains broad enough to allow FlightClaimly to represent the passenger throughout the claim process, including judicial proceedings where appropriate.

However:

- the authority itself is not advance acceptance of additional court fees
- additional legal/court fees or costs require separate customer approval before proceeding
- a court or local lawyer may still require a separate procedural power of attorney

This distinction must remain consistent across:

- Authority Document
- Authorization UI
- Terms and Conditions

---

## Email Architecture

Resend is used for transactional claim email.

Verified flows:

- internal new-claim notification
- claim-owner status email
- additional-passenger authority invitation

Email delivery failure must not make a successfully stored claim appear to have failed.

Passenger authorization status changes to `invited` only after the invitation email has been successfully sent.

---

## FlightAware

FlightAware remains the primary live/historical flight-data provider.

IATA → ICAO normalization includes:

`TP → TAP`

Historical cases that cannot be handled cleanly by the standard customer flow should not trigger redesign of the normal FlightAware flow.

They should instead use the planned Manual / Legacy Claim Onboarding architecture.

---

## Claims Architecture Rule

Do not build one-off customer-specific claim systems.

If an exceptional case reveals a reusable operational requirement, implement it as a generic claims capability.

Current example:

    Reijo legacy claim
    ↓
    reveals need for
    Manual / Legacy Claim Onboarding
    ↓
    reusable for future historical or manually reviewed claims.