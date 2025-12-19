// src/app/[locale]/cancellations/page.tsx
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import CancellationsClient from "./CancellationsClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "cancellations" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default function CancellationsPage() {
  return <CancellationsClient />;
}
