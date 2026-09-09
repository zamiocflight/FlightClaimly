import type { Airline } from "@/data/seo/airlines";
import type { Airport } from "@/data/seo/airports";
import type { Country } from "@/data/seo/countries";
import type { FlightRoute } from "@/data/seo/routes";
import type { KnowledgeLocalization, LocalizableKnowledgeEntityType } from "./types";

const cityNames: Record<string, string> = {
  Athens: "Atenas", Brussels: "Bruselas", Bucharest: "Bucarest", Cairo: "El Cairo", Cologne: "Colonia", Copenhagen: "Copenhague",
  Florence: "Florencia", Geneva: "Ginebra", Lisbon: "Lisboa", London: "Londres", Milan: "Milán", Moscow: "Moscú", Munich: "Múnich",
  Naples: "Nápoles", Prague: "Praga", Rome: "Roma", Seville: "Sevilla", Venice: "Venecia", Vienna: "Viena", Warsaw: "Varsovia", Zurich: "Zúrich",
};
const countryNames: Record<string, string> = {
  Austria: "Austria", Belgium: "Bélgica", Croatia: "Croacia", Cyprus: "Chipre", Czechia: "Chequia", Denmark: "Dinamarca", Estonia: "Estonia",
  Finland: "Finlandia", France: "Francia", Germany: "Alemania", Greece: "Grecia", Hungary: "Hungría", Iceland: "Islandia", Ireland: "Irlanda",
  Italy: "Italia", Latvia: "Letonia", Lithuania: "Lituania", Luxembourg: "Luxemburgo", Malta: "Malta", Netherlands: "Países Bajos", Norway: "Noruega",
  Poland: "Polonia", Portugal: "Portugal", Romania: "Rumanía", Slovakia: "Eslovaquia", Slovenia: "Eslovenia", Spain: "España", Sweden: "Suecia",
  Switzerland: "Suiza", "United Kingdom": "Reino Unido",
};
export function spanishCityName(value: string) { return cityNames[value] ?? value; }
export function spanishCountryName(value: string) { return countryNames[value] ?? value; }

const amounts = [
  { label: "Hasta 1.500 km", distance: "Vuelo de corta distancia", amount: "€250" },
  { label: "1.500–3.500 km", distance: "Vuelo de media distancia", amount: "€400" },
  { label: "Más de 3.500 km", distance: "Vuelo de larga distancia", amount: "hasta €600" },
];
const statistics = [
  { label: "Compensación máxima", value: "€600", description: "Importe estándar máximo habitual por pasajero conforme al EU261." },
  { label: "Retraso en el destino final", value: "3 h+", description: "Para una compensación por retraso normalmente se exige llegar al destino final con al menos tres horas de retraso." },
  { label: "Evaluación", value: "Caso por caso", description: "El derecho depende, entre otros factores, del vuelo, la incidencia y su causa." },
];
const timeline = [
  { title: "Presenta tu reclamación", description: "Comprueba el vuelo, facilita los datos de los pasajeros y sube la documentación necesaria." },
  { title: "FlightClaimly revisa el caso", description: "Comprobamos la información y preparamos la reclamación." },
  { title: "La aerolínea responde", description: "La aerolínea puede aceptar o rechazar la reclamación, o solicitar información adicional." },
  { title: "Recibes tu compensación", description: "Si la reclamación da lugar a una compensación, FlightClaimly te ayuda a completar el proceso." },
];
const claimProcess = [
  "Comprueba los datos del vuelo y describe la incidencia.",
  "Determinamos qué derechos de los pasajeros pueden ser aplicables.",
  "Facilita los datos de los pasajeros y la referencia de reserva.",
  "Autoriza a FlightClaimly para gestionar la reclamación.",
  "Sube la documentación pertinente.",
  "FlightClaimly presenta la reclamación y se comunica con la aerolínea.",
];
const commonIssues = ["Retraso superior a tres horas", "Vuelo cancelado", "Conexión perdida", "Denegación de embarque", "Problemas técnicos u operativos"];

function base(entityType: LocalizableKnowledgeEntityType, slug: string, title: string, description: string, content: KnowledgeLocalization["content"], displayName?: string): KnowledgeLocalization {
  return { entityType, entitySlug: slug, displayName, locale: "es", source: "human", status: "publishable", metadata: { title, description }, content, quality: { metadataReviewed: true, terminologyReviewed: true, legalMeaningReviewed: true, contentReviewed: true }, updatedAt: "2026-09-09" };
}

