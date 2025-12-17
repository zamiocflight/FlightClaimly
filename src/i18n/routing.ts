// src/i18n/routing.ts
export const locales = ['sv', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'sv';
