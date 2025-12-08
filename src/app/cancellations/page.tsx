// src/app/cancellations/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inställt flyg – ersättning enligt EU261 | FlightClaimly",
  description:
    "Inställt flyg? Lär dig när du har rätt till 250–600 € i ersättning enligt EU261, skillnaden mellan ombokning och återbetalning och hur FlightClaimly driver ditt krav mot flygbolaget.",
};


export default function CancellationsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 text-slate-900">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Inställda flyg
          </p>
         <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
  Inställt flyg – dina rättigheter till ersättning enligt EU261
</h1>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            När ett flyg ställs in påverkas hela resan – ibland med ombokningar, ibland med
            förstörd semester eller förlorade möten. EU261 ger dig starka rättigheter vid
            inställda flyg. Här går vi igenom grunderna och hur FlightClaimly kan hjälpa dig.
          </p>
        </header>

        <section className="space-y-8 text-sm md:text-base text-slate-700">
          {/* När räknas ett flyg som inställt? */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              När räknas ett flyg som inställt?
            </h2>
            <p className="mt-2">
              Ett flyg anses inställt när det ursprungliga flyget inte genomförs och
              passagerarna antingen:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>bokas om till ett annat flyg, eller</li>
              <li>får biljettpriset återbetalat istället för att resa</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Även stora schemaändringar kan i praktiken räknas som inställning – det hjälper vi
              dig att bedöma när du skickar in ditt ärende.
            </p>
          </div>

          {/* Rätt till ersättning vid inställt flyg */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              När kan du få ekonomisk ersättning?
            </h2>
            <p className="mt-2">
              Du kan ha rätt till kompensation enligt EU261 om:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>
                flyget ställs in med kort varsel (vanligtvis mindre än 14 dagar innan avgång)
              </li>
              <li>
                ombokningen gör att du når fram betydligt senare än planerat
              </li>
              <li>
                flygbolaget är ansvarigt för orsaken till inställningen
              </li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Exakta regler beror på när du informerades om inställningen och vilken alternativ
              resa som erbjöds. FlightClaimly hjälper dig räkna ut vad som gäller i ditt fall.
            </p>
          </div>

          {/* Ersättningsnivåer */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Hur mycket kan du få i ersättning?
            </h2>
            <p className="mt-2">
              Ersättningens storlek beror på flygsträckans längd och hur mycket din resa
              påverkas. Vanliga schablonbelopp enligt EU261 är:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>upp till 250 € för kortare flyg (ca 0–1 500 km)</li>
              <li>upp till 400 € för medellånga flyg inom EU eller upp till 3 500 km</li>
              <li>upp till 600 € för längre internationella flyg</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Beloppen kan justeras om flygbolaget erbjuder en ombokning som gör att du ändå
              kommer fram med relativt liten försening. Vi analyserar detta åt dig när du
              skickar in ditt ärende.
            </p>
          </div>

          {/* Ombokning och återbetalning */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Ombokning eller återbetalning – du har rätt att välja
            </h2>
            <p className="mt-2">
              När ett flyg ställs in har du oftast rätt att välja mellan:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>ombokning till ett senare flyg, så snart som möjligt, eller</li>
              <li>återbetalning av biljettpriset för den sträckan du inte kunnat resa</li>
            </ul>
            <p className="mt-2">
              I vissa situationer kan du också ha rätt till ersättning för extra kostnader,
              till exempel hotell eller transport, om du tvingas stanna längre på resmålet.
            </p>
          </div>

          {/* Extraordinära omständigheter */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              När kan flygbolaget neka kompensation?
            </h2>
            <p className="mt-2">
              Flygbolaget kan slippa betala kompensation om inställningen beror på
              &quot;extraordinära omständigheter&quot;, till exempel:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>allvarligt oväder eller naturkatastrofer</li>
              <li>säkerhetshot eller luftrumsstängningar</li>
              <li>strejker som flygbolaget inte kan kontrollera</li>
            </ul>
            <p className="mt-2">
              Tekniska fel, personalbrist eller interna problem hos flygbolaget räknas
              däremot ofta <span className="font-medium">inte</span> som extraordinära
              omständigheter. Många avslag är felaktiga – där kan vi hjälpa dig att gå vidare.
            </p>
          </div>

          {/* Exempel */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Exempel: när du kan ha rätt till ersättning
            </h2>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>
                Du får besked 3 dagar innan avgång att ditt flyg är inställt, och
                erbjuds en ombokning där du anländer många timmar senare – ersättning kan bli aktuell.
              </li>
              <li>
                Flygbolaget ställer in ditt kvällsflyg på grund av tekniskt fel och bokar om dig
                till nästa dag – du kan ha rätt både till kompensation och hotell.
              </li>
              <li>
                Ditt flyg ställs in samma dag utan tydlig förklaring och du tvingas köpa en ny biljett
                med annat bolag – även detta kan vara ersättningsgrundande.
              </li>
            </ul>
          </div>

          {/* Länkar vidare */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Vill du fördjupa dig i reglerna?
            </h2>
            <p className="mt-2">
              På sidan{" "}
              <a
                href="/rights"
                className="font-medium text-slate-900 underline-offset-2 hover:underline"
              >
                Dina rättigheter
              </a>{" "}
              hittar du en bredare genomgång av EU261 och vilka situationer som omfattas.
            </p>
            <p className="mt-2">
              Du kan också läsa vår{" "}
              <a
                href="/faq"
                className="font-medium text-slate-900 underline-offset-2 hover:underline"
              >
                FAQ
              </a>{" "}
              med korta svar på vanliga frågor.
            </p>
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>
              Har ditt flyg ställts in? Kolla om du kan få upp till 6 000 kr i ersättning –
              det tar bara någon minut.
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
  Kolla mitt flyg
</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
