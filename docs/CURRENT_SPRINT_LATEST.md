# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-03**

> Authoritative recovery pointer. Read this before historical sprint documentation.

## Read Order After Session Loss

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md` — locked v1 + integration contract
3. `docs/engines/README.md`
4. `docs/CLAIMS_DESK.md` for Claims Desk operating framework; preserve local user modifications
5. `docs/checkpoints/2026-09-03-passenger-rights-legal-rules-v1-start.md`
6. `docs/checkpoints/2026-09-02-delay-reason-engine-expansion.md`
7. `docs/checkpoints/2026-09-02-flight-number-global-seo-google.md`
8. `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md`
9. `docs/SYSTEM_PROCESS_MAP.md`
10. `docs/CURRENT_SPRINT.md` — historical record; preserve it

## Current state

Status: **🟢 Delay Reason Engine v1 locked / 🟢 EU261 Legal Rule Layer v1 locked / 🟢 Claim Rights Assessment Engine v1 locked / 🟡 Claims Desk Assessment Integration phase 1 IMPLEMENTED — awaiting local verification**

## Secured baselines

### Flight Number / Google

- checkpoint `643266e`
- 2,841 publishable Flight Number entities
- 44 represented airlines
- 3,141 route paths
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

Verified locally 2026-09-03:

- `npm run audit:claim-rights` — PASS, 4 scenarios
- `npm run typecheck` — PASS
- `npm run build` — PASS
- Next.js 15.5.7
- static generation 6,557 / 6,557

Status: **🟢 LOCKED v1**.

## ACTIVE — Claims Desk Assessment Integration phase 1

Implemented on branch `claims-desk-assessment-integration` and awaiting local verification before merge/lock.

### New adapter

`src/lib/claim-rights/claim-adapter.ts`

Purpose: conservatively adapt the existing transactional `Claim` into the locked `ClaimRightsAssessmentInput` contract.

Current behavior:

- derives departure/arrival IATA from the existing claim
- resolves airport country from Airport Registry
- derives EU261 territory only from an explicit EU261 country/territory allow-list
- reads structured disruption facts from existing claim `segments` only when actually present
- maps delayed/cancelled/denied disruption labels when found
- reads structured arrival/departure delay minutes when found
- reads a Delay Reason slug only when already stored
- deliberately leaves missing facts `undefined` so the Legal Rule Resolver returns unresolved rather than inventing facts
- does not use the existing dummy precheck as legal evidence
- does not use `compensationAmount` as proof of entitlement

Public export added through `src/lib/claim-rights/index.ts`.

### Claims Desk consumer

`src/app/admin/claims/[id]/page.tsx` now runs:

```text
getClaimById()
    ↓
claimToRightsAssessmentInput()
    ↓
assessClaimRights()
    ↓
internal read-only assessment panel
```

The panel currently exposes:

- overall investigation/readiness state
- EU261 applicability
- compensation status
- Article 8 potential
- Article 9 potential
- Delay Reason assessment when available
- evidence/investigation targets
- questions to resolve
- matched/unresolved/not-matched rule counts
- passenger-right IDs
- authority IDs
- legal-reference IDs

If the structured claim is not ready for legal review, unresolved rules remain, or an extraordinary-circumstances defence requires review, the panel explicitly displays **Deeper investigation recommended**.

This is intentional: deep external research is still a product/architecture decision, not an implemented autonomous research layer.

## Research layer — NOT IMPLEMENTED

Current design direction only:

- the Claims Desk may tell the operator that deeper investigation is needed
- a later research/evidence enrichment layer may assist with FlightAware, airline/airport statements, weather/ATC material, reputable reporting, official judgments and case law
- source/provenance/confidence must be retained
- the deterministic legal engine must not silently browse the web or turn unverified material into legal facts

Do not describe autonomous deep research as a current production capability.

## Customer communication — NOT IMPLEMENTED

Potential later direction: use sufficiently verified claim-specific findings to explain what FlightClaimly has found and why the case is being pursued, while withholding unnecessary litigation strategy and avoiding information that encourages customers to bypass FlightClaimly.

No customer email change is part of phase 1.

## Exact next action

Verify the branch locally before merge, one command at a time:

1. pull/fetch and switch to the integration branch without disturbing unrelated local Claims/Reijo files
2. `npm run audit:claim-rights`
3. `npm run typecheck`
4. `npm run build`
5. inspect one real claim in `/admin/claims/[id]`

If green, merge the integration and create/update a checkpoint. Do not call phase 1 locked before verification.

## Architecture rules

- Claim Rights Assessment Engine v1 remains locked.
- Claims Desk adapts into the engine contract; the engine is not bent around UI needs.
- Missing facts remain unresolved.
- Research/enrichment supplies sourced evidence/facts; deterministic legal engines evaluate them.
- Customer-specific data remains transactional.
- EU261 first; UK261/other regimes later through the same architecture.

## Safety

- Do not run `global-core:scale` or unnecessary FlightAware population.
- Preserve unrelated local Claims/Reijo work.
- Do not use `git add .`, `git reset --hard`, `git clean`, or force push.
- Preserve `docs/CURRENT_SPRINT.md` history.
- Do not overwrite local `docs/CLAIMS_DESK.md` modifications.