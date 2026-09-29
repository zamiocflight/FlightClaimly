import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { buildI18nMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildI18nMetadata({
    locale: "en",
    path: "/compare/refly",
    title: "FlightClaimly vs ReFly: fees compared (2026)",
    description:
      "Compare FlightClaimly and ReFly flight compensation fees. FlightClaimly's standard fee is 20% incl. VAT; ReFly publishes 33% incl. VAT.",
    includeXDefault: false,
  });
}

const rows = [
  ["Standard fee", "20% incl. VAT", "33% incl. VAT"],
  ["You keep from €250", "€200", "€167.50"],
  ["You keep from €400", "€320", "€268"],
  ["You keep from €600", "€480", "€402"],
  ["No upfront fee", "Yes", "Yes"],
  ["No recovery / no standard fee", "Yes", "Yes"],
  ["Fee when legal action is required", "30% total incl. VAT", "50% incl. VAT"],
  ["You keep from €600 if legal action applies", "€420", "€300"],
];

const faqs = [
  {
    q: "Is FlightClaimly cheaper than ReFly?",
    a: "Based on the standard fees published on 29 September 2026, FlightClaimly charges 20% including VAT and ReFly charges 33% including VAT. On a €600 recovery, that means €120 versus €198 in standard fees.",
  },
  {
    q: "How much do I keep from €600 with FlightClaimly or ReFly?",
    a: "At the published standard rates, you keep €480 with FlightClaimly and €402 with ReFly from a €600 recovery.",
  },
  {
    q: "Do FlightClaimly and ReFly charge upfront?",
    a: "Both publish no-upfront-fee models. Their terms also state that no standard fee is charged when compensation is not recovered.",
  },
  {
    q: "What happens to the fee if legal action is required?",
    a: "FlightClaimly states a total fee of 30% including VAT when legal action is required. ReFly's published price list states a 50% fee including VAT for legal proceedings.",
  },
];

export default function ReflyComparisonPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-[#061329] text-white">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">FLIGHTCLAIMLY</Link>
          <Link href="/" className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950">Check my flight</Link>
        </div>
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Fee comparison · checked 29 September 2026</p>
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            FlightClaimly vs ReFly
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-300">
            Both services pursue flight compensation on a no-upfront-fee basis. The clearest difference is the published fee: FlightClaimly charges 20% including VAT as its standard fee, while ReFly publishes 33% including VAT.
          </p>
          <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6">
              <p className="text-sm text-slate-400">FlightClaimly standard fee</p>
              <p className="mt-2 text-5xl font-extrabold text-emerald-300">20%</p>
              <p className="mt-2 text-sm text-slate-300">You keep €480 from €600</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6">
              <p className="text-sm text-slate-400">ReFly published standard fee</p>
              <p className="mt-2 text-5xl font-extrabold">33%</p>
              <p className="mt-2 text-sm text-slate-300">You keep €402 from €600</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-400">Difference on a €600 recovery at the standard rates: €78 more remains with the passenger under FlightClaimly's published fee.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Side-by-side</p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight">Published fees compared</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          The figures below use FlightClaimly's current pricing and ReFly's official Terms & Conditions. They are factual fee comparisons, not a ranking of claim outcomes, speed or service quality.
        </p>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-slate-50">
              <tr><th className="p-5">Comparison</th><th className="p-5">FlightClaimly</th><th className="p-5">ReFly</th></tr>
            </thead>
            <tbody>
              {rows.map(([label, ours, theirs]) => (
                <tr key={label} className="border-t border-slate-200">
                  <th className="p-5 font-semibold">{label}</th>
                  <td className="p-5 font-bold text-emerald-700">{ours}</td>
                  <td className="p-5 text-slate-700">{theirs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-500">
          Checked 29 September 2026. Providers can change their pricing. Exceptional case-specific costs may also apply. Always review the current terms before submitting a claim.
        </p>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">€600 example</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight">€78 difference at the standard fee</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              If €600 is recovered, FlightClaimly's 20% standard fee is €120, leaving €480. ReFly's published 33% fee is €198, leaving €402.
            </p>
          </div>
          <div className="rounded-3xl bg-[#061329] p-8 text-white">
            <div className="flex justify-between border-b border-slate-700 pb-5"><span>Compensation recovered</span><strong>€600</strong></div>
            <div className="flex justify-between border-b border-slate-700 py-5"><span>FlightClaimly fee</span><strong>− €120</strong></div>
            <div className="flex justify-between pt-5 text-2xl"><strong>You keep</strong><strong className="text-emerald-300">€480</strong></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Legal action</p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight">The fee difference can become larger</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          If legal action is required, FlightClaimly's published total fee is 30% including VAT. ReFly's price list states 50% including VAT for legal proceedings. On €600, those published rates leave €420 and €300 respectively.
        </p>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Sources</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight">Verify the numbers yourself</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Link href="/fees" className="rounded-2xl border border-slate-200 bg-white p-6 font-bold hover:border-emerald-400">FlightClaimly fees & comparison →</Link>
            <a href="https://www.refly.org/en-gb/terms-and-conditions.html" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-200 bg-white p-6 font-bold hover:border-emerald-400">ReFly official Terms & Conditions →</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">FAQ</p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight">FlightClaimly vs ReFly questions</h2>
        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((item) => (
            <div key={item.q} className="py-7"><h3 className="text-xl font-bold">{item.q}</h3><p className="mt-3 leading-7 text-slate-600">{item.a}</p></div>
          ))}
        </div>
      </section>

      <section className="bg-[#061329] text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">20% standard fee · including VAT</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Keep 80% of your compensation.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">Check your flight in a few minutes. If your claim qualifies, we can take it from there.</p>
          <Link href="/" className="mt-8 inline-block rounded-full bg-emerald-400 px-7 py-4 font-bold text-slate-950">Check my flight</Link>
        </div>
      </section>
    </main>
  );
}
