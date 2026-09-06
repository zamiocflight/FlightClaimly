# FlightClaimly — Product / SEO / Growth Roadmap

Last updated: **2026-09-06**

> This file is the strategic roadmap. Exact crash recovery and current execution state live in `docs/CURRENT_SPRINT_LATEST.md`. Historical roadmap versions remain available in Git history and detailed lock checkpoints under `docs/checkpoints/`.

## Mission

FlightClaimly should become a trusted European knowledge and claims platform for flight disruption and passenger rights.

The operating model is:

```text
Knowledge → Customer Acquisition
Claims → Customer Recovery
Resolved Claims → Better Intelligence → Better Knowledge
```

We build authoritative reusable knowledge, distribute it through search/content, convert eligible passengers through a high-trust claim experience, and feed structured operational learning back into the platform.

## Strategic lanes

### 1. SEO / Knowledge Acquisition

Programmatic Knowledge Engine + Localization Engine + internal linking + search monitoring.

### 2. Product / Claims Operations

Eligibility, evidence, research, claim handling, airline submission, customer communication, escalation and payout operations.

### 3. Growth / Content

Verified Knowledge reused across social, short-form video, articles/newsletter and future channels, measured against qualified traffic and claims.

---

# CURRENT EXECUTION SEQUENCE

## Phase A — Research / Evidence foundation — 🟢 LOCKED

Research/Evidence Engine v1 foundation is locked. External provider integrations remain future work through the provider → registry → verification → resolver architecture. Research does not silently become legal fact.

Authoritative checkpoint:

`docs/checkpoints/2026-09-04-research-evidence-engine-v1-locked.md`

## Phase B — Flight Number Localization Wave 1 — 🟢 COMPLETE / LOCKED / RELEASED

Markets completed:

```text
SV → DA → PL → DE → FI → NL
```

English remains the base published locale.

Final scale:

- 2,841 canonical publishable Flight Numbers
- 19,887 Flight Number detail paths across seven published locales
- 44 airline groups / 308 localized airline-group paths
- 2,886 Flight Number sitemap URLs per localized market
- 23,867 / 23,867 static pages in final full production build

Google Search Console handoff has begun: sitemap submitted/resubmitted and representative strategic indexing requests accepted, including later-successful DE and FI requests. Large-scale discovery now belongs to normal Google sitemap/crawl processing.

Authoritative handoff checkpoint:

`docs/checkpoints/2026-09-06-wave1-google-handoff-wave2-resume.md`

## Phase C — Localization Wave 2 — 🔵 ACTIVE NEXT

Wave 2 localizes the remaining major Knowledge cohorts. Work **market by market**, treating these as one coordinated package:

- Routes
- Airports
- Airlines
- Countries
- Delay Reasons

Locked market order:

```text
SV → DA → PL → DE → FI → NL
```

For each market: inspect canonical architecture, establish local terminology/search intent, localize from canonical facts, enforce quality gates, verify internal links/canonical/hreflang/sitemap, run type/architecture validation, Preview QA, unsampled QA where relevant, one meaningful final production build, then write a market lock checkpoint.

Do not rerun FlightAware merely for localization. Do not infer these cohorts are publishable because Flight Numbers are publishable.

## Phase D — Premium UX / Design / Conversion pass — ⏭️ AFTER WAVE 2

After Wave 2, perform a deliberate end-to-end product polish and conversion review. This phase is now explicitly on the roadmap and must not be lost.

Review desktop + mobile from first landing/search entry through completed claim:

- premium visual hierarchy, typography and spacing
- trust/authority presentation
- CTA clarity
- claim-flow progress/navigation
- form friction and validation
- loading/error/empty/success states
- reassurance and copy clarity
- responsive behavior
- useful microinteractions
- consistency between Knowledge/SEO pages and claim flow
- performance/accessibility guardrails
- analytics and conversion instrumentation

Goal: make FlightClaimly look and feel more premium, credible and mature while improving conversion — not cosmetic redesign for its own sake.

## Phase E — Search Console / Analytics quality cleanup

Do this after Google has had reasonable time to process the new release, unless a concrete production-critical SEO defect appears sooner.

Search Console audit includes legacy cohorts such as duplicate/canonical issues, 404s, redirects, discovered-not-indexed and crawled-not-indexed. Always sample current live URLs before changing code because Search Console reports can lag.

Analytics hygiene includes separating internal/admin/development/automated test traffic where practical. A 2026-08-24 GA4 spike was concentrated around claim-flow/admin URLs and should not be treated as organic growth without contrary evidence.

---

# Claims Operations roadmap

## Manual / Legacy Claim Engine

Generalize staff-approved/manual onboarding without storing customer PII in source-controlled helper scripts.

## Claims Desk Workflow v2

Turn unresolved evidence questions into a living investigation workflow with resolved / unresolved / ruled-out states and explicit next actions.

## Airline Submission Engine

Structured demands, evidence packages, airline-specific submission channels, authority attachments, correspondence history, deadlines and follow-up logic.

## Customer Communication Engine

Use sufficiently verified claim-specific findings for trustworthy customer updates without exposing premature legal conclusions or unnecessary internal strategy.

## Escalation Engine

ADR, NEB/regulatory routes, legal review, litigation recommendation, customer approval for additional exposure, external-counsel handoff and enforcement support.

## Claims Intelligence

Resolved claims should improve future assessments and playbooks through structured outcomes: rejection reasons, successful arguments, processing times, evidence patterns, compensation/recovery results and escalation outcomes.

## Additional passenger-right regimes

Add further regimes through the deterministic authority → legal rule → claim assessment architecture, not ad-hoc parallel logic.

---

# Content / Social roadmap

FlightClaimly content should begin with verified Knowledge, not disconnected channel-specific posting:

```text
Verified Knowledge / Research
        ↓
Idea / Hook / Script
        ↓
Founder expertise / recording
        ↓
Production / editing / formatting
        ↓
TikTok / Instagram / YouTube / Facebook / LinkedIn / articles
        ↓
Analytics
        ↓
Iteration
```

Content should be accurate, clear, useful, modern and human — not alarmist, clickbait-driven or written only for Google.

Founder time should concentrate on expertise, judgment, authenticity and recording; repetitive production should increasingly be systematized.

---

# Locked architectural principles

- canonical Knowledge facts remain locale-neutral
- localization is market-native adaptation, not translation chaining
- legal/factual meaning must remain invariant across locales
- quality gates control publication
- routing support does not equal SEO publication
- research and legal evaluation remain separate
- provider confidence is not legal verification
- missing/conflicting facts remain unresolved until sufficiently verified
- production build/deployment optimization remains locked unless separately re-evaluated
- customer-specific data remains transactional and must not leak into source-controlled helpers

# Immediate pointer

**Now:** begin Swedish Localization Wave 2 for Routes + Airports + Airlines + Countries + Delay Reasons.

**Then:** DA → PL → DE → FI → NL.

**After Wave 2:** premium UX/design/conversion pass.

**Later:** Search Console legacy cleanup + analytics hygiene, while Claims Operations and Content/Growth continue on their own roadmap lanes.
