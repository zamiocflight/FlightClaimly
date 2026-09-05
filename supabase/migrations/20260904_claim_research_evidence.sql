create table if not exists public.claim_research_evidence (
  id uuid primary key,
  claim_id text not null,
  question_id text not null,
  provider_id text,
  source_type text not null,
  source_name text not null,
  source_url text,
  source_record_id text,
  observed_at timestamptz,
  retrieved_at timestamptz not null,
  raw_finding text not null,
  normalized_finding text,
  fact_key text,
  fact_value jsonb,
  confidence text not null check (confidence in ('low', 'medium', 'high')),
  verification_status text not null check (
    verification_status in ('unverified', 'corroborated', 'verified', 'conflicting')
  ),
  content_hash text not null,
  metadata jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint claim_research_evidence_claim_hash_unique unique (claim_id, content_hash)
);

create index if not exists claim_research_evidence_claim_id_idx
  on public.claim_research_evidence (claim_id);

create index if not exists claim_research_evidence_question_id_idx
  on public.claim_research_evidence (claim_id, question_id);

create index if not exists claim_research_evidence_fact_key_idx
  on public.claim_research_evidence (claim_id, fact_key)
  where fact_key is not null;

alter table public.claim_research_evidence enable row level security;

-- Research evidence is internal claims data. No anon/authenticated policy is
-- intentionally created here; server-side access uses the service-role client.
