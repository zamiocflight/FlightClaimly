# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-06**

> **Authoritative crash-recovery and new-chat pointer. Read this first after any session loss.**

## New-chat startup protocol

When a fresh ChatGPT window is opened, the user can write exactly:

> **FlightClaimly: återuppta arbetet. Läs `docs/CURRENT_SPRINT_LATEST.md` först, därefter den senaste relevanta checkpointen och berörda engine/roadmap-filer. Inspektera aktuell GitHub-branch och faktisk kod innan du gör något. Plocka upp arbetet exakt där det står, fortsätt självständigt och skriv inte till mig förrän du faktiskt behöver min assistans.**

The assistant must then use the connected GitHub repository `zamiocflight/FlightClaimly` as source of truth, inspect current branch/code/docs, and continue execution rather than asking the user to reconstruct prior context. Repository state beats conversational memory if they differ.

## Current state

- 🟢 Delay Reason Engine v1 — LOCKED
- 🟢 EU261 Legal Rule Layer v1 — LOCKED
- 🟢 Claim Rights Assessment Engine v1 — LOCKED
- 🟢 Claims Desk Assessment Integration phase 1 — VERIFIED
- 🟢 Research / Evidence Engine v1 foundation — LOCKED
- 🟢 Build / Deployment Cost Optimization — LOCKED
- 🟢 Flight Number Localization Wave 1 — COMPLETE / LOCKED / RELEASED
- 🟢 Wave 1 markets — SV → DA → PL → DE → FI → NL
- 🟢 Production-scale Wave 1 baseline — 23,867 / 23,867 static pages
- 🟢 Google Search Console strategic handoff — representative NL detail plus SV/DA/PL/DE/FI/NL hubs accepted; sitemap is the mass-discovery mechanism
- 🔵 **ACTIVE: Localization Wave 2 — Swedish coordinated Knowledge package**
- ⏭️ THEN: DA → PL → DE → FI → NL Wave 2 packages
- ⏭️ AFTER CURRENT SIX-MARKET WAVE 2: add **Portuguese + Spanish** as full product/site locales, then run the same Flight Number Wave 1 + coordinated Knowledge Wave 2 method for PT and ES
- ⏭️ PRODUCT: premium UX/design/conversion pass across public site + complete claim journey
- 🟡 GROWTH: Portugal and Spain are priority expansion/acquisition laboratories; Poland is also a high-interest paid-acquisition market

## Secured SEO baseline

- 2,841 publishable canonical Flight Number entities
- 44 represented airlines
- 3,141 route paths
- post-NL production build: 23,867 / 23,867
- Flight Number detail cohort: 19,887 = 2,841 × 7 published SEO locales
- Flight Number airline-group cohort: 308 = 44 × 7 published SEO locales
- each localized Flight Number market sitemap cluster: 2,886 URLs
- published Flight Number locales: EN + SV + DA + PL + DE + FI + NL
- no FlightAware population required for localization work

## ACTIVE — Wave 2 SV

Working branch: `seo-localization-wave2-sv`, created fresh from current `main` on 2026-09-06.

Coordinated Swedish package:

1. Routes
2. Airports
3. Airlines
4. Countries
5. Delay Reasons

Implementation started 2026-09-06. Swedish deterministic localization builders have been created for the coordinated Knowledge cohorts, and the route/airport/airline/country detail surfaces have been wired toward resolved Swedish localized entities, localized labels, metadata and breadcrumb/fact presentation. The branch is **mid-implementation, not locked**. The next session must inspect the actual branch diff/code before continuing, complete the remaining Delay Reason integration and any hub/internal-link/sitemap/locale-gate work, then validate the package end-to-end. Do not call SV locked until typecheck, architecture checks, sitemap arithmetic, Preview/rendered QA and a meaningful production build are green.

### Wave 2 market order

`SV ACTIVE → DA → PL → DE → FI → NL`

