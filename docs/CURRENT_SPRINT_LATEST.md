# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-04**

> **Authoritative crash-recovery pointer. Read this first after any session loss.**

## Read order after session loss

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/checkpoints/2026-09-04-seo-localization-wave1-sv-build-verified.md`
3. `docs/engines/LOCALIZATION_ENGINE.md`
4. `docs/checkpoints/2026-09-04-research-evidence-engine-v1-locked.md`
5. `docs/ROADMAP.md`
6. `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`
7. `docs/engines/README.md`
8. `docs/CLAIMS_DESK.md` — preserve local user modifications
9. `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md`
10. `docs/SYSTEM_PROCESS_MAP.md`
11. `docs/CURRENT_SPRINT.md` — historical record; preserve it

## Current state

- 🟢 Delay Reason Engine v1 — LOCKED
- 🟢 EU261 Legal Rule Layer v1 — LOCKED
- 🟢 Claim Rights Assessment Engine v1 — LOCKED
- 🟢 Claims Desk Assessment Integration phase 1 — VERIFIED
- 🟢 Research / Evidence Engine v1 foundation — LOCKED
- 🟢 Localization architecture — IMPLEMENTED / AUDIT GREEN
- 🟢 Swedish Flight Number cohort — TYPECHECK + FULL BUILD GREEN
- 🔵 ACTIVE NEXT: final Swedish rendered-output / SEO QA
- ⏭️ AFTER QA: lock SV Flight Number cohort, then build Danish independently, then Finnish
- 🟡 PARALLEL: Content / Social Engine v1

## Secured pre-localization baseline

### Flight Number / Google

- 2,841 publishable Flight Number entities
- 44 represented airlines
- 3,141 route paths
- pre-localization production build: **6,557 / 6,557** static pages
- no FlightAware population required for current localization sprint

## Research / Evidence Engine v1

Status: **🟢 LOCKED 2026-09-04**.

Authoritative checkpoint:

`docs/checkpoints/2026-09-04-research-evidence-engine-v1-locked.md`

Locked architecture:

```text
Claim
 ↓
Claim Rights Assessment
 ↓
Unresolved factual/legal questions
 ↓
Research Planner
 ↓
Evidence Providers
 ↓
Evidence Registry / provenance / confidence
 ↓
Append-only verification history
 ↓
Fact Resolver
 ↓
verified / conflicting / unresolved facts
 ↓
enriched Claim Rights input
 ↓
deterministic Legal Engine rerun
 ↓
