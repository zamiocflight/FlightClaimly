# Wave 1 Google handoff + Wave 2 resume — 2026-09-06

Status: **WAVE 1 RELEASED / GOOGLE HANDOFF STARTED / WAVE 2 NEXT**

## Why this checkpoint exists

This is the crash-recovery bridge between Flight Number Localization Wave 1 and the coordinated Knowledge cohort Localization Wave 2. Read this before starting Wave 2 after any session loss.

## Completed before this checkpoint

Flight Number Localization Wave 1 is complete and locked for:

`SV → DA → PL → DE → FI → NL`

English remains the base/published locale. The locked production-scale baseline is:

- 2,841 canonical publishable Flight Numbers
- 44 represented airlines
- 19,887 Flight Number detail paths = 2,841 × 7 locales
- 308 Flight Number airline-group paths = 44 × 7 locales
- 23,867 / 23,867 static pages in the final full production build
- 2,886 Flight Number sitemap URLs per localized market = 2,841 detail + 44 airline group + 1 index

Authoritative market lock checkpoints remain under `docs/checkpoints/2026-09-04-*` and `docs/checkpoints/2026-09-05-*`, with Dutch as the final Wave 1 market lock.

## Production / Google handoff

The new localized Flight Number surfaces were verified live before Search Console handoff. Google Search Console work then began:

- sitemap was submitted/resubmitted after the production release
- strategic Wave 1 URLs/hubs were inspected rather than manually requesting thousands of URLs
- manual indexing requests were accepted for representative Wave 1 surfaces
- German initially hit a transient Search Console request error/quota-style failure, then succeeded later
- Finnish subsequently succeeded as well
- Google is now responsible for normal discovery/crawl/indexation of the wider sitemap cohort

Do **not** repeatedly request indexing for thousands of programmatic URLs. Use sitemap discovery and monitor representative URLs/cohort health.

## Search Console monitoring rule

Indexing/ranking is asynchronous. Do not interpret a URL being absent immediately after submission as a defect. Monitor over days/weeks, not minutes.

The older Search Console index report currently contains legacy issues from the previous ~9k URL footprint, including examples such as:

- duplicate without user-selected canonical
- 404
- redirect
- discovered — currently not indexed
- duplicate where Google selected another canonical
- crawled — currently not indexed

These are a **later cleanup/audit lane**, not a blocker for starting Wave 2. When that cleanup starts, classify samples by current live behavior before changing code; old Search Console data can lag current production.

## Analytics observations to preserve

A GA4 review showed a 2026-08-24 page-view spike concentrated around claim-flow/admin URLs. Treat this as likely development/test/automated traffic rather than an SEO growth event unless later evidence proves otherwise. Datacenter-like locations also appeared in the small traffic sample.

Future analytics cleanup should consider excluding/internalizing development, admin and automated test traffic so acquisition/conversion reporting becomes cleaner. This is **not** the active task now.

## ACTIVE NEXT — Localization Wave 2

Wave 2 is **not** another Flight Number pass.

It localizes the remaining coordinated Knowledge cohorts market by market as one package:

- Routes
- Airports
- Airlines
- Countries
- Delay Reasons

Locked execution order:

`SV → DA → PL → DE → FI → NL`

Start with **Swedish**.

For each market:

1. inspect canonical data and current page architecture for all five cohorts
2. research local terminology/search intent where needed
3. localize from canonical facts, never from another translated locale
4. preserve legal/factual invariants and publication quality gates
5. validate metadata/search intent
6. validate internal linking across the five-cohort package
7. validate canonical + publishable-only hreflang
8. validate sitemap exposure and exact cohort arithmetic
9. run architecture/type validation
10. use optimized Preview and representative rendered QA
11. verify unsampled Preview behavior where relevant
12. stop Preview before final full production build
13. run one meaningful full production build
14. write a market lock checkpoint before moving to the next market

Do not rerun FlightAware merely for localization.

## After Wave 2 — planned Product/Conversion pass

After Wave 2 is complete, perform a dedicated premium UX/design/conversion review of the public site and complete claim journey. This is intentionally sequenced **after** Wave 2, not mixed into localization.

Review should cover desktop + mobile and the journey from landing/search entry through claim completion, including:

- visual hierarchy, typography, spacing and premium brand feel
- trust/authority signals
- CTA clarity and conversion friction
- claim-flow progress/navigation
- form UX and validation
- loading, empty, success and error states
- copy clarity and reassurance
- responsive behavior
- microinteractions where they materially improve confidence/usability
- consistency between SEO landing pages and transactional claim flow
- analytics/conversion instrumentation

Goal: make FlightClaimly feel more premium, trustworthy and operationally mature without cosmetic churn or sacrificing speed/accessibility/conversion.

## Later lanes — do not lose

After/alongside the planned sequence, retain these backlog lanes:

- Search Console legacy index-quality cleanup (duplicates, 404s, redirects, discovered/crawled-not-indexed)
- analytics hygiene / internal and automated traffic separation
- Content / Social Engine
- Manual / Legacy Claim Engine generalization
- Claims Desk Workflow v2
- Airline Submission Engine
- Customer Communication Engine
- Escalation Engine
- Claims Intelligence
- additional passenger-right regimes through deterministic legal architecture

## Safety / parked local work

Do not mix unrelated local Claims/Reijo files into localization commits. Preserve the known parked work and never commit real customer PII from helper scripts.

## Exact crash-resume sentence

**Wave 1 Flight Number Localization is complete, live and handed to Google. Search Console sitemap/indexing handoff has started and representative requests including DE and FI succeeded. Do not wait for full Google indexation before engineering continues. Begin Wave 2 with the Swedish coordinated package Routes + Airports + Airlines + Countries + Delay Reasons. After Wave 2, perform the planned premium UX/design/conversion pass. Search Console legacy errors and analytics hygiene are later cleanup lanes, not the current blocker.**
