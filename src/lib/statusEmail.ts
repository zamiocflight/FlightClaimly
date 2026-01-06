// src/lib/statusEmail.ts
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FLIGHTCLAIMLY_FROM_EMAIL || 'support@flightclaimly.com';

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
  | 'paid_out'
  | 'rejected';

type Lang = 'sv' | 'en';

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
  // valfritt – default = 'sv'
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

  const lang: Lang = args.lang || 'sv';

const trackingUrl = args.id
  ? buildTrackUrl(args.id, args.publicToken, lang)
  : undefined;
console.log("DEBUG sendStatusEmail", {
  id: args.id,
  publicToken: args.publicToken,
  trackingUrl
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

  const html = wrapEmailLayout({
    lang,
    subject,
    innerHtml,
    trackingUrl,
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

function buildTrackUrl(id: string, publicToken?: string, lang: Lang = 'sv') {
  const base = appUrl.replace(/\/$/, '');
  const tokenPart = publicToken ? `?t=${encodeURIComponent(publicToken)}` : '';

  // om env råkar vara satt till "/track" vill vi ändå ha /{lang}/track
  const cleanTrackingPath = (trackingPath || '/track').replace(/^\/+/, ''); // "track"
  return `${base}/${lang}/${cleanTrackingPath}/${encodeURIComponent(id)}${tokenPart}`;
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

  if (flightNumber) {
    const label =
      lang === 'sv' ? 'Ärende' : 'Case';
    const arrow = '→';

    return `${label}: ${escapeHtml(flightNumber)} • ${
      from ? escapeHtml(from) : ''
    } ${arrow} ${to ? escapeHtml(to) : ''}${
      flightDate ? ` • ${escapeHtml(flightDate)}` : ''
    }`;
  }

  return (lang === 'sv' ? 'Ärende-ID' : 'Case ID') + `: ${escapeHtml(claimId)}`;
}

function wrapEmailLayout(opts: {
  lang: Lang;
  subject: string;
  innerHtml: string;
  trackingUrl?: string;
  flightLine: string;
}) {
  const { lang, innerHtml, trackingUrl, flightLine } = opts;

  const ctaLabel = lang === 'sv' ? 'Följ ditt ärende' : 'View your case';

  const autoText =
    lang === 'sv'
      ? 'Detta är ett automatiskt statusmeddelande. Svara gärna om du har frågor.'
      : 'This is an automatic status update. Feel free to reply if you have any questions.';

  const tagline =
    lang === 'sv'
      ? 'Vi driver in din ersättning – du slipper bråka med flygbolaget.'
      : 'We collect your compensation – you avoid the fight with the airline.';

  const trackingBlock = trackingUrl
    ? `
      <tr>
        <td align="left" style="padding: 10px 0 20px 0;">
          <a href="${trackingUrl}"
             style="display:inline-block;padding:12px 24px;border-radius:9999px;
                    background-color:#0f172a;color:#f9fafb;font-size:14px;
                    font-weight:600;text-decoration:none;">
            ${ctaLabel}
          </a>
        </td>
      </tr>
      <tr>
        <td align="left" style="padding: 0 0 8px 0;color:#64748b;font-size:13px;">
          <a href="${trackingUrl}"
             style="color:#64748b;text-decoration:underline;word-break:break-all;">
            ${trackingUrl}
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
                      ${
                        lang === 'sv'
                          ? 'Uppdatering om ditt ersättningsärende'
                          : 'Update on your compensation claim'
                      }
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
                  ${trackingBlock}
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

// ---------- status-copy (SV + EN) ----------

function buildStatusContent(
  lang: Lang,
  status: StatusCode,
  opts: { name?: string }
): { subject: string; innerHtml: string } {
  const safeName = (opts.name || '').trim() || (lang === 'sv' ? 'resenär' : 'traveller');
  const hi =
    lang === 'sv' ? `Hej ${safeName},` : `Hi ${safeName},`;

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

    const bodyHtml =
      `<tr>
         <td align="left" style="padding:0 0 12px 0;color:#0f172a;font-size:14px;line-height:1.6;">
           <p style="margin:0 0 12px 0;">${escapeHtml(hi)}</p>
           ${paragraphs
             .map(
               (p) =>
                 `<p style="margin:0 0 12px 0;">${p}</p>`
             )
             .join('')}
         </td>
       </tr>`;

    return headingHtml + bodyHtml;
  };

  // --- SVENSKA texter ---
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
          subject: 'Information om ditt ärende – tyvärr ingen ersättning denna gång',
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

  // --- ENGLISH texts ---
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
