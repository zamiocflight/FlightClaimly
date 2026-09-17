# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-17**

> **AUTHORITATIVE CRASH-RECOVERY / NEW-CHAT POINTER. READ THIS FIRST.**
>
> Repository state and the latest lock/checkpoint beat conversational memory if they differ.

## New-chat startup protocol

A fresh ChatGPT session should read, in this order:

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/FLIGHTCLAIMLY_HANDOFF.MD`
3. `docs/ROADMAP.md`
4. `docs/checkpoints/2026-09-09-seo-localization-wave2-es-locked.md`
5. relevant architecture/engine/UI files for the task at hand
6. actual current GitHub branch/code/status

Connected repository: `zamiocflight/FlightClaimly`.

# WHERE WE ARE NOW

FlightClaimly is no longer in a simple MVP/build phase. The core product, claims foundations, multilingual public site and large programmatic SEO footprint exist. The immediate strategic shift is:

**product + SEO foundation → traction / acquisition / conversion learning → repeatable growth engine**

Claims Operations continues in parallel. The user has been working intensively on three real claims/cases for several days; do not confuse that workstream with the public-site/growth workstream or accidentally stage parked Claims files.

## Locked foundations

- Delay Reason Engine v1 — LOCKED
- EU261 Legal Rule Layer v1 — LOCKED
- Claim Rights Assessment Engine v1 — LOCKED
- Claims Desk Assessment Integration phase 1 — VERIFIED
- Research / Evidence Engine v1 foundation — LOCKED
- Build / Deployment Cost Optimization — LOCKED
- Flight Number localization architecture — LOCKED for completed locales

# SEO / KNOWLEDGE ENGINE — BUILT, PUBLISHED, NOW WAITING FOR INDEXATION

Public/product + programmatic localization covers eight locales:

`EN + SV + DA + PL + DE + FI + NL + ES`

Wave 2 sequence is complete through Spanish:

`SV LOCKED → DA LOCKED → PL LOCKED → DE LOCKED → FI LOCKED → NL LOCKED → ES LOCKED`

Spanish lock checkpoint:

`docs/checkpoints/2026-09-09-seo-localization-wave2-es-locked.md`

ES code lock recorded there: `d3afd97`.

Do not reopen ES or any previously locked locale without a concrete bug, SEO regression, legal correction or localization defect.

## Secured SEO scale across eight locales

- canonical Flight Numbers: **2,841**
- represented Flight Number airline groups: **44**
- Routes: **3,141 canonical / 25,128 localized detail paths**
- Airports: **98 canonical / 784 localized detail paths**
- Airlines: **96 canonical / 768 localized detail paths**
- Countries: **36 canonical / 288 localized detail paths**
- Delay Reasons: **11 canonical / 88 localized detail paths**
- Flight Numbers: **22,728 localized detail paths**
- Flight Number airline-group pages: **352**

ES lock verification recorded a production build of **50,463 / 50,463** static generations and sitemap of **50,256 URLs**, including **6,281 Spanish URLs**.

This footprint is deliberately not thin translated filler. It is built around canonical locale-neutral entities/facts, coordinated localized route/airport/airline/country/delay-reason/flight-number surfaces, internal relationships, self-canonicals, hreflang, structured data and market-native presentation while keeping legal/classification values canonical. That architecture is the reason the programmatic surface can scale without treating each locale as a disconnected copy of the site.

**Current SEO posture:** the pages are out in the wild and Google/indexation needs time. Do not panic-edit the architecture merely because indexing is not instantaneous. Let Search Console/indexation develop, monitor representative URLs and later audit discovered-not-indexed/crawled-not-indexed/canonical/404 patterns from actual evidence. No FlightAware population rerun is required.

# PREMIUM UX — FIRST PASS COMPLETED / APPROVED BASELINE

Premium work moved from audit into implementation.

## Approved home sections

Premium Pass 1 was completed and visually approved for:

- `src/components/home/EligibilitySection.tsx`
- `src/components/home/FeeSection.tsx`
- `src/components/home/BrandStorySection.tsx`
- `src/components/home/ExploreSection.tsx`

Do not churn these four sections absent a concrete regression or a deliberate later conversion experiment.

## Approved hero / airport form baseline

The hero was refined to feel materially more premium while preserving the clean, high-intent claim-entry experience. Approved direction includes:

- stronger dark navy authority/elevation
- cleaner trust presentation
- premium white route input container
- stronger emerald CTA and interaction states
- cleaner AirportInput clear control without a permanent grey circle
- restrained atmosphere; avoid washed-out/burnt-looking glow experiments
- original subtle vertical FROM/TO divider retained; plane-icon experiments were rejected and reverted

Relevant files:

- `src/app/[locale]/page.tsx`
- `src/components/AirportInput.tsx`
- `src/app/globals.css`

Approved premium/header checkpoint commit: **`4645d1f`** (`refine premium hero and stabilize Spanish header`) on branch **`fix/localized-desktop-header`**.

The user compared the approved localhost hero against the older live version and explicitly preferred the uplift. Treat `4645d1f` as the safe visual baseline.

## Emotional / cinematic concept — NOT implemented in code

A separate concept was explored using a warm premium airport/travel image with a traveler on the right and the FlightClaimly claim-entry experience on the left. The user strongly liked the concept; Emma preferred the simplicity of the current clean hero.

Do **not** resolve this by randomly redesigning the main homepage. The strategic conclusion was better: keep the clean homepage as a **control/baseline**, and potentially build a separate **social/campaign landing page** with more emotion, travel, hope and desire.

Brand goal is not grey finance. FlightClaimly should combine:

**confidence + authority + speed + hope + joy + travel desire + positive “YES” payoff**

Do not copy AirHelp/Flyhjælp. Competitor analysis is inspiration for principles, not visual cloning.

The generated cinematic mockup accidentally contained extra proof/trust items below the form; those were a mockup artifact and are **not** a recommendation because they duplicate existing trust messaging.

# HEADER / I18N — REPAIRED AND LOCKED

Concrete regressions after ES lock were repaired on `fix/localized-desktop-header`.

- localized routes now correctly pass through `next-intl`; `/es` verified `<html lang="es">`, `/fi` verified `<html lang="fi">`
- message catalogs DA/DE/ES/FI/NL/PL/SV reached recursive EN structure parity: MISSING 0 / EXTRA 0
- locale repair commit: `99ade82`
- full FlightClaimly wordmark protected from shrinking
- tracking CTA remains normal/readable: 14px, normal padding, 20px icon
- desktop nav baseline: EN/SV/DA/NL/PL **15px / gap18**
- DE/FI **14px / gap14**
- ES **13px / gap9**
- ES direct header column-gap **8px** and outer left/right padding **12px**
- no ES desktop hamburger fallback
- Spanish header was visually confirmed fixed without clipping

Do not casually reopen this.

# ACTIVE PHASE — GROWTH LAB

This is the most important strategic resume point.

The next major offensive is not more indiscriminate product polishing. FlightClaimly needs real users, real acquisition data and a repeatable growth loop.

The user has decided to push hard on GROWTH. Treat the first roughly **€1,000 paid-media budget as a laboratory / learning budget**, not a vanity traffic purchase.

## Growth channels to develop in parallel

- organic social media
- TikTok / Instagram Reels creatives
- Meta paid acquisition
- TikTok paid acquisition
- UGC
- AI-UGC
- Fiverr/Billo human creators
- direct influencer outreach to creators the founder already follows/likes
- retargeting once enough traffic exists
- SEO continuing to compound/index in the background

## Creative strategy

Default short-form creative for TikTok/Reels is **~7–8 seconds**, not generic 15–30 second ads.

Short-form pattern:

**instant hook → disruption/opportunity → up to €600 → FlightClaimly/action**

Longer 15–30 second creative is appropriate when a real/UGC/talking-head person genuinely carries retention and explains the proposition.

Creative should feel native to the feed, not like a slow corporate commercial.

Current sourcing exploration:

- **Creatify** — AI-UGC / rapid variant testing
- **Arcads** — AI-UGC / realism comparison
- **Fiverr** — distinguish editors from actual Human UGC creators; seek creators who can take a brief/script, film themselves, edit and deliver finished 9:16 paid-ad creative
- **Billo** — creator marketplace / finished UGC
- **direct influencers** — later outreach for authentic content + distribution and potentially paid usage/affiliate/CPA structures

For paid use, explicitly verify usage rights, duration/territory and whitelisting/partnership-ad rights where relevant.

Do not manufacture 50 creatives before learning anything. Initial goal is a manageable set of genuinely different creatives/hooks (roughly 6–10), then use performance data to decide what deserves replication.

# PAID ACQUISITION — SURGICAL TESTING

Before meaningful paid spend, conversion instrumentation must allow us to distinguish at least:

`landing page view → airport interaction → route completed → check clicked → claim started → claim completed`

Preserve source/campaign/ad/UTM context. Optimize eventually against **valid/profitable claims and completed claims**, not CPC or raw clicks.

The first €1,000 should be used iteratively: detect obvious losers early, preserve budget, move spend toward creatives/audiences/landing experiences that generate meaningful downstream behavior. Avoid splitting the budget across so many variants that no test can learn anything.

## Landing-page experiment

Do not replace the approved clean homepage merely because the cinematic concept looks exciting.

Proposed experiment architecture:

- normal localized homepage = **Control**
- dedicated social/campaign landing = **Challenger**, more emotional/cinematic and optimized for lower-intent social traffic
- same backend / claim engine / brand system
- measure claim-start and claim-completion behavior separately by source and landing experience

A second future funnel experiment may test **disruption-first** (`Delayed / Cancelled / Other`) versus current **route-first** entry. Competitors such as AirHelp/Flyhjælp use disruption-first in places, but do not copy it blindly; test from FlightClaimly data.

# CLAIMS OPERATIONS — PARALLEL WORKSTREAM

The founder has spent the last several days actively working three real cases. Claims work is valuable operational learning and continues in parallel with growth.

Known named case work includes the LOT/David rerouting-care dispute, TAP/Reijo legacy Finnish case and the newer Vanessa case. Case-specific evidence/facts must be read from the relevant Claims docs/current case material before acting; do not reconstruct legal facts from this growth handoff.

Do not modify parked Claims files from the premium/growth worktree.

# NEXT MARKET EXPANSION

Previously planned order remains:

`FR → IT → PT`

But do **not** let localization expansion automatically displace the current growth lab. The immediate business priority is learning acquisition/conversion while the existing eight-locale SEO footprint indexes. New-market work resumes deliberately when growth/product priorities allow.

# WORKTREE / GIT SAFETY

Active premium/growth worktree:

`flightclaimly-wave2-sv`

Active branch:

`fix/localized-desktop-header`

Approved code checkpoint before this documentation refresh:

`4645d1f`

Original worktree `flightclaimly` contains unrelated parked Claims/Reijo work last recorded as:

- `M docs/CLAIMS_DESK.md`
- `M scripts/test-manual-claim.ts`
- `?? scripts/create-reijo-claim.ts`

Never stage/reset/clean those files from this workstream.

Rules:

- no `git add .`
- no force push
- no destructive reset/clean
- no unnecessary new worktrees
- no FlightAware rerun merely for localization/UX/growth
- inspect actual file contents before modifying existing code
- preserve locked locales absent concrete regression
- translation is not legal validation
- do not touch Claims/Reijo from the growth worktree
- if local assistance is required, always state **Terminal 1** or **Terminal 2** and give one exact command at a time

Terminal convention:

- **Terminal 1** = dev server / localhost
- **Terminal 2** = QA / git / build / deploy

# DEPLOYMENT / QA CAUTION

`4645d1f` is pushed and is the approved premium/header checkpoint. Do not assume from this document alone that this premium checkpoint is deployed to production. Verify actual branch/deployment state before claiming it is live.

Before a deliberate premium production deploy, verify current worktree and run the appropriate gates, including typecheck/build as required.

# EXACT RESUME ACTION

**Fresh session: read this file, `docs/FLIGHTCLAIMLY_HANDOFF.MD`, `docs/ROADMAP.md`, the ES lock checkpoint, then inspect actual branch/code. Do not restart old localization or redo approved Premium Pass work. Resume the Growth Lab: verify conversion instrumentation, design the initial 6–10 short-form creative tests, compare AI-UGC/human-UGC sourcing, prepare Meta/TikTok paid experiments, and design the separate social/cinematic landing challenger without damaging the clean control. SEO continues indexing in the background; Claims Operations continues as a separate parallel workstream.**
