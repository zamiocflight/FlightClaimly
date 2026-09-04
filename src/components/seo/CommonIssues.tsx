type CommonIssuesProps = {
  airlineName: string;
  issues: string[];
  title?: string;
};

export default function CommonIssues({
  airlineName,
  issues,
  title = `Common ${airlineName} disruption types`,
}: CommonIssuesProps) {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        {title}
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
