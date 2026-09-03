# Delay Reason Engine

**Status:** v1 complete, verified and locked.

## Purpose

Own FlightClaimly's structured disruption-cause taxonomy and the first reusable claim-assessment profile for each reason. It answers **what type of disruption cause are we dealing with, what legal/evidentiary questions does that reason raise, and what should be investigated next?**

It does **not** itself make the final EU261 entitlement decision.

## Core implementation

Data:

- `src/data/delay-reasons/delayReasons.ts`
- `src/data/delay-reasons/registry.ts`
- `src/data/delay-reasons/relationships.ts`
- `src/data/delay-reasons/types.ts`

Assessment:

- `src/lib/delay-reasons/assessment.ts`

Verification:

- `scripts/audit-delay-reasons.ts`
- `npm run audit:delay-reasons`

Presentation:

- `src/app/[locale]/delay-reasons/[slug]/page.tsx`
- Claim Assessment UI component used by the detail template.

## v1 entities

11 structured reasons:

- technical problems
- bad weather
- air traffic control
- airline staff strike
- crew shortage
- late incoming aircraft
- bird strike
- airport closure
- security issue
- hidden manufacturing defect
- operational reasons

Every reason has a corresponding relationship entry and assessment profile.

## Assessment model

Profiles classify the reason into a broad category and legal baseline, then expose:

- whether root-cause analysis is required
- summary
- evidence targets
- questions for the airline
- claimant signals
- recommended next step

Important: a delay-reason label is not automatically the legal cause. For example, `late-incoming-aircraft` can require tracing the root cause further back in the rotation.

## Relationships

```text
Disruption evidence / airline explanation
  → Delay Reason Engine
  → structured reason + investigation profile
  → Passenger Rights / Legal Rule analysis
  → Claim Rights Assessment
```

## Boundaries

- `extraordinaryCircumstance` or a baseline classification is not a final claim result.
- Article 5(3), causation, reasonable measures and burden of proof belong to Passenger Rights/Claim Rights Assessment using Authority sources.
- Do not add airline-specific legal exceptions to reason profiles.

## Verification / lock state

Locked baseline:

- 11 reasons
- 11 relationships
- 11 assessment profiles
- `npm run audit:delay-reasons` → PASS
- typecheck/build passed at lock
- 11 EN detail pages prerendered as SSG

Checkpoint: `docs/checkpoints/2026-09-02-delay-reason-engine-expansion.md`.