export function buildSpanishRouteLocalization(route: FlightRoute): KnowledgeLocalization {
  const origin = spanishCityName(route.origin.city), destination = spanishCityName(route.destination.city), name = `${origin}–${destination}`;
  return base("route", route.slug, `${origin} – ${destination}: compensación por vuelo | FlightClaimly`, `Comprueba si tienes derecho a compensación por un vuelo retrasado o cancelado en la ruta ${origin}–${destination}.`, {
    intro: `¿Vuelas en la ruta ${origin}–${destination}? Un retraso importante, una cancelación u otra incidencia puede darte derechos como pasajero.`,
    overview: `En la ruta ${name}, los derechos conforme al EU261 u otras normas aplicables dependen del lugar de salida, el destino, la aerolínea operadora y las circunstancias de la incidencia.`,
    passengerRights: "Si llegas a tu destino final con al menos tres horas de retraso, puedes tener derecho a compensación si se cumplen los demás requisitos. También pueden existir derechos en caso de cancelación, pérdida de conexión o denegación de embarque.",
    compensationIntro: "El importe de la compensación depende, entre otros factores, de la distancia del vuelo y de las normas aplicables.", compensationAmounts: amounts,
    compensationRules: `El derecho a compensación en la ruta ${name} depende del viaje concreto y de la causa de la incidencia. Las circunstancias extraordinarias pueden excluir la compensación estándar, mientras que otras obligaciones de la aerolínea se valoran por separado.`,
    statisticsIntro: `Criterios habituales para evaluar una compensación en la ruta ${name}.`, statistics,
    timelineIntro: `Después de presentar una reclamación por ${name}, FlightClaimly te ayuda con los siguientes pasos.`, timeline, claimProcess, commonIssues,
    faq: [
      { question: `¿Puedo recibir compensación por un vuelo retrasado de ${origin} a ${destination}?`, answer: "Es posible. La evaluación tiene en cuenta, entre otros factores, el retraso en el destino final, las normas aplicables y la causa de la incidencia." },
      { question: "¿A cuánto puede ascender la compensación?", answer: "Conforme al EU261, los importes estándar suelen ser de €250, €400 o €600, según la distancia del vuelo y los requisitos jurídicos." },
      { question: "¿Cuesta algo comprobar mi vuelo?", answer: "No. Puedes comprobar tu vuelo e iniciar una primera evaluación sin pagar por adelantado." },
    ],
  }, `${origin} – ${destination}`);
}

export function buildSpanishAirportLocalization(airport: Airport): KnowledgeLocalization {
  const city = spanishCityName(airport.city);
  return base("airport", airport.slug, `${airport.name} (${airport.iata}) – compensación por vuelo | FlightClaimly`, `Comprueba tus derechos como pasajero si tu vuelo desde o hacia ${airport.name} se retrasó o fue cancelado.`, {
    intro: `Si tu vuelo desde o hacia ${airport.name} se retrasó o fue cancelado, puedes tener derecho a compensación.`,
    overview: `${airport.name} (${airport.iata}) presta servicio a ${city}. Los derechos de los pasajeros dependen del vuelo concreto, la aerolínea operadora y la causa de la incidencia.`,
    passengerRights: "El EU261 puede dar derecho a una compensación estándar, entre otros supuestos, por retrasos importantes, determinadas cancelaciones y denegaciones de embarque cuando se cumplen los requisitos.",
    compensationIntro: "La compensación estándar conforme al EU261 depende, entre otros factores, de la distancia del vuelo.", compensationAmounts: amounts,
    compensationRules: "Llegar al destino final con al menos tres horas de retraso puede dar derecho a compensación si se cumplen los demás requisitos y la aerolínea no acredita circunstancias extraordinarias aplicables.",
    statisticsIntro: `Criterios habituales para reclamaciones relacionadas con vuelos desde o hacia ${airport.name}.`, statistics,
    timelineIntro: "FlightClaimly comprueba el vuelo y la documentación antes de continuar con una reclamación aplicable.", timeline, claimProcess, commonIssues,
    faq: [
      { question: `¿Puedo recibir compensación por un retraso en ${airport.name}?`, answer: "Es posible. La evaluación tiene en cuenta, entre otros factores, el retraso en el destino final, la ruta, la aerolínea operadora y la causa." },
      { question: "¿Se aplica el EU261 a todos los vuelos de este aeropuerto?", answer: "No. Su aplicación depende del vuelo concreto, incluido el lugar de salida y la aerolínea operadora." },
      { question: "¿Cómo compruebo mi vuelo?", answer: "Introduce los datos de tu vuelo en FlightClaimly para que podamos evaluar el itinerario real." },
    ],
  });
}

