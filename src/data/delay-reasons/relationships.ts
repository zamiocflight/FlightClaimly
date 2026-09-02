export interface DelayReasonRelationship {
  slug: string;

  airlines?: string[];
  airports?: string[];
  routes?: string[];
  countries?: string[];

  authorities?: string[];
  regulations?: string[];
}

const eu261Relationship = {
  authorities: ["eu261-guidelines"],
  regulations: ["eu261"],
};

export const delayReasonRelationships: DelayReasonRelationship[] = [
  { slug: "technical-problems", ...eu261Relationship },
  { slug: "bad-weather", ...eu261Relationship },
  { slug: "air-traffic-control", ...eu261Relationship },
  { slug: "airline-staff-strike", ...eu261Relationship },
  { slug: "crew-shortage", ...eu261Relationship },
  { slug: "late-incoming-aircraft", ...eu261Relationship },
  { slug: "bird-strike", ...eu261Relationship },
  { slug: "airport-closure", ...eu261Relationship },
  { slug: "security-issue", ...eu261Relationship },
  { slug: "hidden-manufacturing-defect", ...eu261Relationship },
  { slug: "operational-reasons", ...eu261Relationship },
];
