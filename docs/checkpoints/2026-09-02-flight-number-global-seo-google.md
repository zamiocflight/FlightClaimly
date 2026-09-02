# FlightClaimly Recovery Checkpoint — 2026-09-02

> **AUTHORITATIVE RESUME POINT FOR PRODUCT / GROWTH.**
>
> Read this file together with `docs/CURRENT_SPRINT.md` and `docs/SYSTEM_PROCESS_MAP.md` after any browser/chat/session failure. Historical sprint sections in `CURRENT_SPRINT.md` remain valid project history and must not be deleted.

## Executive State

Status: **✅ GLOBAL FLIGHT NUMBER SCALE CHECKPOINT SECURED / ✅ PRODUCTION LIVE / 🟡 GOOGLE RECRAWL & INDEXATION IN PROGRESS**

The Flight Number / Route / Airport dependency work and controlled scale expansion are complete for the current cohort. The generated dataset has been validated, committed, pushed to `main`, deployed to production, exposed through the live sitemap, accepted by Google Search Console, and spot-tested with Google's live URL inspection.

No further FlightAware population run is required for this checkpoint. In particular, **do not run `global-core:scale`** because Europe Expanded and Intercontinental Core have already been populated separately and repeating the calls would create unnecessary API cost.

## Secured Git Checkpoint

Production data checkpoint:

- commit: `643266e`
- message: `feat(flight-numbers): checkpoint expanded global scale population`
- branch: `main`
- pushed successfully to `origin/main` on 2026-09-02
- Vercel production deployment: **Ready**

Checkpoint commit contains exactly four generated/data files:

- `reports/population/latest.json`
- `src/data/master/airportRegistry.ts`
- `src/data/master/flightNumberSeeds.ts`
- `src/data/master/flightNumbers.ts`

Commit summary:

- 4 files changed
- 342,941 insertions
- 20,468 deletions

After push, local Git status showed `main...origin/main` synchronized with only unrelated Claims/Reijo work remaining locally:

- `docs/CLAIMS_DESK.md` — modified
- `scripts/test-manual-claim.ts` — modified
- `scripts/create-reijo-claim.ts` — untracked

These files are unrelated to this Product / Growth checkpoint and must not be reset, cleaned, staged accidentally, or mixed into Flight Number work.

## Flight Number Architecture / Population Work Completed

The scale work now covers the 45-airline priority configuration:

- 29 European priority airlines
- 16 intercontinental/global priority airlines
- 44 airlines currently represented by generated publishable Flight Number entities
- Iberia Express (`I2`) is configured correctly but had no returned seed in the completed source run; this is not a publication blocker and must not be hardcoded around

Core architecture rules preserved:

- Flight Number identity = airline + flight number
- Flight Number Engine consumes Airport/Route knowledge rather than hardcoded route exceptions
- Airport Registry is the reusable airport identity layer
- Route resolution remains generic
- population merge remains idempotent
- sanitizer remains non-destructive
- codeshare/identity mismatch protection remains active
- FlightAware pagination, timeout, validation, reports and population profiles remain in place

Generic Airport Registry fixes completed during scale:

- mixed-use airport naming issue handled generically rather than with an XPL special case
- missing municipality handled with stable airport-name fallback rather than a THS special case
- no route-specific hardcoded workaround introduced

Final Airport Registry generation after the generic fixes:

- source CSV rows: 84,428
- commercial scheduled candidates: 4,189
- European commercial candidates: 678
- registry entries: 4,011
- European entries: 654
- countries represented: 235 globally / 47 Europe
- airport types: 963 large / 2,240 medium / 808 small
- verified overrides injected: 0 in the final run

## Population Results

### Europe Core — historical scale stage

Profile: `europe-core`

Airlines: `SK,DY,FR,LH,U2,AF,KL,BA`

- schedules returned: 600
- valid: 599
- rejected: 1
- duplicate fetched: 44
- unique fetched: 555
- existing seeds: 165
- added: 436
- updated: 3
- unchanged: 116
- route conflicts: 0
- total seeds after merge: 601

### Europe Expanded

Completed successfully.

- added: 1,040
- updated: 251
- unchanged: 358
- route conflicts: 1
- total seeds after merge: 2,153
- sanitizer after Airport Registry fix: 2,153 / 2,153 supported

Stable route-conflict identity behavior observed and intentionally preserved:

- `DY329`: keep existing `ALF → TOS`, ignore fetched `TOS → OSL`
- `AF2086`: preserve `SEA → SAN`, ignore fetched `SFO → SLC`

These are not blockers and must not be solved with special-case route code.

### Intercontinental Core

Completed successfully.

- added: 741
- unchanged: 211
- total seeds after merge: 2,894
- final sanitizer: 2,894 supported / 0 unsupported

No further FlightAware calls are needed for this checkpoint.

## Final Flight Number Generation / Audit

Final Flight Number build:

- seeds imported: 2,894
- rejected/duplicate records: 53
- all 53 are `airline-flight-number-mismatch`
- publishable Flight Number entities written: **2,841**

Final audit:

- entities: **2,841**
- publishable: **2,841**
- blocked: **0**
- duplicate slugs: **0**
- duplicate identities: **0**
- airlines represented: **44**

The 53 mismatch rejections are the existing identity/codeshare protection doing its job; they are not a new scale blocker.

`npm run typecheck` / `tsc --noEmit` completed with no errors.

## Final Production Build

Full `npm run build` completed successfully on Next.js 15.5.7:

- compiled successfully
- TypeScript validation passed
- static generation: **6,546 / 6,546 pages**
- Flight Number detail paths: **2,841**
- Flight Number airline indexes: **44**
- Route detail paths: **3,141**
- `/robots.txt` generated
- `/sitemap.xml` generated

