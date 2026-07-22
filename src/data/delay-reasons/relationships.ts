export interface DelayReasonRelationship {
  slug: string;

  airlines?: string[];
  airports?: string[];
  routes?: string[];
  countries?: string[];

  authorities?: string[];
  regulations?: string[];
}

export const delayReasonRelationships: DelayReasonRelationship[] = [
  {
    slug: "technical-problems",
    authorities: ["eu261-guidelines"],
    regulations: ["eu261"],
  },
];