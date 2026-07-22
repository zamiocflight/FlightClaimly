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
      "If your flight arrived at least three hours late due to a routine technical problem, you may be entitled to compensation under EU Regulation 261/2004. The airline must demonstrate that the issue was truly extraordinary to avoid liability.",

    compensationRules:
      "Routine maintenance issues, worn components, unexpected mechanical failures and similar operational defects are normally not considered extraordinary circumstances by European courts.",

    statisticsIntro:
      "Technical issues remain one of the most frequently reported operational disruption categories across European aviation.",

    statistics: [
      {
        label: "Extraordinary",
        value: "No",
        description:
          "Routine technical faults are generally not extraordinary circumstances."
      },
      {
        label: "EU261 Eligible",
        value: "Often",
        description:
          "Passengers are frequently entitled to compensation if the delay exceeds three hours."
      },
      {
        label: "Maximum Compensation",
        value: "€600",
        description:
          "Compensation depends on the flight distance under EU261."
      }
    ],

    timelineIntro:
      "Claims involving technical problems usually follow the standard EU261 assessment process.",

    timeline: [
      {
        title: "Flight disruption",
        description:
          "Your flight is delayed or cancelled because of a technical problem."
      },
      {
        title: "Eligibility review",
        description:
          "The cause of the disruption is reviewed under EU261 case law."
      },
      {
        title: "Airline response",
        description:
          "The airline accepts liability or argues extraordinary circumstances."
      },
      {
        title: "Compensation",
        description:
          "If the claim succeeds, compensation is paid according to EU261."
      }
    ],

    faqIntro:
      "Below are answers to the most common questions about technical delays and passenger compensation.",

    faq: [
      {
        question:
          "Are technical problems extraordinary circumstances?",
        answer:
          "Usually not. Routine technical faults are generally considered part of the airline's normal operations."
      },
      {
        question:
          "Can I receive compensation for a technical delay?",
        answer:
          "Yes. If the delay meets the EU261 requirements and the technical problem was not extraordinary, compensation may be available."
      },
      {
        question:
          "How much compensation can I receive?",
        answer:
          "Depending on the route, compensation may be €250, €400 or €600 under EU261."
      }
    ]
  }
];

registerDelayReasons(delayReasons);