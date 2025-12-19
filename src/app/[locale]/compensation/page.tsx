// src/app/[locale]/compensation/page.tsx
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import CompensationClient from "./CompensationClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "compensation" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default function CompensationPage() {
  return <CompensationClient />;
}


