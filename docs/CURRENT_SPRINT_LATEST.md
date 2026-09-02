# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-02**

> This file is intentionally short. It exists so a new ChatGPT/browser/session can find the latest authoritative project state immediately without deleting or rewriting historical sprint documentation.

## Read Order After Session Loss

1. `docs/CURRENT_SPRINT_LATEST.md` — this pointer
2. `docs/checkpoints/2026-09-02-delay-reason-engine-expansion.md` — latest Product / Growth implementation checkpoint
3. `docs/checkpoints/2026-09-02-flight-number-global-seo-google.md` — previous secured Flight Number/global SEO/Google checkpoint
4. `docs/CURRENT_SPRINT.md` — full historical sprint record; preserve all older sections
5. `docs/SYSTEM_PROCESS_MAP.md` — architecture/process map
6. `docs/CLAIMS_DESK.md` only when working on Claims Desk matters

## Current Product / Growth State

Status: **🟡 Delay Reason Engine implementation complete on remote main / verification next**

### Flight Number / Google baseline remains secured

- Flight Number checkpoint: `643266e`
- final Flight Number entities: **2,841 publishable / 0 blocked / 0 duplicate identities**
- airlines represented: **44**
- Route paths: **3,141**
- full production static build at that checkpoint: **6,546 / 6,546**
- Google sitemap read successfully on 2026-09-02
- Search Console discovered pages at that checkpoint: **6,326**
- control URL `SK1415` passed Google Live Test and indexing was requested

Do not repopulate FlightAware or rebuild the Flight Number architecture while Google is processing that surface.

## Current Sprint — Delay Reason Engine

The Delay Reason knowledge layer has expanded from **1 to 11 structured disruption reasons**:

- technical problems
- bad weather
- air traffic control restrictions
- airline staff strike
- crew shortage
- late incoming aircraft
- bird strike
- airport closure
- security issue
- hidden manufacturing defect
- operational reasons

All 11 are connected to the existing EU261 relationship layer and existing Delay Reason programmatic page/sitemap architecture.

A new reusable structured claim-assessment layer now exists in:

`src/lib/delay-reasons/assessment.ts`

For every reason it defines:

- category
- baseline EU261 liability classification
- root-cause requirement
- evidence targets
- airline questions
- claimant/red-flag signals
- recommended next investigation step

The same assessment layer is now rendered on public Delay Reason knowledge pages through:

`src/components/seo/delay-reasons/ClaimAssessment.tsx`

An integrity audit has been added:

`npm run audit:delay-reasons`

Expected aligned source state:

- Delay Reasons: **11**
- relationships: **11**
- assessment profiles: **11**

## Exact Next Action

Verify the implementation before marking the sprint green:

1. run `npm run audit:delay-reasons`
2. run TypeScript / production build verification
3. confirm Delay Reason hub and representative new detail pages render correctly
4. confirm the Claim Assessment section renders correctly
5. verify allowed/blocked locale publication policy remains intact
6. verify sitemap contains all intended Delay Reason URLs
7. only then mark the Delay Reason Engine sprint completed

Do **not** run FlightAware population for this verification.

## Safety

- Do not run `global-core:scale` for the already completed Flight Number population cohort.
- Do not run `git add .` while unrelated Claims/Reijo files are present locally.
- Never use `git reset --hard`, `git clean`, or force-push as recovery steps.
- Preserve historical sections in `docs/CURRENT_SPRINT.md`.
- Keep Product / Growth work separate from Claims Desk/Reijo work.

Latest detailed checkpoint:

`docs/checkpoints/2026-09-02-delay-reason-engine-expansion.md`
