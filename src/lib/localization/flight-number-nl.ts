import type { FlightNumber } from "@/data/flight-numbers/types";
import { getAirportIdentityBySlug } from "@/lib/knowledge/airports";
import type { KnowledgeLocalization } from "./types";

const dutchCityNames: Record<string, string> = {
  Athens: "Athene",
  Brussels: "Brussel",
  Bucharest: "Boekarest",
  Cologne: "Keulen",
  Copenhagen: "Kopenhagen",
  Florence: "Florence",
  Lisbon: "Lissabon",
  Milan: "Milaan",
  Moscow: "Moskou",
  Munich: "München",
  Naples: "Napels",
  Prague: "Praag",
  Rome: "Rome",
  Seville: "Sevilla",
  Thessaloniki: "Thessaloniki",
  Venice: "Venetië",
  Vienna: "Wenen",
  Warsaw: "Warschau",
  Zurich: "Zürich",
};

function dutchCityName(city: string): string {
  return dutchCityNames[city] ?? city;
}

function regulationLabel(flight: FlightNumber): string {
  if (flight.eu261Eligible && flight.uk261Eligible) return "EU261 of UK261";
  if (flight.eu261Eligible) return "EU261";
  if (flight.uk261Eligible) return "UK261";
  return "de toepasselijke regels voor passagiersrechten";
}

function compensationAmounts(flight: FlightNumber) {
  if (flight.eu261Eligible && flight.uk261Eligible) {
    return [
      { label: "Tot en met 1.500 km", distance: "Korte vlucht", amount: "€250 / £220" },
      { label: "1.500–3.500 km", distance: "Middellange vlucht", amount: "€400 / £350" },
      { label: "Meer dan 3.500 km", distance: "Lange vlucht", amount: "tot €600 / £520" },
    ];
  }
  if (flight.eu261Eligible) {
    return [
      { label: "Tot en met 1.500 km", distance: "Korte vlucht", amount: "€250" },
      { label: "1.500–3.500 km", distance: "Middellange vlucht", amount: "€400" },
      { label: "Meer dan 3.500 km", distance: "Lange vlucht", amount: "tot €600" },
    ];
  }
  if (flight.uk261Eligible) {
    return [
      { label: "Tot en met 1.500 km", distance: "Korte vlucht", amount: "£220" },
      { label: "1.500–3.500 km", distance: "Middellange vlucht", amount: "£350" },
      { label: "Meer dan 3.500 km", distance: "Lange vlucht", amount: "tot £520" },
    ];
  }
  return [{ label: "Schadevergoeding", distance: "Afhankelijk van de toepasselijke regels", amount: "Per geval te beoordelen" }];
}

function compensationStatistics(flight: FlightNumber) {
  if (flight.eu261Eligible && flight.uk261Eligible) {
    return [
      { label: "Maximale schadevergoeding", value: "€600 / £520", description: "De hoogste gebruikelijke compensatiebedragen onder EU261 en UK261." },
      { label: "Vertraging op eindbestemming", value: "3 uur+", description: "Voor compensatie wegens vertraging is doorgaans een aankomstvertraging van minstens drie uur op de eindbestemming vereist." },
      { label: "Regelgeving", value: "EU261 / UK261", description: "Welke regeling van toepassing is, hangt onder meer af van de route en de uitvoerende luchtvaartmaatschappij." },
    ];
  }
  if (flight.eu261Eligible) {
    return [
      { label: "Maximale schadevergoeding", value: "€600", description: "Het hoogste gebruikelijke compensatiebedrag per passagier onder EU261." },
      { label: "Vertraging op eindbestemming", value: "3 uur+", description: "Voor compensatie wegens vertraging is doorgaans een aankomstvertraging van minstens drie uur op de eindbestemming vereist." },
      { label: "Regelgeving", value: "EU261", description: "Op deze vlucht kunnen de EU-passagiersrechten van toepassing zijn." },
    ];
  }
  if (flight.uk261Eligible) {
    return [
      { label: "Maximale schadevergoeding", value: "£520", description: "Het hoogste gebruikelijke compensatiebedrag per passagier onder UK261." },
      { label: "Vertraging op eindbestemming", value: "3 uur+", description: "Voor compensatie wegens vertraging is doorgaans een aankomstvertraging van minstens drie uur op de eindbestemming vereist." },
      { label: "Regelgeving", value: "UK261", description: "Op deze vlucht kunnen de Britse passagiersrechten van toepassing zijn." },
    ];
  }
  return [
    { label: "Schadevergoeding", value: "Per geval", description: "Of er recht bestaat op compensatie en welk bedrag geldt, hangt af van de regels die op de vlucht van toepassing zijn." },
    { label: "Beoordeling", value: "Individueel", description: "Vertrekpunt, eindbestemming, uitvoerende luchtvaartmaatschappij en oorzaak van de verstoring moeten worden beoordeeld." },
    { label: "Regelgeving", value: "Te bepalen", description: "Deze pagina gaat er niet automatisch van uit dat EU261 of UK261 op deze vlucht van toepassing is." },
  ];
}

