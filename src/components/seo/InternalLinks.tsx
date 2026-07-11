import RelatedKnowledge from "@/components/seo/RelatedKnowledge";
import type { InternalLinkSection } from "@/lib/seo/internalLinks";

type InternalLinksProps = {
  sections: InternalLinkSection[];
};

export default function InternalLinks({
  sections,
}: InternalLinksProps) {
  if (!sections.length) return null;

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-10">
        {sections.map((section) => (
          <RelatedKnowledge
            key={section.title}
            title={section.title}
            items={section.items}
          />
        ))}
      </div>
    </section>
  );
}