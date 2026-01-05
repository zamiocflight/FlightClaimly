// src/app/[locale]/rights/page.tsx
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import RightsClient from "./RightsClient";
import { buildI18nMetadata } from "@/lib/seo";
import { assertLocale } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const localeStr = await getLocale();
  const locale = assertLocale(localeStr);

  const t = await getTranslations({ locale, namespace: "rights" });

  const title = t("meta.title");
  const description = t("meta.description");

  return buildI18nMetadata({
    locale,
    path: "/rights",
    title,
    description,
  });
}

export default function RightsPage() {
  return <RightsClient />;
}
