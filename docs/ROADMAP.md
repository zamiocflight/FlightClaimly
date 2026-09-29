# FlightClaimly — Product / SEO / Growth Roadmap

Last updated: **2026-09-09**

> Strategic roadmap. Exact crash recovery/current execution lives in `docs/CURRENT_SPRINT_LATEST.md`. Historical detail remains in Git history and locale checkpoints.

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

## Phase B — Flight Number / Knowledge localization foundation — 🟢 LOCKED THROUGH ES

The reusable localization architecture is established and validated across:

`EN + SV + DA + PL + DE + FI + NL + ES`

Current canonical scale:

- Flight Numbers: **2,841**
- Flight Number airline groups: **44**
- Routes: **3,141**
- Airports: **98**
- Airlines: **96**
- Countries: **36**
- Delay Reasons: **11**

Eight-locale localized detail scale after ES lock:

- Routes: **25,128**
- Airports: **784**
- Airlines: **768**
- Countries: **288**
- Delay Reasons: **88**
- Flight Numbers: **22,728**
- Flight Number airline groups: **352**

Do not rerun FlightAware or reopen locked localization merely to continue product work.

## Phase C — Localization Wave 2 — 🟢 COMPLETE THROUGH SPANISH

Market status:

`SV LOCKED → DA LOCKED → PL LOCKED → DE LOCKED → FI LOCKED → NL LOCKED → ES LOCKED`

Spanish lock date: **2026-09-09**.

Spanish checkpoint:

`docs/checkpoints/2026-09-09-seo-localization-wave2-es-locked.md`

ES lock verification includes:

- typecheck green
- final production build **50,463 / 50,463**
- sitemap **50,256** total URLs / **6,281** Spanish URLs
- hubs + representative detail runtime QA
- full tested Spanish claim journey through thanks
- actual Spanish message catalog runtime confirmation
- canonical/hreflang across all eight locales
- BreadcrumbList + FAQPage
- canonical Delay Reason classifications preserved
- diff check green
- clean lock working tree

Locked locales are immutable unless a concrete bug, SEO regression, legal correction or localization defect is found.

## Phase D — Premium UX / Design / Conversion uplift — 🔵 ACTIVE NEXT

This phase happens **before FR/IT/PT expansion** so the next languages inherit the improved product rather than multiplying older UX debt.

First perform an audit of the actual implementation, then make deliberate changes.

Review desktop + mobile across:

landing/search entry → lookup → eligibility → passenger details → documents → claim → confirmation.

Also review Knowledge/SEO landing pages as acquisition-to-claim conversion surfaces.

Scope:

- premium European claims/fintech visual hierarchy
- typography and spacing system
- trust and authority presentation
- 20% incl. VAT / no-win-no-fee clarity
- EU261 credibility without legal clutter
- CTA hierarchy
- progress/navigation
- form friction and validation
- loading/error/empty/success states
- reassurance/copy hierarchy
- responsive/mobile behavior
- useful microinteractions
- consistency between Knowledge and transactional surfaces
- accessibility and performance
- conversion instrumentation

Non-negotiable preservation gates:

- SEO semantics/indexation architecture
- canonical/hreflang behavior
- structured data
- i18n architecture
- locked legal/factual meaning
- claim-flow behavior and data integrity
- accessibility/performance

The premium phase must end with its own QA/checkpoint before language expansion resumes.

## Phase E — New market expansion — ⏭️ FR → IT → PT

Current expansion order:

1. **French (FR)**
2. **Italian (IT)**
3. **Portuguese (PT)**

For each market:

1. add a complete supported product/public-site locale
2. validate the complete customer-facing claim journey
3. apply the established Flight Number localization method
4. apply Routes + Airports + Airlines + Countries + Delay Reasons as a coordinated package
5. preserve canonical facts and legal/classification meaning
6. validate market-native terminology and SEO presentation
7. validate metadata, internal links, breadcrumbs/schema, canonical/hreflang and sitemap arithmetic
8. typecheck/build/render QA
9. checkpoint and lock before moving to the next market

Use sitemap as the mass-discovery mechanism; manual indexing requests should remain representative and strategic.

## Phase F — European market opportunity + paid acquisition

Build a country-by-country TAM/SAM/SOM model using the best available evidence. Never confuse all delayed/disrupted passengers with compensation-eligible passengers.

Model **1%, 2%, 3% penetration** per market and translate into claims/day, pursued claims, successful recoveries, compensation volume and FlightClaimly gross commission.

Treat a 90%+ win rate as an aspirational success rate for screened/pursued claims, not every raw submission.

Optimize acquisition against **cost per valid/profitable claim**, not CPC, clicks or raw leads. Measure traffic → started claim → submitted → valid/pursued → successful recovery → commission → CAC/payback.

## Phase G — Search Console / Analytics quality cleanup