export function buildSpanishAirlineLocalization(airline: Airline): KnowledgeLocalization {
  return base("airline", airline.slug, `${airline.name} – compensación por vuelo | FlightClaimly`, `Comprueba si tienes derecho a compensación por el retraso o la cancelación de un vuelo de ${airline.name}.`, {
    intro: `Si tu vuelo de ${airline.name} se retrasó, fue cancelado o provocó que perdieras una conexión, puedes tener derecho a compensación.`,
    overview: `${airline.name} es una aerolínea con código IATA ${airline.iata}. El derecho a compensación se evalúa a partir del vuelo y la incidencia concretos, no solo del nombre de la aerolínea.`,
    passengerRights: "El EU261 puede dar a los pasajeros derecho a una compensación estándar, entre otros supuestos, cuando llegan al destino final con al menos tres horas de retraso, ante determinadas cancelaciones o por denegación de embarque.",
    compensationIntro: "Cuando se aplica el EU261, los importes estándar de compensación suelen ser de €250, €400 o €600.", compensationAmounts: amounts,
    compensationRules: `En una reclamación relacionada con un vuelo de ${airline.name} se valoran, entre otros factores, el vuelo, el retraso en el destino final y la causa. Las circunstancias extraordinarias pueden afectar al derecho a la compensación estándar.`,
    statisticsIntro: `Criterios habituales para reclamaciones relacionadas con vuelos de ${airline.name}.`, statistics,
    timelineIntro: `Después de presentar un caso relacionado con un vuelo de ${airline.name}, FlightClaimly revisa la documentación y continúa con la reclamación aplicable.`, timeline, claimProcess, commonIssues,
    faq: [
      { question: `¿Puedo recibir de ${airline.name} una compensación por retraso?`, answer: "Sí, si las normas correspondientes se aplican al vuelo y se cumplen los demás requisitos." },
      { question: `¿Cuánta compensación puede pagar ${airline.name}?`, answer: "Cuando se aplica el EU261, los importes estándar suelen ser de €250, €400 o €600 por pasajero." },
      { question: "¿Qué ocurre si la aerolínea alega circunstancias extraordinarias?", answer: "La causa y las medidas adoptadas por la aerolínea deben valorarse caso por caso. Esa alegación no elimina automáticamente todos los derechos de los pasajeros." },
    ],
  });
}

export function buildSpanishCountryLocalization(country: Country): KnowledgeLocalization {
  const name = spanishCountryName(country.name);
  return base("country", country.slug, `${name}: compensación por vuelo | FlightClaimly`, `Infórmate sobre los derechos de los pasajeros y comprueba la compensación por vuelos retrasados o cancelados relacionados con ${name}.`, {
    intro: `Un retraso importante, una cancelación u otra incidencia en un vuelo relacionado con ${name} puede darte derechos como pasajero.`,
    overview: `La protección para vuelos relacionados con ${name} depende de la ruta, la aerolínea operadora y las normas aplicables.`,
    passengerRights: "El EU261 protege muchos vuelos dentro de la UE y determinados vuelos hacia la UE. La aplicación exacta debe evaluarse para cada viaje.",
    compensationIntro: "Cuando se aplica el EU261, la compensación estándar se basa principalmente en la distancia del vuelo.", compensationAmounts: amounts,
    compensationRules: "Además de la compensación estándar, una incidencia puede generar derechos independientes de asistencia, reembolso o transporte alternativo.",
    statisticsIntro: `Criterios habituales sobre derechos de los pasajeros en viajes relacionados con ${name}.`, statistics,
    timelineIntro: "FlightClaimly comprueba el itinerario real y la causa de la incidencia.", timeline, claimProcess, commonIssues,
    faq: [
      { question: `¿Qué derechos de los pasajeros se aplican a los vuelos relacionados con ${name}?`, answer: "Depende de la ruta, la aerolínea operadora y la incidencia. El EU261 puede aplicarse a muchos de estos vuelos." },
      { question: "¿A cuánto puede ascender la compensación EU261?", answer: "Los importes estándar suelen ser de €250, €400 o €600 por pasajero cuando se cumplen los requisitos." },
      { question: "¿Tengo que pagar por adelantado?", answer: "No. FlightClaimly solo cobra una comisión si recuperamos una compensación para ti." },
    ],
  }, name);
}
