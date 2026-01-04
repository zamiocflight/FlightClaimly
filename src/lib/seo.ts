// src/lib/seo.ts
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";

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
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://flightclaimly.com";

// Ensure we don't end up with double slashes
function joinUrl(base: string, path: string) {
  const b = base.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

/**
 * Builds Next.js metadata including:
 * - canonical per locale
 * - hreflang alternates for all locales
 * - robots noindex if needed
 */
export function buildI18nMetadata(input: SeoInput): Metadata {
  const { locale, path, title, description, canonical, noindex } = input;

  const localizedPath = path === "/" ? `/${locale}` : `/${locale}${path}`;
  const canonicalUrl = canonical ?? joinUrl(SITE_URL, localizedPath);

  const languages: Record<string, string> = {};
  for (const l of locales) {
    const lp = path === "/" ? `/${l}` : `/${l}${path}`;
    languages[l] = joinUrl(SITE_URL, lp);
  }

  // Optional: x-default -> point to your primary (here: sv)
  languages["x-default"] = joinUrl(SITE_URL, path === "/" ? "/sv" : `/sv${path}`);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : undefined,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "FlightClaimly",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
