# FlightClaimly — Delay Reason Engine Expansion Checkpoint

Date: **2026-09-02**

> Recovery checkpoint for the Product / Growth workstream. Preserve the earlier Flight Number/global SEO checkpoint and all historical sprint documentation.

## Objective

Expand the Delay Reason Engine from a single substantive reason into a reusable disruption-knowledge layer that can serve:

- programmatic SEO
- claim eligibility reasoning
- evidence requirements
- airline-response analysis
- future AI Brain orchestration
- future FlightAware disruption/rotation reconstruction

The engine remains **knowledge-first**. Public SEO pages are an output of the structured entities rather than the primary data model.

## Existing Architecture Preserved

The following architecture already existed and remains in use:

- `src/data/delay-reasons/types.ts`
- `src/data/delay-reasons/registry.ts`
- `src/data/delay-reasons/relationships.ts`
- `src/data/delay-reasons/delayReasons.ts`
- `src/lib/delay-reasons/*`
- `src/components/seo/delay-reasons/*`
- `/[locale]/delay-reasons`
- `/[locale]/delay-reasons/[slug]`
- Delay Reason sitemap integration

No parallel Delay Reason system was created.

## Knowledge Expansion Completed

The engine now contains **11 structured delay/disruption reason entities**:

1. `technical-problems`
2. `bad-weather`
3. `air-traffic-control`
4. `airline-staff-strike`
5. `crew-shortage`
6. `late-incoming-aircraft`
7. `bird-strike`
8. `airport-closure`
9. `security-issue`
10. `hidden-manufacturing-defect`
11. `operational-reasons`

Each entity carries the existing structured knowledge fields:

- title / description
- overview
- extraordinary-circumstance classification
- passenger-rights explanation
- compensation rules
- structured statistics / quick facts
- disruption/claim timeline
- FAQ

## Structured Claim Assessment Engine — COMPLETED

A second structured layer now sits on top of the public knowledge entities:

`src/lib/delay-reasons/assessment.ts`

Each of the 11 Delay Reason entities now has a machine-readable assessment profile containing:

- disruption category
- baseline liability classification
- whether root-cause reconstruction is required
- assessment summary
- evidence targets
- questions to put to the airline
- claimant/red-flag signals
- recommended next investigation step

Current baseline categories:

- `airline-operational`
- `external-event`
- `mixed-or-root-cause`
- `technical`

Current liability baselines:

- `usually-compensable`
- `usually-extraordinary`
- `fact-specific`

The assessment resolver includes a safe fact-specific fallback for future Delay Reason slugs so an unknown reason is not silently treated as compensable or extraordinary.

## Public Knowledge Page Integration — COMPLETED

New component:

`src/components/seo/delay-reasons/ClaimAssessment.tsx`

`DelayReasonKnowledgeTemplate` now resolves the structured assessment profile for each Delay Reason and renders an investigation section containing:

- baseline assessment
- evidence to verify
- questions for the airline
- signals deserving closer review
- next investigative step

This turns the Delay Reason pages from generic legal explainers into visible outputs of the same investigation model intended for future Claims/AI use.

## Integrity Audit — ADDED

New command:

`npm run audit:delay-reasons`

Implementation:

`scripts/audit-delay-reasons.ts`

The audit checks:

- duplicate Delay Reason slugs
- every Delay Reason has a relationship entry
- every Delay Reason has a structured assessment profile
- no relationship points to an unknown reason
- no assessment profile points to an unknown reason

Expected aligned state is currently:

- Delay Reasons: **11**
- EU261 relationships: **11**
- claim-assessment profiles: **11**

## Legal / Product Design Principles

The engine intentionally avoids treating airline disruption labels as conclusive legal answers.

Examples:

- `late-incoming-aircraft` is a propagation description and requires tracing the root cause.
- `operational-reasons` is too broad to determine liability and must be unpacked.
- `bad-weather` and ATC restrictions can be extraordinary, but causal connection and reasonable measures remain relevant.
- routine `crew-shortage` and ordinary technical failures are generally airline operational matters rather than automatically extraordinary.
- an airline's own staff strike is distinguished from external third-party industrial action.
- `hidden-manufacturing-defect` is intentionally separated from ordinary technical problems as a narrow exceptional category.
- extraordinary circumstances do not automatically remove separate care, rerouting or reimbursement rights.

The assessment layer therefore separates **airline label**, **root cause**, **causation**, **reasonable measures**, and **passenger-rights outcome**.

## Relationship / SEO Layer

`src/data/delay-reasons/relationships.ts` registers all 11 entities against the existing EU261 authority/regulation relationship layer.

The existing Delay Reason index automatically renders every entity from `delayReasons` and the existing sitemap automatically publishes them for the configured `delayReasonSeoLocales` surface.

Current controlled locale policy remains unchanged. Do not open additional programmatic locales merely because more English entities now exist.

## Git Checkpoint

Knowledge expansion:

- `98fe059` — `feat(delay-reasons): expand disruption knowledge engine`
- `b3fb3c6` — `feat(delay-reasons): map disruption relationships`

Structured assessment implementation:

- `01e8a92` — `feat(delay-reasons): add structured claim assessment engine`
- `3d564a8` — `feat(delay-reasons): render structured claim assessment`
- `d0d8764` — `feat(delay-reasons): integrate claim assessment into knowledge pages`
- `dfe3e20` — `feat(delay-reasons): export assessment engine`
- `4f4eb77` — `chore(delay-reasons): add engine integrity audit`
- `dde9521` — `chore(delay-reasons): add audit command`

## Verification State

Source implementation is now complete on remote `main`.

The next verification pass must establish:

1. `npm run audit:delay-reasons` passes
2. TypeScript / Next production build is green
3. Delay Reason hub renders all 11 entities
4. representative new detail URLs return 200 in the allowed SEO locale
5. representative unsupported programmatic locale remains blocked according to existing publication policy
6. sitemap contains all 11 Delay Reason detail URLs in the allowed locale surface
7. metadata/canonical/FAQ/Breadcrumb structured output remains valid
8. the new Claim Assessment section renders correctly on representative pages

Do not rerun FlightAware population as part of this verification.

## Recovery / Next Step

If the session fails now, do **not** rebuild the Delay Reason architecture from scratch.

Resume by reading this checkpoint and then verify the current remote implementation. The next architectural evolution after green verification can connect these assessment profiles to actual claim intake / Claims Desk / AI Brain workflows, including FlightAware-assisted root-cause reconstruction and legal authority/case-law enrichment.
