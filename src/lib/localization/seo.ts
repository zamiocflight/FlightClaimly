import type { Metadata } from "next";

import { buildLanguageAlternates } from "@/lib/seo/alternates";
import type { LocalizationResolution, SeoLocale } from "./types";

const SITE_URL = "https://www.flightclaimly.com";

export type LocalizedSeoVariant = {
  locale: SeoLocale;
  path: string;
  resolution: LocalizationResolution;
};

export function getPublishableLocalizedVariants(
  variants: readonly LocalizedSeoVariant[],
): LocalizedSeoVariant[] {
  return variants.filter(
    (variant) => variant.resolution.publicationStatus === "publishable",
  );
}

export function buildLocalizedLanguageAlternates(
  variants: readonly LocalizedSeoVariant[],
): Record<string, string> {
  return Object.fromEntries(
    getPublishableLocalizedVariants(variants).map(({ locale, path }) => [
      locale,
      `${SITE_URL}/${locale}/${path.replace(/^\/+/, "")}`,
    ]),
  );
}

export type BuildLocalizedMetadataInput = {
  locale: SeoLocale;
  path: string;
  resolution: LocalizationResolution;
  variants: readonly LocalizedSeoVariant[];
};

/**
 * Build metadata from a resolved locale variant.
 *
 * Non-publishable variants are explicitly noindex/nofollow. hreflang only
 * advertises variants that passed the Localization Engine publication gates.
 */
export function buildLocalizedMetadata({
  locale,
  path,
  resolution,
  variants,
}: BuildLocalizedMetadataInput): Metadata {
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");
  const url = `${SITE_URL}/${locale}/${normalizedPath}`;
  const publishable = resolution.publicationStatus === "publishable";

  return {
    title: resolution.metadata.title,
    description: resolution.metadata.description,
    alternates: publishable
      ? {
          canonical: url,
          languages: buildLocalizedLanguageAlternates(variants),
        }
      : undefined,
    robots: publishable
      ? undefined
      : {
          index: false,
          follow: false,
        },
    twitter: {
      card: "summary_large_image",
      title: resolution.metadata.title,
      description: resolution.metadata.description,
    },
    openGraph: {
      title: resolution.metadata.title,
      description: resolution.metadata.description,
      url,
      siteName: "FlightClaimly",
      locale,
      type: "article",
    },
  };
}

/**
 * Compatibility helper for existing SEO code while entity-specific locale
 * registries are introduced. It intentionally delegates URL construction to
 * the existing alternates helper.
 */
export function buildPublishedLocaleAlternates(
  path: string,
  locales: readonly SeoLocale[],
) {
  return buildLanguageAlternates(path, locales);
}
