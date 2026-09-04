import type {
  KnowledgeLocalization,
  LocalizationPublicationStatus,
  LocalizationQuality,
  SeoLocale,
} from "./types";

export const localizationRollout = {
  canonical: ["en"],
  wave1: ["sv", "da", "fi"],
  wave2: ["de", "pl", "nl"],
} as const satisfies Record<string, readonly SeoLocale[]>;

export function isLocalizationQualityComplete(
  quality: LocalizationQuality,
): boolean {
  return (
    quality.metadataReviewed &&
    quality.terminologyReviewed &&
    quality.legalMeaningReviewed &&
    quality.contentReviewed
  );
}

/**
 * Public/indexable programmatic SEO pages require explicit locale content and
 * completed quality gates. Routing support alone is never publication proof.
 */
export function resolveLocalizationPublicationStatus(
  localization: KnowledgeLocalization,
): LocalizationPublicationStatus {
  if (localization.status === "blocked") return "blocked";

  if (localization.source === "canonical-fallback") {
    return "review-required";
  }

  if (!isLocalizationQualityComplete(localization.quality)) {
    return "review-required";
  }

  return localization.status === "publishable"
    ? "publishable"
    : localization.status;
}

export function isLocalizationPublishable(
  localization: KnowledgeLocalization,
): boolean {
  return resolveLocalizationPublicationStatus(localization) === "publishable";
}
