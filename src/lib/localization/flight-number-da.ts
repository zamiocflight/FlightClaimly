import type { FlightNumber } from "@/data/flight-numbers/types";
import { getAirportIdentityBySlug } from "@/lib/knowledge/airports";
import type { KnowledgeLocalization } from "./types";

const danishCityNames: Record<string, string> = {
  Athens: "Athen",
  Belgrade: "Beograd",
  Brussels: "Bruxelles",
  Bucharest: "Bukarest",
  Cairo: "Kairo",
  Cologne: "Köln",
  Copenhagen: "København",
  Florence: "Firenze",
  Lisbon: "Lissabon",
  Milan: "Milano",
  Munich: "München",
  Naples: "Napoli",
  Prague: "Prag",
  Rome: "Rom",
  Seville: "Sevilla",
  Venice: "Venedig",
  Vienna: "Wien",
  Warsaw: "Warszawa",
  Zurich: "Zürich",
};

function danishCityName(city: string): string {
  return danishCityNames[city] ?? city;
}

function regulationLabel(flightNumber: FlightNumber): string {
  if (flightNumber.eu261Eligible && flightNumber.uk261Eligible) return "EU261 eller UK261";
  if (flightNumber.eu261Eligible) return "EU261";
  if (flightNumber.uk261Eligible) return "UK261";
  return "de relevante regler om flypassagerers rettigheder";
}

function compensationAmounts(flightNumber: FlightNumber) {
  if (flightNumber.eu261Eligible && flightNumber.uk261Eligible) {
    return [
      { label: "Op til 1.500 km", distance: "Kortdistanceflyvning", amount: "€250 / £220" },
      { label: "1.500–3.500 km", distance: "Mellemdistanceflyvning", amount: "€400 / £350" },
      { label: "Over 3.500 km", distance: "Langdistanceflyvning", amount: "op til €600 / £520" },
    ];
  }
  if (flightNumber.eu261Eligible) {
    return [
      { label: "Op til 1.500 km", distance: "Kortdistanceflyvning", amount: "€250" },
      { label: "1.500–3.500 km", distance: "Mellemdistanceflyvning", amount: "€400" },
      { label: "Over 3.500 km", distance: "Langdistanceflyvning", amount: "op til €600" },
    ];
  }
  if (flightNumber.uk261Eligible) {
    return [
      { label: "Op til 1.500 km", distance: "Kortdistanceflyvning", amount: "£220" },
      { label: "1.500–3.500 km", distance: "Mellemdistanceflyvning", amount: "£350" },
      { label: "Over 3.500 km", distance: "Langdistanceflyvning", amount: "op til £520" },
    ];
  }
  return [{ label: "Kompensationsniveau", distance: "Afhænger af hvilke regler der gælder", amount: "Varierer" }];
}

function compensationStatistics(flightNumber: FlightNumber) {
  if (flightNumber.eu261Eligible && flightNumber.uk261Eligible) {
    return [
      { label: "Højeste kompensation", value: "€600 / £520", description: "Højeste almindelige niveau efter henholdsvis EU261 og UK261." },
      { label: "Forsinkelse ved ankomst", value: "3 t+", description: "Kompensation ved forsinkelse kræver normalt mindst tre timers forsinkelse ved den endelige destination." },
      { label: "Regelsæt", value: "EU261 / UK261", description: "Hvilket regelsæt der gælder, afhænger af flyvningen og det opererende flyselskab." },
    ];
  }
  if (flightNumber.eu261Eligible) {
    return [
      { label: "Højeste kompensation", value: "€600", description: "Højeste almindelige niveau pr. passager efter EU261." },
      { label: "Forsinkelse ved ankomst", value: "3 t+", description: "Kompensation ved forsinkelse kræver normalt mindst tre timers forsinkelse ved den endelige destination." },
      { label: "Regelsæt", value: "EU261", description: "Flyvningen kan være omfattet af EU261." },
    ];
  }
  if (flightNumber.uk261Eligible) {
    return [
      { label: "Højeste kompensation", value: "£520", description: "Højeste almindelige niveau pr. passager efter UK261." },
      { label: "Forsinkelse ved ankomst", value: "3 t+", description: "Kompensation ved forsinkelse kræver normalt mindst tre timers forsinkelse ved den endelige destination." },
      { label: "Regelsæt", value: "UK261", description: "Flyvningen kan være omfattet af UK261." },
    ];
  }
  return [
    { label: "Kompensation", value: "Varierer", description: "Kompensationsniveauet afhænger af, hvilke regler om flypassagerers rettigheder der faktisk gælder." },
    { label: "Vurdering", value: "Individuel", description: "Afgang, destination, opererende flyselskab og omstændighederne omkring forstyrrelsen skal vurderes." },
    { label: "Regelsæt", value: "Fastlægges ved kontrol", description: "Siden antager ikke, at EU261 eller UK261 automatisk gælder for denne flyvning." },
  ];
}

