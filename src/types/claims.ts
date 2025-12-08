export type ClaimStatus =
  | "new"
  | "processing"
  | "sent_to_airline"
  | "paid_out"
  | "rejected";

export type Claim = {
  flightNumber: string;
  date: string;
  from: string;
  to: string;
  name: string;
  email: string;
  bookingNumber: string;
  receivedAt: string;
  status: ClaimStatus;
};
