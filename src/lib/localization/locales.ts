import type { LocaleDefinition, SeoLocale } from "./types";

const englishLabels = {
  home: "Home", flightNumbers: "Flight numbers", flightNumber: "Flight number", airline: "Airline", icaoAirlineCode: "ICAO airline code",
  originAirport: "Origin airport", destinationAirport: "Destination airport", distanceCategory: "Distance category", eu261Protection: "EU261 protection",
  uk261Protection: "UK261 protection", aircraft: "Aircraft", scheduleSnapshot: "Schedule snapshot", yes: "Yes", no: "No",
  heroEyebrow: "EU261 / UK261 · No win, no fee", heroTitle: "{name} flight compensation", heroCta: "Check your {name} flight", quickFactsTitle: "Quick facts",
  majorAirlinesFor: "Major airlines for {name}", about: "About {name}", compensationAmountsTitle: "How much compensation can you receive?",
  passengerRightsTitle: "Passenger rights under EU261", officialSources: "Official sources", compensationRulesTitle: "When are you entitled to compensation?",
  compensationStatistics: "{name} compensation statistics", claimTimelineTitle: "What happens after you submit your claim?", claimProcessTitle: "How the claim process works",
  commonIssuesTitle: "Common {name} disruption types", faqTitle: "Frequently asked questions", flightAirlineLinksTitle: "Flight airline", flightRouteLinksTitle: "Flight route",
  airportsLinksTitle: "Airports", countriesLinksTitle: "Countries",
} as const;
const swedishLabels = {
  home: "Hem", flightNumbers: "Flygnummer", flightNumber: "Flygnummer", airline: "Flygbolag", icaoAirlineCode: "ICAO-kod för flygbolaget",
  originAirport: "Avgångsflygplats", destinationAirport: "Destinationsflygplats", distanceCategory: "Distanskategori", eu261Protection: "Skydd enligt EU261",
  uk261Protection: "Skydd enligt UK261", aircraft: "Flygplanstyp", scheduleSnapshot: "Tidtabellsuppgift", yes: "Ja", no: "Nej",
  heroEyebrow: "EU261 / UK261 · Ingen ersättning, ingen avgift", heroTitle: "Ersättning för {name}", heroCta: "Kontrollera ditt {name}-flyg", quickFactsTitle: "Snabbfakta",
  majorAirlinesFor: "Större flygbolag för {name}", about: "Om {name}", compensationAmountsTitle: "Hur mycket ersättning kan du få?", passengerRightsTitle: "Passagerarrättigheter enligt EU261",
  officialSources: "Officiella källor", compensationRulesTitle: "När kan du ha rätt till ersättning?", compensationStatistics: "Ersättningsfakta för {name}", claimTimelineTitle: "Vad händer efter att du skickat in ditt krav?",
  claimProcessTitle: "Så fungerar ersättningsprocessen", commonIssuesTitle: "Vanliga störningar för {name}", faqTitle: "Vanliga frågor", flightAirlineLinksTitle: "Flygbolag för flygningen",
  flightRouteLinksTitle: "Flygsträcka", airportsLinksTitle: "Flygplatser", countriesLinksTitle: "Länder",
} as const;
const danishLabels = {
  home: "Forside", flightNumbers: "Flynumre", flightNumber: "Flynummer", airline: "Flyselskab", icaoAirlineCode: "Flyselskabets ICAO-kode",
  originAirport: "Afgangslufthavn", destinationAirport: "Destinationslufthavn", distanceCategory: "Distancekategori", eu261Protection: "Beskyttelse efter EU261",
  uk261Protection: "Beskyttelse efter UK261", aircraft: "Flytype", scheduleSnapshot: "Køreplansoplysning", yes: "Ja", no: "Nej",
  heroEyebrow: "EU261 / UK261 · Ingen kompensation, intet gebyr", heroTitle: "Kompensation for {name}", heroCta: "Tjek dit {name}-fly", quickFactsTitle: "Hurtige fakta",
  majorAirlinesFor: "Større flyselskaber for {name}", about: "Om {name}", compensationAmountsTitle: "Hvor meget kan du få i kompensation?", passengerRightsTitle: "Flypassagerers rettigheder efter EU261",
  officialSources: "Officielle kilder", compensationRulesTitle: "Hvornår kan du have ret til kompensation?", compensationStatistics: "Kompensationsfakta for {name}", claimTimelineTitle: "Hvad sker der, efter du har indsendt dit krav?",
  claimProcessTitle: "Sådan fungerer processen", commonIssuesTitle: "Almindelige flyforstyrrelser for {name}", faqTitle: "Ofte stillede spørgsmål", flightAirlineLinksTitle: "Flyselskab for flyvningen",
  flightRouteLinksTitle: "Flyrute", airportsLinksTitle: "Lufthavne", countriesLinksTitle: "Lande",
} as const;
const polishLabels = {
  home: "Strona główna", flightNumbers: "Numery lotów", flightNumber: "Numer lotu", airline: "Linia lotnicza", icaoAirlineCode: "Kod ICAO linii lotniczej",
  originAirport: "Lotnisko wylotu", destinationAirport: "Lotnisko docelowe", distanceCategory: "Kategoria odległości", eu261Protection: "Ochrona na podstawie EU261",
  uk261Protection: "Ochrona na podstawie UK261", aircraft: "Typ samolotu", scheduleSnapshot: "Informacja z rozkładu lotów", yes: "Tak", no: "Nie",
  heroEyebrow: "EU261 / UK261 · Brak wygranej, brak opłaty", heroTitle: "Odszkodowanie za lot {name}", heroCta: "Sprawdź lot {name}", quickFactsTitle: "Najważniejsze informacje",
  majorAirlinesFor: "Główne linie lotnicze dla {name}", about: "Informacje o {name}", compensationAmountsTitle: "Ile odszkodowania możesz otrzymać?", passengerRightsTitle: "Prawa pasażerów zgodnie z EU261",
  officialSources: "Oficjalne źródła", compensationRulesTitle: "Kiedy przysługuje odszkodowanie?", compensationStatistics: "Informacje o odszkodowaniu dla {name}", claimTimelineTitle: "Co dzieje się po zgłoszeniu roszczenia?",
  claimProcessTitle: "Jak przebiega proces dochodzenia roszczenia", commonIssuesTitle: "Najczęstsze zakłócenia lotu {name}", faqTitle: "Najczęściej zadawane pytania", flightAirlineLinksTitle: "Linia lotnicza",
  flightRouteLinksTitle: "Trasa lotu", airportsLinksTitle: "Lotniska", countriesLinksTitle: "Kraje",
} as const;
const germanLabels = {
  home: "Startseite", flightNumbers: "Flugnummern", flightNumber: "Flugnummer", airline: "Fluggesellschaft", icaoAirlineCode: "ICAO-Code der Fluggesellschaft",
  originAirport: "Abflughafen", destinationAirport: "Zielflughafen", distanceCategory: "Entfernungskategorie", eu261Protection: "Schutz nach EU261",
  uk261Protection: "Schutz nach UK261", aircraft: "Flugzeugtyp", scheduleSnapshot: "Flugplanangabe", yes: "Ja", no: "Nein",
  heroEyebrow: "EU261 / UK261 · Keine Entschädigung, keine Gebühr", heroTitle: "Entschädigung für Flug {name}", heroCta: "Flug {name} prüfen", quickFactsTitle: "Kurzüberblick",
  majorAirlinesFor: "Wichtige Fluggesellschaften für {name}", about: "Über {name}", compensationAmountsTitle: "Wie hoch kann Ihre Entschädigung sein?", passengerRightsTitle: "Fluggastrechte nach EU261",
  officialSources: "Offizielle Quellen", compensationRulesTitle: "Wann besteht Anspruch auf Entschädigung?", compensationStatistics: "Entschädigungsinformationen für {name}", claimTimelineTitle: "Was passiert nach Einreichung Ihres Anspruchs?",
  claimProcessTitle: "So funktioniert das Anspruchsverfahren", commonIssuesTitle: "Häufige Flugstörungen bei {name}", faqTitle: "Häufig gestellte Fragen", flightAirlineLinksTitle: "Fluggesellschaft",
  flightRouteLinksTitle: "Flugstrecke", airportsLinksTitle: "Flughäfen", countriesLinksTitle: "Länder",
} as const;

/** Locale registry. Routing support does not imply publishable localized SEO content. */
export const localeDefinitions: Record<SeoLocale, LocaleDefinition> = {
  en: { locale: "en", languageName: "English", htmlLang: "en", marketLabel: "English", labels: englishLabels },
  sv: { locale: "sv", languageName: "Swedish", htmlLang: "sv", marketLabel: "Sweden", labels: swedishLabels },
  da: { locale: "da", languageName: "Danish", htmlLang: "da", marketLabel: "Denmark", labels: danishLabels },
  fi: { locale: "fi", languageName: "Finnish", htmlLang: "fi", marketLabel: "Finland", labels: englishLabels },
  de: { locale: "de", languageName: "German", htmlLang: "de", marketLabel: "Germany", labels: germanLabels },
  pl: { locale: "pl", languageName: "Polish", htmlLang: "pl", marketLabel: "Poland", labels: polishLabels },
  nl: { locale: "nl", languageName: "Dutch", htmlLang: "nl", marketLabel: "Netherlands", labels: englishLabels },
};
export function getLocaleDefinition(locale: SeoLocale): LocaleDefinition { return localeDefinitions[locale]; }
export function interpolateLabel(template: string, values: Record<string, string>): string { return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, value), template); }
