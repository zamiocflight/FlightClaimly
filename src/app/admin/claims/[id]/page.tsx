import { getClaimById } from "@/lib/claims";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function ClaimDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const claim = await getClaimById(id);

  if (!claim) {
    return <div className="p-6">Claim not found</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 space-y-8">
      <h1 className="text-2xl font-semibold">Claim details</h1>

      {/* Contact */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Contact</h2>
        <p><strong>Name:</strong> {claim.name}</p>
        <p><strong>Email:</strong> {claim.email}</p>
        <p><strong>Phone:</strong> {claim.phone || "—"}</p>
      </div>

      {/* Address ✅ NY */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Address</h2>
        <p><strong>Address:</strong> {claim.address || "—"}</p>
        <p><strong>City:</strong> {claim.city || "—"}</p>
        <p><strong>Postal code:</strong> {claim.postalCode || "—"}</p>
        <p><strong>Country:</strong> {claim.country || "—"}</p>
      </div>

      {/* Flight */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Flight</h2>
        <p><strong>Flight:</strong> {claim.flightNumber}</p>
        <p><strong>Route:</strong> {claim.from} → {claim.to}</p>
        <p><strong>Date:</strong> {claim.date || "—"}</p>
      </div>

      {/* Booking */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Booking</h2>
        <p><strong>Booking ref:</strong> {claim.bookingNumber || "—"}</p>
      </div>

      {/* Status */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Status</h2>
        <p>{claim.status}</p>
      </div>

      {/* Attachments */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Documents</h2>

        {claim.attachments && claim.attachments.length > 0 ? (
          <ul className="space-y-2">
            {claim.attachments.map((att, i) => (
              <li key={i}>
                <a
                  href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/attachments/${att.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline"
                >
                  {att.filename || att.path}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>—</p>
        )}
      </div>

      {/* Back */}
      <div className="pt-6">
        <Link href="/admin" className="text-sky-600 hover:underline">
          ← Back to admin
        </Link>
      </div>
    </div>
  );
}