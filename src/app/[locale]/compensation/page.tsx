// src/app/[locale]/compensation/page.tsx
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import CompensationClient from "./CompensationClient";
import { buildI18nMetadata } from "@/lib/seo";
import { assertLocale } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const localeStr = await getLocale();
  const locale = assertLocale(localeStr);

  const t = await getTranslations({ locale, namespace: "compensation" });

  const title = t("meta.title");
  const description = t("meta.description");

  return buildI18nMetadata({
    locale,
    path: "/compensation",
    title,
    description,
  });
}

export default function CompensationPage() {
  return <CompensationClient />;
}

