export type RelationshipType =
  | "airline"
  | "airport"
  | "country"
  | "route"
  | "alliance"
  | "hub"
  | "law"
  | "article";

export type Relationship = {
  type: RelationshipType;
  slug: string;
};

export type EntityRelationships = {
  slug: string;
  relationships: Relationship[];
};

export const relationships: EntityRelationships[] = [
  {
    slug: "norwegian",
    relationships: [
      { type: "country", slug: "norway" },
      { type: "airport", slug: "oslo-airport" },
      { type: "airport", slug: "bergen-airport" },
      { type: "airport", slug: "trondheim-airport" },
      { type: "law", slug: "eu261" },
      { type: "article", slug: "flight-delay-compensation" },
      { type: "article", slug: "cancelled-flight-compensation" },
    ],
  },
  {
  slug: "sas",
  relationships: [
    { type: "country", slug: "sweden" },
    { type: "airport", slug: "stockholm-arlanda-airport" },
    { type: "airport", slug: "copenhagen-airport" },
    { type: "law", slug: "eu261" },
    { type: "article", slug: "flight-delay-compensation" },
    { type: "article", slug: "cancelled-flight-compensation" },
  ],
},
{
  slug: "copenhagen-airport",
  relationships: [
    { type: "country", slug: "denmark" },
    { type: "airline", slug: "sas" },
    { type: "airline", slug: "norwegian" },
    { type: "law", slug: "eu261" },
    { type: "article", slug: "flight-delay-compensation" },
    { type: "article", slug: "cancelled-flight-compensation" },
  ],
},
{
  slug: "sweden",
  relationships: [
    { type: "airport", slug: "stockholm-arlanda-airport" },
    { type: "airline", slug: "sas" },
    { type: "law", slug: "eu261" },
    { type: "article", slug: "flight-delay-compensation" },
  ],
},
{
  slug: "denmark",
  relationships: [
    { type: "airport", slug: "copenhagen-airport" },
    { type: "airline", slug: "sas" },
    { type: "law", slug: "eu261" },
    { type: "article", slug: "flight-delay-compensation" },
  ],
},
];
