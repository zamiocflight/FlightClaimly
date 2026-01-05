// src/app/[locale]/cancellations/page.tsx
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import CancellationsClient from "./CancellationsClient";
import { buildI18nMetadata } from "@/lib/seo";
import { assertLocale } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const localeStr = await getLocale();
  const locale = assertLocale(localeStr);

  const t = await getTranslations({ locale, namespace: "cancellations" });

  const title = t("meta.title");
  const description = t("meta.description");

  return buildI18nMetadata({
    locale,
    path: "/cancellations",
    title,
    description,
  });
}

export default function CancellationsPage() {
  return <CancellationsClient />;
}
