import type { FAQ as FAQItem } from "@/data/seo/shared/faq";

type FAQProps = {
  items: FAQItem[];
};

export default function FAQ({ items }: FAQProps) {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Frequently asked questions
      </h2>

      <div className="mt-8 space-y-6">
        {items.map((item) => (
          <div key={item.question}>
            <h3 className="font-semibold text-slate-900">
              {item.question}
            </h3>

            <p className="mt-2 text-slate-700">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}