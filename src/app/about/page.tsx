// src/app/about/page.tsx

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 text-slate-900">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Om oss
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Vi hjälper dig få ersättning när flyget strulat
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            FlightClaimly är en EU-baserad tjänst som gör det enkelt att kräva ersättning
            från flygbolag enligt EU261. Målet är att du ska få de pengar du har rätt till –
            utan krångel, stress eller juridiska hinder.
          </p>
        </header>

        <section className="space-y-8 text-sm md:text-base text-slate-700">
          {/* Varför vi startade FlightClaimly */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Varför finns FlightClaimly?
            </h2>
            <p className="mt-2">
              Varje år går stora summor i flygkompensation aldrig till passagerarna.
              Många orkar inte, vet inte hur reglerna fungerar eller får nej första gången
              och ger upp.
            </p>
            <p className="mt-2">
              FlightClaimly skapades för att göra processen så enkel som möjligt:
              du fyller i ditt flyg, laddar upp din bokning – vi sköter resten och
              driver ärendet mot flygbolaget åt dig.
            </p>
          </div>

          {/* Så fungerar tjänsten */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Så fungerar tjänsten
            </h2>
            <ol className="mt-2 ml-5 list-decimal space-y-1">
              <li>Du fyller i dina flygdetaljer och vad som hänt.</li>
              <li>Vi analyserar ärendet utifrån EU261-regelverket.</li>
              <li>Vi driver kravet mot flygbolaget åt dig.</li>
              <li>Du betalar först när du får ersättning.</li>
            </ol>
            <p className="mt-2 text-sm text-slate-600">
              Allt sköts digitalt – snabbt, tryggt och transparent.
            </p>
          </div>

          {/* Affärsmodell / no win no fee */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Vår modell – enkel och transparent
            </h2>
            <p className="mt-2">
              Vi tror på en enkel princip:{" "}
              <span className="font-medium">no win, no fee</span>.
              Det betyder att vi bara tjänar pengar när du gör det.
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>det kostar ingenting att skapa ett ärende</li>
              <li>vi tar bara betalt om du faktiskt får ersättning</li>
              <li>vår avgift är tydlig och framgår innan du godkänner</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Ingen ersättning från flygbolaget = inga kostnader till FlightClaimly.
            </p>
          </div>

          {/* Trygghet & tracking */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Fokus på tydlighet och trygghet
            </h2>
            <p className="mt-2">
              Vi vill att du alltid ska veta var ditt ärende står. Därför kan du följa
              processen via vår spårningssida, där du ser:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>när vi mottagit ditt ärende</li>
              <li>när vi granskar det</li>
              <li>när det skickats till flygbolaget</li>
              <li>när ersättning betalats ut</li>
            </ul>
            <p className="mt-2">
              Du får dessutom mail när statusen uppdateras, så att du slipper jaga
              kundtjänst eller logga in i onödiga portaler.
            </p>
          </div>

          {/* Oberoende & på passagerarens sida */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Oberoende och på din sida
            </h2>
            <p className="mt-2">
              FlightClaimly arbetar helt enligt EU:s passagerarrättigheter (EU261/2004)
              och är oberoende från flygbolagen. Vårt enda uppdrag är att företräda dig
              som passagerare och se till att reglerna följs i praktiken – inte bara på papper.
            </p>
            <p className="mt-2">
              Vi tar striden mot flygbolag och byråkrati så att du kan fokusera på din resa,
              inte på paragrafer och formulär.
            </p>
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>
              Har ditt flyg drabbats? Kolla om du har rätt till ersättning – det tar bara
              någon minut.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                Få kompensation
              </a>
              <a
  href="/"
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
  Kontakt & samarbeten
</a>

            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
