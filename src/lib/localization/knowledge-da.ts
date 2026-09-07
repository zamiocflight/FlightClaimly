import type { Airline } from "@/data/seo/airlines";
import type { Airport } from "@/data/seo/airports";
import type { Country } from "@/data/seo/countries";
import type { FlightRoute } from "@/data/seo/routes";
import type { KnowledgeLocalization, LocalizableKnowledgeEntityType } from "./types";

const cityNames: Record<string, string> = {
  Athens: "Athen", Belgrade: "Beograd", Brussels: "Bruxelles", Bucharest: "Bukarest",
  Cairo: "Kairo", Cologne: "Köln", Copenhagen: "København", Florence: "Firenze",
  Lisbon: "Lissabon", Milan: "Milano", Munich: "München", Naples: "Napoli",
  Prague: "Prag", Rome: "Rom", Seville: "Sevilla", Venice: "Venedig",
  Vienna: "Wien", Warsaw: "Warszawa", Zurich: "Zürich",
};

const countryNames: Record<string, string> = {
  Austria: "Østrig", Belgium: "Belgien", Croatia: "Kroatien", Cyprus: "Cypern",
  Czechia: "Tjekkiet", Denmark: "Danmark", Estonia: "Estland", Finland: "Finland",
  France: "Frankrig", Germany: "Tyskland", Greece: "Grækenland", Hungary: "Ungarn",
  Iceland: "Island", Ireland: "Irland", Italy: "Italien", Latvia: "Letland",
  Lithuania: "Litauen", Luxembourg: "Luxembourg", Malta: "Malta", Netherlands: "Nederlandene",
  Norway: "Norge", Poland: "Polen", Portugal: "Portugal", Romania: "Rumænien",
  Slovakia: "Slovakiet", Slovenia: "Slovenien", Spain: "Spanien", Sweden: "Sverige",
  Switzerland: "Schweiz", "United Kingdom": "Storbritannien",
};

export function danishCityName(value: string) { return cityNames[value] ?? value; }
export function danishCountryName(value: string) { return countryNames[value] ?? value; }

const amounts = [
  { label: "Op til 1.500 km", distance: "Kortdistanceflyvning", amount: "€250" },
  { label: "1.500–3.500 km", distance: "Mellemdistanceflyvning", amount: "€400" },
  { label: "Over 3.500 km", distance: "Langdistanceflyvning", amount: "op til €600" },
];

const statistics = [
  { label: "Højeste kompensation", value: "€600", description: "Højeste almindelige niveau pr. passager efter EU261." },
  { label: "Forsinkelsestærskel", value: "3 t+", description: "Kompensation ved forsinkelse kræver normalt mindst tre timers forsinkelse ved den endelige destination." },
  { label: "Vurdering", value: "Individuel", description: "Retten til kompensation afhænger blandt andet af flyvningen, forstyrrelsen og årsagen til den." },
];

const timeline = [
  { title: "Indsend dit krav", description: "Kontrollér flyvningen, udfyld passageroplysningerne og upload de nødvendige dokumenter." },
  { title: "FlightClaimly vurderer sagen", description: "Vi gennemgår oplysningerne og forbereder kravet, før vi kontakter flyselskabet." },
  { title: "Flyselskabet svarer", description: "Flyselskabet kan godkende, afvise eller bede om yderligere oplysninger." },
  { title: "Du modtager din udbetaling", description: "Hvis kravet lykkes, hjælper FlightClaimly med at afslutte udbetalingen." },
];

const claimProcess = [
  "Kontrollér flyoplysningerne og fortæl, hvad der skete.",
  "Vi vurderer, hvilket regelsæt om flypassagerers rettigheder der kan gælde.",
  "Udfyld passageroplysninger og bookingreference.",
  "Underskriv fuldmagten, så FlightClaimly kan håndtere kravet.",
  "Upload relevante bilag.",
  "FlightClaimly indsender kravet og følger op over for flyselskabet.",
];

const commonIssues = [
  "Flyet er forsinket mere end tre timer", "Aflyst fly", "Mistet forbindelse",
  "Nægtet boarding", "Tekniske eller operationelle problemer",
];

function base(
  entityType: LocalizableKnowledgeEntityType,
  slug: string,
  title: string,
  description: string,
  content: KnowledgeLocalization["content"],
  displayName?: string,
): KnowledgeLocalization {
  return {
    entityType, entitySlug: slug, displayName, locale: "da", source: "human", status: "publishable",
    metadata: { title, description }, content,
    quality: { metadataReviewed: true, terminologyReviewed: true, legalMeaningReviewed: true, contentReviewed: true },
    updatedAt: "2026-09-07",
  };
}

