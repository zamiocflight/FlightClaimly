import type { FlightNumber } from "@/data/flight-numbers/types";
import { getAirportIdentityBySlug } from "@/lib/knowledge/airports";
import type { KnowledgeLocalization } from "./types";

function regulationLabel(flightNumber: FlightNumber): string {
  if (flightNumber.eu261Eligible && flightNumber.uk261Eligible) return "EU261 eller UK261";
  if (flightNumber.eu261Eligible) return "EU261";
  if (flightNumber.uk261Eligible) return "UK261";
  return "tillämpliga regler om flygpassagerares rättigheter";
}

function compensationAmounts(flightNumber: FlightNumber) {
  if (flightNumber.eu261Eligible && flightNumber.uk261Eligible) {
    return [
      {
        label: "Upp till 1 500 km",
        distance: "Kortdistansflyg",
        amount: "€250 / £220",
      },
      {
        label: "1 500–3 500 km",
        distance: "Medeldistansflyg",
        amount: "€400 / £350",
      },
      {
        label: "Över 3 500 km",
        distance: "Långdistansflyg",
        amount: "upp till €600 / £520",
      },
    ];
  }

  if (flightNumber.eu261Eligible) {
    return [
      { label: "Upp till 1 500 km", distance: "Kortdistansflyg", amount: "€250" },
      { label: "1 500–3 500 km", distance: "Medeldistansflyg", amount: "€400" },
      { label: "Över 3 500 km", distance: "Långdistansflyg", amount: "upp till €600" },
    ];
  }

  if (flightNumber.uk261Eligible) {
    return [
      { label: "Upp till 1 500 km", distance: "Kortdistansflyg", amount: "£220" },
      { label: "1 500–3 500 km", distance: "Medeldistansflyg", amount: "£350" },
      { label: "Över 3 500 km", distance: "Långdistansflyg", amount: "upp till £520" },
    ];
  }

  return [
    {
      label: "Ersättningsnivå",
      distance: "Beror på vilket regelverk som gäller",
      amount: "Varierar",
    },
  ];
}

function compensationStatistics(flightNumber: FlightNumber) {
  if (flightNumber.eu261Eligible && flightNumber.uk261Eligible) {
    return [
      {
        label: "Högsta ersättning",
        value: "€600 / £520",
        description: "Högsta ordinarie nivå enligt EU261 respektive UK261.",
      },
      {
        label: "Förseningströskel",
        value: "3 h+",
        description: "Ersättning vid försening kräver normalt minst tre timmars försening vid slutdestinationen.",
      },
      {
        label: "Regelverk",
        value: "EU261 / UK261",
        description: "Vilket regelverk som gäller beror på flygningen och det opererande flygbolaget.",
      },
    ];
  }

  if (flightNumber.eu261Eligible) {
    return [
      {
        label: "Högsta ersättning",
        value: "€600",
        description: "Högsta ordinarie nivå per passagerare enligt EU261.",
      },
      {
        label: "Förseningströskel",
        value: "3 h+",
        description: "Ersättning vid försening kräver normalt minst tre timmars försening vid slutdestinationen.",
      },
      {
        label: "Regelverk",
        value: "EU261",
        description: "Flygningen kan omfattas av EU261.",
      },
    ];
  }

  if (flightNumber.uk261Eligible) {
    return [
      {
        label: "Högsta ersättning",
        value: "£520",
        description: "Högsta ordinarie nivå per passagerare enligt UK261.",
      },
      {
        label: "Förseningströskel",
        value: "3 h+",
        description: "Ersättning vid försening kräver normalt minst tre timmars försening vid slutdestinationen.",
      },
      {
        label: "Regelverk",
        value: "UK261",
        description: "Flygningen kan omfattas av UK261.",
      },
    ];
  }

  return [
    {
      label: "Ersättning",
      value: "Varierar",
      description: "Ersättningsnivån beror på vilket passagerarrättsligt regelverk som faktiskt gäller.",
    },
    {
      label: "Bedömning",
      value: "Individuell",
      description: "Avgång, destination, opererande flygbolag och störningens omständigheter behöver bedömas.",
    },
    {
      label: "Regelverk",
      value: "Fastställs vid kontroll",
      description: "Sidan utgår inte från att EU261 eller UK261 automatiskt gäller för denna flygning.",
    },
  ];
}

