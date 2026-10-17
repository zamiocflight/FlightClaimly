# Isolated database rebuild — 2026-10-15

## Result: initial schema replay PASS

New isolated Supabase branch: `flightclaimly-rebuild-e2e-20261015` (project ref `gxsvcyyvxirfowugzkmf`). **No production customer data**. Supabase branch cost confirmed at $0.01344/hour; delete after tests to stop charges.

- Baseline source: `supabase/migrations/20261013000000_baseline_public_schema.sql`.
- Baseline applied **manually** on the isolated branch after the Supabase branch was created with missing pre-existing schema.
- All four production migration SQL bodies, read from `supabase_migrations.schema_migrations`, subsequently replayed successfully on the isolated branch.
- Read-only aggregate comparison between production and isolated branch:

| Measure | Production | Isolated |
| --- | ---: | ---: |
| Public columns | 92 | 92 |
| Public constraints | 23 | 23 |
| Public indexes | 17 | 17 |
| Public RLS-enabled tables | 5 | 5 |
| Public RLS policies | 0 | 0 |
| Public triggers | 1 | 1 |
| Private attachments bucket | 1 | 1 |

## Remaining verification
- Compare exact schema definitions and ACLs, not just object counts.
- The baseline file has **not** been registered in production migration history. Therefore automatic Supabase branch bootstrap is **not** yet fixed; current success was manual bootstrap. Do not apply a non-idempotent baseline to production.
- Configure isolated Vercel Preview with test-only credentials and perform successful synthetic signing, PDF SHA-256 read-back, audit verification, interrupted-write retry, and admin checks.
- Production deployment/merge still requires explicit authorization.

**Release gate:** partial PASS for manual schema bootstrap; full E2E signing pending.
