// src/app/faq/page.tsx

import Script from "next/script";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Vad är flygkompensation enligt EU261?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "EU261 är en EU-förordning som ger passagerare rätt till ekonomisk ersättning när flyg är kraftigt försenade, inställda eller vid nekad ombordstigning, under vissa förutsättningar. Nivån på ersättningen beror bland annat på flygsträckan.",
      },
    },
    {
      "@type": "Question",
      name: "När har jag rätt till ersättning?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Som huvudregel kan du ha rätt till ersättning om du anlände till slutdestinationen mer än tre timmar försenad, flyget ställdes in med kort varsel, du blev nekad ombordstigning trots giltig biljett, och resan utgick från EU eller opererades av ett EU-bolag.",
      },
    },
    {
      "@type": "Question",
      name: "Hur mycket pengar kan jag få?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Ersättningen enligt EU261 ligger normalt mellan 250 € och 600 € per person, beroende på flygsträckans längd och resans typ.",
      },
    },
    {
      "@type": "Question",
      name: "Hur tjänar FlightClaimly pengar?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "FlightClaimly arbetar enligt principen no win, no fee. Det kostar ingenting att skicka in ett ärende och vi tar endast betalt som en procentandel av den ersättning du faktiskt får utbetald.",
      },
    },
    {
      "@type": "Question",
      name: "Är mina uppgifter säkra hos er?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Ja. Vi använder dina uppgifter enbart för att driva ditt ärende och uppfylla rättsliga skyldigheter. Mer information finns i vår integritetspolicy.",
      },
    },
  ],
};

export default function FaqPage() {
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
              FAQ
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Vanliga frågor om flygkompensation
            </h1>
            <p className="mt-3 text-sm md:text-base text-slate-600">
              Här har vi samlat svar på de vanligaste frågorna om ersättning vid
              försenade eller inställda flyg och hur FlightClaimly fungerar.
            </p>
          </header>

          <section className="space-y-8 text-sm md:text-base text-slate-700">

            {/* 1. Allmänt */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Vad är flygkompensation enligt EU261?
              </h2>
              <p className="mt-2">
                EU261 är en EU-förordning som ger passagerare rätt till ekonomisk
                ersättning när flyg är kraftigt försenade, inställda eller vid nekad
                ombordstigning, under vissa förutsättningar. Nivån på ersättningen
                beror bland annat på flygsträckan.
              </p>
            </div>

            {/* 2. Vem kan få */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                När har jag rätt till ersättning?
              </h2>
              <p className="mt-2">
                Som huvudregel kan du ha rätt till ersättning om:
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-1">
                <li>du anlände till slutdestinationen mer än 3 timmar försenad</li>
                <li>flyget ställdes in med kort varsel</li>
                <li>du blev nekad ombordstigning trots giltig biljett</li>
                <li>resan utgick från ett EU-land eller opererades av ett EU-flygbolag</li>
              </ul>
            </div>

            {/* 3. Belopp */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Hur mycket pengar kan jag få?
              </h2>
              <p className="mt-2">
                Ersättningen enligt EU261 ligger normalt mellan{" "}
                <span className="font-medium">250 € och 600 € per person</span>,
                beroende på flygsträckans längd och resans typ.
              </p>
            </div>

            {/* 4. Flera personer */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Gäller ersättningen per person eller per bokning?
              </h2>
              <p className="mt-2">
                Ersättningen gäller per passagerare, inte per bokning. Är ni flera i
                sällskapet kan summan därför bli betydande.
              </p>
            </div>

            {/* 5. Hur långt i efterhand */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Hur långt i efterhand kan jag kräva kompensation?
              </h2>
              <p className="mt-2">
                Det beror på vilket land som är tillämpligt, men i många fall kan du kräva
                ersättning flera år efter resdatum.
              </p>
            </div>

            {/* 6. Extraordinära */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Spelar det någon roll vad som orsakade förseningen?
              </h2>
              <p className="mt-2">
                Ja. Flygbolaget kan slippa betala ersättning om det rör sig om så kallade
                “extraordinära omständigheter”.
              </p>
            </div>

            {/* 7. FlightClaimly-modell */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Hur tjänar FlightClaimly pengar?
              </h2>
              <p className="mt-2">
                Vi arbetar enligt principen{" "}
                <span className="font-medium">no win, no fee</span>.
              </p>
            </div>

            {/* 8. Processen */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Hur går processen till rent praktiskt?
              </h2>
              <p className="mt-2">Kortfattat:</p>
              <ul className="mt-2 ml-5 list-disc space-y-1">
                <li>du fyller i ditt flyg och dina uppgifter</li>
                <li>vi gör en bedömning och kontaktar flygbolaget</li>
                <li>vi hanterar svar, invändningar och kompletteringar</li>
                <li>vid vinst får du ersättning utbetald</li>
              </ul>
            </div>

            {/* 9. Tidsåtgång */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Hur lång tid tar det innan jag får svar?
              </h2>
              <p className="mt-2">
                Vissa ärenden löses på några veckor, andra kan ta längre tid.
              </p>
            </div>

            {/* 10. Dokument */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Vilka dokument behöver jag?
              </h2>
              <p className="mt-2">Det viktigaste är:</p>
              <ul className="mt-2 ml-5 list-disc space-y-1">
                <li>bokningsbekräftelse</li>
                <li>boardingkort</li>
                <li>kommunikation från flygbolaget</li>
              </ul>
            </div>

            {/* 11. Integritet */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Är mina uppgifter säkra hos er?
              </h2>
              <p className="mt-2">
                Ja. Vi använder dina uppgifter enbart för att driva ditt ärende.
                Mer info i vår{" "}
                <a
                  href="/privacy"
                  className="font-medium text-slate-900 underline-offset-2 hover:underline"
                >
                  integritetspolicy
                </a>
                .
              </p>
            </div>

            {/* 12. Kontakt */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Jag hittar inte svar – vad gör jag?
              </h2>
              <p className="mt-2">
                Maila oss på{" "}
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
              <p>Redo att se om ditt flyg kan ge ersättning?</p>
              <a
                href="/#precheck"
                className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-900 px-5 py-2 text-xs font-semibold text-white shadow-sm whitespace-nowrap transition-all duration-200 ease-out hover:bg-slate-800 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                Kolla mitt flyg
              </a>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
