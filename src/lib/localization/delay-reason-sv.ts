import type { DelayReason } from "@/data/delay-reasons/types";

const names: Record<string, string> = {
  "technical-problems": "Tekniska problem",
  "bad-weather": "Dåligt väder",
  "air-traffic-control": "Flygtrafikledningsrestriktioner",
  "airline-staff-strike": "Strejk bland flygbolagets personal",
  "crew-shortage": "Personalbrist i flygbesättningen",
  "late-incoming-aircraft": "Sent inkommande flygplan",
  "bird-strike": "Fågelkollision",
  "airport-closure": "Stängd flygplats",
  "security-issue": "Säkerhetsproblem",
  "hidden-manufacturing-defect": "Dolt tillverkningsfel",
  "operational-reasons": "Operativa orsaker",
};

const causeCopy: Record<string, { overview: string; rules: string }> = {
  "technical-problems": { overview: "Vanliga tekniska fel som uppstår inom ett flygbolags normala verksamhet är normalt inte extraordinära omständigheter enligt EU261.", rules: "Rutinmässiga tekniska fel, mekaniska problem och normalt underhåll befriar därför inte automatiskt flygbolaget från ersättningsansvar. Ett verkligt externt och exceptionellt fel kan bedömas annorlunda." },
  "bad-weather": { overview: "Väder kan vara en extraordinär omständighet när förhållandena faktiskt är oförenliga med en säker flygning. En allmän hänvisning till dåligt väder är inte i sig tillräcklig.", rules: "Det behöver finnas ett verkligt orsakssamband mellan vädret och den aktuella störningen. Flygbolagets rimliga åtgärder för att undvika eller begränsa störningen är också relevanta." },
  "air-traffic-control": { overview: "Beslut från flygtrafikledningen ligger normalt utanför flygbolagets kontroll och kan utgöra extraordinära omständigheter.", rules: "En ATC-restriktion måste faktiskt ha orsakat störningen. Även när standardersättning inte ska betalas kan rätt till ombokning, återbetalning och omsorg finnas kvar." },
  "airline-staff-strike": { overview: "En strejk bland flygbolagets egen personal är inte automatiskt en extraordinär omständighet. Interna och externa strejker kan behandlas olika enligt EU-rätten.", rules: "Det är viktigt att fastställa vilka som strejkade. Arbetskonflikter bland flygbolagets egen personal kan ligga inom bolagets normala verksamhet, medan en extern strejk kan bedömas annorlunda." },
  "crew-shortage": { overview: "Bemanning och reservplanering är normalt en del av flygbolagets löpande verksamhet. Vanlig personalbrist blir inte extraordinär bara för att flygbolaget beskriver den som ett bemanningsproblem.", rules: "Den bakomliggande orsaken till att besättningen saknades är avgörande. Ett exceptionellt externt händelseförlopp kan kräva en annan bedömning." },
  "late-incoming-aircraft": { overview: "Ett sent inkommande flygplan beskriver hur en försening spridits, men inte varför den ursprungliga störningen uppstod.", rules: "Den bakomliggande orsaken i flygplanets tidigare rotation behöver spåras. En tidigare extraordinär händelse kan bedömas annorlunda än ett vanligt tekniskt, bemannings- eller operativt problem." },
  "bird-strike": { overview: "En fågelkollision är normalt en extern händelse som kan utgöra en extraordinär omständighet.", rules: "Flygbolaget behöver ändå kunna koppla fågelkollisionen till störningen och visa att rimliga åtgärder inte kunde undvika den slutliga förseningen." },
  "airport-closure": { overview: "En externt beslutad stängning av en flygplats ligger normalt utanför flygbolagets kontroll och kan vara en extraordinär omständighet.", rules: "Standardersättning och skyldigheterna att ordna ombokning, återbetalning och omsorg är separata frågor. Även vid en stängning kan flygbolaget behöva överväga rimliga alternativ." },
  "security-issue": { overview: "Allvarliga säkerhetsrisker och externa säkerhetsåtgärder kan utgöra extraordinära omständigheter.", rules: "En vag hänvisning till säkerhet räcker inte i sig. Den konkreta händelsen, dess koppling till flyget och flygbolagets rimliga åtgärder behöver bedömas." },
  "hidden-manufacturing-defect": { overview: "Ett dolt tillverkningsfel som identifierats av tillverkaren eller behörig myndighet kan i vissa fall vara extraordinärt. Det är en betydligt snävare kategori än vanliga tekniska fel.", rules: "Flygbolaget behöver kunna styrka att det rör sig om ett verkligt exceptionellt tillverkningsfel och koppla det till störningen." },
  "operational-reasons": { overview: "”Operativa orsaker” är en bred etikett, inte en egen extraordinär omständighet. Den verkliga bakomliggande orsaken måste identifieras.", rules: "Bemanning, rotation, schemaläggning, markhantering och tekniska fel kan alla döljas bakom uttrycket. EU261-bedömningen ska utgå från den faktiska orsaken och störningskedjan." },
};