Important: 6,546 is the Next.js static generation count. It must **not** be described as 6,546 Google-indexed pages.

## Production / Sitemap Verification — 2026-09-02

Commit `643266e` was confirmed Ready in production.

Live sitemap check:

`https://www.flightclaimly.com/sitemap.xml`

returned:

- HTTP/2 200
- `content-type: application/xml`
- Vercel prerendered response
- content length approximately 986 KB at verification time

Live sitemap counts were then verified directly:

- URLs containing `/flight-numbers/`: **2,885**
  - 2,841 Flight Number detail pages
  - 44 airline Flight Number index pages
- URLs containing `/routes/`: **3,141**

The current sitemap implementation explicitly includes publishable Flight Numbers, Flight Number airline groups, routes, airports, airlines, countries, delay reasons and intended static routes according to the current publication/localization policy.

`robots.txt` allows public crawling, blocks `/admin` and `/api`, and points crawlers to `/sitemap.xml`.

## Google Search Console — New Sitemap Submission

Before resubmission, Search Console showed the old sitemap state:

- originally submitted: 2026-07-09
- last read: 2026-08-31
- discovered pages: 1,938

The same live sitemap was resubmitted on **2026-09-02**.

Google immediately reported:

- submitted: 2026-09-02
- last read: 2026-09-02
- status: **Success / Lyckades**
- discovered pages: **6,326**
- discovered videos: 0

This is the current Google discovery baseline.

**6,326 discovered URLs does not mean 6,326 indexed URLs.** Google still decides which URLs to crawl, canonicalize and index.

## Historical Search Console Baseline — Do Not Misread as New-System Result

The Search Console Page Indexing report viewed on 2026-09-02 was last updated **2026-08-28**, before the new global Flight Number checkpoint/deployment/sitemap submission.

It showed approximately:

- indexed: 2.34k
- not indexed: 9.05k

Historical non-indexation reasons:

- `Discovered – currently not indexed`: 8,034
- `Duplicate: Google chose different canonical than user`: 577
- `Duplicate without user-selected canonical`: 367
- `Crawled – currently not indexed`: 40
- `Not found (404)`: 22
- `Page with redirect`: 8

The 577 canonical examples shown were old Route URLs crawled around 2026-08-28/29. These reports describe the pre-checkpoint SEO surface and were one of the reasons for the large SEO Integrity / Knowledge Engine / Route-Airport-Flight Number work.

**Do not reopen or rebuild the architecture solely because these historical rows remain visible.** First wait for Google to crawl and report on the new production surface.

## Google Live Inspection Control URL

Control URL used:

`https://www.flightclaimly.com/en/flight-numbers/sk1415`

Initial URL Inspection state:

- Google already discovered it through `https://www.flightclaimly.com/sitemap.xml`
- not yet indexed
- status: `Discovered – currently not indexed`
- last crawl: missing

A Google **Live Test** was then run against current production.

Result:

- **URL is available to Google**
- **Page can be indexed**
- valid breadcrumb structured-data object detected
- no technical live-test indexability blocker reported

Manual `Request Indexing` was submitted for this single control URL. Google confirmed that it was added to the priority crawl queue.

This manual request is a control/spot-check only. Do **not** attempt to manually request indexing for thousands of URLs. Sitemap + internal discovery is the scale mechanism.

## Current Google Phase

Status: **🟡 WAITING FOR GOOGLE RECRAWL / REPROCESSING**

Expected process:

1. sitemap accepted
2. URLs discovered
3. Google schedules crawl according to its own crawl systems
4. Googlebot fetches pages
5. Google evaluates canonical, quality, duplication and indexing eligibility
6. qualifying pages may enter the index

The next decision must be data-driven. Do not change SEO architecture simply because the pre-2026-09-02 Search Console report still shows old failures.

## Next SEO Checkpoint

Recommended first meaningful review: approximately **7 days after 2026-09-02**.

At review, compare against this baseline:

- sitemap discovered URLs: **6,326**
- old Page Indexing report: approximately **2.34k indexed**
- old `Discovered – currently not indexed`: **8,034**
- control URL: `/en/flight-numbers/sk1415`

Check:

1. whether `SK1415` has been crawled/indexed
2. whether total indexed pages are moving upward
3. whether Google has begun crawling the new Flight Number population
4. whether new URLs are accumulating in `Discovered – currently not indexed`
5. whether canonical problems recur on the **new** architecture rather than merely persisting as historical rows
6. representative Route and Flight Number live URL inspection results

Only if the new population exhibits a repeated measurable problem should the next SEO implementation sprint be opened.

## Recovery / Safety Rules

If a session crashes after this checkpoint:

1. read `docs/CURRENT_SPRINT.md`
2. read this checkpoint file
3. read `docs/SYSTEM_PROCESS_MAP.md` for architecture
4. verify current Git/production state before changing code
5. do not rerun FlightAware population unless a new population cohort is explicitly approved
6. do not run `global-core:scale` for the already completed cohort
7. do not use `git add .`, `git reset --hard`, `git clean`, force-push, or destructive recovery
8. preserve unrelated Claims Desk/Reijo local work
9. treat commit `643266e` as the secured generated-data checkpoint for this scale stage
10. treat the 2026-09-02 Search Console sitemap submission and 6,326 discovered URLs as the Google baseline

## Immediate Product / Growth State

No active Flight Number data blocker remains in the completed cohort.

The current Product / Growth action is **monitor Google recrawl/indexation**, then decide the next Knowledge Engine/acquisition sprint from fresh Search Console evidence rather than historical indexing failures.
