/* Offline-only authority layout candidate. NOT wired to customer claims.
 * Geometry calibrated against Vanessa's two-page signed reference.
 * Must be tested with buildLoaDoc and real Chromium before integration.
 */
export const vanessaLayoutCandidateCss = `
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; color: #1e293b; font-size: 10.829px; line-height: 1.14; }
header { height: 78px; background: linear-gradient(90deg,#0f172a,#1e3a8a); color: white; padding: 23px 30px; font-size: 12px; font-weight: bold; }
main { padding: 30px; }
h1 { font-size: 18px; margin: 0 0 18px; }
.meta { font-size: 11px; line-height: 1.22; margin-bottom: 20px; }
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.cols p { margin: 2px 0; }
.cols p.clause-heading { margin-top: 8px; font-weight: bold; }
.cols h2 { font-size: 11px; margin: 0 0 8px; }
.space { height: 4px; }
.sign { margin-top: 32px; padding-top: 16px; border-top: 1px solid #cbd5e1; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; break-inside: avoid; page-break-inside: avoid; font-size: 11px; }
#authority-signature-box { height: 56px; border: 1px solid #cbd5e1; padding: 4px; background: #f8fafc; }
.date { height: 40px; border: 1px solid #cbd5e1; padding: 10px; background: #f8fafc; }
`;
