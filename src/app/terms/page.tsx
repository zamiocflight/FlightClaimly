// src/app/terms/page.tsx

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 text-slate-900">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Villkor
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Användarvillkor för FlightClaimly
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            Dessa villkor beskriver hur FlightClaimly fungerar och vilka rättigheter och
            skyldigheter som gäller när du använder vår tjänst för att driva krav på
            flygkompensation.
          </p>
        </header>

        <section className="space-y-8 text-sm md:text-base text-slate-700">
          {/* Tillämpning */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              1. Om tjänsten
            </h2>
            <p className="mt-2">
              FlightClaimly är en tjänst som hjälper flygpassagerare att utreda och driva krav
              på kompensation enligt EU261 och liknande regelverk. Vi agerar som ombud för dig
              gentemot flygbolaget.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Genom att skicka in ett ärende via vår webbplats godkänner du dessa villkor.
            </p>
          </div>

          {/* Användning */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              2. Din användning av tjänsten
            </h2>
            <p className="mt-2">
              Du förbinder dig att:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>lämna korrekta och fullständiga uppgifter om ditt flyg</li>
              <li>inte skapa ärenden som du vet är felaktiga eller missvisande</li>
              <li>informera oss om du redan anlitat någon annan för samma krav</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Vi förbehåller oss rätten att avbryta hanteringen av ett ärende om vi bedömer
              att uppgifterna är felaktiga eller om förutsättningarna för krav saknas.
            </p>
          </div>

          {/* Fullmakt / ombud */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              3. Ombud och fullmakt
            </h2>
            <p className="mt-2">
              För att kunna driva ditt krav behöver vi ibland agera som ombud gentemot
              flygbolaget. Genom att använda tjänsten godkänner du att vi kontaktar
              flygbolaget i ditt namn och företräder dina intressen i samband med ärendet.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              I vissa fall kan vi be dig signera en separat fullmakt eller ett särskilt
              uppdragsavtal, till exempel om ärendet behöver eskaleras.
            </p>
          </div>

          {/* Avgifter */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              4. Avgifter och ersättning
            </h2>
            <p className="mt-2">
              FlightClaimly arbetar enligt principen{" "}
              <span className="font-medium">no win, no fee</span>.
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>det kostar ingenting att skicka in ett ärende</li>
              <li>vi tar bara betalt om vi lyckas få ersättning från flygbolaget</li>
              <li>vår avgift är en procentuell andel av den ersättning du får</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Den aktuella procentsatsen och eventuella övriga villkor framgår tydligt i
              samband med att du godkänner att vi driver ditt ärende.
            </p>
          </div>

          {/* Utbetalningar */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              5. Utbetalning till dig
            </h2>
            <p className="mt-2">
              När flygbolaget betalat ut kompensation kan utbetalning ske antingen:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>direkt till FlightClaimly, varefter vi vidarebefordrar din del till dig, eller</li>
              <li>direkt till dig, efter avdrag för vår avgift enligt separat överenskommelse</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Vi strävar efter att genomföra utbetalningar så snart som möjligt efter att
              ersättningen mottagits och identifierats.
            </p>
          </div>

          {/* Ansvarsbegränsning */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              6. Ansvar och begränsningar
            </h2>
            <p className="mt-2">
              Vi kan inte garantera att ett krav leder till ersättning. Bedömningen görs
              alltid utifrån tillgänglig information och gällande regelverk, men utfallet
              beror i slutändan på flygbolagets och eventuellt myndigheters beslut.
            </p>
            <p className="mt-2">
              FlightClaimly ansvarar inte för indirekta skador, såsom utebliven vinst eller
              följdkostnader, utan vårt ansvar är i normalfallet begränsat till den avgift
              du betalat för tjänsten.
            </p>
          </div>

          {/* Dataskydd */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              7. Personuppgifter och integritet
            </h2>
            <p className="mt-2">
              Vi behandlar personuppgifter i enlighet med gällande dataskyddslagstiftning.
              Mer information om hur vi hanterar dina uppgifter finns i vår{" "}
              <a
                href="/privacy"
                className="font-medium text-slate-900 underline-offset-2 hover:underline"
              >
                integritetspolicy
              </a>
              .
            </p>
          </div>

          {/* Ändringar */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              8. Ändringar av villkoren
            </h2>
            <p className="mt-2">
              Vi kan komma att uppdatera dessa villkor vid behov. Den senaste versionen
              finns alltid på vår webbplats. Om större ändringar görs kommer vi, när det är
              relevant, att informera dig via e-post eller i samband med att du använder
              tjänsten.
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              9. Kontakt
            </h2>
            <p className="mt-2">
              Har du frågor om dessa villkor är du välkommen att kontakta oss på{" "}
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
          <p>
            Genom att använda FlightClaimly bekräftar du att du har läst och förstått dessa
            villkor.
          </p>
        </footer>
      </div>
    </main>
  );
}
