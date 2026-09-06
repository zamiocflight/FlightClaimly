import FAQSection from "@/components/seo/FAQ";

import type { FAQ as FAQItem } from "@/data/seo/shared/types";

type Props = {
  faq: FAQItem[];
  locale: string;
};

export default function FAQ({ faq, locale }: Props) {
  return (
    <FAQSection
      items={faq}
      title={locale === "sv" ? "Vanliga frågor" : "Frequently asked questions"}
    />
  );
}