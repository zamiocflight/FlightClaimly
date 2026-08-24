// src/lib/statusEmail.ts
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail =
  process.env.FLIGHTCLAIMLY_FROM_EMAIL || 'support@flightclaimly.com';

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.APP_URL ||
  'http://localhost:3000';

const trackingPath = process.env.FLIGHTCLAIMLY_TRACKING_PATH || '/track';

if (!resendApiKey) {
  console.warn('⚠️ RESEND_API_KEY saknas – statusmail kommer inte att skickas.');
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export type StatusCode =
  | 'new'
  | 'processing'
  | 'sent_to_airline'
  | 'approved'
  | 'paid_out'
  | 'rejected';

// ✅ Utökad language support (utan att ändra layout)
export type Lang = 'sv' | 'en' | 'da' | 'de' | 'pl' | 'fi' | "nl";

type SendStatusEmailArgs = {
  id: string;
  email: string;
  name?: string;
  status: StatusCode;
  flightNumber?: string;
  from?: string;
  to?: string;
  flightDate?: string | null;
  publicToken?: string;
  // valfritt – default = 'en' (men du kan välja 'sv' om du vill)
  lang?: Lang;
};

export async function sendStatusEmail(
  args: SendStatusEmailArgs
): Promise<boolean> {
  if (!resend || !fromEmail) {
    console.warn('⚠️ Resend inte konfigurerat – hoppar över statusmail.', {
      hasResend: !!resend,
      fromEmail,
    });
    return false;
  }

  // ✅ Defaulta till EN för safety (du kan ändra till 'sv' om du vill)
  const lang: Lang = args.lang || 'en';

  const trackingUrl = args.id
    ? buildTrackUrl(args.id, args.publicToken, lang)
    : undefined;

  const payoutUrl =
    args.status === 'approved' && args.id
      ? buildPayoutUrl(args.id, args.publicToken, lang)
      : undefined;

  const ctaUrl = payoutUrl || trackingUrl;

  console.log('DEBUG sendStatusEmail', {
    id: args.id,
    publicToken: args.publicToken,
    trackingUrl,
    payoutUrl,
    ctaUrl,
    lang,
  });

  const flightLine = buildFlightLine(lang, {
    flightNumber: args.flightNumber,
    from: args.from,
    to: args.to,
    flightDate: args.flightDate,
    claimId: args.id,
  });

  const { subject, innerHtml } = buildStatusContent(lang, args.status, {
    name: args.name,
  });

  if (!subject) {
    return false;
  }

  // ✅ CTA label för "approved" på alla språk
  const ctaLabel =
    args.status === 'approved' ? getApprovedCtaLabel(lang) : undefined;

  const html = wrapEmailLayout({
    lang,
    subject,
    innerHtml,
    ctaUrl,
    ctaLabel,
    flightLine,
  });

  const { error } = await resend.emails.send({
    from: `FlightClaimly <${fromEmail}>`,
    to: args.email,
    subject,
    html,
    reply_to: fromEmail as any,
  } as any);

  if (error) {
    console.error('❌ Resend statusmail error:', error);
    return false;
  }

  console.log('✅ Statusmail skickat med Resend', {
    to: args.email,
    status: args.status,
    lang,
  });
  return true;
}

// ---------- layout / helpers ----------

function buildTrackUrl(id: string, publicToken?: string, lang: Lang = 'en') {
  const base = appUrl.replace(/\/$/, '');
  const tokenPart = publicToken ? `?t=${encodeURIComponent(publicToken)}` : '';

  // om env råkar vara satt till "/track" vill vi ändå ha /{lang}/track
  const cleanTrackingPath = (trackingPath || '/track').replace(/^\/+/, ''); // "track"
  return `${base}/${lang}/${cleanTrackingPath}/${encodeURIComponent(
    id
  )}${tokenPart}`;
}

function buildPayoutUrl(id: string, publicToken?: string, lang: Lang = 'en') {
  const base = appUrl.replace(/\/$/, '');
  const tokenPart = publicToken ? `?t=${encodeURIComponent(publicToken)}` : '';
  return `${base}/${lang}/payout/${encodeURIComponent(id)}${tokenPart}`;
}

function buildFlightLine(
  lang: Lang,
  args: {
    flightNumber?: string;
    from?: string;
    to?: string;
    flightDate?: string | null;
    claimId: string;
  }
) {
  const { flightNumber, from, to, flightDate, claimId } = args;

  const caseLabel = getCaseLabel(lang);
  const arrow = '→';

  if (flightNumber) {
    return `${caseLabel}: ${escapeHtml(flightNumber)} • ${
      from ? escapeHtml(from) : ''
    } ${arrow} ${to ? escapeHtml(to) : ''}${
      flightDate ? ` • ${escapeHtml(flightDate)}` : ''
    }`;
  }

  return `${getCaseIdLabel(lang)}: ${escapeHtml(claimId)}`;
}

function wrapEmailLayout(opts: {
  lang: Lang;
  subject: string;
  innerHtml: string;
  ctaUrl?: string;
  ctaLabel?: string;
  flightLine: string;
}) {
  const { lang, innerHtml, ctaUrl, ctaLabel, flightLine } = opts;

  const defaultCtaLabel = getDefaultCtaLabel(lang);
  const finalCtaLabel = ctaLabel || defaultCtaLabel;

  const autoText = getAutoText(lang);
  const tagline = getTagline(lang);

  const ctaBlock = ctaUrl
    ? `
      <tr>
        <td align="left" style="padding: 10px 0 20px 0;">
          <a href="${ctaUrl}"
             style="display:inline-block;padding:12px 24px;border-radius:9999px;
                    background-color:#0f172a;color:#f9fafb;font-size:14px;
                    font-weight:600;text-decoration:none;">
            ${finalCtaLabel}
          </a>
        </td>
      </tr>
      <tr>
        <td align="left" style="padding: 0 0 8px 0;color:#64748b;font-size:13px;">
          <a href="${ctaUrl}"
             style="color:#64748b;text-decoration:underline;word-break:break-all;">
            ${ctaUrl}
          </a>
        </td>
      </tr>
    `
    : '';

  const flightLineRow = `
    <tr>
      <td align="left" style="padding: 6px 0 0 0;color:#94a3b8;font-size:12px;">
        ${escapeHtml(flightLine)}
      </td>
    </tr>
  `;

  const footerBlock = `
    <tr>
      <td align="left" style="padding-top:26px;border-top:1px solid #e2e8f0;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td align="left" style="padding:0 0 8px 0;">
              <span style="display:inline-block;font-weight:800;font-size:18px;
                           letter-spacing:-0.04em;color:#0f172a;">
                FlightClaimly
              </span>
            </td>
          </tr>
          <tr>
            <td align="left" style="color:#64748b;font-size:13px;padding:0 0 4px 0;">
              ${escapeHtml(tagline)}
            </td>
          </tr>
          <tr>
            <td align="left" style="color:#9ca3af;font-size:11px;line-height:1.6;">
              ${escapeHtml(autoText)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;

  return `
<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>FlightClaimly</title>
  </head>
  <body style="margin:0;padding:24px 0;background-color:#e5ecf7;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
           style="border-collapse:collapse;width:100%;">
      <tr>
        <td align="center" style="padding:0 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                 style="max-width:700px;background-color:#ffffff;border-radius:24px;
                        border:1px solid #e2e8f0;overflow:hidden;
                        box-shadow:0 24px 60px rgba(15,23,42,0.20);">
            <!-- Header -->
            <tr>
              <td style="
                padding:24px 30px 20px 30px;
                background:
                  radial-gradient(circle at 0% 0%, rgba(191,219,254,0.9), transparent 55%),
                  radial-gradient(circle at 100% 0%, rgba(219,234,254,0.95), transparent 60%),
                  linear-gradient(135deg,#eff6ff,#e0f2fe);
              ">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td align="left">
                      <span style="display:inline-block;font-weight:800;font-size:19px;
                                   letter-spacing:-0.04em;color:#0f172a;">
                        FlightClaimly
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td align="left"
                        style="padding-top:8px;color:#64748b;font-size:11px;
                               letter-spacing:0.12em;text-transform:uppercase;">
                      ${getHeaderKicker(lang)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:26px 30px 30px 30px;background-color:#ffffff;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  ${innerHtml}
                  ${ctaBlock}
                  ${flightLineRow}
                  ${footerBlock}
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ---------- i18n helpers for mail ----------

function getCaseLabel(lang: Lang) {
  switch (lang) {
    case 'sv':
      return 'Ärende';
    case 'da':
      return 'Sag';
    case 'de':
      return 'Vorgang';
    case 'pl':
      return 'Sprawa';
    case 'fi':
      return 'Asia';
    case 'en':
    default:
      return 'Case';
  }
}

function getCaseIdLabel(lang: Lang) {
  switch (lang) {
    case 'sv':
      return 'Ärende-ID';
    case 'da':
      return 'Sags-ID';
    case 'de':
      return 'Vorgangs-ID';
    case 'pl':
      return 'ID sprawy';
    case 'fi':
      return 'Asian ID';
    case 'en':
    default:
      return 'Case ID';
  }
}

function getDefaultCtaLabel(lang: Lang) {
  switch (lang) {
    case 'sv':
      return 'Följ ditt ärende';
    case 'da':
      return 'Følg din sag';
    case 'de':
      return 'Vorgang ansehen';
    case 'pl':
      return 'Śledź sprawę';
    case 'fi':
      return 'Seuraa asiaasi';
    case 'en':
    default:
      return 'View your case';
  }
}

function getApprovedCtaLabel(lang: Lang) {
  switch (lang) {
    case 'sv':
      return 'Lämna kontouppgifter';
    case 'da':
      return 'Indtast bankoplysninger';
    case 'de':
      return 'Bankdaten angeben';
    case 'pl':
      return 'Dodaj dane bankowe';
    case 'fi':
      return 'Lisää pankkitiedot';
    case 'en':
    default:
      return 'Add bank details';
  }
}

function getAutoText(lang: Lang) {
  switch (lang) {
    case 'sv':
      return 'Detta är ett automatiskt statusmeddelande. Svara gärna om du har frågor.';
    case 'da':
      return 'Dette er en automatisk statusopdatering. Svar gerne, hvis du har spørgsmål.';
    case 'de':
      return 'Dies ist ein automatisches Status-Update. Antworten Sie gern, wenn Sie Fragen haben.';
    case 'pl':
      return 'To automatyczna aktualizacja statusu. Odpisz, jeśli masz pytania.';
    case 'fi':
      return 'Tämä on automaattinen tilapäivitys. Vastaa tähän viestiin, jos sinulla on kysyttävää.';
    case 'en':
    default:
      return 'This is an automatic status update. Feel free to reply if you have any questions.';
  }
}

function getTagline(lang: Lang) {
  switch (lang) {
    case 'sv':
      return 'Vi driver in din ersättning – du slipper bråka med flygbolaget.';
    case 'da':
      return 'Vi inddriver din kompensation – du slipper at kæmpe med flyselskabet.';
    case 'de':
      return 'Wir holen Ihre Entschädigung ein – ohne Streit mit der Airline.';
    case 'pl':
      return 'Odzyskujemy Twoje odszkodowanie – bez walki z linią lotniczą.';
    case 'fi':
      return 'Haemme korvauksesi – ilman taistelua lentoyhtiön kanssa.';
    case 'en':
    default:
      return 'We collect your compensation – you avoid the fight with the airline.';
  }
}

function getHeaderKicker(lang: Lang) {
  switch (lang) {
    case 'sv':
      return 'Uppdatering om ditt ersättningsärende';
    case 'da':
      return 'Opdatering om din kompensationssag';
    case 'de':
      return 'Update zu Ihrem Entschädigungsfall';
    case 'pl':
      return 'Aktualizacja Twojej sprawy o odszkodowanie';
    case 'fi':
      return 'Päivitys korvausasiaasi';
    case 'en':
    default:
      return 'Update on your compensation claim';
  }
}

// ---------- status-copy (SV + EN + DA + DE + PL + FI) ----------

function buildStatusContent(
  lang: Lang,
  status: StatusCode,
  opts: { name?: string }
): { subject: string; innerHtml: string } {
  const safeName =
    (opts.name || '').trim() ||
    (lang === 'sv'
      ? 'resenär'
      : lang === 'da'
      ? 'rejsende'
      : lang === 'de'
      ? 'Reisende'
      : lang === 'pl'
      ? 'podróżny'
      : lang === 'fi'
      ? 'matkustaja'
      : 'traveller');

  const hi =
    lang === 'sv'
      ? `Hej ${safeName},`
      : lang === 'da'
      ? `Hej ${safeName},`
      : lang === 'de'
      ? `Hallo ${safeName},`
      : lang === 'pl'
      ? `Cześć ${safeName},`
      : lang === 'fi'
      ? `Hei ${safeName},`
      : `Hi ${safeName},`;

  const wrapCopy = (heading: string, paragraphs: string[]) => {
    const headingHtml = heading
      ? `<tr>
           <td align="left" style="padding:0 0 8px 0;">
             <h1 style="margin:0;font-size:18px;line-height:1.3;color:#0f172a;font-weight:700;">
               ${escapeHtml(heading)}
             </h1>
           </td>
         </tr>`
      : '';

    const bodyHtml = `<tr>
         <td align="left" style="padding:0 0 12px 0;color:#0f172a;font-size:14px;line-height:1.6;">
           <p style="margin:0 0 12px 0;">${escapeHtml(hi)}</p>
           ${paragraphs
             .map((p) => `<p style="margin:0 0 12px 0;">${p}</p>`)
             .join('')}
         </td>
       </tr>`;

    return headingHtml + bodyHtml;
  };

  // ===== SWEDISH =====
  if (lang === 'sv') {
    switch (status) {
      case 'new':
        return {
          subject: 'Vi har mottagit ditt ärende – FlightClaimly',
          innerHtml: wrapCopy('Vi har mottagit ditt ärende', [
            'Vi har tagit emot ditt underlag och påbörjat hanteringen av ditt ersättningskrav.',
            'Vi går nu igenom uppgifterna och kontrollerar vad du kan ha rätt till enligt EU-förordning 261/2004.',
            'Du får en uppdatering så snart vi tar nästa steg.',
          ]),
        };
      case 'processing':
        return {
          subject: 'Ditt ärende är under behandling – FlightClaimly',
          innerHtml: wrapCopy('Ditt ärende är under behandling', [
            'Vi arbetar just nu med ditt ärende.',
            'Det innebär att vi granskar all information, säkerställer att kravet är komplett och förbereder kommunikationen med flygbolaget.',
            'Om vi behöver kompletterande uppgifter hör vi av oss via e-post.',
          ]),
        };
      case 'sent_to_airline':
        return {
          subject: 'Ditt ärende är skickat till flygbolaget – FlightClaimly',
          innerHtml: wrapCopy('Vi har kontaktat flygbolaget', [
            'Vi har nu skickat in ditt ersättningskrav till flygbolaget.',
            'Handläggningstiden varierar mellan olika bolag, men ett svar brukar komma inom 2–8 veckor. Ibland kan det ta längre tid beroende på belastning och ärendets komplexitet.',
            'Vi bevakar ärendet och återkommer så snart vi får ett besked eller om flygbolaget ber om mer information.',
          ]),
        };
      case 'approved':
        return {
          subject: 'Din ersättning är godkänd – lämna kontouppgifter',
          innerHtml: wrapCopy('Din ersättning är godkänd', [
            'Bra nyheter – ditt ärende är godkänt.',
            'För att vi ska kunna betala ut ersättningen behöver vi dina kontouppgifter (IBAN). Det tar bara en minut.',
            'Klicka på knappen nedan för att lämna kontouppgifter.',
          ]),
        };
      case 'paid_out':
        return {
          subject: 'Grattis! Din ersättning är utbetald 🎉',
          innerHtml: wrapCopy('Din ersättning är utbetald', [
            'Ditt ärende är nu avslutat och ersättningen har betalats ut.',
            'Beroende på bank kan det dröja 1–2 bankdagar innan pengarna syns på ditt konto.',
            'Om något ser fel ut med beloppet eller utbetalningen kan du bara svara på det här mailet, så hjälper vi dig.',
          ]),
        };
      case 'rejected':
        return {
          subject:
            'Information om ditt ärende – tyvärr ingen ersättning denna gång',
          innerHtml: wrapCopy('Tyvärr blev det ingen ersättning den här gången', [
            'Efter genomgång av ditt ärende och/eller besked från flygbolaget bedömer vi tyvärr att det inte finns grund för ersättning enligt EU-förordning 261/2004.',
            'Vanliga orsaker är till exempel att flygbolaget kan visa att förseningen beror på extraordinära omständigheter, eller att kravet faller utanför de tids- eller distansgränser som gäller för ersättning.',
            'Om du vill ha en kort sammanfattning av varför just ditt ärende inte gav ersättning kan du svara på detta mail, så förklarar vi mer i detalj.',
          ]),
        };
      default:
        return {
          subject: 'Uppdatering om ditt ärende – FlightClaimly',
          innerHtml: wrapCopy('Statusuppdatering för ditt ärende', [
            'Status för ditt ärende har uppdaterats.',
            'Du kan följa läget via länken nedan och är alltid välkommen att svara om du har frågor.',
          ]),
        };
    }
  }

  // ===== DANISH =====
  if (lang === 'da') {
    switch (status) {
      case 'new':
        return {
          subject: 'Vi har modtaget din sag – FlightClaimly',
          innerHtml: wrapCopy('Vi har modtaget din sag', [
            'Vi har modtaget dine oplysninger og er begyndt at behandle din kompensationssag.',
            'Vi gennemgår nu oplysningerne og vurderer, hvad du kan have ret til efter EU-forordning 261/2004.',
            'Du får en opdatering, så snart vi tager næste skridt.',
          ]),
        };
      case 'processing':
        return {
          subject: 'Din sag er under behandling – FlightClaimly',
          innerHtml: wrapCopy('Din sag er under behandling', [
            'Vi arbejder lige nu på din sag.',
            'Det betyder, at vi gennemgår al information, sikrer at sagen er komplet og forbereder kommunikationen med flyselskabet.',
            'Hvis vi har brug for flere oplysninger, kontakter vi dig via e-mail.',
          ]),
        };
      case 'sent_to_airline':
        return {
          subject: 'Din sag er sendt til flyselskabet – FlightClaimly',
          innerHtml: wrapCopy('Vi har kontaktet flyselskabet', [
            'Vi har nu indsendt dit kompensationskrav til flyselskabet.',
            'Sagsbehandlingstiden varierer, men svar kommer ofte inden for 2–8 uger. I nogle tilfælde kan det tage længere tid.',
            'Vi følger sagen og vender tilbage, så snart vi modtager svar eller hvis flyselskabet beder om mere information.',
          ]),
        };
      case 'approved':
        return {
          subject: 'Din kompensation er godkendt – indtast bankoplysninger',
          innerHtml: wrapCopy('Din kompensation er godkendt', [
            'Gode nyheder — din sag er godkendt.',
            'For at vi kan udbetale kompensationen, har vi brug for dine bankoplysninger (IBAN). Det tager kun et minut.',
            'Klik på knappen nedenfor for at indtaste bankoplysninger.',
          ]),
        };
      case 'paid_out':
        return {
          subject: 'Tillykke! Din kompensation er udbetalt 🎉',
          innerHtml: wrapCopy('Din kompensation er udbetalt', [
            'Din sag er nu afsluttet, og kompensationen er udbetalt.',
            'Afhængigt af din bank kan det tage 1–2 bankdage, før pengene kan ses på din konto.',
            'Hvis noget ser forkert ud, kan du bare svare på denne e-mail, så hjælper vi dig.',
          ]),
        };
      case 'rejected':
        return {
          subject: 'Information om din sag – desværre ingen kompensation',
          innerHtml: wrapCopy('Desværre ingen kompensation denne gang', [
            'Efter gennemgang af din sag og/eller svar fra flyselskabet vurderer vi desværre, at der ikke er grundlag for kompensation efter EU-forordning 261/2004.',
            'Typiske årsager kan være ekstraordinære omstændigheder eller at kravet falder uden for tids-/distancekravene.',
            'Hvis du ønsker en kort forklaring for netop din sag, kan du svare på denne e-mail, så forklarer vi mere.',
          ]),
        };
      default:
        return {
          subject: 'Opdatering om din sag – FlightClaimly',
          innerHtml: wrapCopy('Statusopdatering', [
            'Status for din sag er blevet opdateret.',
            'Du kan følge udviklingen via linket nedenfor, og du er altid velkommen til at svare, hvis du har spørgsmål.',
          ]),
        };
    }
  }

  // ===== GERMAN =====
  if (lang === 'de') {
    switch (status) {
      case 'new':
        return {
          subject: 'Wir haben Ihren Vorgang erhalten – FlightClaimly',
          innerHtml: wrapCopy('Wir haben Ihren Vorgang erhalten', [
            'Wir haben Ihre Angaben erhalten und mit der Bearbeitung Ihres Entschädigungsanspruchs begonnen.',
            'Wir prüfen nun die Details und ob Ihnen nach EU-Verordnung 261/2004 eine Entschädigung zusteht.',
            'Sobald wir den nächsten Schritt machen, erhalten Sie ein Update.',
          ]),
        };
      case 'processing':
        return {
          subject: 'Ihr Vorgang wird bearbeitet – FlightClaimly',
          innerHtml: wrapCopy('Ihr Vorgang wird bearbeitet', [
            'Wir arbeiten derzeit an Ihrem Vorgang.',
            'Dabei prüfen wir alle Informationen, stellen die Vollständigkeit sicher und bereiten die Kommunikation mit der Airline vor.',
            'Falls wir weitere Angaben benötigen, melden wir uns per E-Mail.',
          ]),
        };
      case 'sent_to_airline':
        return {
          subject: 'Vorgang an die Airline gesendet – FlightClaimly',
          innerHtml: wrapCopy('Wir haben die Airline kontaktiert', [
            'Wir haben Ihren Entschädigungsanspruch nun bei der Airline eingereicht.',
            'Die Bearbeitungszeit variiert, häufig kommt eine Antwort innerhalb von 2–8 Wochen. In Einzelfällen kann es länger dauern.',
            'Wir behalten den Vorgang im Blick und melden uns, sobald wir eine Rückmeldung erhalten oder die Airline weitere Informationen anfordert.',
          ]),
        };
      case 'approved':
        return {
          subject: 'Entschädigung genehmigt – Bankdaten angeben',
          innerHtml: wrapCopy('Ihre Entschädigung ist genehmigt', [
            'Gute Nachrichten — Ihr Vorgang wurde genehmigt.',
            'Für die Auszahlung benötigen wir Ihre Bankdaten (IBAN). Das dauert nur eine Minute.',
            'Klicken Sie unten, um Ihre Bankdaten anzugeben.',
          ]),
        };
      case 'paid_out':
        return {
          subject: 'Gute Nachrichten! Ihre Entschädigung wurde ausgezahlt 🎉',
          innerHtml: wrapCopy('Ihre Entschädigung wurde ausgezahlt', [
            'Ihr Vorgang ist abgeschlossen und die Entschädigung wurde ausgezahlt.',
            'Je nach Bank kann es 1–2 Bankarbeitstage dauern, bis das Geld auf Ihrem Konto sichtbar ist.',
            'Wenn etwas nicht stimmt, antworten Sie einfach auf diese E-Mail — wir helfen gern.',
          ]),
        };
      case 'rejected':
        return {
          subject: 'Information zu Ihrem Vorgang – leider keine Entschädigung',
          innerHtml: wrapCopy('Leider keine Entschädigung dieses Mal', [
            'Nach Prüfung Ihres Vorgangs und/oder Rückmeldung der Airline müssen wir leider feststellen, dass kein Anspruch auf Entschädigung nach EU-Verordnung 261/2004 besteht.',
            'Häufige Gründe sind außergewöhnliche Umstände oder dass der Anspruch außerhalb der relevanten Zeit-/Distanzgrenzen liegt.',
            'Wenn Sie eine kurze Begründung für Ihren konkreten Fall möchten, antworten Sie auf diese E-Mail — wir erklären es gern.',
          ]),
        };
      default:
        return {
          subject: 'Update zu Ihrem Vorgang – FlightClaimly',
          innerHtml: wrapCopy('Status-Update', [
            'Der Status Ihres Vorgangs wurde aktualisiert.',
            'Sie können den Fortschritt über den Link unten verfolgen und jederzeit auf diese E-Mail antworten, wenn Sie Fragen haben.',
          ]),
        };
    }
  }

  // ===== POLISH =====
  if (lang === 'pl') {
    switch (status) {
      case 'new':
        return {
          subject: 'Otrzymaliśmy Twoją sprawę – FlightClaimly',
          innerHtml: wrapCopy('Otrzymaliśmy Twoją sprawę', [
            'Otrzymaliśmy Twoje dane i rozpoczęliśmy obsługę roszczenia o odszkodowanie.',
            'Sprawdzamy teraz szczegóły i to, czy przysługuje Ci odszkodowanie na podstawie Rozporządzenia (WE) 261/2004.',
            'Wyślemy aktualizację, gdy tylko przejdziemy do kolejnego kroku.',
          ]),
        };
      case 'processing':
        return {
          subject: 'Twoja sprawa jest w trakcie – FlightClaimly',
          innerHtml: wrapCopy('Twoja sprawa jest w trakcie', [
            'Aktualnie pracujemy nad Twoją sprawą.',
            'Oznacza to weryfikację informacji, kompletność dokumentów oraz przygotowanie kontaktu z linią lotniczą.',
            'Jeśli będziemy potrzebować dodatkowych danych, skontaktujemy się e-mailem.',
          ]),
        };
      case 'sent_to_airline':
        return {
          subject: 'Sprawa wysłana do linii lotniczej – FlightClaimly',
          innerHtml: wrapCopy('Skontaktowaliśmy się z linią lotniczą', [
            'Wysłaliśmy Twoje roszczenie o odszkodowanie do linii lotniczej.',
            'Czas odpowiedzi bywa różny, ale zwykle wynosi 2–8 tygodni. Czasem może potrwać dłużej.',
            'Monitorujemy sprawę i wrócimy do Ciebie, gdy tylko otrzymamy odpowiedź lub linia poprosi o dodatkowe informacje.',
          ]),
        };
      case 'approved':
        return {
          subject: 'Odszkodowanie zatwierdzone – dodaj dane bankowe',
          innerHtml: wrapCopy('Odszkodowanie zatwierdzone', [
            'Dobra wiadomość — Twoja sprawa została zatwierdzona.',
            'Aby wypłacić odszkodowanie, potrzebujemy Twoich danych bankowych (IBAN). To zajmie minutę.',
            'Kliknij poniżej, aby dodać dane bankowe.',
          ]),
        };
      case 'paid_out':
        return {
          subject: 'Gratulacje! Odszkodowanie zostało wypłacone 🎉',
          innerHtml: wrapCopy('Odszkodowanie wypłacone', [
            'Sprawa została zakończona, a odszkodowanie wypłacone.',
            'W zależności od banku może to potrwać 1–2 dni robocze, zanim środki będą widoczne na koncie.',
            'Jeśli coś się nie zgadza, po prostu odpisz na tę wiadomość — pomożemy.',
          ]),
        };
      case 'rejected':
        return {
          subject:
            'Informacja o Twojej sprawie – niestety bez odszkodowania',
          innerHtml: wrapCopy('Niestety bez odszkodowania tym razem', [
            'Po analizie sprawy i/lub odpowiedzi linii lotniczej stwierdzamy niestety, że brak podstaw do odszkodowania na mocy Rozporządzenia (WE) 261/2004.',
            'Częste powody to nadzwyczajne okoliczności lub brak spełnienia wymogów czasowych/dystansowych.',
            'Jeśli chcesz krótkie wyjaśnienie dla Twojej konkretnej sprawy, odpisz na tę wiadomość — wyjaśnimy.',
          ]),
        };
      default:
        return {
          subject: 'Aktualizacja Twojej sprawy – FlightClaimly',
          innerHtml: wrapCopy('Aktualizacja statusu', [
            'Status Twojej sprawy został zaktualizowany.',
            'Możesz śledzić postęp przez link poniżej i zawsze możesz odpisać, jeśli masz pytania.',
          ]),
        };
    }
  }

  // ===== FINNISH =====
  if (lang === 'fi') {
    switch (status) {
      case 'new':
        return {
          subject: 'Olemme vastaanottaneet asiasi – FlightClaimly',
          innerHtml: wrapCopy('Olemme vastaanottaneet asiasi', [
            'Olemme vastaanottaneet tietosi ja aloittaneet korvausvaatimuksesi käsittelyn.',
            'Tarkistamme nyt yksityiskohdat ja mahdollisen korvauksen EU-asetuksen 261/2004 perusteella.',
            'Saat päivityksen heti, kun etenemme seuraavaan vaiheeseen.',
          ]),
        };
      case 'processing':
        return {
          subject: 'Asiasi on käsittelyssä – FlightClaimly',
          innerHtml: wrapCopy('Asiasi on käsittelyssä', [
            'Käsittelemme parhaillaan asiaasi.',
            'Tämä tarkoittaa tietojen tarkistusta, asian täydellisyyden varmistamista ja viestinnän valmistelua lentoyhtiön kanssa.',
            'Jos tarvitsemme lisätietoja, otamme yhteyttä sähköpostitse.',
          ]),
        };
      case 'sent_to_airline':
        return {
          subject: 'Asia lähetetty lentoyhtiölle – FlightClaimly',
          innerHtml: wrapCopy('Olemme ottaneet yhteyttä lentoyhtiöön', [
            'Olemme nyt lähettäneet korvausvaatimuksesi lentoyhtiölle.',
            'Käsittelyajat vaihtelevat, mutta vastaus tulee usein 2–8 viikon sisällä. Joskus se voi kestää pidempään.',
            'Seuraamme asiaa ja palaamme heti, kun saamme vastauksen tai jos lentoyhtiö pyytää lisätietoja.',
          ]),
        };
      case 'approved':
        return {
          subject: 'Korvaus hyväksytty – lisää pankkitiedot',
          innerHtml: wrapCopy('Korvaus hyväksytty', [
            'Hyviä uutisia — asiasi on hyväksytty.',
            'Jotta voimme maksaa korvauksen, tarvitsemme pankkitietosi (IBAN). Se vie vain hetken.',
            'Klikkaa alla olevaa painiketta lisätäksesi pankkitiedot.',
          ]),
        };
      case 'paid_out':
        return {
          subject: 'Hienoa! Korvaus on maksettu 🎉',
          innerHtml: wrapCopy('Korvaus on maksettu', [
            'Asiasi on nyt valmis ja korvaus on maksettu.',
            'Pankista riippuen voi kestää 1–2 pankkipäivää, ennen kuin raha näkyy tililläsi.',
            'Jos jokin näyttää väärältä, vastaa tähän sähköpostiin — autamme mielellämme.',
          ]),
        };
      case 'rejected':
        return {
          subject: 'Tietoa asiasi tilanteesta – ei korvausta tällä kertaa',
          innerHtml: wrapCopy('Valitettavasti ei korvausta tällä kertaa', [
            'Asiasi tarkistuksen ja/tai lentoyhtiön vastauksen perusteella emme valitettavasti voi myöntää korvausta EU-asetuksen 261/2004 mukaan.',
            'Yleisiä syitä ovat poikkeukselliset olosuhteet tai se, ettei vaatimus täytä aika-/etäisyysvaatimuksia.',
            'Jos haluat lyhyen selityksen juuri sinun tapauksestasi, vastaa tähän viestiin — selitämme mielellämme.',
          ]),
        };
      default:
        return {
          subject: 'Päivitys asiaasi – FlightClaimly',
          innerHtml: wrapCopy('Tilapäivitys', [
            'Asiasi tila on päivittynyt.',
            'Voit seurata etenemistä alla olevasta linkistä ja voit aina vastata tähän sähköpostiin, jos sinulla on kysyttävää.',
          ]),
        };
    }
  }

  // ===== ENGLISH (default) =====
  switch (status) {
    case 'new':
      return {
        subject: 'We have received your case – FlightClaimly',
        innerHtml: wrapCopy('We have received your case', [
          'We have received your information and started processing your compensation claim.',
          'We are now reviewing the details and checking what compensation you may be entitled to under EU Regulation 261/2004.',
          'You will receive an update as soon as we take the next step.',
        ]),
      };
    case 'processing':
      return {
        subject: 'Your case is now being processed – FlightClaimly',
        innerHtml: wrapCopy('Your case is in progress', [
          'We are currently working on your case.',
          'This means we are reviewing all information, making sure the claim is complete and preparing the communication with the airline.',
          'If we need any additional details we will contact you via email.',
        ]),
      };
    case 'sent_to_airline':
      return {
        subject: 'Your case has been sent to the airline – FlightClaimly',
        innerHtml: wrapCopy('We have contacted the airline', [
          'We have now submitted your compensation claim to the airline.',
          'Response times vary, but most airlines reply within 2–8 weeks. Sometimes it may take longer depending on workload and case complexity.',
          'We will monitor your case and get back to you as soon as we receive a response or if the airline asks for more information.',
        ]),
      };
    case 'approved':
      return {
        subject: 'Your compensation is approved – add your bank details',
        innerHtml: wrapCopy('Your compensation is approved', [
          'Good news — your case has been approved.',
          'To pay out your compensation, we need your bank details (IBAN). It only takes a minute.',
          'Click the button below to add your bank details.',
        ]),
      };
    case 'paid_out':
      return {
        subject: 'Good news! Your compensation has been paid 🎉',
        innerHtml: wrapCopy('Your compensation has been paid', [
          'Your case is now closed and the compensation has been paid.',
          'Depending on your bank it may take 1–2 business days before the money appears in your account.',
          'If anything looks incorrect regarding the amount or payment, simply reply to this email and we will help you.',
        ]),
      };
    case 'rejected':
      return {
        subject: 'Information about your case – no compensation this time',
        innerHtml: wrapCopy('Unfortunately, no compensation this time', [
          'After reviewing your case and/or receiving a response from the airline, we unfortunately have to conclude that there are no grounds for compensation under EU Regulation 261/2004.',
          'Common reasons include the airline demonstrating extraordinary circumstances or that the claim falls outside the time or distance limits required for compensation.',
          'If you would like a brief explanation of why your specific case did not result in compensation, you can reply to this email and we will walk you through the decision.',
        ]),
      };
    default:
      return {
        subject: 'Update on your case – FlightClaimly',
        innerHtml: wrapCopy('Status update on your case', [
          'The status of your case has been updated.',
          'You can follow the progress via the link below and you are always welcome to reply if you have any questions.',
        ]),
      };
  }
}
