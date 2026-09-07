import type { DelayReasonAssessmentProfile } from "@/lib/delay-reasons/assessment";

type DanishAssessmentCopy = Pick<
  DelayReasonAssessmentProfile,
  "summary" | "evidenceTargets" | "airlineQuestions" | "claimantSignals" | "nextStep"
>;

const copy: Record<string, DanishAssessmentCopy> = {
  "technical-problems": {
    summary: "Almindelige tekniske fejl ligger normalt inden for flyselskabets drift. Den præcise fejl er stadig vigtig, fordi usædvanlige eksterne fejl kan vurderes anderledes.",
    evidenceTargets: ["Flyselskabets angivne forstyrrelsesårsag og tekniske beskrivelse", "Vedligeholdelses- eller fejlkategori, hvis den findes", "Flyets bevægelser og tidslinje for et eventuelt erstatningsfly", "Om flyselskabet henviser til en ekstern hændelse eller en skjult fejl"],
    airlineQuestions: ["Hvilken konkret teknisk fejl forårsagede forstyrrelsen?", "Hvornår blev fejlen opdaget, og hvilke tiltag blev iværksat?", "Hvorfor mener flyselskabet eventuelt, at hændelsen var ekstraordinær?", "Hvilke rimelige alternativer, herunder andet fly, blev overvejet?"],
    claimantSignals: ["Generelle formuleringer som teknisk problem uden nærmere forklaring", "Lang forsinkelse mens samme fly fortsat anvendes i rotationen", "Erstatningsfly eller besætning blev først tilgængelige væsentligt senere"],
    nextStep: "Fastlæg den faktiske fejl, før et forsvar om ekstraordinære omstændigheder accepteres.",
  },
  "bad-weather": {
    summary: "Alvorligt vejr kan være ekstraordinært, men vejret skal have været operationelt relevant for netop denne flyvning og dette tidsrum.",
    evidenceTargets: ["Vejret ved afgangslufthavnen, destinationen og relevante alternative lufthavne", "Lufthavns- eller luftrumsrestriktioner i forstyrrelsesperioden", "Hvordan sammenlignelige flyvninger faktisk blev gennemført", "Flyets rotation før den berørte flyvning"],
    airlineQuestions: ["Hvilket konkret vejrforhold forhindrede eller begrænsede flyvningen væsentligt?", "På hvilken lufthavn eller del af ruten opstod forholdet?", "Hvilken direkte operationel konsekvens havde det for netop denne flyvning?", "Hvilke rimelige tiltag blev iværksat for at begrænse forstyrrelsen eller ombooke passagerer?"],
    claimantSignals: ["Vejr oplyses for en anden lufthavn eller langt tidligere på dagen", "Sammenlignelige flyvninger opererer, mens flyselskabet kun giver en generel vejrforklaring", "En lang følgeforsinkelse uden tydelig årsagskæde"],
    nextStep: "Verificér tidspunkt, sted og årsagssammenhæng, før vejret behandles som et fuldt ansvarsfritagende forhold.",
  },
  "air-traffic-control": {
    summary: "Eksterne restriktioner fra flyvekontrollen kan være ekstraordinære. Restriktionen skal stadig kunne knyttes til den berørte flyvning og den konkrete forsinkelsestid.",
    evidenceTargets: ["Tidspunkt for ATC-slot eller flowrestriktion", "Luftrums- eller lufthavnsrestriktion, der påvirkede ruten", "Flyets faktiske bevægelsestider", "Den operationelle genopretning efter at restriktionen ophørte"],
    airlineQuestions: ["Hvilken konkret ATC-foranstaltning påvirkede denne flyvning?", "Hvor stor en del af forsinkelsen skyldtes direkte den foranstaltning?", "Bidrog andre problemer inden for flyselskabets kontrol til den resterende forsinkelse?", "Hvilke rimelige tiltag blev iværksat efter at restriktionen ændrede sig eller ophørte?"],
    claimantSignals: ["ATC oplyses uden en flyspecifik slot eller restriktion", "Forsinkelsen fortsætter væsentligt efter at den eksterne restriktion er ophørt", "Besætnings-, teknik- eller rotationsproblemer indgår i samme hændelseskæde"],
    nextStep: "Adskil den eksternt forårsagede forsinkelse fra yderligere forsinkelse inden for flyselskabets kontrol.",
  },
  "airline-staff-strike": {
    summary: "Arbejdskonflikter blandt flyselskabets eget personale er ikke automatisk ekstraordinære og skal skelnes fra strejker hos uafhængige tredjeparter.",
    evidenceTargets: ["Hvem der strejkede, og hvem der var deres arbejdsgiver", "Strejkens datoer og operationelle påvirkning", "Flyselskabets meddelelser om aflysning eller ombooking", "Tiltag for at begrænse forstyrrelsen og brug af reserveressourcer"],
    airlineQuestions: ["Var de strejkende ansat hos det opererende flyselskab?", "Hvilken del af driften blev påvirket?", "Hvilke afværgeforanstaltninger var tilgængelige og blev anvendt?"],
    claimantSignals: ["Flyselskabet klassificerer enhver strejke som ekstraordinær uden at identificere, hvem der strejkede", "En intern besætningsstrejke beskrives som en ekstern lufthavnsstrejke"],
    nextStep: "Fastlæg hvem der strejkede, før hændelsen klassificeres efter EU261.",
  },
  "crew-shortage": {
    summary: "Normal bemandingsplanlægning og reservebemanding er som udgangspunkt operationelle forhold for flyselskabet. Hvis besætningen har overskredet tjenestetiden, skal den bagvedliggende årsag spores.",
    evidenceTargets: ["Årsagen til at den planlagte besætning ikke var tilgængelig", "Tidslinje for tjenestetid og eventuel timeout", "Tilgængelighed af reservebesætning eller muligheder for at positionere anden besætning", "Tidligere flyforstyrrelse der førte til, at besætningen kom ud af position"],
    airlineQuestions: ["Hvorfor var der ingen lovlig operationel besætning tilgængelig?", "Var reservebesætning tilgængelig eller overvejet?", "Skyldtes besætningsproblemet en tidligere ekstraordinær hændelse?"],
    claimantSignals: ["Operationelle årsager bruges i stedet for en konkret besætningsforklaring", "Besætningen overskrider tjenestetiden efter en lang teknisk eller rotationsrelateret forsinkelse inden for flyselskabets kontrol"],
    nextStep: "Spor besætningens utilgængelighed tilbage til den første væsentlige årsag.",
  },
  "late-incoming-aircraft": {
    summary: "Et forsinket indkommende fly beskriver en følgeforsinkelse, ikke den juridiske grundårsag. Den foregående flyvning og den oprindelige forstyrrelse skal rekonstrueres.",
    evidenceTargets: ["Flyets registrering, hvis tilgængelig", "Den foregående flyvning og dens faktiske ankomsttid", "Den oprindelige årsag til forsinkelsen på den foregående strækning", "Muligheder for flyskifte og operationel genopretning"],
    airlineQuestions: ["Hvilken tidligere flyvning gjorde, at flyet ankom sent?", "Hvad forårsagede den tidligere forsinkelse?", "Hvorfor kunne et andet fly ikke rimeligt anvendes?"],
    claimantSignals: ["Flyselskabet giver ingen anden forklaring end forsinket indkommende fly", "Flere rotationer adskiller passagerens fly fra den påståede eksterne hændelse", "Et flyskifte virker operationelt muligt, men forklares ikke"],
    nextStep: "Rekonstruér flyrotationen baglæns, indtil den reelle grundårsag er identificeret.",
  },
  "bird-strike": {
    summary: "En reel fuglekollision ligger normalt uden for flyselskabets normale drift, men årsagssammenhængen, forsinkelsens længde og flyselskabets rimelige tiltag skal stadig vurderes.",
    evidenceTargets: ["At fuglekollisionen faktisk fandt sted, og hvilket fly der blev berørt", "Tidslinje for inspektion eller skade", "Muligheder for at anvende et andet fly", "Hvor stor en del af tiden der skyldtes inspektion sammenlignet med senere operationelle problemer"],
    airlineQuestions: ["Hvornår og hvor fandt fuglekollisionen sted?", "Var passagerens fly direkte berørt?", "Hvor lang tid tog den nødvendige inspektion eller reparation?", "Hvilke rimelige alternativer for erstatningsfly eller genopretning blev overvejet?"],
    claimantSignals: ["Fuglekollisionen vedrørte et andet fly, og forbindelsen er uklar", "Forsinkelsen fortsætter længe efter inspektionen uden nærmere forklaring"],
    nextStep: "Bekræft kollisionen, årsagssammenhængen og den tid, der faktisk kan henføres til den eksterne hændelse.",
  },
  "airport-closure": {
    summary: "En eksternt besluttet lukning af en lufthavn kan være ekstraordinær, men tidspunktet og den direkte effekt på den berørte flyvning skal fastlægges.",
    evidenceTargets: ["Meddelelse om lufthavnslukningen og det præcise tidsrum", "Årsagen til lukningen", "Flyvningens planlagte og faktiske tider", "Muligheder for ombooking eller brug af alternativ lufthavn"],
    airlineQuestions: ["Hvem besluttede lukningen, og i hvilket tidsrum?", "Var lufthavnen lukket, da denne flyvning skulle have opereret?", "Hvilke alternativer for ombooking eller operationel genopretning blev overvejet?"],
    claimantSignals: ["Lukningen ophørte, før en væsentlig del af forsinkelsen var opstået", "Flyvningen kunne potentielt have opereret fra eller til en alternativ lufthavn"],
    nextStep: "Sammenhold lukningens tidsrum med passagerens præcise planlagte flyvning.",
  },
  "security-issue": {
    summary: "Reelle sikkerhedshændelser kan være ekstraordinære, men vage henvisninger til sikkerhed skal kunne knyttes til en konkret hændelse og en faktisk operationel konsekvens.",
    evidenceTargets: ["Sikkerhedshændelsens art og sted", "Restriktion fra myndighed eller lufthavn, hvis den findes", "Flyspecifik påvirkning og varighed", "Tiltag for genopretning og ombooking"],
    airlineQuestions: ["Hvilken sikkerhedshændelse påvirkede flyvningen?", "Blev den pålagt af en ekstern myndighed eller forårsaget internt?", "Hvor længe forhindrede hændelsen normal drift?"],
    claimantSignals: ["Sikkerhed oplyses uden at en konkret hændelse identificeres", "Den operationelle forsinkelse fortsætter efter at restriktionerne er ophævet"],
    nextStep: "Fastlæg den specifikke eksterne sikkerhedshændelse, før klassificeringen accepteres.",
  },
  "hidden-manufacturing-defect": {
    summary: "En reel skjult fabrikationsfejl kan behandles anderledes end almindelige tekniske fejl, men flyselskabet skal dokumentere, at der er tale om en usædvanlig fejl og ikke blot ommærke et normalt teknisk problem.",
    evidenceTargets: ["Meddelelse fra producent, direktiv eller anden dokumentation om fejlen", "Det berørte fly eller komponent", "Datoen hvor fejlen blev kendt", "Flyselskabets tiltag og eventuelle flådeomfattende handlinger"],
    airlineQuestions: ["Hvilken producentidentificeret fejl påberåbes?", "Var fejlen skjult og umulig at opdage gennem normalt vedligehold?", "Hvornår blev flyselskabet informeret, og hvilke handlinger fulgte?"],
    claimantSignals: ["Ingen dokumentation fra producenten identificeres", "En almindelig komponentfejl beskrives som en skjult fabrikationsfejl"],
    nextStep: "Kræv dokumentation, der adskiller en skjult fabrikationsfejl fra en almindelig teknisk fejl.",
  },
  "operational-reasons": {
    summary: "Operationelle årsager er for bredt et udtryk til i sig selv at afgøre ansvar efter EU261. Den reelle bagvedliggende hændelse skal identificeres.",
    evidenceTargets: ["Detaljeret beskrivelse af forstyrrelsesårsagen", "Fly- og besætningsrotation", "Tekniske hændelser, lufthavnsproblemer, vejr eller ATC-restriktioner", "Flyselskabets tiltag for operationel genopretning"],
    airlineQuestions: ["Hvilken konkret hændelse menes der med operationelle årsager?", "Lå hændelsen inden for flyselskabets kontrol eller udenfor?", "Hvornår opstod den, og hvordan påvirkede den netop denne flyvning?"],
    claimantSignals: ["Ingen konkret grundårsag oplyses", "Betegnelsen operationelle årsager ændrer sig senere til en anden forklaring", "Tidslinjen peger på bemanding, teknik eller rotation inden for flyselskabets normale drift"],
    nextStep: "Accepter ikke operationelle årsager som slutklassifikation; identificér den faktiske grundårsag først.",
  },
};

export function localizeDelayReasonAssessmentDa(
  assessment: DelayReasonAssessmentProfile,
): DelayReasonAssessmentProfile {
  const localized = copy[assessment.slug];
  if (!localized) return assessment;
  return { ...assessment, ...localized };
}
