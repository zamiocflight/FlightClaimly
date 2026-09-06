import type { DelayReasonAssessmentProfile } from "@/lib/delay-reasons/assessment";

type SwedishAssessmentCopy = Pick<
  DelayReasonAssessmentProfile,
  "summary" | "evidenceTargets" | "airlineQuestions" | "claimantSignals" | "nextStep"
>;

const copy: Record<string, SwedishAssessmentCopy> = {
  "technical-problems": {
    summary:
      "Vanliga tekniska fel ligger normalt inom flygbolagets verksamhet. Det exakta felet är ändå viktigt eftersom exceptionella externa fel kan bedömas annorlunda.",
    evidenceTargets: [
      "Flygbolagets störningsorsak och tekniska beskrivning",
      "Underhålls- eller felkategori där sådan information finns",
      "Flygplanets rörelser och tidslinjen för eventuellt ersättningsflygplan",
      "Om flygbolaget hänvisar till en extern händelse eller ett dolt fel",
    ],
    airlineQuestions: [
      "Vilket specifikt tekniskt fel orsakade störningen?",
      "När upptäcktes felet och vilka åtgärder vidtogs?",
      "Varför anser flygbolaget att händelsen är extraordinär, om det gör det?",
      "Vilka rimliga åtgärder eller alternativ med annat flygplan övervägdes?",
    ],
    claimantSignals: [
      "Generella formuleringar som tekniskt problem utan närmare förklaring",
      "Lång försening medan samma flygplan fortfarande används i rotationen",
      "Ersättningsflygplan eller besättning blev tillgängliga först betydligt senare",
    ],
    nextStep:
      "Fastställ det faktiska felet innan ett försvar om extraordinära omständigheter accepteras.",
  },

  "bad-weather": {
    summary:
      "Allvarligt väder kan vara extraordinärt, men vädret måste ha varit operativt relevant för just det aktuella flyget och den aktuella tidsperioden.",
    evidenceTargets: [
      "Vädret på avgångsflygplatsen, destinationen och relevanta alternativflygplatser",
      "Flygplats- eller luftrumsrestriktioner under störningsperioden",
      "Hur jämförbara flygningar faktiskt opererade",
      "Flygplanets rotation före det berörda flyget",
    ],
    airlineQuestions: [
      "Vilket specifikt väderförhållande förhindrade eller begränsade flygningen väsentligt?",
      "På vilken flygplats eller del av rutten inträffade det?",
      "Vilken direkt operativ konsekvens fick det för just detta flyg?",
      "Vilka rimliga åtgärder för att begränsa störningen eller ordna ombokning vidtogs?",
    ],
    claimantSignals: [
      "Väder anges på en annan flygplats eller långt tidigare under dagen",
      "Jämförbara flygningar opererar medan flygbolaget endast lämnar en allmän väderförklaring",
      "En lång följdförsening utan tydlig orsakskedja",
    ],
    nextStep:
      "Verifiera tidpunkt, plats och orsakssamband innan vädret behandlas som ett fullständigt ansvarsbefriande skäl.",
  },

  "air-traffic-control": {
    summary:
      "Externa restriktioner från flygtrafikledningen kan vara extraordinära. Restriktionen måste ändå kunna kopplas till det berörda flyget och den aktuella förseningstiden.",
    evidenceTargets: [
      "Tidpunkt för ATC-slot eller trafikflödesrestriktion",
      "Luftrums- eller flygplatsrestriktion som påverkat rutten",
      "Flygets faktiska rörelsetider",
      "Den operativa återhämtningen efter att restriktionen upphörde",
    ],
    airlineQuestions: [
      "Vilken specifik ATC-åtgärd påverkade detta flyg?",
      "Hur stor del av förseningen berodde direkt på den åtgärden?",
      "Bidrog något annat problem inom flygbolagets kontroll till den återstående förseningen?",
      "Vilka rimliga åtgärder vidtogs efter att restriktionen ändrades eller upphörde?",
    ],
    claimantSignals: [
      "ATC anges utan en flygspecifik slot eller restriktion",
      "Förseningen fortsätter väsentligt efter att den externa restriktionen upphört",
      "Besättnings-, teknik- eller rotationsproblem förekommer i samma störningskedja",
    ],
    nextStep:
      "Separera den externt orsakade förseningen från eventuell ytterligare försening inom flygbolagets kontroll.",
  },

  "airline-staff-strike": {
    summary:
      "Stridsåtgärder bland flygbolagets egen personal är inte automatiskt extraordinära och måste skiljas från strejker bland oberoende tredje parter.",
    evidenceTargets: [
      "Vilka som strejkade och vem som var deras arbetsgivare",
      "Strejkens datum och operativa påverkan",
      "Flygbolagets meddelanden om inställning eller ombokning",
      "Åtgärder för att begränsa störningen och användning av reservresurser",
    ],
    airlineQuestions: [
      "Var de strejkande anställda av det opererande flygbolaget?",
      "Vilken del av verksamheten påverkades?",
      "Vilka åtgärder för att begränsa störningen fanns tillgängliga och användes?",
    ],
    claimantSignals: [
      "Flygbolaget klassar varje strejk som extraordinär utan att identifiera vilka som strejkade",
      "En intern besättningsstrejk beskrivs som en extern flygplatsstrejk",
    ],
    nextStep:
      "Fastställ vilka som strejkade innan händelsen klassificeras enligt EU261.",
  },

  "crew-shortage": {
    summary:
      "Normal bemanningsplanering och reservbemanning är i regel operativa frågor för flygbolaget. Om besättningen överskridit sin tjänstgöringstid behöver den bakomliggande orsaken spåras.",
    evidenceTargets: [
      "Orsaken till att den ordinarie besättningen inte var tillgänglig",
      "Tidslinje för tjänstgöringstid och eventuell timeout",
      "Tillgång till reservbesättning eller möjligheter att positionera annan besättning",
      "Tidigare flygstörning som ledde till att besättningen hamnade ur position",
    ],
    airlineQuestions: [
      "Varför fanns ingen laglig operativ besättning tillgänglig?",
      "Fanns reservbesättning tillgänglig eller övervägdes sådan?",
      "Orsakades besättningsproblemet av en tidigare extraordinär händelse?",
    ],
    claimantSignals: [
      "Operativa orsaker används i stället för en konkret förklaring om besättningen",
      "Besättningen överskrider tjänstgöringstiden efter en lång teknisk eller rotationsrelaterad försening inom flygbolagets kontroll",
    ],
    nextStep:
      "Spåra besättningens otillgänglighet tillbaka till den första materiella orsaken.",
  },

  "late-incoming-aircraft": {
    summary:
      "Sent inkommande flygplan beskriver en följdförsening, inte den juridiska grundorsaken. Föregående flygning och den ursprungliga störningen måste rekonstrueras.",
    evidenceTargets: [
      "Flygplanets registrering där sådan information finns",
      "Föregående flygning och dess faktiska ankomsttid",
      "Den ursprungliga orsaken till förseningen på föregående sträcka",
      "Möjligheter till flygplansbyte och operativ återhämtning",
    ],
    airlineQuestions: [
      "Vilken tidigare flygning gjorde att flygplanet anlände sent?",
      "Vad orsakade den tidigare förseningen?",
      "Varför kunde ett annat flygplan inte rimligen användas?",
    ],
    claimantSignals: [
      "Flygbolaget lämnar ingen annan förklaring än sent inkommande flygplan",
      "Flera rotationer skiljer passagerarens flyg från den påstådda externa händelsen",
      "Ett flygplansbyte verkar operativt möjligt men förklaras inte",
    ],
    nextStep:
      "Rekonstruera flygplansrotationen bakåt tills den verkliga grundorsaken har identifierats.",
  },

  "bird-strike": {
    summary:
      "En verklig fågelkollision ligger normalt utanför flygbolagets normala verksamhet, men orsakssambandet, förseningens längd och flygbolagets rimliga åtgärder behöver fortfarande granskas.",
    evidenceTargets: [
      "Att fågelkollisionen faktiskt inträffade och vilket flygplan som berördes",
      "Tidslinje för inspektion eller skada",
      "Möjligheter att använda ett annat flygplan",
      "Hur stor del av tiden som berodde på inspektion jämfört med senare operativa problem",
    ],
    airlineQuestions: [
      "När och var inträffade fågelkollisionen?",
      "Påverkades passagerarens flygplan direkt?",
      "Hur lång tid tog den nödvändiga inspektionen eller reparationen?",
      "Vilka rimliga alternativ för ersättningsflygplan eller återhämtning övervägdes?",
    ],
    claimantSignals: [
      "Fågelkollisionen gällde ett annat flygplan och kopplingen är oklar",
      "Förseningen fortsätter långt efter inspektionen utan närmare förklaring",
    ],
    nextStep:
      "Bekräfta kollisionen, orsakssambandet och den tid som faktiskt kan hänföras till den externa händelsen.",
  },

  "airport-closure": {
    summary:
      "En externt beslutad stängning av en flygplats kan vara extraordinär, men tidpunkten och den direkta effekten på det berörda flyget måste fastställas.",
    evidenceTargets: [
      "Meddelande om flygplatsens stängning och exakt tidsperiod",
      "Orsaken till stängningen",
      "Flygets tidtabell och faktiska rörelser",
      "Möjligheter till ombokning eller användning av alternativ flygplats",
    ],
    airlineQuestions: [
      "Vem beslutade om stängningen och under vilken tidsperiod?",
      "Var flygplatsen stängd när detta flyg skulle ha opererat?",
      "Vilka alternativ för ombokning eller operativ återhämtning övervägdes?",
    ],
    claimantSignals: [
      "Stängningen upphörde innan en väsentlig del av förseningen hade uppstått",
      "Flyget kunde potentiellt ha opererat från eller till en alternativ flygplats",
    ],
    nextStep:
      "Matcha stängningens tidsperiod mot passagerarens exakta planerade flygning.",
  },

  "security-issue": {
    summary:
      "Verkliga säkerhetshändelser kan vara extraordinära, men vaga hänvisningar till säkerhet måste kunna kopplas till en konkret händelse och en faktisk operativ konsekvens.",
    evidenceTargets: [
      "Säkerhetshändelsens art och plats",
      "Restriktion från myndighet eller flygplats där sådan finns",
      "Flygspecifik påverkan och varaktighet",
      "Åtgärder för återhämtning och ombokning",
    ],
    airlineQuestions: [
      "Vilken säkerhetshändelse påverkade flyget?",
      "Infördes den av en extern myndighet eller orsakades den internt?",
      "Hur länge förhindrade händelsen normal drift?",
    ],
    claimantSignals: [
      "Säkerhet anges utan att någon konkret händelse identifieras",
      "Den operativa förseningen fortsätter efter att restriktionerna hävts",
    ],
    nextStep:
      "Fastställ den specifika externa säkerhetshändelsen innan klassificeringen accepteras.",
  },

  "hidden-manufacturing-defect": {
    summary:
      "Ett verkligt dolt tillverkningsfel kan behandlas annorlunda än rutinmässiga tekniska fel, men flygbolaget behöver styrka att det rör sig om ett exceptionellt fel och inte bara ge ett vanligt tekniskt problem en annan etikett.",
    evidenceTargets: [
      "Meddelande från tillverkare, direktiv eller annan dokumentation om felet",
      "Berört flygplan eller komponent",
      "Datum då felet blev känt",
      "Flygbolagets åtgärder och eventuella åtgärder för hela flottan",
    ],
    airlineQuestions: [
      "Vilket av tillverkaren identifierat fel åberopas?",
      "Var felet dolt och omöjligt att upptäcka genom normalt underhåll?",
      "När informerades flygbolaget och vilka åtgärder följde?",
    ],
    claimantSignals: [
      "Ingen dokumentation från tillverkaren identifieras",
      "Ett vanligt komponentfel beskrivs som ett dolt tillverkningsfel",
    ],
    nextStep:
      "Kräv underlag som skiljer ett dolt tillverkningsfel från ett vanligt tekniskt fel.",
  },

  "operational-reasons": {
    summary:
      "Operativa orsaker är ett alltför brett uttryck för att avgöra ansvar enligt EU261. Den verkliga bakomliggande händelsen måste identifieras.",
    evidenceTargets: [
      "Detaljerad beskrivning av störningsorsaken",
      "Flygplans- och besättningsrotation",
      "Tekniska händelser, flygplatsproblem, väder eller ATC-restriktioner",
      "Flygbolagets åtgärder för operativ återhämtning",
    ],
    airlineQuestions: [
      "Vilken konkret händelse avses med operativa orsaker?",
      "Låg händelsen inom flygbolagets kontroll eller var den externt påtvingad?",
      "Vilka rimliga åtgärder vidtogs?",
    ],
    claimantSignals: [
      "Ingen konkret orsak anges",
      "Olika orsaker anges i olika meddelanden",
      "Flyghistoriken tyder på ett tekniskt problem, besättningsproblem eller rotationsproblem",
    ],
    nextStep:
      "Klassificera inte ansvaret förrän den generella etiketten operativa orsaker har brutits ned till en faktisk orsak.",
  },
};

export function localizeDelayReasonAssessmentSv(
  assessment: DelayReasonAssessmentProfile,
): DelayReasonAssessmentProfile {
  const localized = copy[assessment.slug];

  if (!localized) {
    return assessment;
  }

  return {
    ...assessment,
    ...localized,
  };
}
