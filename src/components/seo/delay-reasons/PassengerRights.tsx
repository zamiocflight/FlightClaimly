type Props = {
  passengerRights: string;
};

export default function PassengerRights({
  passengerRights,
}: Props) {
  return (
    <section className="mt-12 space-y-4">
      <h2 className="text-3xl font-semibold">
        Passenger rights under EU261
      </h2>

      <p className="leading-8 text-muted-foreground">
        {passengerRights}
      </p>
    </section>
  );
}