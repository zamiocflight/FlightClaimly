# FlightClaimly – Current Sprint

**Status:** Sprint 1 (Knowledge Foundation)

Last Updated: 2026-07-03

---

# Mission

Build the foundation for FlightClaimly's Knowledge Engine.

The goal is **not** to build SEO pages.

The goal is to build a reusable platform that can generate and maintain thousands of high-quality knowledge pages across Europe.

---

# Sprint 1 Goals

## ✅ Completed

### Airline Knowledge Template

- Hero
- Quick Facts
- Overview
- Compensation Amounts
- Passenger Rights
- Compensation Rules
- Statistics
- Timeline
- Claim Process
- Common Issues
- FAQ
- Related Airlines

---

### Knowledge Model

Reusable airline model.

Knowledge chapters.

Shared data.

Reusable metadata.

---

### Metadata Engine

Reusable metadata builder.

Canonical URLs.

Open Graph.

SEO consistency.

---

### Internal Linking Engine v2

Relationship Graph

Entity Registry

Knowledge → Engine → UI architecture

Related Knowledge component

---

# Architecture

Knowledge

↓

Relationship Graph

↓

SEO Engine

↓

UI

---

Entity Registry

↓

Airports

Airlines

Countries

Routes

Laws

Articles

---

# Principles

Single Source of Truth.

Reusable components.

Reusable data.

Reusable metadata.

Reusable relationships.

No duplicated knowledge.

---

# Sprint 2 Preview

Airport Engine

Country Engine

Route Engine

---

# Long-Term Vision

FlightClaimly is not building SEO pages.

FlightClaimly is building Europe's largest knowledge platform for passenger rights.

Every new page should strengthen every existing page.

Knowledge first.

Scale second.
# Project Status

**Last Updated:** 2026-07-08

---

# Overall Status

FlightClaimly has successfully completed the **Airline Expansion Sprint**.

The platform has now evolved beyond a traditional flight compensation website into a scalable SEO platform built around reusable structured data.

The Airline Engine is considered production-ready and serves as the foundation for all upcoming SEO engines.

---

# Current Completion

## Core Claim Platform
- ✅ Claim flow completed
- ✅ Passenger flow completed
- ✅ Authorization flow completed
- ✅ Upload system completed
- ✅ Admin panel operational
- ✅ Multi-language architecture
- ✅ Production deployment
- ✅ Build passing

---

## SEO Engine

### Airline Engine
Status: **COMPLETE**

Approximately 100+ airlines have been implemented.

Coverage includes:

- Major European network airlines
- European low-cost carriers
- Charter airlines
- Regional EU airlines
- UK airlines
- Swiss airlines
- ECAA airlines
- Major international airlines operating to/from Europe

Each airline contains:

- Airline metadata
- SEO title
- Meta description
- Overview
- Passenger rights
- EU261 applicability
- Compensation explanation
- Statistics
- Timeline
- Standard FAQ
- Standard Claim Process
- Common Issues

The Airline Engine is now considered complete and will not receive further expansion unless a meaningful airline is missing.

---

# Technical Status

Build Status:

✅ npm run build passes successfully

Project stability:

Stable

No known blocking issues.

---

# Git

Latest milestone:

✅ Airline Engine completed

Latest commit represents the completion of the Airline Expansion Sprint.

---

# Next Sprint

## Route Engine

Next objective:

Build the Route Engine.

The Route Engine will generate highly optimized landing pages for individual flight routes.

Examples:

- Copenhagen → Stockholm
- London → Barcelona
- Paris → New York

Each route page will contain:

- Route overview
- Passenger rights
- EU261 explanation
- Compensation amounts
- Airlines serving the route
- Internal links
- Related airports
- Related airlines
- Claim CTA

This engine is expected to become the largest organic traffic driver in the project.

---

# Future Roadmap

After Route Engine:

1. Airline × Airport Engine
2. Airline × Country Engine
3. Airport × Airport expansion
4. Delay Reason Engine
5. Flight Number Engine
6. Social Content Engine
7. Live disruption/news integration

---

# Development Philosophy

Current development strategy:

- Complete one engine at a time.
- Keep every engine reusable.
- Prefer scalable architecture over shortcuts.
- Build once, reuse everywhere.

Every completed engine becomes a permanent building block for future SEO expansion.

# Sprint Complete — Route Engine Foundation

Status: ✅ Completed

Date: 2026-07-08

---

## Objective

Build the first scalable Route Engine capable of generating reusable SEO route pages.

---

## Completed

### Route Generator

Implemented RouteGroupSeed architecture.

One origin airport can now generate multiple routes through `createRoutes()`.

Example:

CPH

↓

ARN

OSL

HEL

...

instead of manually creating every individual route.

---

### Route Knowledge Model

Created FlightRoute objects with reusable structured knowledge.

Each route contains:

- origin
- destination
- airlines
- passenger rights
- compensation
- statistics
- timeline
- FAQ
- SEO content

---

### Route Knowledge Library

Created:

src/lib/knowledge/routes.ts

Provides reusable functions:

- getRelatedRoutes()
- getRoutesForAirport()
- getRoutesFromAirport()
- getRoutesToAirport()
- getRoutesForCountry()
- getRoutesForAirline()
- getDomesticRoutes()
- getInternationalRoutes()
- getPopularRoutes()

Business logic has been moved away from page components.

---

### Route SEO

Created:

src/lib/seo/routes.ts

Current responsibilities:

- Route metadata
- Canonical URL generation
- Breadcrumb generation
- Sitemap entry generation

This establishes the Route SEO layer.

---

### Route Pages

Implemented:

- /routes
- /routes/[slug]

Pages now consume reusable knowledge instead of hardcoded content.

---

### Internal Linking

Added:

- Related Routes
- Related Airports
- Related Airlines

The Route Engine now participates in the Knowledge Graph.

---

## Architecture Result

FlightClaimly now consists of reusable SEO engines:

✅ Airline Engine

✅ Airport Engine

✅ Country Engine

✅ Route Engine Foundation

---

## Next Sprint

Route Population Engine

Objective:

Populate the Route Engine with the highest-value European routes before SEO launch.