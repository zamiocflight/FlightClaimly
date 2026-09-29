# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-09**

> **AUTHORITATIVE CRASH-RECOVERY / NEW-CHAT POINTER. READ THIS FIRST.**
>
> Repository state and the latest lock checkpoint beat conversational memory if they differ.

## New-chat startup protocol

A fresh ChatGPT session should read, in this order:

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/checkpoints/2026-09-09-seo-localization-wave2-es-locked.md`
3. `docs/ROADMAP.md`
4. `docs/FLIGHTCLAIMLY_HANDOFF.MD`
5. relevant architecture/engine files
6. actual current GitHub branch/code/status

Connected repository: `zamiocflight/FlightClaimly`.

# Current state

Locked foundations:

- Delay Reason Engine v1 — LOCKED
- EU261 Legal Rule Layer v1 — LOCKED
- Claim Rights Assessment Engine v1 — LOCKED
- Claims Desk Assessment Integration phase 1 — VERIFIED
- Research / Evidence Engine v1 foundation — LOCKED
- Build / Deployment Cost Optimization — LOCKED
- Flight Number localization architecture — LOCKED for completed locales

## Localization state

Public/product + programmatic localization now covers eight locales:

`EN + SV + DA + PL + DE + FI + NL + ES`

Wave 2 market sequence is complete through Spanish:

`SV LOCKED → DA LOCKED → PL LOCKED → DE LOCKED → FI LOCKED → NL LOCKED → ES LOCKED`

Spanish was locked on **2026-09-09**.

Detailed ES checkpoint:

`docs/checkpoints/2026-09-09-seo-localization-wave2-es-locked.md`

ES code lock recorded by the checkpoint: `d3afd97`.

Do not reopen ES or any previously locked locale without a concrete bug, SEO regression, legal correction or localization defect.

# Final ES verification

Green gates recorded at lock:

- `npm run typecheck`
- final `npm run build` after middleware fix and Spanish message catalog
- static generation **50,463 / 50,463**
- sitemap **50,256 URLs**
- Spanish sitemap surface **6,281 URLs**
- Spanish hubs and representative details HTTP 200
- Spanish claim journey tested through final thanks step
- runtime `messages/es.json` confirmed; no silent fallback
- canonical + hreflang EN/SV/DA/PL/DE/FI/NL/ES confirmed
- `BreadcrumbList` + `FAQPage` confirmed
- Delay Reason canonical classifications preserved: technical problems false, bad weather true
- `git diff --check` green
- final lock working tree clean

# Secured SEO scale across eight locales

- canonical Flight Numbers: **2,841**
- represented Flight Number airline groups: **44**
- Routes: **3,141 canonical / 25,128 localized detail paths**
- Airports: **98 canonical / 784 localized detail paths**
- Airlines: **96 canonical / 768 localized detail paths**
- Countries: **36 canonical / 288 localized detail paths**
- Delay Reasons: **11 canonical / 88 localized detail paths**
- Flight Numbers: **22,728 localized detail paths**
- Flight Number airline-group pages: **352**

No FlightAware population is required for the next phase.

# ACTIVE PHASE — Premium UX / upscale

**This is now the next development phase.**

Do not start FR/IT/PT localization before the premium audit/implementation unless priorities are explicitly changed.

Audit the current product before modifying it. The goal is a material premium European claims/fintech uplift, not cosmetic churn.

Primary surfaces:

- public landing/home
- header/navigation/mobile navigation
- eligibility/checker entry and full claim journey
- Knowledge/SEO landing pages and their conversion path
- trust/authority presentation
- CTA hierarchy
- forms, validation, loading/error/empty/success states
- responsive/mobile behavior
- typography, spacing and visual hierarchy
- accessibility/performance
- conversion instrumentation

Preserve during UX work:

- SEO semantics and indexation architecture
- canonical/hreflang behavior
- structured data
- localization architecture and locked copy meaning
- legal wording and fee model
- claim-flow behavior/data integrity
- performance/accessibility

Before implementation, produce a concrete file-level audit and before/after plan based on actual current code. Then implement deliberately rather than redesigning blindly.

# AFTER PREMIUM UX

Current expansion order:

`FR → IT → PT`

For each new market:

1. complete public/product locale
2. validate complete claim journey
3. apply established Flight Number localization architecture
4. apply coordinated Routes/Airports/Airlines/Countries/Delay Reasons localization
5. preserve canonical facts and legal/classification values
6. validate metadata, links, structured data, canonical/hreflang and sitemap
7. typecheck/build/render QA
8. checkpoint and lock before moving on

# Worktree / Git safety

Localization/premium worktree:

`flightclaimly-wave2-sv`

Current branch at ES lock:

`seo-localization-wave2-es`

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
- no FlightAware rerun merely for localization/UX
- inspect actual file contents before modifying existing code
- preserve locked locales unless a concrete regression exists

# Exact resume action

**Resume from the locked Spanish checkpoint on `seo-localization-wave2-es`. First inspect the actual current public-site and claim-journey implementation and produce the premium UX/upscale audit at file level. Then implement the agreed premium uplift while preserving SEO, i18n, legal meaning, claim-flow integrity, performance and accessibility. After the premium phase is validated and checkpointed, continue market expansion in the order FR → IT → PT. Do not touch parked Claims/Reijo work and do not rerun FlightAware.**

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
