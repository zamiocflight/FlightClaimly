import type { DelayReason } from "@/data/delay-reasons/types";

const names: Record<string, string> = {
  "technical-problems": "Problemas técnicos",
  "bad-weather": "Mal tiempo",
  "air-traffic-control": "Control del tráfico aéreo",
  "airline-staff-strike": "Huelga del personal de la aerolínea",
  "crew-shortage": "Falta de tripulación",
  "late-incoming-aircraft": "Llegada tardía de la aeronave",
  "bird-strike": "Impacto con aves",
  "airport-closure": "Cierre del aeropuerto",
  "security-issue": "Problema de seguridad",
  "hidden-manufacturing-defect": "Defecto de fabricación oculto",
  "operational-reasons": "Motivos operativos",
};

const causeCopy: Record<string, { overview: string; rules: string }> = {
  "technical-problems": {
    overview: "Los fallos técnicos propios del funcionamiento normal de una aerolínea no suelen considerarse circunstancias extraordinarias conforme al EU261.",
    rules: "Los problemas técnicos o mecánicos habituales no eximen automáticamente a la aerolínea de pagar una compensación. Un acontecimiento realmente externo y excepcional puede requerir una valoración distinta.",
  },
  "bad-weather": {
    overview: "Las condiciones meteorológicas pueden constituir circunstancias extraordinarias cuando impiden o limitan de forma significativa la operación segura del vuelo.",
    rules: "Debe existir una relación causal real entre las condiciones meteorológicas y la incidencia concreta. También deben valorarse las medidas razonables adoptadas por la aerolínea.",
  },
  "air-traffic-control": {
    overview: "Las decisiones del control del tráfico aéreo suelen quedar fuera del control de la aerolínea y pueden constituir circunstancias extraordinarias.",
    rules: "La restricción del control aéreo debe haber causado realmente la incidencia concreta. Los derechos de asistencia, reembolso o transporte alternativo pueden seguir existiendo por separado.",
  },
  "airline-staff-strike": {
    overview: "Una huelga del propio personal de la aerolínea no constituye automáticamente una circunstancia extraordinaria. Las huelgas internas y externas pueden recibir una valoración jurídica diferente.",
    rules: "Es especialmente relevante determinar quién convocó la huelga. Un conflicto laboral con el propio personal puede formar parte de la actividad normal de la aerolínea, mientras que una huelga externa puede valorarse de otra manera.",
  },
  "crew-shortage": {
    overview: "La planificación de personal y tripulaciones de reserva forma, en principio, parte de la actividad normal de una aerolínea. Una falta habitual de tripulación no se convierte en extraordinaria por el mero hecho de describirse como un problema de tripulación.",
    rules: "La causa original de la falta de tripulación es determinante. Un acontecimiento externo excepcional puede exigir una valoración diferente.",
  },
  "late-incoming-aircraft": {
    overview: "La llegada tardía de una aeronave describe cómo un retraso se propaga al siguiente vuelo, pero no identifica la causa jurídica original.",
    rules: "Debe rastrearse la causa del retraso anterior en la rotación. Un acontecimiento extraordinario previo puede valorarse de forma distinta a los problemas técnicos, de personal u operativos habituales.",
  },
  "bird-strike": {
    overview: "Un impacto con aves suele ser un acontecimiento externo y puede constituir una circunstancia extraordinaria.",
    rules: "La aerolínea debe vincular el impacto con aves con la incidencia concreta y demostrar que las medidas razonables no habrían podido evitar el retraso final.",
  },
  "airport-closure": {
    overview: "El cierre de un aeropuerto impuesto por un tercero suele quedar fuera del control de la aerolínea y puede constituir una circunstancia extraordinaria.",
    rules: "La compensación estándar y los derechos a transporte alternativo, reembolso y asistencia se valoran por separado. Las alternativas razonables también pueden ser relevantes durante un cierre aeroportuario.",
  },
  "security-issue": {
    overview: "Las amenazas graves para la seguridad y las medidas de seguridad externas pueden constituir circunstancias extraordinarias.",
    rules: "Una referencia genérica a la seguridad no es suficiente. Deben valorarse el hecho concreto, su relación con el vuelo y las medidas adoptadas por la aerolínea.",
  },
  "hidden-manufacturing-defect": {
    overview: "Un defecto de fabricación oculto reconocido por el fabricante o por una autoridad competente puede ser extraordinario en determinados casos. Esta categoría es mucho más limitada que la de los fallos técnicos ordinarios.",
    rules: "La aerolínea debe acreditar la existencia de un defecto de fabricación verdaderamente excepcional y su relación con la incidencia.",
  },
  "operational-reasons": {
    overview: "«Motivos operativos» es una descripción amplia y no constituye por sí sola una circunstancia extraordinaria. Debe identificarse la causa real.",
    rules: "Detrás pueden existir problemas de tripulación, rotación de aeronaves, planificación, asistencia en tierra o cuestiones técnicas. La evaluación conforme al EU261 debe basarse en la causa y los hechos reales.",
  },
};

