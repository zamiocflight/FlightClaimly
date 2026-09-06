import type { Airline } from "@/data/seo/airlines";
import type { Airport } from "@/data/seo/airports";
import type { Country } from "@/data/seo/countries";
import type { FlightRoute } from "@/data/seo/routes";
import type { KnowledgeLocalization, LocalizableKnowledgeEntityType } from "./types";

const cityNames: Record<string, string> = {
  Algiers: "Alger", Athens: "Aten", Belgrade: "Belgrad", Brussels: "Bryssel",
  Bucharest: "Bukarest", Cairo: "Kairo", Cologne: "Köln", Copenhagen: "Köpenhamn",
  Florence: "Florens", Geneva: "Genève", Lisbon: "Lissabon", Milan: "Milano",
  Munich: "München", Naples: "Neapel", Prague: "Prag", Rhodes: "Rhodos",
  Rome: "Rom", Seville: "Sevilla", Venice: "Venedig", Vienna: "Wien",
  Warsaw: "Warszawa", Zurich: "Zürich",
};

const countryNames: Record<string, string> = {
  Austria: "Österrike", Belgium: "Belgien", Croatia: "Kroatien", Cyprus: "Cypern",
  Czechia: "Tjeckien", Denmark: "Danmark", Estonia: "Estland", Finland: "Finland",
  France: "Frankrike", Germany: "Tyskland", Greece: "Grekland", Hungary: "Ungern",
  Iceland: "Island", Ireland: "Irland", Italy: "Italien", Latvia: "Lettland",
  Lithuania: "Litauen", Luxembourg: "Luxemburg", Malta: "Malta", Netherlands: "Nederländerna",
  Norway: "Norge", Poland: "Polen", Portugal: "Portugal", Romania: "Rumänien",
  Slovakia: "Slovakien", Slovenia: "Slovenien", Spain: "Spanien", Sweden: "Sverige",
  Switzerland: "Schweiz", "United Kingdom": "Storbritannien",
};

export function swedishCityName(value: string) { return cityNames[value] ?? value; }
export function swedishCountryName(value: string) { return countryNames[value] ?? value; }

const amounts = [
  { label: "Upp till 1 500 km", distance: "Kortdistansflyg", amount: "€250" },
  { label: "1 500–3 500 km", distance: "Medeldistansflyg", amount: "€400" },
  { label: "Över 3 500 km", distance: "Långdistansflyg", amount: "upp till €600" },
];

const statistics = [
  { label: "Högsta ersättning", value: "€600", description: "Högsta ordinarie nivå per passagerare enligt EU261." },
  { label: "Förseningströskel", value: "3 h+", description: "Ersättning vid försening kräver normalt minst tre timmars försening vid slutdestinationen." },
  { label: "Bedömning", value: "Individuell", description: "Rätten till ersättning beror bland annat på flygningen, störningen och orsaken till den." },
];

const timeline = [
  { title: "Skicka in ditt krav", description: "Kontrollera flygningen, fyll i passageraruppgifterna och ladda upp de dokument som behövs." },
  { title: "FlightClaimly granskar ärendet", description: "Vi granskar informationen och förbereder kravet innan vi kontaktar flygbolaget." },
  { title: "Flygbolaget svarar", description: "Flygbolaget kan godkänna, avslå eller begära kompletterande information." },
  { title: "Du får din utbetalning", description: "Om kravet lyckas hjälper FlightClaimly till att slutföra utbetalningen." },
];

const claimProcess = [
  "Kontrollera flyguppgifterna och berätta vad som hände.",
  "Vi bedömer vilket regelverk om flygpassagerares rättigheter som kan gälla.",
  "Fyll i passageraruppgifter och bokningsreferens.",
  "Signera fullmakten så att FlightClaimly kan hantera kravet.",
  "Ladda upp relevanta underlag.",
  "FlightClaimly skickar kravet och följer upp med flygbolaget.",
];

const commonIssues = [
  "Flyget försenat mer än tre timmar", "Inställd flygning", "Missad anslutning",
  "Nekad ombordstigning", "Tekniska eller operativa problem",
];

function base(entityType: LocalizableKnowledgeEntityType, slug: string, title: string, description: string, content: KnowledgeLocalization["content"]): KnowledgeLocalization {
  return {
    entityType, entitySlug: slug, locale: "sv", source: "human", status: "publishable",
    metadata: { title, description }, content,
    quality: { metadataReviewed: true, terminologyReviewed: true, legalMeaningReviewed: true, contentReviewed: true },
    updatedAt: "2026-09-06",
  };
}