export function buildDanishRouteLocalization(route: FlightRoute): KnowledgeLocalization {
  const origin = danishCityName(route.origin.city);
  const destination = danishCityName(route.destination.city);
  const name = `${origin}–${destination}`;
  return base("route", route.slug, `${origin} til ${destination} flykompensation | FlightClaimly`, `Kontrollér om du kan få kompensation for et forsinket eller aflyst fly fra ${origin} til ${destination}.`, {
    intro: `Flyver du fra ${origin} til ${destination}? Ved en lang forsinkelse, aflysning eller anden kvalificerende forstyrrelse kan du have ret til kompensation.`,
    overview: `På ruten ${name} kan passagerrettigheder efter EU261 eller andre relevante regler være aktuelle afhængigt af afgang, destination, opererende flyselskab og omstændighederne omkring forstyrrelsen.`,
    passengerRights: "Ved mindst tre timers forsinkelse ved den endelige destination kan kompensation være mulig, hvis de øvrige betingelser er opfyldt. Aflyste fly, mistede forbindelser og nægtet boarding kan også være omfattet.",
    compensationIntro: "Kompensationsniveauet afhænger blandt andet af flyvningens distance og hvilket regelsæt der gælder.", compensationAmounts: amounts,
    compensationRules: `Retten til kompensation på ${name} afhænger af den konkrete rejse og årsagen til forstyrrelsen. Ekstraordinære omstændigheder kan betyde, at standardkompensation ikke skal betales, men flyselskabets øvrige forpligtelser skal vurderes særskilt.`,
    statisticsIntro: `Fakta nedenfor opsummerer almindelige udgangspunkter ved vurdering af kompensation for ${name}.`, statistics,
    timelineIntro: `Når du har indsendt din sag om ${name}, hjælper FlightClaimly dig gennem processen.`, timeline, claimProcess, commonIssues,
    faq: [
      { question: `Kan jeg få kompensation for et forsinket fly fra ${origin} til ${destination}?`, answer: "Ja, det kan være muligt. Ved forsinkelse vurderes blandt andet ankomstforsinkelsen ved den endelige destination, hvilket regelsæt der gælder, og årsagen til forstyrrelsen." },
      { question: "Hvor meget kan jeg få i kompensation?", answer: "Efter EU261 er standardniveauerne normalt €250, €400 eller €600 afhængigt af blandt andet flyvningens distance og de juridiske betingelser." },
      { question: "Koster det noget at kontrollere mit fly?", answer: "Nej. Du kan kontrollere dit fly og starte vurderingen uden forudbetaling." },
    ],
  }, `${origin} til ${destination}`);
}

export function buildDanishAirportLocalization(airport: Airport): KnowledgeLocalization {
  const city = danishCityName(airport.city);
  return base("airport", airport.slug, `${airport.name} (${airport.iata}) flykompensation | FlightClaimly`, `Kontrollér dine rettigheder ved forsinkelse eller aflysning fra eller til ${airport.name} (${airport.iata}).`, {
    intro: `Hvis dit fly fra eller til ${airport.name} blev forsinket eller aflyst, kan du have ret til kompensation.`,
    overview: `${airport.name} (${airport.iata}) betjener ${city}. Hvilke passagerrettigheder der gælder, afhænger af den konkrete flyvning, det opererende flyselskab og årsagen til forstyrrelsen.`,
    passengerRights: "EU261 kan give ret til standardkompensation ved blandt andet lange forsinkelser, visse aflysninger og nægtet boarding, når reglernes betingelser er opfyldt.",
    compensationIntro: "Kompensationsniveauet efter EU261 afhænger blandt andet af flyvningens distance.", compensationAmounts: amounts,
    compensationRules: "En forsinkelse på mindst tre timer ved den endelige destination kan give ret til kompensation, hvis de øvrige betingelser er opfyldt, og flyselskabet ikke kan påberåbe sig en relevant ekstraordinær omstændighed.",
    statisticsIntro: `Almindelige udgangspunkter for kompensationskrav, der vedrører ${airport.name}.`, statistics,
    timelineIntro: "FlightClaimly gennemgår flyvningen og bilagene, før et kvalificeret krav føres videre.", timeline, claimProcess, commonIssues,
    faq: [
      { question: `Kan jeg få kompensation efter en forsinkelse i ${airport.name}?`, answer: "Det kan være muligt. Vi vurderer blandt andet ankomstforsinkelsen, ruten, det opererende flyselskab og årsagen til forstyrrelsen." },
      { question: "Gælder EU261 for alle fly fra lufthavnen?", answer: "Nej. Det afhænger af den konkrete flyvning og blandt andet hvor rejsen starter, samt hvilket flyselskab der opererer den." },
      { question: "Hvordan kontrollerer jeg mit fly?", answer: "Indtast flyoplysningerne hos FlightClaimly, så sagen kan vurderes ud fra den faktiske rejse." },
    ],
  });
}

