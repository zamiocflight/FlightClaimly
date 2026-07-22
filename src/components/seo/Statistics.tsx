import type { Statistic } from "@/data/seo/shared/types";

type StatisticsProps = {
  title: string;
  intro: string;
  statistics: Statistic[];
};

export default function Statistics({
  title,
  intro,
  statistics,
}: StatisticsProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-4 leading-7 text-slate-700">
        {intro}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {statistics.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border bg-slate-50 p-5"
          >
            <div className="text-3xl font-bold text-sky-700">
              {item.value}
            </div>

            <div className="mt-2 font-semibold text-slate-900">
              {item.label}
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}