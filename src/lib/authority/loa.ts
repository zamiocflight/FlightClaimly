// src/lib/authority/loa.ts

export type LoaInput = {
  fullName: string;
  bookingReference: string;
  claimId?: string;
  locale?: string;
};

export type LoaDoc = {
  title: string;
  metaLines: string[];
  bodyLinesEN: string[];
  bodyLinesES: string[];
  footerLines: string[];
};

function splitToLines(text: string): string[] {
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trimEnd());
}

/* ------------------------------
ENGLISH VERSION
------------------------------ */

function getLockedLoaText_EN(): string {
  return `
FLIGHTCLAIMLY AUTHORITY DOCUMENT
(Exclusive and Irrevocable Mandate and Limited Assignment for Enforcement)

1. Declaration and Appointment

I hereby expressly authorise, mandate, and grant FlightClaimly OÜ, a company registered in Estonia (“FlightClaimly”), the exclusive authority to represent me and act on my behalf in connection with the claim relating to the flight referenced above (the “Claim”).

2. Exclusive and Irrevocable Mandate

I grant FlightClaimly an exclusive and irrevocable mandate to pursue, enforce, negotiate, settle, and otherwise handle the Claim on my behalf.

This Mandate shall remain valid and binding until the Claim is fully resolved, settled, withdrawn prior to submission, or otherwise lawfully concluded.

After submission of the Claim to the Airline or any competent authority, I may not revoke this Mandate unilaterally.

During the validity of this Mandate, I shall not appoint any other representative nor independently pursue the same Claim without the prior written consent of FlightClaimly.

I confirm that I have not granted any prior exclusive mandate, assignment, transfer of rights, or exclusive representation to any third party in respect of the Claim.

3. Scope of Authority

I expressly authorise FlightClaimly to:

- Represent me before the Airline, any competent authority, any ADR body, any court, and any third party involved in the Claim.
- Submit claims, complaints, demands, legal filings, and supporting documents on my behalf.
- Negotiate and conclude settlements.
- Initiate and conduct administrative proceedings.
- Initiate and conduct judicial proceedings.
- Pursue appeals and enforcement measures.
- Appoint external lawyers, counsel, procurators, or other legal representatives where required.
- Sign documents, pleadings, demands, and submissions on my behalf where permitted by law.
- Generate electronic powers of attorney or equivalent authorisations where required.
- Request and obtain all flight-related information and evidence required to pursue the Claim, including information obtainable under applicable data protection law, including Article 15 GDPR.
- Obtain information from civil aviation authorities, airports, public bodies, regulators, and other competent entities.
- Communicate directly with the Airline and any relevant authority regarding the Claim.
- Collect, recover, receive, and process any compensation, reimbursement, refund, damages, settlement amount, goodwill payment, legal cost recovery, interest, or other payment arising from or related to the Claim on my behalf.

I expressly instruct the Airline and any relevant authority to recognise FlightClaimly as my authorised representative and to communicate directly and exclusively with FlightClaimly regarding the Claim.

4. Limited Assignment for Enforcement and Recovery

To the extent permitted by applicable law, I hereby assign to FlightClaimly, for the limited purpose of enforcing, pursuing, collecting, recovering, settling, and receiving payment of the Claim, all rights, title, and interest necessary to assert and realise the Claim against the Airline or any responsible third party.

This limited assignment includes, without limitation, the right to pursue and recover:

- Statutory compensation
- Reimbursement of expenses
- Default or statutory interest
- Legal cost recovery
- Court fees awarded
- Enforcement costs recovered
- Administrative penalties where applicable
- Settlement amounts
- Ex gratia payments
- Any ancillary or related financial sums arising from or connected with the Claim

This limited assignment is made solely for the purpose of enforcement and recovery of the Claim and does not transfer ownership of my underlying travel contract or passenger status beyond what is necessary for such enforcement and recovery.

5. Payment Direction and Customer Protection

I authorise FlightClaimly to collect and receive any compensation or other payment related to the Claim on my behalf.

I expressly instruct the Airline to pay any compensation or other sums arising from the Claim directly to FlightClaimly as my authorised representative.

Any compensation or payment recovered by FlightClaimly on my behalf shall be transferred to me after deduction of the agreed service fee in accordance with FlightClaimly’s Terms and Conditions.

Any direct payment, settlement, refund, waiver, or other arrangement made by the Airline with me after this authorisation, without the prior written consent of FlightClaimly, shall not prejudice FlightClaimly’s rights under this Mandate and shall not affect my contractual obligations towards FlightClaimly.

6. Anti-Circumvention and Exclusive Contact

I instruct the Airline to deal exclusively with FlightClaimly regarding the Claim.

I acknowledge and agree that any attempt to bypass FlightClaimly, including accepting or negotiating a direct settlement, refund, or compensation from the Airline without prior written notice to FlightClaimly, constitutes a breach of this Mandate.

I undertake to notify FlightClaimly immediately of any direct contact, offer, settlement proposal, or payment received from the Airline relating to the Claim.

7. Cooperation and Accuracy

I agree to provide accurate and complete information and to cooperate as reasonably required for the pursuit of the Claim, including providing documentation, clarification, and identity verification if required by the Airline, a competent authority, or a court.

Failure to cooperate may result in suspension or discontinuation of the Claim.

8. Economic Reasonableness

FlightClaimly reserves the right to discontinue pursuit of the Claim where further action would be economically unreasonable, legally futile, disproportionate in cost relative to the likely recovery, or otherwise not commercially justified.

9. Digital Signature and Automated Processing

I acknowledge that this Mandate may be signed electronically and that my digital signature may be used in claims, pleadings, court filings, submissions, and communications necessary to enforce the Claim.

I further acknowledge and authorise that FlightClaimly may use automated claim submission systems, digital airline portals, API integrations, and electronic filing systems for the purpose of pursuing the Claim.

My personal data may be processed and transferred within the European Union to the extent necessary for pursuing and enforcing the Claim.

10. Governing Law

This Mandate shall be governed by Estonian law and applicable European Union passenger rights legislation.
`.trim();
}

