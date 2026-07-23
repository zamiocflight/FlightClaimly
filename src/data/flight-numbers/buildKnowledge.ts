import { standardClaimProcess } from "@/data/seo/shared/claimProcess";
import { standardCommonIssues } from "@/data/seo/shared/commonIssues";
import { standardFAQ } from "@/data/seo/shared/faq";
import type { FlightNumber } from "./types";

import {
  standardCompensationAmounts,
  standardStatistics,
  standardTimeline,
} from "@/data/seo/shared/standardKnowledge";

type FlightNumberKnowledge = Pick<
  FlightNumber,
  | "compensationAmounts"
  | "statistics"
  | "timeline"
  | "claimProcess"
  | "commonIssues"
  | "faq"
>;

export function buildFlightNumberKnowledge(): FlightNumberKnowledge {
  return {
    compensationAmounts: standardCompensationAmounts,

    statistics: standardStatistics,

    timeline: standardTimeline,

    claimProcess: standardClaimProcess,

    commonIssues: standardCommonIssues,

    faq: standardFAQ,
  };
}