export function buildDutchFlightNumberLocalization(flight: FlightNumber): KnowledgeLocalization {
  const origin = getAirportIdentityBySlug(flight.originAirportSlug);
  const destination = getAirportIdentityBySlug(flight.destinationAirportSlug);
  const originCity = dutchCityName(origin?.city ?? origin?.name ?? flight.originAirportSlug);
  const destinationCity = dutchCityName(destination?.city ?? destination?.name ?? flight.destinationAirportSlug);
  const regulation = regulationLabel(flight);

  return {
    entityType: "flight-number",
    entitySlug: flight.slug,
    locale: "nl",
    source: "human",
    status: "publishable",
    metadata: {
      title: `${flight.airlineName} ${flight.flightNumber} vluchtcompensatie | FlightClaimly`,
      description: `Controleer of u recht heeft op compensatie voor vertraging of annulering van ${flight.airlineName}-vlucht ${flight.flightNumber} op de route ${originCity}–${destinationCity} onder ${regulation}.`,
    },
    content: {
      intro: `${flight.airlineName}-vlucht ${flight.flightNumber} is een reguliere vluchtverbinding op de route ${originCity}–${destinationCity}.`,
      overview: `Passagiers van ${flight.airlineName}-vlucht ${flight.flightNumber} kunnen bij vertraging, annulering of een andere ernstige vluchtverstoring recht hebben op schadevergoeding.`,
      passengerRights: flight.eu261Eligible || flight.uk261Eligible
        ? `Bij vertraging, annulering of een andere vluchtverstoring kunnen op vlucht ${flight.flightNumber} passagiersrechten onder ${regulation} van toepassing zijn.`
        : `De rechten van passagiers op vlucht ${flight.flightNumber} hangen onder meer af van het vertrekpunt, de eindbestemming, de uitvoerende luchtvaartmaatschappij en de oorzaak van de vluchtverstoring.`,
      compensationIntro: `Of u recht heeft op schadevergoeding voor vlucht ${flight.flightNumber} hangt onder meer af van de route, de aard van de verstoring, de vertraging op de eindbestemming en de toepasselijke regels.`,
      compensationAmounts: compensationAmounts(flight),
      compensationRules: `Schadevergoeding voor vlucht ${flight.flightNumber} kan verschuldigd zijn wanneer aan de juridische voorwaarden voor de route ${originCity}–${destinationCity} is voldaan en geen toepasselijke uitzondering de compensatie uitsluit.`,
      statisticsIntro: `Deze gegevens geven een overzicht van passagiersrechten die mogelijk relevant zijn voor vlucht ${flight.flightNumber}.`,
      statistics: compensationStatistics(flight),
      timelineIntro: `Nadat u een claim voor vlucht ${flight.flightNumber} heeft ingediend, helpt FlightClaimly bij de volgende stappen.`,
      timeline: [
        { title: "Dien uw claim in", description: "Controleer de vlucht, vul de passagiersgegevens in en upload de benodigde documenten." },
        { title: "FlightClaimly beoordeelt de zaak", description: "We controleren de informatie en bereiden de claim voor voordat we contact opnemen met de luchtvaartmaatschappij." },
        { title: "De luchtvaartmaatschappij reageert", description: "De luchtvaartmaatschappij behandelt de claim en kan deze accepteren, afwijzen of om aanvullende informatie vragen." },
        { title: "U ontvangt uw schadevergoeding", description: "Als de claim tot compensatie leidt, helpt FlightClaimly de zaak af te ronden." },
      ],
      claimProcess: [
        "Controleer de vluchtgegevens en beschrijf de verstoring.",
        "Bepaal welke passagiersrechten mogelijk op de vlucht van toepassing zijn.",
        "Vul de passagiersgegevens en boekingsreferentie in.",
        "Geef FlightClaimly een volmacht om de claim te behandelen.",
        "Upload de relevante documenten.",
        "FlightClaimly dient de claim in en onderhoudt het contact met de luchtvaartmaatschappij.",
      ],
      commonIssues: [
        "Meer dan drie uur te laat aangekomen",
        "Vlucht geannuleerd",
        "Aansluitende vlucht gemist",
        "Instap geweigerd",
        "Technisch probleem",
        "Operationele verstoring",
        "Bemanningsprobleem",
        "Staking",
        "Slechte weersomstandigheden",
      ],
      faq: [
        { question: "Kan ik compensatie krijgen voor een vertraagde vlucht?", answer: `Mogelijk. Als u minstens drie uur te laat op uw eindbestemming aankomt en aan de overige voorwaarden is voldaan, kunt u recht hebben op schadevergoeding onder ${regulation}.` },
        { question: "Hoe hoog kan de schadevergoeding zijn?", answer: flight.eu261Eligible || flight.uk261Eligible ? `Het bedrag hangt af van de vliegafstand, de omstandigheden van de verstoring en de regels die op vlucht ${flight.flightNumber} van toepassing zijn.` : "Het bedrag en de voorwaarden hangen af van de passagiersrechten die op de betreffende vlucht van toepassing zijn." },
        { question: "Welke documenten heb ik nodig?", answer: "Een boekingsbevestiging of instapkaart is meestal voldoende voor een eerste beoordeling. In sommige zaken kunnen aanvullende documenten nodig zijn." },
        { question: "Hoe lang duurt de behandeling?", answer: "De doorlooptijd hangt af van de luchtvaartmaatschappij en de zaak. Sommige claims worden binnen enkele weken opgelost, terwijl betwiste zaken meerdere maanden kunnen duren." },
        { question: "Betaal ik vooraf?", answer: "Nee. FlightClaimly brengt alleen een vergoeding in rekening als er voor u schadevergoeding wordt geïnd." },
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
