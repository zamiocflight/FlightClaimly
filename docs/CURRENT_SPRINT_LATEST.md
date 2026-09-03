# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-03**

> Authoritative recovery pointer. Read this before historical sprint documentation.

## Read Order After Session Loss

1. `docs/CURRENT_SPRINT_LATEST.md`
2. `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md` — **LOCKED v1 / integration contract**
3. `docs/engines/README.md` — engine ownership/documentation index
4. `docs/checkpoints/2026-09-03-passenger-rights-legal-rules-v1-start.md` — locked EU261 Legal Rule Layer v1
5. `docs/checkpoints/2026-09-02-delay-reason-engine-expansion.md` — locked Delay Reason Engine v1
6. `docs/checkpoints/2026-09-02-flight-number-global-seo-google.md` — secured Flight Number/global SEO checkpoint
7. `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md` — Knowledge Engine family architecture
8. `docs/SYSTEM_PROCESS_MAP.md` — complete platform/process map
9. `docs/CURRENT_SPRINT.md` — historical record; preserve it
10. `docs/CLAIMS_DESK.md` only for Claims Desk work; note local user modifications may exist and must be preserved

## Current Product / Growth State

Status: **🟢 Delay Reason Engine v1 locked / 🟢 EU261 Legal Rule Layer v1 locked / 🟢 Claim Rights Assessment Engine v1 locked / 🟡 Claims Desk Assessment Integration NEXT**

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

### Claim Rights Assessment Engine v1

Implementation:

- `src/lib/claim-rights/types.ts`
- `src/lib/claim-rights/normalize.ts`
- `src/lib/claim-rights/assessment.ts`
- `src/lib/claim-rights/index.ts`
- `scripts/audit-claim-rights.ts`

Developer contract:

`docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`

Verified locally 2026-09-03:

- `npm run audit:claim-rights` — **PASS**, 4 scenarios
- composition/unresolved-state/defence boundaries — **PASS**
- `npm run typecheck` — **PASS**, no errors
- `npm run build` — **PASS**
- Next.js **15.5.7**
- static generation **6,557 / 6,557**

Engine status: **🟢 LOCKED v1**.

### Locked assessment behaviour

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

Missing facts remain unresolved. Asserted extraordinary circumstances trigger review, not automatic denial. Generic Delay Reason labels are not promoted into invented legal root causes. Legal source/rule ownership stays in Authority + Passenger Rights engines.

## ACTIVE NEXT — Claims Desk Assessment Integration

The next product phase is to make the locked assessment useful on real transactional claims without changing the customer intake flow.

### Phase 1 target

```text
Existing transactional Claim / itinerary
        ↓
Claim Rights adapter
        ↓
known structured facts + verified enrichment
        ↓
assessClaimRights()
        ↓
read-only Claims Desk assessment panel
```

The first Claims Desk consumer should show, where supported by facts:

- established flight/itinerary facts
- EU261 applicability
- disruption and Delay Reason/root-cause assessment
- compensation potential/status
- Article 8 rerouting/refund dimension
- Article 9 care dimension
- airline extraordinary-circumstances defence state
- unresolved facts
- missing evidence and investigation targets
- assessment questions
- supporting authority/legal-reference IDs
- overall investigation/readiness status

### Investigation / evidence enrichment direction

The deterministic Claim Rights engine should **not** silently browse the public web. A separate research/evidence enrichment layer may later collect and analyze sources relevant to the actual disruption, including:

- flight operational data / FlightAware when justified
- airline and airport operational statements
- authority notices
- weather/ATC/airport information where relevant
- contemporaneous reputable reporting
- official judgments and verified case law
- airline replies and uploaded evidence

That layer must preserve source/provenance and confidence. Only sufficiently verified facts/evidence should feed the deterministic assessment. This separation lets FlightClaimly perform much of the initial detective work while preventing a news article or model inference from silently becoming a legal fact.

### Future customer communication

Do not default to a generic “we are reviewing and you may receive up to €600” message if the system has stronger verified information.

After internal validation, customer communication may summarize specific supported findings, for example:

- what disruption/root cause FlightClaimly has identified
- whether that circumstance normally strengthens or complicates the claim
- what remains under investigation
- why FlightClaimly is taking the case forward

Never present an unresolved allegation, news report or preliminary inference as established fact.

## Exact next engineering action

1. Inspect the current Claims Desk detail implementation and transactional Claim/itinerary shape.
2. Design the smallest adapter into `ClaimRightsAssessmentInput`.
3. Keep the first integration read-only and internal.
4. Do not modify locked legal rules merely to satisfy the UI.
5. Preserve any unrelated local Claims/Reijo modifications.
6. Verify the integration with targeted tests/typecheck/build before expanding into external research or customer messaging.

## Architecture Rules

- Read the relevant `docs/engines/*.md` before modifying an engine.
- `src/data/authority` remains the source-of-authority layer.
- Do not duplicate legal rules inside Claim Rights Assessment or Claims Desk.
- Applicability, entitlement, amount, care, rerouting/refund and defences remain separate dimensions.
- Missing facts remain unresolved.
- EU261 first; UK261/other regimes later through the same architecture.
- Research/enrichment supplies evidence and facts; deterministic legal engines evaluate them.

## Safety

- Do not run `global-core:scale` or unnecessary FlightAware population.
- Preserve unrelated local Claims/Reijo work.
- Do not use `git add .`, `git reset --hard`, `git clean`, or force push.
- Preserve `docs/CURRENT_SPRINT.md` history.
- Keep Product/Growth work separate from Claims Desk/Reijo work.