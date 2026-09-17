# FLIGHTCLAIMLY — MASTER HANDOFF

Last updated: **2026-09-17**

## PURPOSE

This is the continuity handoff for ongoing FlightClaimly development, claims operations and growth. A new ChatGPT session should be able to resume without relying on the previous conversation window.

Repository state and current code beat conversational memory if they differ.

## NEW-CHAT READ ORDER

1. `docs/CURRENT_SPRINT_LATEST.md` — exact current execution pointer
2. this file — master continuity/context
3. `docs/ROADMAP.md` — strategic lanes and sequencing
4. `docs/checkpoints/2026-09-09-seo-localization-wave2-es-locked.md` — authoritative eight-locale SEO lock
5. relevant Claims docs/case material if the task is a claim
6. relevant UI/engine files if the task is product/growth
7. actual GitHub branch/code/status

Repository: `zamiocflight/FlightClaimly`

# WORKING STYLE

- Swedish conversation
- fast autonomous execution
- inspect actual repo/code before instructing changes
- use connected GitHub directly where safe
- only interrupt the user when local assistance is genuinely required
- when local action is required, always state **Terminal 1** or **Terminal 2** and give one exact command at a time
- Terminal 1 = dev server / localhost
- Terminal 2 = QA / git / build / deploy
- for code changes, be explicit whether a file is new, fully replaced or partially edited and give exact anchors/locations
- never force-push
- never use `git add .`
- never destructive reset/clean unrelated work
- do not send repetitive status chatter while autonomously building

# COMPANY / PRODUCT

Company: FLIGHTCLAIMLY OÜ  
Business: EU261 / UK261 flight compensation claims  
Standard customer pricing: **20% including VAT**  
Commercial model: **No win, no fee**

Current supported/localized public footprint:

`EN + SV + DA + PL + DE + FI + NL + ES`

FlightClaimly is past basic MVP construction. Core product, claim journey, admin/claims foundations, multilingual public site and a large programmatic Knowledge/SEO surface exist. The business is now transitioning toward **traction, acquisition, conversion learning and repeatable growth**, while real Claims Operations continues in parallel.

# LOCKED PRODUCT / CLAIMS FOUNDATIONS

- Delay Reason Engine v1 — LOCKED
- EU261 Legal Rule Layer v1 — LOCKED
- Claim Rights Assessment Engine v1 — LOCKED
- Claims Desk Assessment Integration phase 1 — VERIFIED
- Research / Evidence Engine v1 foundation — LOCKED
- Build / Deployment Cost Optimization — LOCKED
- Flight Number localization architecture — LOCKED for completed locales

# SEO / KNOWLEDGE ENGINE

Completed/locked localization sequence:

`SV → DA → PL → DE → FI → NL → ES`

Spanish was locked **2026-09-09**.

Authoritative checkpoint:

`docs/checkpoints/2026-09-09-seo-localization-wave2-es-locked.md`

ES code lock recorded there: `d3afd97`.

Do not reopen locked locales absent a concrete bug, SEO regression, legal correction or localization defect.

## Current eight-locale scale

- Routes: **3,141 canonical / 25,128 localized detail paths**
- Airports: **98 / 784**
- Airlines: **96 / 768**
- Countries: **36 / 288**
- Delay Reasons: **11 / 88**
- Flight Numbers: **2,841 / 22,728**
- Flight Number airline groups: **44 / 352 pages**

ES lock evidence included:

- typecheck passed
- final build **50,463 / 50,463**
- sitemap **50,256 total URLs / 6,281 ES URLs**
- Spanish hubs/details HTTP 200
- full Spanish claim journey through thanks
- actual Spanish runtime message catalog
- canonical + hreflang across all eight locales
- BreadcrumbList + FAQPage
- canonical Delay Reason classifications preserved
- diff check green
- clean lock worktree

## Why this SEO build matters

