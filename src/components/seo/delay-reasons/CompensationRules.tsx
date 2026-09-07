type Props = {
  compensationRules: string;
  locale: string;
};

export default function CompensationRules({
  compensationRules,
  locale,
}: Props) {
  return (
    <section className="mt-12 space-y-4">
      <h2 className="text-3xl font-semibold">
        {locale === "sv" ? "Ersättningsregler" : locale === "da" ? "Kompensationsregler" : "Compensation rules"}
      </h2>

      <p className="leading-8 text-muted-foreground">
        {compensationRules}
      </p>
    </section>
  );
}
