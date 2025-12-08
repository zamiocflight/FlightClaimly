// src/app/compensation/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ersättningsbelopp enligt EU261 – 250, 400 och 600 € | FlightClaimly",
  description:
    "Se vilka ersättningsbelopp du kan få enligt EU261/UK261 – 250, 400 eller 600 € per person beroende på flygsträcka och försening. Vi går igenom tabeller, exempel och när beloppet kan minskas.",
};

export default function CompensationPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 text-slate-900">
        {/* Header */}
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Ersättningsbelopp
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Ersättningsbelopp enligt EU261 – 250, 400 och 600 €
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            EU-förordning 261/2004 (&quot;EU261&quot;) ger rätt till fasta
            ersättningsnivåer när ditt flyg är kraftigt försenat, inställt eller
            vid nekad ombordstigning. Här går vi igenom hur mycket du kan få,
            vad som styr beloppen och när de kan minskas.
          </p>
        </header>

        {/* Innehåll */}
        <section className="space-y-8 text-sm md:text-base text-slate-700">
          {/* Snabb överblick */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Snabb överblick – hur mycket kan du få?
            </h2>
            <p className="mt-2">
              Ersättningen enligt EU261 ligger normalt mellan{" "}
              <span className="font-medium">250 € och 600 € per person</span>.
              Beloppet beror i huvudsak på:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>hur lång flygsträckan är</li>
              <li>om flyget är inom EU eller internationellt</li>
              <li>hur mycket försening eller påverkan du drabbats av</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Det spelar alltså mindre roll vad biljetten kostade – två
              passagerare på samma flyg får normalt samma ersättningsbelopp.
            </p>
          </div>

          {/* Tabell med belopp */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Tabell: ersättningsnivåer enligt EU261
            </h2>
            <p className="mt-2">
              Nedan ser du de vanligaste schablonbeloppen enligt EU261 vid
              försenade och inställda flyg eller nekad ombordstigning:
            </p>

            <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-800">
                      Flygsträcka
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-800">
                      Typ av flyg
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-800">
                      Ersättning (per person)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Kortdistans (ca 0–1&nbsp;500 km)
                    </td>
                    <td className="px-4 py-3 align-top">Alla flyg</td>
                    <td className="px-4 py-3 align-top font-medium">
                      upp till 250&nbsp;€
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Medeldistans inom EU
                    </td>
                    <td className="px-4 py-3 align-top">
                      Inom EU/EES eller UK
                    </td>
                    <td className="px-4 py-3 align-top font-medium">
                      upp till 400&nbsp;€
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Medeldistans utanför EU (upp till ca 3&nbsp;500 km)
                    </td>
                    <td className="px-4 py-3 align-top">
                      EU-bolag eller avgång från EU
                    </td>
                    <td className="px-4 py-3 align-top font-medium">
                      upp till 400&nbsp;€
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Långdistans (över ca 3&nbsp;500 km)
                    </td>
                    <td className="px-4 py-3 align-top">
                      Internationella flyg som omfattas av EU261
                    </td>
                    <td className="px-4 py-3 align-top font-medium">
                      upp till 600&nbsp;€
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-2 text-sm text-slate-600">
              Exakt nivå beror på rutt, distans, hur mycket senare du anländer
              och om du erbjudits ombokning. Därför gör vi alltid en individuell
              bedömning när du skickar in ditt flyg.
            </p>
          </div>

          {/* När beloppet kan minskas */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              När kan ersättningen minskas med 50&nbsp;%?
            </h2>
            <p className="mt-2">
              I vissa fall kan flygbolaget ha rätt att halvera ersättningen, till
              exempel när:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>
                du blir ombokad till ett annat flyg,
              </li>
              <li>
                du anländer betydligt tidigare än du annars skulle ha gjort,
              </li>
              <li>
                den nya ankomsttiden ligger inom vissa tidsgränser enligt EU261.
              </li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Ett typiskt exempel är att du egentligen hade rätt till 600&nbsp;€
              men blir ombokad så att du &quot;bara&quot; anländer något timmar
              senare än planerat – då kan ersättningen i vissa fall sänkas till
              300&nbsp;€. Vi räknar på detta åt dig och kontrollerar om bolagets
              reducering verkligen är korrekt.
            </p>
          </div>

          {/* Störningstyper */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Vilka typer av störningar kan ge ersättning?
            </h2>
            <p className="mt-2">
              Samma ersättningsnivåer gäller i grunden för flera typer av
              störningar:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>
                <a
                  href="/delays"
                  className="font-medium text-slate-900 underline-offset-2 hover:underline hover:text-slate-700 transition-colors"
                >
                  Försenade flyg
                </a>{" "}
                – när du anländer 3 timmar eller mer efter planerad tid.
              </li>
              <li>
                <a
                  href="/cancellations"
                  className="font-medium text-slate-900 underline-offset-2 hover:underline hover:text-slate-700 transition-colors"
                >
                  Inställda flyg
                </a>{" "}
                – särskilt vid kort varsel och bristfällig ombokning.
              </li>
              <li>
                Nekad ombordstigning på grund av överbokning.
              </li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Vill du läsa mer om alla situationer som omfattas? Se vår sida{" "}
              <a
                href="/rights"
                className="font-medium text-slate-900 underline-offset-2 hover:underline hover:text-slate-700 transition-colors"
              >
                Dina rättigheter enligt EU261
              </a>
              .
            </p>
          </div>

          {/* Exempel */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Exempel: så kan beloppen se ut i praktiken
            </h2>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>
                Du flyger från Stockholm till London, landar 3 timmar och 20
                minuter sent – ersättning upp till 250&nbsp;€.
              </li>
              <li>
                Ditt flyg från Köpenhamn till Kanarieöarna ställs in två dagar
                innan avgång och du anländer betydligt senare med ombokning –
                ersättning upp till 400&nbsp;€.
              </li>
              <li>
                Ditt långflyg från Europa till USA ställs in samma dag och du
                kommer fram nästa dygn – ersättning upp till 600&nbsp;€.
              </li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Är ni flera i sällskapet multipliceras beloppen per person. En
              familj på fyra kan alltså ha rätt till upp mot 2&nbsp;400&nbsp;€
              i ersättning.
            </p>
          </div>

          {/* Missförstånd */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Vanliga missförstånd kring ersättningsbelopp
            </h2>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>
                <span className="font-medium">”Biljetten var billig, så jag får nog inget”</span>{" "}
                – fel. Ersättningen beror på distans och försening, inte
                biljettpriset.
              </li>
              <li>
                <span className="font-medium">
                  ”Jag accepterade en voucher – då har jag inga rättigheter kvar”
                </span>{" "}
                – du kan ibland ha rätt till pengar istället. Vi hjälper dig att
                reda ut vad du faktiskt accepterat.
              </li>
              <li>
                <span className="font-medium">
                  ”Flygbolaget sa att det var extraordinära omständigheter”
                </span>{" "}
                – många av dessa besked är felaktiga eller ofullständiga. Vi
                kontrollerar om deras motivering håller juridiskt.
              </li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Om du är osäker – skicka bara in ditt flyg, så gör vi en seriös
              bedömning utan kostnad.
            </p>
          </div>
        </section>

        {/* Footer / CTA */}
        <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>
              Vill du se vilket ersättningsbelopp som kan gälla för just din
              resa? Kolla ditt flyg – det tar bara någon minut.
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
