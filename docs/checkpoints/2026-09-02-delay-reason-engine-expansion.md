# FlightClaimly — Delay Reason Engine Expansion Checkpoint

Date: **2026-09-02**

> Recovery checkpoint for the Product / Growth workstream. Preserve the earlier Flight Number/global SEO checkpoint and all historical sprint documentation.

## Status — LOCKED V1

**Delay Reason Engine v1 is complete, verified and locked as of 2026-09-02.**

Do not reopen or refactor this engine unless a concrete defect, legal-content update, new disruption category, or later AI/Claims integration requires it.

Final verified state:

- Delay Reason entities: **11**
- relationship entries: **11**
- claim-assessment profiles: **11**
- `npm run audit:delay-reasons`: **PASS**
- `npm run typecheck`: **PASS**
- production build: **PASS**
- static build after SSG conversion: **6,557 / 6,557 pages**
- Delay Reason detail pages: **11 SSG pages**
- production sitemap Delay Reason entries: **11**
- representative production URLs return **HTTP 200**
- Claim Assessment content verified live
- current programmatic Delay Reason SEO publication remains **English-only**

Final SSG commit:

- `e5f9769` — `feat(delay-reasons): prerender delay reason detail pages`

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

Delay Reason detail pages were subsequently converted from dynamic on-demand rendering to **SSG** through `generateStaticParams`, using the controlled `delayReasonSeoLocales` publication surface. The current programmatic publication locale is `en` only.

## Integrity Audit — ADDED

Command:

`npm run audit:delay-reasons`

Implementation:

`scripts/audit-delay-reasons.ts`

The audit checks:

- duplicate Delay Reason slugs
- every Delay Reason has a relationship entry
- every Delay Reason has a structured assessment profile
- no relationship points to an unknown reason
- no assessment profile points to an unknown reason

Verified aligned state:

- Delay Reasons: **11**
- EU261 relationships: **11**
- claim-assessment profiles: **11**
- result: **PASS**

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

The Delay Reason index renders the entities from structured data and the sitemap publishes all 11 detail URLs for the configured SEO locale surface.

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
- `e5f9769` — `feat(delay-reasons): prerender delay reason detail pages`

## Final Verification — COMPLETED

Local/runtime verification completed on 2026-09-02:

1. `npm run audit:delay-reasons` → **PASS**
2. `npm run typecheck` → **PASS**
3. first production build → **6,546 / 6,546** static pages, no errors
4. sitemap contained **11** `/delay-reasons/` detail URLs
5. production `/en/delay-reasons/bad-weather` → **HTTP 200**
6. Claim Assessment heading verified in production HTML
7. production `/en/delay-reasons/late-incoming-aircraft` → **HTTP 200**
8. `Root-cause review required` verified in production HTML
9. detail pages converted to SSG
10. final production build → **6,557 / 6,557** pages
11. build output shows `/[locale]/delay-reasons/[slug]` as **● SSG**, with 11 English paths

No FlightAware population was rerun.

## Recovery / Next Step

If the session fails now, do **not** rebuild or re-verify Delay Reason Engine v1 from scratch. It is locked green.

The next Product / Growth Knowledge Engine workstream is the **Legal Authority / Passenger Rights Knowledge Engine**. Its purpose is to turn the currently thin authority registry into structured legal reasoning that Delay Reasons, routes, airlines, flight numbers, claim intake and the future AI Brain can reference.
