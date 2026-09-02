# FlightClaimly — Latest Sprint / Resume Pointer

Last updated: **2026-09-02**

> This file is intentionally short. It exists so a new ChatGPT/browser/session can find the latest authoritative project state immediately without deleting or rewriting historical sprint documentation.

## Read Order After Session Loss

1. `docs/CURRENT_SPRINT_LATEST.md` — this pointer
2. `docs/checkpoints/2026-09-02-flight-number-global-seo-google.md` — latest detailed Product / Growth recovery checkpoint
3. `docs/CURRENT_SPRINT.md` — full historical sprint record; preserve all older sections
4. `docs/SYSTEM_PROCESS_MAP.md` — architecture/process map
5. `docs/CLAIMS_DESK.md` only when working on Claims Desk matters

## Current Product / Growth State

Status: **✅ Flight Number global-scale checkpoint secured and deployed / 🟡 Google recrawl and indexation monitoring**

Secured production checkpoint:

- Git commit: `643266e`
- pushed to `origin/main`
- Vercel production: Ready
- final Flight Number entities: **2,841 publishable / 0 blocked / 0 duplicate identities**
- airlines represented: **44**
- Route paths: **3,141**
- full production static build: **6,546 / 6,546**
- live sitemap: HTTP 200
- live sitemap Flight Number detail + airline-index URLs containing `/flight-numbers/`: **2,885**
- live sitemap Route URLs containing `/routes/`: **3,141**

Google Search Console on 2026-09-02:

- sitemap resubmitted and read successfully
- discovered pages: **6,326**
- control URL: `https://www.flightclaimly.com/en/flight-numbers/sk1415`
- Google Live Test: URL available to Google; page can be indexed
- manual indexing requested for the control URL only

The Page Indexing report viewed the same day was last updated 2026-08-28 and therefore reflects the **old/pre-checkpoint** SEO surface. Do not reopen old canonical/indexation work solely from those historical rows.

## Immediate Next Action

Do **not** repopulate FlightAware and do **not** rebuild SEO architecture on speculation.

Allow Google to crawl/reprocess the new sitemap and production surface. First meaningful Search Console review should be approximately **7 days after 2026-09-02**, comparing fresh results against the baseline recorded in the detailed checkpoint.

## Safety

- Do not run `global-core:scale` for the already completed population cohort.
- Do not run `git add .` while unrelated Claims/Reijo files are present locally.
- Never use `git reset --hard`, `git clean`, or force-push as recovery steps.
- Preserve historical sections in `docs/CURRENT_SPRINT.md`.
- Keep Product / Growth work separate from Claims Desk/Reijo work.

For all exact counts, population results, Google baseline numbers, architecture notes and recovery instructions, read:

`docs/checkpoints/2026-09-02-flight-number-global-seo-google.md`