/* ------------------------------
SPANISH VERSION
------------------------------ */

function getLockedLoaText_ES(): string {
  return `
DOCUMENTO DE AUTORIZACIÓN FLIGHTCLAIMLY
(Mandato Exclusivo e Irrevocable y Cesión Limitada para la Ejecución)

1. Declaración y Nombramiento

Por la presente autorizo, confiero mandato y otorgo a FlightClaimly OÜ, sociedad registrada en Estonia (“FlightClaimly”), autoridad exclusiva para representarme y actuar en mi nombre en relación con la reclamación relativa al vuelo arriba indicado (la “Reclamación”).

2. Mandato Exclusivo e Irrevocable

Concedo a FlightClaimly un mandato exclusivo e irrevocable para perseguir, hacer valer, negociar, resolver y gestionar de cualquier otro modo la Reclamación en mi nombre.

Este Mandato permanecerá válido y vinculante hasta que la Reclamación sea resuelta, liquidada, retirada antes de su presentación o legalmente concluida de otro modo.

Una vez presentada la Reclamación ante la Aerolínea o cualquier autoridad competente, no podré revocar este Mandato unilateralmente.

Durante la vigencia de este Mandato, no nombraré a ningún otro representante ni ejerceré por mi cuenta la misma Reclamación sin el consentimiento previo y por escrito de FlightClaimly.

Confirmo que no he concedido previamente a ningún tercero un mandato exclusivo, cesión, transferencia de derechos o representación exclusiva respecto de la Reclamación.

3. Alcance de la Autoridad

Autorizo expresamente a FlightClaimly a:

- Representarme ante la Aerolínea, cualquier autoridad competente, cualquier organismo ADR, cualquier tribunal y cualquier tercero implicado en la Reclamación.
- Presentar reclamaciones, quejas, requerimientos, escritos legales y documentación de apoyo en mi nombre.
- Negociar y concluir acuerdos de resolución.
- Iniciar y llevar a cabo procedimientos administrativos.
- Iniciar y llevar a cabo procedimientos judiciales.
- Interponer recursos y ejecutar medidas de cumplimiento.
- Designar abogados externos, procuradores, asesores jurídicos u otros representantes legales cuando sea necesario.
- Firmar documentos, escritos, demandas, solicitudes y presentaciones en mi nombre cuando la ley lo permita.
- Generar poderes electrónicos u otras autorizaciones equivalentes cuando sea necesario.
- Solicitar y obtener toda la información y prueba relativa al vuelo necesaria para tramitar la Reclamación, incluida la información obtenible conforme a la normativa aplicable de protección de datos, incluido el artículo 15 del RGPD.
- Obtener información de autoridades de aviación civil, aeropuertos, organismos públicos, reguladores y otras entidades competentes.
- Comunicarse directamente con la Aerolínea y cualquier autoridad competente en relación con la Reclamación.
- Cobrar, recuperar, recibir y procesar en mi nombre cualquier compensación, reembolso, devolución, indemnización, cantidad transaccional, pago graciable, recuperación de costas, intereses u otro pago derivado de o relacionado con la Reclamación.

Instruyo expresamente a la Aerolínea y a cualquier autoridad competente a reconocer a FlightClaimly como mi representante autorizado y a comunicarse directa y exclusivamente con FlightClaimly en relación con la Reclamación.

4. Cesión Limitada para la Ejecución y Recuperación

En la medida permitida por la ley aplicable, cedo por la presente a FlightClaimly, con el único y limitado propósito de ejecutar, perseguir, cobrar, recuperar, negociar y recibir el pago de la Reclamación, todos los derechos, títulos e intereses necesarios para hacer valer y realizar la Reclamación frente a la Aerolínea o cualquier tercero responsable.

Esta cesión limitada incluye, sin limitación, el derecho a perseguir y recuperar:

- Compensación legal
- Reembolso de gastos
- Intereses legales o de demora
- Recuperación de costas legales
- Tasas judiciales concedidas
- Costes de ejecución recuperados
- Sanciones administrativas cuando procedan
- Cantidades de acuerdo o transacción
- Pagos graciables
- Cualesquiera cantidades accesorias o relacionadas que deriven de o estén conectadas con la Reclamación

Esta cesión limitada se realiza exclusivamente para la ejecución y recuperación de la Reclamación y no transfiere la titularidad de mi contrato de transporte subyacente ni mi condición de pasajero más allá de lo necesario para dicha ejecución y recuperación.

5. Instrucción de Pago y Protección del Cliente

Autorizo a FlightClaimly a cobrar y recibir en mi nombre cualquier compensación u otro pago relacionado con la Reclamación.

Instruyo expresamente a la Aerolínea a pagar directamente a FlightClaimly, como mi representante autorizado, cualquier compensación u otra suma derivada de la Reclamación.

Cualquier compensación o pago recuperado por FlightClaimly en mi nombre me será transferido después de deducir la tarifa de servicio acordada conforme a los Términos y Condiciones de FlightClaimly.

Cualquier pago directo, acuerdo, reembolso, renuncia u otro arreglo realizado por la Aerolínea conmigo después de esta autorización, sin el consentimiento previo y por escrito de FlightClaimly, no perjudicará los derechos de FlightClaimly en virtud de este Mandato ni afectará a mis obligaciones contractuales frente a FlightClaimly.

6. Anti-Elusión y Contacto Exclusivo

Instruyo a la Aerolínea a tratar exclusivamente con FlightClaimly en relación con la Reclamación.

Reconozco y acepto que cualquier intento de eludir a FlightClaimly, incluida la aceptación o negociación de un acuerdo directo, reembolso o compensación con la Aerolínea sin previo aviso por escrito a FlightClaimly, constituye un incumplimiento de este Mandato.

Me comprometo a notificar inmediatamente a FlightClaimly cualquier contacto directo, oferta, propuesta de acuerdo o pago recibido de la Aerolínea relacionado con la Reclamación.

7. Cooperación y Exactitud

Me comprometo a proporcionar información veraz y completa y a cooperar razonablemente en la tramitación de la Reclamación, incluida la aportación de documentación, aclaraciones y verificación de identidad si así lo requiere la Aerolínea, una autoridad competente o un tribunal.

La falta de cooperación podrá dar lugar a la suspensión o interrupción de la Reclamación.

8. Razonabilidad Económica

FlightClaimly se reserva el derecho de interrumpir la tramitación de la Reclamación cuando continuar resulte económicamente irrazonable, jurídicamente inútil, desproporcionado en relación con la recuperación probable o de otro modo no comercialmente justificado.

9. Firma Electrónica y Tratamiento Automatizado

Reconozco que este Mandato puede ser firmado electrónicamente y que mi firma digital podrá utilizarse en reclamaciones, escritos, presentaciones judiciales, solicitudes y comunicaciones necesarias para hacer valer la Reclamación.

Asimismo, reconozco y autorizo que FlightClaimly pueda utilizar sistemas automatizados de presentación de reclamaciones, portales digitales de aerolíneas, integraciones API y sistemas de presentación electrónica para la tramitación de la Reclamación.

Mis datos personales podrán ser tratados y transferidos dentro de la Unión Europea en la medida necesaria para perseguir y hacer valer la Reclamación.

10. Legislación Aplicable

Este Mandato se regirá por la legislación de Estonia y por la normativa aplicable de derechos de los pasajeros de la Unión Europea.
`.trim();
}

export function buildLoaDoc(input: LoaInput): LoaDoc {
  const { fullName, bookingReference, claimId } = input;

  const title = "Authority Document";

  const metaLines = [
    `Passenger: ${fullName}`,
    `Booking reference (PNR): ${bookingReference}`,
    ...(claimId ? [`Claim ID: ${claimId}`] : []),
  ];

  const bodyLinesEN = splitToLines(getLockedLoaText_EN());
  const bodyLinesES = splitToLines(getLockedLoaText_ES());

  const footerLines: string[] = [];

  return {
    title,
    metaLines,
    bodyLinesEN,
    bodyLinesES,
    footerLines,
  };
}