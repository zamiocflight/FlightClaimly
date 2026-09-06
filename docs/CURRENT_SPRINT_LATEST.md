# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-06**

> **AUTHORITATIVE CRASH-RECOVERY / NEW-CHAT POINTER. READ THIS FIRST.**
>
> Repository state beats conversational memory if they differ.

## New-chat startup protocol

When a fresh ChatGPT window is opened, the user can write exactly:

> **FlightClaimly: återuppta arbetet. Läs `docs/CURRENT_SPRINT_LATEST.md` först, därefter `docs/checkpoints/2026-09-06-seo-localization-wave2-sv-locked.md`, `docs/ROADMAP.md` och berörda engine/architecture-filer. Inspektera aktuell GitHub-branch och faktisk kod innan du gör något. Plocka upp arbetet exakt där det står, fortsätt självständigt och skriv inte till mig förrän du faktiskt behöver min assistans.**

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
- 🔵 **NEXT ACTIVE MARKET: Danish (DA)**
- ⏭️ THEN: PL → DE → FI → NL Wave 2 packages
- ⏭️ AFTER CURRENT SIX-MARKET WAVE 2: Portuguese first, Spanish second as full product/site locales, followed by Flight Number + coordinated Knowledge localization
- ⏭️ PRODUCT: premium UX/design/conversion pass across public site + complete claim journey
- 🟡 GROWTH: Portugal and Spain are priority expansion/acquisition laboratories; Poland remains strategically interesting for paid acquisition

# Wave 2 Swedish lock — authoritative result

Swedish Wave 2 was completed and locked on 2026-09-06.

Code lock commit after clean rebase/push:

`93e965af7c7f429084a787cc01fe833f6f7e86bb`

Commit message:

`Lock Swedish SEO localization Wave 2`

The lock covers the coordinated Knowledge package:

1. Routes
2. Airports
3. Airlines
4. Countries
5. Delay Reasons

At SV lock, Wave 2 SEO publication scope is exactly EN + SV. DA/PL/DE/FI/NL are not yet published for these cohorts.

The detailed implementation, QA, sitemap arithmetic, worktree safety state and exact next-market procedure are recorded in:

`docs/checkpoints/2026-09-06-seo-localization-wave2-sv-locked.md`

# What Swedish Wave 2 actually built

SV was the foundation market. It was not just a translation exercise.

The work established/generalized:

- deterministic localization builders for the five Wave 2 Knowledge cohorts
- localized entity `displayName` support without forking canonical facts
- Swedish route/city/country presentation
- publication-aware Knowledge/internal-link fallback behavior
- locale-preserving Related Routes links and Swedish visible route presentation
- Delay Reason metadata localization
- separate Swedish Delay Reason assessment presentation from canonical assessment/classification data
- localized Delay Reason headings, labels, badges, investigative questions and extraordinary-circumstance presentation
- Swedish BreadcrumbList and FAQPage schema output
- coherent Wave 2 publication locale gates / static params / hreflang / sitemap behavior
- a reusable rendered-QA + sitemap-arithmetic + Preview + production-lock method for the remaining markets

Do not recreate this architecture per language. Reuse it.

# Verification at SV lock

Green gates included:

- Preview build: 1,296 / 1,296
- `npm run typecheck`
- `git diff --check`
- representative rendered QA across all five Wave 2 cohorts
- unsampled/dynamic Swedish route returned HTTP 200 with Swedish metadata/H1/canonical
- Swedish route/country display-name QA
- extraordinary=false and extraordinary=true Delay Reason QA
- Swedish BreadcrumbList and FAQPage schema QA
- DA Flight Number fallback regression preserved
- Wave 2 publication scope confirmed as EN + SV only
- sitemap expected 27,039 / actual 27,039 / difference 0
- production build: **27,249 / 27,249 static pages generated**

# Secured SEO baseline

Canonical/scale data at this checkpoint:

- Flight Numbers: 2,841 publishable canonical entities
- represented Flight Number airlines: 44
- Routes: 3,141
- Airports: 98
- Airlines: 96
- Countries: 36
- Delay Reasons: 11
- Flight Number published locales: EN + SV + DA + PL + DE + FI + NL
- Wave 2 published locales after SV lock: EN + SV
- no FlightAware population required for localization work

Wave 2 entity count per locale:

3,141 + 98 + 96 + 36 + 11 = **3,382**

Wave 2 sitemap surface at EN+SV:

- 6,764 entity URLs
- 10 cohort index URLs
- 6,774 total Wave 2 URLs

# Worktree safety — IMPORTANT

Two Git worktrees currently matter:

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

Branch:

`seo-localization-wave2-sv`

This is NOT another project or fork. It is a separate Git worktree for the same FlightClaimly repository/history, created specifically to isolate localization work from parked Claims/Reijo changes.

**Continue Wave 2 DA in this Wave 2 worktree lineage. Do not switch back to the original worktree merely because SV is locked.**

If documentation commits were made remotely after the SV code lock, pull/rebase safely before new local edits. Never force-push.

# NEXT — Wave 2 Danish

Market order now:

`SV LOCKED → DA NEXT → PL → DE → FI → NL`

The remaining markets should be materially faster than SV because the generic localization foundation now exists. They are not zero-work translations: each market still requires market-native terminology, SEO/legal-meaning review, rendered QA, sitemap arithmetic and a meaningful production build before lock.

Exact DA sequence:

1. inspect branch/code/docs and synchronize any documentation-only remote commits
2. create/adapt Danish localization presentation for Routes, Airports, Airlines, Countries and Delay Reasons using the existing architecture
3. preserve canonical facts and legal/classification meaning
4. do not translate from Swedish; localize from canonical/base meaning
5. verify visible display names, metadata, internal links, breadcrumbs, FAQ/schema and Delay Reason assessment presentation
6. extend Wave 2 publication scope to DA only after DA quality is ready
7. verify canonical/hreflang/static params/sitemap arithmetic
8. run typecheck and diff check
9. run optimized Preview with representative + unsampled rendered QA
10. stop Preview
11. run one meaningful production build
12. write DA checkpoint and lock
13. continue PL → DE → FI → NL

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

After/alongside the post-Wave-2 expansion phase, deliberately re-evaluate the older public site and full claim journey with current capabilities.

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
- do not reopen SV Wave 2 without a concrete bug, SEO defect, legal issue or localization regression

# Exact resume action

**Continue Localization Wave 2 with Danish in the `flightclaimly-wave2-sv` worktree / `seo-localization-wave2-sv` branch lineage after synchronizing any remote documentation commits. Swedish is LOCKED and must be treated as the reusable foundation, not rebuilt. Read the Swedish lock checkpoint for exact implementation details. Then localize/validate DA across Routes + Airports + Airlines + Countries + Delay Reasons, keep publication gated until QA is green, run one meaningful production build, checkpoint/lock DA, and continue PL → DE → FI → NL. Do not touch parked Claims/Reijo work and do not rerun FlightAware.**