export function buildSpanishDelayReason(delayReason: DelayReason): DelayReason {
  const title = names[delayReason.slug] ?? delayReason.title;
  const copy = causeCopy[delayReason.slug];
  if (!copy) return delayReason;
  const extraordinary = delayReason.extraordinaryCircumstance;
  return {
    ...delayReason,
    title,
    description: `Descubre cuándo ${title.toLowerCase()} pueden afectar a la compensación de un vuelo conforme al EU261 y qué otros derechos de los pasajeros pueden aplicarse.`,
    overview: copy.overview,
    passengerRights: extraordinary
      ? "Aunque una circunstancia extraordinaria excluya la compensación estándar, pueden mantenerse los derechos de asistencia, transporte alternativo o reembolso."
      : "Si la incidencia provocó al menos tres horas de retraso en el destino final, una cancelación indemnizable u otro supuesto relevante, el EU261 puede dar derecho a compensación.",
    compensationRules: copy.rules,
    statisticsIntro: `En casos relacionados con ${title.toLowerCase()}, deben valorarse la causa real, su efecto sobre el vuelo concreto y las medidas adoptadas por la aerolínea.`,
    statistics: [
      { label: "Circunstancia extraordinaria", value: extraordinary ? "Posible" : "Normalmente no", description: "La causa concreta y la relación causal deben valorarse caso por caso." },
      { label: "Compensación EU261", value: extraordinary ? "Caso por caso" : "Puede corresponder", description: "El ámbito de aplicación, el retraso o la cancelación y la causa se valoran conjuntamente." },
      { label: "Asistencia y transporte alternativo", value: "Derechos independientes", description: "Estos derechos pueden mantenerse aunque no corresponda una compensación estándar." },
    ],
    timelineIntro: `Un caso relacionado con ${title.toLowerCase()} exige vincular el motivo alegado con la incidencia real del vuelo.`,
    timeline: [
      { title: "Se produce la incidencia", description: "El vuelo se retrasa, se cancela o sufre otra alteración." },
      { title: "Se identifica la causa", description: `Revisamos la información sobre ${title.toLowerCase()} y la cronología de los hechos.` },
      { title: "Se valoran la causalidad y las medidas", description: "Analizamos si la causa explica realmente la incidencia y qué medidas razonables estaban disponibles." },
      { title: "Se valoran los derechos del pasajero", description: "La compensación estándar y los derechos independientes de asistencia, transporte alternativo o reembolso se analizan por separado." },
    ],
    faqIntro: `Preguntas frecuentes sobre ${title.toLowerCase()} y la compensación por vuelos.`,
    faq: [
      { question: `¿${title} son siempre circunstancias extraordinarias?`, answer: extraordinary ? "No automáticamente. El hecho debe cumplir los requisitos jurídicos y haber causado realmente la incidencia concreta." : "Como categoría, normalmente no; aun así, deben analizarse la causa subyacente real y las circunstancias concretas." },
      { question: "¿Puedo seguir teniendo derecho a transporte alternativo o asistencia?", answer: "Sí. Los derechos a transporte alternativo, reembolso y asistencia se valoran por separado de la compensación estándar." },
      { question: "¿Qué debe acreditar la aerolínea?", answer: "La causa concreta, su relación con el vuelo y las medidas razonables adoptadas." },
    ],
  };
}
