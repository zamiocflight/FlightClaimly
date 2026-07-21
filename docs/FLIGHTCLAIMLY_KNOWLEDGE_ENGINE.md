# FLIGHTCLAIMLY KNOWLEDGE ENGINE

> Version 1.0
>
> This document defines the long-term architecture, philosophy and vision behind FlightClaimly's Knowledge Engine.
>
> It is the single most important technical and strategic document in the entire project.

---

# Our Mission

FlightClaimly exists to become the world's most trusted source of knowledge about passenger rights.

Not by publishing the most articles.

Not by generating the most pages.

Not by writing the most words.

But by building the world's most complete knowledge graph for passenger rights.

Every airline.

Every airport.

Every route.

Every country.

Every regulation.

Every disruption.

Every passenger right.

Every compensation rule.

Every relationship.

Everything we build starts from this knowledge.

The website is only one interface.

Search engines are another.

AI is another.

Support is another.

Future products are another.

Everything comes from the same source of truth.

---

# Our Philosophy

We never create pages.

We create knowledge.

Pages are generated from knowledge.

Videos are generated from knowledge.

FAQs are generated from knowledge.

Schema is generated from knowledge.

Metadata is generated from knowledge.

Internal links are generated from knowledge.

Everything originates from the same engine.

---

# The Long-Term Vision

Most competitors build websites.

Some competitors build blogs.

A few competitors build programmatic SEO.

FlightClaimly builds a knowledge platform.

The result happens to rank in Google.

Google traffic is not the goal.

Knowledge is the goal.

Search traffic is merely one consequence.

---

# Our Competitive Advantage

AirHelp can write an article.

Skycop can write an article.

Anyone can write an article.

Almost nobody builds a structured knowledge graph.

That becomes our moat.

Every new piece of information improves the entire ecosystem.

Every new airline strengthens airport pages.

Every new airport strengthens route pages.

Every new regulation strengthens compensation pages.

Every new relationship strengthens internal linking.

The system grows exponentially.

Not linearly.

---

# Core Principle

Knowledge always exists before content.

Never write content first.

First define:

Entity

Relationships

Facts

Sources

Only then generate content.

---

# Source of Truth

There must always be exactly one authoritative source for every fact.

Never duplicate knowledge.

Never duplicate data.

Never duplicate relationships.

Everything references a single source.

# FlightClaimly Knowledge Engine

Last Updated: 2026-07-08

---

# Purpose

The FlightClaimly Knowledge Engine is the foundation of the platform's organic SEO strategy.

Instead of relying on a small number of landing pages, FlightClaimly builds reusable knowledge engines capable of generating thousands of highly relevant pages targeting specific passenger searches.

Every engine is designed to be reusable and interconnected.

---

# Completed Engines

## Airline Engine

Status:

✅ COMPLETE

The Airline Engine contains approximately 100+ airlines covering nearly the entire EU261 market.

Coverage includes:

- European network airlines
- European low-cost airlines
- Charter airlines
- Regional airlines
- UK airlines
- Swiss airlines
- ECAA airlines
- Major international airlines

Each airline contains:

- Core airline metadata
- SEO title
- Meta description
- Overview
- Passenger rights
- EU261 applicability
- Compensation explanation
- Statistics
- Timeline
- FAQ
- Standard claim process
- Common passenger issues

The Airline Engine now acts as the primary airline data source across the platform.

---

---

## Authority Engine

Status:

✅ COMPLETE (Version 1)

Purpose:

Provide reusable legal and official authority sources across the entire Knowledge Engine.

Instead of embedding regulations, legal references and official guidance directly into knowledge objects, the Authority Engine centralizes all authority information into a reusable system.

Current capabilities:

- Central Authority Registry
- Typed authority sources
- Multiple authority sources per entity
- Official source references
- Reusable Authority Section
- Knowledge Template integration

The Authority Engine currently supports manual authority relationships between entities and official sources.

Future evolution:

Version 2 will introduce an Authority Rules Engine capable of attaching authority sources automatically based on reusable business rules such as jurisdiction, carrier type and regulatory applicability, while still supporting manual overrides where necessary.

The Authority Engine is designed to become the legal foundation shared by every future knowledge engine, including:

