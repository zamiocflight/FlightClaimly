import type { AuthoritySource } from "./shared/types";

export const authorityRegistry: AuthoritySource[] = [
  {
    id: "eu261",

    title: "Regulation (EC) No 261/2004",

    description:
      "European regulation establishing common rules on compensation and assistance to passengers.",

    sourceName: "European Union",

    sourceType: "regulation",

    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32004R0261",

    jurisdiction: "European Union",
  },
  {
    id: "eu261-guidelines",

    title: "EU Air Passenger Rights Interpretative Guidelines",

    description:
      "European Commission guidance explaining how EU passenger-rights rules should be interpreted and applied.",

    sourceName: "European Commission",

    sourceType: "official-guidance",

    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52016XC0615(01)",

    jurisdiction: "European Union",
  },
];