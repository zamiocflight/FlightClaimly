import { locales } from "@/i18n/routing";

const SITE_URL = "https://www.flightclaimly.com";

export function buildLanguageAlternates(path = "") {
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");

  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      normalizedPath
        ? `${SITE_URL}/${locale}/${normalizedPath}`
        : `${SITE_URL}/${locale}`,
    ])
  );
}
