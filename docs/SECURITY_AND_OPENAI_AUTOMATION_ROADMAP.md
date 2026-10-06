# FlightClaimly — Security Hardening & OpenAI Automation Roadmap

Status: PLANNING / READ-ONLY FIRST  
Created: 2026-10-06  
Owner: FlightClaimly OÜ  
Repository: `zamiocflight/FlightClaimly`

## Purpose

This file is the restart pointer for a dedicated technical session covering:

1. production security hardening;
2. bot/DDoS/API-abuse protection;
3. a controlled OpenAI API automation layer;
4. automation opportunities already implied by the existing FlightClaimly architecture and documentation.

A new technical session should read this file together with:

- `docs/SYSTEM_PROCESS_MAP.md`
- `docs/CURRENT_SPRINT_LATEST.md`
- `docs/FLIGHTCLAIMLY_HANDOFF.MD`
- `docs/CLAIMS_DESK.md`
- `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md`
- `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md`
- `docs/FLIGHTCLAIMLY_EVIDENCE_PACK.md`

Do not implement security or AI changes merely because they are listed here. First inspect the actual current code, production configuration and data boundaries.

---

# 1. Immediate security objective

FlightClaimly accepts customer identity/contact data, booking details and supporting documents and connects to external aviation/email/data services. Security work should therefore focus first on protecting customer data, transactional state, paid API quotas and production availability.

The first security sprint must begin READ-ONLY.

## Audit before changing anything

Inspect and report current state for:

- Vercel firewall / WAF / DDoS controls
- public and server API routes
- rate limiting
- bot protection / CAPTCHA / Cloudflare Turnstile or equivalent
- OAG and other paid/external API abuse exposure
- claim submission abuse
- passenger-authority token endpoints
- claim tracking/viewer tokens
- payout-token endpoints
- admin authentication and authorization
- Supabase RLS / server-only access boundaries
- file uploads and storage permissions
- accepted file types / sizes / content validation
- malware scanning status
- secrets and environment variables
- accidental client-side secret exposure
- email endpoints / resend abuse
- CORS / CSRF where applicable
- security headers: CSP, HSTS, frame protection, MIME sniffing/referrer policy
- dependency vulnerabilities
- logging / alerting / auditability
- backups and restore process
- production access / least privilege
- error responses and PII leakage
- webhook verification if/where webhooks exist

Do not assume a protection is absent merely because it is not documented. Verify code and production configuration.

---

# 2. Security priority model

## P0 — protect immediately if missing

- No secrets/API keys exposed client-side or committed to repository.
- Authentication/authorization around admin and privileged claim operations.
- Supabase/customer-document access controls.
- Secure claim/passenger/payout token handling.
- Server-side validation of all customer-controlled input.
- File upload restrictions and private storage.
- Rate limits on expensive or abuse-sensitive endpoints.
- Protect OAG/external API calls from direct automated quota draining.
- Claim submission anti-spam / anti-bot protection.
- Prevent unrestricted claim enumeration or access by raw IDs.

## P1 — harden production

- Review/configure Vercel Firewall/WAF.
- Add adaptive bot challenge where appropriate.
- Prefer low-friction Cloudflare Turnstile or equivalent on abuse-sensitive public submissions rather than CAPTCHA across the whole conversion funnel.
- Verify challenge tokens server-side.
- Security headers.
- Dependency/security audit.
- Logging and alerts for unusual request/submission/API-volume patterns.
- Email abuse protection.
- Basic incident-response runbook.

## P2 — operational maturity

- Backup/restore test.
- Production access register and least-privilege review.
- Key rotation procedure.
- Security incident log/process.
- Data retention/deletion review.
- Vendor/security inventory.
- Periodic vulnerability/dependency review.
- Future ISO 27001 / SOC 2 readiness gap analysis.

Do not pursue ISO 27001 or SOC 2 certification merely for a badge at the current stage. Build good controls and evidence now so later certification is easier when commercial/customer requirements justify it.

---

# 3. CAPTCHA / bot protection principle

CAPTCHA is a human-vs-automation challenge used to reduce automated abuse.

