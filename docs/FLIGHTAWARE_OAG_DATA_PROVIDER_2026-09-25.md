# FlightClaimly — FlightAware / AeroAPI / OAG Data Provider Handoff

**Continuity handoff updated: 25 September 2026**

## Purpose
Separate workstream from Vanessa. FlightClaimly needs historical/operational flight data for claims: scheduled/actual times, ideally gate OUT/OFF/ON/IN, routes, aircraft/registration where useful, historical depth, and ability to reconstruct disruptions and earlier rerouting options.

## FlightAware refund dispute
FlightAware has replied and **refused repayment/refund**. Dave does not accept that outcome and wants the response/escalation assessed.

Critical unresolved contractual point:
- Prior terms discussed appeared to mention **Firehose**.
- FlightClaimly’s actual relevant product was **AeroAPI**.
- Do **not** rely on Firehose terms until the exact AeroAPI terms/version governing the actual purchase/account/charge have been retrieved.
- Before drafting a substantive challenge, retrieve the actual FlightAware rejection, invoices/charges, Dave’s refund request, and applicable AeroAPI terms. Use connected Gmail/records rather than memory.

## Provider requirements
Provider should offer reliable historical scheduled/actual data; operational timestamps ideally OUT/OFF/ON/IN; sufficient historical depth; efficient flight/date queries; commercial use compatible with internal claims work; predictable pricing/no surprise overages; stable docs/support; strong Europe + long-haul coverage; data useful for chronology/evidence and identifying earlier rerouting; clear storage/licensing/display rules.

## OAG — current working strategy
OAG has told FlightClaimly by email that its **1,000 free API calls** can be used for our current purpose. Current assessment:
- **Yes: OAG is the practical primary replacement path for now**, subject to the already-open commercial/licensing questions below.
- At present claim volume, **1,000 calls should be enough if queries are disciplined**.
- Do not buy a larger plan merely because it exists. Use the free allowance first, measure actual calls per claim, and only scale when usage proves it necessary.
- Cache/reuse already obtained facts where OAG licensing permits.
- Do not repeatedly query the same flight/date without need.

Open OAG questions before scale:
- paid pricing / overage / plan structure;
- what exactly counts as one billable API call;
- historical-access limits by endpoint/plan;
- commercial/internal claims use rights;
- storage/caching/display restrictions;
- whether free-tier data fields and depth remain sufficient as claim volume grows.
Never invent OAG pricing.

## Call-budget discipline
Use customer/booking documents first. Query only disrupted legs needed to establish operation; query missed onward connection when relevant; query alternative rerouting flights only when Article 8/reasonable-measures analysis requires it. Avoid broad route/date spraying. Record retrieved facts internally where licensing permits.

Practical target: create a per-claim data record so later claim work reads stored verified timestamps before making a fresh API request. Track monthly call count and calls-per-claim. The free 1,000-call allowance should be treated as an operational budget, not as a reason to query everything.

## Provider decision as of 25 Sep 2026
**Near term:** use OAG as the working provider while the free allowance covers volume.
**FlightAware:** keep technically separate; pursue the refund dispute on the correct AeroAPI contractual basis, not Firehose assumptions.
**Backup/scale:** investigate Cirium, Flightradar24 commercial/API, Aviationstack, AirLabs and others only against actual requirements and current 2026 terms/pricing. Do not switch merely on marketing claims.

## Next FlightAware action
Retrieve and inspect:
1. FlightAware’s latest refusal/rejection email;
2. invoice/charge/product/account details;
3. Dave’s original refund/compensation request;
4. exact AeroAPI terms/version in force at purchase/charge;
5. any renewal/cancellation/refund representations.
Then assess the strongest contractual/payment/escalation route. No final legal conclusion until these documents are verified.

## Next OAG action
Retrieve OAG correspondence confirming 1,000 free calls and any discussion of future pricing. If pricing was not answered, send a short commercial follow-up asking specifically for:
- price after free allowance;
- overage vs plan upgrade;
- definition of a billable call;
- historical depth/endpoints included;
- caching/storage rights for internal claim files;
- commercial-use rights.

## Continuity rule
This MD is the repository source-of-truth for FlightAware/OAG. Future vendor emails, terms findings, pricing, provider decisions and API-budget changes should be updated here continuously so a new chat or VS Code can resume without reconstruction.