This is not a pile of translated thin pages. The architecture separates canonical Knowledge facts from localized presentation. Routes, airports, airlines, countries, delay reasons and flight numbers form coordinated searchable surfaces with relationships/internal linking, metadata, canonical/hreflang and structured data while canonical legal/classification values remain invariant. That gives FlightClaimly a broad long-tail acquisition surface without creating eight disconnected fact systems.

**Current posture:** pages are published and indexation needs time. SEO is now a background compounding channel while Growth ramps. Do not make panic changes because Google has not indexed everything immediately. Later Search Console work should be evidence-led: representative live URL checks, discovered/crawled-not-indexed, canonical issues, redirects/404s and indexation patterns.

No FlightAware rerun is required.

# I18N / HEADER RECOVERY

After the Spanish lock, runtime QA exposed a real locale/header regression. It was repaired on `fix/localized-desktop-header`.

## next-intl / HTML locale

Localized product routes previously could show localized content while root `<html lang>` remained `sv`. Root cause was an early `NextResponse.next()` in `src/middleware.ts` before `next-intl` could set `x-next-intl-locale`.

Supported localized product routes now pass through intl middleware. Runtime verification confirmed `/es` => `<html lang="es">` and `/fi` => `<html lang="fi">`.

## Message catalog parity

DA, DE, FI and PL were surgically repaired. Final recursive EN structure parity:

- DA MISSING 0 / EXTRA 0
- DE MISSING 0 / EXTRA 0
- ES MISSING 0 / EXTRA 0
- FI MISSING 0 / EXTRA 0
- NL MISSING 0 / EXTRA 0
- PL MISSING 0 / EXTRA 0
- SV MISSING 0 / EXTRA 0

Locale repair commit: `99ade82`.

## Locked desktop header baseline

- full wordmark does not shrink
- tracking CTA: 14px, normal padding, 20px icon
- EN/SV/DA/NL/PL nav: **15px / gap18**
- DE/FI: **14px / gap14**
- ES: **13px / gap9**
- ES header direct column-gap: **8px**
- ES outer left/right padding: **12px**
- no ES desktop hamburger fallback
- Spanish visual QA passed without clipping

Do not casually reopen this.

# PREMIUM UX — COMPLETED BASELINE + FUTURE EXPERIMENTS

Premium UX is no longer merely “next”. A first meaningful pass has been implemented and approved.

## Premium Pass 1 — approved

Files:

- `src/components/home/EligibilitySection.tsx`
- `src/components/home/FeeSection.tsx`
- `src/components/home/BrandStorySection.tsx`
- `src/components/home/ExploreSection.tsx`

These four home sections were visually approved. Preserve them absent a concrete regression or deliberate experiment.

## Hero — approved control

Files:

- `src/app/[locale]/page.tsx`
- `src/components/AirportInput.tsx`
- `src/app/globals.css`

The approved hero has a stronger premium navy card/elevation, clearer trust row, white route input surface, stronger emerald CTA, improved AirportInput clear control and restrained atmosphere. Failed over-glow/gradient and plane-connector experiments were reverted.

Approved premium/header checkpoint:

**`4645d1f` — `refine premium hero and stabilize Spanish header`**

Branch:

**`fix/localized-desktop-header`**

Treat this as the clean homepage/control baseline. The user compared it directly against the older live hero and strongly approved the uplift.

## Cinematic/social concept

A visual concept was generated with a warm premium airport scene, traveler/right-side travel context and FlightClaimly claim entry on the left. The user strongly liked it; Emma preferred the current simpler hero.

Strategic resolution: **do not force one aesthetic onto every traffic source.**

Potential architecture:

- normal localized homepage = clean **Control**
- dedicated social/campaign landing = emotional/cinematic **Challenger**

Same backend and claim engine. Different entry experience for different acquisition intent.

Desired emotional brand mix:

**confidence + authority + speed + hope + joy + desire + travel + positive payoff**

