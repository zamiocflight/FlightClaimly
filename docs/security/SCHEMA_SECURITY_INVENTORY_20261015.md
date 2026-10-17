# FlightClaimly schema security inventory — 2026-10-15

Read-only catalog inspection of the existing Supabase project. No customer data exported and no production schema changed.

## Public schema

Five tables: `claims`, `passenger_authorizations`, `claim_research_evidence`, `claim_research_evidence_reviews`, `authority_signing_evidence`.

- Row-level security is **enabled** for all five; `FORCE ROW LEVEL SECURITY` is false.
- **No public-schema RLS policies** are registered. This is a default-deny posture for ordinary roles subject to PostgreSQL ownership/bypass semantics.
- `authority_signing_evidence` grants table privileges to `service_role` (and `postgres`); no `anon` or `authenticated` ACL entries.
- Other public tables have ACL entries granting only `Dxtm` (TRUNCATE/REFERENCES/TRIGGER/MAINTAIN) to `anon` and `authenticated`, **not SELECT/INSERT/UPDATE/DELETE**. The server-side service role has CRUD.
- Only one user-defined trigger exists in public: `authority_evidence_immutable`, blocking UPDATE and DELETE on `authority_signing_evidence` via `reject_authority_evidence_mutation()`.
- Only one public SQL function was found: `reject_authority_evidence_mutation()`.
- Seventeen public indexes were identified; in addition to key-backed indexes there are status/update/viewer-token indexes on `claims` and lookup indexes on research evidence/reviews.
- Private Supabase Storage bucket: `attachments`, `public=false`. No RLS policies were found on `storage.objects`. Signed upload URLs and service-role API operations need separate end-to-end checks.

## Rebuild constraints

The existing migration history contains four security-related migrations but no original schema baseline. The SQL snapshot in `PRODUCTION_SCHEMA_SNAPSHOT_20261015.sql` captures the current state, including objects introduced by later migrations; it **must not** be replayed as an early baseline without splitting out later changes.

To finish a reproducible baseline: reconcile the four migration SQL bodies, add only pre-existing objects/constraints/indexes/grants/RLS and the bucket setup in chronological order, then prove clean replay in a disposable Supabase project. Do not edit production migrations or create customer records in production.

## Security interpretation

This catalog supports **default-deny database access** for anonymous/authenticated roles and a private bucket, but does not prove every application route enforces correct authorization, that a service-role key is not exposed, or that a successful signing workflow is tamper-resistant. The 13 passing CI checks cover logic and Preview negative paths only.

**Release gate remains blocked** pending clean database replay and full isolated successful signing/retry verification.
