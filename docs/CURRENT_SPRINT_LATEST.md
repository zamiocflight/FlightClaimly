# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-04**

> Authoritative recovery pointer. Read this first after any session loss or crash.

## Read Order After Session Loss

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/checkpoints/2026-09-04-research-evidence-engine-v1-locked.md`
3. `docs/ROADMAP.md`
4. `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md` — locked v1 + integration contract
5. `docs/engines/README.md`
6. `docs/CLAIMS_DESK.md` — operating framework; preserve local user modifications
7. `docs/checkpoints/2026-09-03-passenger-rights-legal-rules-v1-start.md`
8. `docs/checkpoints/2026-09-02-delay-reason-engine-expansion.md`
9. `docs/checkpoints/2026-09-02-flight-number-global-seo-google.md`
10. `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md`
11. `docs/SYSTEM_PROCESS_MAP.md`
12. `docs/CURRENT_SPRINT.md` — historical record; preserve it

## Current state

Status:

- 🟢 Delay Reason Engine v1 — LOCKED
- 🟢 EU261 Legal Rule Layer v1 — LOCKED
- 🟢 Claim Rights Assessment Engine v1 — LOCKED
- 🟢 Claims Desk Assessment Integration phase 1 — VERIFIED
- 🟢 Research / Evidence Engine v1 foundation — LOCKED
- 🔵 NEXT: SEO Internationalization / Localization Engine
- 🟡 PARALLEL: Content / Social Engine v1

## Secured baselines

### Flight Number / Google

- 2,841 publishable Flight Number entities
- 44 represented airlines
- 3,141 route paths
- current production build generates 6,557 / 6,557 static pages
- no FlightAware population required for current sprint

### Delay Reason Engine v1

- 11 structured reasons / relationships / assessment profiles
- audit/typecheck/build green at lock
- public detail pages SSG

### EU261 Legal Rule Layer v1

- 7 authority sources
- 18 legal references
- 5 passenger rights
- 17 legal rules
- Legal Rule Resolver preserves matched / not-matched / unresolved
- audit/typecheck/build green at lock

### Claim Rights Assessment Engine v1

- `npm run audit:claim-rights` — PASS, 4 scenarios at lock
- typecheck/build green
- deterministic legal assessment remains separated from external research
- extraordinary-circumstances claims remain reviewable rather than automatic rejection
- Article 8/9 remain independently assessable

Status: **🟢 LOCKED v1**.

## COMPLETED — Claims Desk Assessment Integration phase 1

Claims Desk adapts the existing transactional claim conservatively into the locked Claim Rights Assessment contract.

Key rule: missing transactional facts remain `undefined`; they are not inferred from dummy precheck data or compensation fields.

The internal panel exposes readiness/investigation state, EU261 scope, compensation state, Article 8/9, Delay Reason when available, evidence targets, assessment questions and legal rule/reference information.

Phase 1 was locally verified before the Research / Evidence work continued.

## COMPLETED — Research / Evidence Engine v1 foundation

Status: **🟢 LOCKED 2026-09-04**.

Authoritative checkpoint:

`docs/checkpoints/2026-09-04-research-evidence-engine-v1-locked.md`

### Locked architecture

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

### Implemented foundation

- bounded Research Planner
- operator-facing task consolidation and wording
- provider contract/boundary
- provider findings forced to `unverified` on ingestion
- Evidence Registry with provenance and SHA-256 content fingerprinting
- idempotent evidence persistence
- Supabase evidence repository
- Fact Resolver
- safe Claim Rights enrichment
- conflict isolation
- append-only evidence verification review history
- reviewer/method/time provenance
- latest-review effective verification state
- Supabase verification repository
- Claims Desk persisted-evidence loading and Research/Evidence UI

### Supabase migrations already applied

Applied successfully in Supabase SQL Editor on 2026-09-04:

- `supabase/migrations/20260904_claim_research_evidence.sql`
- `supabase/migrations/20260904_claim_research_evidence_reviews.sql`

Do not assume these are pending.

### Verification at lock

- `npm run audit:research-evidence` — PASS, 7 scenarios
- `npm run audit:evidence-verification` — PASS
- `npm run typecheck` — PASS
- `npm run build` — PASS
- Next.js 15.5.7
- compiled successfully
- 6,557 / 6,557 static pages generated
- real `/admin/claims/[id]` visually verified with 14 actionable research tasks and Evidence Registry empty state

### Important boundary

**The foundation is implemented; external autonomous research is not yet a production capability.**

FlightAware research provider integration, weather/ATC retrieval, airline/airport retrieval, OpenAI research orchestration and automatic case-law retrieval are future provider integrations. They must use the locked provider → registry → verification → resolver path.

No external provider may self-certify a fact as legally verified.

## ACTIVE NEXT — SEO Internationalization / Localization Engine

This is the next primary technical block.

Goal: reuse canonical Knowledge entities across properly localized markets without duplicating the underlying knowledge model or mass-publishing low-quality mechanical translations.

### First target

Wave 1 pilot:

- Swedish
- Danish
- Finnish

### Start sequence

1. inspect the existing `next-intl` / locale routing architecture and canonical Knowledge entities
2. map what is currently truly localized versus only route-localized
3. define a canonical locale-content contract for programmatic Knowledge pages
4. implement a bounded SV / DA / FI cohort
5. validate terminology and legal meaning
6. validate canonical + hreflang behavior
7. validate localized internal links
8. validate sitemap/indexability
9. typecheck/build/visual QA
10. expand only after quality is established

Do not begin by generating tens of thousands of translations.

## PARALLEL — Content / Social Engine v1

Founder/expert time should focus on knowledge, point of view and recording. AI-assisted workflow and/or a trusted operator can increasingly handle editing, captions, formatting, distribution and analytics.

Initial model:

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
- EU261 first; additional regimes later through the same architecture.

## Local parked work — DO NOT DISTURB

Known unrelated local user work must remain untouched:

- modified `docs/CLAIMS_DESK.md`
- modified `scripts/test-manual-claim.ts`
- untracked `scripts/create-reijo-claim.ts`

Rules:

- do not commit the current `docs/CLAIMS_DESK.md` local modifications as-is
- do not commit real customer PII from manual claim helper scripts
- do not use `git add .`
- do not use `git reset --hard`
- do not use `git clean`
- do not force push

## Exact resume action

If resuming immediately after this checkpoint:

**Start the SEO Internationalization / Localization Engine architecture audit on a clean dedicated branch after Research / Evidence Engine v1 is integrated according to the normal branch workflow.**

Before changing localization code, inspect the current implementation. Do not assume locale routes equal genuinely localized Knowledge content.

## Safety / recovery

- Preserve `docs/CURRENT_SPRINT.md` as historical record.
- Preserve unrelated local Claims/Reijo work.
- Do not rerun FlightAware population unless a later task explicitly requires new data.
- If state is uncertain after a crash, stop and read this file plus the 2026-09-04 Research/Evidence checkpoint before modifying code.
