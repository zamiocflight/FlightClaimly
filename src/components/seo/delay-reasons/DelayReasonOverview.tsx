import type { DelayReason } from "@/data/delay-reasons/types";

type Props = {
  delayReason: DelayReason;
};

export default function DelayReasonOverview({
  delayReason,
}: Props) {
  return (
    <section className="mt-12 space-y-4">
      <h2 className="text-3xl font-semibold">
        Overview
      </h2>

      <p className="text-muted-foreground leading-8">
        {delayReason.overview}
      </p>
    </section>
  );
}