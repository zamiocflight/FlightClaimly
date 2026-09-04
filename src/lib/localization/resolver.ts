import type {
  KnowledgeLocalization,
  LocalizationResolution,
  LocalizableKnowledgeEntityType,
  LocalizedKnowledgeContent,
  LocalizedSeoMetadata,
  SeoLocale,
} from "./types";
import { resolveLocalizationPublicationStatus } from "./policy";

export type CanonicalLocalizationInput = {
  entityType: LocalizableKnowledgeEntityType;
  entitySlug: string;
  metadata: LocalizedSeoMetadata;
  content?: LocalizedKnowledgeContent;
};

export type ResolveKnowledgeLocalizationInput = {
  canonical: CanonicalLocalizationInput;
  locale: SeoLocale;
  localization?: KnowledgeLocalization;
};

const incompleteQuality = {
  metadataReviewed: false,
  terminologyReviewed: false,
  legalMeaningReviewed: false,
  contentReviewed: false,
} as const;

/**
 * Resolve localized presentation without ever mutating canonical Knowledge.
 *
 * English is the canonical/base layer. Missing non-English localization may
 * fall back for rendering/internal tooling, but the fallback is explicitly
 * review-required and therefore must not be treated as indexable localized
 * SEO content.
 */
export function resolveKnowledgeLocalization({
  canonical,
  locale,
  localization,
}: ResolveKnowledgeLocalizationInput): LocalizationResolution {
  if (locale === "en" && !localization) {
    return {
      locale,
      publicationStatus: "publishable",
      metadata: canonical.metadata,
      content: canonical.content,
      source: "human",
      quality: {
        metadataReviewed: true,
        terminologyReviewed: true,
        legalMeaningReviewed: true,
        contentReviewed: true,
      },
    };
  }

  const matchesEntity =
    localization?.entityType === canonical.entityType &&
    localization.entitySlug === canonical.entitySlug &&
    localization.locale === locale;

  if (!localization || !matchesEntity) {
    return {
      locale,
      publicationStatus: "review-required",
      metadata: canonical.metadata,
      content: canonical.content,
      source: "canonical-fallback",
      quality: incompleteQuality,
    };
  }

  return {
    locale,
    publicationStatus: resolveLocalizationPublicationStatus(localization),
    metadata: localization.metadata,
    content: localization.content,
    source: localization.source,
    quality: localization.quality,
  };
}
