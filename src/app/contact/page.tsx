// src/app/contact/page.tsx

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 text-slate-900">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Kontakt
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Kontakta FlightClaimly
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            Har du frågor om ett ärende, om EU261-reglerna eller om hur processen fungerar?
            Du är alltid välkommen att höra av dig. Vi svarar så snabbt vi kan.
          </p>
        </header>

        <section className="space-y-8 text-sm md:text-base text-slate-700">
          {/* Email */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              E-post
            </h2>
            <p>
              Du når oss enklast via mail:
            </p>
            <a
              href="mailto:info@flightclaimly.com"
              className="font-medium text-slate-900 underline-offset-2 hover:underline"
            >
              info@flightclaimly.com
            </a>
            <p className="text-sm text-slate-600 mt-1">
              Vi återkommer så fort vi kan. Under hög belastning kan svarstiden vara något längre.
            </p>
          </div>

          {/* Vanliga frågor */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Vanliga frågor
            </h2>
            <p className="mt-2">
              Många frågor finns redan besvarade i vår{" "}
              <a
                href="/faq"
                className="font-medium text-slate-900 underline-offset-2 hover:underline"
              >
                FAQ
              </a>
              . Där hittar du korta och tydliga svar om ersättning, process och vad som gäller i olika situationer.
            </p>
          </div>

          {/* EU-rättigheter */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Dina rättigheter
            </h2>
            <p className="mt-2">
              Vill du läsa mer om vad du har rätt till enligt EU261? Besök:
            </p>
            <a
              href="/rights"
              className="font-medium text-slate-900 underline-offset-2 hover:underline"
            >
              Dina rättigheter
            </a>
          </div>

          {/* Pågående ärende */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Har du ett pågående ärende?
            </h2>
            <p className="mt-2">
              Du kan följa statusen när som helst via länken du fick i mail när du skapade ärendet.
            </p>
            <p className="mt-2">
              Har du tappat bort länken? Ingen fara – skriv till oss på{" "}
              <a
                href="mailto:info@flightclaimly.com"
                className="font-medium text-slate-900 underline-offset-2 hover:underline"
              >
                info@flightclaimly.com
              </a>{" "}
              så skickar vi den igen.
            </p>
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>
              Vill du kolla om ditt flyg ger rätt till ersättning? Det tar bara någon minut.
            </p>
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
  Kolla mitt flyg
</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
