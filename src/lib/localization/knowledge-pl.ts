import type { Airline } from "@/data/seo/airlines";
import type { Airport } from "@/data/seo/airports";
import type { Country } from "@/data/seo/countries";
import type { FlightRoute } from "@/data/seo/routes";
import type { KnowledgeLocalization, LocalizableKnowledgeEntityType } from "./types";

const cityNames: Record<string, string> = {
  Athens: "Ateny", Basel: "Bazylea", Belgrade: "Belgrad", Bologna: "Bolonia",
  Bremen: "Brema", Brussels: "Bruksela", Bucharest: "Bukareszt", Cairo: "Kair",
  Catania: "Katania", Chișinău: "Kiszyniów", Cologne: "Kolonia", Copenhagen: "Kopenhaga",
  Dresden: "Drezno", Dubrovnik: "Dubrownik", Edinburgh: "Edynburg", Florence: "Florencja",
  Geneva: "Genewa", Hannover: "Hanower", Istanbul: "Stambuł", Leipzig: "Lipsk",
  Lisbon: "Lizbona", Ljubljana: "Lublana", Luxembourg: "Luksemburg", Madrid: "Madryt",
  Marseille: "Marsylia", Milan: "Mediolan", Munich: "Monachium", Naples: "Neapol",
  Nice: "Nicea", Nuremberg: "Norymberga", Paris: "Paryż", Paphos: "Pafos",
  Pisa: "Piza", Prague: "Praga", Riga: "Ryga", Rome: "Rzym",
  Seville: "Sewilla", Stockholm: "Sztokholm", Thessaloniki: "Saloniki", Turin: "Turyn",
  Valencia: "Walencja", Venice: "Wenecja", Vienna: "Wiedeń", Vilnius: "Wilno",
  Warsaw: "Warszawa", Washington: "Waszyngton", Zagreb: "Zagrzeb", Zurich: "Zurych",
};
const countryNames: Record<string, string> = {
  Austria: "Austria", Belgium: "Belgia", Croatia: "Chorwacja", Cyprus: "Cypr",
  Czechia: "Czechy", Denmark: "Dania", Estonia: "Estonia", Finland: "Finlandia",
  France: "Francja", Germany: "Niemcy", Greece: "Grecja", Hungary: "Węgry",
  Iceland: "Islandia", Ireland: "Irlandia", Italy: "Włochy", Latvia: "Łotwa",
  Lithuania: "Litwa", Luxembourg: "Luksemburg", Malta: "Malta", Netherlands: "Holandia",
  Norway: "Norwegia", Poland: "Polska", Portugal: "Portugalia", Romania: "Rumunia",
  Slovakia: "Słowacja", Slovenia: "Słowenia", Spain: "Hiszpania", Sweden: "Szwecja",
  Switzerland: "Szwajcaria", "United Kingdom": "Wielka Brytania",
};
export function polishCityName(value: string) { return cityNames[value] ?? value; }
export function polishCountryName(value: string) { return countryNames[value] ?? value; }

