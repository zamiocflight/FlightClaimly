export type Airport = {
  slug: string;
  iata: string;
  name: string;
  city: string;
  country: string;
};

export const airports: Airport[] = [
  {
    slug: "oslo-airport",
    iata: "OSL",
    name: "Oslo Airport",
    city: "Oslo",
    country: "Norway",
  },
  {
    slug: "bergen-airport",
    iata: "BGO",
    name: "Bergen Airport",
    city: "Bergen",
    country: "Norway",
  },
  {
    slug: "trondheim-airport",
    iata: "TRD",
    name: "Trondheim Airport",
    city: "Trondheim",
    country: "Norway",
  },
  {
  slug: "stockholm-arlanda-airport",
  iata: "ARN",
  name: "Stockholm Arlanda Airport",
  city: "Stockholm",
  country: "Sweden",
},
{
  slug: "copenhagen-airport",
  iata: "CPH",
  name: "Copenhagen Airport",
  city: "Copenhagen",
  country: "Denmark",
},
];