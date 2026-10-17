-- SECURITY HARDENING PROPOSAL — NOT APPLIED TO PRODUCTION
-- Supabase project vkgfboiwrkijaxmdaeia, verified 2026-10-14.
-- CRITICAL: public.claims currently has anon SELECT USING(true) and
-- anon UPDATE USING(true), permitting arbitrary claim reads and writes
-- to clients holding the publicly distributed anon key.
--
-- Prerequisites before execution:
-- 1. Confirm no customer browser or external integration performs direct
--    anon-key reads/writes of claims; migrate them to token-verified APIs.
-- 2. Verify legacy tracking-link compatibility and signed admin documents.
-- 3. Backup current policy definitions and arrange rollback.
-- 4. Deploy secure server endpoints to production and smoke-test.
--
-- Apply as a reviewed Supabase migration only after explicit approval.
BEGIN;
DROP POLICY IF EXISTS claims_anon_select ON public.claims;
DROP POLICY IF EXISTS claims_anon_update ON public.claims;
DROP POLICY IF EXISTS allow_anon_insert_claims ON public.claims;
-- Keep all writes to claims behind service-role server APIs.
-- Preserve RLS enabled, no anon access.
COMMIT;

-- Rollback policy names/conditions captured from 2026-10-14 snapshot:
-- CREATE POLICY claims_anon_select ON public.claims FOR SELECT TO anon USING (true);
-- CREATE POLICY claims_anon_update ON public.claims FOR UPDATE TO anon USING (true) WITH CHECK (true);
-- CREATE POLICY allow_anon_insert_claims ON public.claims FOR INSERT TO anon WITH CHECK (true);
-- IMPORTANT: rollback restores the vulnerability; only use during incident.
