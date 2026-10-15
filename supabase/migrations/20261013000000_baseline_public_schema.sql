-- Baseline for new empty Supabase databases. No customer data.
-- MUST replay subsequent security migrations and compare to production before release.
create table public.claim_research_evidence (
  id uuid not null,
  claim_id text not null,
  question_id text not null,
  provider_id text,
  source_type text not null,
  source_name text not null,
  source_url text,
  source_record_id text,
  observed_at timestamp with time zone,
  retrieved_at timestamp with time zone not null,
  raw_finding text not null,
  normalized_finding text,
  fact_key text,
  fact_value jsonb,
  confidence text not null,
  verification_status text not null,
  content_hash text not null,
  metadata jsonb,
  notes text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

create table public.claim_research_evidence_reviews (
  id uuid not null,
  evidence_id uuid not null,
  claim_id text not null,
  status text not null,
  reviewed_at timestamp with time zone not null,
  reviewer_type text not null,
  reviewer_id text,
  method text not null,
  note text,
  created_at timestamp with time zone default now() not null
);

create table public.claims (
  received_at uuid not null,
  flight_number text not null,
  date date,
  from_code text not null,
  to_code text not null,
  name text not null,
  email text,
  booking_number text,
  status text default 'new'::text not null,
  updated_at timestamp with time zone default now() not null,
  attachments jsonb default '[]'::jsonb not null,
  viewer_token text,
  viewer_token_created_at timestamp with time zone,
  phone text,
  sent_to_airline_at timestamp with time zone,
  archived_at timestamp with time zone,
  payout_account_holder text,
  payout_iban text,
  payout_details_submitted_at timestamp with time zone,
  payout_iban_last4 text,
  payout_token text,
  payout_token_created_at timestamp with time zone,
  payout_token_expires_at timestamp with time zone,
  address text,
  postal_code text,
  city text,
  country text,
  address2 text,
  compensation_amount integer,
  currency text,
  choice text,
  segments jsonb,
  pax jsonb,
  passenger_count integer default 1,
  layovers jsonb,
  finish_email_sent_at timestamp with time zone,
  locale text
);

create table public.passenger_authorizations (
  id uuid default gen_random_uuid() not null,
  claim_id uuid not null,
  passenger_index integer not null,
  first_name text not null,
  last_name text not null,
  email text,
  under_18 boolean default false not null,
  invite_token uuid,
  status text default 'pending'::text not null,
  invited_at timestamp with time zone,
  signed_at timestamp with time zone,
  authority_path text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Constraints from production metadata
alter table claim_research_evidence add constraint "claim_research_evidence_verification_status_check" CHECK ((verification_status = ANY (ARRAY['unverified'::text, 'corroborated'::text, 'verified'::text, 'conflicting'::text])));
alter table claim_research_evidence add constraint "claim_research_evidence_confidence_check" CHECK ((confidence = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text])));
alter table claim_research_evidence add constraint "claim_research_evidence_pkey" PRIMARY KEY (id);
alter table claim_research_evidence add constraint "claim_research_evidence_claim_hash_unique" UNIQUE (claim_id, content_hash);
alter table claim_research_evidence_reviews add constraint "claim_research_evidence_reviews_method_check" CHECK ((method = ANY (ARRAY['manual'::text, 'corroboration-policy'::text, 'trusted-provider-policy'::text])));
alter table claim_research_evidence_reviews add constraint "claim_research_evidence_reviews_reviewer_type_check" CHECK ((reviewer_type = ANY (ARRAY['operator'::text, 'system'::text, 'policy'::text])));
alter table claim_research_evidence_reviews add constraint "claim_research_evidence_reviews_status_check" CHECK ((status = ANY (ARRAY['unverified'::text, 'corroborated'::text, 'verified'::text, 'conflicting'::text])));
alter table claim_research_evidence_reviews add constraint "claim_research_evidence_reviews_evidence_id_fkey" FOREIGN KEY (evidence_id) REFERENCES claim_research_evidence(id) ON DELETE CASCADE;
alter table claim_research_evidence_reviews add constraint "claim_research_evidence_reviews_pkey" PRIMARY KEY (id);
alter table claims add constraint "claims_payout_iban_last4_check" CHECK ((length(payout_iban_last4) <= 4));
alter table claims add constraint "claims_locale_check" CHECK (((locale IS NULL) OR (locale = ANY (ARRAY['sv'::text, 'en'::text, 'da'::text, 'de'::text, 'pl'::text, 'fi'::text]))));
alter table claims add constraint "claims_pkey" PRIMARY KEY (received_at);
alter table passenger_authorizations add constraint "passenger_authorizations_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'email_missing'::text, 'invited'::text, 'signed'::text])));
alter table passenger_authorizations add constraint "passenger_authorizations_claim_id_fkey" FOREIGN KEY (claim_id) REFERENCES claims(received_at) ON DELETE CASCADE;
alter table passenger_authorizations add constraint "passenger_authorizations_pkey" PRIMARY KEY (id);
alter table passenger_authorizations add constraint "passenger_authorizations_claim_id_passenger_index_key" UNIQUE (claim_id, passenger_index);
alter table passenger_authorizations add constraint "passenger_authorizations_invite_token_key" UNIQUE (invite_token);

-- Additional non-constraint indexes captured from production
CREATE INDEX claim_research_evidence_claim_id_idx ON public.claim_research_evidence USING btree (claim_id);
CREATE INDEX claim_research_evidence_fact_key_idx ON public.claim_research_evidence USING btree (claim_id, fact_key) WHERE (fact_key IS NOT NULL);
CREATE INDEX claim_research_evidence_question_id_idx ON public.claim_research_evidence USING btree (claim_id, question_id);
CREATE INDEX claim_research_evidence_reviews_claim_id_idx ON public.claim_research_evidence_reviews USING btree (claim_id, reviewed_at DESC);
CREATE INDEX claim_research_evidence_reviews_evidence_id_idx ON public.claim_research_evidence_reviews USING btree (evidence_id, reviewed_at DESC);
CREATE INDEX claims_status_idx ON public.claims USING btree (status);
CREATE INDEX claims_updated_at_idx ON public.claims USING btree (updated_at DESC);
CREATE UNIQUE INDEX claims_viewer_token_key ON public.claims USING btree (viewer_token);

-- Baseline security: default deny all client roles; server service role only
alter table public.claims enable row level security;
revoke select, insert, update, delete on public.claims from anon, authenticated;
alter table public.passenger_authorizations enable row level security;
revoke select, insert, update, delete on public.passenger_authorizations from anon, authenticated;
alter table public.claim_research_evidence enable row level security;
revoke select, insert, update, delete on public.claim_research_evidence from anon, authenticated;
alter table public.claim_research_evidence_reviews enable row level security;
revoke select, insert, update, delete on public.claim_research_evidence_reviews from anon, authenticated;

-- Bucket is private from creation. Never seed production customer files.
insert into storage.buckets (id,name,public) values ('attachments','attachments',false) on conflict (id) do update set public=false;
