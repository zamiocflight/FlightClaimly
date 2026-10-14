# FLIGHTCLAIMLY — CRITICAL CONTINUITY / RESUME — 2026-10-14

> **READ FIRST in every new conversation.** Append-only checkpoint, not a replacement for historical docs. Captures the exact work-in-progress and outstanding blockers at conversation-length boundary. **Never assume a preview build is production.** Do not delete or rewrite prior history.
>
> Snapshot as of 2026-10-14 (Europe/Copenhagen). Current working branch: `fix/id-pass-skip-for-now-20261014`; draft PR **#11**: https://github.com/zamiocflight/FlightClaimly/pull/11. Repo: `zamiocflight/FlightClaimly`. Read current branch HEAD before work: it can move after this checkpoint.

## 0. User operating instructions / immediate handoff

- User wants **seamless continuation**, not to restate context or redo previous decisions. Work autonomously and return only when assistance/approval is genuinely required or the task is completed. Be careful with production customer data.
- Never delete historical Markdown or overwrite old checkpoint narratives; append dated changes. No destructive Git operations, force push, or broad staging.
- **Current priority: fix FlightClaimly preview flight lookup regression/preview configuration, verify onboarding and security, then safely deploy signed private-document access.** User reports the **production website correctly looks up flights**, but the **Vercel preview reports it cannot load flights**. Because invalid fabricated flights are correctly rejected, user cannot finish new-claim E2E test manually. This is an active blocker, NOT an acceptable permanent workaround.
- Prior assistant said it did not intentionally edit flight lookup API; that is not a verified root-cause analysis. Do not claim preview environment is definitely at fault, or production unaffected by eventual deployment, without comparing code/config/logs.
- User recalls a real delayed Frankfurt → Palma test flight on **22 June around 13:00**, over 3 hours late; **year and flight number unverified**. Previous assistant suggested LH1158 without confirmation. Never fabricate a valid flight number; preferably repair preview lookup and/or recover verified test data.
- Preview URL supplied: https://flightclaimly-git-fix-id-pass-s-148bdb-davids-projects-578282d7.vercel.app ; preview /admin login and document links tested by user. Confirm current deployment/alias and code revision before further tests.
- **Vercel environment-variable listing returned 403 forbidden** for scope `davids-projects-578282d7`, project `prj_dpBr72ycjKuAC2UePv3wzCM4y2q6`, team `team_f8Q0IhQvKpCu0BNpYwkrMwB5`. Vercel deployment reads/listing did work. Never expose secrets or rotate them blindly. Diagnose permitted access through connector/appropriate scoped CLI if available; if still forbidden ask user only for the precise access action needed.
- Production storage bucket remains **PUBLIC** and **must not be flipped** before a production rollout and validation of ALL paths. No files deleted. User authorized privatization only if old/new customer docs remain accessible.

## 1. Exactly what changed in security/onboarding PR #11

Working branch `fix/id-pass-skip-for-now-20261014`; PR remains draft, NOT merged or deployed to production (recheck). Vercel preview deployment of latest recorded commit `c718dea814949022012c7d57072e386060b5f536` reached READY on 2026-10-14.

