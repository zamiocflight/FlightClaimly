import StatisticsSection from "@/components/seo/Statistics";

import type { Statistic } from "@/data/seo/shared/types";

type Props = {
  statisticsIntro: string;
  statistics: Statistic[];
};

export default function Statistics({
  statisticsIntro,
  statistics,
}: Props) {
  return (
    <StatisticsSection
      title="Statistics"
      intro={statisticsIntro}
      statistics={statistics}
    />
  );
}