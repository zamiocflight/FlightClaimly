# FLIGHTCLAIMLY – MASTER HANDOFF

Last updated: 2026-08-28

## PURPOSE

This file is the continuity handoff for ongoing FlightClaimly development.

The next ChatGPT conversation should treat this document as project state, not as a new project brief.

User writes/executes code locally. ChatGPT acts as CTO / architect / CMO and should make concrete technical decisions.

Working style:
- Swedish conversation.
- Fast execution.
- One clear checkpoint at a time.
- Give exact file paths and exact code changes.
- Terminal commands should be in separate copyable code blocks.
- After code changes, normally run:
  `npx tsc --noEmit`
- User uses Mac + VS Code.
- Do not slow the work down unnecessarily.
- Avoid giant multiline shell blocks containing several `npx tsx -e` commands. This crashed/hung the VS Code integrated terminal PTY host twice.
- Short shell blocks and individual commands are fine.
- If repo access through GitHub integration is available, inspect the repo directly rather than unnecessarily asking the user to paste code.
- Very large files can fail through the GitHub connector; targeted local commands are acceptable.

---

# COMPANY

Company:
FLIGHTCLAIMLY OÜ

Registered:
Estonia, 2025-12-13.

Website:
flightclaimly.com

Launch:
2026-07-05.

Founder:
David Victor Hedlund
CEO & Founder.

Business:
EU261 / UK261 flight compensation claims.

Customer pricing:
20% including VAT.

Commercial model:
No win, no fee.

Current languages:
- sv
- en
- da
- de
- nl
- pl
- fi

Long-term goal:
Build a highly automated flight compensation platform with strong organic SEO acquisition and scalable claims handling.

---

# CURRENT DEVELOPMENT SPRINT

We are in a roughly 20–30 hour SEO / data-integrity / programmatic-SEO sprint.

The current sub-sprint is:

SEO INTEGRITY + INDEXATION / PUBLICATION ARCHITECTURE.

This sub-sprint is approximately 65–75% complete.

The broader 20–30 hour sprint is approximately 40–50% complete.

Do NOT jump to unrelated SEO expansion before closing the current integrity/indexation section.

---

# SEO ENTITY STATE

Current audited entity counts:

Airports: 98
Airlines: 96
Countries: 36
Routes: 1,594
Flight numbers: 50

Latest main SEO audit:

SEO DATA AUDIT
==============
Airports:       98
Airlines:       96
Countries:      36
Routes:         1594
Flight numbers: 50

Errors:   0
Warnings: 20
Info:     0

The 20 remaining airline-copy warnings are raw heuristic warnings and have been classified by the smarter airline-copy quality gate as legitimate relationship / lexical references.

Airline copy quality gate:

AIRLINE COPY QUALITY GATE
=========================
Allowed relationship matches: 38
Ignored lexical matches:      5
Unexpected findings:          0

Airline copy quality gate passed.

---

# ROUTE INTEGRITY

Route uniqueness check:

Routes: 1594
Unique route slugs: 1594
Duplicate route slugs: []

PASS.

Flight-number relationship check:

Flight numbers: 50
Missing route relationships: 0

PASS.

All 50 flight-number entities point to valid route entities.

Old URL-reference audit for:

/flight/

returned no results.

PASS.

Canonical flight-number path is:

/{locale}/flight-numbers/{slug}

NOT:

/{locale}/flight/{slug}

---

# IMPORTANT SEO FIXES ALREADY COMPLETED

## Flight-number canonical URL

Changed old:

/flight/

to:

/flight-numbers/

Relevant files included:

- src/app/sitemap.ts
- src/lib/flight-numbers/metadata.ts
- src/app/[locale]/flight-numbers/[slug]/page.tsx

No stale `/flight/` references were found in the latest grep audit.

---

## Sitemap false freshness signals

Removed synthetic:

lastModified: new Date()

from sitemap generation.

We do NOT want Google to be told that thousands of static pages changed every deployment when they did not.

---

## Central hreflang helper

File:

src/lib/seo/alternates.ts

contains centralized language alternate generation.

Current locale source of truth includes:

sv
en
da
de
nl
pl
fi

The helper is:

buildLanguageAlternates(...)

---

# SEO DATA REPAIR ALREADY COMPLETED

## Airports

Initial SEO airport set:
80.

18 airports referenced by flight-number data were missing from the SEO airport layer but existed in the huge master airport registry.

The 18 were:

AAL
AYT
BGO
BOJ
CHQ
ORD
PMO
FLR
GZP
GDN
GOT
IST
LAX
PUY
SVG
TOS
TRD
IAD

They were promoted into SEO airport entities.

Current airports:
98.

Master registry:

src/data/master/airportRegistry.ts

This file is extremely large (~97k lines).

Do not assume GitHub connector returning empty means the file is empty.

---

## Countries

Added missing country entities including:

