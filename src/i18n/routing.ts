// src/i18n/routing.ts
export const locales = ['sv', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'sv';
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function assertLocale(value: string): Locale {
  if (isLocale(value)) return value;

  // Dev: fail loud, prod: also fail because this is a routing invariant
  throw new Error(`Invalid locale "${value}". Expected one of: ${locales.join(", ")}`);
}
