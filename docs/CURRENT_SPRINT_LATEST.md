# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-03**

> Authoritative recovery pointer. Read this before historical sprint documentation.

## Read Order After Session Loss

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md` — **ACTIVE engine / verification contract**
3. `docs/engines/README.md` — engine ownership/documentation index
4. `docs/checkpoints/2026-09-03-passenger-rights-legal-rules-v1-start.md` — locked EU261 Legal Rule Layer v1
5. `docs/checkpoints/2026-09-02-delay-reason-engine-expansion.md` — locked Delay Reason Engine v1
6. `docs/checkpoints/2026-09-02-flight-number-global-seo-google.md` — secured Flight Number/global SEO checkpoint
7. `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md` — Knowledge Engine family architecture
8. `docs/SYSTEM_PROCESS_MAP.md` — complete platform/process map
9. `docs/CURRENT_SPRINT.md` — historical record; preserve it
10. `docs/CLAIMS_DESK.md` only for Claims Desk work

## Current Product / Growth State

Status: **🟢 Delay Reason Engine v1 locked / 🟢 EU261 Legal Rule Layer v1 locked / 🟡 Claim Rights Assessment Engine IMPLEMENTED — verification ACTIVE**

## Secured baselines

### Flight Number / Google

- checkpoint `643266e`
- **2,841** publishable Flight Number entities
- **44** represented airlines
- **3,141** route paths
- no FlightAware population required for current sprint

### Delay Reason Engine v1

- **11** structured reasons
- **11** relationships
- **11** assessment profiles
- audit/typecheck/build green at lock
- public detail pages SSG
- developer contract: `docs/engines/DELAY_REASON_ENGINE.md`

### EU261 Legal Rule Layer v1

- **7** authority sources
- **18** legal references
- **5** passenger rights
- **17** legal rules
- Legal Rule Resolver preserves `matched`, `not-matched`, `unresolved`
- `npm run audit:passenger-rights` PASS at lock
- typecheck PASS at lock
- full build **6,557 / 6,557** at lock
- developer contracts: `docs/engines/AUTHORITY_ENGINE.md`, `docs/engines/PASSENGER_RIGHTS_ENGINE.md`

## ACTIVE — Claim Rights Assessment Engine v1

The first reusable implementation has now been added on `main`.

### Implementation paths

- `src/lib/claim-rights/types.ts`
- `src/lib/claim-rights/normalize.ts`
- `src/lib/claim-rights/assessment.ts`
- `src/lib/claim-rights/index.ts`
- `scripts/audit-claim-rights.ts`
- package command: `npm run audit:claim-rights`

Developer contract:

`docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`

### Implemented flow

```text
Claim / Precheck / Itinerary facts
        ↓
ClaimRightsAssessmentInput
        ↓
normalizeClaimRightsFacts()
        ↓
Passenger Rights Legal Rule Resolver
        +
Delay Reason Assessment
        ↓
Claim Rights Assessment
        ↓
future Claims Desk / letters / airline-reply analysis / AI Brain
```

### Current output dimensions

The engine intentionally does not return one simplistic `eligible` boolean. It exposes:

- EU261 applicability state
- matched/unresolved/not-matched legal rules
- potential passenger rights
- compensation status
- care potential
- rerouting/refund potential
- extraordinary-circumstances review status
- Delay Reason assessment
- evidence targets
- assessment questions
- authority IDs
- legal-reference IDs
- overall investigation/readiness state

Current overall states:

- `insufficient-facts`
- `investigation-required`
- `ready-for-legal-review`

Current compensation states:

- `not-established`
- `potentially-entitled`
- `defence-under-review`

Article 7 EUR 250/400/600 calculation is deliberately not yet forced. It will be added only when entitlement + route distance/category + any Article 7(2) reduction can be resolved safely.

### Safety behaviour already implemented

- missing facts remain unresolved rather than silently false
- asserted extraordinary circumstances trigger review, not automatic rejection
- extraordinary-circumstances review does not suppress care/rerouting/refund dimensions
- generic Delay Reason labels are not promoted into invented legal root causes
- legal source/rule ownership stays in Authority + Passenger Rights engines
- no Claims Desk refactor has been performed

### Representative scenario audit

`scripts/audit-claim-rights.ts` asserts:

1. EU departure + four-hour technical delay → EU261 applicability + potential compensation.
2. Bird strike + extraordinary defence assertion → defence review, not automatic denial.
3. Cancellation → care and rerouting/refund dimensions remain preserved.
4. Missing geography → EU261 applicability is not confidently established.

## EXACT NEXT ACTION — VERIFY BEFORE LOCK

No more feature expansion before verification.

Run locally in this order, one command at a time:

1. `git pull`
2. `npm run audit:claim-rights`
3. `npm run audit:passenger-rights`
4. `npm run typecheck`
5. `npm run build`

If all are green, update this file and `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md` to **🟢 LOCKED v1** with exact counts/results.

## After v1 lock

The next design decision should be the first adapter from existing transactional claim/itinerary data into `ClaimRightsAssessmentInput`, followed by a controlled internal Claims Desk consumer. Do not expose automated legal conclusions to customers before that contract is stable.

## Architecture Rules

- Read the relevant `docs/engines/*.md` before modifying an engine.
- `src/data/authority` remains the source-of-authority layer.
- Do not duplicate legal rules inside Claim Rights Assessment or Claims Desk.
- Applicability, entitlement, amount, care, rerouting/refund and defences remain separate dimensions.
- Missing facts remain unresolved.
- EU261 first; UK261/other regimes later through the same architecture.

## Safety

- Do not run `global-core:scale` or unnecessary FlightAware population.
- Preserve unrelated local Claims/Reijo work.
- Do not use `git add .`, `git reset --hard`, `git clean`, or force push.
- Preserve `docs/CURRENT_SPRINT.md` history.
- Keep Product/Growth work separate from Claims Desk/Reijo work.