const amounts = [
  { label: "Do 1500 km", distance: "Lot krótkodystansowy", amount: "€250" },
  { label: "1500–3500 km", distance: "Lot średniodystansowy", amount: "€400" },
  { label: "Powyżej 3500 km", distance: "Lot długodystansowy", amount: "do €600" },
];
const statistics = [
  { label: "Maksymalne odszkodowanie", value: "€600", description: "Najwyższa standardowa kwota na pasażera na podstawie EU261." },
  { label: "Próg opóźnienia", value: "3 h+", description: "Odszkodowanie za opóźnienie zwykle wymaga co najmniej trzech godzin opóźnienia w miejscu docelowym." },
  { label: "Ocena", value: "Indywidualna", description: "Prawo do odszkodowania zależy m.in. od lotu, zakłócenia i jego przyczyny." },
];
const timeline = [
  { title: "Zgłoś roszczenie", description: "Sprawdź lot, podaj dane pasażera i prześlij potrzebne dokumenty." },
  { title: "FlightClaimly ocenia sprawę", description: "Analizujemy informacje i przygotowujemy roszczenie przed kontaktem z linią lotniczą." },
  { title: "Linia lotnicza odpowiada", description: "Linia może uznać lub odrzucić roszczenie albo poprosić o dodatkowe informacje." },
  { title: "Otrzymujesz wypłatę", description: "Jeśli roszczenie zakończy się powodzeniem, FlightClaimly pomaga sfinalizować wypłatę." },
];
const claimProcess = ["Sprawdź dane lotu i opisz, co się wydarzyło.", "Oceniamy, które przepisy dotyczące praw pasażerów mogą mieć zastosowanie.", "Podaj dane pasażera i numer rezerwacji.", "Podpisz pełnomocnictwo, aby FlightClaimly mógł prowadzić roszczenie.", "Prześlij odpowiednie dokumenty.", "FlightClaimly składa roszczenie i kontaktuje się z linią lotniczą."];
const commonIssues = ["Opóźnienie lotu o ponad trzy godziny", "Odwołany lot", "Utracone połączenie", "Odmowa przyjęcia na pokład", "Problemy techniczne lub operacyjne"];

function base(entityType: LocalizableKnowledgeEntityType, slug: string, title: string, description: string, content: KnowledgeLocalization["content"], displayName?: string): KnowledgeLocalization {
  return { entityType, entitySlug: slug, displayName, locale: "pl", source: "human", status: "publishable", metadata: { title, description }, content, quality: { metadataReviewed: true, terminologyReviewed: true, legalMeaningReviewed: true, contentReviewed: true }, updatedAt: "2026-09-07" };
}

export function buildPolishRouteLocalization(route: FlightRoute): KnowledgeLocalization {
  const origin = polishCityName(route.origin.city), destination = polishCityName(route.destination.city), name = `${origin}–${destination}`;
  return base("route", route.slug, `${origin} – ${destination}: odszkodowanie za lot | FlightClaimly`, `Sprawdź, czy przysługuje Ci odszkodowanie za opóźniony lub odwołany lot z ${origin} do ${destination}.`, {
    intro: `Lecisz z ${origin} do ${destination}? W przypadku dużego opóźnienia, odwołania lotu lub innego kwalifikującego się zakłócenia możesz mieć prawo do odszkodowania.`,
    overview: `Na trasie ${name} prawa pasażerów wynikające z EU261 lub innych właściwych przepisów zależą od miejsca wylotu, miejsca docelowego, przewoźnika wykonującego lot i okoliczności zakłócenia.`,
    passengerRights: "Przy opóźnieniu wynoszącym co najmniej trzy godziny w miejscu docelowym odszkodowanie może przysługiwać, jeśli spełnione są pozostałe warunki. Ochrona może obejmować także odwołanie lotu, utracone połączenie i odmowę przyjęcia na pokład.",
    compensationIntro: "Kwota odszkodowania zależy m.in. od odległości lotu i mających zastosowanie przepisów.", compensationAmounts: amounts,
    compensationRules: `Prawo do odszkodowania na trasie ${name} zależy od konkretnej podróży i przyczyny zakłócenia. Nadzwyczajne okoliczności mogą wyłączyć standardowe odszkodowanie, ale pozostałe obowiązki linii lotniczej ocenia się oddzielnie.`,
    statisticsIntro: `Poniżej przedstawiamy typowe punkty wyjścia przy ocenie odszkodowania na trasie ${name}.`, statistics,
    timelineIntro: `Po zgłoszeniu sprawy dotyczącej trasy ${name} FlightClaimly pomaga przejść przez kolejne etapy.`, timeline, claimProcess, commonIssues,
    faq: [
      { question: `Czy mogę otrzymać odszkodowanie za opóźniony lot z ${origin} do ${destination}?`, answer: "Tak, może to być możliwe. Ocenia się m.in. opóźnienie w miejscu docelowym, właściwe przepisy i przyczynę zakłócenia." },
      { question: "Ile odszkodowania mogę otrzymać?", answer: "Na podstawie EU261 standardowe kwoty to zwykle €250, €400 lub €600, zależnie m.in. od odległości lotu i spełnienia warunków prawnych." },
      { question: "Czy sprawdzenie lotu jest płatne?", answer: "Nie. Możesz sprawdzić lot i rozpocząć ocenę bez opłaty z góry." },
    ],
  }, `${origin} – ${destination}`);
}

