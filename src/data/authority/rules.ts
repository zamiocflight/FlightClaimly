export type AuthorityRule = {
  id: string;
  name: string;
  authorityIds: string[];
};

export const authorityRules: AuthorityRule[] = [
  {
    id: "eu-to-eu",
    name: "Flights within the European Union",
    authorityIds: ["eu261", "eu261-guidelines"],
  },
];