After Google has had reasonable time to process the enlarged footprint, audit legacy duplicate/canonical issues, 404s, redirects, discovered-not-indexed and crawled-not-indexed. Sample live URLs before changing code because Search Console can lag.

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
- no destructive Git recovery, force push or broad staging

# Immediate pointer

**Now:** premium UX/upscale audit from the actual current code, then premium implementation and QA/checkpoint.  
**Then:** FR → IT → PT complete localization packages.  
**Growth:** European 1–3% market model and acquisition experiments.  
**Later:** Search Console legacy cleanup + analytics hygiene while Claims Operations and Content/Growth continue.

## 2026-09-29 — OTTERLY / AI AUTHORITY GROWTH PIVOT

This section supersedes older "active next" pointers that name Premium UX or FR/IT/PT as the immediate task. Those phases remain historical/planned work and are not deleted.

### Current business priority
Traffic / conversion / claims now outrank additional product polish or locale expansion. Near-term target: **3–6 submitted claims/day by 2026-11-30**.

### Completed authority work
- Dedicated /fees authority hub localized in EN/SV/DA/DE/NL/PL/FI/ES.
- Comparison authority system live across all eight locales for ReFly, AirHelp, AirAdvisor and SkyRefund.
- Comparison pages use dated, primary-source competitor pricing and factual customer-net arithmetic.
- Search Console manual indexing was used until the daily quota was reached; sitemap/internal links remain the mass-discovery mechanism.

### Otterly baseline — 2026-09-29
Fixed UK/English 15-prompt baseline established. FlightClaimly started at **0 mentions**. Key observed competitors: AirHelp 40, Flightright 28, Skycop 20, AirAdvisor 19, SkyRefund 6, ClaimCompass 5, ReFly 1.

Do not change the prompt set when measuring progress. First ladder: first mention -> pass ReFly -> 5+ mentions / ClaimCompass-SkyRefund neighborhood -> recurring entity.

### Current execution sequence
1. Finish external-authority/citation map from the Otterly citation dataset.
2. Build an internal **FlightClaimly Evidence Pack**: one primary-source-backed entity fact sheet for company identity, fee model, legal escalation, customer net, coverage, languages and official URLs.
3. Pursue only high-value external corroboration opportunities after explicit approval; no mass backlink outreach.
4. Build remaining owned authority pages directly from Otterly prompt gaps: AirHelp alternatives; fee/lower-fee authority; compensation eligibility/checker authority; then other measured high-intent gaps.
5. Allow discovery/indexing time, then re-run the exact same 15 Otterly prompts.
6. Iterate from measured gaps rather than generic content volume.

### External-authority findings
- **Uncompromised Travel:** strongest strategic candidate currently. It is already present in the AI citation ecosystem. Treat as a commercial comparison authority, not a consumer organization; affiliate/commercial relationships exist. It publicly allows verifiable provider submissions. Observed Q4 submission deadline: 2026-11-15. Prefer strengthening proof/social proof during October rather than rushing.
- **The Miles Market:** promising earlier editorial fit because existing material already questions 30–35% claim-company economics.
- **EUFlightCompensation.com:** hold pending deeper ownership/commercial due diligence. No evidence has established that a competitor owns it.
- **MoneySavingExpert:** high-value authority, but likely more realistic after FlightClaimly has stronger operating history/social proof.
- **FlightOwed:** direct competitor, not an outreach target.

No external outreach is sent without an explicit decision.

### Social proof
Trustpilot Business Free signup attempted 2026-09-29. Activation repeatedly returned a generic error after company-email, incognito and VPN-off tests. Support request submitted. Continue growth work while awaiting support. Only genuine customer reviews are acceptable.

### Competitive intelligence — FlightOwed
Portugal-based 2026 challenger identified. Current public positioning observed: 25% incl. VAT, no additional legal-action surcharge stated, automation/AI/lower-cost positioning, and a technology/lead-generation model with enforcement partners.

Its statistics/research/press architecture is strategically useful: statistics can be a citation/acquisition product. Monitor pricing, languages, authority pages, press mentions and AI/search visibility. Do not copy its proprietary estimates.

### New strategic layer — FlightClaimly Data Authority
Future authority layer: **FlightClaimly Flight Disruption Index** and source-backed airline/airport/route disruption statistics, transparent methodology, downloadable data where licensing permits, press-friendly facts, and eventually proprietary aggregated claim intelligence when sample sizes are meaningful.

Use OAG/public primary sources only within licensing/usage rights. Distinguish observations from estimates. Long-term objective: publishers and answer engines should use FlightClaimly as a source, not merely mention it as a provider.

### Positioning guardrails
Core: **20% standard success fee incl. VAT; customer keeps 80%.**
Legal escalation: **30% total incl. VAT.**
No upfront fee; no standard service fee without recovery.
Do not claim "Europe's cheapest" or superiority in outcomes, legal reach, speed or service quality without evidence.

### Authority flywheel
Owned facts -> external corroboration -> AI/search discovery -> traffic -> claims -> genuine reviews/case evidence -> stronger external authority -> more discovery.
