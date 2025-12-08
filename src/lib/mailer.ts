// src/lib/mailer.ts
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

type MailOpts = { to: string; subject: string; text: string };

const FROM = process.env.MAIL_FROM || process.env.FROM_EMAIL || 'FlightClaimly <no-reply@example.com>';

// ---- Provider 1: Resend ----
const RESEND_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_KEY ? new Resend(RESEND_KEY) : null;

// ---- Provider 2: SMTP (Nodemailer) ----
let _smtp: nodemailer.Transporter | null = null;
function getSmtp() {
  if (_smtp) return _smtp;
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) return null;
  _smtp = nodemailer.createTransport({ host, port, auth: { user, pass } });
  return _smtp;
}

// ---- Unified API ----
export async function sendMail(opts: MailOpts) {
  // Prefer Resend if key exists
  if (resend) {
    try {
      const r = await resend.emails.send({
        from: FROM,
        to: opts.to,
        subject: opts.subject,
        text: opts.text,
      });
      return { provider: 'resend', ...r };
    } catch (e) {
      console.warn('[mail][resend] error -> falling back to SMTP if available:', e);
    }
  }

  // Fallback to SMTP
  const smtp = getSmtp();
  if (smtp) {
    const r = await smtp.sendMail({ from: FROM, ...opts });
    return { provider: 'smtp', ...r };
  }

  console.log('[mail] SKIPPED (no provider configured):', opts.subject);
  return { skipped: true };
}
