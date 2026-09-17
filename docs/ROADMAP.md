# FlightClaimly — Product / SEO / Growth Roadmap

Last updated: **2026-09-17**

> Strategic roadmap. Exact crash recovery/current execution lives in `docs/CURRENT_SPRINT_LATEST.md`. Master continuity lives in `docs/FLIGHTCLAIMLY_HANDOFF.MD`.

## Mission

FlightClaimly should become a trusted European knowledge and claims platform for flight disruption and passenger rights.

`Knowledge → Customer Acquisition`  
`Claims → Customer Recovery`  
`Resolved Claims → Better Intelligence → Better Knowledge/Growth`

## Strategic lanes

1. **SEO / Knowledge Acquisition** — Knowledge Engine, localization, internal linking, indexation/search monitoring.
2. **Product / Claims Operations** — eligibility, evidence, research, handling, airline submission, communication, escalation, payout.
3. **Growth / Content / Paid Acquisition** — organic social, creatives, UGC, paid media, landing experiments, conversion analytics, retargeting and creator partnerships.
4. **Premium Product / Conversion** — deliberate UX improvements driven by brand quality and increasingly by actual funnel data.

# CURRENT EXECUTION SEQUENCE

## Phase A — Research / Evidence foundation — 🟢 LOCKED

Research/Evidence Engine v1 foundation is locked. External integrations must use provider → registry → verification → resolver. Research does not silently become legal fact.

## Phase B — Flight Number / Knowledge localization foundation — 🟢 LOCKED THROUGH ES

Reusable localization architecture is established and validated across:

`EN + SV + DA + PL + DE + FI + NL + ES`

Canonical scale:

- Flight Numbers: **2,841**
- Flight Number airline groups: **44**
- Routes: **3,141**
- Airports: **98**
- Airlines: **96**
- Countries: **36**
- Delay Reasons: **11**

Eight-locale localized detail scale:

- Routes: **25,128**
- Airports: **784**
- Airlines: **768**
- Countries: **288**
- Delay Reasons: **88**
- Flight Numbers: **22,728**
- Flight Number airline groups: **352**

The architecture is valuable because canonical facts remain locale-neutral while localized presentation, relationships/internal linking, metadata, canonical/hreflang and structured data scale coherently. It is not intended to be thin translation spam.

Do not rerun FlightAware or reopen locked localization merely to continue product/growth work.

## Phase C — Localization Wave 2 — 🟢 COMPLETE THROUGH SPANISH

Market status:

`SV LOCKED → DA LOCKED → PL LOCKED → DE LOCKED → FI LOCKED → NL LOCKED → ES LOCKED`

Spanish lock date: **2026-09-09**.

Checkpoint:

`docs/checkpoints/2026-09-09-seo-localization-wave2-es-locked.md`

Lock verification includes:

- typecheck green
- production build **50,463 / 50,463**
- sitemap **50,256 total URLs / 6,281 Spanish URLs**
- hubs + representative details runtime QA
- full Spanish claim journey through thanks
- actual Spanish message catalog runtime confirmation
- canonical/hreflang across all eight locales
- BreadcrumbList + FAQPage
- canonical Delay Reason classifications preserved
- diff check green
- clean lock working tree

### Current SEO phase — 🟡 INDEXATION / COMPOUNDING

The large eight-locale footprint is now waiting for Google to discover/crawl/index it over time. Do not interpret non-instant indexation as failure and do not churn the architecture without evidence.

SEO runs in the background while Growth becomes active. Later Search Console/indexation work should sample live URLs and diagnose actual discovered-not-indexed, crawled-not-indexed, canonical, redirect and 404 patterns before code changes.

## Phase D — Premium UX / Design / Conversion uplift — 🟢 FIRST PASS COMPLETE, ITERATION CONTINUES

Premium Pass 1 is implemented and visually approved for the main home sections. The hero/header/airport-entry baseline was also materially upgraded and approved.

Approved checkpoint:

**`4645d1f` — `refine premium hero and stabilize Spanish header`**

Approved surfaces include:

- Eligibility
- Fee
- Brand Story
- Explore
- hero elevation/trust/input/CTA treatment
- AirportInput clear-control polish
- localized desktop header stability

Preserve the approved clean homepage as the **control**. Further premium work is allowed, but it should increasingly be driven by a concrete brand/conversion hypothesis rather than endless cosmetic churn.

A cinematic/emotional airport/traveler concept is promising as a **separate social/campaign landing challenger**, not an automatic replacement of the clean homepage.

Desired brand mix:

`confidence + authority + speed + hope + joy + travel desire + positive payoff`

## Phase E — Growth Lab / Traction — 🔵 ACTIVE PRIMARY BUSINESS PHASE

The founder has explicitly decided to push hard on growth. The product is strong enough to meet real users. The immediate job is to create acquisition loops and learn from real behavior.

### Organic / creator stack

- organic social media
- TikTok/Reels native short-form
- UGC
- AI-UGC
- Fiverr human UGC creators
- Billo creators
- direct outreach to relevant influencers the founder already follows
- later creator/affiliate/CPA/hybrid structures where economics support them

