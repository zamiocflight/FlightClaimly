# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-07**

> **AUTHORITATIVE CRASH-RECOVERY / NEW-CHAT POINTER. READ THIS FIRST.**
>
> Repository state beats conversational memory if they differ.

## New-chat startup protocol

When a fresh ChatGPT window is opened, the user can write exactly:

> **FlightClaimly: återuppta arbetet. Läs `docs/CURRENT_SPRINT_LATEST.md` först, därefter `docs/checkpoints/2026-09-07-seo-localization-wave2-pl-locked.md`, `docs/ROADMAP.md` och berörda engine/architecture-filer. Inspektera aktuell GitHub-branch och faktisk kod innan du gör något. Plocka upp arbetet exakt där det står, fortsätt självständigt och skriv inte till mig förrän du faktiskt behöver min assistans.**

The assistant must use the connected GitHub repository `zamiocflight/FlightClaimly` as source of truth and inspect branch/code/docs directly rather than asking the user to reconstruct prior context.

# Current state

- 🟢 Delay Reason Engine v1 — LOCKED
- 🟢 EU261 Legal Rule Layer v1 — LOCKED
- 🟢 Claim Rights Assessment Engine v1 — LOCKED
- 🟢 Claims Desk Assessment Integration phase 1 — VERIFIED
- 🟢 Research / Evidence Engine v1 foundation — LOCKED
- 🟢 Build / Deployment Cost Optimization — LOCKED
- 🟢 Flight Number Localization Wave 1 — COMPLETE / LOCKED / RELEASED
- 🟢 Wave 1 markets — SV → DA → PL → DE → FI → NL
- 🟢 **Localization Wave 2 — Swedish package COMPLETE / LOCKED**
- 🟢 **Localization Wave 2 — Danish package COMPLETE / LOCKED**
- 🟢 **Localization Wave 2 — Polish package COMPLETE / LOCKED**
- 🔵 **NEXT ACTIVE MARKET: German (DE)**
- ⏭️ THEN: FI → NL Wave 2 packages
- ⏭️ AFTER CURRENT SIX-MARKET WAVE 2: Portuguese first, Spanish second as full product/site locales, followed by Flight Number + coordinated Knowledge localization
- ⏭️ PRODUCT: premium UX/design/conversion pass across public site + complete claim journey
- 🟡 GROWTH: Portugal and Spain are priority expansion/acquisition laboratories; Poland remains strategically interesting for paid acquisition

# Wave 2 locks — authoritative result

## Swedish

Code lock:

`93e965af7c7f429084a787cc01fe833f6f7e86bb`

Checkpoint:

`docs/checkpoints/2026-09-06-seo-localization-wave2-sv-locked.md`

## Danish

Code lock:

`558ee8e8d6a848fd9226247eb42ea191b73a8b79`

Checkpoint:

`docs/checkpoints/2026-09-07-seo-localization-wave2-da-locked.md`

## Polish

Polish Wave 2 was locked on 2026-09-07.

Code lock:

`205ead3d0b62a930e6141dfce71fc84af5e016c5`

Checkpoint:

`docs/checkpoints/2026-09-07-seo-localization-wave2-pl-locked.md`

PL reuses the Swedish + Danish architecture and extends Wave 2 publication scope to exactly EN+SV+DA+PL for Routes, Airports, Airlines, Countries and Delay Reasons.

# Polish lock verification

Green gates:

- `npm run typecheck`
- `git diff --check`
- Preview build: **1,826 / 1,826**
- Production build: **34,013 / 34,013 static pages generated**
- final Polish city-exonym correction verified by rendered QA
- representative rendered QA across all five Wave 2 cohorts
- reverse Stockholm→Copenhagen PL route returned HTTP 200
- extraordinary=false and extraordinary=true Delay Reason QA
- PL BreadcrumbList and FAQPage structured-data presence
- canonical/hreflang confirmed exactly EN + SV + DA + PL for Wave 2
- no DE/FI/NL Wave 2 hreflang leakage
- existing PL Flight Number Wave 1 regression preserved with runtime-publishable `/pl/flight-numbers/a3101` returning HTTP 200
- sitemap expected **33,813** / actual **33,813** / difference 0
- final local `git status --short` clean

# Secured SEO baseline after PL lock

Canonical/scale data:

- Flight Numbers: 2,841 publishable canonical entities
- represented Flight Number airlines: 44
- Routes: 3,141
- Airports: 98
- Airlines: 96
- Countries: 36
- Delay Reasons: 11
- Flight Number published locales: EN + SV + DA + PL + DE + FI + NL
- Wave 2 published locales after PL lock: **EN + SV + DA + PL**
- no FlightAware population required for localization work

Wave 2 entity count per locale:

3,141 + 98 + 96 + 36 + 11 = **3,382**

Each additional Wave 2 locale adds:

- 3,382 entity URLs
- 5 cohort index URLs
- 3,387 sitemap URLs total

# Reusable Wave 2 architecture

The SV foundation plus DA + PL implementations now prove the reusable per-market pattern:

- deterministic localization builders
- localized entity `displayName` support without forking canonical facts
- localized route/city/country presentation including market-native exonyms where appropriate
- publication-aware Knowledge/internal-link behavior
- locale-preserving Related Routes presentation
- localized Delay Reason metadata and assessment presentation
- localized component headings/labels/badges/questions
- localized BreadcrumbList / FAQPage output
- coherent publication locale gates, static params, canonical/hreflang and sitemap behavior
- Preview + production + rendered-QA + sitemap lock method

Do not recreate this architecture per language. Reuse it.

# Worktree safety — IMPORTANT

Two Git worktrees currently matter.

## Original worktree

Folder:

`flightclaimly`

Contains unrelated parked Claims/Reijo work. Last verified status:

- `M docs/CLAIMS_DESK.md`
- `M scripts/test-manual-claim.ts`
- `?? scripts/create-reijo-claim.ts`

Do not touch/reset/clean/stage these files from Wave 2 work.

## Wave 2 worktree

Folder:

`flightclaimly-wave2-sv`

Current PL lock branch:

`seo-localization-wave2-pl`

This is the same FlightClaimly repository/history in a dedicated Git worktree. Do not create more worktrees for the remaining Wave 2 markets.

If documentation commits were made remotely after the PL code lock, synchronize safely before new local edits. Never force-push.

# NEXT — Wave 2 German

Market order now:

`SV LOCKED → DA LOCKED → PL LOCKED → DE NEXT → FI → NL`

Exact DE sequence:

1. synchronize the Wave 2 worktree with the latest PL documentation-only commits
2. branch from the locked PL lineage for German Wave 2
3. inspect actual current architecture before edits
4. create/adapt German localization presentation for Routes, Airports, Airlines, Countries and Delay Reasons
5. preserve canonical facts and legal/classification meaning
6. localize from canonical/base meaning, not from Swedish/Danish/Polish wording
7. verify display names, metadata, internal links, breadcrumbs, FAQ/schema and Delay Reason assessment presentation
8. extend Wave 2 publication scope to DE only when DE quality is ready
9. verify canonical/hreflang/static params/sitemap arithmetic
10. run typecheck + diff check
11. run optimized Preview with representative rendered QA
12. run one meaningful production build
13. write DE checkpoint and lock
14. continue FI → NL

# Portugal + Spain after current Wave 2

After SV/DA/PL/DE/FI/NL Wave 2 is complete:

1. Portuguese as the first new full product/site locale
2. Spanish second
3. validate the complete public/claim journey in each new locale
4. apply Flight Number Wave 1 localization method
5. apply coordinated Wave 2 Knowledge method
6. validate canonical/hreflang/sitemap/build/rendering
7. use sitemap as the mass-discovery mechanism plus only a small representative set of strategic indexing requests

# Premium UX / Design / Conversion pass

After/alongside the post-Wave-2 expansion phase, re-evaluate the older public site and full claim journey with current capabilities.

Review desktop + mobile:

landing/search → lookup → eligibility → passenger details → documents → claim → confirmation.

Scope includes visual hierarchy, typography/spacing, trust/authority, CTA clarity, progress/navigation, form friction/validation, loading/error/empty/success states, reassurance/copy, responsive behavior, useful microinteractions, consistency between Knowledge and transactional surfaces, performance/accessibility and conversion instrumentation.

# European growth model

Build a country-by-country TAM/SAM/SOM model. Distinguish all disrupted passengers from plausibly compensation-eligible passengers. Model 1%, 2% and 3% penetration per market and track submitted claims → valid/pursued claims → successful recoveries → gross commission and CAC.

Do not assume 90% win rate across raw submissions. A 90%+ long-term success target only makes sense for screened/pursued claims.

# Architecture / safety rules

- canonical Knowledge facts are never forked per locale
- localization is market-native adaptation, not translation chaining
- legal/factual meaning remains invariant across locales
- localization quality gates control SEO publication
- app routing support does not equal publishable localization
- research and legal evaluation remain separate
- missing/conflicting facts remain unresolved until sufficiently verified
- customer-specific data remains transactional and out of source-controlled generic helpers
- preserve unrelated Claims/Reijo work
- no `git add .`
- no destructive reset/clean
- no force push
- no FlightAware rerun merely for localization
- do not reopen locked Flight Number Wave 1 without a concrete bug/legal change/planned v2
- do not reopen SV, DA or PL Wave 2 without a concrete bug, SEO defect, legal issue or localization regression

# Exact resume action

**Continue Localization Wave 2 with German from the locked Polish lineage in the existing `flightclaimly-wave2-sv` worktree. First synchronize the remote PL documentation-only lock commits. Treat SV + DA + PL as immutable reusable foundations. Then localize/validate DE across Routes + Airports + Airlines + Countries + Delay Reasons, keep publication gated until QA is green, run Preview + one meaningful production build, checkpoint/lock DE, and continue FI → NL. Do not touch parked Claims/Reijo work and do not rerun FlightAware.**
