import assert from "node:assert/strict";

import { publishableFlightNumbers } from "../src/lib/flight-numbers/catalog";
import {
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
  metadata: {
    title: "SK1421 flight compensation | FlightClaimly",
    description: "Canonical English description.",
  },
  content: {
    intro: "Canonical English intro.",
  },
};

const reviewedSwedish: KnowledgeLocalization = {
  entityType: "flight-number",
  entitySlug: "sk1421",
  locale: "sv",
  source: "human",
  status: "publishable",
  metadata: {
    title: "SK1421 flygersättning | FlightClaimly",
    description: "Granskad svensk beskrivning.",
  },
  content: {
    intro: "Granskad svensk introduktion.",
  },
  quality: {
    metadataReviewed: true,
    terminologyReviewed: true,
    legalMeaningReviewed: true,
    contentReviewed: true,
  },
};

const incompleteDanish: KnowledgeLocalization = {
  entityType: "flight-number",
  entitySlug: "sk1421",
  locale: "da",
  source: "machine-assisted",
  status: "publishable",
  metadata: {
    title: "SK1421 flykompensation | FlightClaimly",
    description: "Ikke færdiggransket dansk beskrivelse.",
  },
  quality: {
    metadataReviewed: true,
    terminologyReviewed: false,
    legalMeaningReviewed: false,
    contentReviewed: false,
  },
};

const english = resolveKnowledgeLocalization({ canonical, locale: "en" });
assert.equal(english.publicationStatus, "publishable");
assert.equal(english.source, "human");

const missingFinnish = resolveKnowledgeLocalization({
  canonical,
  locale: "fi",
});
assert.equal(missingFinnish.source, "canonical-fallback");
assert.equal(missingFinnish.publicationStatus, "review-required");
assert.equal(missingFinnish.metadata.title, canonical.metadata.title);

const swedish = resolveKnowledgeLocalization({
  canonical,
  locale: "sv",
  localization: reviewedSwedish,
});
assert.equal(swedish.publicationStatus, "publishable");
assert.equal(swedish.metadata.title, reviewedSwedish.metadata.title);
assert.equal(isLocalizationPublishable(reviewedSwedish), true);

const danish = resolveKnowledgeLocalization({
  canonical,
  locale: "da",
  localization: incompleteDanish,
});
assert.equal(danish.publicationStatus, "review-required");
assert.equal(isLocalizationPublishable(incompleteDanish), false);

const variants: LocalizedSeoVariant[] = [
  {
    locale: "en",
    path: "flight-numbers/sk1421",
    resolution: english,
  },
  {
    locale: "sv",
    path: "flight-numbers/sk1421",
    resolution: swedish,
  },
  {
    locale: "da",
    path: "flight-numbers/sk1421",
    resolution: danish,
  },
  {
    locale: "fi",
    path: "flight-numbers/sk1421",
    resolution: missingFinnish,
  },
];

const alternates = buildLocalizedLanguageAlternates(variants);
assert.deepEqual(Object.keys(alternates).sort(), ["en", "sv"]);
assert.equal(
  alternates.sv,
  "https://www.flightclaimly.com/sv/flight-numbers/sk1421",
);
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
assert.equal(getLocaleDefinition("da").labels.yes, "Yes");

console.log("Localization Engine architecture audit");
console.log(
  "PASS — canonical fallback isolation, quality gates, publishable-only hreflang and the Swedish flight-number localization builder behave as expected.",
);
