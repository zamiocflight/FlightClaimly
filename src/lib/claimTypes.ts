export const STATUSES = ['new', 'processing', 'approved'] as const;
export type ClaimStatus = (typeof STATUSES)[number];

export type Attachment = {
  filename: string;
  size: number;
  path: string;         // absolut filväg på servern
  uploadedAt: string;
  contentType?: string;
};

export type Claim = {
  flightNumber: string;
  date: string;
  from: string;
  to: string;
  name: string;
  email: string;
  bookingNumber: string;
  receivedAt: string;     // id
  status: ClaimStatus;
  updatedAt?: string;
  attachments?: Attachment[];
};