export function buildSwedishFlightNumberLocalization(
  flightNumber: FlightNumber,
): KnowledgeLocalization {
  const origin = getAirportIdentityBySlug(flightNumber.originAirportSlug);
  const destination = getAirportIdentityBySlug(flightNumber.destinationAirportSlug);
  const originName = origin?.name ?? flightNumber.originAirportSlug;
  const destinationName = destination?.name ?? flightNumber.destinationAirportSlug;
  const originCity = origin?.city ?? originName;
  const destinationCity = destination?.city ?? destinationName;
  const regulation = regulationLabel(flightNumber);

  return {
    entityType: "flight-number",
    entitySlug: flightNumber.slug,
    locale: "sv",
    source: "human",
    status: "publishable",
    metadata: {
      title: `${flightNumber.airlineName} ${flightNumber.flightNumber} flygersättning | FlightClaimly`,
      description: `Kontrollera om du kan få ersättning för ett försenat eller inställt ${flightNumber.airlineName}-flyg ${flightNumber.flightNumber} från ${originCity} till ${destinationCity} enligt ${regulation}.`,
    },
    content: {
      intro: `${flightNumber.airlineName} ${flightNumber.flightNumber} är en reguljär flygning från ${originName} till ${destinationName}.`,
      overview: `Passagerare på ${flightNumber.airlineName} ${flightNumber.flightNumber} mellan ${originCity} och ${destinationCity} kan ha rätt till ersättning om flygningen blev försenad, inställd eller på annat sätt kraftigt störd.`,
      passengerRights:
        flightNumber.eu261Eligible || flightNumber.uk261Eligible
          ? `Passagerare på ${flightNumber.flightNumber} kan omfattas av ${regulation} vid försening, inställd flygning eller annan störning.`
          : `Vilka passagerarrättigheter som gäller för ${flightNumber.flightNumber} beror bland annat på avgångsflygplats, destination, opererande flygbolag och orsaken till störningen.`,
      compensationIntro: `Passagerare på ${flightNumber.flightNumber} kan ha rätt till ersättning beroende på sträckan, typen av störning, den slutliga ankomstförseningen och vilket regelverk som gäller.`,
      compensationAmounts: compensationAmounts(flightNumber),
      compensationRules: `Berättigade passagerare på ${flightNumber.flightNumber} kan få ersättning när de rättsliga villkoren för sträckan ${originCity}–${destinationCity} är uppfyllda och flygbolaget inte kan undgå ansvar enligt ${regulation}.`,
      statisticsIntro: `Fakta nedan sammanfattar den rättighetsram som kan vara relevant för ${flightNumber.flightNumber}.`,
      statistics: compensationStatistics(flightNumber),
      timelineIntro: `När ditt krav för ${flightNumber.flightNumber} har skickats in hjälper FlightClaimly dig genom processen.`,
      timeline: [
        { title: "Skicka in ditt krav", description: "Kontrollera flygningen, fyll i passageraruppgifterna och ladda upp de dokument som behövs för att starta ärendet." },
        { title: "FlightClaimly granskar ärendet", description: "Vi granskar informationen och förbereder kravet innan vi kontaktar flygbolaget." },
        { title: "Flygbolaget svarar", description: "Flygbolaget granskar kravet och kan godkänna, avslå eller begära kompletterande information." },
        { title: "Du får din utbetalning", description: "Om kravet lyckas hjälper FlightClaimly till att slutföra utbetalningen." },
      ],
      claimProcess: [
        "Kontrollera flyguppgifterna och berätta vad som hände.",
        "Kontrollera vilket regelverk om flygpassagerares rättigheter som kan gälla.",
        "Fyll i passageraruppgifter och bokningsreferens.",
        "Signera fullmakten så att FlightClaimly kan hantera kravet.",
        "Ladda upp relevanta underlag.",
        "FlightClaimly skickar kravet och följer upp med flygbolaget.",
      ],
      commonIssues: [
        "Flyget försenat mer än tre timmar",
        "Inställd flygning",
        "Missad anslutning",
        "Nekad ombordstigning",
        "Tekniska problem",
        "Operativ störning",
        "Brist på besättning",
        "Strejk",
        "Dåligt väder",
      ],
      faq: [
        { question: "Kan jag få ersättning för ett försenat flyg?", answer: `Ja, det kan vara möjligt. Om du anlände minst tre timmar för sent och övriga villkor är uppfyllda kan du ha rätt till ersättning enligt ${regulation}.` },
        { question: "Hur mycket ersättning kan jag få?", answer: flightNumber.eu261Eligible || flightNumber.uk261Eligible ? `Beloppet beror på flygsträckan, omständigheterna och vilket av de tillämpliga regelverken som gäller för ${flightNumber.flightNumber}.` : "Belopp och villkor beror på vilket passagerarrättsligt regelverk som gäller för den aktuella flygningen." },
        { question: "Vilka dokument behöver jag?", answer: "Vanligtvis räcker bokningsbekräftelsen eller boardingkortet för att komma igång. I vissa ärenden kan vi behöva ytterligare underlag." },
        { question: "Hur lång tid tar processen?", answer: "Det varierar mellan flygbolag och ärenden. Vissa krav löses inom några veckor, medan tvistiga ärenden kan ta flera månader." },
        { question: "Betalar jag något i förskott?", answer: "Nej. FlightClaimly arbetar enligt no win, no fee. Du betalar bara om vi lyckas driva in ersättning åt dig." },
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