export function buildSwedishRouteLocalization(route: FlightRoute): KnowledgeLocalization {
  const origin = swedishCityName(route.origin.city);
  const destination = swedishCityName(route.destination.city);
  const name = `${origin}–${destination}`;
  return base("route", route.slug, `${origin} till ${destination} flygersättning | FlightClaimly`, `Kontrollera om du kan få ersättning för ett försenat eller inställt flyg från ${origin} till ${destination}.`, {
    intro: `Flyger du från ${origin} till ${destination}? Vid en lång försening, inställd flygning eller annan kvalificerande störning kan du ha rätt till ersättning.`,
    overview: `På flygsträckan ${name} kan passagerarrättigheter enligt EU261 eller andra tillämpliga regler bli aktuella beroende på avgång, destination, opererande flygbolag och omständigheterna kring störningen.`,
    passengerRights: `Vid minst tre timmars försening till slutdestinationen kan ersättning bli aktuell om övriga villkor är uppfyllda. Inställda flyg, missade anslutningar och nekad ombordstigning kan också omfattas.`,
    compensationIntro: `Ersättningsnivån beror bland annat på flygsträckans distans och vilket regelverk som gäller.`, compensationAmounts: amounts,
    compensationRules: `Rätten till ersättning på ${name} avgörs av den konkreta resan och orsaken till störningen. Extraordinära omständigheter kan innebära att standardersättning inte ska betalas, men flygbolagets skyldigheter måste bedömas i varje enskilt fall.`,
    statisticsIntro: `Fakta nedan sammanfattar vanliga utgångspunkter vid en ersättningsbedömning för ${name}.`, statistics,
    timelineIntro: `När du skickat in ditt ärende för ${name} hjälper FlightClaimly dig genom processen.`, timeline, claimProcess, commonIssues,
    faq: [
      { question: `Kan jag få ersättning för ett försenat flyg från ${origin} till ${destination}?`, answer: "Ja, det kan vara möjligt. Vid försening bedöms bland annat ankomstförseningen till slutdestinationen, vilket regelverk som gäller och orsaken till störningen." },
      { question: "Hur mycket kan jag få i ersättning?", answer: "Enligt EU261 är standardnivåerna normalt €250, €400 eller €600 beroende på bland annat flygsträckans distans och de rättsliga villkoren." },
      { question: "Kostar det att kontrollera mitt flyg?", answer: "Nej. Du kan kontrollera ditt flyg och påbörja bedömningen utan någon förskottsavgift." },
    ],
  });
}

export function buildSwedishAirportLocalization(airport: Airport): KnowledgeLocalization {
  const city = swedishCityName(airport.city);
  return base("airport", airport.slug, `${airport.name} (${airport.iata}) flygersättning | FlightClaimly`, `Kontrollera dina rättigheter vid försening eller inställt flyg från eller till ${airport.name} (${airport.iata}).`, {
    intro: `Om ditt flyg från eller till ${airport.name} blev försenat eller inställt kan du ha rätt till ersättning.`,
    overview: `${airport.name} (${airport.iata}) betjänar ${city}. Vilka passagerarrättigheter som gäller beror på den konkreta flygningen, det opererande flygbolaget och orsaken till störningen.`,
    passengerRights: "EU261 kan ge rätt till standardersättning vid bland annat långa förseningar, vissa inställda flyg och nekad ombordstigning när reglernas villkor är uppfyllda.",
    compensationIntro: "Ersättningsnivån enligt EU261 beror bland annat på flygsträckans distans.", compensationAmounts: amounts,
    compensationRules: "En försening på minst tre timmar vid slutdestinationen kan ge rätt till ersättning om övriga villkor är uppfyllda och flygbolaget inte kan åberopa en relevant extraordinär omständighet.",
    statisticsIntro: `Vanliga utgångspunkter för ersättningskrav som berör ${airport.name}.`, statistics,
    timelineIntro: "FlightClaimly granskar flygningen och underlagen innan kravet drivs vidare.", timeline, claimProcess, commonIssues,
    faq: [
      { question: `Kan jag få ersättning efter en försening på ${airport.name}?`, answer: "Det kan vara möjligt. Vi bedömer bland annat ankomstförseningen, resrutten, det opererande flygbolaget och orsaken till störningen." },
      { question: "Gäller EU261 för alla flyg från flygplatsen?", answer: "Nej. Tillämpningen beror på den konkreta flygningen och bland annat var resan börjar och vilket flygbolag som opererar den." },
      { question: "Hur kontrollerar jag mitt flyg?", answer: "Ange flyguppgifterna hos FlightClaimly så kan ärendet bedömas utifrån den faktiska resan." },
    ],
  });
}