### Paid stack

- Meta paid acquisition
- TikTok paid acquisition
- retargeting after sufficient traffic
- roughly **€1,000 initial paid-media test budget** treated as a laboratory, not a scale budget

### Short-form creative rule

Default non-talking-head TikTok/Reels creative: **~7–8 seconds**.

`instant hook → disruption/opportunity → up to €600 → FlightClaimly/action`

Longer creative is acceptable when a real/UGC/talking-head person carries retention and needs time to explain.

Initial creative set should be roughly **6–10 genuinely different hooks/concepts**, not dozens of blind variations.

### Creative sourcing tests

- **Creatify** — AI-UGC velocity
- **Arcads** — compare realism/value against Creatify
- **Fiverr** — prioritize true UGC creators who script/film/edit/deliver, not merely editors, unless raw footage already exists
- **Billo** — human creator marketplace
- **direct influencers** — authentic content + possible distribution

Paid usage rights/whitelisting/territory/duration must be explicit where relevant.

### Measurement gate

Before meaningful spend, track at minimum:

`landing page view → airport interaction → route completed → check clicked → claim started → claim completed`

Carry source/campaign/ad/UTM context.

As volume grows, optimize toward:

`valid/profitable claim → pursued → recovered → commission → CAC/payback`

Not CPC, impressions or raw clicks.

### Landing experiment

- approved clean homepage = **Control**
- dedicated emotional/cinematic social landing = **Challenger**
- same claim engine/backend
- measure downstream conversion by source/landing

Potential later funnel experiment:

- current route-first entry
- versus disruption-first (`Delayed / Cancelled / Other`)

Do not copy competitor funnels blindly; instrument and test.

## Phase F — Claims Operations — 🟦 PARALLEL ACTIVE

Real cases are being worked while Growth ramps. The founder has recently spent several days deep in three active cases, including LOT/David, TAP/Reijo and Vanessa.

Claims Operations roadmap remains:

- Manual / Legacy Claim Engine
- Claims Desk Workflow v2
- Airline Submission Engine
- Customer Communication Engine
- Escalation Engine
- Claims Intelligence from resolved outcomes
- additional passenger-right regimes through deterministic legal architecture

Case-specific facts must come from Claims docs/evidence, not from this strategic roadmap.

## Phase G — New market expansion — ⏭️ FR → IT → PT

Planned order remains:

1. French
2. Italian
3. Portuguese

But this is no longer an automatic immediate next action. Existing eight-locale SEO needs time to index and Growth now has a strong business case for priority. Reassess timing deliberately.

When a new locale is started, it remains a complete package:

1. public/product locale
2. complete claim journey
3. Flight Number localization
4. Routes + Airports + Airlines + Countries + Delay Reasons
5. canonical facts/legal meaning preserved
6. market-native terminology/SEO
7. metadata/internal links/schema/canonical/hreflang/sitemap
8. typecheck/build/render QA
9. checkpoint and lock

## Phase H — Search Console / Analytics quality cleanup

After Google has had reasonable processing time:

- indexation sampling
- discovered-not-indexed / crawled-not-indexed
- legacy duplicate/canonical issues
- 404s / redirects
- analytics hygiene
- internal/admin/dev/automated traffic exclusion where appropriate

Never “fix” Search Console lag from stale reports without checking representative live URLs.

# GROWTH FLYWHEEL

The intended FlightClaimly system is:

**programmatic SEO indexes and compounds**  
**+ organic social creates repeated awareness**  
**+ 7–8s native creatives create attention**  
**+ AI-UGC cheaply explores hooks**  
**+ human UGC/influencers add authenticity and distribution**  
**+ paid Meta/TikTok buys controlled learning**  
**+ retargeting recaptures warmed traffic**  
**+ conversion instrumentation reveals what actually works**  
**+ real claims improve operational intelligence**  
**→ more valid claims → more recoveries/data → stronger content/product/acquisition**

# Locked architectural principles

- canonical Knowledge facts remain locale-neutral
- localization is market-native adaptation, not translation chaining
- legal/factual meaning remains invariant across locales
- quality gates control publication; routing support does not equal SEO publication
- research and legal evaluation remain separate
- missing/conflicting facts remain unresolved until sufficiently verified
- production build/deployment optimization remains locked unless separately re-evaluated
- customer-specific data remains transactional and never leaks into generic source-controlled helpers
- no FlightAware rerun merely for localization/growth
- locked locale work is not reopened without a concrete bug/legal/SEO reason
- no destructive Git recovery, force push or broad staging

# Immediate pointer

**Now:** Growth Lab — tracking, initial creatives, AI/human UGC sourcing, organic SoMe, Meta/TikTok tests, influencer outreach planning and social-landing challenger.  
**In parallel:** three real Claims Operations cases.  
**Background:** allow the eight-locale SEO footprint to index/compound; monitor rather than churn.  
**Product:** preserve approved Premium Pass/control, then make further UX changes from concrete hypotheses/data.  
**Later:** FR → IT → PT when business priority supports it; Search Console/indexation cleanup after sufficient processing time.
