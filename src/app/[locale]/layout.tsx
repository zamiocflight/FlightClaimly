// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { locales } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import Providers from "./providers";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;

  const baseUrl = "https://www.flightclaimly.com";
  const url = `${baseUrl}/${locale}`;

  return {
    alternates: {
      canonical: url,
      languages: {
        sv: `${baseUrl}/sv`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      url,
      locale: locale === "sv" ? "sv_SE" : "en_US",
    },
  };
}


export default async function LocaleLayout({
  children,
  params,
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
