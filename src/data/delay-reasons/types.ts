import type {
  FAQ,
  Statistic,
  TimelineStep,
} from "@/data/seo/shared/types";

export interface DelayReason {
  slug: string;

  title: string;
  description: string;
  overview: string;

  extraordinaryCircumstance: boolean;

  passengerRights: string;
  compensationRules: string;

  statisticsIntro: string;
  statistics?: Statistic[];

  timelineIntro: string;
  timeline?: TimelineStep[];

  faqIntro: string;
  faq?: FAQ[];
}