# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-02**

> This file is intentionally short. It exists so a new ChatGPT/browser/session can find the latest authoritative project state immediately without deleting or rewriting historical sprint documentation.

## Read Order After Session Loss

1. `docs/CURRENT_SPRINT_LATEST.md` — this pointer
2. `docs/checkpoints/2026-09-02-delay-reason-engine-expansion.md` — locked Delay Reason Engine v1 checkpoint
3. `docs/checkpoints/2026-09-02-flight-number-global-seo-google.md` — secured Flight Number/global SEO/Google checkpoint
4. `docs/CURRENT_SPRINT.md` — full historical sprint record; preserve all older sections
5. `docs/SYSTEM_PROCESS_MAP.md` — architecture/process map
6. `docs/CLAIMS_DESK.md` only when working on Claims Desk matters

## Current Product / Growth State

Status: **🟢 Delay Reason Engine v1 locked / 🟡 Legal Authority & Passenger Rights Knowledge Engine next**

### Flight Number / Google baseline remains secured

- Flight Number checkpoint: `643266e`
- final Flight Number entities: **2,841 publishable / 0 blocked / 0 duplicate identities**
- airlines represented: **44**
- Route paths: **3,141**
- Google sitemap read successfully on 2026-09-02
- Search Console discovered pages at that checkpoint: **6,326**
- control URL `SK1415` passed Google Live Test and indexing was requested

Do not repopulate FlightAware or rebuild the Flight Number architecture while Google is processing that surface.

## Delay Reason Engine v1 — LOCKED GREEN

The Delay Reason knowledge layer contains **11 structured disruption reasons**, **11 relationship entries** and **11 structured claim-assessment profiles**.

Final verification completed:

- `npm run audit:delay-reasons` → **PASS**
- `npm run typecheck` → **PASS**
- representative production Delay Reason URLs → **HTTP 200**
- Claim Assessment content verified live
- sitemap Delay Reason detail entries → **11**
- Delay Reason detail pages converted to **SSG**
- final production build → **6,557 / 6,557** pages
- build output shows **11 English Delay Reason SSG detail paths**

Final SSG commit:

`e5f9769` — `feat(delay-reasons): prerender delay reason detail pages`

Do not reopen Delay Reason Engine v1 without a concrete defect, new legal requirement, new disruption category, or later integration requirement.

## Current Sprint — Legal Authority / Passenger Rights Knowledge Engine

This is the next Knowledge Engine layer.

The repository already has an authority foundation:

- `src/data/authority/registry.ts`
- `src/data/authority/rules.ts`
- `src/data/authority/relationships.ts`
- `src/data/authority/shared/*`

Current authority data is intentionally thin. It currently contains the EU261 regulation and European Commission interpretative guidelines, a simple `eu-to-eu` rule, and a few example relationships.

The next sprint should evolve this foundation into reusable structured legal knowledge for:

- claim eligibility
- compensation thresholds
- care and assistance
- rerouting / reimbursement
- missed connections
- extraordinary circumstances
- reasonable-measures analysis
- burden of proof
- departure/arrival jurisdiction rules
- airline applicability
- future UK261 and other rights regimes
- legal authority / case-law references
- Delay Reason assessments
- Claims Desk reasoning
- future AI Brain orchestration
- public Passenger Rights knowledge surfaces where appropriate

### Architectural rule

Do not build a second legal system beside `src/data/authority`. Expand the existing authority layer and make other engines consume it.

Desired direction:

`Legal source -> structured authority/rules -> applicability resolver -> claim-rights assessment -> Delay Reason / Route / Airline / Flight Number / Claims / AI consumers`

The legal engine must distinguish source-backed rules from editorial explanation and must not reduce nuanced legal questions to a single boolean where causation, evidence, reasonable measures or jurisdiction still require assessment.

## Exact Next Action

Inspect the complete existing authority/shared/lib usage and define the v1 data model before adding content. Preserve all current integrations and avoid a broad Claims Desk refactor during this Product / Growth sprint.

## Safety

- Do not run `global-core:scale` for the already completed Flight Number population cohort.
- Do not run `git add .` while unrelated Claims/Reijo files are present locally.
- Never use `git reset --hard`, `git clean`, or force-push as recovery steps.
- Preserve historical sections in `docs/CURRENT_SPRINT.md`.
- Keep Product / Growth work separate from Claims Desk/Reijo work.

Latest detailed completed checkpoint:

`docs/checkpoints/2026-09-02-delay-reason-engine-expansion.md`
