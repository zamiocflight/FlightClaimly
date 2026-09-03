# Claim Rights Assessment Engine

**Status:** 🟢 LOCKED v1 — verified locally 2026-09-03.

## Purpose

Combine normalized claim/itinerary facts with existing aviation and legal engines into one reusable claim-level rights assessment. This layer answers **what FlightClaimly can currently conclude about a specific claim, what remains uncertain, what evidence is missing, and which authorities support the assessment.**

It consumes existing engines rather than duplicating their logic.

## Implementation paths

- `src/lib/claim-rights/types.ts` — normalized input/output contracts
- `src/lib/claim-rights/normalize.ts` — maps claim-assessment input into Legal Rule facts
- `src/lib/claim-rights/assessment.ts` — composes Legal Rule Resolver + Delay Reason assessment
- `src/lib/claim-rights/index.ts` — public engine API
- `scripts/audit-claim-rights.ts` — representative scenario assertions
- `npm run audit:claim-rights` — local audit command

The engine deliberately does **not** create a second transactional `Claim` model. Existing claim/precheck/itinerary data will be adapted into the normalized assessment contract at integration boundaries.

## Current input contract

`ClaimRightsAssessmentInput` accepts the minimum structured facts needed by current EU261 v1 rules:

- departure/arrival EU261-territory status
- operating-carrier Community-carrier status
- disruption type
- final-arrival delay minutes
- multiple-cause flag
- Delay Reason slug
- airline extraordinary-circumstances assertion
- explicit Article 8 / Article 9 engagement where already known
- class-change flag
- optional evidence labels

Future adapters can derive these fields from Claim, itinerary, route and airport objects without changing the Legal Rule layer.

## Normalization boundary

```text
Claim / Precheck / Itinerary data
        ↓
ClaimRightsAssessmentInput
        ↓
normalizeClaimRightsFacts()
        ↓
LegalFacts
        ↓
Passenger Rights Legal Rule Resolver
```

Normalization currently also translates Delay Reason slugs into the root-cause categories already used by verified legal rules where there is an exact mapping:

- `technical-problems` → `technical-problem`
- `hidden-manufacturing-defect` → same legal category
- `bird-strike` → same legal category
- `airline-staff-strike` → same legal category

Generic labels such as `operational-reasons` or `late-incoming-aircraft` are intentionally **not** converted into a legal root cause. They remain investigation signals in Delay Reason Engine.

## Resolver composition

`assessClaimRights(input)` evaluates all current Legal Rules and preserves three rule states:

- `matched`
- `unresolved`
- `not-matched`

The assessment then composes those rule results with the matching Delay Reason assessment profile. No legal rules are copied into this engine.

## Output contract

`ClaimRightsAssessment` exposes independent dimensions:

- overall investigation status
- EU261 applicability state
- matched/unresolved/not-matched rules
- potential passenger-right IDs
- compensation status
- potential care engagement
- potential rerouting/refund engagement
- extraordinary-circumstances defence review status
- Delay Reason assessment profile
- evidence targets
- assessment questions
- authority IDs
- legal-reference IDs

Current overall states:

- `insufficient-facts`
- `investigation-required`
- `ready-for-legal-review`

Current compensation states:

- `not-established`
- `potentially-entitled`
- `defence-under-review`

The engine does **not yet calculate EUR 250/400/600 automatically**. Article 7 amount calculation remains intentionally deferred until route distance/category, entitlement and any Article 7(2) reduction can be established safely.

## Important derived behaviour

Cancellation and involuntary denied boarding can derive Article 8/9 engagement for the current v1 resolver. Delay care remains fact-specific because Article 6 thresholds require distance/category and expected-departure-delay logic that is not yet encoded as deterministic conditions.

An airline assertion of extraordinary circumstances never produces an automatic rejection. It changes compensation assessment to `defence-under-review` and retains causation/reasonable-measures/evidence questions.

Likewise, extraordinary-circumstances review does not suppress care or rerouting/refund dimensions.

## Example flow

```text
CPH → LIS
EU261 departure = true
4h final arrival delay
Delay Reason = technical-problems
No extraordinary defence asserted
        ↓
EU261 scope rule matched
Long-delay compensation doctrine matched
Technical-problem doctrine matched
Delay Reason profile composed
        ↓
EU261 = applies
Compensation = potentially-entitled
Amount = not yet calculated
Investigation = required because root cause detail still matters
Evidence/questions = aggregated from both legal + Delay Reason engines
```

## Consumers

Current: reusable internal API + audit scenarios.

Next controlled consumer:

- Claims Desk read-only assessment integration

Later:

- claim triage
- demand letters
- airline-reply analysis
- evidence-request generation
- AI Brain orchestration
- customer-facing evidence-based explanations after internal validation

## Scenario audit

`scripts/audit-claim-rights.ts` asserts four representative boundaries:

1. EU departure + 4-hour technical delay → EU261 applies and compensation remains potentially entitled.
2. Bird strike + asserted extraordinary defence → defence review, never automatic rejection.
3. Cancellation → care and rerouting/refund potential remain preserved.
4. Missing geography → EU261 applicability is not confidently established.

## v1 verification / lock evidence — 2026-09-03

- `npm run audit:claim-rights` — **PASS**
- scenarios: **4**
- audit result: `PASS — composition, unresolved-state and defence boundaries behave as expected.`
- `npm run typecheck` — **PASS** (`tsc --noEmit`, no errors)
- `npm run build` — **PASS**
- Next.js **15.5.7**
- production compilation successful
- type validity check successful
- static generation **6,557 / 6,557**

Claim Rights Assessment Engine v1 is therefore **LOCKED**. Reopen only for a concrete defect, verified legal update, new regime/rule requirement, or controlled integration need.

## Safety boundaries

- Do not auto-send or expose legal conclusions to customers merely because a rule matched.
- Preserve unresolved/fact-specific states.
- Do not let extraordinary circumstances automatically suppress care/rerouting/refund rights.
- Do not duplicate Authority/Passenger Rights rules inside Claims Desk code.
- Keep customer-specific data transactional; do not publish it into Knowledge Engine registries.
- Do not treat Delay Reason editorial liability baselines as final legal decisions.

## Next integration contract — Claims Desk

The next product phase is **Claims Desk Assessment Integration**. The first implementation must remain internal/read-only and must adapt existing transactional Claim/itinerary data into `ClaimRightsAssessmentInput` rather than changing the locked legal engine to fit UI needs.

Target internal flow:

```text
Transactional Claim
    ↓
Claim Rights adapter
    ↓
known structured facts + verified enrichment
    ↓
assessClaimRights()
    ↓
Claims Desk assessment panel
```

The panel should surface established facts, unresolved facts, legal applicability, potential rights, defence status, Delay Reason/root-cause investigation, evidence targets, authority/legal references and readiness. External factual/legal research (flight operations, airline statements, official decisions, case law, contemporaneous reporting) belongs in a later evidence/research enrichment layer feeding verified facts/evidence into the assessment; the deterministic legal engine itself must not silently browse the web or convert unverified articles into legal facts.

A future customer communication layer may use the same verified assessment to explain **specific established circumstances** — for example the identified disruption/root cause and why it may support a claim — rather than sending every customer a generic “you may be entitled” message. Such communication must distinguish verified facts from matters still under investigation.