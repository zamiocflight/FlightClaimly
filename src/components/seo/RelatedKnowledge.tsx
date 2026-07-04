import Link from "next/link";

type RelatedKnowledgeItem = {
  label: string;
  href: string;
  type: string;
};

type RelatedKnowledgeProps = {
  title: string;
  items: RelatedKnowledgeItem[];
};

export default function RelatedKnowledge({
  title,
  items,
}: RelatedKnowledgeProps) {
  if (!items.length) return null;

  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={`${item.type}-${item.href}`}
            href={item.href}
            className="rounded-xl border p-4 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <div className="text-sm font-semibold text-emerald-700">
              {item.type}
            </div>

            <div className="mt-2 font-bold text-slate-950">
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}