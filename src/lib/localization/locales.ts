import type { LocaleDefinition, SeoLocale } from "./types";

const englishLabels = {
  home: "Home",
  flightNumbers: "Flight numbers",
  flightNumber: "Flight number",
  airline: "Airline",
  icaoAirlineCode: "ICAO airline code",
  originAirport: "Origin airport",
  destinationAirport: "Destination airport",
  distanceCategory: "Distance category",
  eu261Protection: "EU261 protection",
  uk261Protection: "UK261 protection",
  aircraft: "Aircraft",
  scheduleSnapshot: "Schedule snapshot",
  yes: "Yes",
  no: "No",
  heroEyebrow: "EU261 / UK261 · No win, no fee",
  heroTitle: "{name} flight compensation",
  heroCta: "Check your {name} flight",
  majorAirlinesFor: "Major airlines for {name}",
  about: "About {name}",
  compensationAmountsTitle: "How much compensation can you receive?",
  passengerRightsTitle: "Passenger rights under EU261",
  officialSources: "Official sources",
  compensationRulesTitle: "When are you entitled to compensation?",
  compensationStatistics: "{name} compensation statistics",
  claimTimelineTitle: "What happens after you submit your claim?",
  claimProcessTitle: "How the claim process works",
  commonIssuesTitle: "Common {name} disruption types",
  faqTitle: "Frequently asked questions",
} as const;

const swedishLabels = {
  home: "Hem",
  flightNumbers: "Flygnummer",
  flightNumber: "Flygnummer",
  airline: "Flygbolag",
  icaoAirlineCode: "ICAO-kod för flygbolaget",
  originAirport: "Avgångsflygplats",
  destinationAirport: "Destinationsflygplats",
  distanceCategory: "Distanskategori",
  eu261Protection: "Skydd enligt EU261",
  uk261Protection: "Skydd enligt UK261",
  aircraft: "Flygplanstyp",
  scheduleSnapshot: "Tidtabellsuppgift",
  yes: "Ja",
  no: "Nej",
  heroEyebrow: "EU261 / UK261 · Ingen ersättning, ingen avgift",
  heroTitle: "Ersättning för {name}",
  heroCta: "Kontrollera ditt {name}-flyg",
  majorAirlinesFor: "Större flygbolag för {name}",
  about: "Om {name}",
  compensationAmountsTitle: "Hur mycket ersättning kan du få?",
  passengerRightsTitle: "Passagerarrättigheter enligt EU261",
  officialSources: "Officiella källor",
  compensationRulesTitle: "När kan du ha rätt till ersättning?",
  compensationStatistics: "Ersättningsfakta för {name}",
  claimTimelineTitle: "Vad händer efter att du skickat in ditt krav?",
  claimProcessTitle: "Så fungerar ersättningsprocessen",
  commonIssuesTitle: "Vanliga störningar för {name}",
  faqTitle: "Vanliga frågor",
} as const;

/**
 * Locale registry for the Localization Engine.
 *
 * IMPORTANT: A locale being known by application routing does not mean its
 * programmatic Knowledge pages are publishable. Publication is controlled
 * separately by the SEO locale rollout policy.
 *
 * Locales without reviewed terminology deliberately keep English labels as
 * canonical fallbacks. Those fallbacks must never be treated as localized,
 * indexable SEO content.
 */
export const localeDefinitions: Record<SeoLocale, LocaleDefinition> = {
  en: {
    locale: "en",
    languageName: "English",
    htmlLang: "en",
    marketLabel: "English",
    labels: englishLabels,
  },
  sv: {
    locale: "sv",
    languageName: "Swedish",
    htmlLang: "sv",
    marketLabel: "Sweden",
    labels: swedishLabels,
  },
  da: {
    locale: "da",
    languageName: "Danish",
    htmlLang: "da",
    marketLabel: "Denmark",
    labels: englishLabels,
  },
  fi: {
    locale: "fi",
    languageName: "Finnish",
    htmlLang: "fi",
    marketLabel: "Finland",
    labels: englishLabels,
  },
  de: {
    locale: "de",
    languageName: "German",
    htmlLang: "de",
    marketLabel: "Germany",
    labels: englishLabels,
  },
  pl: {
    locale: "pl",
    languageName: "Polish",
    htmlLang: "pl",
    marketLabel: "Poland",
    labels: englishLabels,
  },
  nl: {
    locale: "nl",
    languageName: "Dutch",
    htmlLang: "nl",
    marketLabel: "Netherlands",
    labels: englishLabels,
  },
};

export function getLocaleDefinition(locale: SeoLocale): LocaleDefinition {
  return localeDefinitions[locale];
}

export function interpolateLabel(
  template: string,
  values: Record<string, string>,
): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template,
  );
}
