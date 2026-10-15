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
