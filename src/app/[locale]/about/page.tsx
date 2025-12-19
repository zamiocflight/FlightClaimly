// src/app/[locale]/about/page.tsx
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 text-slate-900">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            {t("badge")}
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            {t("title")}
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            {t("intro")}
          </p>
        </header>

        <section className="space-y-8 text-sm md:text-base text-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{t("why.title")}</h2>
            <p className="mt-2">{t("why.p1")}</p>
            <p className="mt-2">{t("why.p2")}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">{t("how.title")}</h2>
            <ol className="mt-2 ml-5 list-decimal space-y-1">
              <li>{t("how.steps.0")}</li>
              <li>{t("how.steps.1")}</li>
              <li>{t("how.steps.2")}</li>
              <li>{t("how.steps.3")}</li>
            </ol>
            <p className="mt-2 text-sm text-slate-600">{t("how.note")}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">{t("model.title")}</h2>
            <p className="mt-2">
              {t("model.p1")}{" "}
              <span className="font-medium">{t("model.p1Strong")}</span>.
              {t("model.p1b")}
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>{t("model.bullets.0")}</li>
              <li>{t("model.bullets.1")}</li>
              <li>{t("model.bullets.2")}</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">{t("model.note")}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">{t("trust.title")}</h2>
            <p className="mt-2">{t("trust.p1")}</p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>{t("trust.bullets.0")}</li>
              <li>{t("trust.bullets.1")}</li>
              <li>{t("trust.bullets.2")}</li>
              <li>{t("trust.bullets.3")}</li>
            </ul>
            <p className="mt-2">{t("trust.p2")}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">{t("independent.title")}</h2>
            <p className="mt-2">{t("independent.p1")}</p>
            <p className="mt-2">{t("independent.p2")}</p>
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>{t("footer.cta")}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/compensation"
                className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                {t("footer.primary")}
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-900 px-5 py-2 text-xs font-semibold text-white shadow-sm whitespace-nowrap transition-all duration-200 ease-out hover:bg-slate-800 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                {t("footer.secondary")}
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
