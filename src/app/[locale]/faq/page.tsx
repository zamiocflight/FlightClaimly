// src/app/[locale]/faq/page.tsx
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { buildI18nMetadata } from "@/lib/seo";
import { assertLocale } from "@/i18n/routing";
import FaqClient from "./FaqClient";

export async function generateMetadata(): Promise<Metadata> {
  const localeStr = await getLocale();
  const locale = assertLocale(localeStr);

  const t = await getTranslations({ locale, namespace: "faq" });

  return buildI18nMetadata({
    locale,
    path: "/faq",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function FaqPage() {
  return <FaqClient />;
}
