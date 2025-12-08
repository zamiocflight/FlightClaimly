// src/app/privacy/page.tsx

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 text-slate-900">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Integritet
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Integritetspolicy för FlightClaimly
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            Din integritet är viktig för oss. På denna sida förklarar vi vilka uppgifter vi
            samlar in, varför vi gör det, hur vi använder dem och vilka rättigheter du har.
          </p>
        </header>

        <section className="space-y-8 text-sm md:text-base text-slate-700">
          {/* Personuppgiftsansvarig */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Personuppgiftsansvarig
            </h2>
            <p className="mt-2">
              FlightClaimly (”vi”, ”oss”) är personuppgiftsansvarig för behandling av
              personuppgifter i samband med vår tjänst för flygkompensation.
            </p>
          </div>

          {/* Vilka uppgifter vi samlar in */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Vilka uppgifter samlar vi in?
            </h2>
            <p className="mt-2">
              När du använder vår tjänst kan vi komma att behandla följande typer av
              personuppgifter:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>kontaktuppgifter (namn, e-post, telefonnummer)</li>
              <li>bokningsinformation (bokningsnummer, flygnummer, datum, rutter)</li>
              <li>biljetter och boardingkort (dokument, PDF:er, bilder)</li>
              <li>uppgifter om försening, inställning eller annan störning</li>
              <li>kommunikation med dig (e-post, meddelanden)</li>
              <li>teknisk information (IP-adress, enhet, webbläsare) i den mån det behövs för säkerhet och drift</li>
            </ul>
          </div>

          {/* Varför vi behandlar uppgifterna */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Varför behandlar vi dina uppgifter?
            </h2>
            <p className="mt-2">
              Vi behandlar dina personuppgifter för att kunna:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>bedöma om du har rätt till kompensation enligt EU261</li>
              <li>skapa och hantera ditt ärende mot flygbolaget</li>
              <li>kommunicera med dig om status i ärendet</li>
              <li>hantera utbetalningar när ersättning beviljas</li>
              <li>uppfylla rättsliga skyldigheter (t.ex. bokföring)</li>
              <li>förbättra och säkra vår tjänst</li>
            </ul>
          </div>

          {/* Rättslig grund */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Rättslig grund för behandling
            </h2>
            <p className="mt-2">
              Behandlingen av dina personuppgifter baseras främst på:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>
                <span className="font-medium">Avtal</span> – när vi behandlar uppgifter för att
                kunna ingå och fullgöra vårt uppdrag att driva ditt krav mot flygbolaget.
              </li>
              <li>
                <span className="font-medium">Rättslig förpliktelse</span> – när vi måste spara
                vissa uppgifter enligt lag, till exempel bokföringsregler.
              </li>
              <li>
                <span className="font-medium">Berättigat intresse</span> – när vi använder
                begränsad teknisk data för att förbättra säkerhet och drift i tjänsten.
              </li>
            </ul>
          </div>

          {/* Lagringstid */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Hur länge sparar vi dina uppgifter?
            </h2>
            <p className="mt-2">
              Vi sparar dina uppgifter så länge det behövs för att:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>hantera och avsluta ditt ärende mot flygbolaget</li>
              <li>hantera eventuella klagomål eller tvister kring ärendet</li>
              <li>uppfylla våra rättsliga skyldigheter (t.ex. bokföring)</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              När uppgifterna inte längre behövs raderar eller anonymiserar vi dem på ett säkert sätt.
            </p>
          </div>

          {/* Delning av uppgifter */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Med vem delar vi dina uppgifter?
            </h2>
            <p className="mt-2">
              Vi delar endast dina uppgifter med parter som behövs för att kunna leverera
              tjänsten, till exempel:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>flygbolag och deras representanter</li>
              <li>eventuella juridiska ombud eller samarbetspartners kopplade till ditt ärende</li>
              <li>leverantörer av IT-tjänster (hosting, e-post) med lämpliga avtal på plats</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Vi säljer inte dina personuppgifter vidare till tredje part.
            </p>
          </div>

          {/* Dina rättigheter */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Dina rättigheter
            </h2>
            <p className="mt-2">
              Som registrerad har du, inom ramen för gällande dataskyddslagstiftning, rätt att:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>begära utdrag över vilka uppgifter vi behandlar om dig</li>
              <li>begära rättelse av felaktiga eller ofullständiga uppgifter</li>
              <li>begära radering av uppgifter när de inte längre behövs</li>
              <li>invända mot viss behandling eller begära begränsning</li>
              <li>begära att uppgifter flyttas (dataportabilitet), i vissa fall</li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Om du vill utöva någon av dessa rättigheter kan du kontakta oss via
              <a
                href="mailto:info@flightclaimly.com"
                className="font-medium text-slate-900 underline-offset-2 hover:underline ml-1"
              >
                info@flightclaimly.com
              </a>
              .
            </p>
          </div>

          {/* Klagomål */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Klagomål
            </h2>
            <p className="mt-2">
              Om du anser att vi behandlar dina uppgifter i strid med gällande regler har du
              rätt att lämna in klagomål till relevant dataskyddsmyndighet i ditt land.
            </p>
          </div>

          {/* Ändringar */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Ändringar i denna policy
            </h2>
            <p className="mt-2">
              Vi kan komma att uppdatera denna integritetspolicy vid behov. Den senaste
              versionen finns alltid publicerad här på vår webbplats.
            </p>
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <p>
            Har du frågor om hur vi hanterar dina personuppgifter? Hör av dig på{" "}
            <a
              href="mailto:info@flightclaimly.com"
              className="font-medium text-slate-900 underline-offset-2 hover:underline"
            >
              info@flightclaimly.com
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
