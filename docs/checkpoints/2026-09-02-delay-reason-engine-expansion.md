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

## Expansion Completed

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

## Legal / Product Design Principles

The expansion intentionally avoids treating airline disruption labels as conclusive legal answers.

Examples:

- `late-incoming-aircraft` is treated as a propagation description that requires tracing the root cause.
- `operational-reasons` is treated as a broad label that must be unpacked into the actual cause.
- `bad-weather` and ATC restrictions can be extraordinary, but causal connection and reasonable measures remain relevant.
- routine `crew-shortage` and ordinary technical failures are generally treated as airline operational matters rather than automatically extraordinary.
- an airline's own staff strike is distinguished from external third-party industrial action.
- `hidden-manufacturing-defect` is intentionally separated from ordinary technical problems as a narrow exceptional category.

The engine also distinguishes fixed EU261 compensation from care, rerouting and reimbursement rights; extraordinary circumstances do not automatically remove those separate rights.

## Relationship Layer

`src/data/delay-reasons/relationships.ts` now registers all 11 entities against the existing EU261 authority/regulation relationship layer.

This keeps the entities connected to the wider Knowledge Engine rather than leaving them as standalone articles.

## SEO Publication

The existing Delay Reason index automatically renders every entity from `delayReasons`.

The existing sitemap automatically publishes every Delay Reason entity for the configured `delayReasonSeoLocales` publication surface.

Current programmatic SEO policy remains unchanged: Delay Reason publication follows the existing controlled locale policy. Do not open additional locales merely because more English entities now exist.

## Git Checkpoint

Implementation commits:

- `98fe059` — `feat(delay-reasons): expand disruption knowledge engine`
- `b3fb3c6` — `feat(delay-reasons): map disruption relationships`

## Verification State

Remote source implementation is complete.

Before declaring the sprint fully closed, verify the final deployed state/build:

1. TypeScript / Next production build green
2. Delay Reason hub renders all 11 entities
3. representative new detail URLs return 200 in the allowed SEO locale
4. representative unsupported programmatic locale remains blocked according to the existing publication policy
5. sitemap contains all 11 Delay Reason detail URLs in the allowed locale surface
6. metadata/canonical/FAQ/Breadcrumb structured output remains valid

Do not rerun FlightAware population as part of this verification.

## Next Architecture Step

After deployment verification, the next meaningful Delay Reason evolution should be toward a richer classification/evidence model for Claims/AI use, for example:

- root-cause category
- control domain (airline / airport / ATC / weather / security / third party)
- default legal classification with conditionality
- evidence to request from airline/customer
- facts to verify externally
- reasonable-measures questions
- downstream/rotation propagation handling
- legal authority/case-law references

Do not add those fields casually until the current 11-entity public/knowledge expansion is verified green.
