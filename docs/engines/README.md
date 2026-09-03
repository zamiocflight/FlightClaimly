# FlightClaimly Engine Documentation

**Purpose:** Developer-facing source-of-truth index for FlightClaimly's reusable engines.

This directory documents how each engine works internally, what it owns, what it consumes, what it produces, and which platform components are allowed to depend on it.

## Documentation hierarchy

- `docs/SYSTEM_PROCESS_MAP.md` — complete platform/process map.
- `docs/FLIGHTCLAIMLY_KNOWLEDGE_ENGINE.md` — overall Knowledge Engine architecture and philosophy.
- `docs/FLIGHTCLAIMLY_KNOWLEDGE_MODEL.md` — common entity/relationship/template model.
- `docs/engines/*.md` — detailed contract for each individual engine.
- `docs/CURRENT_SPRINT_LATEST.md` — current build/recovery state, not permanent engine documentation.
- `docs/checkpoints/*` — historical verification/lock checkpoints.

## Engines

| Engine | Document | Current role |
|---|---|---|
| Airline Engine | `AIRLINE_ENGINE.md` | Structured airline knowledge and public airline pages |
| Airport Engine | `AIRPORT_ENGINE.md` | Canonical airport identity + airport knowledge/publication |
| Country Engine | `COUNTRY_ENGINE.md` | Country knowledge and geography/legal relationship context |
| Route Engine | `ROUTE_ENGINE.md` | Airport-pair route entities and route knowledge |
| Flight Number Engine | `FLIGHT_NUMBER_ENGINE.md` | Validated flight-number identity, route association and publication |
| Delay Reason Engine | `DELAY_REASON_ENGINE.md` | Disruption taxonomy and structured claim-assessment profiles |
| Authority Engine | `AUTHORITY_ENGINE.md` | Verified regulations, guidance, court rulings and legal references |
| Passenger Rights Engine | `PASSENGER_RIGHTS_ENGINE.md` | Executable legal rules, rights and legal-rule resolver |
| Claim Rights Assessment Engine | `CLAIM_RIGHTS_ASSESSMENT_ENGINE.md` | Next integration layer combining claim facts with legal reasoning |

## Engine contract standard

Every engine document should answer the same questions:

1. **Purpose and ownership** — what domain truth the engine owns.
2. **Inputs** — upstream data and facts it may consume.
3. **Outputs** — stable domain objects/results it exposes.
4. **Core files** — implementation locations developers must inspect first.
5. **Processing/resolution flow** — how input becomes output.
6. **Consumers** — pages, APIs, claims systems, SEO, AI or other engines.
7. **Boundaries** — responsibilities explicitly outside the engine.
8. **Integrity/verification** — audits, typecheck/build requirements and lock state.
9. **Extension rules** — how to add data or behavior safely.

## Architectural rules

- Data and domain logic belong in engines; page components should render/orchestrate rather than recreate business rules.
- One fact should have one authoritative home.
- Engines may reference each other through stable IDs/resolvers; do not copy upstream facts into downstream registries merely for convenience.
- Legal source data belongs in Authority Engine. Legal interpretation/rules belong in Passenger Rights Engine. Claim-specific conclusions belong in Claim Rights Assessment Engine.
- Missing claim/legal facts must remain unresolved rather than silently becoming false.
- Transactional customer data never becomes public Knowledge Engine data directly.
- Engine docs are living technical documentation and should be updated after meaningful architecture or contract changes, not every small code edit.