export function buildPolishAirportLocalization(airport: Airport): KnowledgeLocalization {
  const city = polishCityName(airport.city);
  return base("airport", airport.slug, `${airport.name} (${airport.iata}) – odszkodowanie za lot | FlightClaimly`, `Sprawdź prawa pasażera w przypadku opóźnienia lub odwołania lotu z lub do ${airport.name} (${airport.iata}).`, {
    intro: `Jeśli Twój lot z lub do ${airport.name} został opóźniony albo odwołany, możesz mieć prawo do odszkodowania.`,
    overview: `${airport.name} (${airport.iata}) obsługuje miasto ${city}. Zakres praw pasażera zależy od konkretnego lotu, przewoźnika wykonującego lot i przyczyny zakłócenia.`,
    passengerRights: "EU261 może zapewniać standardowe odszkodowanie m.in. za duże opóźnienia, niektóre odwołania lotów i odmowę przyjęcia na pokład, gdy spełnione są warunki rozporządzenia.",
    compensationIntro: "Kwota standardowego odszkodowania na podstawie EU261 zależy m.in. od odległości lotu.", compensationAmounts: amounts,
    compensationRules: "Opóźnienie wynoszące co najmniej trzy godziny w miejscu docelowym może uprawniać do odszkodowania, jeśli spełnione są pozostałe warunki i linia lotnicza nie wykaże właściwych nadzwyczajnych okoliczności.",
    statisticsIntro: `Typowe punkty wyjścia dla roszczeń dotyczących lotów z lub do ${airport.name}.`, statistics,
    timelineIntro: "FlightClaimly analizuje lot i dokumenty przed dalszym prowadzeniem kwalifikującego się roszczenia.", timeline, claimProcess, commonIssues,
    faq: [
      { question: `Czy mogę otrzymać odszkodowanie za opóźnienie na ${airport.name}?`, answer: "Może to być możliwe. Ocenia się m.in. opóźnienie w miejscu docelowym, trasę, przewoźnika wykonującego lot i przyczynę zakłócenia." },
      { question: "Czy EU261 obejmuje wszystkie loty z tego lotniska?", answer: "Nie. Zależy to od konkretnego lotu, w tym miejsca rozpoczęcia podróży i przewoźnika wykonującego lot." },
      { question: "Jak sprawdzić mój lot?", answer: "Wprowadź dane lotu w FlightClaimly, aby sprawa mogła zostać oceniona na podstawie rzeczywistej podróży." },
    ],
  });
}

