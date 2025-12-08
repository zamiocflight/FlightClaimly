// src/app/delays/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Försenat flyg – ersättning enligt EU261 | FlightClaimly",
  description:
    "Försenat flyg? Se när du har rätt till 250–600 € i ersättning enligt EU261/UK261, vad som räknas som kraftig försening och hur FlightClaimly hjälper dig att driva kravet.",
};


export default function DelaysPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 text-slate-900">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Flygförseningar
          </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
  Försenat flyg – så får du ersättning enligt EU261
</h1>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            Ett försenat flyg kan förstöra planer, anslutningar och semestrar. EU261 ger dig
            som passagerare starka rättigheter – i många fall har du rätt till ersättning när
            du anländer sent. Här förklarar vi grunderna.
          </p>
        </header>

        <section className="space-y-8 text-sm md:text-base text-slate-700">
          {/* När räknas ett flyg som "försenat"? */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              När räknas ett flyg som kraftigt försenat?
            </h2>
            <p className="mt-2">
              För EU261 är det framför allt <span className="font-medium">ankomsttiden</span> som spelar roll.
              Du kan ha rätt till kompensation när du:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>ankommer 3 timmar eller mer efter planerad tid</li>
              <li>missar anslutningar och når slutdestinationen kraftigt försenad</li>
              <li>tvingas vänta länge utan rimlig hjälp från flygbolaget</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Mindre förseningar ger oftast ingen kompensation, men kan ändå ge rätt till mat,
              dryck eller ombokning. Vi hjälper dig att bedöma vad som gäller för just ditt fall.
            </p>
          </div>

          {/* Ersättning vid försening */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Hur mycket kan du få vid försening?
            </h2>
            <p className="mt-2">
              Ersättningsnivåerna vid kraftiga förseningar liknar dem vid inställda flyg och
              beror på flygsträckans längd:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>upp till 250 € för kortare flyg (ca 0–1 500 km)</li>
              <li>upp till 400 € för medellånga flyg inom EU eller upp till 3 500 km</li>
              <li>upp till 600 € för längre internationella flyg</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              I vissa fall kan beloppen minskas om flygbolaget erbjuder ombokning som gör att
              du ändå kommer fram med relativt liten försening. Det är sådant vi räknar på åt dig.
            </p>
          </div>

          {/* Rätt till ombokning, mat och hotell */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Dina rättigheter under tiden du väntar
            </h2>
            <p className="mt-2">
              Utöver ekonomisk kompensation kan du vid längre förseningar ha rätt till:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>mat och dryck i rimlig omfattning</li>
              <li>två gratis telefonsamtal eller meddelanden</li>
              <li>hotellövernattning om du måste stanna över natten</li>
              <li>transport mellan flygplats och hotell</li>
              <li>ombokning till en senare avgång, eller återbetalning i vissa fall</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Spara alltid kvitton – du kan ofta kräva ersättning för nödvändiga utlägg i
              efterhand om flygbolaget inte hjälpt dig på plats.
            </p>
          </div>

          {/* Undantag */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              När kan flygbolaget slippa betala kompensation?
            </h2>
            <p className="mt-2">
              Vid vissa situationer kan flygbolaget hänvisa till
              &quot;extraordinära omständigheter&quot; och neka ersättning, till exempel:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>allvarligt oväder eller naturkatastrofer</li>
              <li>stängda flygplatser eller luftrumsrestriktioner</li>
              <li>säkerhetshot eller händelser utanför flygbolagets kontroll</li>
            </ul>
            <p className="mt-2">
              Tekniska fel, brist på personal eller planeringsmissar är däremot oftast{" "}
              <span className="font-medium">inte</span> giltiga skäl för att neka kompensation.
              Många passagerare får nej första gången – där kan vi hjälpa dig att gå vidare.
            </p>
          </div>

          {/* Exempel */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Exempel: när du kan ha rätt till ersättning
            </h2>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>
                Ditt flyg från Stockholm till Barcelona landar 3 timmar och 45 minuter senare
                än planerat – du kan ha rätt till kompensation.
              </li>
              <li>
                Du missar ditt långflyg efter en försening på första sträckan, och når
                slutdestinationen mer än 3 timmar sent – hela resan kan omfattas.
              </li>
              <li>
                Flyget är 4 timmar försenat på grund av ett tekniskt fel – ofta ersättningsgrundande.
              </li>
            </ul>
          </div>

          {/* Länkar vidare */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Vill du läsa mer om reglerna?
            </h2>
            <p className="mt-2">
              På sidan{" "}
              <a
                href="/rights"
                className="font-medium text-slate-900 underline-offset-2 hover:underline"
              >
                Dina rättigheter
              </a>{" "}
              hittar du en bredare genomgång av EU261 och vad som gäller vid inställda flyg,
              överbokning och andra situationer.
            </p>
            <p className="mt-2">
              Du kan också kika i vår{" "}
              <a
                href="/faq"
                className="font-medium text-slate-900 underline-offset-2 hover:underline"
              >
                FAQ
              </a>{" "}
              där vi svarar kort på vanliga frågor.
            </p>
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>
              Har du varit med om ett försenat flyg? Kolla om du kan få upp till 6 000 kr i
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
  Kolla mitt flyg
</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
