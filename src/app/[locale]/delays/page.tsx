// src/app/[locale]/delays/page.tsx
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import DelaysClient from "./DelaysClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "delays" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default function DelaysPage() {
  return <DelaysClient />;
}
