import TimelineSection from "@/components/seo/Timeline";

import type { TimelineStep } from "@/data/seo/shared/types";

type Props = {
  timelineIntro: string;
  timeline: TimelineStep[];
};

export default function Timeline({
  timelineIntro,
  timeline,
}: Props) {
  return (
    <TimelineSection
      title="Timeline"
      intro={timelineIntro}
      steps={timeline}
    />
  );
}