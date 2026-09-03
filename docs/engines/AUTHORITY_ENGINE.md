# Authority Engine

**Status:** Production legal source-of-authority layer.

## Purpose

Own verified legal and official source objects used across FlightClaimly. It answers **what authoritative source supports this legal proposition?**

This engine stores the sources and references; it does not decide claim entitlement by itself.

## Core implementation

- `src/data/authority/registry.ts` — AuthoritySource registry.
- `src/data/authority/legalReferences.ts` — structured legal references/doctrine anchors.
- `src/data/authority/relationships.ts` — explicit entity-authority relationships.
- `src/data/authority/rules.ts` — earlier authority/business-rule foundation.
- `src/data/authority/shared/types.ts` — shared authority types.
- `src/lib/authority/registry.ts` — source retrieval helpers.
- `src/lib/authority/resolver.ts` — entity authority resolution.

## Source types

The shared model supports regulation, official guidance, court rulings, public authorities, airline policy and statistics. Legal references point back to a known AuthoritySource.

## Current EU261 v1 authority set

The current legal layer contains EU261, current European Commission interpretative guidance and verified CJEU rulings used by Passenger Rights v1. At the locked Passenger Rights checkpoint the graph contained **7 authority sources** and **18 legal references**.

## Processing model

```text
Official source (EUR-Lex / CURIA / authority)
  → AuthoritySource
  → LegalReference
  → Passenger Rights LegalRule
  → resolver / assessment
  → Claims / AI / public explanation
```

For entity pages the authority resolver can also resolve explicit relationships and route-derived authority context.

## Consumers

- Passenger Rights Engine
- Route/Airline/Airport/Country/Delay Reason/Flight Number knowledge surfaces
- future Claim Rights Assessment Engine
- future demand-letter / Claims Desk / AI citation generation

## Boundaries

- Never create a second legal-source registry elsewhere.
- Editorial explanation is not legal authority.
- A source reference is not itself a conclusion that a claim wins.
- New substantive case-law doctrine must be verified from official sources before encoding.

## Extension rule

When adding a legal proposition:

1. verify official source;
2. add/reuse AuthoritySource;
3. add a precise LegalReference;
4. reference that ID from the relevant Passenger Rights rule;
5. run the passenger-rights integrity audit.
