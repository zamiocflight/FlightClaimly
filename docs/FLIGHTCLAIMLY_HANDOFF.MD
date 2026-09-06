# FLIGHTCLAIMLY — MASTER HANDOFF

Last updated: **2026-09-06**

## PURPOSE

This is the continuity handoff for ongoing FlightClaimly development. A new ChatGPT session should treat this document, `docs/CURRENT_SPRINT_LATEST.md`, the latest relevant checkpoint and the actual GitHub branch/code as project state.

Repository state beats conversational memory if they differ.

## WORKING STYLE

- Swedish conversation
- fast execution
- inspect actual repo/code before instructing changes
- one clear checkpoint at a time when local user action is required
- exact file paths and exact code-change locations
- state whether a file is new, fully replaced or partially edited
- do not ask the user to reconstruct code that GitHub access can inspect directly
- avoid giant multi-command shell blocks that can destabilize the VS Code integrated terminal
- use GitHub tools directly where safe
- never force-push
- never use `git add .`
- never destructive reset/clean unrelated work

## COMPANY

Company: FLIGHTCLAIMLY OÜ  
Registered: Estonia, 2025-12-13  
Website: flightclaimly.com  
Launch: 2026-07-05  
Founder: David Victor Hedlund, CEO & Founder  
Business: EU261 / UK261 flight compensation claims  
Standard customer pricing: 20% including VAT  
Commercial model: No win, no fee

Current public/product locales before PT/ES expansion:

- sv
- en
- da
- de
- nl
- pl
- fi

Long-term goal: highly automated European flight-compensation platform with strong organic Knowledge/SEO acquisition, scalable claims handling and country-by-country growth.

# CURRENT DEVELOPMENT STATE

## Locked foundations

- Delay Reason Engine v1 — LOCKED
- EU261 Legal Rule Layer v1 — LOCKED
- Claim Rights Assessment Engine v1 — LOCKED
- Claims Desk Assessment Integration phase 1 — VERIFIED
- Research / Evidence Engine v1 foundation — LOCKED
- Build / Deployment Cost Optimization — LOCKED
- Flight Number Localization Wave 1 — COMPLETE / LOCKED / RELEASED

## Flight Number Wave 1 baseline

Published locales:

EN + SV + DA + PL + DE + FI + NL

Scale:

- 2,841 canonical Flight Number entities
- 44 represented airline groups
- 19,887 detail paths = 2,841 × 7
- 308 localized airline-group paths = 44 × 7
- 2,886 Flight Number sitemap URLs per market

Do not rerun FlightAware merely for localization and do not reopen locked Flight Number v1 without a concrete bug/legal change/planned v2.

# LOCALIZATION WAVE 2

Wave 2 coordinated Knowledge cohorts:

1. Routes
2. Airports
3. Airlines
4. Countries
5. Delay Reasons

Market order:

`SV LOCKED → DA NEXT → PL → DE → FI → NL`

## Swedish Wave 2 — LOCKED

Date: 2026-09-06

Code lock commit:

`93e965af7c7f429084a787cc01fe833f6f7e86bb`

Commit message:

`Lock Swedish SEO localization Wave 2`

Detailed authoritative checkpoint:

`docs/checkpoints/2026-09-06-seo-localization-wave2-sv-locked.md`

At Swedish lock, Wave 2 publication scope is exactly EN + SV.

## What the Swedish foundation built

SV was the heavy architecture/foundation market, not just a translation pass.

It established/generalized:

- deterministic localization builders for Routes, Airports, Airlines, Countries and Delay Reasons
- localized entity display names via optional `displayName` support
- localized route/city/country presentation without forking canonical facts
- publication-aware Knowledge/internal-link behavior
- locale-preserving Related Routes links
- localized Related Routes visible presentation
- Delay Reason metadata localization
- separate localized Delay Reason assessment presentation from canonical assessment/classification data
- localized Delay Reason headings, labels, badges, investigative questions and extraordinary-circumstance presentation
- localized BreadcrumbList output
- localized FAQPage schema output
- coherent Wave 2 locale gates/static params/hreflang/sitemap behavior
- reusable QA/lock method for remaining markets

### Key final SV implementation files

- `src/app/[locale]/delay-reasons/[slug]/page.tsx`
- `src/components/seo/RelatedRoutes.tsx`
- `src/components/seo/delay-reasons/ClaimAssessment.tsx`
- `src/components/seo/delay-reasons/CompensationRules.tsx`
- `src/components/seo/delay-reasons/DelayReasonKnowledgeTemplate.tsx`
- `src/components/seo/delay-reasons/DelayReasonOverview.tsx`
- `src/components/seo/delay-reasons/ExtraordinaryCircumstances.tsx`
- `src/components/seo/delay-reasons/FAQ.tsx`
- `src/components/seo/delay-reasons/PassengerRights.tsx`
- `src/components/seo/delay-reasons/RelatedKnowledge.tsx`
- `src/components/seo/delay-reasons/Statistics.tsx`
- `src/components/seo/delay-reasons/Timeline.tsx`
- `src/data/entities/registry.ts`
- `src/lib/delay-reasons/metadata.ts`
- `src/lib/localization/delay-reason-assessment-sv.ts`
- `src/lib/localization/entity.ts`
- `src/lib/localization/knowledge-sv.ts`
- `src/lib/localization/types.ts`
- `src/lib/seo/relationships.ts`

## Swedish QA / lock result

Verified green:

- Preview build: 1,296 / 1,296
- typecheck
- `git diff --check`
- five Swedish Wave 2 hubs
- representative Route/Airport/Airline/Country/Delay Reason rendering
- dynamic/unsampled Swedish route HTTP 200
- Swedish route/country display-name behavior
- Delay Reason extraordinary=false presentation
- Delay Reason extraordinary=true presentation
- Swedish BreadcrumbList
- Swedish FAQPage schema
- DA Flight Number related-link fallback regression preserved
- Wave 2 locale scope EN+SV only
- sitemap expected 27,039 / actual 27,039
- production build **27,249 / 27,249 static pages**

