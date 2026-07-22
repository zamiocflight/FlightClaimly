import type { DelayReason } from "@/data/delay-reasons/types";

type Props = {
  delayReason: DelayReason;
};

export default function ExtraordinaryCircumstances({
  delayReason,
}: Props) {
  const isExtraordinary = delayReason.extraordinaryCircumstance;

  return (
    <section className="mt-12 rounded-xl border p-8">
      <h2 className="text-3xl font-semibold">
        Extraordinary circumstance
      </h2>

      <div className="mt-6 flex items-center gap-3">
        <div
          className={`h-4 w-4 rounded-full ${
            isExtraordinary ? "bg-red-500" : "bg-green-500"
          }`}
        />

        <span className="text-lg font-medium">
          {isExtraordinary
            ? "Usually considered extraordinary"
            : "Usually NOT considered extraordinary"}
        </span>
      </div>

      <p className="mt-6 leading-8 text-muted-foreground">
        {delayReason.compensationRules}
      </p>
    </section>
  );
}