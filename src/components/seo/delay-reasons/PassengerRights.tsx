type Props = {
  passengerRights: string;
  locale: string;
};

export default function PassengerRights({
  passengerRights,
  locale,
}: Props) {
  return (
    <section className="mt-12 space-y-4">
      <h2 className="text-3xl font-semibold">
        {locale === "sv" ? "Passagerarrättigheter enligt EU261" : locale === "da" ? "Passagerrettigheder efter EU261" : "Passenger rights under EU261"}
      </h2>

      <p className="leading-8 text-muted-foreground">
        {passengerRights}
      </p>
    </section>
  );
}
