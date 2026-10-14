export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import crypto from "crypto";
import { renderAuthorityHtmlToPdf } from "@/lib/authority/renderHtmlToPdf";
import { buildLoaDoc } from "@/lib/authority/loa";
import { createClient } from "@supabase/supabase-js";



export async function POST(req: Request) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  try {
    const body = await req.json().catch(() => ({}));

    const { fullName, bookingReference, claimId, signatureDataUrl, viewerToken } = body || {};

    if (!fullName || !bookingReference || !claimId || !signatureDataUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: owner, error: ownerError } = await supabase.from("claims").select("name, booking_number, viewer_token").eq("received_at", claimId).maybeSingle();
    if (ownerError || !owner || owner.name !== fullName || owner.booking_number !== bookingReference || !owner.viewer_token || owner.viewer_token !== viewerToken) {
      return NextResponse.json({ error: "Authority identity mismatch" }, { status: 403 });
    }

    // Idempotent Continue/Back: check the actual stored file, not only its
    // metadata. A prior upload can succeed even if the DB update fails.
    // Never overwrite a customer's signed authority or regenerate its signature.
    const authorityPath = `claims/${claimId}/authority.pdf`;
    const { data: existingClaim, error: existingClaimError } = await supabase
      .from("claims").select("attachments").eq("received_at", claimId).single();
    if (existingClaimError) return NextResponse.json({ error: "Authority lookup failed" }, { status: 500 });
    const existingAttachments = Array.isArray(existingClaim?.attachments) ? existingClaim.attachments : [];
    const hasAuthorityReference = existingAttachments.some((item: { path?: string; type?: string }) =>
      item?.path === authorityPath && item?.type === "authority");

    const serveStoredAuthority = async (): Promise<NextResponse | null> => {
      const { data: storedPdf, error: storedError } = await supabase.storage
        .from("attachments").download(authorityPath);
      if (storedError || !storedPdf) return null;
      // Repair only a missing reference to a file that actually exists.
      if (!hasAuthorityReference) {
        const { data: latestClaim, error: latestError } = await supabase
          .from("claims").select("attachments").eq("received_at", claimId).single();
        if (latestError) return NextResponse.json({ error: "Authority metadata lookup failed" }, { status: 500 });
        const latest = Array.isArray(latestClaim?.attachments) ? latestClaim.attachments : [];
        if (!latest.some((item: { path?: string }) => item?.path === authorityPath)) {
          const { error: repairError } = await supabase.from("claims")
            .update({ attachments: [...latest, { type: "authority", path: authorityPath }] })
            .eq("received_at", claimId);
          if (repairError) return NextResponse.json({ error: "Authority metadata repair failed" }, { status: 500 });
        }
      }
      return new NextResponse(await storedPdf.arrayBuffer(), {
        status: 200,
        headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="authority-${claimId}.pdf"` },
      });
    };

    const storedAuthority = await serveStoredAuthority();
    if (storedAuthority) return storedAuthority;
    if (hasAuthorityReference) {
      // The record claims a signed file exists but the object is missing.
      // Do not silently replace signed evidence with a new document.
      return NextResponse.json({ error: "Existing signed authority is missing; manual review required" }, { status: 409 });
    }

    // 1️⃣ Render HTML preview page → PDF using Puppeteer
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : new URL(req.url).origin;

    const previewUrl =
      `${baseUrl}/sv/power-of-attorney` +
      `?fullName=${encodeURIComponent(fullName)}` +
      `&bookingReference=${encodeURIComponent(bookingReference)}` +
      `&claimId=${encodeURIComponent(claimId)}` +
      `&final=true`;

    // Render the same bilingual legal text locally. Preview deployments may
    // redirect browser requests to /login under Vercel Deployment Protection.
    const doc = buildLoaDoc({ fullName, bookingReference, claimId });
    const escapeHtml = (v: string) => String(v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] || c));
    const lines = (items: string[]) => items.map(v => { const t = v.trim(); if (!t) return "<div class='space'></div>"; const safe = escapeHtml(t); return /^\d{1,2}\.\s/.test(t) ? `<p class="clause-heading"><strong>${safe}</strong></p>` : `<p>${safe}</p>`; }).join("");
    const originalHtml = `<!doctype html><html><head><meta charset="utf-8"><style>
      @page{size:A4;margin:9mm}*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#1e293b;margin:0;font-size:8.5px;line-height:1.22}
      header{background:linear-gradient(90deg,#0f172a,#1e3a8a);color:white;padding:10px;font-size:14px;font-weight:bold;letter-spacing:.4px}main{padding:9px}h1{font-size:14px;margin:0 0 7px}
      .meta{margin-bottom:8px}.cols{display:grid;grid-template-columns:1fr 1fr;gap:15px}.cols p{margin:1.35px 0} .cols .clause-heading{margin-top:5.5px;font-weight:700}.cols h2{font-size:11px}.space{height:3px}
      .sign{margin-top:9px;border-top:1px solid #cbd5e1;padding-top:7px;display:grid;grid-template-columns:1fr 1fr;gap:25px;break-inside:avoid;page-break-inside:avoid}
      #authority-signature-box{height:45px;border:1px solid #cbd5e1;padding:4px;background:#f8fafc}.date{border:1px solid #cbd5e1;padding:9px;background:#f8fafc}
      </style></head><body><header>FLIGHTCLAIMLY — Authority Document</header><main>
      <h1>${escapeHtml(doc.title)}</h1><div class="meta">${doc.metaLines.map(escapeHtml).join("<div></div>")}</div>
      <div class="cols"><section><h2>English</h2>${lines(doc.bodyLinesEN)}</section><section><h2>Español</h2>${lines(doc.bodyLinesES)}</section></div>
      <div class="sign"><section>Passenger Signature<div id="authority-signature-box"></div>${escapeHtml(fullName)}</section><section>Date<div class="date">${new Date().toISOString().slice(0,10)}</div></section></div>
      </main></body></html>`;
    // Recreate the approved Vanessa typography and fixed signature layout.
    // If the bilingual text overflows, use the proven compact two-page
    // renderer instead of blocking a customer's claim.
    const vanessaCss = `
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
    const vanessaHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${vanessaCss}</style></head><body>
      <header>FLIGHTCLAIMLY <span style="float:right">AUTHORITY DOCUMENT</span></header><main>
      <h1>${escapeHtml(doc.title)}</h1><div class="meta">${doc.metaLines.map(escapeHtml).join("<div></div>")}</div>
      <div class="cols"><section><h2>English</h2>${lines(doc.bodyLinesEN)}</section><section><h2>Español</h2>${lines(doc.bodyLinesES)}</section></div>
      <div class="sign"><section>Passenger Signature<div id="authority-signature-box"></div>${escapeHtml(fullName)}</section><section>Date<div class="date">${new Date().toISOString().slice(0,10)}</div></section></div>
      </main></body></html>`;
    let htmlPdfBuffer = await renderAuthorityHtmlToPdf(previewUrl, signatureDataUrl, vanessaHtml);
    let layoutCheck = await PDFDocument.load(htmlPdfBuffer);
    if (layoutCheck.getPageCount() !== 2) {
      console.warn("Vanessa layout overflow; using proven compact two-page authority", { pages: layoutCheck.getPageCount() });
      htmlPdfBuffer = await renderAuthorityHtmlToPdf(previewUrl, signatureDataUrl, originalHtml);
      layoutCheck = await PDFDocument.load(htmlPdfBuffer);
    }
    if (layoutCheck.getPageCount() !== 2) {
      return NextResponse.json({ error: "Authority could not be rendered in two pages" }, { status: 500 });
    }

    // 2️⃣ Load PDF into pdf-lib
    const pdfDoc = await PDFDocument.load(htmlPdfBuffer);

    // Never discard a generated page: the signature block can flow onto page 3.
    const pages = pdfDoc.getPages();
    const page = pages[pages.length - 1];

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);


    // 4️⃣ Digital verification stamp
    const stampPayload = `${claimId}|${bookingReference}|${fullName}`;

    const stampHash = crypto
      .createHash("sha256")
      .update(stampPayload)
      .digest("hex")
      .slice(0, 16);

    page.drawText(`FC-${claimId} • ${stampHash}`, {
      x: 50,
      y: 40,
      size: 8,
      font,
      color: rgb(0.4, 0.4, 0.4),
    });

    const pdfBytes = await pdfDoc.save();

    // upload PDF to Supabase Storage
    const filePath = `claims/${claimId}/authority.pdf`;

    const { error: uploadError } = await supabase.storage.from("attachments").upload(filePath, pdfBytes, {
      contentType: "application/pdf",
      upsert: false,
    });

    if (uploadError) {
      // A concurrent signing request may have stored the same file first.
      // Serve that exact signed file rather than returning a false failure.
      if (uploadError.message?.toLowerCase().includes("already exists")) {
        const racedAuthority = await serveStoredAuthority();
        if (racedAuthority) return racedAuthority;
      }
      console.error("Authority storage failed", uploadError);
      return NextResponse.json({ error: "Authority already exists or storage failed" }, { status: 409 });
    }

    // save attachment reference in claims table
    const { data: claim } = await supabase
      .from("claims")
      .select("attachments")
      .filter("received_at", "eq", claimId)
      .single();

    const attachments = claim?.attachments || [];

    if (!attachments.some((item: { path?: string }) => item?.path === filePath)) {
      attachments.push({
        type: "authority",
        path: filePath,
      });
    }

    const { error: metadataError } = await supabase
      .from("claims")
      .update({ attachments })
      .eq("received_at", claimId);
    if (metadataError) {
      console.error("Authority metadata save failed", metadataError);
      return NextResponse.json({ error: "Authority metadata save failed" }, { status: 500 });
    }

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="authority-${claimId}.pdf"`,
      },
    });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}