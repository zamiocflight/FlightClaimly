# FlightClaimly Evidence Pack

Last verified: **2026-09-30**

## Purpose

Internal source of truth for factual claims about FlightClaimly. Use this file before writing outreach, comparison submissions, creator briefs, affiliate copy, press material, AI/AEO pages, or other external descriptions.

Rules:
- Prefer primary sources.
- Distinguish verified facts from internal plans or estimates.
- Do not turn an estimate into a fact.
- Re-check time-sensitive facts before external publication.
- If this file and a current legal/customer-facing page conflict, stop and verify the current customer-facing wording before publishing.
- This is a living, append-only evidence record. Add new evidence; do not silently rewrite history.

## 1. Company identity

| Fact | Verified wording | Evidence | Status |
|---|---|---|---|
| Legal name | **FlightClaimly OÜ** | Estonian e-Business Register, registry code 17393073 | VERIFIED |
| Registry code | **17393073** | Estonian e-Business Register | VERIFIED |
| Legal form | **Osaühing (OÜ), Estonia** | Estonian e-Business Register | VERIFIED |
| Registered | **12 December 2025** | Estonian e-Business Register | VERIFIED |
| Registered address | **Harju maakond, Tallinn, Kesklinna linnaosa, Ahtri tn 12, 15551, Estonia** | Estonian e-Business Register | VERIFIED |
| Website | **https://www.flightclaimly.com** | Production site / repository metadata | VERIFIED |
| Service relationship | FlightClaimly is an independent service and is not affiliated with airlines. | Production footer / About copy | VERIFIED |

Primary company source:
- https://ariregister.rik.ee/est/company/17393073/FlightClaimly-O%C3%9C

### Approved short entity description

> FlightClaimly is an independent flight-compensation claims service operated by FlightClaimly OÜ, an Estonian private limited company registered under code 17393073.

Do not currently add claims such as “leading”, “largest”, “fastest”, “best”, or “Europe’s cheapest”.

## 2. Core commercial model

| Fact | Verified wording | Primary evidence | Status |
|---|---|---|---|
| Standard success fee | **20% including VAT** of compensation recovered | Current repository: `src/app/[locale]/fees/page.tsx`; current EN terms source: `messages/en.json` | VERIFIED IN CURRENT SOURCE |
| Upfront service fee | **None** | Fees page + Terms | VERIFIED |
| No win, no fee | No standard service fee if FlightClaimly does not recover compensation | Fees page + Terms | VERIFIED |
| Customer share at standard fee | Customer keeps **80%** | Direct arithmetic from 20% fee | VERIFIED |
| €250 example | Fee €50; customer keeps **€200** | Direct arithmetic | VERIFIED |
| €400 example | Fee €80; customer keeps **€320** | Direct arithmetic | VERIFIED |
| €600 example | Fee €120; customer keeps **€480** | Fees page / direct arithmetic | VERIFIED |

Canonical pricing URL:
- https://www.flightclaimly.com/en/fees

Canonical terms URL:
- https://www.flightclaimly.com/en/terms

### Approved pricing wording

> FlightClaimly charges a standard success fee of 20% including VAT. There is no upfront service fee, and no standard service fee if we do not recover compensation for you.

> On a €600 recovery at the standard 20% fee, FlightClaimly's fee is €120 and the passenger keeps €480.

### Pricing guardrails

Do not say:
- “Europe’s cheapest flight compensation company.”
- “The lowest fee in Europe.”
- “Always cheaper than every competitor.”
- Anything implying a guaranteed recovery.

Competitor comparisons must be dated and supported by the competitor's current official pricing source.

## 3. Legal escalation pricing

Current FlightClaimly fees-page source states:

> If legal action is required, an additional 10% legal action fee applies, bringing the total fee to 30% including VAT.

Therefore the currently published fees-page arithmetic is:
- standard: 20% incl. VAT
- legal-action total: 30% incl. VAT
- €600 recovery under legal-action total: customer keeps **€420**

