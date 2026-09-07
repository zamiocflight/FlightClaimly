import type { DelayReason } from "@/data/delay-reasons/types";

type Props = {
  delayReason: DelayReason;
  locale: string;
};

export default function ExtraordinaryCircumstances({
  delayReason,
  locale,
}: Props) {
  const isExtraordinary = delayReason.extraordinaryCircumstance;

  return (
    <section className="mt-12 rounded-xl border p-8">
      <h2 className="text-3xl font-semibold">
        {locale === "sv" ? "Extraordinär omständighet" : locale === "da" ? "Ekstraordinær omstændighed" : "Extraordinary circumstance"}
      </h2>

      <div className="mt-6 flex items-center gap-3">
        <div
          className={`h-4 w-4 rounded-full ${
            isExtraordinary ? "bg-red-500" : "bg-green-500"
          }`}
        />

        <span className="text-lg font-medium">
          {isExtraordinary
            ? locale === "sv"
              ? "Kan normalt vara extraordinär"
              : locale === "da"
                ? "Kan normalt være ekstraordinær"
                : "Usually considered extraordinary"
            : locale === "sv"
              ? "Normalt inte extraordinär"
              : locale === "da"
                ? "Normalt ikke ekstraordinær"
                : "Usually NOT considered extraordinary"}
        </span>
      </div>

      <p className="mt-6 leading-8 text-muted-foreground">
        {delayReason.compensationRules}
      </p>
    </section>
  );
}
