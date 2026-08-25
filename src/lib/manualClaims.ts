import { addClaim } from "./claims";
import { createManualPassengerAuthorization } from "./passengerAuthorizations";

type ManualPassenger = {
  firstName: string;
  lastName: string;
  email: string;
};

type CreateManualClaimInput = {
  flightNumber: string;
  date: string;
  from: string;
  to: string;
  bookingNumber: string;
  compensationAmount: number;
  locale?: string;
  claimOwner: ManualPassenger;
  additionalPassengers?: ManualPassenger[];
};

export async function createManualClaim(
  input: CreateManualClaimInput
) {
  const claimId = crypto.randomUUID();

  const passengers = [
    input.claimOwner,
    ...(input.additionalPassengers || []),
  ];

  const pax = passengers.slice(1).map((passenger) => ({
    firstName: passenger.firstName,
    lastName: passenger.lastName,
    email: passenger.email,
    under18: false,
  }));

  const claim = await addClaim({
    id: claimId,
    flightNumber: input.flightNumber,
    date: input.date,
    from: input.from,
    to: input.to,
    name: `${input.claimOwner.firstName} ${input.claimOwner.lastName}`.trim(),
    email: input.claimOwner.email,
    bookingNumber: input.bookingNumber,
    status: "new",
    locale: input.locale || "en",
    compensationAmount: input.compensationAmount,
    currency: "EUR",
    choice: "itinerary",
    pax: JSON.stringify(pax),
    passengerCount: passengers.length,
  });

  const authorizations = [];

  for (let index = 0; index < passengers.length; index++) {
    const passenger = passengers[index];

    const authorization =
      await createManualPassengerAuthorization({
        claimId: claim.id,
        passengerIndex: index + 1,
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        email: passenger.email,
      });

    authorizations.push({
      passengerIndex: index + 1,
      passengerName:
        `${passenger.firstName} ${passenger.lastName}`.trim(),
      email: passenger.email,
      token: authorization.token,
    });
  }

  return {
    claim,
    authorizations,
  };
}