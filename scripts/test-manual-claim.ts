import { createManualClaim } from "../src/lib/manualClaims";

async function main() {
  const result = await createManualClaim({
    flightNumber: "TEST",
    date: "2026-08-25",
    from: "TLV",
    to: "CPH",
    bookingNumber: "TEST-REIJO",
    compensationAmount: 400,
    locale: "en",

    claimOwner: {
      firstName: "Test",
      lastName: "Owner",
      email: "test-owner@example.com",
    },

    additionalPassengers: [
      {
        firstName: "Test",
        lastName: "Passenger",
        email: "test-passenger@example.com",
      },
    ],
  });

  console.log("\n✅ MANUAL CLAIM CREATED");
  console.log("Claim ID:", result.claim.id);

  console.log("\nSIGNING LINKS:");

  for (const authorization of result.authorizations) {
    console.log(
      `${authorization.passengerName}: http://localhost:3000/en/passenger-authority/${authorization.token}`
    );
  }
}

main().catch((error) => {
  console.error("\n❌ TEST FAILED");
  console.error(error);
  process.exit(1);
});