export function buildPolishAirlineLocalization(airline: Airline): KnowledgeLocalization {
  return base("airline", airline.slug, `${airline.name} – odszkodowanie za lot | FlightClaimly`, `Sprawdź, czy przysługuje Ci odszkodowanie za opóźniony lub odwołany lot linią ${airline.name}.`, {
    intro: `Jeśli Twój lot linią ${airline.name} został opóźniony, odwołany lub spowodował utratę połączenia, możesz mieć prawo do odszkodowania.`,
    overview: `${airline.name} to linia lotnicza o kodzie IATA ${airline.iata}. Prawo do odszkodowania ocenia się na podstawie konkretnego lotu i zakłócenia, a nie tylko nazwy przewoźnika.`,
    passengerRights: "EU261 może zapewniać pasażerom standardowe odszkodowanie m.in. przy co najmniej trzygodzinnym opóźnieniu w miejscu docelowym, niektórych odwołaniach lotów i odmowie przyjęcia na pokład.",
    compensationIntro: "Gdy EU261 ma zastosowanie, standardowe kwoty odszkodowania wynoszą zwykle €250, €400 lub €600, zależnie m.in. od odległości.", compensationAmounts: amounts,
    compensationRules: `W roszczeniu wobec ${airline.name} należy ocenić m.in. lot, opóźnienie w miejscu docelowym i przyczynę zakłócenia. Nadzwyczajne okoliczności mogą wpływać na prawo do standardowego odszkodowania.`,
    statisticsIntro: `Typowe punkty wyjścia przy roszczeniach wobec ${airline.name}.`, statistics,
    timelineIntro: `Po zgłoszeniu sprawy dotyczącej ${airline.name} FlightClaimly analizuje dokumenty i prowadzi dalej kwalifikujące się roszczenie.`, timeline, claimProcess, commonIssues,
    faq: [
      { question: `Czy mogę otrzymać odszkodowanie od ${airline.name} za opóźnienie?`, answer: "Tak, jeśli dany lot podlega właściwym przepisom i spełnione są pozostałe warunki." },
      { question: `Ile odszkodowania może zapłacić ${airline.name}?`, answer: "Gdy EU261 ma zastosowanie, standardowe kwoty wynoszą zwykle €250, €400 lub €600 na pasażera, zależnie m.in. od odległości." },
      { question: "Co jeśli linia powołuje się na nadzwyczajne okoliczności?", answer: "Przyczynę i działania linii należy ocenić indywidualnie. Taki argument nie oznacza automatycznie utraty wszystkich praw pasażera." },
    ],
  });
}

export function buildPolishCountryLocalization(country: Country): KnowledgeLocalization {
  const name = polishCountryName(country.name);
  return base("country", country.slug, `${name}: odszkodowanie za lot | FlightClaimly`, `Poznaj prawa pasażerów i sprawdź odszkodowanie za opóźnione lub odwołane loty związane z krajem ${name}.`, {
    intro: `W przypadku dużego opóźnienia, odwołania lotu lub innego kwalifikującego się zakłócenia podróży związanej z krajem ${name} możesz mieć prawo do odszkodowania.`,
    overview: `Prawa pasażerów w podróżach związanych z krajem ${name} zależą od konkretnej trasy, przewoźnika wykonującego lot i właściwych przepisów.`,
    passengerRights: "Gdy EU261 ma zastosowanie, pasażerowie mogą mieć prawo do standardowego odszkodowania m.in. przy co najmniej trzygodzinnym opóźnieniu w miejscu docelowym, niektórych odwołaniach i odmowie przyjęcia na pokład.",
    compensationIntro: "Gdy EU261 ma zastosowanie, standardowa kwota odszkodowania zależy m.in. od odległości lotu.", compensationAmounts: amounts,
    compensationRules: `Sam związek lotu z krajem ${name} nie oznacza automatycznie prawa do odszkodowania. Lot i przyczynę zakłócenia należy ocenić zgodnie z przepisami, które rzeczywiście mają zastosowanie.`,
    statisticsIntro: `Typowe punkty wyjścia dotyczące praw pasażerów w lotach związanych z krajem ${name}.`, statistics,
    timelineIntro: "FlightClaimly analizuje lot i dokumenty przed dalszym prowadzeniem kwalifikującego się roszczenia.", timeline, claimProcess, commonIssues,
    faq: [
      { question: `Czy mogę otrzymać odszkodowanie za lot w kraju ${name}?`, answer: "Może to być możliwe, jeśli dany lot podlega EU261 lub innym właściwym przepisom i spełnione są warunki odszkodowania." },
      { question: "Czy trzy godziny opóźnienia zawsze wystarczą?", answer: "Nie. Trzy godziny opóźnienia w miejscu docelowym to ważny próg w wielu roszczeniach EU261, ale trzeba też ocenić zakres zastosowania przepisów i przyczynę zakłócenia." },
      { question: "Jak rozpocząć sprawdzanie?", answer: "Wprowadź dane lotu w FlightClaimly, abyśmy mogli ocenić rzeczywistą podróż i zakłócenie." },
    ],
  }, name);
}