// src/lib/seo.ts
import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "@/i18n/routing";

type SeoInput = {
  locale: Locale;

  /** Path WITHOUT locale, e.g. "/" or "/delays" or "/track/123" */
  path: string;

  title: string;
  description: string;

  /** Optional canonical override if needed */
  canonical?: string;

  /** Optional noindex */
  noindex?: boolean;

  /** Include x-default hreflang (defaults to true) */
  includeXDefault?: boolean;

  /**
   * Optional OpenGraph/Twitter image URL.
   * If not provided, we avoid "large image" cards.
   */
  ogImageUrl?: string;
};

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function ensureLeadingSlash(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function joinUrl(base: string, path: string): string {
  const b = normalizeBaseUrl(base);
  const p = ensureLeadingSlash(path);
  return `${b}${p}`;
}

function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    "http://localhost:3000";

  // In production we require NEXT_PUBLIC_APP_URL to avoid accidental non-www canonicals
  if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_APP_URL) {
    throw new Error(
      "Missing NEXT_PUBLIC_APP_URL in production. Set it to your canonical origin, e.g. https://www.flightclaimly.com"
    );
  }

  return normalizeBaseUrl(raw);
}

function assertPathIsNotLocalized(path: string) {
  // Guard in dev: path should be WITHOUT locale prefix
  if (process.env.NODE_ENV === "production") return;

  const p = ensureLeadingSlash(path);
  for (const l of locales) {
    if (p === `/${l}` || p.startsWith(`/${l}/`)) {
      throw new Error(
        `seo.ts: 'path' must be WITHOUT locale prefix. Received "${path}". Use "/" or "/delays", not "/${l}/...".`
      );
    }
  }
}

function toLocalizedPath(locale: Locale, path: string): string {
  // path is without locale, e.g. "/" or "/delays"
  const p = ensureLeadingSlash(path);
  return p === "/" ? `/${locale}` : `/${locale}${p}`;
}

/**
 * Builds Next.js metadata including:
 * - canonical per locale
 * - hreflang alternates for all locales (+ optional x-default)
 * - robots noindex if needed
 */
export function buildI18nMetadata(input: SeoInput): Metadata {
  const {
    locale,
    path,
    title,
    description,
    canonical,
    noindex,
    includeXDefault = true,
    ogImageUrl,
  } = input;

  assertPathIsNotLocalized(path);

  const siteUrl = getSiteUrl();
  const localizedPath = toLocalizedPath(locale, path);

  const canonicalUrl = canonical ?? joinUrl(siteUrl, localizedPath);

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = joinUrl(siteUrl, toLocalizedPath(l, path));
  }

  if (includeXDefault) {
    languages["x-default"] = joinUrl(siteUrl, toLocalizedPath(defaultLocale, path));
  }

  const robots = noindex
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : undefined;

  const openGraph: Metadata["openGraph"] = {
    title,
    description,
    url: canonicalUrl,
    siteName: "FlightClaimly",
    type: "website",
    ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
  };

  // If we don't provide an image, use a simple summary card (avoids validator warnings)
  const twitter: Metadata["twitter"] = ogImageUrl
    ? { card: "summary_large_image", title, description, images: [ogImageUrl] }
    : { card: "summary", title, description };

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    robots,
    openGraph,
    twitter,
  };
}
