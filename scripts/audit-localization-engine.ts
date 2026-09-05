import assert from "node:assert/strict";
import { publishableFlightNumbers } from "../src/lib/flight-numbers/catalog";
import {
  buildDanishFlightNumberLocalization, buildLocalizedLanguageAlternates, buildPolishFlightNumberLocalization,
  buildSwedishFlightNumberLocalization, getLocaleDefinition, isLocalizationPublishable, resolveKnowledgeLocalization,
  type KnowledgeLocalization, type LocalizedSeoVariant,
} from "../src/lib/localization";

const canonical = { entityType: "flight-number" as const, entitySlug: "sk1421", metadata: { title: "SK1421 flight compensation | FlightClaimly", description: "Canonical English description." }, content: { intro: "Canonical English intro." } };
const reviewedSwedish: KnowledgeLocalization = { entityType: "flight-number", entitySlug: "sk1421", locale: "sv", source: "human", status: "publishable", metadata: { title: "SK1421 flygersättning | FlightClaimly", description: "Granskad svensk beskrivning." }, content: { intro: "Granskad svensk introduktion." }, quality: { metadataReviewed: true, terminologyReviewed: true, legalMeaningReviewed: true, contentReviewed: true } };
const incompleteDanish: KnowledgeLocalization = { entityType: "flight-number", entitySlug: "sk1421", locale: "da", source: "machine-assisted", status: "publishable", metadata: { title: "SK1421 flykompensation | FlightClaimly", description: "Ikke færdiggransket dansk beskrivelse." }, quality: { metadataReviewed: true, terminologyReviewed: false, legalMeaningReviewed: false, contentReviewed: false } };

const english = resolveKnowledgeLocalization({ canonical, locale: "en" });
assert.equal(english.publicationStatus, "publishable"); assert.equal(english.source, "human");
const missingFinnish = resolveKnowledgeLocalization({ canonical, locale: "fi" });
assert.equal(missingFinnish.source, "canonical-fallback"); assert.equal(missingFinnish.publicationStatus, "review-required"); assert.equal(missingFinnish.metadata.title, canonical.metadata.title);
const swedish = resolveKnowledgeLocalization({ canonical, locale: "sv", localization: reviewedSwedish });
assert.equal(swedish.publicationStatus, "publishable"); assert.equal(swedish.metadata.title, reviewedSwedish.metadata.title); assert.equal(isLocalizationPublishable(reviewedSwedish), true);
const danishIncomplete = resolveKnowledgeLocalization({ canonical, locale: "da", localization: incompleteDanish });
assert.equal(danishIncomplete.publicationStatus, "review-required"); assert.equal(isLocalizationPublishable(incompleteDanish), false);

const variants: LocalizedSeoVariant[] = [
  { locale: "en", path: "flight-numbers/sk1421", resolution: english }, { locale: "sv", path: "flight-numbers/sk1421", resolution: swedish },
  { locale: "da", path: "flight-numbers/sk1421", resolution: danishIncomplete }, { locale: "fi", path: "flight-numbers/sk1421", resolution: missingFinnish },
];
const alternates = buildLocalizedLanguageAlternates(variants);
assert.deepEqual(Object.keys(alternates).sort(), ["en", "sv"]); assert.equal(alternates.sv, "https://www.flightclaimly.com/sv/flight-numbers/sk1421"); assert.equal(alternates.da, undefined); assert.equal(alternates.fi, undefined);

const pilot = publishableFlightNumbers[0]; assert.ok(pilot, "Expected at least one publishable flight number.");
const sv = buildSwedishFlightNumberLocalization(pilot); assert.equal(sv.locale, "sv"); assert.equal(isLocalizationPublishable(sv), true); assert.match(sv.metadata.title, /flygersättning/i);
const da = buildDanishFlightNumberLocalization(pilot); assert.equal(da.locale, "da"); assert.equal(isLocalizationPublishable(da), true); assert.match(da.metadata.title, /flykompensation/i); assert.match(da.metadata.description, /forsinket eller aflyst/i);
const pl = buildPolishFlightNumberLocalization(pilot); assert.equal(pl.locale, "pl"); assert.equal(pl.status, "publishable"); assert.equal(isLocalizationPublishable(pl), true); assert.match(pl.metadata.title, /odszkodowanie/i); assert.match(pl.metadata.description, /opóźniony lub odwołany/i); assert.ok(pl.content?.faq?.length); assert.ok(pl.content?.timeline?.length);
assert.equal(getLocaleDefinition("sv").labels.yes, "Ja"); assert.equal(getLocaleDefinition("da").labels.flightNumbers, "Flynumre"); assert.equal(getLocaleDefinition("pl").labels.yes, "Tak"); assert.equal(getLocaleDefinition("pl").labels.flightNumbers, "Numery lotów");

const euOnly = publishableFlightNumbers.find((f) => f.eu261Eligible && !f.uk261Eligible);
const ukOnly = publishableFlightNumbers.find((f) => !f.eu261Eligible && f.uk261Eligible);
const both = publishableFlightNumbers.find((f) => f.eu261Eligible && f.uk261Eligible);
const neither = publishableFlightNumbers.find((f) => !f.eu261Eligible && !f.uk261Eligible);
assert.ok(euOnly); assert.ok(ukOnly); assert.ok(both); assert.ok(neither);

for (const build of [buildSwedishFlightNumberLocalization, buildDanishFlightNumberLocalization, buildPolishFlightNumberLocalization]) {
  const eu = JSON.stringify({ amounts: build(euOnly).content?.compensationAmounts, statistics: build(euOnly).content?.statistics });
  const uk = JSON.stringify({ amounts: build(ukOnly).content?.compensationAmounts, statistics: build(ukOnly).content?.statistics });
  const dual = JSON.stringify({ amounts: build(both).content?.compensationAmounts, statistics: build(both).content?.statistics });
  const neutral = JSON.stringify({ metadata: build(neither).metadata, passengerRights: build(neither).content?.passengerRights, amounts: build(neither).content?.compensationAmounts, statistics: build(neither).content?.statistics, claimProcess: build(neither).content?.claimProcess, faq: build(neither).content?.faq });
  assert.match(eu, /€600/); assert.doesNotMatch(eu, /£520/); assert.match(uk, /£520/); assert.doesNotMatch(uk, /€600/); assert.match(dual, /€600/); assert.match(dual, /£520/); assert.doesNotMatch(neutral, /€250|€400|€600|£220|£350|£520/);
}
assert.match(JSON.stringify(buildSwedishFlightNumberLocalization(neither)), /tillämpliga regler|vilket regelverk|regelverk som gäller/i);
assert.match(JSON.stringify(buildDanishFlightNumberLocalization(neither)), /relevante regler|hvilke regler|regelsæt/i);
assert.match(JSON.stringify(buildPolishFlightNumberLocalization(neither)), /właściw|przepis|zależy od przypadku|do ustalenia/i);

console.log("Localization Engine architecture audit");
console.log("PASS — canonical fallback isolation, quality gates, publishable-only hreflang, Swedish, Danish and Polish flight-number localization and EU261/UK261 compensation profiles behave as expected.");
