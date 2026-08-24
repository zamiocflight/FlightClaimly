import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { getClaimById } from "@/lib/claims";
import PassengerAuthorityClient from "./PassengerAuthorityClient";

type PageProps = {
  params: Promise<{
    locale: string;
    token: string;
  }>;
};

export default async function PassengerAuthorityPage({
  params,
}: PageProps) {
  const { locale, token } = await params;

  const sb = supabaseAdmin();

  const { data: passenger, error } = await sb
    .from("passenger_authorizations")
    .select("*")
    .eq("invite_token", token)
    .maybeSingle();

  if (error) {
    console.error("Failed to load passenger authorization:", error);
    throw new Error("Failed to load passenger authorization");
  }

  if (!passenger) {
    notFound();
  }

  const claim = await getClaimById(passenger.claim_id);

  if (!claim) {
    notFound();
  }

  const fullName = `${passenger.first_name} ${passenger.last_name}`.trim();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Passenger authorisation
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            Hi {passenger.first_name}
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            You have been included as a passenger in a flight compensation
            claim handled by FlightClaimly.
          </p>

          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Passenger</dt>
                <dd className="font-medium text-slate-900">{fullName}</dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Flight</dt>
                <dd className="font-medium text-slate-900">
                  {claim.flightNumber}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Journey</dt>
                <dd className="font-medium text-slate-900">
                  {claim.from} → {claim.to}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Travel date</dt>
                <dd className="font-medium text-slate-900">
                  {claim.date || "—"}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Booking reference</dt>
                <dd className="font-medium text-slate-900">
                  {claim.bookingNumber || "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
            Because compensation rights belong to each passenger individually,
            we need your authorisation before FlightClaimly can represent you
            and pursue your part of the claim.
          </div>

          <p className="mt-6 text-xs leading-5 text-slate-500">
            Legal proceedings are not included at this stage. If legal action
            is later recommended, FlightClaimly will explain any additional
            terms and ask for your approval before proceeding.
          </p>

         <PassengerAuthorityClient
  token={token}
  firstName={passenger.first_name}
  locale={locale}
/>
        </div>
      </div>
    </main>
  );
}