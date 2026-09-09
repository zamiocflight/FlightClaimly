import type { DelayReasonAssessmentProfile } from "@/lib/delay-reasons/assessment";

type Copy = Pick<DelayReasonAssessmentProfile, "summary" | "evidenceTargets" | "airlineQuestions" | "claimantSignals" | "nextStep">;

const labels: Record<string, string> = {
  "technical-problems": "problema técnico",
  "bad-weather": "condiciones meteorológicas adversas",
  "air-traffic-control": "medida de control del tráfico aéreo",
  "airline-staff-strike": "huelga",
  "crew-shortage": "falta de tripulación",
  "late-incoming-aircraft": "rotación tardía de la aeronave",
  "bird-strike": "impacto con aves",
  "airport-closure": "cierre del aeropuerto",
  "security-issue": "incidente de seguridad",
  "hidden-manufacturing-defect": "defecto de fabricación oculto",
  "operational-reasons": "motivo operativo",
};

function make(label: string): Copy {
  return {
    summary: `El motivo indicado, «${label}», debe evaluarse a partir del hecho concreto, la cronología y la relación causal con el vuelo.`,
    evidenceTargets: [
      "Causa concreta y cronología de la incidencia",
      "Documentos o datos operativos que respalden el motivo indicado",
      "Rotación de aeronave y tripulación cuando sea pertinente",
      "Medidas adoptadas por la aerolínea para evitar o limitar la incidencia",
    ],
    airlineQuestions: [
      `¿Qué hecho concreto detrás de «${label}» afectó al vuelo?`,
      "¿Cuándo comenzó el hecho y durante cuánto tiempo produjo efectos?",
      "¿Qué parte del retraso o de la cancelación fue causada directamente por ese hecho?",
      "¿Qué alternativas razonables o medidas de mitigación se valoraron?",
    ],
    claimantSignals: [
      "Solo se facilita un motivo genérico sin una explicación concreta",
      "La cronología no encaja completamente con el motivo indicado",
      "Se observan otros problemas técnicos, de personal u operativos",
    ],
    nextStep: "Determinar la causa subyacente real y la relación causal antes de completar la evaluación conforme al EU261.",
  };
}

const copy: Record<string, Copy> = Object.fromEntries(
  Object.entries(labels).map(([slug, label]) => [slug, make(label)]),
);

export function localizeDelayReasonAssessmentEs(
  assessment: DelayReasonAssessmentProfile,
): DelayReasonAssessmentProfile {
  const localized = copy[assessment.slug];
  return localized ? { ...assessment, ...localized } : assessment;
}
