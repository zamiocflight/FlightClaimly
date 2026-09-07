import type { DelayReason } from "@/data/delay-reasons/types";

const names: Record<string, string> = {
  "technical-problems": "Tekniske problemer",
  "bad-weather": "Dårligt vejr",
  "air-traffic-control": "Restriktioner fra flyvekontrollen",
  "airline-staff-strike": "Strejke blandt flyselskabets personale",
  "crew-shortage": "Mangel på besætning",
  "late-incoming-aircraft": "Forsinket indkommende fly",
  "bird-strike": "Fuglekollision",
  "airport-closure": "Lukket lufthavn",
  "security-issue": "Sikkerhedsproblem",
  "hidden-manufacturing-defect": "Skjult fabrikationsfejl",
  "operational-reasons": "Operationelle årsager",
};

const causeCopy: Record<string, { overview: string; rules: string }> = {
  "technical-problems": { overview: "Almindelige tekniske fejl, der opstår som led i flyselskabets normale drift, er som udgangspunkt ikke ekstraordinære omstændigheder efter EU261.", rules: "Rutinemæssige tekniske fejl, mekaniske problemer og almindeligt vedligehold fritager derfor ikke automatisk flyselskabet for kompensationsansvar. En reel ekstern og usædvanlig fejl kan vurderes anderledes." },
  "bad-weather": { overview: "Vejr kan være en ekstraordinær omstændighed, når forholdene faktisk er uforenelige med sikker flyvning. En generel henvisning til dårligt vejr er ikke i sig selv tilstrækkelig.", rules: "Der skal være en reel årsagssammenhæng mellem vejret og den konkrete forstyrrelse. Flyselskabets rimelige foranstaltninger for at undgå eller begrænse forstyrrelsen er også relevante." },
  "air-traffic-control": { overview: "Beslutninger fra flyvekontrollen ligger normalt uden for flyselskabets kontrol og kan udgøre ekstraordinære omstændigheder.", rules: "En ATC-restriktion skal faktisk have forårsaget forstyrrelsen. Selv når standardkompensation ikke skal betales, kan retten til ombooking, tilbagebetaling og omsorg bestå." },
  "airline-staff-strike": { overview: "En strejke blandt flyselskabets eget personale er ikke automatisk en ekstraordinær omstændighed. Interne og eksterne strejker kan behandles forskelligt efter EU-retten.", rules: "Det er vigtigt at fastslå, hvem der strejkede. Arbejdskonflikter blandt flyselskabets egne ansatte kan ligge inden for den normale drift, mens en ekstern strejke kan vurderes anderledes." },
  "crew-shortage": { overview: "Bemanding og reserveplanlægning er normalt en del af flyselskabets løbende drift. Almindelig personalemangel bliver ikke ekstraordinær, blot fordi flyselskabet kalder det et bemandingsproblem.", rules: "Den bagvedliggende årsag til den manglende besætning er afgørende. Et usædvanligt eksternt hændelsesforløb kan kræve en anden vurdering." },
  "late-incoming-aircraft": { overview: "Et forsinket indkommende fly beskriver, hvordan en forsinkelse har spredt sig, men ikke hvorfor den oprindelige forstyrrelse opstod.", rules: "Den bagvedliggende årsag i flyets tidligere rotation skal spores. En tidligere ekstraordinær hændelse kan vurderes anderledes end et almindeligt teknisk, bemandings- eller operationelt problem." },
  "bird-strike": { overview: "En fuglekollision er normalt en ekstern hændelse, som kan udgøre en ekstraordinær omstændighed.", rules: "Flyselskabet skal stadig kunne knytte fuglekollisionen til forstyrrelsen og vise, at rimelige foranstaltninger ikke kunne have undgået den endelige forsinkelse." },
  "airport-closure": { overview: "En eksternt besluttet lukning af en lufthavn ligger normalt uden for flyselskabets kontrol og kan være en ekstraordinær omstændighed.", rules: "Standardkompensation og pligterne til ombooking, tilbagebetaling og omsorg er separate spørgsmål. Selv ved en lukning kan flyselskabet være forpligtet til at overveje rimelige alternativer." },
  "security-issue": { overview: "Alvorlige sikkerhedsrisici og eksterne sikkerhedsforanstaltninger kan udgøre ekstraordinære omstændigheder.", rules: "En vag henvisning til sikkerhed er ikke nok. Den konkrete hændelse, forbindelsen til flyvningen og flyselskabets rimelige foranstaltninger skal vurderes." },
  "hidden-manufacturing-defect": { overview: "En skjult fabrikationsfejl, som er identificeret af producenten eller en kompetent myndighed, kan i visse tilfælde være ekstraordinær. Det er en langt snævrere kategori end almindelige tekniske fejl.", rules: "Flyselskabet skal kunne dokumentere, at der er tale om en reel usædvanlig fabrikationsfejl og knytte den til forstyrrelsen." },
  "operational-reasons": { overview: "“Operationelle årsager” er en bred betegnelse, ikke en selvstændig ekstraordinær omstændighed. Den reelle bagvedliggende årsag skal identificeres.", rules: "Bemanding, rotation, planlægning, ground handling og tekniske fejl kan alle gemme sig bag udtrykket. EU261-vurderingen skal tage udgangspunkt i den faktiske årsag og hændelseskæden." },
};

