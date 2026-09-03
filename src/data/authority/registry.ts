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
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52024XC05687",
    jurisdiction: "European Union",
    updatedAt: "2024-09-25",
  },
  {
    id: "cjeu-sturgeon-c402-07",
    title: "Sturgeon and Others, Joined Cases C-402/07 and C-432/07",
    description:
      "Court of Justice judgment establishing that passengers reaching their final destination three hours or more late may rely on Article 7 compensation, subject to the extraordinary-circumstances defence.",
    sourceName: "Court of Justice of the European Union",
    sourceType: "court-ruling",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62007CJ0402",
    jurisdiction: "European Union",
    publishedAt: "2009-11-19",
  },
  {
    id: "cjeu-wallentin-c549-07",
    title: "Wallentin-Hermann, C-549/07",
    description:
      "Court of Justice judgment defining the extraordinary-circumstances test for technical problems and confirming the carrier's reasonable-measures burden.",
    sourceName: "Court of Justice of the European Union",
    sourceType: "court-ruling",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62007CJ0549",
    jurisdiction: "European Union",
    publishedAt: "2008-12-22",
  },
  {
    id: "cjeu-van-der-lans-c257-14",
    title: "van der Lans, C-257/14",
    description:
      "Court of Justice judgment confirming that unexpected technical problems arising in the normal operation of aircraft are generally not extraordinary circumstances merely because they are unexpected.",
    sourceName: "Court of Justice of the European Union",
    sourceType: "court-ruling",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62014CJ0257",
    jurisdiction: "European Union",
    publishedAt: "2015-09-17",
  },
  {
    id: "cjeu-peskova-c315-15",
    title: "Pešková and Peška, C-315/15",
    description:
      "Court of Justice judgment treating a bird collision as capable of being an extraordinary circumstance while preserving reasonable-measures and causal-delay analysis.",
    sourceName: "Court of Justice of the European Union",
    sourceType: "court-ruling",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62015CJ0315",
    jurisdiction: "European Union",
    publishedAt: "2017-05-04",
  },
  {
    id: "cjeu-airhelp-c28-20",
    title: "Airhelp, C-28/20",
    description:
      "Court of Justice judgment holding that an organised strike by an operating carrier's staff connected with employment demands capable of internal dialogue is not an extraordinary circumstance.",
    sourceName: "Court of Justice of the European Union",
    sourceType: "court-ruling",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62020CJ0028",
    jurisdiction: "European Union",
    publishedAt: "2021-03-23",
  },
];