export function buildSwedishAirlineLocalization(airline: Airline): KnowledgeLocalization {
  return base("airline", airline.slug, `${airline.name} flygersättning | FlightClaimly`, `Kontrollera om du kan få ersättning för ett försenat eller inställt flyg med ${airline.name}.`, {
    intro: `Om ditt ${airline.name}-flyg blev försenat, inställt eller orsakade en missad anslutning kan du ha rätt till ersättning.`,
    overview: `${airline.name} är ett flygbolag med IATA-kod ${airline.iata}. Rätten till ersättning bedöms utifrån den konkreta flygningen och störningen, inte enbart flygbolagets namn.`,
    passengerRights: "EU261 kan ge passagerare rätt till standardersättning vid bland annat minst tre timmars försening till slutdestinationen, vissa inställda flyg och nekad ombordstigning.",
    compensationIntro: "När EU261 gäller är standardersättningen normalt €250, €400 eller €600 beroende på bland annat distansen.", compensationAmounts: amounts,
    compensationRules: `För ett krav mot ${airline.name} behöver bland annat flygningen, ankomstförseningen och orsaken till störningen bedömas. Extraordinära omständigheter kan påverka rätten till standardersättning.`,
    statisticsIntro: `Vanliga utgångspunkter vid ersättningskrav som gäller ${airline.name}.`, statistics,
    timelineIntro: `När ditt ${airline.name}-ärende skickats in granskar FlightClaimly underlagen och driver ett kvalificerat krav vidare.`, timeline, claimProcess, commonIssues,
    faq: [
      { question: `Kan jag få ersättning från ${airline.name} vid en försening?`, answer: "Ja, om den aktuella flygningen omfattas av reglerna och övriga villkor är uppfyllda." },
      { question: `Hur mycket kan ${airline.name} behöva betala?`, answer: "När EU261 gäller är standardnivåerna normalt €250, €400 eller €600 per passagerare beroende på bland annat distansen." },
      { question: "Vad händer om flygbolaget hänvisar till extraordinära omständigheter?", answer: "Orsaken och flygbolagets åtgärder behöver bedömas i det enskilda fallet. En sådan invändning innebär inte automatiskt att alla passagerarrättigheter försvinner." },
    ],
  });
}

export function buildSwedishCountryLocalization(country: Country): KnowledgeLocalization {
  const name = swedishCountryName(country.name);
  return base("country", country.slug, `Flygersättning i ${name} | FlightClaimly`, `Läs om flygpassagerares rättigheter och kontrollera ersättning för försenade eller inställda flyg som berör ${name}.`, {
    intro: `Vid en lång försening, inställd flygning eller annan kvalificerande störning på en resa som berör ${name} kan du ha rätt till ersättning.`,
    overview: `Flygpassagerares rättigheter för resor som berör ${name} beror på den konkreta rutten, det opererande flygbolaget och vilket regelverk som är tillämpligt.`,
    passengerRights: "När EU261 är tillämplig kan passagerare ha rätt till standardersättning vid bland annat minst tre timmars försening till slutdestinationen, vissa inställda flyg och nekad ombordstigning.",
    compensationIntro: "När EU261 gäller beror standardersättningen bland annat på flygsträckans distans.", compensationAmounts: amounts,
    compensationRules: `Ett flyg som berör ${name} är inte automatiskt ersättningsberättigat. Flygningen och orsaken till störningen måste bedömas enligt det regelverk som faktiskt gäller.`,
    statisticsIntro: `Vanliga utgångspunkter för passagerarrättigheter på flyg som berör ${name}.`, statistics,
    timelineIntro: "FlightClaimly granskar flygningen och underlagen innan ett kvalificerat krav drivs vidare.", timeline, claimProcess, commonIssues,
    faq: [
      { question: `Kan jag få flygersättning i ${name}?`, answer: "Det kan vara möjligt om den aktuella flygningen omfattas av EU261 eller annat tillämpligt regelverk och villkoren för ersättning är uppfyllda." },
      { question: "Är tre timmars försening alltid tillräckligt?", answer: "Nej. Tre timmars ankomstförsening är en viktig tröskel vid många EU261-förseningskrav, men även flygningens täckning och orsaken till störningen måste bedömas." },
      { question: "Hur mycket kan jag få?", answer: "När EU261 gäller är standardnivåerna normalt €250, €400 eller €600 beroende på bland annat distansen." },
    ],
  });
}
