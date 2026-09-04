import type { Locale } from "@/i18n/routing";

/**
 * Knowledge entities remain canonical and locale-neutral.
 * Localization is a presentation/search layer and must never fork the
 * underlying operational or legal facts.
 */
export type LocalizableKnowledgeEntityType =
  | "flight-number"
  | "route"
  | "airport"
  | "airline"
  | "country"
  | "delay-reason";

export type SeoLocale = Locale;

export type LocalizationPublicationStatus =
  | "draft"
  | "review-required"
  | "publishable"
  | "blocked";

export type LocalizationSource =
  | "human"
  | "machine-assisted"
  | "canonical-fallback";

export type LocalizedSeoMetadata = {
  title: string;
  description: string;
};

export type LocalizedKnowledgeLabels = {
  home: string;
  flightNumbers: string;
  flightNumber: string;
  airline: string;
  icaoAirlineCode: string;
  originAirport: string;
  destinationAirport: string;
  distanceCategory: string;
  eu261Protection: string;
  uk261Protection: string;
  aircraft: string;
  scheduleSnapshot: string;
  yes: string;
  no: string;
  heroEyebrow: string;
  heroTitle: string;
  heroCta: string;
  majorAirlinesFor: string;
  about: string;
  compensationAmountsTitle: string;
  passengerRightsTitle: string;
  officialSources: string;
  compensationRulesTitle: string;
  compensationStatistics: string;
  claimTimelineTitle: string;
  claimProcessTitle: string;
  commonIssuesTitle: string;
  faqTitle: string;
  flightAirlineLinksTitle: string;
  flightRouteLinksTitle: string;
  airportsLinksTitle: string;
  countriesLinksTitle: string;
};

export type LocalizedKnowledgeContent = {
  intro?: string;
  overview?: string;
  passengerRights?: string;
  compensationIntro?: string;
  compensationAmounts?: Array<{
    label: string;
    distance: string;
    amount: string;
  }>;
  compensationRules?: string;
  statisticsIntro?: string;
  statistics?: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  timelineIntro?: string;
  timeline?: Array<{
    title: string;
    description: string;
  }>;
  claimProcess?: string[];
  commonIssues?: string[];
  faq?: Array<{
    question: string;
    answer: string;
  }>;
};

export type LocalizationQuality = {
  metadataReviewed: boolean;
  terminologyReviewed: boolean;
  legalMeaningReviewed: boolean;
  contentReviewed: boolean;
};

export type KnowledgeLocalization = {
  entityType: LocalizableKnowledgeEntityType;
  entitySlug: string;
  locale: SeoLocale;
  source: LocalizationSource;
  status: LocalizationPublicationStatus;
  metadata: LocalizedSeoMetadata;
  content?: LocalizedKnowledgeContent;
  quality: LocalizationQuality;
  updatedAt?: string;
};

export type LocaleDefinition = {
  locale: SeoLocale;
  languageName: string;
  htmlLang: string;
  marketLabel: string;
  labels: LocalizedKnowledgeLabels;
};

export type LocalizationResolution = {
  locale: SeoLocale;
  publicationStatus: LocalizationPublicationStatus;
  metadata: LocalizedSeoMetadata;
  content?: LocalizedKnowledgeContent;
  source: LocalizationSource;
  quality: LocalizationQuality;
};
