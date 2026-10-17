# Isolated synthetic signing E2E — PASS (2026-10-15)

## Verified results

- Separate Vercel project: `flightclaimly-signing-isolated-e2e`.
- Separate Supabase branch: `flightclaimly-signing-e2e-20261015`, project ref `mlmuyijnircdrsfpbbvq`, created without customer data.
- Baseline migration and all four security migrations applied successfully.
- Synthetic claim: `a1111111-1111-4111-8111-111111111111`, name `Synthetic Test Passenger`, booking `E2ETEST1`.
- GitHub Actions: https://github.com/zamiocflight/FlightClaimly/actions/runs/38746512087, job `isolated-signing-e2e`: **success**.
- Invalid viewer token rejected: HTTP 403.
- Valid synthetic signing: HTTP 200 and `%PDF-` header, **39,292 bytes**.
- Retry with identical request: HTTP 200 and byte-identical original PDF.
- PDF SHA-256 computed by GitHub Actions: `f9bba76d3cac9094a9c75087704be07e6d89ad149698bf2a1dcc67d1fc795f32`.
- Supabase `authority_signing_evidence` record read back independently: same SHA-256, same 39,292-byte size, `signed_pdf_stored`, matching storage path.
- Security unit and protected Preview smoke job in same run: success.

## Safety and cleanup

- No real customer records copied or accessed.
- Production Supabase schema and original FlightClaimly Vercel project unchanged.
- Vercel isolated project SSO protection restored after testing.
- Paid Supabase test branch **deleted** after successful test to stop ongoing charges.
- One-off isolated signing GitHub Actions job removed from the normal workflow after success; script retained for future deliberate isolated runs.
- Isolated Vercel project still exists but has no live test database.

## Limits

- Admin-authenticated verifier API was not exercised end-to-end.
- PDF was validated as PDF bytes, not visually inspected for legal layout or number of pages.
- Deliberate interrupted-write/fault-injection paths not yet executed.
- Automatic Supabase branching still depends on migration-history baseline reconciliation; this test used manual bootstrap.
- Production release/merge requires explicit approval.