Avoid generic grey finance/claims aesthetics, but also avoid visual clutter and stock-photo cliché. Competitors can teach principles; do not clone their compositions.

The cinematic mockup contained three extra proof/trust items below the form; these were a mockup artifact and should not be copied because they duplicate trust messaging.

# ACTIVE BUSINESS PHASE — GROWTH LAB

This is the critical continuity point.

The founder has explicitly decided to push hard on **GROWTH**. Do not drag the project back into endless polish/localization before testing acquisition.

The existing product is good enough to meet real users. The first approximately **€1,000 paid-ad budget is a laboratory**. The objective is learning which creative, audience, source, landing experience and funnel behavior produce real claims.

## Channel stack

Run/prepare these as complementary channels:

- **organic SoMe**
- **TikTok / Instagram Reels creatives**
- **Meta paid**
- **TikTok paid**
- **UGC**
- **AI-UGC**
- **Fiverr/Billo creators**
- **direct influencer outreach** to relevant profiles the founder already follows
- **retargeting** once enough traffic exists
- **SEO** compounding/indexing in the background

Do not view these as mutually exclusive bets. AI gives cheap creative velocity; human UGC gives authenticity; influencers add distribution/social proof; paid media measures/scales; SEO compounds independently.

# CREATIVE STRATEGY

The established FlightClaimly short-form default is **7–8 seconds** for TikTok/Reels when using POV, humor, airport/travel footage, meme/native-feed concepts or rapid hooks.

Pattern:

`hook immediately → disruption/opportunity → up to €600 → FlightClaimly / CTA`

Do not default to 15–30 seconds merely because generic ad advice says so.

Longer 15–30 second creatives are valid when a human/UGC/talking-head person genuinely carries retention and explains the proposition.

## Creative sourcing being evaluated

### Creatify
AI-UGC for rapid cheap variants. Compare actual output quality before committing to volume.

### Arcads
AI-UGC/actor option. Main question is whether realism/output is materially better enough to justify price.

### Fiverr
The founder has started browsing Fiverr. Important distinction:

- a **video editor** expects supplied raw material and edits/captions/cuts it
- a **Human UGC creator** can take FlightClaimly brief/script, film themselves, edit and deliver finished vertical ad creative

For the immediate need, search primarily for the second category unless raw footage already exists.

### Billo
Interesting creator-marketplace route for finished UGC and potentially creator posting/paid-social usage.

### Direct influencers
Later reach directly to relevant travel/lifestyle/humor creators the founder already likes/follows on Instagram/TikTok. Potential structures include fixed content fee, affiliate/CPA or hybrid. If their content will be used as paid creative, agree usage/whitelisting/partnership-ad rights explicitly.

## Initial volume

Do not generate 30–50 ads blindly. Start with roughly **6–10 genuinely different creatives/hooks**, learn, then multiply winners.

# PAID ACQUISITION / MEASUREMENT

Before meaningful spend, instrumentation should distinguish at minimum:

`landing page view → airport interaction → route completed → check clicked → claim started → claim completed`

Preserve UTM/source/campaign/ad context.

As data matures, optimize against:

**valid/profitable claim → pursued claim → successful recovery → commission / CAC / payback**

Do not optimize the company around cheap CPC or vanity clicks.

Use the first €1,000 surgically. Avoid spreading budget across too many tiny tests. Detect obvious losers early and reallocate toward stronger downstream behavior.

# LANDING / FUNNEL EXPERIMENTS

## Control vs social challenger

Keep approved homepage as control. Build a separate social landing only as a deliberate experiment, with more emotional travel imagery and a focused conversion path for lower-intent social traffic.

Measure claim starts/completions by landing experience rather than deciding only from aesthetics.

## Route-first vs disruption-first

Competitor review showed AirHelp/Flyhjælp often ask disruption type first. FlightClaimly currently leads with route/airports, which communicates utility and may suit high-intent users.

