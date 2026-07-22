import type { TimelineStep } from "@/data/seo/shared/types";

type TimelineProps = {
  title: string;
  intro: string;
  steps: TimelineStep[];
};

export default function Timeline({
  title,
  intro,
  steps,
}: TimelineProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-4 leading-7 text-slate-700">
        {intro}
      </p>

      <ol className="mt-6 space-y-5">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 font-bold text-sky-700">
              {index + 1}
            </span>

            <div>
              <h3 className="font-semibold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-1 leading-6 text-slate-700">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}