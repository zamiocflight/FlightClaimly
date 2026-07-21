export type AuthorityRelationship = {
  slug: string;
  authorityIds: string[];
};

export const authorityRelationships: AuthorityRelationship[] = [
  {
    slug: "sas",
    authorityIds: ["eu261", "eu261-guidelines"],
  },
];