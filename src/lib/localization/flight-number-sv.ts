import type { FlightNumber } from "@/data/flight-numbers/types";
import { getAirportIdentityBySlug } from "@/lib/knowledge/airports";
import type { KnowledgeLocalization } from "./types";

function regulationLabel(flightNumber: FlightNumber): string {
  if (flightNumber.eu261Eligible && flightNumber.uk261Eligible) return "EU261 eller UK261";
  if (flightNumber.eu261Eligible) return "EU261";
  if (flightNumber.uk261Eligible) return "UK261";
  return "tillämpliga regler om flygpassagerares rättigheter";
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
      compensationIntro: `Passagerare på ${flightNumber.flightNumber} kan ha rätt till ersättning beroende på sträckan, typen av störning och den slutliga ankomstförseningen.`,
      compensationAmounts: [
        { label: "Upp till 1 500 km", distance: "Kortdistansflyg", amount: "€250" },
        { label: "1 500–3 500 km", distance: "Medeldistansflyg", amount: "€400" },
        { label: "Över 3 500 km", distance: "Långdistansflyg", amount: "€600" },
      ],
      compensationRules: `Berättigade passagerare på ${flightNumber.flightNumber} kan få ersättning när de rättsliga villkoren för sträckan ${originCity}–${destinationCity} är uppfyllda och flygbolaget inte kan undgå ansvar enligt tillämpliga regler.`,
      statisticsIntro: `Fakta nedan sammanfattar den rättighetsram som kan vara relevant för ${flightNumber.flightNumber}.`,
      statistics: [
        { label: "Högsta ersättning", value: "€600", description: "Per passagerare enligt EU261." },
        { label: "Förseningströskel", value: "3 h+", description: "Normalt krävs minst tre timmars försening vid slutdestinationen." },
        { label: "Regelverk", value: "EU261", description: "Gäller för flygningar som omfattas av EU261." },
      ],
      timelineIntro: `När ditt krav för ${flightNumber.flightNumber} har skickats in hjälper FlightClaimly dig genom processen.`,
      timeline: [
        { title: "Skicka in ditt krav", description: "Kontrollera flygningen, fyll i passageraruppgifterna och ladda upp de dokument som behövs för att starta ärendet." },
        { title: "FlightClaimly granskar ärendet", description: "Vi granskar informationen och förbereder kravet innan vi kontaktar flygbolaget." },
        { title: "Flygbolaget svarar", description: "Flygbolaget granskar kravet och kan godkänna, avslå eller begära kompletterande information." },
        { title: "Du får din utbetalning", description: "Om kravet lyckas hjälper FlightClaimly till att slutföra utbetalningen." },
      ],
      claimProcess: [
        "Kontrollera flyguppgifterna och berätta vad som hände.",
        "Kontrollera om störningen kan omfattas av EU261 eller UK261.",
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
        { question: "Kan jag få ersättning för ett försenat flyg?", answer: "Ja, det kan vara möjligt. Om du anlände minst tre timmar för sent och övriga villkor är uppfyllda kan du ha rätt till ersättning enligt EU261 eller UK261." },
        { question: "Hur mycket ersättning kan jag få?", answer: "Beroende på flygsträckan och omständigheterna kan ersättningen vara €250, €400 eller €600 per passagerare." },
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
