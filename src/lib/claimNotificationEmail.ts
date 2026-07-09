import { sendMail } from "@/lib/mailer";

type ClaimNotificationArgs = {
  claim: any;
  locale: string;
  trackingUrl: string;
};

const ADMIN_EMAIL =
  process.env.CLAIM_NOTIFICATION_EMAIL || "claims@flightclaimly.com";

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.APP_URL ||
  "https://www.flightclaimly.com";

export async function sendClaimNotificationEmail({
  claim,
  locale,
  trackingUrl,
}: ClaimNotificationArgs) {
  const adminUrl = `${appUrl.replace(/\/$/, "")}/admin/claims/${claim.id}`;

  const subject = `🚨 New FlightClaimly claim — ${claim.flightNumber || "Unknown flight"}`;

  const text = `
New claim received.

Claim ID:
${claim.id}

Passenger:
${claim.name || "Missing"}

Email:
${claim.email || "Missing"}

Phone:
${claim.phone || "Missing"}

Flight:
${claim.flightNumber || "Missing"}

Route:
${claim.from || "Missing"} → ${claim.to || "Missing"}

Travel date:
${claim.date || "Missing"}

Booking reference:
${claim.bookingNumber || "Missing"}

Estimated compensation:
${claim.compensationAmount ? `€${claim.compensationAmount}` : "Not set"}

Locale:
${locale}

Tracking URL:
${trackingUrl}

Admin:
${adminUrl}
`.trim();

  try {
 const result = await sendMail({
  to: ADMIN_EMAIL,
  subject,
  text,
});

console.log("✅ Claim notification email result", {
  to: ADMIN_EMAIL,
  claimId: claim.id,
  result,
});
  } catch (error) {
    console.error("❌ Failed to send claim notification email", {
      claimId: claim.id,
      error,
    });
  }
}