export type FAQ = {
  question: string;
  answer: string;
};

export const standardFAQ: FAQ[] = [
  {
    question: "Can I claim compensation for a delayed flight?",
    answer:
      "Yes. If your flight arrived at least three hours late and the disruption was within the airline's control, you may be entitled to compensation under EU261 or UK261.",
  },
  {
    question: "How much compensation can I receive?",
    answer:
      "Depending on the flight distance and the circumstances, you may be entitled to €250, €400 or €600 per passenger.",
  },
  {
    question: "What documents do I need?",
    answer:
      "Usually your booking confirmation or boarding pass is enough to get started. In some cases we may request additional documentation.",
  },
  {
    question: "How long does the claim process take?",
    answer:
      "Every airline is different. Some claims are resolved within a few weeks, while others may take several months if they are disputed.",
  },
  {
    question: "Do I pay anything upfront?",
    answer:
      "No. FlightClaimly works on a no win, no fee basis. You only pay if we successfully recover compensation for you.",
  },
];