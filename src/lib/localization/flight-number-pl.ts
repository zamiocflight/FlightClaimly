import type { FlightNumber } from "@/data/flight-numbers/types";
import { getAirportIdentityBySlug } from "@/lib/knowledge/airports";
import type { KnowledgeLocalization } from "./types";

const polishCityNames: Record<string, string> = {
  Athens: "Ateny", Belgrade: "Belgrad", Brussels: "Bruksela", Bucharest: "Bukareszt", Cairo: "Kair",
  Cologne: "Kolonia", Copenhagen: "Kopenhaga", Florence: "Florencja", Lisbon: "Lizbona", Milan: "Mediolan",
  Munich: "Monachium", Naples: "Neapol", Prague: "Praga", Rome: "Rzym", Seville: "Sewilla",
  Venice: "Wenecja", Vienna: "Wiedeń", Warsaw: "Warszawa", Zurich: "Zurych",
};

function polishCityName(city: string): string { return polishCityNames[city] ?? city; }

function regulationLabel(flight: FlightNumber): string {
  if (flight.eu261Eligible && flight.uk261Eligible) return "EU261 lub UK261";
  if (flight.eu261Eligible) return "EU261";
  if (flight.uk261Eligible) return "UK261";
  return "właściwych przepisów dotyczących praw pasażerów lotniczych";
}

function compensationAmounts(flight: FlightNumber) {
  if (flight.eu261Eligible && flight.uk261Eligible) return [
    { label: "Do 1500 km", distance: "Lot krótkodystansowy", amount: "€250 / £220" },
    { label: "1500–3500 km", distance: "Lot średniodystansowy", amount: "€400 / £350" },
    { label: "Powyżej 3500 km", distance: "Lot długodystansowy", amount: "do €600 / £520" },
  ];
  if (flight.eu261Eligible) return [
    { label: "Do 1500 km", distance: "Lot krótkodystansowy", amount: "€250" },
    { label: "1500–3500 km", distance: "Lot średniodystansowy", amount: "€400" },
    { label: "Powyżej 3500 km", distance: "Lot długodystansowy", amount: "do €600" },
  ];
  if (flight.uk261Eligible) return [
    { label: "Do 1500 km", distance: "Lot krótkodystansowy", amount: "£220" },
    { label: "1500–3500 km", distance: "Lot średniodystansowy", amount: "£350" },
    { label: "Powyżej 3500 km", distance: "Lot długodystansowy", amount: "do £520" },
  ];
  return [{ label: "Wysokość odszkodowania", distance: "Zależy od właściwych przepisów", amount: "Zależy od przypadku" }];
}

function compensationStatistics(flight: FlightNumber) {
  if (flight.eu261Eligible && flight.uk261Eligible) return [
    { label: "Maksymalne odszkodowanie", value: "€600 / £520", description: "Najwyższy standardowy poziom odpowiednio według EU261 i UK261." },
    { label: "Opóźnienie w miejscu docelowym", value: "3 godz.+", description: "Prawo do odszkodowania za opóźnienie co do zasady wymaga co najmniej trzech godzin opóźnienia w miejscu docelowym." },
    { label: "Przepisy", value: "EU261 / UK261", description: "Właściwe przepisy zależą od trasy lotu i przewoźnika obsługującego lot." },
  ];
  if (flight.eu261Eligible) return [
    { label: "Maksymalne odszkodowanie", value: "€600", description: "Najwyższy standardowy poziom odszkodowania na pasażera według EU261." },
    { label: "Opóźnienie w miejscu docelowym", value: "3 godz.+", description: "Prawo do odszkodowania za opóźnienie co do zasady wymaga co najmniej trzech godzin opóźnienia w miejscu docelowym." },
    { label: "Przepisy", value: "EU261", description: "Lot może podlegać przepisom EU261." },
  ];
  if (flight.uk261Eligible) return [
    { label: "Maksymalne odszkodowanie", value: "£520", description: "Najwyższy standardowy poziom odszkodowania na pasażera według UK261." },
    { label: "Opóźnienie w miejscu docelowym", value: "3 godz.+", description: "Prawo do odszkodowania za opóźnienie co do zasady wymaga co najmniej trzech godzin opóźnienia w miejscu docelowym." },
    { label: "Przepisy", value: "UK261", description: "Lot może podlegać przepisom UK261." },
  ];
  return [
    { label: "Odszkodowanie", value: "Zależy od przypadku", description: "Wysokość i prawo do odszkodowania zależą od przepisów mających zastosowanie do konkretnego lotu." },
    { label: "Ocena", value: "Indywidualna", description: "Należy ocenić miejsce wylotu, miejsce docelowe, przewoźnika obsługującego lot i okoliczności zakłócenia." },
    { label: "Przepisy", value: "Do ustalenia", description: "Strona nie zakłada automatycznie, że do tego lotu ma zastosowanie EU261 lub UK261." },
  ];
}

