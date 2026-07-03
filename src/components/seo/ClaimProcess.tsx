type ClaimProcessProps = {
  steps: string[];
};

export default function ClaimProcess({ steps }: ClaimProcessProps) {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        How the claim process works
      </h2>

      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
              {index + 1}
            </span>
            <span className="text-slate-700">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}