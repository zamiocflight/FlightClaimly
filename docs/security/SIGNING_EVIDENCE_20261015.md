# Signing evidence and attachment hardening — 2026-10-15

## Scope
- Preserve existing authority PDF visual layout and customer signing UX.
- Store evidence for **newly generated** signed authorities in `public.authority_signing_evidence` (append-only, RLS enabled, no anon/auth grants).
- Evidence: claim UUID, storage object path, SHA-256 of **final PDF bytes**, UTC time, best available proxy IP, user agent, byte count, and event type.
- The signing route uploads with `upsert: false`, downloads and hashes the persisted PDF, then inserts evidence before updating attachment metadata and returning success.
- When serving an existing PDF with an evidence record, recompute and compare its SHA-256. Existing legacy PDFs with no evidence are **not** retrospectively represented as having contemporaneous signing evidence.
- JSON attachment metadata registration requires matching object existence and byte count in the claim's private storage folder. Reserved authority.pdf path is rejected.

## Verification still required
- Preview deployment build and type-check; targeted signing and attachment authorization checks.
- Inspect any failed-evidence-write recovery path; an uploaded original must never be overwritten to repair audit metadata.
- Review all direct-upload routes and request validation before production rollout.
- No PDF layout changes and no retroactive regeneration of legacy test claims.

## Cautions
- A request IP is supportive evidence, not proof of identity. Proxy trust and IP provenance should be documented.
- SHA-256 proves equality with the saved reference hash; protection of the audit record is also necessary.
- Not a qualified eIDAS signature.

## Partial-write recovery rule (2026-10-15)
- If authority.pdf exists without both an audit record and claim attachment reference, the signing endpoint now returns HTTP 409 for manual review; it must not silently certify the PDF or overwrite it.
- If audit exists but claim metadata was not saved, a retry verifies the stored PDF hash and repairs the missing attachment reference.
- Legacy PDFs with existing claim attachment references but no audit record remain accessible, **without** any assertion of contemporaneous audit evidence.
- A crash between upload and audit insert remains a manual exception; a robust automated recovery would need a pre-upload signing intent and state machine, not retrospective fabrication.

## Verification record — 2026-10-15

- Vercel preview deployment `dpl_9XmMcu11GoniQr7HqSPZtKqeGAFr` at commit `4fd7b5e` reported **READY**.
- Supabase: audit table has RLS enabled; anon/authenticated have no SELECT grant; service role has INSERT; immutable trigger is installed for UPDATE and DELETE.
- No live signing or synthetic customer document was generated in the production Supabase project.
- Direct HTTP test from the execution environment was **not possible** (DNS resolution of Vercel preview hostname failed); no end-to-end or fault-injection test should be marked passed.

### Required targeted acceptance cases (not yet executed)
1. Fresh signing with valid claim viewer token: one original PDF, one audit row, matching final-byte SHA-256, UTC timestamp, IP where available; same PDF layout.
2. Repeat valid request: returns original bytes, no replacement and no extra evidence row.
3. Invalid token/claim: HTTP 403; no storage or audit writes.
4. Storage upload succeeds, audit INSERT fails: return error; retain original; retry must fail closed (409) rather than fabricate a timestamp or overwrite.
5. Audit exists but attachment metadata update fails: retry verifies hash and repairs only missing reference.
6. Existing PDF changed or missing: HTTP 409 and no replacement.
7. Attachment metadata references nonexistent object or mismatched size: HTTP 409; no metadata change.
8. Attempt to register another claim's object or authority.pdf: rejected.
9. Legacy authority with an existing reference and no audit row: still accessible, explicitly unverified by new audit.
10. Admin verification endpoint rejects unauthenticated access; valid admin sees verified/mismatch/legacy states.

**Release gate:** Keep PR #11 draft and do not promote until the above targeted checks have been executed and recorded, including error-path tests using controlled noncustomer fixtures.

## Automated regression tests added

- Pure recovery decision function: `src/lib/authority/evidenceDecision.ts` (called by signing route).
- Regression suite: `tests/security/authority-evidence.test.ts`.
- Command: `npm run test:security` (Node.js 22+ required for TypeScript stripping).
- Eight combinations of audit record, claim reference, and hash match were executed locally using Node.js 22; **8 passed, 0 failed**.
- These are **unit tests** of the decision function, not API integration, storage, or signing end-to-end tests.
- Direct preview HTTP request was retried and still failed DNS resolution from the execution container. Production data and documents were not modified by these tests.

## Database trigger behavior check

- Exercised `public.reject_authority_evidence_mutation()` against a **temporary** test table with one synthetic row; both UPDATE and DELETE were caught and the original value remained unchanged. No production customer row was touched.
- This verifies the trigger function's behavior, in addition to checking that the real evidence table has UPDATE and DELETE triggers installed.

## Follow-up verification — latest preview

- Deployment `dpl_2hH6kSiYXa2QJZENv1JS69EuRWFx`, commit `7022a45d955f506f5e99efa4bbea43440b8c4078`, confirmed **READY** via Vercel deployment API; build events available.
- Re-ran eight recovery cases locally under Node.js v22.16.0 using the TypeScript test file: **8 pass, 0 fail**.
- Retried HTTPS connectivity to the immutable preview hostname, preview branch alias, and public flightclaimly.com from execution container: all failed DNS resolution. This is an execution-environment network restriction, not evidence of a Vercel application failure.
- **Integration/fault-injection gate still OPEN**: cannot claim to have exercised POST /api/authority/generate, attachment metadata registration, admin verification, or their retry paths via HTTP. A READY build and pure unit tests do not replace these checks.

