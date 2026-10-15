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