- `src/app/[locale]/check/uploads-id/ClientUploadsId.tsx`: ID/passport upload optional; Skip for now; preserves Ryanair/Wizz warning.
- `src/app/[locale]/check/authorization/page.tsx`: persist/restore signature and avoid stuck state.
- `src/app/api/authority/generate/route.ts`: PDF upload `upsert:false`, deduplicate metadata, better errors, remove sensitive logs.
- `src/app/[locale]/check/uploads/ClientUploads.tsx`: booking/ticket required; remove duplicate effect and sensitive logs.
- `src/app/admin/claims/[id]/page.tsx`: server-side 5-minute signed Supabase links for documents; expanded to support legacy paths not beginning `claims/` (commit `26c050fb`). Existing PDF/fullmakt and Vanessa email attachment successfully opened by user in preview while bucket still public.
- `src/lib/adminSession.ts`, `src/app/api/admin/login/route.ts`, `src/middleware.ts`: HMAC-signed 12h ADMIN cookie, login validation, middleware guards for /admin, /api/admin/* (except login/logout), /api/claims/[id] GET/PATCH. Preview ADMIN login confirmed by user. Beware middleware changes to locale routing or any customer-facing API paths; test thoroughly.
- `src/app/api/claims/[id]/attachments/presign/route.ts`: verifies UUID-shaped claim ID and claim existence before signed upload URL. **Still no claim ownership/onboarding authorization.** Check real DB ID formats and frontend usage before production.
- `src/app/api/claims/[id]/attachments/route.ts`: JSON metadata path validation; multipart 10MB per-file cap; less logging/error detail. **Still no ownership authorization**; JSON metadata is not proven to refer to actually uploaded objects.
- `src/app/api/claims/[id]/public/route.ts`: if a claim has `viewer_token`, require matching `?t=` token; remove token from warning logs (commit `55900e1c`). Legacy claims without token remain accessible by ID; do not silently lock them without migration/link strategy.
- `src/lib/claims.ts`: removed full claim insert/response logs (commit `925a1e87`).
- `src/app/api/claims/route.ts`: new claims now receive a random `viewerToken` and tracking URL includes `?t=...` (commit `c718dea8`). Verify ALL other links, email templates, redirects, and tracking navigation retain the token. Do not leak tokens in logs. The token is a bearer secret.
- Previously removed sensitive logs in `src/app/api/claims/route.ts`.

**Security remains unfinished**: customer upload presign/attachment metadata endpoints and authority PDF generator have service-role access without strong per-claim ownership/authentication. Need a compatible onboarding token/session scheme; avoid breaking legitimate new-claim flow. Public tracking returns PII for legacy un-tokenized IDs. Do not declare security audit complete.

## 2. Supabase database and document audit — VERIFIED

Supabase production project `vkgfboiwrkijaxmdaeia`, bucket `attachments`, currently public.
- 483 stored objects (snapshot).
- 406 use `claims/...` prefix; **77 legacy paths** use other prefixes. New ADMIN signed URL logic covers legacy.
- 279 total claim rows at audit time (many founder/development tests; number can change).
- 219 claims had nonempty attachments arrays (snapshot).
- 458 **distinct referenced document paths** in claim attachment metadata; 438 correspond to storage objects; **20 paths have no matching storage object**, distributed across **20 distinct claims**. These are NOT 20 claims without attachments; these are dangling references. No missing-reference claims have `Reijo` or `Vanessa` in the name field (name-based check only, not exhaustive identity proof). Likely old tests, not conclusively verified.
- User says **only Reijo and Vanessa are genuine external cases**, almost all others are founder tests. Never delete even test documents without approval.
- 9 of 279 claims had non-null `viewer_token` when counted. Existing legacy tracking links may be tokenless; migration must preserve valid existing customer access.
- **Private bucket migration protocol**: inventory every code path that uses `getPublicUrl`, direct storage URLs, customer/email document links, ADMIN and legal workflows; deploy signed-link code to production; test old and new documents across multiple claims; only then set bucket private; immediately test all flows and have rollback plan. Changing bucket privacy is NOT a harmless preview-only test.

## 3. Immediate diagnostic sequence (no guessing)

1. Confirm branch HEAD, PR #11 draft/merge state, latest Vercel preview READY, production HEAD and deploy SHA.
2. Locate actual flight-lookup client call and API handler(s) in repo, including route aliases, middleware, FlightAware adapter, and environment variables. The old documented architecture mentions `/api/flight-status` but `src/app/api/flight-status/route.ts` was NOT FOUND on this branch: do not assume that path exists. Use repository tree/code discovery, inspect actual files.
3. Compare production vs preview behavior using same known valid flight/date; inspect browser network HTTP status and runtime logs; compare preview/production environment **variable names/targets only**, without printing secrets. Vercel env list currently forbidden (403), so diagnose via other permitted tools or request specific user action.
4. Check if recent middleware or API changes affect flight search, and test for regressions; fix smallest cause in PR branch; await READY and rerun.
5. Test complete customer journey including: flight search → claim creation → booking/ticket upload → optional ID/pass Skip → authority preview/sign → PDF stored → track link with token → ADMIN auth → signed old/new documents. Note that preview uses real Supabase production database: use synthetic test identities only.
6. Resolve remaining auth/security holes and token propagation. Verify build and runtime, not only Vercel READY.
7. Do not merge or change production bucket until verification; inform user when real approval/test is required.

## 4. 70/20/10 execution method — AGREED 2026-10-13

**70% of work/attention = customer acquisition and submitted claims; 20% = conversion and UX; 10% = technical/legal quality and essential reliability/security.** This is a strategic prioritization method, not permission to ship unsafe handling of passports/PII. Current security fix is a necessary bounded exception because private customer data is involved. Once flight lookup/onboarding security is stable, return to 70% acquisition, do not drift into endless engineering/SEO polishing.

**Near-term target: 3–6 submitted claims/day by 2026-11-30.** Measure visits → flight lookup → form start → submission → valid claim → pursued claim → recovery → fee; CAC per valid/profitable claim, not vanity impressions. ~2 months to validate growth. Keep honest distinction between submission and recoverable claim.

## 5. Philippines creative hiring — KL/KT continuity

**IMPORTANT NAME AMBIGUITY:** user calls the candidate **KT** in latest message; prior Oct 13 discussion records **“KL Dela Cruz”** (possibly misheard/mistyped). Do NOT silently change names or invent a confirmed identity; inspect actual prior correspondence/recruitment record when available.

- Goal: creator-first short-form **Content & Growth Operator**, Philippines, initially ~10 h/week; not generic VA. Previously candidate accepted **USD 13/hour** (reported in prior discussion), while proposed **paid practical test is USD 40 fixed**, 2–3h estimated, **72h deadline**.
- **Paid test**: deliver **one vertical 9:16 20–30 second Reel/TikTok video**, hook within first 3 seconds, subtitles, clear CTA; **one alternate hook**, brief target-audience/creative-angle rationale, and concise distribution/testing/measurement plan. Evaluate independent marketing thinking, not merely editing. Do not spoon-feed script/storyboard.
- Fair **FlightClaimly Starter Kit**: logo, brand colors/identity, flightclaimly.com, accurate EU261 reference bands €250/€400/€600 with caveat eligibility is fact-dependent, permission for properly licensed stock/AI/animations, and approved facts. No requirement for candidate to purchase subscriptions/stock/AI without approval.
- Selection rubric to finalize from actual communication: first-3-second hook, creative quality, factual accuracy, CTA, distribution hypothesis, originality, delivery discipline, ability to iterate with analytics. The test is **not a live publishing authorization**; founder reviews legal claims before publication.
- Prior messages to candidate and exact sent wording are **NOT fully verified** in this checkpoint. Gmail search `in:sent after:2026/10/10 "Dela Cruz"` and `"FlightClaimly" "test"` returned no matches, which does NOT prove no message was sent (could be OnlineJobs, another mailbox, or chat). New session should retrieve prior chat context/OnlineJobs messages if accessible. Do NOT fabricate what was literally sent.
- Other candidate Renz had an earlier outreach asking for 2–3 best Reels/TikToks and precise contribution; do not confuse Renz with KL/KT.

## 6. Customer acquisition / authority pipeline

**Existing assets:** FlightClaimly OÜ (Estonia, registration 17393073), live `flightclaimly.com`, 8 languages EN/SV/DA/DE/NL/PL/FI/ES, Knowledge/Flight Number/Routes/Airports/Airlines/Countries/Delay Reasons SEO infrastructure, many indexed/indexable pages. Standard **20% success fee incl VAT** (customer retains 80%); legal escalation figure **30% total incl VAT** stated on fees page, but Terms wording mismatch must be reconciled before public claims; no upfront standard fee. Avoid unverified “cheapest/best” claims.

**Otterly baseline 2026-09-29**: fixed UK/English 15 prompts across four answer engines; 0 FlightClaimly mentions; 365 citation observations; competitors AirHelp 40, Flightright 28, Skycop 20, AirAdvisor 19, SkyRefund 6, ClaimCompass 5, ReFly 1. Keep fixed prompts; rerun after indexing and track first mention → pass ReFly → 5+ → recurring presence.

**Completed**: /fees hub in 8 languages; 4 competitor comparison hubs (ReFly, AirHelp, AirAdvisor, SkyRefund) across 8 locales; internal Evidence Pack `docs/FLIGHTCLAIMLY_EVIDENCE_PACK.md`; strategic indexing until manual GSC quota exhausted. User recently reported searching “FlightClaimly” in Google did not surface site — diagnose GSC brand query/indexation, not assume content count solves it.

**Next acquisition work in parallel**: hire/test creator; start short-form social distribution and founder credibility; controlled small-budget paid acquisition with clear attribution; test creative angles and conversion; improve landing/flight-check funnel; pursue measured AEO external citations only with approval. High-value citation candidates Uncompromised Travel (Q4 submission deadline observed 2026-11-15; commercial/affiliate), The Miles Market; MoneySavingExpert later; EUFlightCompensation.com due diligence pending; FlightOwed competitor not outreach target. Trustpilot Business Free activation had failed; support contacted; only genuine reviews. Long-term data authority/Flight Disruption Index with properly licensed sources. Prior FR/IT/PT localization/premium UX remains parked behind growth, not deleted.

## 7. Claims Desk / genuine customers

- **Reijo**: 2020 TAP Air Portugal claim; complex Portuguese limitation analysis (Civil Code Art. 309 / EU261 vs Montreal, contested), separate adult authorities for Reijo and spouse; as of later Sep 2026 airline submission under investigation, approaching six-week response point; user reported calling TAP, escalation confirmed, client update drafted. `docs/CLAIMS_DESK.md` contains an **older** 'awaiting evidence' snapshot; don't mistake that for Oct current status. Verify current emails/case timeline before contacting.
- **Vanessa**: Aer Lingus rerouting/compensation case, correspondence around Jan disruption and possible alternate DUB–IAD flights; exact seat availability and original airline communications not established. User verified her existing email attachment opens in preview.
- **Founder LOT claim**: Tel Aviv → Warsaw → Copenhagen 5 May 2025, cancelled after security event, self-rerouting and expenses, Art. 8/9 focus; separate from customer E2E synthetic test. Keep sensitive case materials out of Git.
- Existing `docs/CLAIMS_DESK.md` and historical handoffs remain authoritative historical sources but may be stale. Verify actual live status before new legal or customer communications.

## 8. Preserve history and active docs

Read (on branch): `docs/FLIGHTCLAIMLY_HANDOFF.MD`, `docs/ROADMAP.md`, `docs/CURRENT_SPRINT_LATEST.md`, `docs/CLAIMS_DESK.md`, `docs/FLIGHTCLAIMLY_EVIDENCE_PACK.md`, `docs/AI_VISIBILITY_OTTERLY.md`, `docs/GROWTH_CHANGELOG.md`, `docs/COMPETITIVE_INTELLIGENCE.md`. Older 'immediate next' sections are historical and may be superseded by dated 2026-09-29 and this 2026-10-14 checkpoint. Do not rewrite historical claims. Continue append-only updates at milestones.

## 9. Resume command for new ChatGPT conversation

> **ÅTERUPPTA FLIGHTCLAIMLY EXAKT 2026-10-14.** Använd GitHub-anslutningen till `zamiocflight/FlightClaimly`, branch `fix/id-pass-skip-for-now-20261014`, draft PR #11. Läs FÖRST hela `docs/checkpoints/2026-10-14-critical-continuity.md`, därefter `docs/FLIGHTCLAIMLY_HANDOFF.MD`, `docs/CURRENT_SPRINT_LATEST.md`, `docs/ROADMAP.md`, `docs/CLAIMS_DESK.md`, `docs/FLIGHTCLAIMLY_EVIDENCE_PACK.md`, `docs/AI_VISIBILITY_OTTERLY.md` och `docs/GROWTH_CHANGELOG.md`. Läs aktuell kod och PR-status; äldre roadmappointers är historik. Vi står mitt i säkerhetsfix och ett AKUT preview-fel: flygdata laddas inte i testmiljön men fungerar i produktion. Diagnostisera/fixa först, utan att gissa API-nycklar, sedan testa onboarding/token/ADMIN/dokument, lös kvarvarande auth-risker och privat bucket först efter verifierad säker migrering. Bevara 483 filer och 77 legacy paths; 20 dangling referenser är gamla/oklara, inte 20 tomma ärenden. Kom ihåg KL/KT-kandidatens $40/72h/20–30s paid test och vår 70/20/10-metod, mål 3–6 ärenden/dag 30 november. Uppdatera MD append-only, radera ingen historia, fortsätt självständigt och återkom bara när min hjälp behövs eller när klart.


## 2026-10-14 — Security audit continuation (latest)

- User confirmed both admin inbox notification and English customer email arrived; both email flows verified by user.
- Branch-only fixes: HMAC-verified admin cookie now required in /api/admin/claims, archived-claims, export-csv, archive-claim, unarchive-claim, resend-payout-link, /api/export, /api/update-status, /api/claims/[id] GET/PATCH, legacy attachment download, and server-rendered /admin/claims/[id] (redirect unauthenticated). Public claim GET now requires valid viewer token even if legacy claim has none; **legacy tracking compatibility risk requires explicit migration before production deployment**.
- Commits from 520200e through e7ed6b8; 88bf35e preview READY, e7ed6b8 was BUILDING when checked. PDF code/customer flow not touched.
- Supabase read-only audit: 496 objects, 292 claims, 506 attachment metadata references, 480 matching reference occurrences, 26 missing reference occurrences representing 20 distinct paths across 20 claims; ALL 26 missing references are authority type; 45 objects unlinked from metadata (including 29 legacy-prefixed paths). Do not delete or overwrite anything.
- CRITICAL production RLS exposure: public.claims RLS is enabled but anon SELECT USING(true), UPDATE USING(true) WITH CHECK(true), INSERT WITH CHECK(true). Public anon key can access/modify claims through direct Supabase APIs independent of Next.js auth. No production change made. A reviewed, gated migration is drafted at docs/security/claims-rls-remediation-2026-10-14.sql; **must confirm no direct client usage and get explicit production approval before applying**. Supabase security advisors also flagged GraphQL anon/authenticated table discoverability.
- Storage bucket still public; do not privatize until secure production access deployed and verified. Do not merge PR without approval.
- Need review any browser direct Supabase access, legacy tokenless claims, 45 unlinked objects and document download compatibility, then get explicit authorization for production RLS/storage changes. No new customer test yet.


## 2026-10-14 — Production security remediation authorized and applied

- User explicitly approved necessary Supabase production security changes, but prior separate permission requirement for PR merge/production website deploy still stands. No file deletion or storage privacy flip.
- Supabase production migrations successfully applied:
  1. `secure_claims_revoke_public_access_20261014`: dropped permissive anon SELECT/UPDATE/INSERT policies on public.claims and revoked SELECT/UPDATE/INSERT/DELETE from anon and authenticated.
  2. `revoke_public_access_to_claim_evidence_and_passenger_authorizations_20261014`: revoked public roles' DML on claim_research_evidence, claim_research_evidence_reviews, passenger_authorizations.
- **VERIFIED** post-migration: anon and authenticated cannot SELECT/UPDATE/INSERT claims; service_role still can. Supabase security advisor now has no GraphQL public-access warnings, only 4 informational 'RLS enabled no policy' notices (expected for server-only tables). Production counts remain 292 claims, 496 objects; bucket remains public.
- Code branch fixes: `src/app/api/send-track-link/route.ts` now issues viewer token to legacy claim if missing when customer requests link to their email; `src/app/api/submit/route.ts` legacy claim creation now issues viewer token, uses correct claim.id, avoids returning full claim object. Neither is production deployed.
- **Next critical work:** verify website production flows after RLS change (server uses supabaseAdmin/service_role); check all browser-direct Supabase access. Preview Vercel build check. Document bucket still PUBLIC and cannot be flipped before secure document access is deployed to production and verified. Legacy previously emailed tokenless tracking URLs require recovery-link flow; user should be told before deploy. Do not claim audit complete.