export function buildDanishFlightNumberLocalization(flightNumber: FlightNumber): KnowledgeLocalization {
  const origin = getAirportIdentityBySlug(flightNumber.originAirportSlug);
  const destination = getAirportIdentityBySlug(flightNumber.destinationAirportSlug);
  const originName = origin?.name ?? flightNumber.originAirportSlug;
  const destinationName = destination?.name ?? flightNumber.destinationAirportSlug;
  const originCity = danishCityName(origin?.city ?? originName);
  const destinationCity = danishCityName(destination?.city ?? destinationName);
  const regulation = regulationLabel(flightNumber);

  return {
    entityType: "flight-number",
    entitySlug: flightNumber.slug,
    locale: "da",
    source: "human",
    status: "publishable",
    metadata: {
      title: `${flightNumber.airlineName} ${flightNumber.flightNumber} flykompensation | FlightClaimly`,
      description: `Tjek om du kan få kompensation for et forsinket eller aflyst ${flightNumber.airlineName}-fly ${flightNumber.flightNumber} fra ${originCity} til ${destinationCity} efter ${regulation}.`,
    },
    content: {
      intro: `${flightNumber.airlineName} ${flightNumber.flightNumber} er en ruteflyvning fra ${originName} til ${destinationName}.`,
      overview: `Passagerer på ${flightNumber.airlineName} ${flightNumber.flightNumber} mellem ${originCity} og ${destinationCity} kan have ret til kompensation, hvis flyet blev forsinket, aflyst eller på anden måde væsentligt forstyrret.`,
      passengerRights: flightNumber.eu261Eligible || flightNumber.uk261Eligible
        ? `Passagerer på ${flightNumber.flightNumber} kan være omfattet af ${regulation} ved forsinkelse, aflysning eller andre flyforstyrrelser.`
        : `Hvilke rettigheder der gælder for passagerer på ${flightNumber.flightNumber}, afhænger blandt andet af afgangslufthavn, destination, opererende flyselskab og årsagen til forstyrrelsen.`,
      compensationIntro: `Passagerer på ${flightNumber.flightNumber} kan have ret til kompensation afhængigt af flyvningens distance, typen af forstyrrelse, forsinkelsen ved den endelige destination og hvilket regelsæt der gælder.`,
      compensationAmounts: compensationAmounts(flightNumber),
      compensationRules: `Passagerer på ${flightNumber.flightNumber} kan have ret til kompensation, når de relevante juridiske betingelser for ruten ${originCity}–${destinationCity} er opfyldt, og flyselskabet ikke er fritaget for at betale kompensation efter ${regulation}.`,
      statisticsIntro: `Fakta nedenfor opsummerer de regler om flypassagerers rettigheder, der kan være relevante for ${flightNumber.flightNumber}.`,
      statistics: compensationStatistics(flightNumber),
      timelineIntro: `Når dit krav for ${flightNumber.flightNumber} er indsendt, hjælper FlightClaimly dig gennem processen.`,
      timeline: [
        { title: "Indsend dit krav", description: "Tjek flyvningen, udfyld passageroplysningerne og upload den dokumentation, der er nødvendig for at starte sagen." },
        { title: "FlightClaimly gennemgår sagen", description: "Vi gennemgår oplysningerne og forbereder kravet, før vi kontakter flyselskabet." },
        { title: "Flyselskabet svarer", description: "Flyselskabet behandler kravet og kan godkende, afvise eller bede om yderligere oplysninger." },
        { title: "Du modtager din udbetaling", description: "Hvis kravet fører til kompensation, hjælper FlightClaimly med at afslutte udbetalingen." },
      ],
      claimProcess: [
        "Tjek flyoplysningerne og fortæl, hvad der skete.",
        "Kontrollér hvilke regler om flypassagerers rettigheder der kan gælde.",
        "Udfyld passageroplysninger og bookingreference.",
        "Underskriv fuldmagten, så FlightClaimly kan håndtere kravet.",
        "Upload relevant dokumentation.",
        "FlightClaimly sender kravet og følger op over for flyselskabet.",
      ],
      commonIssues: [
        "Fly forsinket mere end tre timer",
        "Aflyst fly",
        "Misset forbindelsesfly",
        "Nægtet boarding",
        "Tekniske problemer",
        "Driftsforstyrrelse",
        "Mangel på besætning",
        "Strejke",
        "Dårligt vejr",
      ],
      faq: [
        { question: "Kan jeg få kompensation for et forsinket fly?", answer: `Ja, det kan være muligt. Hvis du ankom mindst tre timer for sent, og de øvrige betingelser er opfyldt, kan du have ret til kompensation efter ${regulation}.` },
        { question: "Hvor meget kan jeg få i kompensation?", answer: flightNumber.eu261Eligible || flightNumber.uk261Eligible ? `Beløbet afhænger af flyvningens distance, omstændighederne og hvilket af de relevante regelsæt der gælder for ${flightNumber.flightNumber}.` : "Beløb og betingelser afhænger af, hvilke regler om flypassagerers rettigheder der gælder for den konkrete flyvning." },
        { question: "Hvilke dokumenter skal jeg bruge?", answer: "En bookingbekræftelse eller et boardingkort er normalt nok til at komme i gang. I nogle sager kan vi have brug for yderligere dokumentation." },
        { question: "Hvor lang tid tager processen?", answer: "Det varierer fra flyselskab til flyselskab og fra sag til sag. Nogle krav løses på få uger, mens sager med uenighed kan tage flere måneder." },
        { question: "Skal jeg betale noget på forhånd?", answer: "Nej. FlightClaimly arbejder efter no win, no fee-princippet. Du betaler kun, hvis vi får kompensation hjem til dig." },
      ],
    },
    quality: {
      metadataReviewed: true,
      terminologyReviewed: true,
      legalMeaningReviewed: true,
      contentReviewed: true,
    },
  };
}
