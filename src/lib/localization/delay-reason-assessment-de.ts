import type { DelayReasonAssessmentProfile } from "@/lib/delay-reasons/assessment";

type Copy = Pick<DelayReasonAssessmentProfile, "summary" | "evidenceTargets" | "airlineQuestions" | "claimantSignals" | "nextStep">;

const labels: Record<string, string> = {
  "technical-problems": "technische Störung",
  "bad-weather": "Wetterlage",
  "air-traffic-control": "Flugsicherungsmaßnahme",
  "airline-staff-strike": "Streik",
  "crew-shortage": "Crewmangel",
  "late-incoming-aircraft": "verspätete Flugzeugrotation",
  "bird-strike": "Vogelschlag",
  "airport-closure": "Flughafenschließung",
  "security-issue": "Sicherheitsereignis",
  "hidden-manufacturing-defect": "versteckter Herstellungsfehler",
  "operational-reasons": "operative Ursache",
};

function make(label: string): Copy {
  return {
    summary: `Die angegebene Ursache „${label}“ muss anhand des konkreten Ereignisses, des zeitlichen Ablaufs und des Kausalzusammenhangs mit dem Flug geprüft werden.`,
    evidenceTargets: [
      "Konkrete Ursache und zeitlicher Ablauf der Störung",
      "Unterlagen oder operative Daten, die die Ursache belegen",
      "Flugzeug- und Crewrotation, soweit relevant",
      "Maßnahmen der Airline zur Vermeidung oder Begrenzung der Störung",
    ],
    airlineQuestions: [
      `Welches konkrete Ereignis hinter der Angabe „${label}“ hat den Flug gestört?`,
      "Wann trat das Ereignis ein und wie lange wirkte es sich aus?",
      "Welcher Teil der Verspätung oder Annullierung wurde unmittelbar dadurch verursacht?",
      "Welche zumutbaren Alternativen oder Gegenmaßnahmen wurden geprüft?",
    ],
    claimantSignals: [
      "Nur eine allgemeine Ursachenangabe ohne konkrete Erklärung",
      "Zeitlicher Ablauf passt nicht vollständig zur angegebenen Ursache",
      "Zusätzliche technische, personelle oder operative Probleme sind erkennbar",
    ],
    nextStep: "Die tatsächliche Grundursache und den Kausalzusammenhang klären, bevor die EU261-Bewertung abgeschlossen wird.",
  };
}

const copy: Record<string, Copy> = Object.fromEntries(
  Object.entries(labels).map(([slug, label]) => [slug, make(label)]),
);

export function localizeDelayReasonAssessmentDe(
  assessment: DelayReasonAssessmentProfile,
): DelayReasonAssessmentProfile {
  const localized = copy[assessment.slug];
  return localized ? { ...assessment, ...localized } : assessment;
}
