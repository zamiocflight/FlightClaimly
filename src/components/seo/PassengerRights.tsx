type PassengerRightsProps = {
  title: string;
  body: string;
};

export default function PassengerRights({
  title,
  body,
}: PassengerRightsProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-4 leading-7 text-slate-700">
        {body}
      </p>
    </section>
  );
}