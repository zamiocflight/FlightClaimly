import { locales } from "@/i18n/routing";

export const routeSeoLocales = ["en", "sv", "da", "pl", "de"] as const;
export const airportSeoLocales = ["en", "sv", "da", "pl", "de"] as const;
export const airlineSeoLocales = ["en", "sv", "da", "pl", "de"] as const;
export const countrySeoLocales = ["en", "sv", "da", "pl", "de"] as const;
export const delayReasonSeoLocales = ["en", "sv", "da", "pl", "de"] as const;
export const flightNumberSeoLocales = ["en", "sv", "da", "pl", "de", "fi", "nl"] as const;

const SITE_URL = "https://www.flightclaimly.com";
export function buildLanguageAlternates(path = "", availableLocales: readonly string[] = locales) {
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");
  return Object.fromEntries(availableLocales.map((locale) => [locale, normalizedPath ? `${SITE_URL}/${locale}/${normalizedPath}` : `${SITE_URL}/${locale}`]));
}