export function buildSwedishDelayReason(delayReason: DelayReason): DelayReason {
  const title = names[delayReason.slug] ?? delayReason.title;
  const copy = causeCopy[delayReason.slug];
  if (!copy) return delayReason;
  const extraordinary = delayReason.extraordinaryCircumstance;
  return {
    ...delayReason,
    title,
    description: `Läs när ${title.toLowerCase()} kan påverka din rätt till flygersättning enligt EU261 och vilka andra passagerarrättigheter som kan finnas kvar.`,
    overview: copy.overview,
    passengerRights: extraordinary
      ? "Även när en extraordinär omständighet innebär att fast standardersättning inte ska betalas kan rätten till omsorg, ombokning eller återbetalning finnas kvar. Den konkreta orsaken och dess samband med flyget måste bedömas."
      : "Om störningen ledde till minst tre timmars försening vid slutdestinationen, en kvalificerande inställd flygning eller annan ersättningsgrundande händelse kan EU261 ge rätt till ersättning när övriga villkor är uppfyllda.",
    compensationRules: copy.rules,
    statisticsIntro: `Bedömningen av ${title.toLowerCase()} ska göras utifrån den faktiska orsaken, störningens effekt på det aktuella flyget och flygbolagets åtgärder.`,
    statistics: [
      { label: "Extraordinär omständighet", value: extraordinary ? "Kan vara" : "Normalt inte", description: extraordinary ? "Den konkreta händelsen och orsakssambandet måste fortfarande styrkas." : "Den här typen av orsak ligger ofta inom flygbolagets normala verksamhet, men fakta i det enskilda fallet styr." },
      { label: "Fast EU261-ersättning", value: extraordinary ? "Beror på" : "Kan vara möjlig", description: "Flygningens täckning, försening eller inställning och den verkliga orsaken måste bedömas tillsammans." },
      { label: "Omsorg och ombokning", value: "Separata rättigheter", description: "Dessa rättigheter kan finnas även när fast standardersättning inte ska betalas." },
    ],
    timelineIntro: `Ett ärende om ${title.toLowerCase()} behöver koppla den uppgivna orsaken till den faktiska flygstörningen.`,
    timeline: [
      { title: "Störningen inträffar", description: "Flyget försenas, ställs in eller påverkas på annat sätt." },
      { title: "Orsaken fastställs", description: `Underlag om ${title.toLowerCase()} och dess tidpunkt granskas.` },
      { title: "Orsakssamband och åtgärder granskas", description: "Vi bedömer om orsaken faktiskt förklarar störningen och vilka rimliga åtgärder som stod till buds." },
      { title: "Passagerarrättigheterna bedöms", description: "Standardersättning och separata rättigheter till omsorg, ombokning eller återbetalning bedöms var för sig." },
    ],
    faqIntro: `Vanliga frågor om ${title.toLowerCase()} och flygersättning.`,
    faq: [
      { question: `Är ${title.toLowerCase()} alltid en extraordinär omständighet?`, answer: extraordinary ? "Inte automatiskt. Händelsen måste uppfylla de rättsliga kraven och faktiskt ha orsakat den aktuella störningen." : "Normalt inte som kategori, men den verkliga bakomliggande orsaken och omständigheterna i det enskilda fallet måste alltid bedömas." },
      { question: "Kan jag ändå ha rätt till ersättning?", answer: extraordinary ? "Ja, beroende på vad som faktiskt orsakade störningen och om flygbolaget kan styrka extraordinära omständigheter och rimliga åtgärder." : "Ja. Om övriga villkor enligt EU261 är uppfyllda kan standardersättning vara möjlig." },
      { question: "Försvinner rätten till mat, hotell eller ombokning?", answer: "Inte nödvändigtvis. Omsorg, ombokning och återbetalning är separata rättigheter och kan finnas även vid extraordinära omständigheter." },
    ],
  };
}
