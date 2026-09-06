# FlightClaimly — Product / SEO / Growth Roadmap

Last updated: **2026-09-06**

> Strategic roadmap. Exact crash recovery/current execution lives in `docs/CURRENT_SPRINT_LATEST.md`. Historical versions remain in Git history/checkpoints.

## Mission

FlightClaimly should become a trusted European knowledge and claims platform for flight disruption and passenger rights.

`Knowledge → Customer Acquisition`  
`Claims → Customer Recovery`  
`Resolved Claims → Better Intelligence → Better Knowledge`

## Strategic lanes

1. **SEO / Knowledge Acquisition** — Knowledge Engine, Localization Engine, internal linking, search monitoring.
2. **Product / Claims Operations** — eligibility, evidence, research, handling, airline submission, communication, escalation, payout.
3. **Growth / Content** — paid acquisition, verified content/social, conversion analytics and market expansion.

# CURRENT EXECUTION SEQUENCE

## Phase A — Research / Evidence foundation — 🟢 LOCKED

Research/Evidence Engine v1 foundation is locked. External integrations must use provider → registry → verification → resolver. Research does not silently become legal fact.

## Phase B — Flight Number Localization Wave 1 — 🟢 COMPLETE / LOCKED / RELEASED

Markets: `SV → DA → PL → DE → FI → NL`, with English as base.

Final locked scale:

- 2,841 canonical Flight Numbers
- 19,887 Flight Number detail paths across seven published locales
- 44 airline groups / 308 localized group paths
- 2,886 Flight Number sitemap URLs per market

Google handoff: sitemap is the scaling mechanism; use only representative strategic indexing requests, not thousands of manual submissions.

Do not rerun FlightAware or reopen Wave 1 merely for Wave 2 localization.

## Phase C — Localization Wave 2 — 🔵 ACTIVE

Wave 2 localizes the remaining major Knowledge cohorts as one coordinated package per market:

- Routes
- Airports
- Airlines
- Countries
- Delay Reasons

### Market status

`SV LOCKED → DA NEXT → PL → DE → FI → NL`

### Swedish foundation — 🟢 LOCKED 2026-09-06

Swedish Wave 2 is complete and locked.

Code lock commit:

`93e965af7c7f429084a787cc01fe833f6f7e86bb`

Detailed checkpoint:

`docs/checkpoints/2026-09-06-seo-localization-wave2-sv-locked.md`

SV established the reusable Wave 2 foundation rather than only translating copy. The completed architecture includes:

- deterministic localization builders for all five Wave 2 cohorts
- localized entity display-name support without forking canonical facts
- localized route/city/country presentation
- publication-aware internal Knowledge linking
- locale-preserving Related Routes behavior
- Delay Reason metadata localization
- separated localized Delay Reason assessment presentation from canonical classifications
- localized Delay Reason component labels/questions/badges
- localized breadcrumbs and FAQ schema
- coherent publication locale gates, static params, hreflang and sitemap behavior
- reusable rendered-QA / sitemap-arithmetic / Preview / production-lock procedure

SV lock verification included:

- Preview build 1,296 / 1,296
- typecheck green
- diff check green
- representative rendered QA across all five cohorts
- unsampled/dynamic Swedish route HTTP 200
- extraordinary=true and extraordinary=false Delay Reason QA
- Swedish BreadcrumbList + FAQPage schema QA
- Wave 2 scope confirmed EN+SV only
- sitemap expected 27,039 / actual 27,039
- production build **27,249 / 27,249 static pages**

### Danish — NEXT

DA should reuse the Swedish foundation, not recreate it.

Per-market execution remains:

1. localize from canonical/base meaning, never translation-chain from another locale
2. preserve canonical facts and legal/classification meaning
3. validate market-native terminology and SEO presentation
4. keep publication gated until locale quality is ready
5. validate metadata, display names, internal links, breadcrumbs/schema, canonical/hreflang and sitemap arithmetic
6. typecheck + diff check
7. optimized Preview + representative and unsampled rendered QA
8. stop Preview
9. one meaningful production build
10. checkpoint + lock

The remaining Wave 2 markets are expected to be materially faster than SV because the generic plumbing now exists, but each still requires real language/SEO/legal-meaning QA and a production lock gate.

### Worktree execution rule

Continue Wave 2 in the dedicated Wave 2 worktree lineage (`flightclaimly-wave2-sv` / `seo-localization-wave2-sv`) while the original `flightclaimly` worktree continues to hold unrelated parked Claims/Reijo changes. The separate folder is a Git worktree, not another project or fork.

Do not force-push. Do not stage/reset/clean unrelated Claims/Reijo files.

