type Props = {
  delayReasonTitle: string;
  locale: string;
};

export default function RelatedKnowledge({
  delayReasonTitle,
  locale,
}: Props) {
  return (
    <section className="mt-12 space-y-4">
      <h2 className="text-3xl font-semibold">
        {locale === "sv" ? "Relaterad kunskap" : locale === "da" ? "Relateret viden" : "Related knowledge"}
      </h2>

      <p className="leading-8 text-muted-foreground">
        {locale === "sv" ? (
          <>
            Läs mer om {delayReasonTitle.toLowerCase()}, passagerarrättigheter och
            flygersättning enligt EU261.
          </>
        ) : locale === "da" ? (
          <>
            Læs mere om {delayReasonTitle.toLowerCase()}, passagerrettigheder og
            flykompensation efter EU261.
          </>
        ) : (
          <>
            Explore more information related to {delayReasonTitle.toLowerCase()},
            passenger rights and flight compensation under EU261.
          </>
        )}
      </p>
    </section>
  );
}
