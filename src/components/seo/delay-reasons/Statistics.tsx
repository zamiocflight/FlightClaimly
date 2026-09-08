import StatisticsSection from "@/components/seo/Statistics"; import type { Statistic } from "@/data/seo/shared/types";
type Props = { statisticsIntro: string; statistics: Statistic[]; locale: string };
export default function Statistics({ statisticsIntro, statistics, locale }: Props) { return <StatisticsSection title={locale === "sv" || locale === "da" ? "Fakta" : locale === "pl" ? "Najważniejsze informacje" : locale === "de" ? "Wichtige Fakten" : "Statistics"} intro={statisticsIntro} statistics={statistics} />; }
