// src/app/rights/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EU261 – dina rättigheter som flygpassagerare | FlightClaimly",
  description:
    "Lär dig dina rättigheter enligt EU261/UK261 vid försenade, inställda och överbokade flyg. Se när du har rätt till 250–600 € i ersättning och hur FlightClaimly hjälper dig få ut pengarna.",
};


export default function RightsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 text-slate-900">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Dina rättigheter
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Dina rättigheter som flygpassagerare enligt EU261
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            EU-förordning 261/2004 (&quot;EU261&quot;) ger dig som flygpassagerare starka
            rättigheter vid försenade, inställda eller överbokade flyg. Här förklarar vi
            grunderna – och hur FlightClaimly kan hjälpa dig få den ersättning du har rätt till.
          </p>
        </header>

        <section className="space-y-8 text-sm md:text-base text-slate-700">
          {/* När gäller EU261? */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              När gäller EU261?
            </h2>
            <p className="mt-2">
              EU261 gäller i följande situationer:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>flyget avgår från ett land inom EU/EES eller Storbritannien</li>
              <li>flyget anländer till EU/EES/Storbritannien med ett EU-baserat flygbolag</li>
              <li>du har en bekräftad bokning och kom i tid till incheckningen</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Även vissa anslutande flyg och resor med mellanlandningar kan omfattas, beroende
              på hur biljetten är bokad. Det hjälper vi dig att bedöma.
            </p>
          </div>

          {/* Vilka situationer omfattas? */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Vilka situationer omfattas?
            </h2>
            <p className="mt-2">
              Du kan ha rätt till kompensation om:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>ditt flyg är kraftigt försenat vid ankomst (ofta 3 timmar eller mer)</li>
              <li>ditt flyg ställs in med kort varsel</li>
              <li>du nekas ombordstigning på grund av överbokning</li>
            </ul>
            <p className="mt-2">
              Utöver ekonomisk kompensation kan du ha rätt till mat, dryck, hotell och ombokning
              beroende på hur länge du drabbas och hur lång din resa är.
            </p>
          </div>

          {/* Ersättningsnivåer */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Hur mycket kan du få i ersättning?
            </h2>
            <p className="mt-2">
              Ersättningen beror främst på flygsträckans längd och hur mycket din resa påverkats.
              Vanliga schablonbelopp enligt EU261 är:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>upp till 250 € för kortare flyg (ca 0–1 500 km)</li>
              <li>upp till 400 € för medellånga flyg inom EU eller upp till 3 500 km</li>
              <li>upp till 600 € för längre internationella flyg</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Det exakta beloppet kan variera beroende på rutt, förseningens längd och
              erbjuden ombokning. FlightClaimly hjälper dig räkna ut rätt nivå för just din resa.
            </p>
          </div>

          {/* Undantag / extraordinära omständigheter */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              När har du inte rätt till kompensation?
            </h2>
            <p className="mt-2">
              Flygbolaget kan slippa betala kompensation om förseningen eller inställningen beror
              på så kallade &quot;extraordinära omständigheter&quot;, till exempel:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>allvarligt oväder eller naturkatastrofer</li>
              <li>säkerhetsrisker eller luftrumsstängningar</li>
              <li>strejker utanför flygbolagets kontroll (t.ex. flygplatspersonal eller flygledare)</li>
            </ul>
            <p className="mt-2">
              Tekniska problem eller brister i planering räknas ofta <span className="font-medium">inte</span>
              som extraordinära omständigheter. Många avslag från flygbolag är felaktiga – där kan vi hjälpa dig
              att överklaga.
            </p>
          </div>

          {/* Vad behöver du ha kvar? */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Vad behöver du spara?
            </h2>
            <p className="mt-2">
              För att driva ett ärende är det bra om du har:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>bokningsbekräftelse eller biljett (gärna som PDF eller bild)</li>
              <li>boardingkort om du hann checka in</li>
              <li>eventuella kvitton på mat, hotell eller transport</li>
              <li>kort beskrivning av vad som hände (tider, besked från flygbolaget)</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Du kan ladda upp allt direkt när du skapar ett ärende hos oss – vi hjälper dig att sortera.
            </p>
          </div>

          {/* Länkar vidare */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Vill du veta mer om specifika situationer?
            </h2>
            <p className="mt-2">
              Läs mer om:
            </p>
           <ul className="mt-2 ml-5 list-disc space-y-1">
  <li>
    <a
      href="/delays"
      className="
        font-medium text-slate-900 underline-offset-2
        hover:underline hover:text-slate-700
        transition-colors duration-150
      "
    >
      Försenade flyg
    </a>{" "}
    – vad som gäller vid långa förseningar.
  </li>
  <li>
    <a
      href="/cancellations"
      className="
        font-medium text-slate-900 underline-offset-2
        hover:underline hover:text-slate-700
        transition-colors duration-150
      "
    >
      Inställda flyg
    </a>{" "}
    – dina rättigheter när flyget ställs in.
  </li>
  <li>
    <a
      href="/faq"
      className="
        font-medium text-slate-900 underline-offset-2
        hover:underline hover:text-slate-700
        transition-colors duration-150
      "
    >
      Vanliga frågor
    </a>{" "}
    – korta svar på det flest undrar.
  </li>
</ul>

          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>
              Tror du att ditt flyg omfattas av EU261? Kolla direkt om du har rätt till
              ersättning – det tar bara någon minut.
            </p>
           <a
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
  Kolla om jag har rätt till ersättning
</a>


          </div>
        </footer>
      </div>
    </main>
  );
}