## Wave 2 entity inventory

Per locale:

- Routes: 3,141
- Airports: 98
- Airlines: 96
- Countries: 36
- Delay Reasons: 11
- Total: 3,382

At EN+SV:

- 6,764 entity URLs
- 10 cohort index URLs
- 6,774 Wave 2 sitemap URLs

# WORKTREE / GIT SAFETY — CRITICAL

Two Git worktrees are intentionally in use.

## Original worktree

Folder:

`flightclaimly`

Purpose:

General/original worktree. It currently contains parked unrelated Claims/Reijo work.

Last verified local status:

- `M docs/CLAIMS_DESK.md`
- `M scripts/test-manual-claim.ts`
- `?? scripts/create-reijo-claim.ts`

Do not reset, clean, stage or modify those files as part of localization.

## Wave 2 worktree

Folder:

`flightclaimly-wave2-sv`

Branch:

`seo-localization-wave2-sv`

This folder is NOT another project or fork. It is a separate Git worktree using the same FlightClaimly repository/history, created to isolate Wave 2 from parked Claims/Reijo edits.

**Continue Danish Wave 2 in this Wave 2 worktree lineage. Do not switch back to the original worktree merely because Swedish is locked.**

Remote documentation commits may exist after the SV code-lock commit. Synchronize safely before making new local edits. Do not force-push.

# NEXT EXACT DEVELOPMENT ACTION

## Danish Wave 2

DA is next.

Use Swedish only as proof that the generic architecture works. Do not mechanically translate Swedish into Danish. Localize from canonical/base meaning and preserve canonical facts/legal meaning.

Expected sequence:

1. synchronize current Wave 2 branch safely
2. inspect actual localization architecture/current code
3. add/adapt Danish presentation for Routes, Airports, Airlines, Countries and Delay Reasons
4. preserve canonical facts and canonical legal/classification values
5. use market-native terminology/search intent
6. verify visible display names and route/country naming
7. verify Delay Reason assessment presentation and extraordinary labels
8. verify metadata
9. verify internal links / Related Routes
10. verify BreadcrumbList + FAQ/schema
11. extend Wave 2 locale publication gate to DA only when quality is ready
12. verify canonical/hreflang/static params
13. verify sitemap arithmetic
14. run typecheck + diff check
15. optimized Preview + representative and unsampled rendered QA
16. stop Preview
17. one meaningful production build
18. checkpoint + lock DA
19. continue PL → DE → FI → NL

The remaining Wave 2 markets should be materially faster than SV because the generic plumbing, display-name support, publication-aware linking, Delay Reason localization separation and QA procedure now exist. Each market still needs real terminology/SEO/legal-meaning QA and a production lock gate.

# ARCHITECTURAL PRINCIPLES

- canonical Knowledge facts are locale-neutral
- localization changes presentation, not canonical fact identity
- legal/classification values remain canonical across locales
- localization is market-native adaptation, not translation chaining
- quality gates control SEO publication
- routing support does not equal publishable localization
- relationship links must respect publication policy
- research/evidence and legal evaluation remain separate
- unresolved facts stay unresolved until sufficiently verified
- customer-specific data remains transactional and must not leak into source-controlled generic helpers
- build/deployment optimization remains locked unless deliberately re-evaluated

# PORTUGAL + SPAIN AFTER CURRENT WAVE 2

After SV/DA/PL/DE/FI/NL Wave 2 is complete:

1. Portuguese first as a complete public/product locale
2. Spanish second
3. validate core site + claim journey in each new locale
4. apply established Flight Number localization method
5. apply coordinated Wave 2 Knowledge method
6. validate canonical/hreflang/sitemap/build/rendering
7. hand to Google primarily through sitemap plus a small representative set of strategic indexing requests

# PREMIUM UX / DESIGN / CONVERSION

After/alongside expansion, perform a deliberate premium product-quality pass over desktop + mobile:

landing/search → lookup → eligibility → passenger details → documents → claim → confirmation.

Review hierarchy, typography/spacing, trust/authority, CTA clarity, progress/navigation, form friction/validation, states, reassurance/copy, responsive behavior, microinteractions, consistency, accessibility/performance and conversion instrumentation.

# GROWTH MODEL

Build country-by-country TAM/SAM/SOM estimates and model 1%, 2%, 3% penetration. Track the complete funnel:

traffic → started claim → submitted → valid/pursued → successful recovery → gross commission → CAC/payback.

Do not treat all disrupted passengers as eligible and do not assume a 90% win rate across raw submissions. A 90%+ success aspiration only makes sense for screened/pursued claims.

Priority future growth laboratories:

- Portugal
- Spain
- Poland

# CLAIMS OPERATIONS CONTEXT

Claims and localization are separate workstreams.

Do not accidentally stage or modify parked Reijo/manual-claim work while continuing Wave 2.

Claims roadmap remains:

- Manual / Legacy Claim Engine
- Claims Desk Workflow v2
- Airline Submission Engine
- Customer Communication Engine
- Escalation Engine
- Claims Intelligence
- additional passenger-right regimes through deterministic rule architecture

# CRASH-RECOVERY ORDER

A new ChatGPT session should read in this order:

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/checkpoints/2026-09-06-seo-localization-wave2-sv-locked.md`
3. `docs/ROADMAP.md`
4. this file
5. relevant architecture/engine files
6. current GitHub branch/code/status

Then continue Danish Wave 2 without asking the user to reconstruct the session.