export function buildDanishDelayReason(delayReason: DelayReason): DelayReason {
  const title = names[delayReason.slug] ?? delayReason.title;
  const copy = causeCopy[delayReason.slug];
  if (!copy) return delayReason;
  const extraordinary = delayReason.extraordinaryCircumstance;
  return {
    ...delayReason,
    title,
    description: `Læs hvornår ${title.toLowerCase()} kan påvirke din ret til flykompensation efter EU261, og hvilke andre passagerrettigheder der kan bestå.`,
    overview: copy.overview,
    passengerRights: extraordinary
      ? "Selv når en ekstraordinær omstændighed betyder, at fast standardkompensation ikke skal betales, kan retten til omsorg, ombooking eller tilbagebetaling bestå. Den konkrete årsag og dens sammenhæng med flyvningen skal vurderes."
      : "Hvis forstyrrelsen medførte mindst tre timers forsinkelse ved den endelige destination, en kvalificerende aflysning eller en anden kompensationsberettigende hændelse, kan EU261 give ret til kompensation, når de øvrige betingelser er opfyldt.",
    compensationRules: copy.rules,
    statisticsIntro: `Vurderingen af ${title.toLowerCase()} skal tage udgangspunkt i den faktiske årsag, virkningen på den konkrete flyvning og flyselskabets handlinger.`,
    statistics: [
      { label: "Ekstraordinær omstændighed", value: extraordinary ? "Kan være" : "Normalt ikke", description: extraordinary ? "Den konkrete hændelse og årsagssammenhængen skal stadig dokumenteres." : "Denne type årsag ligger ofte inden for flyselskabets normale drift, men de konkrete fakta er afgørende." },
      { label: "Fast EU261-kompensation", value: extraordinary ? "Afhænger af sagen" : "Kan være mulig", description: "Reglernes anvendelsesområde, forsinkelsen eller aflysningen og den reelle årsag skal vurderes samlet." },
      { label: "Omsorg og ombooking", value: "Separate rettigheder", description: "Disse rettigheder kan bestå, selv når fast standardkompensation ikke skal betales." },
    ],
    timelineIntro: `En sag om ${title.toLowerCase()} skal knytte den oplyste årsag til den faktiske flyforstyrrelse.`,
    timeline: [
      { title: "Forstyrrelsen opstår", description: "Flyet bliver forsinket, aflyst eller påvirket på anden måde." },
      { title: "Årsagen fastlægges", description: `Dokumentation om ${title.toLowerCase()} og tidspunktet gennemgås.` },
      { title: "Årsagssammenhæng og foranstaltninger vurderes", description: "Vi vurderer, om årsagen faktisk forklarer forstyrrelsen, og hvilke rimelige foranstaltninger der var til rådighed." },
      { title: "Passagerrettighederne vurderes", description: "Standardkompensation og separate rettigheder til omsorg, ombooking eller tilbagebetaling vurderes hver for sig." },
    ],
    faqIntro: `Ofte stillede spørgsmål om ${title.toLowerCase()} og flykompensation.`,
    faq: [
      { question: `Er ${title.toLowerCase()} altid en ekstraordinær omstændighed?`, answer: extraordinary ? "Ikke automatisk. Hændelsen skal opfylde de juridiske krav og faktisk have forårsaget den konkrete forstyrrelse." : "Normalt ikke som kategori, men den reelle bagvedliggende årsag og omstændighederne i den enkelte sag skal altid vurderes." },
      { question: "Kan jeg stadig have ret til ombooking eller omsorg?", answer: "Ja. Rettigheder til ombooking, tilbagebetaling og omsorg skal vurderes særskilt fra retten til fast standardkompensation." },
      { question: "Hvad skal flyselskabet kunne dokumentere?", answer: "Flyselskabet skal kunne forklare den konkrete årsag, dens forbindelse til flyvningen og hvilke rimelige foranstaltninger der blev truffet." },
    ],
  };
}
