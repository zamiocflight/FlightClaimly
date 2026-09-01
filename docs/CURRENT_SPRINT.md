# FlightClaimly – Current Sprint

> **DOCUMENT HISTORY NOTICE**
>
> This file intentionally preserves previous sprint plans, statuses and roadmap notes as project history.
> Older sections may therefore describe work as "Current", "Next Sprint" or "Upcoming" even when that work has since been completed.
>
> **Always treat the most recent dated project-state or sprint-status section as authoritative.**
> Earlier sections are historical records and must not be deleted merely because they are outdated.

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

# Sprint 5 – Flight Number Population Engine

Status: ✅ COMPLETED

Completed:
- Incremental merge
- Dynamic airline selection
- Population profiles
- Multi-airline population
- Pagination
- Structured population reports
- Success/failure reporting
- Environment validation
- Date validation
- Request timeout
- Idempotent seed generation

Verification:
- TypeScript clean
- Successful regression
- Failure scenarios verified
- Idempotent rerun verified

Next Sprint:
Sprint 6 – Flight Number Knowledge Engine

---

# Current Project State — 2026-08-24

> This section supersedes older "Next Sprint" notes above.

## Production Status

🟢 Claim platform operational  
🟢 Primary authority flow production verified  
🟢 Multi-passenger authority flow production verified  
🟢 Resend transactional email production verified  
🟢 Admin document visibility verified  
🟢 TypeScript clean  
🟢 Main branch deployed

---

# Completed — Multi-Passenger Authority

Completed and production tested:

- individual authorization record per additional adult passenger
- secure invitation token
- Resend passenger invitation email
- passenger authority landing page
- authority review before signing
- electronic signature
- separate passenger authority PDF
- shared parent claim
- signed status and timestamps
- authority PDF visible in admin
- duplicate-sign protection
- email failure does not invalidate claim
- primary and passenger signatures use the same HTML/Puppeteer rendering model
- two-page authority PDF
- trimmed signature images
- consistent authority fee/court language

---

# Legal / Terms Update

Completed:

- standard 20% incl. VAT fee remains the normal service fee
- legal proceedings may involve additional fees or costs
- any additional litigation terms require separate customer approval
- broad authority remains available so customers do not automatically need to repeat the complete authorization process
- separate procedural POA may still be requested if required by court/local counsel

English and Swedish fee/Terms copy updated.

Remaining localization cleanup:

- da
- de
- pl
- fi
- nl

These should be synchronized after English master wording is locked.

---

# Current Claims Work

## Reijo / TAP legacy claim

Status:

🟡 Awaiting supporting evidence before final onboarding.

Completed:

- itinerary and disruption review
- historical FlightAware investigation
- TAP IATA → ICAO normalization (`TP → TAP`)
- Portuguese limitation research
- EU261 / Montreal Convention distinction reviewed
- customer advised that the case appears worth pursuing
- customer asked to forward the original Finnish consumer-authority communication regarding the claimed 20-year Portuguese limitation period

Next:

1. Receive original Finnish authority communication
2. Translate/review original
3. Verify cited legal basis
4. Produce Final Claim Assessment
5. Create Manual / Legacy Claim
6. Generate individual secure authority links for both adult passengers
7. Obtain both signatures
8. Submit formal claim to TAP
9. Manage airline correspondence
10. Consider escalation only after merits/cost approval

---

# Next Product Capability

## Manual / Legacy Claim Onboarding

Purpose:

Handle valid claims that are:

- too old for the standard flight-search customer journey
- manually investigated
- received through email
- imported from another channel
- otherwise unsuitable for automated precheck

Principle:

Do NOT make the customer repeat irrelevant eligibility steps.

Proposed flow:

    Manual claim created/reviewed
    ↓
    claim data stored
    ↓
    secure authority link generated
    ↓
    customer reviews authority
    ↓
    customer signs
    ↓
    additional adult passengers receive individual authority links
    ↓
    documents appear in admin
    ↓
    claim ready for airline submission

This should reuse the existing passenger token/signing/PDF architecture rather than create a parallel authorization system.

---

# Operational Workstreams

FlightClaimly work should now be separated into two conversational workstreams:

## Product / Growth

- development
- SEO
- Knowledge Engine
- programmatic SEO
- SoMe
- analytics
- conversion
- content

## Claims Desk

- customer claims
- evidence review
- itinerary reconstruction
- legal analysis
- compensation calculation
- limitation
- authority
- airline demands
- correspondence
- escalation
- recovery

Individual customer facts should not be stored in general architecture documentation.

---

# Current Sprint Status — 2026-09-01

> This is the latest authoritative sprint-status section. Earlier sprint and roadmap sections above remain intentionally preserved as project history.

## SEO Integrity / Publication Architecture

Status: **✅ COMPLETED**

Completed:

- Route programmatic SEO publication restricted to English until genuine localized programmatic copy exists
- Airport, Airline, Country, Delay Reason and Flight Number programmatic publication aligned to the same EN-only policy
- canonical and language-alternate policy centralized and verified
- programmatic hubs use correct self-canonical URLs
- sitemap publication aligned with intended indexable surface
- `/en/flight-numbers` knowledge/discovery hub added
- Flight Number detail breadcrumbs now resolve through a real hub
- Flight Number Registry unified with `src/data/master/flightNumbers` as the authoritative source of truth
- Route/entity relationship links aligned with publication policy
- false sitemap freshness removed

## Current Knowledge Surface

- Airports: 98
- Airlines: 96
- Countries: 36
- Routes: 1,594
- Flight numbers: 50
- Delay Reason Engine currently contains the first substantive reason entity (`technical-problems`)

## Final Verification — 2026-09-01

- ✅ `npx tsc --noEmit`
- ✅ `npx tsx scripts/audit-seo-data.ts`
- ✅ SEO audit: 0 errors / 20 known copy-reference warnings / 0 info
- ✅ `npm run build`
- ✅ production build generated 2,164 / 2,164 static pages
- ✅ EN programmatic hub publication verified
- ✅ unsupported SV programmatic hub publication returns 404
- ✅ programmatic hub canonicals verified
- ✅ sitemap EN/SV publication boundaries verified
- ✅ Delay Reason hub production: EN 200 / SV 404
- ✅ Delay Reason `technical-problems` production: EN 200 / SV 404
- ✅ Delay Reason hub and detail self-canonicals verified
- ✅ Delay Reason sitemap publication verified: EN present / SV absent

The 20 SEO audit warnings are known lexical/relationship references between airlines (for example Lufthansa-group or brand relationships) and are not data-integrity failures.

## Sprint Closure

The SEO Integrity / Publication Architecture sprint is complete.

The intended programmatic indexation surface is now coherent across Routes, Airports, Airlines, Countries, Delay Reasons and Flight Numbers. Runtime publication gates, canonical URLs and sitemap publication agree with the EN-only policy for programmatic knowledge pages.

## Next Phase

Return to Knowledge Engine expansion and acquisition growth based on the maintained roadmap.

Primary next opportunities:

1. Scale Flight Number Engine population beyond the current 50 entities
2. Expand Delay Reason Engine coverage
3. Continue high-value Knowledge Engine population and programmatic search coverage
4. Introduce additional programmatic locales only through genuine localized templates/content with SEO and legal QA

Parent `[locale]` static generation of non-indexable programmatic hubs remains non-blocking technical debt; runtime gates prevent publication/indexation leakage.

---

# Flight Number Europe Scale Checkpoint — 2026-09-01

> This is the latest authoritative Product / Growth checkpoint and supersedes the earlier "Next Phase" list for the immediate development sequence.

## Current Focus

**Flight Number Engine population at European scale**

Status: **🟡 IN PROGRESS — scale checkpoint validated locally**

The project moved directly from the completed SEO Integrity / Publication Architecture sprint into the first controlled Europe-scale Flight Number population run.

## Architecture / Safety Work Completed Before Scale

- staged Europe population commands added (`pilot` and `scale`)
- FlightAware pagination links normalized/rebased correctly
- Flight Number identity enforced as `airline + flight number`
- seed sanitizer made non-destructive
- commercial airport coverage expanded and preserved through the Airport Registry
- stale commercial-airport schedule flags handled generically
- BGY/Bergamo registry issue resolved before the scale checkpoint
- Flight Number generation remains downstream of Airport/Route knowledge rather than hardcoded route exceptions

## Europe Core Scale Run

Profile: `europe-core`  
Airlines: `SK`, `DY`, `FR`, `LH`, `U2`, `AF`, `KL`, `BA`  
FlightAware maximum pages per airline: `5`

Population report:

- schedules returned: **600**
- valid normalized seeds: **599**
- rejected schedules: **1**
- duplicate fetched seeds: **44**
- unique fetched seeds: **555**
- existing seeds before merge: **165**
- seeds added: **436**
- seeds updated: **3**
- seeds unchanged: **116**
- route conflicts: **0**
- total seeds after merge: **601**

The successful population report completed in approximately 46.7 seconds.

## Generation / Build Checkpoint

After the scale run the working sequence reached:

1. `npm run populate:europe-core:scale`
2. `npm run build:flight-numbers`
3. `npm run audit:flight-numbers`
4. latest upstream Flight Number identity fix pulled
5. Flight Number build repeated
6. Flight Number audit repeated
7. `npm run build`

The production build has now been rerun after recovery and is green:

- ✅ compiled successfully
- ✅ TypeScript validation passed inside Next build
- ✅ static generation completed: **3,058 / 3,058 pages**
- ✅ Flight Number detail generation expanded from the previous 50-entity surface to the new scale dataset
- ✅ route generation remains healthy

## Recovery Point

The browser/session failure occurred **after the final production build command**, not during population or generation. The generated local work survived the crash.

At recovery, the large generated Flight Number/seed/registry changes were still present as local uncommitted changes. They must not be regenerated, reset or discarded merely because the chat session was lost.