Per market: inspect all five canonical cohorts; research terminology/search intent where needed; localize from canonical facts; preserve legal/factual invariants; validate quality gates, metadata, internal links, canonical/hreflang, sitemap arithmetic and types; run optimized Preview and representative + unsampled QA; stop Preview; run one meaningful production build; write checkpoint and lock.

Do not rerun FlightAware merely for localization. Do not reopen locked Flight Number v1 without a concrete bug/legal change/planned v2.

## NEXT EXPANSION — Portugal + Spain

After the current Wave 2 markets are complete, FlightClaimly's first new language expansion is explicitly:

1. **Portuguese (PT)**
2. **Spanish (ES)**

Execution order for each new locale:

1. add the language as a complete supported public/product locale, not SEO-only decoration
2. validate the customer-facing claim journey and core site copy
3. execute the Flight Number localization method established in Wave 1
4. execute Routes + Airports + Airlines + Countries + Delay Reasons as the coordinated Wave 2 package
5. validate canonical/hreflang/sitemap/build/rendering before publication
6. hand the new market to Google through sitemap + a small representative set of strategic indexing requests

Portugal is the first expansion market. Spain follows. This order is a deliberate growth decision, not a statement that Portugal has the larger absolute TAM.

## European growth model

After the technical localization foundation, build a country-by-country TAM/SAM/SOM model. Distinguish all disrupted passengers from passengers plausibly eligible for compensation. Model 1%, 2% and 3% penetration by market rather than assuming one Europe-wide share. Track submitted claims → valid/pursued claims → successful recoveries → gross commission and CAC.

Do **not** assume a 90% win rate for all raw submissions. A long-term 90%+ success target is meaningful only for claims FlightClaimly has screened and chosen to pursue after eligibility/evidence review.

Portugal + Spain are priority future paid-acquisition tests; Poland is also strategically interesting because the Polish locale already exists. Optimize paid growth against cost per valid/profitable claim, not clicks or raw leads.

## Premium UX / Design / Conversion pass

After/alongside the post-Wave-2 expansion phase, perform a deliberate product-quality review rather than cosmetic patching. Review landing → lookup → eligibility → passenger details → documents → claim → confirmation on desktop and mobile.

Scope: premium visual hierarchy, typography/spacing, trust and authority, CTA clarity, claim-flow progress/navigation, form friction/validation, loading/error/empty/success states, copy/reassurance, responsive behavior, useful microinteractions, consistency between Knowledge pages and transactional flow, and analytics/conversion instrumentation.

The explicit goal is to re-evaluate older implementation with current capabilities and materially upscale FlightClaimly's perceived quality and conversion potential.

## Later cleanup lanes

Search Console legacy duplicate/canonical, 404, redirect, discovered-not-indexed and crawled-not-indexed cohorts remain a later audit lane after Google has processed the new footprint. GA4/internal/test/automated traffic hygiene is also later cleanup.

## Architecture / safety rules

- canonical Knowledge facts are never forked per locale
- localization quality gates control SEO publication
- app routing support does not equal publishable localization
- research and legal evaluation remain separate
- missing/conflicting facts remain unresolved until sufficiently verified
- customer-specific data remains transactional
- preserve unrelated local Claims/Reijo work; never commit real customer PII
- no `git add .`, destructive reset/clean or force push

## Exact resume action

**Continue Wave 2 on `seo-localization-wave2-sv`. First inspect the branch's actual current diff/code because SV is mid-implementation. Finish Swedish Routes + Airports + Airlines + Countries + Delay Reasons as one coordinated package, including remaining Delay Reason integration, hubs/internal links, locale publication gates, canonical/hreflang and sitemap exposure. Then run type/architecture validation, optimized Preview with representative and unsampled rendered QA, stop Preview, run one meaningful production build, checkpoint and lock SV. Do not touch Claims/Reijo and do not rerun FlightAware. After SV locks, continue DA → PL → DE → FI → NL. After current Wave 2, Portuguese first and Spanish second become full product/site locales, followed by the same Flight Number + coordinated Knowledge localization method. Preserve the planned premium UX/design/conversion pass and country-by-country 1–3% growth model.**