For FlightClaimly, do NOT add intrusive CAPTCHA to every page or step. Conversion matters.

Preferred architecture:

legitimate user
→ normal claim/checker experience
→ server-side rate limits
→ risk-sensitive challenge only where needed
→ server verifies challenge token
→ protected endpoint executes

Likely challenge candidates:

- final claim submission
- repeated/abnormal flight-search requests
- public forms that can trigger email or expensive processing
- suspicious passenger-authority attempts
- endpoints under active automated attack

Rate limiting remains required even when CAPTCHA/Turnstile exists because attackers can attempt to bypass the browser UI and call endpoints directly.

---

# 4. OpenAI API architecture principle

OpenAI is an orchestration/reasoning layer, NOT FlightClaimly's legal source of truth.

Existing deterministic engines remain authoritative:

- Authority Engine
- Passenger Rights / Legal Rule layer
- Delay Reason Engine
- Claim Rights Assessment Engine
- Flight/route/airport/airline knowledge
- transactional Claim domain
- Claims Desk rules and evidence

AI may consume structured outputs from these systems. It must not silently replace them.

Preferred flow:

verified FlightClaimly facts / claim facts
→ deterministic FlightClaimly engines
→ OpenAI API for classification, summarisation, drafting or tool selection
→ structured output
→ validation / guardrails
→ human approval for legally or financially consequential actions
→ action / storage / audit log

Never send unnecessary customer PII or documents to a model. Minimise data, define retention/privacy requirements before production use, and keep secrets server-side.

---

# 5. Automation opportunities found in current FlightClaimly documentation

The documentation already points toward several automation layers.

## A. Claims Desk AI assistant — HIGH VALUE

Existing foundation:
- `CLAIMS_DESK.md` defines intake, reconstruction, heads of claim, limitation, assessment, authority, airline demand, escalation and claims intelligence.
- `CLAIM_RIGHTS_ASSESSMENT_ENGINE.md` explicitly names future claim triage and AI Brain orchestration.
- `FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md` says Claim Rights Assessment can later feed Claims Desk, demand letters, airline-reply analysis and an AI Brain.

Safe first implementation:
1. load normalized claim facts;
2. call deterministic `assessClaimRights()`;
3. provide the model only the structured assessment plus relevant verified evidence;
4. request structured output:
   - established facts
   - missing facts/evidence
   - contradictions
   - legal questions requiring human review
   - suggested next action
   - draft communication
5. show result internally;
6. human approves before anything is sent.

Do NOT allow the model to automatically reject claims, concede extraordinary circumstances, initiate litigation, change pricing or send binding legal communications.

## B. Incoming airline email triage — HIGH VALUE

Potential workflow:

airline email received
→ associate with claim
→ classify reply
→ extract reference/status/deadline/amount/reason
→ compare against claim assessment/evidence
→ propose Claims Desk next step
→ draft reply
→ human approval
→ send
→ update claim timeline/status

Useful classifications:
- acknowledgement
- request for documents
- compensation approved
- partial approval
- rejection
- extraordinary-circumstances defence
- limitation defence
- duplicate/assignment objection
- authority/POA request
- settlement offer
- payment confirmation
- unclear / human review

This can remove large amounts of repetitive Claims Desk work without giving AI final legal authority.

## C. Claim intake / document extraction — HIGH VALUE

Uploaded booking confirmations, receipts and airline correspondence can be processed into structured candidate facts:

- passenger names
- booking reference
- ticket numbers
- flight numbers
- travel dates
- airports
- scheduled/actual times if present
- expenses/currencies
- airline case/reference numbers
- stated cancellation/delay reason

All extracted fields must carry source/provenance and confidence. Critical facts require validation before becoming authoritative claim state.

## D. Evidence-gap detector — HIGH VALUE

Use the deterministic assessment plus claim evidence inventory to produce a checklist such as:

- missing booking confirmation
- missing airline rejection
- missing receipt
- cause not established
- rerouting facts incomplete
- arrival time uncertain
- passenger authority missing

