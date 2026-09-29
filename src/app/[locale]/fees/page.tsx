import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { buildI18nMetadata } from "@/lib/seo";

const competitors = [
  {
    name: "AirAdvisor",
    standardFee: "30% incl. VAT",
    keep: "€420",
    source: "https://airadvisor.com/en/pricelist",
  },
  {
    name: "ReFly",
    standardFee: "33% incl. VAT",
    keep: "€402",
    source: "https://www.refly.org/terms-and-conditions.html",
  },
  {
    name: "AirHelp",
    standardFee: "35% incl. VAT",
    keep: "€390",
    source: "https://www.airhelp.com/en-int/our-fees/",
  },
  {
    name: "SkyRefund",
    standardFee: "35% incl. VAT",
    keep: "€390",
    source: "https://skyrefund.com/en/price-policy",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildI18nMetadata({
    locale: "en",
    path: "/fees",
    title: "FlightClaimly fees: 20% success fee, you keep 80%",
    description:
      "FlightClaimly charges a 20% success fee including VAT. No upfront fee, and no service fee if we do not recover compensation. See examples and compare standard fees.",
  });
}

export default function FeesPage() {

  const faq = [
    {
      q: "How much does FlightClaimly charge?",
      a: "Our standard service fee is 20% including VAT of the compensation we recover for you.",
    },
    {
      q: "Is FlightClaimly no win, no fee?",
      a: "Yes. There is no upfront service fee. If we do not recover compensation for you, there is no standard service fee.",
    },
    {
      q: "How much do I keep from €600?",
      a: "If we recover €600 and the standard 20% fee applies, our fee is €120 and you keep €480.",
    },
    {
      q: "Is VAT included in the 20% fee?",
      a: "Yes. FlightClaimly's standard 20% service fee includes VAT.",
    },
    {
      q: "What if legal action is needed?",
      a: "If legal action is required, an additional 10% legal action fee applies, bringing our total fee to 30% including VAT. If a case involves exceptional third-party costs, we explain them and obtain your approval before proceeding.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "FlightClaimly flight compensation claim service",
    provider: { "@type": "Organization", name: "FlightClaimly" },
    description:
      "FlightClaimly handles eligible flight compensation claims on a no-win, no-fee basis with a standard 20% service fee including VAT.",
    url: "https://www.flightclaimly.com/en/fees",
  };

  return (
    <>
      <script
        id="fees-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        id="fees-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c") }}
      />

      <main className="min-h-screen bg-white text-slate-900">
        <header className="border-b border-white/5 bg-[#050B1A]">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo-flightclaimly.svg"
                alt="FlightClaimly"
                width={240}
                height={48}
                priority
                className="h-10 w-auto sm:h-11"
              />
            </Link>
            <Link
              href="/check"
              className="rounded-full bg-[#22E3A5] px-4 py-2 text-sm font-bold text-[#071126] transition hover:brightness-105"
            >
              Check my flight
            </Link>
          </div>
        </header>

        <section className="relative overflow-hidden bg-[#071126]">
          <div aria-hidden className="absolute left-[12%] top-20 h-72 w-72 rounded-full bg-[#22E3A5]/[0.07] blur-[100px]" />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22E3A5]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#22E3A5]">
                    Clear pricing
                  </span>
                </div>
                <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-[-0.045em] text-white sm:text-5xl md:text-[64px] md:leading-[1.02]">
                  20% fee. <span className="text-[#22E3A5]">You keep 80%.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                  FlightClaimly charges a standard 20% success fee including VAT. You pay nothing upfront, and there is no standard service fee if we do not recover compensation for you.
                </p>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-white/80">
                  {["No upfront cost", "No win, no fee", "20% incl. VAT"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#22E3A5]/30 text-[11px] text-[#22E3A5]">✓</span>
                      {item}
                    </span>
                  ))}
                </div>
                <Link
                  href="/check"
                  className="mt-9 inline-flex rounded-full bg-[#22E3A5] px-6 py-3.5 text-sm font-bold text-[#071126] transition hover:brightness-105"
                >
                  Check my flight
                </Link>
              </div>

              <div className="rounded-[24px] border border-white/[0.12] bg-white/[0.045] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.20)] sm:p-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">€600 example</div>
                <div className="mt-7 space-y-5">
                  <div className="flex items-end justify-between border-b border-white/10 pb-5">
                    <span className="text-sm font-medium text-white/60">Compensation recovered</span>
                    <span className="text-4xl font-extrabold text-white">€600</span>
                  </div>
                  <div className="flex items-end justify-between border-b border-white/10 pb-5">
                    <span className="text-sm font-medium text-white/60">FlightClaimly fee</span>
                    <span className="text-2xl font-semibold text-white/75">− €120</span>
                  </div>
                  <div className="flex items-end justify-between pt-2">
                    <span className="font-semibold text-white">You keep</span>
                    <span className="text-[52px] font-extrabold leading-none text-[#22E3A5]">€480</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Simple maths</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">What do you keep?</h2>
            <p className="mt-4 text-slate-600">Our standard fee is always calculated as 20% of the compensation recovered and already includes VAT.</p>
          </div>
          <div className="mt-9 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-5 py-4 font-semibold">Compensation</th>
                  <th className="px-5 py-4 font-semibold">Our 20% fee</th>
                  <th className="px-5 py-4 font-semibold">You keep</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm sm:text-base">
                {[["€250", "€50", "€200"], ["€400", "€80", "€320"], ["€600", "€120", "€480"]].map((row) => (
                  <tr key={row[0]}>
                    <td className="px-5 py-5 font-semibold">{row[0]}</td>
                    <td className="px-5 py-5 text-slate-600">{row[1]}</td>
                    <td className="px-5 py-5 text-lg font-extrabold text-emerald-600">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Fee comparison</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">How standard claim fees compare</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Publicly listed standard fees differ between claim companies. The comparison below uses each provider&apos;s own published pricing and shows what remains from a €600 recovery before any case-specific or legal-action charges.
              </p>
            </div>

            <div className="mt-9 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-[680px] text-left">
                <thead className="bg-[#071126] text-sm text-white/75">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Provider</th>
                    <th className="px-5 py-4 font-semibold">Published standard fee</th>
                    <th className="px-5 py-4 font-semibold">You keep from €600</th>
                    <th className="px-5 py-4 font-semibold">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  <tr className="bg-emerald-50/60">
                    <td className="px-5 py-5 font-extrabold">FlightClaimly</td>
                    <td className="px-5 py-5 font-bold">20% incl. VAT</td>
                    <td className="px-5 py-5 text-lg font-extrabold text-emerald-600">€480</td>
                    <td className="px-5 py-5"><Link href="/terms" className="font-semibold underline decoration-slate-300 underline-offset-4">Our terms</Link></td>
                  </tr>
                  {competitors.map((item) => (
                    <tr key={item.name}>
                      <td className="px-5 py-5 font-semibold">{item.name}</td>
                      <td className="px-5 py-5 text-slate-700">{item.standardFee}</td>
                      <td className="px-5 py-5 font-bold">{item.keep}</td>
                      <td className="px-5 py-5">
                        <a href={item.source} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-950">
                          Official pricing ↗
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-4xl text-xs leading-5 text-slate-500">
              Checked 29 September 2026. This compares publicly listed standard claim fees, not subscriptions, promotions, or every possible legal/case-specific charge. Providers can change their pricing; use the linked official sources for the latest terms.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Why 20%?</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Built to keep overhead low — and your share higher.</h2>
            <p className="mt-5 leading-7 text-slate-600">
              We use automation and modern flight data to handle straightforward parts of the claims process efficiently. That helps us keep our standard success fee at 20% including VAT.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              You still get a managed claim: we review your case, communicate with the airline and keep you updated while the claim is handled.
            </p>
          </div>
          <div className="rounded-3xl bg-[#071126] p-7 text-white sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#22E3A5]">One family. One example.</p>
            <h3 className="mt-4 text-2xl font-extrabold">Four €600 claims</h3>
            <p className="mt-4 leading-7 text-white/65">
              At a 20% standard fee, four passengers keep €1,920 from €2,400 recovered. At a 35% standard fee, they would keep €1,560.
            </p>
            <div className="mt-7 border-t border-white/10 pt-6">
              <div className="text-sm text-white/55">Difference kept by the family</div>
              <div className="mt-1 text-5xl font-extrabold text-[#22E3A5]">€360</div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Pricing FAQ</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Questions about our fee</h2>
            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {faq.map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="text-lg font-bold">{item.q}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Full conditions are available in our <Link href="/terms" className="font-semibold underline underline-offset-4">Terms &amp; Conditions</Link>.
            </p>
          </div>
        </section>

        <section className="bg-[#071126]">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#22E3A5]">No upfront cost</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white">Keep 80% of your compensation.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/65">Check your flight in minutes. If your case qualifies, we can take it from there.</p>
            <Link href="/check" className="mt-8 inline-flex rounded-full bg-[#22E3A5] px-7 py-3.5 text-sm font-bold text-[#071126] transition hover:brightness-105">
              Check my flight
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
