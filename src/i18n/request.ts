// src/i18n/request.ts
import {getRequestConfig} from "next-intl/server";
import {locales, defaultLocale} from "./routing";

export default getRequestConfig(async ({locale}) => {
  const safeLocale =
    locale && locales.includes(locale as any)
      ? locale
      : defaultLocale;

  return {
    locale: safeLocale,
    timeZone: "Europe/Copenhagen",
    messages: (await import(`../../messages/${safeLocale}.json`)).default
  };
});