## Immediate Next Action

Before committing the scale checkpoint:

1. rerun `npm run audit:flight-numbers` against the exact recovered generated dataset
2. confirm zero blocked entities, duplicate slugs and duplicate airline/flight-number identities
3. inspect the final Git delta/status without resetting generated files
4. commit the validated Europe Core scale artifacts as one checkpoint
5. only after that checkpoint is safely committed, continue to the next Flight Number population cohort / broader acquisition scale

Do not expand Delay Reason coverage or additional locales until this Flight Number scale checkpoint is secured unless priorities are explicitly changed.

---

# Exact Recovery-Safe Checkpoint — 2026-09-01

> **AUTHORITATIVE RESUME POINT.** If a browser/chat/session failure happens again, resume from this section first. Do not reconstruct earlier work from memory before reading this checkpoint.

## Exact Local State at Pause

Status: **🟡 VALIDATED AND STAGED LOCALLY — NOT YET COMMITTED**

The Europe Core Flight Number scale work is complete enough to checkpoint, but the generated artifacts have intentionally not yet been committed because the final Git synchronization/commit step remains.

Exactly four files are staged locally for the Flight Number Europe Scale checkpoint:

- `reports/population/latest.json`
- `src/data/master/airportRegistry.ts`
- `src/data/master/flightNumberSeeds.ts`
- `src/data/master/flightNumbers.ts`

Staged diff summary:

- **4 files changed**
- **80,157 insertions**
- **52,296 deletions**
- `reports/population/latest.json`: 143-line diff
- `airportRegistry.ts`: 58,673-line diff
- `flightNumberSeeds.ts`: 6,044-line diff
- `flightNumbers.ts`: 67,593-line diff

These unrelated Claims Desk / Reijo files are present locally but are **NOT staged and must not be included in the Flight Number commit**:

- `docs/CLAIMS_DESK.md` — modified, unstaged
- `scripts/test-manual-claim.ts` — modified, unstaged
- `scripts/create-reijo-claim.ts` — untracked

Do **not** run `git add .`, `git reset --hard`, `git clean`, or any destructive recovery command.

## Airport Registry Validation — COMPLETED

The large registry rewrite was investigated before approval. It is not treated as an unexplained data-loss event.

Current generator output:

- source CSV rows: **84,428**
- commercial scheduled candidates: **4,189**
- European commercial candidates: **678**
- final Airport Registry entries: **3,913**
- European Registry entries: **650**
- countries represented globally: **235**
- countries represented in Europe: **47**
- airport types globally: **957 large / 2,167 medium / 789 small**
- verified override injected: **BGY**

The previous HEAD registry contained 8,210 IATA entries. The smaller generated registry is intentional under the new Global Commercial Airport Registry policy: commercial airport type + scheduled service + valid IATA/core data, with non-commercial/irrelevant entries filtered out. The registry now also carries `continent` and `isEuropean` fields.

After regenerating the Airport Registry, the Flight Number audit was rerun successfully, proving the stricter registry does not block the current Flight Number publication layer.

## Final Flight Number Audit — GREEN

Latest exact audit result after Airport Registry regeneration:

- entities: **548**
- publishable: **548**
- blocked: **0**
- duplicate slugs: **0**
- duplicate identities: **0**
- airlines represented: **8**

By airline:

- Air France: **62**
- British Airways: **60**
- easyJet: **63**
- KLM: **71**
- Lufthansa: **63**
- Norwegian: **72**
- Ryanair: **59**
- SAS: **98**

Important data-layer distinction:

- **601** = seeds after Population Engine merge
- **548** = final generated/audited Flight Number entities

Do not describe 601 as the final public Flight Number entity count.

## Build State

Latest full production build before this pause is green:

- compiled successfully
- TypeScript validation passed
- static generation completed: **3,058 / 3,058 pages**
- Flight Number generation expanded successfully
- Route generation remained healthy

## Git / Remote Coordination State

`docs/CURRENT_SPRINT.md` has been updated directly on remote `main` during recovery documentation. Therefore the local branch may be behind remote even though the four generated Flight Number files are staged locally.

Do **not** force-push or reset to reconcile this.

## Exact Next Action on Resume

Do not repopulate, regenerate, or restage the dataset. The data has already been validated.

Resume with Git synchronization/checkpointing only:

1. inspect local/remote branch relationship safely (`git fetch origin` followed by branch/status inspection)
2. preserve the four staged Flight Number files and the three unrelated Claims/Reijo local files
3. reconcile the remote `CURRENT_SPRINT.md` documentation commit without destructive reset/force
4. commit the four validated staged artifacts as the Europe Core Flight Number scale checkpoint
5. push the checkpoint normally
6. verify remote/main contains both the documentation checkpoint and the Flight Number checkpoint
7. only then mark this scale checkpoint secured and choose the next Flight Number population cohort

**Do not continue broader population before this exact staged checkpoint is safely committed and pushed.**
