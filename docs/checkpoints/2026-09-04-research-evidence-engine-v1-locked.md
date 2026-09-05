# Research / Evidence Engine v1 Foundation — LOCKED

Date: **2026-09-04**
Status: **🟢 LOCKED v1 foundation**
Branch at lock: `research-evidence-engine-v1`

## Purpose

Create a safe research/evidence layer between unresolved claim facts and FlightClaimly's deterministic legal engine.

## Locked architecture

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
Verification review history
  ↓
Fact Resolver
  ↓
verified fact / conflicting evidence / unresolved
  ↓
enriched Claim Rights input
  ↓
deterministic Legal Engine rerun
  ↓
Updated Claim Rights Assessment
```

## Implemented

### Research Planner

- Converts unresolved assessment needs into bounded operator-facing research tasks.
- Consolidation reduced a noisy worst-case plan from 91 raw questions to 14 actionable investigations.
- Operator wording is explicit and action-oriented.
- Planner quality guard is enforced by audit.

### Evidence provider boundary

- `ResearchEvidenceProvider` defines the provider contract.
- Providers return findings, source/provenance and extraction confidence.
- Providers cannot self-certify evidence as legally verified.
- Fresh provider findings always enter the registry as `unverified`.

### Evidence Registry

- Provider provenance retained.
- Source URL / source record / observed time supported.
- Deterministic SHA-256 content fingerprints.
- Idempotent collection/persistence.
- Supabase persistence through `claim_research_evidence`.
- RLS enabled; intended server-side through service role.

### Fact Resolver and enrichment

- Unverified evidence cannot become a legal fact.
- Verified/corroborated evidence may support fact resolution.
- Conflicting evidence remains conflicting and is not promoted.
- Missing facts remain unresolved.
- Resolved facts enrich the existing Claim Rights input and rerun the deterministic Legal Engine.
- Research does not replace or silently mutate the legal rule layer.

### Verification provenance

Verification decisions are append-only rather than destructive status toggles.

- source evidence remains immutable
- review history records status, reviewer type/id, method, timestamp and note
- latest review determines effective verification status
- history is retained for auditability
- Supabase persistence through `claim_research_evidence_reviews`
- RLS enabled

This prevents an external provider from bypassing FlightClaimly's verification boundary and preserves who/what verified evidence and on what basis.

### Claims Desk integration

`/admin/claims/[id]` loads persisted evidence and runs:

```text
Claim
→ Claim Rights adapter
→ persisted Evidence Registry
→ Research / Evidence assessment
→ deterministic Claim Rights assessment
→ internal Claims Desk panel
```

The Claims Desk shows research progress/tasks and the Evidence Registry. No evidence is invented when the registry is empty.

## Database migrations applied

Applied manually in Supabase SQL Editor on 2026-09-04:

1. `supabase/migrations/20260904_claim_research_evidence.sql`
2. `supabase/migrations/20260904_claim_research_evidence_reviews.sql`

Both completed successfully.

## Verification at lock

Local verification completed on 2026-09-04:

- `npm run audit:research-evidence` — PASS, 7 scenarios
- `npm run audit:evidence-verification` — PASS
- `npm run typecheck` — PASS
- `npm run build` — PASS
- Next.js 15.5.7
- production build compiled successfully
- static generation 6,557 / 6,557
- `/admin/claims/[id]` remains dynamic/server-rendered
- real Claims Desk claim visually verified with 14 actionable research tasks and empty persisted Evidence Registry state

## Explicitly NOT part of this lock

The foundation is locked; external autonomous research providers are not yet production capabilities.

Not yet connected:

- FlightAware/operational provider integration for this engine
- weather/ATC providers
- airline/airport automated source retrieval
- OpenAI research orchestration
- automatic case-law retrieval
- automatic operator verification UI/actions
- autonomous airline submission or customer communication

Those capabilities must plug into the locked provider → registry → verification → resolver architecture rather than bypass it.

## Architecture invariants

1. Research and legal evaluation remain separate.
2. Every external fact retains provenance.
3. Provider confidence is not legal verification.
4. Fresh provider evidence is unverified.
5. Verification decisions retain append-only provenance.
6. Conflicting evidence never silently becomes legal fact.
7. Missing facts remain unresolved when unsafe to establish.
8. Consequential legal assessment remains deterministic.
9. Claim Rights Assessment Engine v1 remains locked.
10. Do not reopen this foundation absent a defect, integration requirement, or deliberate v2 change.

## Next execution target

**SEO Internationalization / Localization Engine**.

Immediate plan:

1. inspect existing locale architecture and canonical Knowledge entities
2. define canonical locale-content contract
3. implement bounded SV / DA / FI pilot architecture
4. validate natural language/legal terminology
5. validate canonical + hreflang
6. validate localized internal links and sitemap/indexability
7. deploy bounded cohort and monitor before scaling

Content / Social Engine v1 can proceed in parallel.

## Recovery note

If a future session is lost, read:

1. `docs/CURRENT_SPRINT_LATEST.md`
2. this checkpoint
3. `docs/ROADMAP.md`
4. locked engine docs

Do not infer that external research APIs are connected merely because the Research / Evidence Engine foundation is locked.
