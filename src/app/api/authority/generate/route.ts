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

    // Idempotent Continue/Back: a signed authority already attached to this
    // authenticated claim is the result, not an error. Never overwrite it.
    const authorityPath = `claims/${claimId}/authority.pdf`;
    const { data: existingClaim, error: existingClaimError } = await supabase
      .from("claims").select("attachments").eq("received_at", claimId).single();
    if (existingClaimError) return NextResponse.json({ error: "Authority lookup failed" }, { status: 500 });
    if (Array.isArray(existingClaim?.attachments) &&
        existingClaim.attachments.some((item: { path?: string; type?: string }) =>
          item?.path === authorityPath && item?.type === "authority")) {
      const { data: existingPdf, error: existingPdfError } = await supabase.storage
        .from("attachments").download(authorityPath);
      if (existingPdfError || !existingPdf) {
        return NextResponse.json({ error: "Existing authority could not be loaded" }, { status: 500 });
      }
      return new NextResponse(await existingPdf.arrayBuffer(), {
        status: 200,
        headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="authority-${claimId}.pdf"` },
      });
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
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      @page{size:A4;margin:9mm}*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#1e293b;margin:0;font-size:9.8px;line-height:1.14}
      header{background:linear-gradient(90deg,#0f172a,#1e3a8a);color:white;padding:10px;font-size:14px;font-weight:bold;letter-spacing:.4px}main{padding:9px}h1{font-size:14px;margin:0 0 7px}
      .meta{margin-bottom:8px}.cols{display:grid;grid-template-columns:1fr 1fr;gap:20px}.cols p{margin:2px 0} .cols .clause-heading{margin-top:8px;font-weight:700}.cols h2{font-size:11px}.space{height:4px}
      .sign{margin-top:9px;border-top:1px solid #cbd5e1;padding-top:7px;display:grid;grid-template-columns:1fr 1fr;gap:25px;break-inside:avoid;page-break-inside:avoid}
      #authority-signature-box{height:45px;border:1px solid #cbd5e1;padding:4px;background:#f8fafc}.date{border:1px solid #cbd5e1;padding:9px;background:#f8fafc}
      </style></head><body><header>FLIGHTCLAIMLY — Authority Document</header><main>
      <h1>${escapeHtml(doc.title)}</h1><div class="meta">${doc.metaLines.map(escapeHtml).join("<div></div>")}</div>
      <div class="cols"><section><h2>English</h2>${lines(doc.bodyLinesEN)}</section><section><h2>Español</h2>${lines(doc.bodyLinesES)}</section></div>
      <div class="sign"><section>Passenger Signature<div id="authority-signature-box"></div>${escapeHtml(fullName)}</section><section>Date<div class="date">${new Date().toISOString().slice(0,10)}</div></section></div>
      </main></body></html>`;
    const htmlPdfBuffer = await renderAuthorityHtmlToPdf(previewUrl, signatureDataUrl, html);

    // 2️⃣ Load PDF into pdf-lib
    const pdfDoc = await PDFDocument.load(htmlPdfBuffer);

    if (pdfDoc.getPageCount() !== 2) {\n      return NextResponse.json({ error: "Authority must render on exactly two pages" }, { status: 422 });\n    }\n\n    // Never discard a generated page: the signature block can flow onto page 3.
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