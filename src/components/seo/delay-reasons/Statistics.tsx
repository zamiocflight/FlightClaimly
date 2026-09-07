import StatisticsSection from "@/components/seo/Statistics";

import type { Statistic } from "@/data/seo/shared/types";

type Props = {
  statisticsIntro: string;
  statistics: Statistic[];
  locale: string;
};

export default function Statistics({
  statisticsIntro,
  statistics,
  locale,
}: Props) {
  return (
    <StatisticsSection
      title={locale === "sv" ? "Fakta" : locale === "da" ? "Fakta" : "Statistics"}
      intro={statisticsIntro}
      statistics={statistics}
    />
  );
}
