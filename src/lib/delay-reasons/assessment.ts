export type DelayReasonCategory =
  | "airline-operational"
  | "external-event"
  | "mixed-or-root-cause"
  | "technical";

export type LiabilityBaseline =
  | "usually-compensable"
  | "usually-extraordinary"
  | "fact-specific";

export interface DelayReasonAssessmentProfile {
  slug: string;
  category: DelayReasonCategory;
  liabilityBaseline: LiabilityBaseline;
  rootCauseRequired: boolean;
  summary: string;
  evidenceTargets: string[];
  airlineQuestions: string[];
  claimantSignals: string[];
  nextStep: string;
}

const profiles: Record<string, DelayReasonAssessmentProfile> = {
  "technical-problems": {
    slug: "technical-problems",
    category: "technical",
    liabilityBaseline: "usually-compensable",
    rootCauseRequired: true,
    summary:
      "Routine technical faults normally sit within an airline's operations. The exact defect still matters because exceptional external defects can be assessed differently.",
    evidenceTargets: [
      "Airline disruption reason and technical description",
      "Maintenance or defect category where available",
      "Aircraft movement and replacement-aircraft timeline",
      "Whether the airline relies on an external event or hidden defect",
    ],
    airlineQuestions: [
      "What specific technical fault caused the disruption?",
      "When was the fault detected and what action was taken?",
      "Why does the airline consider the event extraordinary, if it does?",
      "What reasonable measures or replacement options were considered?",
    ],
    claimantSignals: [
      "Generic wording such as technical issue without detail",
      "Long delay while the same aircraft remains in rotation",
      "Replacement aircraft or crew became available only much later",
    ],
    nextStep:
      "Identify the actual defect before accepting an extraordinary-circumstance defence.",
  },
  "bad-weather": {
    slug: "bad-weather",
    category: "external-event",
    liabilityBaseline: "usually-extraordinary",
    rootCauseRequired: true,
    summary:
      "Severe weather can be extraordinary, but the weather must be operationally relevant to the exact flight and time period.",
    evidenceTargets: [
      "Weather at origin, destination and relevant alternates",
      "Airport or airspace restrictions during the disruption window",
      "Actual operation of comparable flights",
      "Aircraft rotation before the affected flight",
    ],
    airlineQuestions: [
      "Which weather condition prevented or materially restricted the flight?",
      "At which airport or route segment did it occur?",
      "What was the direct operational consequence for this flight?",
      "What reasonable mitigation or rerouting measures were attempted?",
    ],
    claimantSignals: [
      "Weather cited at a different airport or much earlier in the day",
      "Comparable flights operating while the airline gives only a generic weather explanation",
      "A long propagated delay with no clear causal chain",
    ],
    nextStep:
      "Verify timing, location and causation before treating weather as a complete defence.",
  },
  "air-traffic-control": {
    slug: "air-traffic-control",
    category: "external-event",
    liabilityBaseline: "usually-extraordinary",
    rootCauseRequired: true,
    summary:
      "External ATC restrictions can be extraordinary. The restriction still needs to be tied to the affected flight and delay period.",
    evidenceTargets: [
      "ATC slot or flow restriction timing",
      "Airspace or airport restriction affecting the route",
      "Flight movement timestamps",
      "Operational recovery after the restriction ended",
    ],
    airlineQuestions: [
      "What specific ATC measure affected this flight?",
      "How much delay was directly attributable to that measure?",
      "Did another airline-controlled issue contribute to the remaining delay?",
      "What reasonable measures were taken after the restriction changed or ended?",
    ],
    claimantSignals: [
      "ATC cited without a flight-specific slot or restriction",
      "Delay continues materially after the external restriction ends",
      "Crew, technical or rotation problems appear in the same disruption chain",
    ],
    nextStep:
      "Separate externally imposed delay from any additional airline-controlled delay.",
  },
  "airline-staff-strike": {
    slug: "airline-staff-strike",
    category: "airline-operational",
    liabilityBaseline: "usually-compensable",
    rootCauseRequired: false,
    summary:
      "Industrial action by an airline's own staff is not automatically extraordinary and should be distinguished from strikes by independent third parties.",
    evidenceTargets: [
      "Identity and employer of the striking staff",
      "Strike dates and operational impact",
      "Airline cancellation or rebooking notices",
      "Mitigation and reserve-resource measures",
    ],
    airlineQuestions: [
      "Were the striking workers employed by the operating airline?",
      "What part of the operation was affected?",
      "What mitigation measures were available and used?",
    ],
    claimantSignals: [
      "Airline labels every strike as extraordinary without identifying the workers",
      "Internal crew strike presented as an external airport strike",
    ],
    nextStep:
      "Identify who was striking before classifying the event under EU261.",
  },
  "crew-shortage": {
    slug: "crew-shortage",
    category: "airline-operational",
    liabilityBaseline: "usually-compensable",
    rootCauseRequired: true,
    summary:
      "Routine crew planning and reserve coverage are normally airline operational matters. A downstream crew timeout should be traced to its original cause.",
    evidenceTargets: [
      "Reason the operating crew became unavailable",
      "Duty-time or timeout chronology",
      "Reserve crew or positioning options",
      "Earlier flight disruption that caused crew displacement",
    ],
    airlineQuestions: [
      "Why was a legal operating crew unavailable?",
      "Was reserve crew available or considered?",
      "Did an earlier extraordinary event cause the crew problem?",
    ],
    claimantSignals: [
      "Operational reasons used instead of a specific crew explanation",
      "Crew timeout after a long airline-controlled technical or rotation delay",
    ],
    nextStep:
      "Trace crew unavailability back to its first material cause.",
  },
  "late-incoming-aircraft": {
    slug: "late-incoming-aircraft",
    category: "mixed-or-root-cause",
    liabilityBaseline: "fact-specific",
    rootCauseRequired: true,
    summary:
      "Late incoming aircraft is a propagation label, not a legal root cause. The previous leg and original disruption must be reconstructed.",
    evidenceTargets: [
      "Aircraft registration where available",
      "Previous leg and its actual arrival time",
      "Original cause of the previous-leg delay",
      "Aircraft swap and recovery options",
    ],
    airlineQuestions: [
      "Which previous flight caused the aircraft to arrive late?",
      "What caused that earlier delay?",
      "Why could another aircraft not reasonably be used?",
    ],
    claimantSignals: [
      "Airline provides no explanation beyond late incoming aircraft",
      "Several rotations separate the passenger flight from the alleged external event",
      "Aircraft swap appears operationally possible but unexplained",
    ],
    nextStep:
      "Reconstruct the aircraft rotation backwards until the true root cause is identified.",
  },
  "bird-strike": {
    slug: "bird-strike",
    category: "external-event",
    liabilityBaseline: "usually-extraordinary",
    rootCauseRequired: true,
    summary:
      "A genuine bird strike is generally external to normal airline operations, while the resulting delay and airline response still require causation and reasonable-measures review.",
    evidenceTargets: [
      "Bird-strike occurrence and affected aircraft",
      "Inspection or damage timeline",
      "Aircraft replacement options",
      "Duration attributable to inspection versus later operational issues",
    ],
    airlineQuestions: [
      "When and where did the bird strike occur?",
      "Was the passenger's aircraft directly affected?",
      "How long did required inspection or repair take?",
      "What reasonable replacement or recovery measures were considered?",
    ],
    claimantSignals: [
      "Bird strike involved another aircraft with an unclear link",
      "Delay continues well beyond the inspection without explanation",
    ],
    nextStep:
      "Confirm the strike, causal link and duration actually attributable to the external event.",
  },
  "airport-closure": {
    slug: "airport-closure",
    category: "external-event",
    liabilityBaseline: "usually-extraordinary",
    rootCauseRequired: true,
    summary:
      "An externally imposed airport closure can be extraordinary, but its timing and direct effect on the affected flight must be established.",
    evidenceTargets: [
      "Airport closure notice and exact time window",
      "Reason for closure",
      "Flight schedule and actual movement",
      "Rerouting or alternate-airport options",
    ],
    airlineQuestions: [
      "Who ordered the closure and for what period?",
      "Was the airport closed when this flight was due to operate?",
      "What rerouting or recovery options were considered?",
    ],
    claimantSignals: [
      "Closure ended before a substantial part of the delay accumulated",
      "Flight could potentially operate from or to an alternate airport",
    ],
    nextStep:
      "Match the closure window to the passenger's exact scheduled operation.",
  },
  "security-issue": {
    slug: "security-issue",
    category: "external-event",
    liabilityBaseline: "usually-extraordinary",
    rootCauseRequired: true,
    summary:
      "Genuine security events can be extraordinary, but vague security wording should be tied to a specific event and operational consequence.",
    evidenceTargets: [
      "Nature and location of the security event",
      "Authority or airport restriction where applicable",
      "Flight-specific impact and duration",
      "Recovery and rerouting measures",
    ],
    airlineQuestions: [
      "What security event affected the flight?",
      "Was it imposed by an external authority or caused internally?",
      "How long did the event prevent normal operation?",
    ],
    claimantSignals: [
      "Security cited without identifying any event",
      "Operational delay continues after restrictions are lifted",
    ],
    nextStep:
      "Establish the specific external security event before accepting the classification.",
  },
  "hidden-manufacturing-defect": {
    slug: "hidden-manufacturing-defect",
    category: "technical",
    liabilityBaseline: "usually-extraordinary",
    rootCauseRequired: true,
    summary:
      "A genuinely hidden manufacturing defect can be treated differently from routine technical faults, but the airline should substantiate that exceptional defect rather than merely relabel a technical problem.",
    evidenceTargets: [
      "Manufacturer notice, directive or defect evidence",
      "Affected aircraft or component",
      "Date the defect became known",
      "Airline response and fleet-wide mitigation",
    ],
    airlineQuestions: [
      "What manufacturer-identified defect is relied on?",
      "Was the defect hidden and outside routine maintenance detection?",
      "When was the airline informed and what measures followed?",
    ],
    claimantSignals: [
      "No manufacturer evidence is identified",
      "Routine component failure is described as a hidden defect",
    ],
    nextStep:
      "Require evidence distinguishing a hidden manufacturing defect from an ordinary technical failure.",
  },
  "operational-reasons": {
    slug: "operational-reasons",
    category: "mixed-or-root-cause",
    liabilityBaseline: "fact-specific",
    rootCauseRequired: true,
    summary:
      "Operational reasons is too broad to determine EU261 liability. The actual underlying event must be identified.",
    evidenceTargets: [
      "Detailed disruption reason",
      "Aircraft and crew rotation",
      "Technical, airport, weather or ATC events",
      "Airline recovery actions",
    ],
    airlineQuestions: [
      "What specific event is meant by operational reasons?",
      "Was the event internal to the airline or externally imposed?",
      "What reasonable measures were taken?",
    ],
    claimantSignals: [
      "No specific cause supplied",
      "Different reasons given in different communications",
      "Flight history suggests a technical, crew or rotation problem",
    ],
    nextStep:
      "Do not classify liability until the generic operational label is resolved into a real cause.",
  },
};

const fallbackProfile: DelayReasonAssessmentProfile = {
  slug: "unknown",
  category: "mixed-or-root-cause",
  liabilityBaseline: "fact-specific",
  rootCauseRequired: true,
  summary:
    "The disruption reason requires a fact-specific EU261 assessment before liability can be classified.",
  evidenceTargets: [
    "Airline's stated disruption reason",
    "Flight movement timeline",
    "Relevant external restrictions or operational events",
    "Reasonable measures taken by the airline",
  ],
  airlineQuestions: [
    "What exact event caused the disruption?",
    "How did that event affect this specific flight?",
    "What reasonable measures were taken to avoid or reduce the disruption?",
  ],
  claimantSignals: ["Generic or changing explanation from the airline"],
  nextStep: "Identify and evidence the root cause before deciding EU261 liability.",
};

export function getDelayReasonAssessment(
  slug: string,
): DelayReasonAssessmentProfile {
  return profiles[slug] ?? { ...fallbackProfile, slug };
}

export function getAllDelayReasonAssessments(): DelayReasonAssessmentProfile[] {
  return Object.values(profiles);
}
