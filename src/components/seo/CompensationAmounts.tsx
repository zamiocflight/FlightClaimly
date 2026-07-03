type CompensationAmount = {
  label: string;
  distance: string;
  amount: string;
};

type CompensationAmountsProps = {
  title: string;
  intro: string;
  amounts: CompensationAmount[];
};

export default function CompensationAmounts({
  title,
  intro,
  amounts,
}: CompensationAmountsProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

      <p className="mt-4 leading-7 text-slate-700">{intro}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {amounts.map((item) => (
          <div key={item.label} className="rounded-xl border bg-slate-50 p-5">
            <div className="text-sm font-semibold text-slate-600">
              {item.label}
            </div>
            <div className="mt-2 text-3xl font-bold text-emerald-700">
              {item.amount}
            </div>
            <div className="mt-2 text-sm text-slate-600">
              {item.distance}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}