export function buildPolishFlightNumberLocalization(flight: FlightNumber): KnowledgeLocalization {
  const origin = getAirportIdentityBySlug(flight.originAirportSlug);
  const destination = getAirportIdentityBySlug(flight.destinationAirportSlug);
  const originName = origin?.name ?? flight.originAirportSlug;
  const destinationName = destination?.name ?? flight.destinationAirportSlug;
  const originCity = polishCityName(origin?.city ?? originName);
  const destinationCity = polishCityName(destination?.city ?? destinationName);
  const regulation = regulationLabel(flight);

  return {
    entityType: "flight-number", entitySlug: flight.slug, locale: "pl", source: "human", status: "publishable",
    metadata: {
      title: `${flight.airlineName} ${flight.flightNumber} odszkodowanie za lot | FlightClaimly`,
      description: `Sprawdź, czy przysługuje Ci odszkodowanie za opóźniony lub odwołany lot ${flight.airlineName} ${flight.flightNumber} z ${originCity} do ${destinationCity} zgodnie z ${regulation}.`,
    },
    content: {
      intro: `${flight.airlineName} ${flight.flightNumber} to regularny lot z ${originName} do ${destinationName}.`,
      overview: `Pasażerowie lotu ${flight.airlineName} ${flight.flightNumber} między ${originCity} a ${destinationCity} mogą mieć prawo do odszkodowania, jeśli lot był opóźniony, odwołany lub doszło do innego istotnego zakłócenia.`,
      passengerRights: flight.eu261Eligible || flight.uk261Eligible
        ? `Pasażerowie lotu ${flight.flightNumber} mogą być objęci przepisami ${regulation} w przypadku opóźnienia, odwołania lub innych zakłóceń lotu.`
        : `Prawa pasażerów lotu ${flight.flightNumber} zależą między innymi od miejsca wylotu, miejsca docelowego, przewoźnika obsługującego lot oraz przyczyny zakłócenia.`,
      compensationIntro: `Prawo do odszkodowania za lot ${flight.flightNumber} zależy między innymi od długości trasy, rodzaju zakłócenia, opóźnienia w miejscu docelowym oraz przepisów mających zastosowanie do lotu.`,
      compensationAmounts: compensationAmounts(flight),
      compensationRules: `Odszkodowanie za lot ${flight.flightNumber} może przysługiwać, jeśli spełnione są odpowiednie warunki prawne dla trasy ${originCity}–${destinationCity}, a przewoźnik nie jest zwolniony z obowiązku wypłaty odszkodowania na podstawie ${regulation}.`,
      statisticsIntro: `Poniższe informacje podsumowują zasady dotyczące praw pasażerów, które mogą mieć znaczenie dla lotu ${flight.flightNumber}.`,
      statistics: compensationStatistics(flight),
      timelineIntro: `Po zgłoszeniu roszczenia dotyczącego lotu ${flight.flightNumber} FlightClaimly pomaga przejść przez kolejne etapy sprawy.`,
      timeline: [
        { title: "Zgłoś roszczenie", description: "Sprawdź lot, podaj dane pasażera i prześlij dokumenty potrzebne do rozpoczęcia sprawy." },
        { title: "FlightClaimly analizuje sprawę", description: "Weryfikujemy informacje i przygotowujemy roszczenie przed kontaktem z przewoźnikiem." },
        { title: "Przewoźnik odpowiada", description: "Linia lotnicza rozpatruje roszczenie i może je uznać, odrzucić lub poprosić o dodatkowe informacje." },
        { title: "Otrzymujesz wypłatę", description: "Jeżeli roszczenie prowadzi do wypłaty odszkodowania, FlightClaimly pomaga sfinalizować proces." },
      ],
      claimProcess: [
        "Sprawdź dane lotu i opisz, co się wydarzyło.",
        "Ustal, które przepisy dotyczące praw pasażerów mogą mieć zastosowanie.",
        "Podaj dane pasażera i numer rezerwacji.",
        "Podpisz pełnomocnictwo, aby FlightClaimly mógł prowadzić roszczenie.",
        "Prześlij odpowiednie dokumenty.",
        "FlightClaimly składa roszczenie i kontaktuje się z przewoźnikiem w sprawie jego rozpatrzenia.",
      ],
      commonIssues: ["Lot opóźniony o ponad trzy godziny", "Odwołany lot", "Utracone połączenie", "Odmowa przyjęcia na pokład", "Problemy techniczne", "Zakłócenia operacyjne", "Brak załogi", "Strajk", "Złe warunki pogodowe"],
      faq: [
        { question: "Czy przysługuje mi odszkodowanie za opóźniony lot?", answer: `Może przysługiwać. Jeśli dotarłeś do miejsca docelowego co najmniej trzy godziny później i pozostałe warunki są spełnione, możesz mieć prawo do odszkodowania zgodnie z ${regulation}.` },
        { question: "Ile odszkodowania mogę otrzymać?", answer: flight.eu261Eligible || flight.uk261Eligible ? `Kwota zależy od długości trasy, okoliczności zakłócenia oraz przepisów mających zastosowanie do lotu ${flight.flightNumber}.` : "Kwota i warunki zależą od przepisów dotyczących praw pasażerów mających zastosowanie do konkretnego lotu." },
        { question: "Jakich dokumentów potrzebuję?", answer: "Potwierdzenie rezerwacji lub karta pokładowa zwykle wystarczą, aby rozpocząć sprawę. W niektórych przypadkach możemy potrzebować dodatkowych dokumentów." },
        { question: "Jak długo trwa proces?", answer: "Czas rozpatrywania zależy od przewoźnika i konkretnej sprawy. Niektóre roszczenia kończą się w ciągu kilku tygodni, a sprawy sporne mogą trwać kilka miesięcy." },
        { question: "Czy muszę płacić z góry?", answer: "Nie. FlightClaimly działa na zasadzie no win, no fee. Płacisz tylko wtedy, gdy uzyskamy dla Ciebie odszkodowanie." },
      ],
    },
    quality: { metadataReviewed: true, terminologyReviewed: true, legalMeaningReviewed: true, contentReviewed: true },
  };
}
