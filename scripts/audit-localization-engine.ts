import assert from "node:assert/strict";

import { publishableFlightNumbers } from "../src/lib/flight-numbers/catalog";
import {
  buildDanishFlightNumberLocalization,
  buildLocalizedLanguageAlternates,
  buildSwedishFlightNumberLocalization,
  getLocaleDefinition,
  isLocalizationPublishable,
  resolveKnowledgeLocalization,
  type KnowledgeLocalization,
  type LocalizedSeoVariant,
} from "../src/lib/localization";

const canonical = {
  entityType: "flight-number" as const,
  entitySlug: "sk1421",
  metadata: { title: "SK1421 flight compensation | FlightClaimly", description: "Canonical English description." },
  content: { intro: "Canonical English intro." },
};

const reviewedSwedish: KnowledgeLocalization = {
  entityType: "flight-number", entitySlug: "sk1421", locale: "sv", source: "human", status: "publishable",
  metadata: { title: "SK1421 flygersättning | FlightClaimly", description: "Granskad svensk beskrivning." },
  content: { intro: "Granskad svensk introduktion." },
  quality: { metadataReviewed: true, terminologyReviewed: true, legalMeaningReviewed: true, contentReviewed: true },
};

const incompleteDanish: KnowledgeLocalization = {
  entityType: "flight-number", entitySlug: "sk1421", locale: "da", source: "machine-assisted", status: "publishable",
  metadata: { title: "SK1421 flykompensation | FlightClaimly", description: "Ikke færdiggransket dansk beskrivelse." },
  quality: { metadataReviewed: true, terminologyReviewed: false, legalMeaningReviewed: false, contentReviewed: false },
};

const english = resolveKnowledgeLocalization({ canonical, locale: "en" });
assert.equal(english.publicationStatus, "publishable");
assert.equal(english.source, "human");
const missingFinnish = resolveKnowledgeLocalization({ canonical, locale: "fi" });
assert.equal(missingFinnish.source, "canonical-fallback");
assert.equal(missingFinnish.publicationStatus, "review-required");
assert.equal(missingFinnish.metadata.title, canonical.metadata.title);
const swedish = resolveKnowledgeLocalization({ canonical, locale: "sv", localization: reviewedSwedish });
assert.equal(swedish.publicationStatus, "publishable");
assert.equal(swedish.metadata.title, reviewedSwedish.metadata.title);
assert.equal(isLocalizationPublishable(reviewedSwedish), true);
const danishIncomplete = resolveKnowledgeLocalization({ canonical, locale: "da", localization: incompleteDanish });
assert.equal(danishIncomplete.publicationStatus, "review-required");
assert.equal(isLocalizationPublishable(incompleteDanish), false);

const variants: LocalizedSeoVariant[] = [
  { locale: "en", path: "flight-numbers/sk1421", resolution: english },
  { locale: "sv", path: "flight-numbers/sk1421", resolution: swedish },
  { locale: "da", path: "flight-numbers/sk1421", resolution: danishIncomplete },
  { locale: "fi", path: "flight-numbers/sk1421", resolution: missingFinnish },
];
const alternates = buildLocalizedLanguageAlternates(variants);
assert.deepEqual(Object.keys(alternates).sort(), ["en", "sv"]);
assert.equal(alternates.sv, "https://www.flightclaimly.com/sv/flight-numbers/sk1421");
assert.equal(alternates.da, undefined);
assert.equal(alternates.fi, undefined);

const pilotFlightNumber = publishableFlightNumbers[0];
assert.ok(pilotFlightNumber, "Expected at least one publishable flight number.");
const swedishPilot = buildSwedishFlightNumberLocalization(pilotFlightNumber);
assert.equal(swedishPilot.locale, "sv");
assert.equal(swedishPilot.status, "publishable");
assert.equal(isLocalizationPublishable(swedishPilot), true);
assert.match(swedishPilot.metadata.title, /flygersättning/i);
assert.ok(swedishPilot.content?.faq?.length);
assert.ok(swedishPilot.content?.timeline?.length);
assert.equal(getLocaleDefinition("sv").labels.yes, "Ja");

const danishPilot = buildDanishFlightNumberLocalization(pilotFlightNumber);
assert.equal(danishPilot.locale, "da");
assert.equal(danishPilot.status, "publishable");
assert.equal(isLocalizationPublishable(danishPilot), true);
assert.match(danishPilot.metadata.title, /flykompensation/i);
assert.match(danishPilot.metadata.description, /forsinket eller aflyst/i);
assert.ok(danishPilot.content?.faq?.length);
assert.ok(danishPilot.content?.timeline?.length);
assert.equal(getLocaleDefinition("da").labels.yes, "Ja");
assert.equal(getLocaleDefinition("da").labels.flightNumbers, "Flynumre");

const euOnly = publishableFlightNumbers.find((flight) => flight.eu261Eligible && !flight.uk261Eligible);
const ukOnly = publishableFlightNumbers.find((flight) => !flight.eu261Eligible && flight.uk261Eligible);
const both = publishableFlightNumbers.find((flight) => flight.eu261Eligible && flight.uk261Eligible);
const neither = publishableFlightNumbers.find((flight) => !flight.eu261Eligible && !flight.uk261Eligible);
assert.ok(euOnly, "Expected at least one EU261-only flight number.");
assert.ok(ukOnly, "Expected at least one UK261-only flight number.");
assert.ok(both, "Expected at least one EU261+UK261 flight number.");
assert.ok(neither, "Expected at least one flight number outside both flags.");

for (const build of [buildSwedishFlightNumberLocalization, buildDanishFlightNumberLocalization]) {
  const eu = JSON.stringify({ amounts: build(euOnly).content?.compensationAmounts, statistics: build(euOnly).content?.statistics });
  const uk = JSON.stringify({ amounts: build(ukOnly).content?.compensationAmounts, statistics: build(ukOnly).content?.statistics });
  const dual = JSON.stringify({ amounts: build(both).content?.compensationAmounts, statistics: build(both).content?.statistics });
  const neutral = JSON.stringify({ metadata: build(neither).metadata, passengerRights: build(neither).content?.passengerRights, amounts: build(neither).content?.compensationAmounts, statistics: build(neither).content?.statistics, claimProcess: build(neither).content?.claimProcess, faq: build(neither).content?.faq });
  assert.match(eu, /€600/);
  assert.doesNotMatch(eu, /£520/);
  assert.match(uk, /£520/);
  assert.doesNotMatch(uk, /€600/);
  assert.match(dual, /€600/);
  assert.match(dual, /£520/);
  assert.doesNotMatch(neutral, /€250|€400|€600|£220|£350|£520/);
}

assert.match(JSON.stringify(buildSwedishFlightNumberLocalization(neither)), /tillämpliga regler|vilket regelverk|regelverk som gäller/i);
assert.match(JSON.stringify(buildDanishFlightNumberLocalization(neither)), /relevante regler|hvilke regler|regelsæt/i);

console.log("Localization Engine architecture audit");
console.log("PASS — canonical fallback isolation, quality gates, publishable-only hreflang, Swedish and Danish flight-number localization and EU261/UK261 compensation profiles behave as expected.");
