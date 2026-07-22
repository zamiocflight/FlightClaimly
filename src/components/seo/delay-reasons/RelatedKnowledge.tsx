type Props = {
  delayReasonTitle: string;
};

export default function RelatedKnowledge({
  delayReasonTitle,
}: Props) {
  return (
    <section className="mt-12 space-y-4">
      <h2 className="text-3xl font-semibold">
        Related knowledge
      </h2>

      <p className="leading-8 text-muted-foreground">
        Explore more information related to {delayReasonTitle.toLowerCase()},
        passenger rights and flight compensation under EU261.
      </p>
    </section>
  );
}