import type { DelayReason } from "@/data/delay-reasons/types";

type Props = {
  delayReason: DelayReason;
  locale: string;
};

export default function DelayReasonOverview({
  delayReason,
  locale,
}: Props) {
  return (
    <section className="mt-12 space-y-4">
      <h2 className="text-3xl font-semibold">
        {locale === "sv" ? "Översikt" : locale === "da" ? "Overblik" : "Overview"}
      </h2>

      <p className="text-muted-foreground leading-8">
        {delayReason.overview}
      </p>
    </section>
  );
}
