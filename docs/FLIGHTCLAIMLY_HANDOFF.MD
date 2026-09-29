# FLIGHTCLAIMLY — MASTER HANDOFF

Last updated: **2026-09-09**

## PURPOSE

This is the continuity handoff for ongoing FlightClaimly development. A new ChatGPT session should treat `docs/CURRENT_SPRINT_LATEST.md`, the latest relevant checkpoint, this handoff and the actual GitHub branch/code as project state.

Repository state beats conversational memory if they differ.

## WORKING STYLE

- Swedish conversation
- fast autonomous execution
- inspect actual repo/code before instructing changes
- use connected GitHub directly where safe
- only interrupt the user when local assistance is genuinely required
- when local action is required, always state **Terminal 1** or **Terminal 2** and give one exact command at a time
- for code changes, state whether a file is new, fully replaced or partially edited and give exact anchors/locations
- never force-push
- never use `git add .`
- never destructive reset/clean unrelated work

## COMPANY / PRODUCT

Company: FLIGHTCLAIMLY OÜ  
Business: EU261 / UK261 flight compensation claims  
Standard customer pricing: 20% including VAT  
Commercial model: No win, no fee

Current supported/localized footprint after Spanish lock:

`EN + SV + DA + PL + DE + FI + NL + ES`

# CURRENT DEVELOPMENT STATE

Locked foundations:

- Delay Reason Engine v1 — LOCKED
- EU261 Legal Rule Layer v1 — LOCKED
- Claim Rights Assessment Engine v1 — LOCKED
- Claims Desk Assessment Integration phase 1 — VERIFIED
- Research / Evidence Engine v1 foundation — LOCKED
- Build / Deployment Cost Optimization — LOCKED
- Flight Number localization architecture — LOCKED for completed locales

# LOCALIZATION STATUS

Completed/locked sequence:

`SV → DA → PL → DE → FI → NL → ES`

Spanish (`es`) was locked on **2026-09-09**.

Authoritative ES checkpoint:

`docs/checkpoints/2026-09-09-seo-localization-wave2-es-locked.md`

ES code lock recorded there: `d3afd97`.

Do not reopen ES or earlier locked locales absent a concrete bug, SEO regression, legal correction or localization defect.

## ES lock evidence

- typecheck passed
- final build after middleware fix/message catalog: **50,463 / 50,463**
- sitemap: **50,256 total / 6,281 ES**
- all six Spanish SEO hubs returned 200
- representative Route/Airport/Airline/Country/Delay Reason/Flight Number details returned 200
- Spanish claim journey tested through final thanks step
- `messages/es.json` runtime copy confirmed, not fallback
- Flight Number self-canonical + eight-locale hreflang confirmed
- BreadcrumbList + FAQPage confirmed
- technical-problems classification preserved false
- bad-weather classification preserved true
- diff check green
- lock working tree clean

## Current scale across eight locales

- Routes: 3,141 canonical / 25,128 localized detail paths
- Airports: 98 / 784
- Airlines: 96 / 768
- Countries: 36 / 288
- Delay Reasons: 11 / 88
- Flight Numbers: 2,841 / 22,728
- Flight Number airline groups: 44 / 352 pages

No FlightAware rerun is required.

# IMPORTANT ES RUNTIME FIX

During Spanish runtime QA, `/es/...` initially redirected incorrectly through `/sv/es/...` because `src/middleware.ts` had a hardcoded locale list that omitted `es`, despite routing already supporting Spanish.

The middleware registration was fixed by adding `es` to both locale collections. Post-fix Spanish hubs/details returned HTTP 200. Treat this as a concrete lesson for future locale launches: adding a locale to routing alone is insufficient; middleware/runtime registration must also be verified.

# ACTIVE NEXT PHASE — PREMIUM UX / UPSCALE

Premium UX/design/conversion work is now next, **before FR/IT/PT localization**.

The purpose is to make the current product feel like a premium, trustworthy European claims/fintech service and to improve conversion without damaging the SEO/i18n/legal foundation.

Audit actual code first. Do not redesign from assumptions.

Review:

- home/landing above the fold
- header and desktop/mobile navigation
- eligibility checker and complete claim journey
- Knowledge/SEO pages as conversion surfaces
- trust, authority and fee presentation
- CTA hierarchy
- forms/progress/validation
- loading/error/empty/success states
- mobile friction
- typography/spacing/hierarchy
- useful microinteractions
- accessibility/performance
- analytics/conversion instrumentation

Preserve:

- canonical/hreflang and sitemap architecture
- structured data
- SEO semantics
- i18n architecture
- locked localized/legal meaning
- 20% incl. VAT and no-win-no-fee economics
- claim-flow/data integrity
- performance/accessibility

