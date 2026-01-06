// src/app/[locale]/contact/ContactClient.tsx
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ContactClient() {
  const t = useTranslations("contact");

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
          {/* Email */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              {t("email.title")}
            </h2>
            <p>{t("email.lead")}</p>
            <a
              href="mailto:info@flightclaimly.com"
              className="font-medium text-slate-900 underline-offset-2 hover:underline"
            >
              info@flightclaimly.com
            </a>
            <p className="text-sm text-slate-600 mt-1">{t("email.note")}</p>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("faq.title")}
            </h2>
            <p className="mt-2">
              {t("faq.before")}{" "}
              <Link
                href="/faq"
                className="font-medium text-slate-900 underline-offset-2 hover:underline"
              >
                {t("faq.link")}
              </Link>{" "}
              {t("faq.after")}
            </p>
          </div>

          {/* Rights */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("rights.title")}
            </h2>
            <p className="mt-2">{t("rights.lead")}</p>
            <Link
              href="/rights"
              className="font-medium text-slate-900 underline-offset-2 hover:underline"
            >
              {t("rights.link")}
            </Link>
          </div>

          {/* Ongoing case */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("case.title")}
            </h2>
            <p className="mt-2">{t("case.p1")}</p>
            <p className="mt-2">
              {t("case.before")}{" "}
              <a
                href="mailto:info@flightclaimly.com"
                className="font-medium text-slate-900 underline-offset-2 hover:underline"
              >
                info@flightclaimly.com
              </a>{" "}
              {t("case.after")}
            </p>
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>{t("footer.lead")}</p>

            <Link href="/#precheck" className="
                inline-flex items-center justify-center
                rounded-full border border-slate-900
                bg-slate-900 px-5 py-2 text-xs font-semibold text-white
                shadow-sm
                whitespace-nowrap
                transition-all duration-200 ease-out
                hover:bg-slate-800 hover:shadow-md
                active:scale-[0.98]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2
              "
            >
              {t("footer.cta")}
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