export function buildDanishAirlineLocalization(airline: Airline): KnowledgeLocalization {
  return base("airline", airline.slug, `${airline.name} flykompensation | FlightClaimly`, `Kontrollér om du kan få kompensation for et forsinket eller aflyst fly med ${airline.name}.`, {
    intro: `Hvis dit ${airline.name}-fly blev forsinket, aflyst eller førte til en mistet forbindelse, kan du have ret til kompensation.`,
    overview: `${airline.name} er et flyselskab med IATA-koden ${airline.iata}. Retten til kompensation vurderes ud fra den konkrete flyvning og forstyrrelse, ikke kun flyselskabets navn.`,
    passengerRights: "EU261 kan give passagerer ret til standardkompensation ved blandt andet mindst tre timers forsinkelse ved den endelige destination, visse aflysninger og nægtet boarding.",
    compensationIntro: "Når EU261 gælder, er standardkompensationen normalt €250, €400 eller €600 afhængigt af blandt andet distancen.", compensationAmounts: amounts,
    compensationRules: `For et krav mod ${airline.name} skal blandt andet flyvningen, ankomstforsinkelsen og årsagen til forstyrrelsen vurderes. Ekstraordinære omstændigheder kan påvirke retten til standardkompensation.`,
    statisticsIntro: `Almindelige udgangspunkter ved kompensationskrav mod ${airline.name}.`, statistics,
    timelineIntro: `Når din ${airline.name}-sag er indsendt, gennemgår FlightClaimly bilagene og fører et kvalificeret krav videre.`, timeline, claimProcess, commonIssues,
    faq: [
      { question: `Kan jeg få kompensation fra ${airline.name} ved en forsinkelse?`, answer: "Ja, hvis den konkrete flyvning er omfattet af reglerne, og de øvrige betingelser er opfyldt." },
      { question: `Hvor meget kan ${airline.name} skulle betale?`, answer: "Når EU261 gælder, er standardniveauerne normalt €250, €400 eller €600 pr. passager afhængigt af blandt andet distancen." },
      { question: "Hvad hvis flyselskabet henviser til ekstraordinære omstændigheder?", answer: "Årsagen og flyselskabets handlinger skal vurderes konkret. En sådan indsigelse betyder ikke automatisk, at alle passagerrettigheder bortfalder." },
    ],
  });
}

export function buildDanishCountryLocalization(country: Country): KnowledgeLocalization {
  const name = danishCountryName(country.name);
  return base("country", country.slug, `Flykompensation i ${name} | FlightClaimly`, `Læs om flypassagerers rettigheder og kontrollér kompensation for forsinkede eller aflyste fly, der vedrører ${name}.`, {
    intro: `Ved en lang forsinkelse, aflysning eller anden kvalificerende forstyrrelse på en rejse, der vedrører ${name}, kan du have ret til kompensation.`,
    overview: `Flypassagerers rettigheder på rejser, der vedrører ${name}, afhænger af den konkrete rute, det opererende flyselskab og hvilket regelsæt der er relevant.`,
    passengerRights: "Når EU261 finder anvendelse, kan passagerer have ret til standardkompensation ved blandt andet mindst tre timers forsinkelse ved den endelige destination, visse aflysninger og nægtet boarding.",
    compensationIntro: "Når EU261 gælder, afhænger standardkompensationen blandt andet af flyvningens distance.", compensationAmounts: amounts,
    compensationRules: `Et fly, der vedrører ${name}, giver ikke automatisk ret til kompensation. Flyvningen og årsagen til forstyrrelsen skal vurderes efter det regelsæt, der faktisk gælder.`,
    statisticsIntro: `Almindelige udgangspunkter for passagerrettigheder på fly, der vedrører ${name}.`, statistics,
    timelineIntro: "FlightClaimly gennemgår flyvningen og bilagene, før et kvalificeret krav føres videre.", timeline, claimProcess, commonIssues,
    faq: [
      { question: `Kan jeg få flykompensation i ${name}?`, answer: "Det kan være muligt, hvis den konkrete flyvning er omfattet af EU261 eller et andet relevant regelsæt, og betingelserne for kompensation er opfyldt." },
      { question: "Er tre timers forsinkelse altid nok?", answer: "Nej. Tre timers ankomstforsinkelse er en vigtig tærskel i mange EU261-krav, men både reglernes anvendelsesområde og årsagen til forstyrrelsen skal vurderes." },
      { question: "Hvad hvis flyselskabet siger, at årsagen var ekstraordinær?", answer: "Så skal den konkrete årsag, årsagssammenhængen og flyselskabets rimelige foranstaltninger vurderes. Andre rettigheder kan stadig bestå." },
    ],
  }, name);
}
