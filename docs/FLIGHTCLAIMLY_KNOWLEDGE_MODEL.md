# FLIGHTCLAIMLY KNOWLEDGE MODEL

> This document defines the core data model behind FlightClaimly's Knowledge Engine.

---

# Core Idea

FlightClaimly does not start with pages.

FlightClaimly starts with knowledge.

A page is only one possible output of structured knowledge.

The same knowledge can generate:

- SEO pages
- FAQs
- Metadata
- Schema.org
- Internal links
- Breadcrumbs
- Video scripts
- Social posts
- AI support context
- Future API responses

---

# Entity

An Entity is a real-world object or concept that FlightClaimly understands.

Examples:

- Airline
- Airport
- City
- Country
- Route
- Regulation
- Passenger Right
- Delay Reason
- Cancellation Reason
- Compensation Rule
- FAQ
- Guide
- Case Example

Entities are not pages.

Entities are knowledge objects.

---

# Relationship

A Relationship connects two entities.

Examples:

- Lufthansa operates from Frankfurt.
- Frankfurt is located in Germany.
- Germany is covered by EU261.
- EU261 defines compensation rules.
- Technical problems may qualify for compensation.
- Bad weather may be an extraordinary circumstance.

Relationships are what make the system powerful.

The more relationships we add, the stronger the entire engine becomes.

---

# Template

A Template turns knowledge into a specific format.

Examples:

- Airline SEO page
- Airport SEO page
- Route SEO page
- FAQ block
- Schema.org JSON-LD
- TikTok script
- Meta description
- Internal link block

Templates should not contain hardcoded facts.

Templates should read facts from entities and relationships.

---

# Generator

A Generator combines:

- Entity
- Relationships
- Template
- Locale
- Business rules

...and produces an output.

Examples:

- `/en/airlines/lufthansa`
- `/sv/airlines/sas`
- FAQ schema
- Related airports
- Related routes
- Video script draft

---

# Source of Truth

Every fact should live in one place.

If Lufthansa's IATA code is `LH`, it should exist once.

If Frankfurt is in Germany, it should exist once.

If EU261 applies to flights departing from the EU, that rule should exist once.

Pages should reference knowledge.

They should not duplicate it.

---

# First Implementation

The first implementation is the Airline vertical.

Current files:

- `src/data/seo/airlines.ts`
- `src/data/seo/shared/claimProcess.ts`
- `src/data/seo/shared/commonIssues.ts`
- `src/data/seo/shared/faq.ts`
- `src/app/[locale]/airlines/page.tsx`
- `src/app/[locale]/airlines/[slug]/page.tsx`
- `src/components/seo/Hero.tsx`
- `src/components/seo/ClaimProcess.tsx`
- `src/components/seo/CommonIssues.tsx`
- `src/components/seo/FAQ.tsx`

This is SEO Engine v0.1.

The next step is to evolve this into Knowledge Engine v0.2.
# FlightClaimly Knowledge Model

## Core Architecture

Knowledge
    ↓
Knowledge Blocks
    ↓
Templates
    ↓
Pages
    ↓
SEO
    ↓
Growth

---

## Current Knowledge Blocks

✅ Hero

✅ Overview

✅ Quick Facts

✅ Claim Process

✅ Common Issues

✅ FAQ

✅ FAQ Schema

✅ Breadcrumb Schema

✅ Related Airlines

⬜ Passenger Rights

⬜ Compensation Rules

⬜ Timeline

⬜ Statistics

⬜ Legal References

⬜ Airports

⬜ Routes

⬜ Countries