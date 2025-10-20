// src/lib/mailer.ts
import nodemailer from 'nodemailer';

let _transporter: nodemailer.Transporter | null = null;

export function getTransporter() {
  if (_transporter) return _transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT) {
    console.warn('[mail] SMTP not configured; skipping emails');
    return null;
  }

  _transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    pool: true,
    rateDelta: 1000,
    rateLimit: 1,
  });

  return _transporter;
}

export async function sendMail(opts: {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
}) {
  const tx = getTransporter();
  if (!tx) return { skipped: true };

  const from = opts.from || process.env.FROM_EMAIL || 'FlightClaimly <no-reply@localhost>';

  const info = await tx.sendMail({
    from,
    to: opts.to,
    cc: opts.cc,
    bcc: opts.bcc,
    subject: opts.subject,
    text: opts.text,
    html: opts.html ?? opts.text,
  });

  return { messageId: info.messageId };
}