Iceland
Latvia
Estonia
Lithuania
Luxembourg
Albania
Malta
Slovenia
North Macedonia
Moldova
Türkiye
United States

Current countries:
36.

---

## Airlines

Identity/reference problems were repaired.

LOT references were normalized from:

lot

to existing:

lot-polish-airlines

Active airline entities added:

- SKY express
- Bulgaria Air
- Cyprus Airways
- FLYONE
- KM Malta Airlines

Important airline conclusions:

Air Malta is defunct and should NOT be treated as current.
Current successor is KM Malta Airlines.

Air Albania ceased/suspended operations in December 2025 and should NOT be treated as a current main airline.

Current airlines:
96.

---

# AIRLINE COPY CONTAMINATION INCIDENT

A serious content-quality bug was discovered:

The Ryanair SEO entity accidentally contained SAS overview copy.

That was fixed.

A naive detector produced many false positives because valid airline-group relationships such as Lufthansa references were interpreted as contamination.

A smarter quality gate was therefore created:

scripts/diagnose-airline-copy.ts

Current result:

Allowed relationship matches: 38
Ignored lexical matches: 5
Unexpected findings: 0

Do not mechanically rewrite legitimate airline group/relationship references just to force the primitive main audit warning count to zero.

---

# ROUTE ENGINE

Important files:

src/data/seo/routes.ts
src/lib/seo/routes.ts
src/app/[locale]/routes/[slug]/page.tsx
src/app/sitemap.ts

Route data is generated programmatically.

Current routes:
1,594.

Route data includes:

- origin
- destination
- airlines
- title
- description
- intro
- overview
- passengerRights
- compensationIntro
- compensationAmounts
- compensationRules
- statistics
- timeline
- claimProcess
- commonIssues
- faq

The generated route content is currently ENGLISH.

Examples of generated English content include:

- FAQ questions
- FAQ answers
- statistics descriptions
- timeline copy
- compensation copy
- metadata title/description

This led to the important indexation issue below.

---

# CURRENT INDEXATION ISSUE – THIS IS WHERE WORK STOPPED

The route engine currently has 1,594 route entities.

Before correction, sitemap generated them for ALL seven locales:

1,594 × 7 = 11,158 route URLs.

However, the actual programmatic route copy is English.

This means URLs such as:

/en/routes/...
/sv/routes/...
/da/routes/...
/de/routes/...
/nl/routes/...
/pl/routes/...
/fi/routes/...

could effectively expose the same English route content under seven language prefixes.

This is NOT the desired SEO architecture.

Current architectural decision:

ROUTE PROGRAMMATIC SEO SHOULD BE EN-ONLY FOR INDEXATION FOR NOW.

This does NOT mean FlightClaimly is becoming English-only.

It means:

- Index genuine EN route content now.
- Later enable SV/DA/DE/NL/PL/FI route indexation when genuine localized programmatic route content exists.
- Do not manufacture seven times the index surface using duplicated English content.

Expected current route index surface after EN-only policy:

1,594 route entity pages

rather than:

11,158 duplicated/localized-prefix route pages.

---

# IMPORTANT – IMPLEMENTATION WAS NOT YET COMPLETED

We were in the middle of implementing centralized route locale policy.

Planned addition in:

src/lib/seo/alternates.ts

was:

export const routeSeoLocales = ["en"] as const;

Then in:

src/lib/seo/routes.ts

the existing import:

import { buildLanguageAlternates } from "@/lib/seo/alternates";

should become:

import {
  buildLanguageAlternates,
  routeSeoLocales,
} from "@/lib/seo/alternates";

And route hreflang:

languages: buildLanguageAlternates(
  `routes/${route.slug}`
),

should become:

languages: buildLanguageAlternates(
  `routes/${route.slug}`,
  routeSeoLocales
),

Then in:

src/app/sitemap.ts

ADD this import:

import { routeSeoLocales } from "@/lib/seo/alternates";

Do NOT replace unrelated imports.

Change:

const routeEntries = locales.flatMap((locale) =>
  flightRoutes.map((route) => getRouteSitemapEntry(route, locale, siteUrl))
);

to:

const routeEntries = routeSeoLocales.flatMap((locale) =>
  flightRoutes.map((route) => getRouteSitemapEntry(route, locale, siteUrl))
);

IMPORTANT:

We deliberately STOPPED before changing route `generateStaticParams()`.

Do NOT blindly apply an earlier suggestion that added `locale: "en"` inside the child route's generateStaticParams.

Reason:

[locale] is a parent segment and the parent layout already has its own generateStaticParams.

We want to verify actual Next.js nested static-param behavior before modifying that part.

First correct:

- route SEO locale policy
- route hreflang
- sitemap

Then run:

npx tsc --noEmit

Then verify actual route rendering/indexability behavior before blocking non-EN route rendering.

---

# CURRENT SITEMAP STRUCTURE

Static routes include:

home
routes
delays
cancellations
rights
faq
about
contact
privacy
terms

Static routes are generated for all configured locales.

