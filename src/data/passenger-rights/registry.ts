import type { PassengerRight } from "./types";

export const passengerRightsRegistry: PassengerRight[] = [
  {
    id: "eu261-fixed-compensation",
    title: "Fixed compensation",
    category: "compensation",
    summary:
      "Potential entitlement to fixed compensation under Regulation (EC) No 261/2004, subject to applicability, disruption thresholds and available defences.",
    regulationIds: ["eu261"],
    legalReferenceIds: [],
  },
  {
    id: "eu261-care",
    title: "Right to care",
    category: "care",
    summary:
      "Right to reasonable meals, refreshments, communications and, where necessary, accommodation and transport while waiting, subject to the Regulation's conditions.",
    regulationIds: ["eu261"],
    legalReferenceIds: [],
  },
  {
    id: "eu261-rerouting",
    title: "Rerouting at the earliest opportunity",
    category: "rerouting",
    summary:
      "Right to rerouting to the final destination at the earliest opportunity under comparable transport conditions where the Regulation provides that choice.",
    regulationIds: ["eu261"],
    legalReferenceIds: [],
  },
  {
    id: "eu261-refund",
    title: "Ticket reimbursement",
    category: "refund",
    summary:
      "Right to reimbursement of the ticket where the Regulation provides reimbursement as an alternative to rerouting.",
    regulationIds: ["eu261"],
    legalReferenceIds: [],
  },
  {
    id: "eu261-information",
    title: "Information about passenger rights",
    category: "information",
    summary:
      "Right to receive the notices and passenger-rights information required by Regulation (EC) No 261/2004.",
    regulationIds: ["eu261"],
    legalReferenceIds: [],
  },
];

export function getPassengerRight(id: string) {
  return passengerRightsRegistry.find((right) => right.id === id);
}

export function getAllPassengerRights() {
  return passengerRightsRegistry;
}
