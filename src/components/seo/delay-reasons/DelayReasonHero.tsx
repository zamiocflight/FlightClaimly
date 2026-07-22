import type { DelayReason } from "@/data/delay-reasons/types";

type Props = {
  delayReason: DelayReason;
};

export default function DelayReasonHero({ delayReason }: Props) {
  return (
    <section className="space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">
        {delayReason.title}
      </h1>

      <p className="text-lg text-muted-foreground">
        {delayReason.description}
      </p>
    </section>
  );
}