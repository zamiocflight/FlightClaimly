// src/app/[locale]/faq/page.tsx
"use client";


import Script from "next/script";
import { useTranslations } from "next-intl";

export default function FaqPage() {
  const t = useTranslations("faq");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t("items.eu261.q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("items.eu261.a"),
        },
      },
      {
        "@type": "Question",
        name: t("items.eligibility.q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("jsonld.eligibilityAnswer"),
        },
      },
      {
        "@type": "Question",
        name: t("items.amount.q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("items.amount.a"),
        },
      },
      {
        "@type": "Question",
        name: t("items.businessModel.q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("items.businessModel.a"),
        },
      },
      {
        "@type": "Question",
        name: t("items.security.q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("jsonld.securityAnswer"),
        },
      },
    ],
  };

  return (
    <>
      {/* FAQ Structured Data */}
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>

      {/* Actual FAQ Content */}
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

            {/* 1. Allmänt */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {t("items.eu261.q")}
              </h2>
              <p className="mt-2">
                {t("items.eu261.a")}
              </p>
            </div>

            {/* 2. Vem kan få */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {t("items.eligibility.q")}
              </h2>
              <p className="mt-2">
                {t("items.eligibility.lead")}
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-1">
                <li>{t("items.eligibility.bullets.0")}</li>
                <li>{t("items.eligibility.bullets.1")}</li>
                <li>{t("items.eligibility.bullets.2")}</li>
                <li>{t("items.eligibility.bullets.3")}</li>
              </ul>
            </div>

            {/* 3. Belopp */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {t("items.amount.q")}
              </h2>
              <p className="mt-2">
                {t("items.amount.lead")}{" "}
                <span className="font-medium">{t("items.amount.highlight")}</span>,
                {t("items.amount.tail")}
              </p>
            </div>

            {/* 4. Flera personer */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {t("items.perPerson.q")}
              </h2>
              <p className="mt-2">
                {t("items.perPerson.a")}
              </p>
            </div>

            {/* 5. Hur långt i efterhand */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {t("items.timeLimit.q")}
              </h2>
              <p className="mt-2">
                {t("items.timeLimit.a")}
              </p>
            </div>

            {/* 6. Extraordinära */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {t("items.cause.q")}
              </h2>
              <p className="mt-2">
                {t("items.cause.a")}
              </p>
            </div>

            {/* 7. FlightClaimly-modell */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {t("items.businessModel.q")}
              </h2>
              <p className="mt-2">
                {t("items.businessModel.lead")}{" "}
                <span className="font-medium">{t("items.businessModel.highlight")}</span>.
              </p>
            </div>

            {/* 8. Processen */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {t("items.process.q")}
              </h2>
              <p className="mt-2">{t("items.process.lead")}</p>
              <ul className="mt-2 ml-5 list-disc space-y-1">
                <li>{t("items.process.steps.0")}</li>
                <li>{t("items.process.steps.1")}</li>
                <li>{t("items.process.steps.2")}</li>
                <li>{t("items.process.steps.3")}</li>
              </ul>
            </div>

            {/* 9. Tidsåtgång */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {t("items.timing.q")}
              </h2>
              <p className="mt-2">
                {t("items.timing.a")}
              </p>
            </div>

            {/* 10. Dokument */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {t("items.documents.q")}
              </h2>
              <p className="mt-2">{t("items.documents.lead")}</p>
              <ul className="mt-2 ml-5 list-disc space-y-1">
                <li>{t("items.documents.list.0")}</li>
                <li>{t("items.documents.list.1")}</li>
                <li>{t("items.documents.list.2")}</li>
              </ul>
            </div>

            {/* 11. Integritet */}
<div>
  <h2 className="text-lg font-semibold text-slate-900">
    {t("items.security.q")}
  </h2>
  <p className="mt-2">
    {t("items.security.lead")}{" "}
    <a
      href="/privacy"
      className="font-medium text-slate-900 underline-offset-2 hover:underline"
    >
      {t("items.security.linkText")}
    </a>
    .
  </p>
</div>

            {/* 12. Kontakt */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {t("items.contact.q")}
              </h2>
              <p className="mt-2">
                {t("items.contact.lead")}{" "}
                <a
                  href="mailto:info@flightclaimly.com"
                  className="font-medium text-slate-900 underline-offset-2 hover:underline"
                >
                  info@flightclaimly.com
                </a>
                .
              </p>
            </div>
          </section>

          <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p>{t("footer.lead")}</p>
              <a
                href="/#precheck"
                className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-900 px-5 py-2 text-xs font-semibold text-white shadow-sm whitespace-nowrap transition-all duration-200 ease-out hover:bg-slate-800 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                {t("footer.cta")}
              </a>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}