## Phase D — Portuguese + Spanish market expansion — ⏭️ AFTER CURRENT WAVE 2

First new language markets are explicitly:

1. **Portuguese — first**
2. **Spanish — second**

For each market:

1. add the language as a complete supported product/public-site locale
2. validate the customer-facing claim journey and core site copy
3. execute the Flight Number localization method established in Wave 1
4. execute Routes + Airports + Airlines + Countries + Delay Reasons as the coordinated Wave 2 package
5. validate canonical/hreflang/sitemap/build/rendering before publication
6. hand the market to Google through sitemap plus only a small representative set of strategic indexing requests

Portugal-first is a deliberate launch/growth choice, not a statement that Portugal has the larger absolute TAM.

## Phase E — Premium UX / Design / Conversion uplift

Perform a deliberate re-evaluation of the older public site and complete claim journey with current implementation capability. This is intended to be a material upscale, not cosmetic patching.

Review desktop + mobile:

landing/search entry → lookup → eligibility → passenger details → documents → claim → confirmation.

Scope:

- premium visual hierarchy
- typography/spacing
- trust/authority
- CTA clarity
- progress/navigation
- form friction/validation
- loading/error/empty/success states
- reassurance/copy
- responsive behavior
- useful microinteractions
- consistency between Knowledge pages and transactional flow
- performance/accessibility
- conversion instrumentation

## Phase F — European market opportunity + paid acquisition

Build a country-by-country TAM/SAM/SOM model using the best available evidence. Never confuse all delayed/disrupted passengers with compensation-eligible passengers.

Model **1%, 2%, 3% penetration** per market and translate into claims/day, pursued claims, successful recoveries, compensation volume and FlightClaimly gross commission.

Treat a 90%+ win rate as an aspirational success rate for screened/pursued claims, not for every raw submission.

Priority paid-acquisition laboratories currently:

- Portugal
- Spain
- Poland

Optimize acquisition against **cost per valid/profitable claim**, not CPC, clicks or raw leads. Measure the full funnel: traffic → started claim → submitted → valid/pursued → successful recovery → commission → CAC/payback.

Additional European language/market expansion (FR/IT/RO/CZ/HU/GR etc.) should be prioritized from the opportunity model rather than language population alone.

## Phase G — Search Console / Analytics quality cleanup

After Google has had reasonable time to process the new footprint, audit legacy duplicate/canonical issues, 404s, redirects, discovered-not-indexed and crawled-not-indexed. Sample current live URLs before changing code because Search Console can lag.

Improve analytics hygiene so internal/admin/development/automated traffic does not distort acquisition and conversion reporting.

# Claims Operations roadmap

- **Manual / Legacy Claim Engine** — generalized staff-approved onboarding without customer PII in source-controlled helpers.
- **Claims Desk Workflow v2** — living investigation workflow for evidence and unresolved questions.
- **Airline Submission Engine** — structured demands, evidence packages, airline-specific channels, authority, correspondence, deadlines/follow-up.
- **Customer Communication Engine** — verified claim-specific updates without premature conclusions.
- **Escalation Engine** — ADR, NEB/regulatory, legal review, litigation/counsel handoff and enforcement support.
- **Claims Intelligence** — resolved outcomes improve future evidence patterns, arguments, processing times and recovery playbooks.
- **Additional passenger-right regimes** — through deterministic authority/legal-rule/assessment architecture, not ad-hoc parallel logic.

# Content / Social roadmap

Verified Knowledge → idea/hook/script → founder expertise/recording → production → channels → analytics → iteration.

Content must be accurate, useful, modern and human, not written only for Google.

# Locked architectural principles

- canonical Knowledge facts remain locale-neutral
- localization is market-native adaptation, not translation chaining
- legal/factual meaning remains invariant across locales
- quality gates control publication; routing support does not equal SEO publication
- research and legal evaluation remain separate
- missing/conflicting facts remain unresolved until sufficiently verified
- production build/deployment optimization remains locked unless separately re-evaluated
- customer-specific data remains transactional and never leaks into source-controlled helpers
- no FlightAware rerun merely for localization
- locked locale work is not reopened without a concrete bug/legal/SEO reason

# Immediate pointer

**Now:** Danish Wave 2 using the locked Swedish foundation.  
**Then:** PL → DE → FI → NL.  
**Next expansion:** Portuguese first, Spanish second; full product locale first, then Flight Number + coordinated Knowledge localization.  
**Product:** premium UX/design/conversion uplift.  
**Growth:** European 1–3% market model + Portugal/Spain/Poland acquisition experiments.  
**Later:** Search Console legacy cleanup + analytics hygiene while Claims Operations and Content/Growth continue.
