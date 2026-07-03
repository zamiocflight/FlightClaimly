type QuickFactsProps = {
  facts: {
    label: string;
    value: string | number;
  }[];
};

export default function QuickFacts({ facts }: QuickFactsProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Quick facts
      </h2>

      <dl className="mt-6 divide-y">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="flex items-center justify-between py-3"
          >
            <dt className="font-medium text-slate-600">
              {fact.label}
            </dt>

            <dd className="font-semibold text-slate-900">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}