This should be one of the first automations because it assists rather than decides.

## E. Demand-letter / reply drafting — HIGH VALUE

Generate drafts from:
- verified claim facts;
- Claims Desk assessment;
- approved legal authorities;
- existing FlightClaimly templates/voice;
- known airline reply.

Draft only. Human approval initially mandatory.

The model must distinguish:
- established fact;
- customer allegation;
- airline allegation;
- inference;
- unresolved issue.

## F. Claims intelligence — MEDIUM/HIGH VALUE LATER

`CLAIMS_DESK.md` says resolved claims should improve future operations.

After closure, AI can help convert resolved cases into anonymized structured learnings:
- airline defence pattern
- successful evidence
- common missing document
- processing time
- escalation route
- outcome

Customer-specific data must never flow directly into public Knowledge Engine registries. Only validated, anonymized findings may be promoted.

## G. Content / disruption opportunity engine — HIGH VALUE FOR GROWTH

Existing docs already plan:
- Social Content Engine
- live disruption/news integration
- Content & Growth Operator workflow
- FlightClaimly Data Authority / Flight Disruption Index

Potential workflow:

trusted disruption/aviation data
→ detect material event
→ rank commercial/content relevance
→ fetch verified FlightClaimly legal/fee facts
→ generate 3–5 content angles/hooks
→ create creator/editor brief
→ human/operator review
→ publish manually initially
→ ingest performance metrics
→ suggest repeat/stop/test

Do NOT auto-publish legal conclusions such as “passengers on X flight get €600” without deterministic verification and approval.

## H. Evidence Pack / factual copy assistant — MEDIUM VALUE

Use `FLIGHTCLAIMLY_EVIDENCE_PACK.md` as the approved fact source for:
- creator briefs
- affiliate copy
- outreach drafts
- comparison submissions
- FAQ drafts
- press material
- AEO/AI-answer content

Structured generation can enforce prohibited/unsupported claims before content reaches publication.

## I. Customer status communication — MEDIUM VALUE

Existing system already has transactional email/status infrastructure.

AI can later draft more useful status explanations from structured state:
- what happened
- what FlightClaimly has done
- what is waiting on airline/customer
- what document is needed next

No invented ETA or guaranteed outcome.

## J. Internal daily Claims Desk brief — QUICK WIN

A scheduled server job can summarize operational queues without changing claim state:

- new claims
- claims waiting for review
- airline replies needing action
- customer documents missing
- approvals/payments received
- cases with approaching deadlines
- anomalous/stale claims

Start read-only.

---

# 6. What OpenAI API should NOT automate first

Do not start with:

- autonomous legal eligibility decisions;
- automatic claim rejection;
- automatic airline concessions;
- autonomous litigation/escalation;
- autonomous payment/payout changes;
- mass autonomous customer emails;
- mass autonomous social publishing;
- changing Terms/pricing/legal copy;
- browser agents with unrestricted admin access;
- giving a model unrestricted database write access;
- sending complete customer datasets when only a few fields are needed.

Automation should first reduce reading, extraction, triage, drafting and monitoring work.

---

# 7. Recommended implementation sequence

## Phase 0 — security gate

Complete the security audit and fix material P0 findings before exposing new AI endpoints or background jobs.

## Phase 1 — internal read-only AI assistant

Build one server-side OpenAI client and one narrow internal use case:

**Claim Evidence & Next-Action Assistant**

Input:
- claim ID server-side
- minimal normalized claim facts
- Claim Rights Assessment output
- evidence inventory

Output with strict structured schema:
- summary
- established facts
- missing evidence
- uncertainties
- suggested next actions
- draft internal note

No external send. No database mutation except optional audited AI-run record after explicit design.

## Phase 2 — airline reply triage + draft

Connect incoming correspondence to the same framework.

Output:
- reply classification
- extracted facts
- issues raised
- suggested response
- draft response

Human approval required before send/status mutation.

## Phase 3 — document extraction

Add controlled multimodal/document extraction for booking confirmations, airline correspondence and receipts.

Persist only validated fields through existing Claim domain boundaries.