- Airline Engine
- Airport Engine
- Route Engine
- Country Engine
- Delay Reason Engine
- Flight Number Engine

---

---

# Authority Rules Engine

## Status

🟢 ACTIVE

The Authority Rules Engine is the first reasoning engine inside FlightClaimly.

Unlike previous engines that primarily retrieve structured knowledge, the Rules Engine can infer which official authorities apply based on contextual information.

Example:

Route

↓

Origin Country

↓

Destination Country

↓

Applicable Regulation

↓

Official Authority Sources

The first implemented rule automatically identifies routes operating entirely within the European Union and attaches:

- EU261
- European Commission Guidelines

without requiring explicit route mappings.

---

## Philosophy

Knowledge should not only be stored.

Knowledge should be interpreted.

The Authority Rules Engine represents the first step from static knowledge retrieval toward rule-based knowledge reasoning.

Future engines—including Delay Reasons, Flight Numbers, Compensation Logic and Extraordinary Circumstances—will follow the same architectural philosophy.

## Authority Resolver

Authority resolution follows the Resolver Pattern.

Instead of exposing multiple helper functions, every knowledge entity resolves legal authority through a single generic resolver.


Current supported entity types:

- Route
- Airline
- Airport
- Country

The generic design allows future engines to integrate without modifying the public API.

Examples:

- Delay Reason
- Flight Number
- Regulation
- Case Law
- Airport Procedure
- Passenger Right

The resolver determines authority by applying:

1. Explicit authority relationships
2. Entity-specific authority logic
3. Rule engines
4. Empty result

### Resolver Pattern

Every Knowledge Engine exposes a single public resolver.

Pages never perform knowledge resolution directly.

Instead, pages delegate all domain-specific resolution to the engine responsible for that domain.

Current example:

- `resolveAuthority<T>()`

Planned examples:

- `resolveDelayReason<T>()`
- `resolveFlightNumber<T>()`

This architecture centralizes business logic, provides a stable public API for every engine, and allows new entity types to be introduced without changing page implementations.
---

# Upcoming Engines

## Route Engine

Status:

🚧 Next Sprint

Purpose:

Generate dedicated landing pages for individual flight routes.

Examples:

- Copenhagen → Stockholm
- London → Barcelona
- Paris → New York
- Frankfurt → Malaga

Each route page will include:

- Route overview
- Passenger rights
- Compensation amounts
- Airlines operating the route
- Related airports
- Related countries
- Internal linking
- Claim CTA

The Route Engine is expected to become the single largest organic traffic generator.

---

## Airline × Airport Engine

Purpose:

Create pages such as:

- SAS at Copenhagen Airport
- Ryanair at Malaga Airport
- Lufthansa at Frankfurt Airport

---

## Airline × Country Engine

Purpose:

Create pages such as:

- Ryanair in Spain
- Turkish Airlines in Germany
- Air France in Italy

---

## Airport Engine

Status:

Foundation completed.

Will continue expanding as Route Engine grows.

---

## Airport × Airport Engine

Purpose:

Expand route relationships between airports and strengthen internal linking.

---

## Delay Reason Engine

Examples:

- Technical problems
- Weather delays
- Crew shortages
- Air traffic control
- Missed connections
- Denied boarding

---

## Flight Number Engine

Examples:

- SK1427
- BA811
- LH803

Each page explains passenger rights for specific flight numbers.

---

## Live Content Engine

Purpose:

Support real-time SEO.

Includes:

- Flight disruption news
- Airport disruptions
- Airline incidents
- Social media content
- Seasonal travel updates

---

# Internal Linking Strategy

Every engine should strengthen the others.

Example:

Airline
↔ Airport

Airport
↔ Route

Route
↔ Airline

Country
↔ Airport

Airport
↔ Delay Guide

Flight Number
↔ Airline

This creates a scalable knowledge graph where every new page increases the value of existing pages.

---

# Development Strategy

Each engine is completed before starting the next.

Priority order:

1. Airline Engine ✅
2. Route Engine
3. Airline × Airport
4. Airline × Country
5. Airport × Airport
6. Delay Reason Engine
7. Flight Number Engine
8. Live Content Engine

This approach ensures every completed engine becomes a reusable building block for future SEO expansion.