### Important consistency note — CHECK BEFORE EXTERNAL USE

The current repository's EN Terms wording is broader: it says that if legal action becomes necessary, additional fees or costs may apply, and that applicable terms will be explained and separately approved before proceedings involving additional customer costs.

A web-indexed/cached copy of the EN Terms observed on 2026-09-30 was older still and did not state the 20% figure.

**Operational rule:** use the 30% legal-action total only when the current customer-facing pricing/approval flow supports it. Before a publisher submission or other external verification package, re-check the live `/en/fees`, `/en/terms`, and claim approval flow together. Do not conceal or smooth over this wording difference.

## 4. Service scope

Verified current positioning:
- FlightClaimly helps passengers investigate and pursue flight-compensation claims.
- The service covers claims assessed under **EU261** and **UK261** where applicable.
- FlightClaimly can act as the passenger's representative toward the airline.
- A separate power of attorney or mandate may be requested where required.
- The product handles disrupted-flight scenarios including delays, cancellations, missed connections and denied boarding, subject to the applicable rules and facts of the case.
- FlightClaimly does **not** guarantee that a submitted claim will result in compensation.

Primary internal/public sources:
- `messages/en.json` — Terms, About and claim journey
- https://www.flightclaimly.com/en/terms
- FlightClaimly route/airport/airline knowledge pages

### Approved service wording

> FlightClaimly helps passengers assess and pursue eligible flight-compensation claims under EU261 and UK261. We handle the claim with the airline on the passenger's behalf, subject to the facts and rules applicable to each case.

Do not say that every 3+ hour delay automatically qualifies. Cause, route, operating carrier and other legal conditions can affect eligibility.

## 5. Compensation amounts

Current FlightClaimly knowledge pages describe potential compensation amounts of:
- **€250**
- **€400**
- **up to €600 per passenger**

These amounts depend on the applicable passenger-rights regime, route/distance and circumstances.

### Approved wording

> Eligible passengers may be entitled to compensation of up to €600 under EU261, depending on the flight and disruption.

Avoid wording that promises €600 merely because a flight was delayed or cancelled.

## 6. Languages

Current supported locales in the production codebase:

- English — EN
- Swedish — SV
- Danish — DA
- German — DE
- Dutch — NL
- Polish — PL
- Finnish — FI
- Spanish — ES

Repository source:
- `src/i18n/routing.ts`
- `src/middleware.ts`

Verified count: **8 languages/locales**.

Approved wording:

> FlightClaimly is available in eight languages: English, Swedish, Danish, German, Dutch, Polish, Finnish and Spanish.

## 7. Digital claim process

Current product flow supports the following factual description:

1. Passenger enters flight/itinerary details.
2. FlightClaimly checks/reviews the disruption and potential eligibility.
3. Passenger supplies contact/passenger details and booking reference.
4. Authority/signature is collected where required.
5. Supporting documents can be uploaded.
6. FlightClaimly prepares/submits the claim and follows up with the airline.
7. Claim status can be tracked and status updates are sent.

Approved wording:

> The FlightClaimly claim process is handled digitally, from flight details and supporting documents through airline follow-up and claim-status updates.

Do not publish a guaranteed processing-time claim. Current public copy explicitly notes that airline timelines vary.

## 8. Technology / efficiency positioning

Current fees-page copy states that FlightClaimly uses **automation and modern flight data** to handle straightforward parts of the process efficiently and keep overhead lower.

Approved wording:

> FlightClaimly uses automation and modern flight data to handle straightforward parts of the claims process efficiently, helping support a 20% standard success fee.

Guardrail: do not claim that automation makes FlightClaimly more accurate, more successful, faster, or legally superior unless supported by measured evidence.

## 9. Official FlightClaimly URLs