## GitHub Actions verification harness

- Added `.github/workflows/security-verification.yml`: Node 22 unit test job on pushes and PRs; opt-in Preview API smoke job on manual `workflow_dispatch`.
- Added `tests/security/preview-smoke.test.ts`: three **nonmutating negative-path** checks (missing signing fields, invalid presign claim ID, and unauthorized attachment registration).
- To run Preview checks: GitHub → Actions → **Security verification** → **Run workflow** → choose branch `fix/id-pass-skip-for-now-20261014` → supply `https://flightclaimly-o4om1dhq0-davids-projects-578282d7.vercel.app` (deployment commit `7022a45d`).
- If Vercel Deployment Protection blocks access, configure repository Actions secret `VERCEL_AUTOMATION_BYPASS_SECRET` using a dedicated Vercel protection-bypass token; never commit the token.
- Smoke tests do not create or modify customer data. They **do not** verify successful signing, retry-after-write, fault injection, or PDF layout. Those still require an isolated test Supabase project/fixtures and a controlled integration harness.
- Workflow added but its execution status has not yet been confirmed; do not mark CI passed without a successful run.

## Confirmed CI result — 2026-10-15

- Initial GitHub Actions security-unit run failed because the offline test command accidentally included Preview HTTP tests without a configured target. This was a **test harness configuration issue**, not a signing application regression.
- Fixed `package.json`: `npm run test:security` runs only eight offline recovery tests; `npm run test:security:preview` runs three opt-in HTTP negative-path checks.
- Updated GitHub Actions to call the explicit Preview command only during manually dispatched Preview runs.
- GitHub Actions run [38713088297](https://github.com/zamiocflight/FlightClaimly/actions/runs/38713088297), commit `cc53864248db7aca7c6de156978fccb53964a476`: **completed / success** for offline security verification.
- The preview-negative-path job was intentionally not executed by the push workflow. Do not count it as passed.
- Still outstanding before production approval: controlled Preview HTTP checks, full signing and fault-injection cases, final user-flow/PDF review.

## Preview API access diagnosis — 2026-10-15

- GitHub Actions run [38713631048](https://github.com/zamiocflight/FlightClaimly/actions/runs/38713631048) reached the Vercel Preview host, but **all three nonmutating API probes returned HTTP 401 from Deployment Protection**. The eight offline unit tests in that run passed.
- Thus DNS/connectivity is resolved from GitHub-hosted runners; the remaining access blocker is Vercel Authentication. This is **not** an application API failure and not a successful endpoint test.
- Restored default CI to offline unit tests so the known protection barrier does not cause unrelated PR checks to fail. The manual Preview smoke job remains available.
- Required setup: create an automation bypass secret in Vercel Project → Settings → Deployment Protection → Protection Bypass for Automation, then add the exact value as GitHub repository Actions secret `VERCEL_AUTOMATION_BYPASS_SECRET`. Never put the value in repository code, logs, or chat.
- After secret is configured, manually dispatch **Security verification** on branch `fix/id-pass-skip-for-now-20261014` with `preview_url=https://flightclaimly-o4om1dhq0-davids-projects-578282d7.vercel.app`.
- Full successful signing, retry/fault-injection, and PDF-layout tests still require an isolated database/storage environment. Do not use real customer claims as test fixtures.

## Protected Preview API verification — PASS

- GitHub Actions run [38715151531](https://github.com/zamiocflight/FlightClaimly/actions/runs/38715151531), commit `f8b052eae6c2e3c604882d8763db103b9744b184`, completed **success**.
- Confirmed job steps: eight pure signing-recovery unit tests **passed**; three nonmutating Preview negative-path HTTP tests **passed** using the GitHub Actions Vercel bypass secret. Secret value was never included in source.
- Remaining release blockers: isolated end-to-end successful signing, interrupted database/storage write and retry recovery, PDF visual/byte-integrity verification, and final review of PR #11. Negative-path smoke tests alone do not demonstrate full signing behavior.

## Final-gate review — 2026-10-15

- GitHub Actions run [38716207482](https://github.com/zamiocflight/FlightClaimly/actions/runs/38716207482), commit `805e705883c37d67109e566b87d66ac5e1d7bf12`: **success**, eight offline recovery cases plus **five** protected Preview API negative-path checks.
- Newly added negative paths: synthetic unknown claim cannot sign (403); nonexistent synthetic claim cannot request upload URL (404). Neither creates a customer claim or document.
- Code review of `src/app/api/authority/generate/route.ts` confirms readback hash, append-only evidence insert, metadata repair and no-overwrite logic are present, but their success/fault branches have **not** been exercised end-to-end.
- Additional review finding: `src/app/api/claims/[id]/attachments/route.ts` rebuilds existing JSON metadata entries with a fresh `uploadedAt` on repeat registration; should preserve original metadata for idempotent retries. This is a separate correctness hardening item, not a proven exploit.
- Release status: **NOT YET APPROVED**. Requires a genuinely isolated Supabase database/storage fixture or project and a controlled full-signing success/interrupt/retry run, with signed PDF hash and visual two-page layout inspection. Never create synthetic claims in live customer data by default.
