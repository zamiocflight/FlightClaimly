# FLIGHTCLAIMLY — MASTER HANDOFF

Last updated: **2026-09-07**

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

Current public/product locales before PT/ES expansion: SV, EN, DA, DE, NL, PL, FI.

# CURRENT DEVELOPMENT STATE

Locked foundations:

- Delay Reason Engine v1 — LOCKED
- EU261 Legal Rule Layer v1 — LOCKED
- Claim Rights Assessment Engine v1 — LOCKED
- Claims Desk Assessment Integration phase 1 — VERIFIED
- Research / Evidence Engine v1 foundation — LOCKED
- Build / Deployment Cost Optimization — LOCKED
- Flight Number Localization Wave 1 — COMPLETE / LOCKED / RELEASED

Flight Number Wave 1 remains published in EN + SV + DA + PL + DE + FI + NL with 2,841 canonical Flight Numbers, 44 represented airline groups, 19,887 detail paths and 308 localized airline-group paths. Do not rerun FlightAware or reopen Wave 1 without a concrete reason.

# LOCALIZATION WAVE 2

Coordinated cohorts:

1. Routes
2. Airports
3. Airlines
4. Countries
5. Delay Reasons

Market order now:

`SV LOCKED → DA LOCKED → PL NEXT → DE → FI → NL`

## Swedish Wave 2 — LOCKED 2026-09-06

Code lock:

`93e965af7c7f429084a787cc01fe833f6f7e86bb`

Checkpoint:

`docs/checkpoints/2026-09-06-seo-localization-wave2-sv-locked.md`

SV established the reusable architecture: deterministic localization builders, optional localized display names without canonical-data forks, publication-aware links, localized route/city/country presentation, Delay Reason localization/assessment separation, localized structured data, publication gates and the reusable QA/build/sitemap lock procedure.

## Danish Wave 2 — LOCKED 2026-09-07

Code lock:

`558ee8e8d6a848fd9226247eb42ea191b73a8b79`

Checkpoint:

`docs/checkpoints/2026-09-07-seo-localization-wave2-da-locked.md`

DA reuses the SV foundation and publishes Wave 2 exactly in EN + SV + DA.

DA lock gates were all green:

- `npm run typecheck`
- `git diff --check`
- Preview build: **1,561 / 1,561**
- production build: **30,631 / 30,631**
- sitemap expected/actual: **30,426 / 30,426**
- rendered Route/Airport/Airline/Country/Delay Reason QA
- five DA hubs
- reverse route HTTP 200
- extraordinary=true and extraordinary=false Delay Reason QA
- BreadcrumbList + FAQPage presence
- canonical/hreflang exactly EN+SV+DA
- DA Flight Number regression preserved

Wave 2 entity inventory per locale remains:

- Routes 3,141
- Airports 98
- Airlines 96
- Countries 36
- Delay Reasons 11
- total 3,382 entity URLs + 5 cohort indexes = 3,387 sitemap URLs per added Wave 2 market

# WORKTREE / GIT SAFETY

Original worktree `flightclaimly` contains parked unrelated Claims/Reijo work last verified as:

- `M docs/CLAIMS_DESK.md`
- `M scripts/test-manual-claim.ts`
- `?? scripts/create-reijo-claim.ts`

Do not touch/reset/clean/stage those files from localization work.

Wave 2 worktree remains:

`flightclaimly-wave2-sv`

Current locked DA branch:

`seo-localization-wave2-da`

Do not create additional worktrees for PL/DE/FI/NL. Continue the existing Wave 2 lineage and synchronize documentation-only commits safely before branching. Never force-push.

# NEXT EXACT DEVELOPMENT ACTION — POLISH WAVE 2

1. synchronize the existing Wave 2 worktree with the latest DA lock/docs commits
2. branch from the locked DA lineage for PL
3. inspect actual current architecture before edits
4. add/adapt Polish presentation for Routes, Airports, Airlines, Countries and Delay Reasons
5. preserve canonical facts and canonical legal/classification values
6. localize from canonical/base meaning, not Swedish/Danish wording
7. verify visible display names, metadata, internal links, Related Routes, breadcrumbs/schema and Delay Reason assessment presentation
8. extend Wave 2 publication gate to PL only when quality is ready
9. verify canonical/hreflang/static params and sitemap arithmetic
10. typecheck + diff check
11. optimized Preview + representative rendered QA
12. one meaningful production build
13. checkpoint + lock PL
14. continue DE → FI → NL

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

# AFTER CURRENT WAVE 2

Portuguese first as a complete public/product locale, Spanish second. Then apply established Flight Number + coordinated Knowledge localization methods, validate canonical/hreflang/sitemap/build/rendering, and use sitemap as the primary scaling mechanism.

Premium UX/design/conversion uplift and the European market opportunity/acquisition model remain subsequent strategic tracks.

# CLAIMS OPERATIONS CONTEXT

Claims and localization remain separate workstreams. Do not accidentally stage or modify parked Reijo/manual-claim work.

# CRASH-RECOVERY ORDER

A new ChatGPT session should read:

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/checkpoints/2026-09-07-seo-localization-wave2-da-locked.md`
3. `docs/ROADMAP.md`
4. this file
5. relevant architecture/engine files
6. current GitHub branch/code/status

Then continue Polish Wave 2 without asking the user to reconstruct the session.
