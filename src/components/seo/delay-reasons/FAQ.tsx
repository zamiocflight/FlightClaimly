import FAQSection from "@/components/seo/FAQ";

import type { FAQ as FAQItem } from "@/data/seo/shared/types";

type Props = {
  faq: FAQItem[];
};

export default function FAQ({ faq }: Props) {
  return <FAQSection items={faq} />;
}