Core:
- Website: https://www.flightclaimly.com
- English fees: https://www.flightclaimly.com/en/fees
- English terms: https://www.flightclaimly.com/en/terms
- English privacy: https://www.flightclaimly.com/en/privacy
- English about: https://www.flightclaimly.com/en/about
- English contact: https://www.flightclaimly.com/en/contact

Current comparison authority:
- https://www.flightclaimly.com/en/compare/refly
- https://www.flightclaimly.com/en/compare/airhelp
- https://www.flightclaimly.com/en/compare/airadvisor
- https://www.flightclaimly.com/en/compare/skyrefund

## 10. External proof inventory

### Verified external proof available now

- Estonian e-Business Register record for FlightClaimly OÜ.
- Current official FlightClaimly pricing, terms and product pages.
- Public comparison pages with dated competitor pricing sources.

### Pending / not yet approved as proof

- Trustpilot profile/review score — activation/support process ongoing as of 2026-09-30.
- Customer review count — do not state until verifiable.
- Claims handled — do not state a number until a defensible reporting source exists.
- Compensation recovered — do not state a cumulative amount until a defensible reporting source exists.
- Success rate — do not state until sample definition and calculation methodology are documented.
- Average payout time — do not state until measured on a defined sample.
- Airline response/rejection statistics — future proprietary-data opportunity; not yet established.
- Press/media coverage — add only after publication is independently accessible.
- “Founded” vs “launched” date — company registration is verified; public product launch date is not approved here until independently documented.

## 11. Claims we must not make yet

Until supported by evidence, do **not** claim:
- Europe’s cheapest / lowest-fee provider.
- Best flight compensation company.
- Highest success rate.
- Fastest claims company.
- Guaranteed compensation.
- Guaranteed payout time.
- A specific number of customers/claims handled.
- A specific amount of compensation recovered.
- A Trustpilot rating or review count.
- Market leadership.
- Proprietary disruption/claim statistics without methodology and source data.
- Competitor pricing without a current dated source check.

## 12. External verification packet — reusable facts

When a publisher, comparison site, creator or partner asks for basic verification, start with:

**Company:** FlightClaimly OÜ  
**Registry:** Estonia, code 17393073  
**Registered:** 12 December 2025  
**Service:** flight-compensation claims / passenger representation  
**Coverage:** EU261 and UK261 where applicable  
**Standard fee:** 20% including VAT  
**No win, no fee:** yes — no standard service fee without recovery  
**Passenger keeps:** 80% under standard fee  
**€600 example:** €120 fee / €480 passenger share  
**Languages:** EN, SV, DA, DE, NL, PL, FI, ES  
**Website:** https://www.flightclaimly.com  
**Pricing:** https://www.flightclaimly.com/en/fees  
**Terms:** https://www.flightclaimly.com/en/terms

For legal-action pricing, use Section 3's consistency check before external submission.

## 13. Evidence maintenance protocol

Whenever a new proof point becomes real:

1. Record the exact fact.
2. Record the primary source.
3. Record the date checked.
4. Define approved external wording.
5. Add any necessary limitation/guardrail.
6. Only then use it in outreach, AEO/SEO, creator briefs, affiliate copy or press material.

Priority additions:
- Trustpilot profile + genuine reviews.
- First defensible operating metrics.
- Paid-claim case studies with appropriate consent/anonymisation.
- Independent publisher mentions.
- Proprietary FlightClaimly disruption/claims data with documented methodology.

---

## Verification log

### 2026-09-30 — Evidence Pack v1
- Verified company identity against the official Estonian e-Business Register.
- Verified current source-controlled fee page, EN Terms copy, supported locales, About copy and claim-flow wording.
- Cross-checked publicly indexed FlightClaimly Terms/knowledge pages.
- Recorded the legal-action wording consistency issue rather than treating inconsistent wording as settled.
- No unsupported customer, review, success-rate, payout-speed or market-leadership claims added.
