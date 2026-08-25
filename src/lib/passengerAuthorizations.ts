import { supabaseAdmin } from "./supabase";
import { sendMail } from "./mailer";

type PassengerInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
  under18?: boolean;
};

export async function createPassengerAuthorizationsForClaim(
  claimId: string,
  paxRaw: unknown
) {
  if (!paxRaw) return;

  let passengers: PassengerInput[] = [];

  try {
    if (typeof paxRaw === "string") {
      const parsed = JSON.parse(paxRaw);
      if (Array.isArray(parsed)) passengers = parsed;
    } else if (Array.isArray(paxRaw)) {
      passengers = paxRaw;
    }
  } catch {
    console.error("Could not parse pax for passenger authorizations");
    return;
  }

  if (passengers.length === 0) return;

  const rows = passengers
    .map((p, index) => {
      const firstName = (p.firstName || "").trim();
      const lastName = (p.lastName || "").trim();
      const email = (p.email || "").trim() || null;
      const under18 = Boolean(p.under18);

      if (!firstName || !lastName) return null;

      return {
        claim_id: claimId,

        // passenger 1 = claim owner
        // pax[0] therefore represents passenger 2
        passenger_index: index + 2,

        first_name: firstName,
        last_name: lastName,
        email,
        under_18: under18,

        // Adults without email can complete this later.
        // Minors will eventually use guardian authorization logic.
        status: under18
          ? "pending"
          : email
          ? "pending"
          : "email_missing",
      };
    })
    .filter(Boolean);

  if (rows.length === 0) return;

  const sb = supabaseAdmin();

  const { error } = await sb
    .from("passenger_authorizations")
    .upsert(rows, {
      onConflict: "claim_id,passenger_index",
      ignoreDuplicates: true,
    });

  if (error) {
    console.error("Failed to create passenger authorizations:", error);
    throw error;
  }

  console.log(
    `Created ${rows.length} passenger authorization record(s) for claim ${claimId}`
  );
}

export async function invitePendingAdultPassengers(
  claimId: string,
  claimOwnerName: string,
  locale: string = "en"
) {
  const sb = supabaseAdmin();

  const { data: passengers, error } = await sb
    .from("passenger_authorizations")
    .select("*")
    .eq("claim_id", claimId)
    .eq("under_18", false)
    .eq("status", "pending")
    .not("email", "is", null);

  if (error) {
    console.error(
      "Failed to load pending passenger authorizations:",
      error
    );

    // Never block the main claim because an invite could not be prepared.
    return;
  }

  if (!passengers || passengers.length === 0) return;

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000";

  for (const passenger of passengers) {
    try {
      const token = crypto.randomUUID();
      const now = new Date().toISOString();

      // 1. Save the secure token first,
      // but DO NOT mark the passenger as invited yet.
      const { error: tokenError } = await sb
        .from("passenger_authorizations")
        .update({
          invite_token: token,
          updated_at: now,
        })
        .eq("id", passenger.id);

      if (tokenError) {
        console.error(
          "Failed to create passenger invite token:",
          tokenError
        );
        continue;
      }

      const signUrl =
        `${baseUrl.replace(/\/$/, "")}/${locale}` +
        `/passenger-authority/${token}`;

      const firstName = passenger.first_name;

      const subject =
        "Please authorise FlightClaimly to represent you";

      const text = `Hi ${firstName},

${claimOwnerName} has included you as a passenger in a flight compensation claim handled by FlightClaimly.

Because compensation rights belong to each passenger individually, we need your authorisation before FlightClaimly can represent you and pursue your part of the claim.

Please use the secure link below to review and sign the authority document:

${signUrl}

By signing, you authorise FlightClaimly to communicate with the airline and relevant authorities on your behalf, submit and negotiate the claim, and receive information relating to the case.

Once your authority has been signed, the airline will be instructed to communicate with FlightClaimly regarding your claim.

Legal proceedings are not included at this stage. If legal action is later recommended, we will explain any additional terms and ask for your approval before proceeding.

If you have any questions, simply reply to this email.

Best regards,
FlightClaimly
Customer Claims Team`;

      // 2. Attempt delivery.
      const mailResult = await sendMail({
        to: passenger.email,
        subject,
        text,
      });

      const mailFailed =
        (mailResult as any)?.skipped === true ||
        Boolean((mailResult as any)?.error);

      if (mailFailed) {
        console.warn(
          `Passenger authority invite was NOT sent for ${passenger.email}.`
        );

        // Keep status = pending.
        // Claim itself must continue normally.
        continue;
      }

      // 3. Only NOW do we mark the passenger as invited.
      const invitedAt = new Date().toISOString();

      const { error: inviteUpdateError } = await sb
        .from("passenger_authorizations")
        .update({
          status: "invited",
          invited_at: invitedAt,
          updated_at: invitedAt,
        })
        .eq("id", passenger.id);

      if (inviteUpdateError) {
        console.error(
          "Invite email was sent, but status could not be updated:",
          inviteUpdateError
        );

        continue;
      }

      console.log(
        `Passenger authority invite sent to ${passenger.email}`
      );
    } catch (err) {
      console.error(
        `Passenger authority invite failed for ${passenger.email}:`,
        err
      );

      // Important: never throw here.
      // The main customer's claim must still complete.
    }
  }
}
export async function createManualPassengerAuthorization({
  claimId,
  passengerIndex,
  firstName,
  lastName,
  email,
}: {
  claimId: string;
  passengerIndex: number;
  firstName: string;
  lastName: string;
  email: string;
}) {
  const sb = supabaseAdmin();

  const token = crypto.randomUUID();
  const now = new Date().toISOString();

  const { data, error } = await sb
    .from("passenger_authorizations")
    .upsert(
      {
        claim_id: claimId,
        passenger_index: passengerIndex,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        under_18: false,
        status: "pending",
        invite_token: token,
        updated_at: now,
      },
      {
        onConflict: "claim_id,passenger_index",
      }
    )
    .select("*")
    .single();

  if (error) {
    console.error(
      "Failed to create manual passenger authorization:",
      error
    );
    throw error;
  }

  return {
    passengerAuthorization: data,
    token,
  };
}
