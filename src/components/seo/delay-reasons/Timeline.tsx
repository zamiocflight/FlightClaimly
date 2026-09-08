import TimelineSection from "@/components/seo/Timeline"; import type { TimelineStep } from "@/data/seo/shared/types";
type Props = { timelineIntro: string; timeline: TimelineStep[]; locale: string };
export default function Timeline({ timelineIntro, timeline, locale }: Props) { return <TimelineSection title={locale === "sv" ? "Så bedöms ärendet" : locale === "da" ? "Sådan vurderes sagen" : locale === "pl" ? "Jak oceniana jest sprawa" : locale === "de" ? "So wird der Fall geprüft" : "Timeline"} intro={timelineIntro} steps={timeline} />; }
