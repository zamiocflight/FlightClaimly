type CommonIssuesProps = {
  airlineName: string;
  issues: string[];
};

export default function CommonIssues({
  airlineName,
  issues,
}: CommonIssuesProps) {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Common {airlineName} disruption types
      </h2>

      <ul className="mt-6 space-y-3">
        {issues.map((issue) => (
          <li key={issue} className="text-slate-700">
            ✓ {issue}
          </li>
        ))}
      </ul>
    </div>
  );
}