## Phase 4 — growth/content copilot

Use trusted disruption data + Evidence Pack + approved guardrails to create:
- event ranking
- hooks
- scripts
- captions
- editor briefs
- distribution suggestions

Human/operator approval before publication.

## Phase 5 — controlled actions

Only after accuracy, audit logs and permissions are proven should selected low-risk actions become automatic.

Examples may include:
- creating an internal task;
- marking an internal AI-analysis timestamp;
- sending a non-legal missing-document reminder from a locked template;
- producing a daily queue report.

Every action must have explicit permissions, idempotency and audit logging.

---

# 8. OpenAI API technical requirements

Use the current OpenAI Responses API rather than building a new integration around legacy completion patterns.

Required design:

- server-side only API key;
- environment variable / secret manager;
- never expose key in browser bundle;
- one central OpenAI client/service module;
- model choice configurable;
- strict Structured Outputs / JSON Schema for machine-consumed results;
- function/tool calls only through narrow allow-listed server functions;
- input minimization;
- request/response metadata and internal trace ID;
- timeout/retry policy;
- rate/cost limits;
- error/fallback behavior;
- prompt/version tracking;
- evaluation fixtures before production;
- human approval gates;
- no raw chain-of-thought storage requirement;
- no model output treated as verified fact merely because it is confident.

Before implementation, verify current OpenAI model/API names, pricing, data controls and retention requirements against current official documentation.

---

# 9. Suggested internal tool boundary

The model should never receive a generic “database tool”.

Expose narrow functions such as:

- `getClaimAssessment(claimId)`
- `getClaimEvidenceInventory(claimId)`
- `getClaimCorrespondence(claimId)`
- `getVerifiedAuthority(authorityIds)`
- `createInternalDraft(claimId, draft)`
- `createInternalTask(claimId, task)`

Future write tools must require explicit policy/approval.

Avoid:
- arbitrary SQL
- arbitrary Supabase mutation
- arbitrary email send
- arbitrary file access
- arbitrary admin browser control

---

# 10. Success metrics

Security:
- no exposed secrets;
- protected sensitive endpoints;
- abusive traffic cannot cheaply drain external API quotas;
- customer documents remain private;
- meaningful security events are observable;
- restore/incident procedure exists.

Claims automation:
- minutes saved per claim;
- extraction accuracy;
- triage accuracy;
- percentage of AI drafts accepted with minor/no edits;
- false legal assertions;
- missed evidence rate;
- cost per analyzed claim.

Growth automation:
- useful content opportunities surfaced;
- approved content produced;
- traffic/checker starts/submitted claims attributable to assisted content;
- zero invented legal/statistical claims.

Do not optimize automation for “number of AI calls”. Optimize for reliable human time saved and claims/growth outcomes.

---

# 11. New-session exact starting prompt

Paste this into a dedicated technical FlightClaimly session:

> Read `docs/SECURITY_AND_OPENAI_AUTOMATION_ROADMAP.md`, `docs/SYSTEM_PROCESS_MAP.md`, `docs/CURRENT_SPRINT_LATEST.md`, `docs/FLIGHTCLAIMLY_HANDOFF.MD`, `docs/CLAIMS_DESK.md`, `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md`, `docs/engines/CLAIM_RIGHTS_ASSESSMENT_ENGINE.md` and the actual current code. Start READ-ONLY. First audit the current security implementation: Vercel/WAF/DDoS, rate limiting, bots/Turnstile, API abuse/OAG, claim submission, auth/admin, Supabase/storage/uploads, tokens, secrets, headers, dependencies, logging and backups. Then map the safest first OpenAI API automation against the existing deterministic engines. Do not modify code until you present a P0/P1/P2 security report and a Phase-1 implementation plan. Preserve claim-flow integrity, legal guardrails, privacy and conversion.

---

# 12. Current business constraint

Traffic / conversion / submitted claims remain the commercial priority.

Security work should close real risk, not become an endless infrastructure project.

AI automation should buy founder/Claims Desk time back and improve throughput. It should not delay acquisition work merely because automation is technically interesting.
