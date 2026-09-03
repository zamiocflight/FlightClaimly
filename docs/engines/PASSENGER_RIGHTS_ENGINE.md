# Passenger Rights Engine

**Status:** EU261 Legal Rule Layer v1 complete, verified and locked.

## Purpose

Turn verified legal authority into structured, executable passenger-rights rules. It answers **which legal rules are potentially engaged by a set of facts, which facts are still missing, and what rights/defences those rules concern?**

This is the reusable legal reasoning layer between Authority Engine and claim-specific assessment.

## Core implementation

Data/model:

- `src/data/passenger-rights/types.ts`
- `src/data/passenger-rights/registry.ts`
- `src/data/passenger-rights/rules.ts`
- `src/data/passenger-rights/index.ts`

Resolver:

- `src/lib/passenger-rights/resolver.ts`
- `src/lib/passenger-rights/index.ts`

Verification:

- `scripts/audit-passenger-rights.ts`
- `npm run audit:passenger-rights`

Authority dependency:

- `src/data/authority/*`

## v1 model

High-level Passenger Rights include:

- fixed compensation
- care
- rerouting
- ticket reimbursement
- passenger-rights information

The Legal Rules layer distinguishes kinds such as applicability, entitlement, amount, care, rerouting, reimbursement, defence, information and class change.

## Resolver behavior

The resolver evaluates structured fact paths against rule conditions and returns three important states:

- **matched** — known facts satisfy the rule conditions;
- **not matched** — known facts contradict the rule conditions;
- **unresolved** — required facts are missing.

`unresolved` is a first-class legal state. Missing evidence must never silently become `false`.

## EU261 v1 coverage

Structured rules/references cover Articles 3, 4, 5, 5(3), 6, 7, 8, 9, 10 and 14, plus verified CJEU doctrine for long arrival delay, technical defects, hidden manufacturing defects, bird strikes, internal airline staff strikes, mixed causation, extraordinary circumstances and reasonable measures.

Locked graph baseline:

- 7 authorities
- 18 legal references
- 5 passenger rights
- 17 legal rules

## Processing model

```text
AuthoritySource + LegalReference
  → PassengerRight + LegalRule
  → claim/itinerary fact map
  → Legal Rule Resolver
  → matched / not matched / unresolved rules
  → Claim Rights Assessment Engine
```

## Critical separation

- Applicability ≠ entitlement.
- Entitlement ≠ amount.
- Compensation ≠ care/rerouting/reimbursement.
- Extraordinary circumstances can affect compensation without automatically removing Article 8/9 rights.
- A rule match is not yet the final claim-level conclusion.

## Consumers

The primary next consumer is Claim Rights Assessment Engine. Later consumers can include Claims Desk, demand-letter generation, airline-reply analysis, AI Brain and public passenger-rights explanations.

## Verification / lock state

At v1 lock:

- `npm run audit:passenger-rights` → PASS
- `npm run typecheck` → PASS
- `npm run build` → PASS
- static generation remained 6,557 / 6,557

Checkpoint: `docs/checkpoints/2026-09-03-passenger-rights-legal-rules-v1-start.md`.
