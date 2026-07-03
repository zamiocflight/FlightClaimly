import type { Airline } from "@/data/seo/airlines";

type HeroProps = {
  airline: Airline;
  checkUrl: string;
};

export default function Hero({ airline, checkUrl }: HeroProps) {
  return (
    <section className="bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
          EU261 / UK261 · No win, no fee
        </p>

        <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
          {airline.name} flight compensation
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          {airline.intro}
        </p>

        <a
          href={checkUrl}
          className="mt-8 inline-flex rounded-xl bg-emerald-400 px-6 py-4 font-semibold text-slate-950 transition hover:bg-emerald-300"
        >
          Check your {airline.name} flight
        </a>
      </div>
    </section>
  );
}