Updated Claim Rights Assessment
```

External autonomous research providers are **not** yet production-connected. Future FlightAware/weather/ATC/airline/airport/OpenAI/case-law providers must enter through the locked provider → registry → verification → resolver path.

## ACTIVE — SEO Internationalization / Localization Engine

### Core principle

Localization is **not mechanical translation**.

Canonical Knowledge facts remain shared and locale-neutral. Each market gets its own search-intent/terminology/copy layer while factual and legal meaning stays invariant.

Correct model:

```text
Canonical facts → Swedish market intent/copy
Canonical facts → Danish market intent/copy
Canonical facts → Finnish market intent/copy
```

Do **not** use:

```text
EN → SV → DA/FI
```

### Localization foundation implemented

Under `src/lib/localization/`:

- locale-neutral localization contracts
- locale registry
- rollout/publication policy
- canonical-fallback resolver
- canonical fallback forced to non-publishable/review-required
- quality gates for metadata / terminology / legal meaning / content
- localized metadata helpers
- publishable-only hreflang helpers
- reviewed Swedish Knowledge labels
- Swedish Flight Number localization builder
- architecture audit command

### Swedish Flight Number cohort implemented end-to-end

The following actual public surfaces are now integrated, not merely the locale registry:

- Flight Number detail pages
- Flight Number index page
- Flight Number airline-group pages
- Hero / H1 / CTA
- breadcrumbs
- fact labels and yes/no values
- Knowledge section headings
- compensation sections
- passenger-rights sections
- timeline
- claim process
- common issues
- FAQ presentation/content path
- localized internal-link section headings
- localized metadata/canonical/hreflang

Shared SEO components accept localized labels while preserving English defaults for other entity families.

### Important safety decision already completed

`sv` was **not** enabled for Flight Number SEO until the surrounding shared/page/index surfaces had been localized.

This avoids the old failure mode: thousands of nominally Swedish pages that are actually half-English.

### Current publishable Flight Number SEO locales

- EN — publishable
- SV — implemented/enabled cohort
- DA — not yet publishable
- FI — not yet publishable

Do not infer Swedish readiness for route/airport/airline/country/delay-reason detail cohorts. Those remain separately controlled.

## Verification completed — Swedish Flight Number cohort

### Localization architecture audit

`npm run audit:localization`

Result:

**PASS — canonical fallback isolation, quality gates, publishable-only hreflang and Swedish Flight Number builder behave as expected.**

### TypeScript

`npm run typecheck`

Result: **PASS**.

### Full production build

`npm run build`

Environment: Next.js 15.5.7

Result:

- compile PASS
- type validity PASS
- page-data collection PASS
- static generation PASS
- **9,442 / 9,442 static pages generated**

Build output explicitly included:

- `/en/flight-numbers/a3101`
- `/sv/flight-numbers/a3101`
- +5,679 additional Flight Number detail paths
- EN/SV Flight Number airline-group paths

This is consistent with:

- 2,841 canonical publishable Flight Numbers
- 2,841 EN detail pages
- 2,841 SV detail pages
- **5,682 total Flight Number detail paths**

Total SSG increased from **6,557 → 9,442**.

Route detail pages remained EN-only, intentionally.

Claims/Admin/API routes remained present in the successful build.

## ACTIVE NEXT — final Swedish rendered-output / SEO QA

Swedish code/build verification is green, but the cohort is **not yet declared LOCKED**.

Before Danish/Finnish work, inspect real rendered Swedish output.

Exact QA sequence:

1. run the app locally in the normal verified environment
2. inspect representative `/sv/flight-numbers/[slug]` pages
3. confirm natural Swedish and no unintended English page chrome/content
4. inspect rendered title + meta description
5. inspect canonical URL
6. inspect EN/SV hreflang only
7. verify localized FAQ/schema path
8. verify localized internal links and their intended targets
9. inspect `/sv/flight-numbers`
10. inspect representative `/sv/flight-numbers/airline/[airlineSlug]`
11. inspect sitemap exposure for Flight Number cohort
12. if green, create **SV Wave 1 LOCKED** checkpoint

Only after SV lock:

1. Danish localization from canonical facts using Danish search intent/terminology
2. audit/typecheck/build/rendered QA
3. Danish lock
4. Finnish localization independently from canonical facts
5. audit/typecheck/build/rendered QA
6. Finnish lock

Do not mass-enable new locales before each locale passes its own quality gates.

## Parallel — Content / Social Engine v1

Model remains:

```text
Verified Knowledge / Research
→ idea
→ hook
→ script
→ founder recording
→ editing/captions
→ TikTok / Reels / Shorts / Facebook
→ analytics
→ iteration
```

Founder time should stay focused on expertise, point of view and recording. Repetitive editing/resizing/subtitles/scheduling can be AI/operator-assisted.

## Later execution sequence

After/alongside Localization:

1. Content / Social Engine v1
2. Manual / Legacy Claim Engine
3. Claims Desk Workflow v2
4. Airline Submission Engine
5. Customer Communication Engine
6. Escalation Engine
7. Claims Intelligence
8. UK261 / additional rights regimes through the same deterministic architecture

## Architecture rules

- Claim Rights Assessment Engine v1 remains locked.
- Research and legal evaluation remain separate layers.
- Missing facts remain unresolved.
- Every external fact retains source/provenance.
- Provider confidence is not legal verification.
- Fresh provider evidence enters as unverified.
- Verification history is append-only.
- Conflicting evidence does not become a legal fact.
- Deterministic legal engines evaluate sufficiently verified facts.
- Customer-specific data remains transactional.
- Canonical Knowledge facts are not forked per locale.
- Localization quality gates control SEO publication.
- Route support in app routing does not equal publishable Knowledge localization.

## Local parked work — DO NOT DISTURB

Latest verified local status after the successful 9,442-page build:

```text
## seo-localization-engine-v1...origin/seo-localization-engine-v1
 M docs/CLAIMS_DESK.md
 M scripts/test-manual-claim.ts
?? scripts/create-reijo-claim.ts
```

These are known unrelated Claims/Reijo changes.

Rules:

- do not commit current `docs/CLAIMS_DESK.md` local modifications as part of Localization
- do not commit real customer PII from helper scripts
- do not use `git add .`
- do not use `git reset --hard`
- do not use `git clean`
- do not force push

## Branch / exact recovery position

Working branch:

`seo-localization-engine-v1`

Last product-code commit locally verified before documentation updates:

`e1493a9`

Documentation recovery files added immediately after verification:

- `docs/engines/LOCALIZATION_ENGINE.md`
- `docs/checkpoints/2026-09-04-seo-localization-wave1-sv-build-verified.md`
- this updated `docs/CURRENT_SPRINT_LATEST.md`

## Exact resume action

If resuming after a crash:

**Do not rebuild the Localization Engine foundation. Do not rerun FlightAware. Do not start Danish.**

Resume with final rendered Swedish Flight Number QA according to the checklist above. If that is green, lock the Swedish cohort and only then continue to Danish.
