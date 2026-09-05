import type { FlightNumber } from "@/data/flight-numbers/types";
import { getAirportIdentityBySlug } from "@/lib/knowledge/airports";
import type { KnowledgeLocalization } from "./types";

const finnishCityNames: Record<string, string> = {
  Athens: "Ateena", Brussels: "Bryssel", Bucharest: "Bukarest", Cairo: "Kairo", Cologne: "Köln", Copenhagen: "Kööpenhamina", Florence: "Firenze", Lisbon: "Lissabon", Milan: "Milano", Moscow: "Moskova", Munich: "München", Naples: "Napoli", Prague: "Praha", Rome: "Rooma", Seville: "Sevilla", Thessaloniki: "Thessaloniki", Venice: "Venetsia", Vienna: "Wien", Warsaw: "Varsova", Zurich: "Zürich",
};
function finnishCityName(city: string): string { return finnishCityNames[city] ?? city; }
function regulationLabel(flight: FlightNumber): string {
  if (flight.eu261Eligible && flight.uk261Eligible) return "EU261:n tai UK261:n nojalla";
  if (flight.eu261Eligible) return "EU261:n nojalla";
  if (flight.uk261Eligible) return "UK261:n nojalla";
  return "sovellettavien lentomatkustajien oikeuksia koskevien sääntöjen nojalla";
}
function compensationAmounts(flight: FlightNumber) {
  if (flight.eu261Eligible && flight.uk261Eligible) return [{ label: "Enintään 1 500 km", distance: "Lyhyen matkan lento", amount: "€250 / £220" }, { label: "1 500–3 500 km", distance: "Keskipitkän matkan lento", amount: "€400 / £350" }, { label: "Yli 3 500 km", distance: "Pitkän matkan lento", amount: "enintään €600 / £520" }];
  if (flight.eu261Eligible) return [{ label: "Enintään 1 500 km", distance: "Lyhyen matkan lento", amount: "€250" }, { label: "1 500–3 500 km", distance: "Keskipitkän matkan lento", amount: "€400" }, { label: "Yli 3 500 km", distance: "Pitkän matkan lento", amount: "enintään €600" }];
  if (flight.uk261Eligible) return [{ label: "Enintään 1 500 km", distance: "Lyhyen matkan lento", amount: "£220" }, { label: "1 500–3 500 km", distance: "Keskipitkän matkan lento", amount: "£350" }, { label: "Yli 3 500 km", distance: "Pitkän matkan lento", amount: "enintään £520" }];
  return [{ label: "Korvaus", distance: "Riippuu sovellettavista säännöistä", amount: "Arvioitava tapauskohtaisesti" }];
}
function compensationStatistics(flight: FlightNumber) {
  if (flight.eu261Eligible && flight.uk261Eligible) return [{ label: "Enimmäiskorvaus", value: "€600 / £520", description: "EU261:n ja UK261:n mukaiset korkeimmat tavanomaiset korvausmäärät." }, { label: "Viivästys lopullisessa määränpäässä", value: "3 h+", description: "Viivästymiseen perustuva korvausoikeus edellyttää yleensä vähintään kolmen tunnin myöhästymistä lopullisessa määränpäässä." }, { label: "Säännöstö", value: "EU261 / UK261", description: "Sovellettava säännöstö riippuu muun muassa reitistä ja lennosta vastaavasta lentoyhtiöstä." }];
  if (flight.eu261Eligible) return [{ label: "Enimmäiskorvaus", value: "€600", description: "EU261:n mukainen korkein tavanomainen korvaus matkustajaa kohden." }, { label: "Viivästys lopullisessa määränpäässä", value: "3 h+", description: "Korvausoikeus viivästyksestä edellyttää yleensä vähintään kolmen tunnin myöhästymistä lopullisessa määränpäässä." }, { label: "Säännöstö", value: "EU261", description: "Lentoon voivat soveltua EU:n lentomatkustajien oikeudet." }];
  if (flight.uk261Eligible) return [{ label: "Enimmäiskorvaus", value: "£520", description: "UK261:n mukainen korkein tavanomainen korvaus matkustajaa kohden." }, { label: "Viivästys lopullisessa määränpäässä", value: "3 h+", description: "Korvausoikeus viivästyksestä edellyttää yleensä vähintään kolmen tunnin myöhästymistä lopullisessa määränpäässä." }, { label: "Säännöstö", value: "UK261", description: "Lentoon voivat soveltua Yhdistyneen kuningaskunnan lentomatkustajien oikeudet." }];
  return [{ label: "Korvaus", value: "Tapauskohtainen", description: "Korvausoikeus ja korvauksen määrä riippuvat kyseiseen lentoon sovellettavista säännöistä." }, { label: "Arviointi", value: "Yksilöllinen", description: "Lähtöpaikka, lopullinen määränpää, lennosta vastaava lentoyhtiö ja häiriön syy on arvioitava." }, { label: "Säännöstö", value: "Selvitettävä", description: "Tällä sivulla ei oleteta automaattisesti, että EU261 tai UK261 soveltuu tähän lentoon." }];
}
export function buildFinnishFlightNumberLocalization(flight: FlightNumber): KnowledgeLocalization {
  const origin = getAirportIdentityBySlug(flight.originAirportSlug); const destination = getAirportIdentityBySlug(flight.destinationAirportSlug);
  const originCity = finnishCityName(origin?.city ?? origin?.name ?? flight.originAirportSlug); const destinationCity = finnishCityName(destination?.city ?? destination?.name ?? flight.destinationAirportSlug); const regulation = regulationLabel(flight);
  return {
    entityType: "flight-number", entitySlug: flight.slug, locale: "fi", source: "human", status: "publishable",
    metadata: { title: `${flight.airlineName} ${flight.flightNumber} lentokorvaus | FlightClaimly`, description: `Tarkista, voitko saada korvausta ${flight.airlineName}-lennon ${flight.flightNumber} viivästymisestä tai peruuntumisesta reitillä ${originCity}–${destinationCity} ${regulation}.` },
    content: {
      intro: `${flight.airlineName}-lento ${flight.flightNumber} on säännöllinen lentoyhteys reitillä ${originCity}–${destinationCity}.`,
      overview: `${flight.airlineName}-lennon ${flight.flightNumber} matkustajilla voi olla oikeus korvaukseen lennon viivästyessä, peruuntuessa tai muun merkittävän lentohäiriön yhteydessä.`,
      passengerRights: flight.eu261Eligible || flight.uk261Eligible ? `Lennon ${flight.flightNumber} matkustajiin voivat viivästymisen, peruuntumisen tai muun lentohäiriön yhteydessä soveltua lentomatkustajien oikeudet ${regulation}.` : `Lennon ${flight.flightNumber} matkustajien oikeudet riippuvat muun muassa lähtöpaikasta, lopullisesta määränpäästä, lennosta vastaavasta lentoyhtiöstä ja lentohäiriön syystä.`,
      compensationIntro: `Oikeus korvaukseen lennosta ${flight.flightNumber} riippuu muun muassa lentoreitistä, häiriön luonteesta, viivästyksestä lopullisessa määränpäässä ja sovellettavista säännöistä.`, compensationAmounts: compensationAmounts(flight),
      compensationRules: `Korvausta lennosta ${flight.flightNumber} voidaan maksaa, jos reittiä ${originCity}–${destinationCity} koskevat oikeudelliset edellytykset täyttyvät eikä sovellettavissa säännöissä tarkoitettu poikkeus estä korvausta.`,
      statisticsIntro: `Seuraavat tiedot kokoavat lennon ${flight.flightNumber} kannalta mahdollisesti olennaisia lentomatkustajien oikeuksia.`, statistics: compensationStatistics(flight),
      timelineIntro: `Kun olet lähettänyt korvausvaatimuksen lennosta ${flight.flightNumber}, FlightClaimly auttaa asian seuraavissa vaiheissa.`,
      timeline: [{ title: "Lähetä korvausvaatimus", description: "Tarkista lento, anna matkustajan tiedot ja lataa tarvittavat asiakirjat." }, { title: "FlightClaimly arvioi asian", description: "Tarkistamme tiedot ja valmistelemme vaatimuksen ennen yhteydenottoa lentoyhtiöön." }, { title: "Lentoyhtiö vastaa", description: "Lentoyhtiö käsittelee vaatimuksen ja voi hyväksyä tai hylätä sen tai pyytää lisätietoja." }, { title: "Saat korvauksen", description: "Jos vaatimus johtaa korvaukseen, FlightClaimly auttaa asian saattamisessa päätökseen." }],
      claimProcess: ["Tarkista lennon tiedot ja kuvaa lentohäiriö.", "Selvitä, mitä lentomatkustajien oikeuksia lentoon voi soveltua.", "Anna matkustajan tiedot ja varausnumero.", "Anna valtakirja, jotta FlightClaimly voi käsitellä vaatimusta.", "Lataa olennaiset asiakirjat.", "FlightClaimly toimittaa vaatimuksen ja hoitaa yhteydenpidon lentoyhtiön kanssa."],
      commonIssues: ["Saapuminen yli kolme tuntia myöhässä", "Lento peruutettu", "Jatkolento myöhästyi", "Lennolle pääsy evätty", "Tekninen vika", "Operatiivinen häiriö", "Miehistö puuttuu", "Lakko", "Huonot sääolosuhteet"],
      faq: [{ question: "Voinko saada korvausta viivästyneestä lennosta?", answer: `Mahdollisesti. Jos saavut lopulliseen määränpäähäsi vähintään kolme tuntia myöhässä ja muut edellytykset täyttyvät, sinulla voi olla oikeus korvaukseen ${regulation}.` }, { question: "Kuinka suuri korvaus voi olla?", answer: flight.eu261Eligible || flight.uk261Eligible ? `Korvauksen määrä riippuu lentomatkan pituudesta, häiriön olosuhteista ja lentoon ${flight.flightNumber} sovellettavista säännöistä.` : "Korvauksen määrä ja edellytykset riippuvat kyseiseen lentoon sovellettavista lentomatkustajien oikeuksia koskevista säännöistä." }, { question: "Mitä asiakirjoja tarvitsen?", answer: "Varausvahvistus tai tarkastuskortti riittää yleensä asian alustavaan arviointiin. Joissakin tapauksissa voidaan tarvita lisäasiakirjoja." }, { question: "Kuinka kauan käsittely kestää?", answer: "Käsittelyaika riippuu lentoyhtiöstä ja tapauksesta. Osa vaatimuksista ratkeaa muutamassa viikossa, mutta riitaiset asiat voivat kestää useita kuukausia." }, { question: "Maksaako palvelu etukäteen?", answer: "Ei. FlightClaimly veloittaa palkkion vain, jos korvaus saadaan perittyä sinulle." }],
    }, quality: { metadataReviewed: true, terminologyReviewed: true, legalMeaningReviewed: true, contentReviewed: true },
  };
}