Do not overhaul based on competitor behavior alone. Instrument first. If the hero has substantial non-start/drop-off, test:

`Delayed / Cancelled / Other` first vs current route-first.

# CLAIMS OPERATIONS — PARALLEL, REAL-WORLD LEARNING

The founder has spent several recent days working deeply on three real claims/cases. This is not a distraction from the product; it is operational learning that should feed Claims playbooks without contaminating canonical/legal logic.

Known named workstreams include:

- LOT / David — rerouting/care dispute after TLV disruption
- TAP / Reijo — legacy Finnish customer case
- Vanessa — newer active case

**Do not rely on this handoff for case facts.** Before acting on a claim, read the relevant Claims Desk/case docs and current evidence. Legal positions must be evidence-driven and case-specific.

Claims and premium/growth work remain separate Git workstreams.

# WORKSPACE / EMAIL SIDE NOTE

The founder recently considered moving some current Google Workspace aliases/labels (e.g. marketing/claims/info/admin-style addresses) toward true separate mailboxes/shared inbox behavior. This is an operations question, not part of the current code roadmap. Do not let it derail Growth unless the inbox structure becomes an actual bottleneck.

# NEXT MARKET EXPANSION

Planned next locale order remains:

`FR → IT → PT`

However, growth is now a first-class active lane. Do not automatically start FR merely because old docs said “after premium”. Existing eight-locale SEO pages need time to index while acquisition experiments begin. Reassess sequencing from business impact.

# WORKTREE / GIT SAFETY

Active premium/growth worktree:

`flightclaimly-wave2-sv`

Active branch:

`fix/localized-desktop-header`

Approved premium/header code checkpoint before docs refresh:

`4645d1f`

Original worktree `flightclaimly` contains parked unrelated Claims/Reijo work last recorded as:

- `M docs/CLAIMS_DESK.md`
- `M scripts/test-manual-claim.ts`
- `?? scripts/create-reijo-claim.ts`

Do not touch/reset/clean/stage those from the growth workstream.

Rules:

- no `git add .`
- no force push
- no destructive reset/clean
- no unnecessary new worktrees
- no FlightAware rerun merely for UX/localization/growth
- inspect actual files before editing
- customer PII stays out of generic source-controlled helpers
- locked locale work remains immutable absent concrete regression
- translation is not legal validation

# DEPLOYMENT STATE CAUTION

`4645d1f` is the pushed approved premium/header checkpoint. Do **not** assume it is production-deployed without checking current deployment state. The production site used for the user's visual comparison still represented the older hero at that point.

Before deliberate production deploy, inspect actual status and run appropriate QA/typecheck/build gates.

# STRATEGIC NORTH STAR

FlightClaimly's current flywheel should be understood as:

**SEO Knowledge footprint indexes and compounds**  
**+ organic social creates awareness**  
**+ short-form/UGC creates attention**  
**+ paid media buys controlled learning**  
**+ landing/funnel instrumentation reveals conversion behavior**  
**+ real Claims Operations improves operational intelligence**  
**→ more valid claims → more outcomes/data → stronger product/content/acquisition**

The next step is not to guess what customers love. It is to put the already-strong product in front of people, measure where they respond/drop, and iterate surgically.

# EXACT RESUME INSTRUCTION

**Read `docs/CURRENT_SPRINT_LATEST.md`, this file, `docs/ROADMAP.md`, then inspect actual branch/code. Preserve the approved Premium Pass and hero/header baseline. Resume Growth Lab work: conversion tracking, initial 6–10 creatives, AI-UGC vs human-UGC sourcing, Meta/TikTok paid test design, organic SoMe, influencer outreach planning and a measured social/cinematic landing challenger. Keep SEO indexation running in the background and Claims Operations as a separate parallel workstream. Do not restart old localization work or touch parked Claims files without an explicit task.**
