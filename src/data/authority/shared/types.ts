export type AuthoritySourceType =
  | "regulation"
  | "official-guidance"
  | "court-ruling"
  | "authority"
  | "airline-policy"
  | "statistics";

export type AuthoritySource = {
  id: string;
  title: string;
  description: string;
  sourceName: string;
  sourceType: AuthoritySourceType;
  url: string;
  jurisdiction?: string;
  article?: string;
  publishedAt?: string;
  updatedAt?: string;
};

export type LegalReference = {
  id: string;
  title: string;
  citation: string;
  explanation: string;
  sourceId: string;
};

export type AuthorityData = {
  sources: AuthoritySource[];
  legalReferences: LegalReference[];
};