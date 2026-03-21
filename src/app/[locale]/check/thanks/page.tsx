import Link from "next/link";

type Props = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function ThanksPage({ searchParams }: Props) {
  const sp = await searchParams;
  const claimId = sp.id || "FC-XXXXXX";

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 text-center">

        {/* Success icon */}
        <div className="mx-auto mb-6 flex items-center justify-center w-14 h-14 rounded-full bg-green-100">
          <svg
            className="w-7 h-7 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-slate-900 mb-3">
          Your claim has been submitted
        </h1>

        {/* Description */}
        <p className="text-slate-600 mb-6">
          Your authority document has been successfully signed and your claim is now being prepared for submission to the airline.
        </p>

        {/* Claim ID */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
          <p className="text-xs text-slate-500 mb-1">Claim ID</p>
          <p className="text-lg font-semibold text-slate-900">
            FC-{claimId}
          </p>
        </div>

        {/* CTA */}
        <Link
          href={`/track/${claimId}`}
          className="inline-block w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-3 rounded-lg"
        >
          Track your claim
        </Link>

        {/* Secondary text */}
        <p className="text-xs text-slate-500 mt-5">
          We have also sent the tracking link to your email address.
        </p>

        {/* Bottom reassurance */}
        <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500">
          FlightClaimly will now review your case and submit it to the airline.
          You will be notified as soon as there are any updates.
        </div>

      </div>
    </div>
  );
}