// src/app/[locale]/layout.tsx
import type { ReactNode } from 'react';
import { locales } from '@/i18n/routing';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Providers from './providers';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <Providers locale={locale} messages={messages}>
      {children}
    </Providers>
  );
}
