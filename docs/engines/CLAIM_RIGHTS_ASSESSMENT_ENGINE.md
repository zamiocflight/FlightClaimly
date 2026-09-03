# Claim Rights Assessment Engine

**Status:** NEXT / design contract before implementation.

## Purpose

Combine normalized claim/itinerary facts with existing aviation and legal engines into one reusable claim-level rights assessment. This is the layer that will answer **what can FlightClaimly currently conclude about this specific claim, what remains uncertain, what evidence is missing, and which authorities support the assessment?**

It must consume existing engines rather than duplicate their logic.

## Target inputs

The smallest normalized fact contract should be derived from existing claim/precheck/itinerary models and should eventually provide enough information for:

- origin/destination/final destination
- itinerary/connection structure
- operating carrier where relevant
- disruption type
- scheduled/actual timing and final-arrival delay
- delay/cancellation reason and root-cause evidence
- passenger/booking conditions required by legal rules
- airline defence assertions
- rerouting/refund/care facts
- evidence availability

Do not create a parallel customer Claim model just for this engine.

## Upstream engines

```text
Claim / Precheck / Itinerary facts
  + Airport Engine
  + Country Engine
  + Route Engine
  + Flight Number Engine (when available)
  + Delay Reason Engine
  + Authority Engine
  + Passenger Rights Engine
```

## Target output

A structured assessment should expose separate dimensions, not one `eligible: true/false` flag:

- applicable legal regime / unresolved applicability
- matched, not-matched and unresolved legal rules
- potential passenger rights
- compensation entitlement status
- compensation amount/band where determinable
- care status
- rerouting/reimbursement status
- extraordinary-circumstances defence status
- causation and reasonable-measures questions
- evidence required / investigation targets
- supporting authority IDs and legal-reference IDs
- overall investigation/readiness status suitable for downstream consumers

## Target flow

```text
raw claim data
  → normalized assessment facts
  → geography / itinerary resolution
  → Delay Reason assessment
  → Passenger Rights Legal Rule Resolver
  → cross-rule claim reasoning
  → Claim Rights Assessment
  → Claims Desk / letters / airline replies / AI Brain
```

## Consumers

First: internal reusable assessment contract and audits/tests.

Later:

- Claims Desk
- claim triage
- demand letters
- airline-reply analysis
- evidence request generation
- AI Brain orchestration
- possibly customer-facing eligibility explanations after sufficient verification

## Safety boundaries

- Do not auto-send or expose legal conclusions to customers merely because a rule matched.
- Preserve unresolved/fact-specific states.
- Do not let an extraordinary-circumstances defence automatically suppress care/rerouting/refund rights.
- Do not duplicate Authority/Passenger Rights rules inside Claims Desk code.
- Keep customer-specific data transactional; do not publish it into Knowledge Engine registries.

## Definition of Done for first implementation

- existing claim/precheck/itinerary models inspected first;
- normalized input/output contracts defined;
- resolver composition implemented without duplicate legal logic;
- representative scenario assertions/audit added;
- missing facts remain unresolved;
- integrity/typecheck/full build green;
- this document and `CURRENT_SPRINT_LATEST.md` updated with actual implementation paths and lock state.
