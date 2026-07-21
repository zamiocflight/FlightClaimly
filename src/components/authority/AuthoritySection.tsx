import type { AuthoritySource } from "@/data/authority/shared/types";

type AuthoritySectionProps = {
  title: string;
  sources: AuthoritySource[];
};

export default function AuthoritySection({
  title,
  sources,
}: AuthoritySectionProps) {
  if (!sources.length) return null;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold">{title}</h2>

        <div className="mt-6 space-y-4">
          {sources.map((source) => (
            <article
              key={source.id}
              className="rounded-xl border p-6"
            >
              <h3 className="text-xl font-semibold">
                {source.title}
              </h3>

              <p className="mt-2 text-slate-600">
                {source.description}
              </p>

              <div className="mt-4 space-y-2 text-sm">
  <div className="text-slate-500 capitalize">
    {source.sourceType}
  </div>

  <div className="text-slate-600">
    {source.sourceName}
  </div>

  <a
    href={source.url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex font-medium text-blue-600 hover:underline"
  >
    View official source →
  </a>
</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}