Flight-number sitemap locales currently:

sv
en

Flight-number pages are intentionally currently SV/EN.

Routes previously used all locales, but this is being changed to EN-only indexation because route copy is English.

Airports / airlines / countries have page engines but were NOT included in the currently inspected sitemap implementation.

That should be reviewed later as part of the programmatic SEO publication strategy.

---

# PAGE ENGINE LOCALES FOUND IN AUDIT

Airports generate static entity params for:

sv
en

Airlines:

sv
en

Countries:

sv
en

Flight numbers:

sv
en

Routes differ structurally:
their child generateStaticParams currently returns only route slugs and inherits locale handling through the parent structure.

Parent:

src/app/[locale]/layout.tsx

has:

dynamicParams = false

and generateStaticParams for all configured locales.

This is why route locale behavior needs explicit verification before changing nested static params.

---

# SITEMAP COUNT CONTEXT

Before EN-only route policy, approximate sitemap surface was:

10 static routes × 7 locales = 70
1,594 routes × 7 locales = 11,158
50 flight numbers × 2 locales = 100

Total:

11,328 URLs

After making route sitemap EN-only:

70
+ 1,594
+ 100

= approximately 1,764 sitemap URLs

before adding any airport/airline/country entity pages to sitemap.

This reduction is intentional index-quality control, not loss of market strategy.

---

# CURRENT GIT STATE – LAST OBSERVED

Last observed:

 M src/data/seo/airlines.ts
 M src/data/seo/airports.ts
 M src/data/seo/countries.ts
 M src/data/seo/routes.ts
 M src/lib/seo/alternates.ts
 M src/lib/seo/metadata.ts
?? scripts/audit-seo-data.ts
?? scripts/create-reijo-claim.ts
?? scripts/diagnose-airline-copy.ts
?? scripts/diagnose-airline-identities.ts
?? scripts/diagnose-airport-registry-gaps.ts
?? scripts/diagnose-seo-gaps.ts
?? scripts/diagnose-seo-identities.ts

Re-check git status before committing.

Do NOT assume this list is still exact.

`scripts/create-reijo-claim.ts` is real-claim/manual tooling and should NOT accidentally be included in an SEO commit merely because it is untracked.

---

# DIAGNOSTIC SCRIPTS

Useful scripts currently include:

scripts/audit-seo-data.ts
scripts/diagnose-airline-copy.ts
scripts/diagnose-airline-identities.ts
scripts/diagnose-airport-registry-gaps.ts
scripts/diagnose-seo-gaps.ts
scripts/diagnose-seo-identities.ts

Decide which diagnostics should remain permanently and be committed.

---

# NEXT EXACT DEVELOPMENT STEPS

1. Finish centralized EN-only route indexation policy.

2. Run:

npx tsc --noEmit

3. Verify actual Next.js route behavior for:
   /en/routes/{slug}
   /sv/routes/{slug}
   and another non-EN locale.

4. Ensure:
   sitemap
   canonical
   hreflang
   static params
   actual renderability/indexability

all express one coherent publication policy.

5. Run final SEO integrity gates.

6. Inspect git diff/status.

7. Make a clean SEO integrity/indexation commit.

8. Only then move on to the next SEO sprint section.

---

# REMEMBERED NON-SEO TODO

There is a remembered i18n backend TODO:

src/app/api/claims/route.ts

Previously its Lang union / allowed language array contained:

sv
en
da
de
pl
fi

but NL may have been missing.

Verify later whether:

nl

has already been added.

Do not derail the current SEO sub-sprint for this unless convenient.

---

# PASSENGER AUTHORITY SYSTEM – IMPORTANT PROJECT CONTEXT

Supabase table:

passenger_authorizations

exists.

Each adult passenger signs their own authority.

Missing co-passenger email does not block claim creation.

Passenger authority PDFs are stored separately, for example:

claims/{claimId}/passenger-authorities/{passenger.id}.pdf

They must NOT overwrite owner authority:

claims/{claimId}/authority.pdf

Production E2E has previously confirmed owner + co-passenger signed PDFs visible in admin.

Authority/legal model:

FlightClaimly receives broad authority from the beginning, potentially including judicial proceedings, external lawyers, appeals and enforcement.

BUT:

The authority is NOT advance acceptance of additional litigation/court/legal costs.

If legal action is recommended:
- explain additional fees/costs
- obtain separate customer approval before proceeding

A local court/counsel may still require a separate procedural POA.

---

# BUSINESS PRIORITY AFTER THIS SEO SUB-SPRINT

Immediately after closing the current SEO integrity/indexation section:

Handle the first real external customer claim:

Reijo Knuutinen
and
Cara-Maria Knuutinen

against TAP Air Portugal.

There is a separate REIJO_TAP_CASE.md handoff containing the case.

Do NOT lose momentum by starting another unrelated SEO section before handling Reijo once the current SEO integrity/indexation sub-sprint is closed.