The premium phase should end with QA and a dedicated checkpoint before new locale expansion.

# NEXT MARKET ORDER AFTER PREMIUM

`FR → IT → PT`

Each new locale must be a complete package: public/product copy + claim journey + Flight Numbers + Routes + Airports + Airlines + Countries + Delay Reasons + metadata/internal links/schema/canonical/hreflang/sitemap/build/render QA + checkpoint/lock.

# WORKTREE / GIT SAFETY

Original worktree:

`flightclaimly`

Contains parked unrelated Claims/Reijo work last recorded as:

- `M docs/CLAIMS_DESK.md`
- `M scripts/test-manual-claim.ts`
- `?? scripts/create-reijo-claim.ts`

Do not touch/reset/clean/stage those files from this workstream.

Active localization/premium worktree:

`flightclaimly-wave2-sv`

Current branch at ES lock:

`seo-localization-wave2-es`

Do not create additional worktrees without a concrete reason. Never force-push.

# ARCHITECTURAL PRINCIPLES

- canonical Knowledge facts are locale-neutral
- localization changes presentation, not canonical fact identity
- legal/classification values remain canonical across locales
- localization is market-native adaptation, not translation chaining
- quality gates control SEO publication
- routing support does not equal publishable/runtime-complete localization
- relationship links respect publication policy
- research/evidence and legal evaluation remain separate
- unresolved facts stay unresolved until sufficiently verified
- customer-specific data remains transactional and out of source-controlled generic helpers
- locked locale work remains immutable absent a concrete regression

# CLAIMS OPERATIONS CONTEXT

Claims and localization/premium product work remain separate workstreams. Do not accidentally stage or modify parked Reijo/manual-claim work.

# CRASH-RECOVERY ORDER

A new ChatGPT session should read:

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/checkpoints/2026-09-09-seo-localization-wave2-es-locked.md`
3. `docs/ROADMAP.md`
4. this file
5. relevant architecture/engine/UI files
6. current GitHub branch/code/status

Then resume the **premium UX/upscale audit from actual current code**, not German/Finnish/Dutch/Portuguese localization. After premium implementation is validated/checkpointed, continue **FR → IT → PT**.

## 2026-09-09 — LOCALIZED HEADER + I18N RUNTIME RECOVERY

Concrete regressions discovered after the Spanish Wave 2 lock were repaired on branch `fix/localized-desktop-header`.

### next-intl / HTML locale bug
- Localized routes such as `/es` and `/fi` rendered localized page content but root `<html lang>` incorrectly remained `sv`.
- Root cause: `src/middleware.ts` returned `NextResponse.next()` for already-localized paths before `next-intl` middleware could set `x-next-intl-locale`.
- Supported localized product routes now pass through the intl middleware.
- Runtime verification confirmed `/es` => `<html lang="es">` and `/fi` => `<html lang="fi">`.

### Message-catalog structural repair
- `messages/fi.json` and `messages/pl.json` contained misplaced/duplicate top-level structures.
- Missing `homeEligibility.bands.*.distance` keys were restored where required.
- DA, DE, FI and PL were surgically repaired without whole-file reserialization.
- Final recursive EN structure parity:
  - DA: MISSING 0 / EXTRA 0
  - DE: MISSING 0 / EXTRA 0
  - ES: MISSING 0 / EXTRA 0
  - FI: MISSING 0 / EXTRA 0
  - NL: MISSING 0 / EXTRA 0
  - PL: MISSING 0 / EXTRA 0
  - SV: MISSING 0 / EXTRA 0
- Locale repair commit: `99ade82`.

### Localized desktop header
- Full FlightClaimly wordmark is protected from shrinking.
- Tracking CTA remains normal/readable size: 14px text, normal padding and 20px icon.
- General desktop nav remains 14px.
- DE/FI use tighter spacing only.
- ES uses a targeted 13px nav with tighter spacing so the complete seven-link navigation, language selector and full-size tracking CTA fit at the tested desktop width.
- A temporary ES desktop hamburger fallback was tested and rejected; normal desktop navigation was restored.
- Final ES localhost visual QA confirmed the complete header fits without clipping and without shrinking the logo or tracking button.
- Header hero/background structure was not redesigned as part of this regression fix.

### Verification / deployment state
- `npm run typecheck` green during final repair cycle.
- Final visual QA passed locally for ES; other tested locales were visually healthy.
- These regression repairs are NOT yet recorded as production-deployed. Resume by checking git status/diff, running final QA/build, committing/pushing the remaining header CSS change, then deploy deliberately.

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
