// src/app/[locale]/cancellations/CancellationsClient.tsx
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CancellationsClient() {
  const t = useTranslations("cancellations");

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
          {/* När räknas ett flyg som inställt? */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("sections.whenIsCancelled.title")}
            </h2>
            <p className="mt-2">{t("sections.whenIsCancelled.p1")}</p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>{t("sections.whenIsCancelled.list.0")}</li>
              <li>{t("sections.whenIsCancelled.list.1")}</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              {t("sections.whenIsCancelled.note")}
            </p>
          </div>

          {/* Rätt till ersättning vid inställt flyg */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("sections.whenMoney.title")}
            </h2>
            <p className="mt-2">{t("sections.whenMoney.p1")}</p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>{t("sections.whenMoney.list.0")}</li>
              <li>{t("sections.whenMoney.list.1")}</li>
              <li>{t("sections.whenMoney.list.2")}</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              {t("sections.whenMoney.note")}
            </p>
          </div>

          {/* Ersättningsnivåer */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("sections.amount.title")}
            </h2>
            <p className="mt-2">{t("sections.amount.p1")}</p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>{t("sections.amount.list.0")}</li>
              <li>{t("sections.amount.list.1")}</li>
              <li>{t("sections.amount.list.2")}</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              {t("sections.amount.note")}
            </p>
          </div>

          {/* Ombokning och återbetalning */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("sections.rerouteOrRefund.title")}
            </h2>
            <p className="mt-2">{t("sections.rerouteOrRefund.p1")}</p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>{t("sections.rerouteOrRefund.list.0")}</li>
              <li>{t("sections.rerouteOrRefund.list.1")}</li>
            </ul>
            <p className="mt-2">{t("sections.rerouteOrRefund.p2")}</p>
          </div>

          {/* Extraordinära omständigheter */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("sections.extraordinary.title")}
            </h2>
            <p className="mt-2">{t("sections.extraordinary.p1")}</p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>{t("sections.extraordinary.list.0")}</li>
              <li>{t("sections.extraordinary.list.1")}</li>
              <li>{t("sections.extraordinary.list.2")}</li>
            </ul>
            <p className="mt-2">
              {t("sections.extraordinary.p2.before")}{" "}
              <span className="font-medium">
                {t("sections.extraordinary.p2.strong")}
              </span>{" "}
              {t("sections.extraordinary.p2.after")}
            </p>
          </div>

          {/* Exempel */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("sections.examples.title")}
            </h2>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>{t("sections.examples.list.0")}</li>
              <li>{t("sections.examples.list.1")}</li>
              <li>{t("sections.examples.list.2")}</li>
            </ul>
          </div>

          {/* Länkar vidare */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("sections.links.title")}
            </h2>

            <p className="mt-2">
              {t("sections.links.p1.before")}{" "}
              <Link
                href="/rights"
                className="font-medium text-slate-900 underline-offset-2 hover:underline"
              >
                {t("sections.links.p1.linkText")}
              </Link>{" "}
              {t("sections.links.p1.after")}
            </p>

            <p className="mt-2">
              {t("sections.links.p2.before")}{" "}
              <Link
                href="/faq"
                className="font-medium text-slate-900 underline-offset-2 hover:underline"
              >
                {t("sections.links.p2.linkText")}
              </Link>{" "}
              {t("sections.links.p2.after")}
            </p>
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>{t("footer.lead")}</p>
            <Link
              href="/#precheck"
              className="
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
