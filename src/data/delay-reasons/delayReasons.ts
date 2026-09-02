import type { DelayReason } from "./types";
import { registerDelayReasons } from "./registry";

export const delayReasons: DelayReason[] = [
  {
    slug: "technical-problems",
    title: "Technical Problems",
    description:
      "Learn when technical problems qualify for EU261 compensation and when airlines may reject your claim.",
    overview:
      "Technical problems are among the most common reasons airlines give for delays and cancellations. Under EU261, ordinary technical faults that occur during the normal operation of an aircraft are generally considered part of an airline's normal business and usually do not exempt the airline from paying compensation.",
    extraordinaryCircumstance: false,
    passengerRights:
      "If your flight arrived at least three hours late due to a routine technical problem, you may be entitled to compensation under EU Regulation 261/2004. The airline must demonstrate that the issue was truly extraordinary to avoid liability. Care and rerouting rights can apply independently of compensation.",
    compensationRules:
      "Routine maintenance issues, worn components, unexpected mechanical failures and similar operational defects are normally not considered extraordinary circumstances. Exceptional defects outside the airline's normal activity, such as certain hidden manufacturing defects, can be assessed differently.",
    statisticsIntro:
      "Technical issues remain one of the most frequently reported operational disruption categories across European aviation.",
    statistics: [
      { label: "Extraordinary", value: "Usually no", description: "Routine technical faults are generally not extraordinary circumstances." },
      { label: "EU261 Eligible", value: "Often", description: "Compensation may apply when the other EU261 conditions are met." },
      { label: "Maximum Compensation", value: "€600", description: "Compensation depends on the flight distance and EU261 conditions." }
    ],
    timelineIntro:
      "Claims involving technical problems usually turn on what actually failed and whether the defect was inherent in normal airline operations.",
    timeline: [
      { title: "Flight disruption", description: "Your flight is delayed or cancelled because of a technical problem." },
      { title: "Cause review", description: "The specific fault and its operational context are identified." },
      { title: "Airline evidence", description: "The airline may try to prove that the fault arose from an extraordinary external event." },
      { title: "EU261 assessment", description: "Compensation is assessed together with delay length, route and other EU261 requirements." }
    ],
    faqIntro:
      "Below are answers to common questions about technical delays and passenger compensation.",
    faq: [
      { question: "Are technical problems extraordinary circumstances?", answer: "Usually not. Routine technical faults are generally considered part of normal airline operations, although genuinely exceptional external defects can be treated differently." },
      { question: "Can I receive compensation for a technical delay?", answer: "Potentially yes. If the delay and route meet EU261 requirements and the airline cannot establish an extraordinary circumstance, compensation may be due." },
      { question: "How much compensation can I receive?", answer: "Depending on the route and applicable EU261 conditions, compensation can be €250, €400 or €600." }
    ]
  },
  {
    slug: "bad-weather",
    title: "Bad Weather",
    description:
      "Understand when severe weather can exempt an airline from EU261 compensation and when a weather explanation should be examined more closely.",
    overview:
      "Weather can qualify as an extraordinary circumstance when conditions are incompatible with the safe operation of the flight. A generic reference to bad weather is not automatically enough: the relevant conditions, location, timing and causal connection to the disrupted flight matter.",
    extraordinaryCircumstance: true,
    passengerRights:
      "Even when severe weather removes the right to fixed EU261 compensation, passengers can still retain important rights to care, rerouting or reimbursement. If the weather explanation does not actually account for the disruption, compensation may still be possible.",
    compensationRules:
      "Severe weather is usually extraordinary when it directly prevents safe operation. The airline should still be able to establish the causal link and show that the disruption could not reasonably have been avoided despite appropriate measures.",
    statisticsIntro:
      "Weather claims require a fact-specific review rather than relying only on the disruption label supplied by the airline.",
    statistics: [
      { label: "Extraordinary", value: "Usually yes", description: "Severe operationally relevant weather can be extraordinary." },
      { label: "EU261 Compensation", value: "Depends", description: "The strength of the causal link and the airline's response matter." },
      { label: "Care Rights", value: "Remain", description: "Care and rerouting rights can remain even without fixed compensation." }
    ],
    timelineIntro:
      "A weather claim should connect the reported conditions to the exact flight disruption.",
    timeline: [
      { title: "Weather event", description: "Relevant conditions affect an airport, route or aircraft operation." },
      { title: "Operational impact", description: "The effect on the passenger's exact flight is reconstructed." },
      { title: "Causation review", description: "The airline's weather explanation is compared with timing, location and available operational evidence." },
      { title: "Rights assessment", description: "Compensation and separate care or rerouting rights are assessed." }
    ],
    faqIntro: "Common questions about weather-related flight disruptions.",
    faq: [
      { question: "Does bad weather always mean no compensation?", answer: "No. Severe weather can be extraordinary, but the airline still needs a genuine causal connection between those conditions and the disruption." },
      { question: "Do I still have rights if weather is extraordinary?", answer: "Yes. Rights to care, rerouting or reimbursement can continue even when fixed compensation is not payable." },
      { question: "What if other flights operated normally?", answer: "That can be relevant evidence, but it is not conclusive by itself. Aircraft type, route, timing, airport restrictions and the individual flight operation can differ." }
    ]
  },
  {
    slug: "air-traffic-control",
    title: "Air Traffic Control Restrictions",
    description:
      "Learn how ATC restrictions, flow-control measures and airspace decisions affect EU261 compensation.",
    overview:
      "Air traffic control restrictions are generally outside an airline's control and can qualify as extraordinary circumstances. The key issue is whether the ATC decision actually caused the delay or cancellation and whether the airline took reasonable measures to reduce the impact.",
    extraordinaryCircumstance: true,
    passengerRights:
      "Fixed compensation may not be due where a genuine ATC restriction directly caused the disruption, but care, rerouting and reimbursement rights can still apply. Mixed-cause disruptions should be reviewed carefully.",
    compensationRules:
      "ATC slot restrictions, airspace closures and externally imposed traffic-flow measures are commonly treated as extraordinary. An airline should still connect the restriction to the affected flight and explain the operational consequences.",
    statisticsIntro: "ATC disruptions are often externally imposed but still require flight-specific causation analysis.",
    statistics: [
      { label: "Extraordinary", value: "Usually yes", description: "External ATC decisions are normally beyond the airline's control." },
      { label: "Compensation", value: "Often excluded", description: "Fixed compensation may be excluded when ATC directly caused the disruption." },
      { label: "Care Rights", value: "Remain", description: "Passenger assistance rights can continue." }
    ],
    timelineIntro: "ATC cases focus on the restriction, its timing and its effect on the specific flight.",
    timeline: [
      { title: "ATC measure", description: "A slot, airspace or traffic-flow restriction is imposed." },
      { title: "Flight impact", description: "The exact delay or cancellation consequence is identified." },
      { title: "Reasonable measures", description: "The airline's response and available alternatives are reviewed." },
      { title: "EU261 outcome", description: "Compensation and care rights are assessed separately." }
    ],
    faqIntro: "Common questions about ATC delays and cancellations.",
    faq: [
      { question: "Are ATC restrictions extraordinary circumstances?", answer: "They are usually capable of being extraordinary because they are imposed externally, but the restriction must actually be connected to the disruption." },
      { question: "Can I still claim meals or rerouting?", answer: "Yes. EU261 care and rerouting obligations can apply even where an extraordinary circumstance removes fixed compensation." },
      { question: "What if the airline also had an operational problem?", answer: "A mixed-cause disruption requires closer analysis. An extraordinary ATC event does not automatically explain every part of a long delay." }
    ]
  },
  {
    slug: "airline-staff-strike",
    title: "Airline Staff Strike",
    description:
      "Find out when a strike by an airline's own staff can still lead to EU261 compensation.",
    overview:
      "A strike involving an airline's own employees is not automatically an extraordinary circumstance. European case law has established that certain internal staff strikes can fall within the normal management of an airline and therefore may not remove compensation liability.",
    extraordinaryCircumstance: false,
    passengerRights:
      "Passengers affected by a qualifying internal airline strike may be entitled to fixed EU261 compensation if the other conditions are met. Care, rerouting and reimbursement rights should also be considered separately.",
    compensationRules:
      "The identity of the striking workers matters. A strike by the airline's own staff can be treated differently from an external strike involving airport staff, air traffic controllers or another independent third party.",
    statisticsIntro: "Strike claims must distinguish internal airline labour action from external industrial action.",
    statistics: [
      { label: "Extraordinary", value: "Often no", description: "Strikes by an airline's own staff are not automatically extraordinary." },
      { label: "External strike", value: "Different", description: "Third-party industrial action can receive different treatment." },
      { label: "Compensation", value: "Possible", description: "Fixed EU261 compensation may apply depending on the facts." }
    ],
    timelineIntro: "The first task in a strike claim is identifying who was striking and why the flight was affected.",
    timeline: [
      { title: "Industrial action", description: "A strike or work stoppage affects airline operations." },
      { title: "Actor identified", description: "The workers are classified as airline staff or an external third party." },
      { title: "Operational response", description: "The airline's mitigation measures and actual flight impact are reviewed." },
      { title: "Compensation assessment", description: "EU261 liability is assessed from the specific strike circumstances." }
    ],
    faqIntro: "Common questions about airline strikes and EU261 compensation.",
    faq: [
      { question: "Does an airline staff strike always cancel my compensation?", answer: "No. A strike by the airline's own staff is not automatically an extraordinary circumstance." },
      { question: "Is an airport staff strike the same thing?", answer: "No. A strike by independent airport workers or another external party can be legally different from an internal airline strike." },
      { question: "Do rerouting rights still apply during a strike?", answer: "They can. Compensation and rerouting or care rights are separate questions under EU261." }
    ]
  },
  {
    slug: "crew-shortage",
    title: "Crew Shortage",
    description:
      "Learn when pilot or cabin-crew shortages are usually considered an airline operational responsibility under EU261.",
    overview:
      "Crew availability is generally part of an airline's normal operational planning. A routine shortage caused by rostering, sickness levels or insufficient reserve coverage will not normally become extraordinary merely because the airline describes it as a staffing problem.",
    extraordinaryCircumstance: false,
    passengerRights:
      "A delay or cancellation caused by ordinary crew shortage can support an EU261 compensation claim when the remaining eligibility conditions are met. Exceptional external events affecting crew can require a separate analysis.",
    compensationRules:
      "Normal staffing and reserve planning sit within airline operations. The airline would need to identify a genuinely extraordinary external event if it argues that a crew problem should remove compensation liability.",
    statisticsIntro: "Crew cases often turn on whether the shortage was ordinary operational planning or the downstream result of a genuine external event.",
    statistics: [
      { label: "Extraordinary", value: "Usually no", description: "Routine crew planning problems are generally operational." },
      { label: "Compensation", value: "Often possible", description: "EU261 compensation may apply when other requirements are satisfied." },
      { label: "Key evidence", value: "Cause", description: "The reason the crew became unavailable can be decisive." }
    ],
    timelineIntro: "Crew-shortage claims should identify why no legal operating crew was available.",
    timeline: [
      { title: "Crew unavailable", description: "The flight lacks the required operating crew." },
      { title: "Underlying cause", description: "Rostering, sickness, duty-time limits or an external event is identified." },
      { title: "Reserve options", description: "Available mitigation or replacement-crew measures are considered." },
      { title: "EU261 assessment", description: "Liability is determined from the real underlying cause." }
    ],
    faqIntro: "Common questions about crew shortages.",
    faq: [
      { question: "Is crew shortage an extraordinary circumstance?", answer: "Routine crew shortages are usually part of normal airline operations. Exceptional external causes can require separate analysis." },
      { question: "What if the crew timed out after an earlier delay?", answer: "The underlying earlier cause matters. The whole disruption chain should be reconstructed rather than treating crew timeout as an isolated label." },
      { question: "Can the airline simply say operational reasons?", answer: "A broad operational label does not itself establish an extraordinary circumstance. The actual cause should be identified." }
    ]
  },
  {
    slug: "late-incoming-aircraft",
    title: "Late Incoming Aircraft",
    description:
      "Understand why a late incoming aircraft is a starting point for investigation, not a complete EU261 explanation.",
    overview:
      "A late incoming aircraft describes where the delay propagated from, but it does not by itself explain the underlying cause. The previous flight, aircraft rotation and original disruption should be traced to determine whether the root cause was within the airline's control or genuinely extraordinary.",
    extraordinaryCircumstance: false,
    passengerRights:
      "Passengers should not assume that 'late incoming aircraft' automatically removes compensation. If the root cause was an ordinary technical, crew or operational problem, EU261 compensation may still be due. If the chain began with a genuine extraordinary event, the analysis can be different.",
    compensationRules:
      "The decisive issue is the root cause and causal chain. Delay propagation does not automatically convert an ordinary operational problem into an extraordinary circumstance.",
    statisticsIntro: "Aircraft-rotation analysis is especially useful for testing generic airline explanations.",
    statistics: [
      { label: "Extraordinary", value: "Not by itself", description: "A late aircraft is a consequence, not a complete legal cause." },
      { label: "Key question", value: "Root cause", description: "The preceding leg and original disruption should be identified." },
      { label: "Flight data", value: "Highly useful", description: "Rotation and schedule data can help reconstruct the chain." }
    ],
    timelineIntro: "These claims are best analysed backwards through the aircraft's prior operation.",
    timeline: [
      { title: "Passenger flight delayed", description: "The airline cites a late incoming aircraft." },
      { title: "Previous leg identified", description: "The aircraft's prior flight and arrival are reconstructed." },
      { title: "Root cause traced", description: "The original technical, weather, ATC, crew or other cause is identified." },
      { title: "Causal-chain review", description: "EU261 liability is assessed from the underlying event and airline response." }
    ],
    faqIntro: "Common questions about late incoming aircraft delays.",
    faq: [
      { question: "Is a late incoming aircraft extraordinary?", answer: "Not by itself. It describes a delay chain, not the root legal cause." },
      { question: "Why does the previous flight matter?", answer: "Because the legal assessment often depends on what first delayed the aircraft and whether that event was extraordinary." },
      { question: "Can flight-tracking data help?", answer: "Yes. Historical schedules, actual movements and aircraft rotation data can be useful when reconstructing the disruption." }
    ]
  },
  {
    slug: "bird-strike",
    title: "Bird Strike",
    description:
      "Learn how bird strikes are usually treated under EU261 and why the airline's response still matters.",
    overview:
      "A bird strike is generally capable of being an extraordinary circumstance because it is an external event not inherent in normal airline operations. However, the airline still needs to establish the connection to the disruption and show that reasonable measures could not have avoided the resulting delay.",
    extraordinaryCircumstance: true,
    passengerRights:
      "Fixed compensation may be excluded where a bird strike genuinely caused the disruption and the airline took appropriate measures. Care, rerouting and reimbursement rights can still apply.",
    compensationRules:
      "The occurrence of a bird strike and the reasonable operational response should both be considered. Unnecessary additional delay after the event can be relevant to the final assessment.",
    statisticsIntro: "Bird-strike cases combine an external event with a separate review of the airline's mitigation response.",
    statistics: [
      { label: "Extraordinary", value: "Usually yes", description: "Bird strikes are external to the airline's normal activity." },
      { label: "Reasonable measures", value: "Required", description: "The airline's response still forms part of the legal analysis." },
      { label: "Care Rights", value: "Remain", description: "Passenger assistance rights can continue." }
    ],
    timelineIntro: "The disruption timeline should separate the strike itself from the time required to inspect and recover the aircraft.",
    timeline: [
      { title: "Bird strike", description: "An aircraft encounters a bird or flock." },
      { title: "Safety inspection", description: "The aircraft is checked for damage and airworthiness." },
      { title: "Mitigation review", description: "The airline's recovery options and timing are examined." },
      { title: "Rights assessment", description: "Compensation and care obligations are determined separately." }
    ],
    faqIntro: "Common questions about bird strikes.",
    faq: [
      { question: "Is a bird strike an extraordinary circumstance?", answer: "It is generally capable of being extraordinary because it is an external event." },
      { question: "Does that automatically end the claim?", answer: "No. Causation and reasonable measures still need to be assessed." },
      { question: "Do care rights still apply?", answer: "Yes. Extraordinary circumstances do not automatically remove care, rerouting or reimbursement rights." }
    ]
  },
  {
    slug: "airport-closure",
    title: "Airport Closure",
    description:
      "Understand how airport closures affect compensation, rerouting and care rights under EU261.",
    overview:
      "An externally imposed airport closure is usually outside an airline's control and can qualify as an extraordinary circumstance. The reason for the closure, its timing and whether alternative routing remained reasonably available all matter.",
    extraordinaryCircumstance: true,
    passengerRights:
      "An airport closure can remove fixed compensation where it directly caused the disruption, but the airline's Article 8 rerouting or reimbursement obligations and Article 9 care obligations can remain important.",
    compensationRules:
      "The airline should establish that the closure actually prevented operation and should still consider reasonable alternatives where EU261 requires rerouting at the earliest opportunity.",
    statisticsIntro: "Airport-closure claims often shift the legal focus from fixed compensation to rerouting and care.",
    statistics: [
      { label: "Extraordinary", value: "Usually yes", description: "Externally imposed closures are normally outside airline control." },
      { label: "Rerouting", value: "Important", description: "Alternative transport duties can remain despite the closure." },
      { label: "Care", value: "Important", description: "Meals, accommodation and assistance may still be required." }
    ],
    timelineIntro: "A closure case should map both the closure period and the airline's alternative-transport response.",
    timeline: [
      { title: "Airport closes", description: "Operations are suspended or materially restricted." },
      { title: "Flight cancelled or delayed", description: "The passenger's itinerary is affected." },
      { title: "Alternative options reviewed", description: "Other airports, routes or transport options are considered where relevant." },
      { title: "EU261 duties assessed", description: "Compensation, rerouting and care are analysed separately." }
    ],
    faqIntro: "Common questions about airport closures.",
    faq: [
      { question: "Does an airport closure remove all passenger rights?", answer: "No. Fixed compensation may be affected, but rerouting, reimbursement and care rights can still apply." },
      { question: "Can the airline wait several days to reroute me?", answer: "The facts matter. EU261's rerouting obligations can require transport at the earliest opportunity, so reasonably available alternatives may need to be considered." },
      { question: "Does the reason for the closure matter?", answer: "Yes. Weather, security, infrastructure failure and airspace measures can produce different factual and legal questions." }
    ]
  },
  {
    slug: "security-issue",
    title: "Security Issue",
    description:
      "Learn when security risks and official security measures can qualify as extraordinary circumstances under EU261.",
    overview:
      "Serious security risks, official security measures and certain external threats are generally outside an airline's normal control and can qualify as extraordinary circumstances. A vague reference to security should still be connected to a real event affecting the flight.",
    extraordinaryCircumstance: true,
    passengerRights:
      "Where a genuine security event directly caused the disruption, fixed compensation may be excluded. Care, rerouting and reimbursement obligations can still remain, depending on the circumstances.",
    compensationRules:
      "The assessment should distinguish genuine external security events from internal operational or staffing issues labelled as security-related. Causation and reasonable measures remain relevant.",
    statisticsIntro: "Security claims are usually fact-sensitive because airlines may disclose limited operational detail.",
    statistics: [
      { label: "Extraordinary", value: "Usually yes", description: "Genuine external security risks can be extraordinary." },
      { label: "Evidence", value: "Important", description: "A specific event should support the airline's explanation." },
      { label: "Care Rights", value: "Remain", description: "Passenger assistance can still be required." }
    ],
    timelineIntro: "Security cases focus on the actual external event and the period during which it affected operations.",
    timeline: [
      { title: "Security event", description: "A threat, alert or official measure affects aviation operations." },
      { title: "Flight impact", description: "The connection to the passenger's flight is identified." },
      { title: "Airline response", description: "Available mitigation and rerouting measures are reviewed." },
      { title: "Rights assessment", description: "EU261 compensation and assistance rights are separated." }
    ],
    faqIntro: "Common questions about security-related disruptions.",
    faq: [
      { question: "Are security issues extraordinary circumstances?", answer: "Genuine external security risks are generally capable of being extraordinary." },
      { question: "Is the word 'security' enough for the airline to reject a claim?", answer: "No. The actual event and its causal connection to the flight remain relevant." },
      { question: "Do rerouting rights still apply?", answer: "They can. Extraordinary circumstances do not automatically remove EU261 rerouting and care obligations." }
    ]
  },
  {
    slug: "hidden-manufacturing-defect",
    title: "Hidden Manufacturing Defect",
    description:
      "Understand why certain hidden aircraft manufacturing defects can be treated differently from routine technical problems.",
    overview:
      "A hidden manufacturing defect revealed by the aircraft manufacturer or a competent authority can fall outside ordinary airline maintenance and may qualify as an extraordinary circumstance. This is a narrow category and should not be confused with everyday mechanical faults.",
    extraordinaryCircumstance: true,
    passengerRights:
      "Fixed compensation may be excluded where the airline proves that a genuine hidden manufacturing defect directly caused the disruption and that reasonable measures could not avoid it. Other passenger rights can remain.",
    compensationRules:
      "The distinction is between an exceptional defect originating outside normal airline operation and an ordinary technical failure arising during maintenance or use. The airline should be able to substantiate the exceptional nature of the defect.",
    statisticsIntro: "This category is legally important precisely because it is much narrower than ordinary technical problems.",
    statistics: [
      { label: "Extraordinary", value: "Can be", description: "A genuine hidden manufacturing defect can qualify as extraordinary." },
      { label: "Routine fault", value: "Different", description: "Normal technical failures are generally assessed differently." },
      { label: "Proof", value: "Critical", description: "The airline should substantiate the exceptional defect." }
    ],
    timelineIntro: "Manufacturing-defect claims should identify the external technical source and how it affected the aircraft.",
    timeline: [
      { title: "Defect identified", description: "A manufacturer or competent authority identifies an exceptional defect." },
      { title: "Aircraft affected", description: "The defect is linked to the aircraft operating the passenger's flight." },
      { title: "Operational response", description: "Grounding, inspection or repair measures are reviewed." },
      { title: "EU261 assessment", description: "The exceptional nature, causation and reasonable measures are assessed." }
    ],
    faqIntro: "Common questions about hidden manufacturing defects.",
    faq: [
      { question: "Is every aircraft defect extraordinary?", answer: "No. Ordinary technical faults are generally not extraordinary. Hidden manufacturing defects are a narrower exceptional category." },
      { question: "What should the airline show?", answer: "It should be able to identify and substantiate the exceptional defect and connect it to the disruption." },
      { question: "Do care rights remain?", answer: "Yes. Care and rerouting obligations can remain even when fixed compensation is excluded." }
    ]
  },
  {
    slug: "operational-reasons",
    title: "Operational Reasons",
    description:
      "Learn why 'operational reasons' is not itself an extraordinary circumstance and why the real cause should be identified.",
    overview:
      "Operational reasons is a broad airline label rather than a precise legal category. It can cover aircraft rotation, staffing, scheduling, ground handling, technical issues or other causes. The underlying event must be identified before EU261 liability can be assessed properly.",
    extraordinaryCircumstance: false,
    passengerRights:
      "Passengers should not assume that a rejection based only on 'operational reasons' resolves the compensation question. Many ordinary operational causes remain within the airline's normal activity and can support compensation when the other EU261 requirements are met.",
    compensationRules:
      "A generic operational label does not establish extraordinary circumstances. The root cause, control, causal chain and mitigation measures should be examined.",
    statisticsIntro: "Operational-reason cases are classification problems first and compensation problems second.",
    statistics: [
      { label: "Extraordinary", value: "Not by itself", description: "The phrase does not identify a legally extraordinary event." },
      { label: "Root cause", value: "Required", description: "The actual operational event should be established." },
      { label: "Compensation", value: "Often possible", description: "Many ordinary operational failures remain compensable." }
    ],
    timelineIntro: "The broad airline label should be unpacked into a specific disruption cause.",
    timeline: [
      { title: "Operational label given", description: "The airline cites operational reasons." },
      { title: "Underlying event identified", description: "Technical, crew, rotation, airport or another cause is established." },
      { title: "Control and causation reviewed", description: "The event is classified under EU261 principles." },
      { title: "Claim assessed", description: "Compensation and assistance rights are determined from the real cause." }
    ],
    faqIntro: "Common questions about generic operational explanations.",
    faq: [
      { question: "Are operational reasons extraordinary circumstances?", answer: "Not automatically. 'Operational reasons' is too broad to answer the legal question without identifying the real cause." },
      { question: "Can I ask the airline for more detail?", answer: "Yes. The specific cause is relevant to assessing whether the airline can rely on extraordinary circumstances." },
      { question: "What kinds of problems can hide behind this label?", answer: "It can include crew, aircraft rotation, scheduling, ground operations, technical faults and other operational events." }
    ]
  }
];

registerDelayReasons(delayReasons);
