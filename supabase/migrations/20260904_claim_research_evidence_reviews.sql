create table if not exists public.claim_research_evidence_reviews (
  id uuid primary key,
  evidence_id uuid not null references public.claim_research_evidence(id) on delete cascade,
  claim_id text not null,
  status text not null check (
    status in ('unverified', 'corroborated', 'verified', 'conflicting')
  ),
  reviewed_at timestamptz not null,
  reviewer_type text not null check (
    reviewer_type in ('operator', 'system', 'policy')
  ),
  reviewer_id text,
  method text not null check (
    method in ('manual', 'corroboration-policy', 'trusted-provider-policy')
  ),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists claim_research_evidence_reviews_claim_id_idx
  on public.claim_research_evidence_reviews (claim_id, reviewed_at);

create index if not exists claim_research_evidence_reviews_evidence_id_idx
  on public.claim_research_evidence_reviews (evidence_id, reviewed_at);

alter table public.claim_research_evidence_reviews enable row level security;

-- Review history is internal claims data. No anon/authenticated policy is
-- intentionally created here; server-side access uses the service-role client.
