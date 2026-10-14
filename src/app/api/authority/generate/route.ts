export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import crypto from "crypto";
import { renderAuthorityHtmlToPdf } from "@/lib/authority/renderHtmlToPdf";
import { createClient } from "@supabase/supabase-js";



export async function POST(req: Request) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  try {
    const body = await req.json().catch(() => ({}));

    const { fullName, bookingReference, claimId, signatureDataUrl } = body || {};

    if (!fullName || !bookingReference || !claimId || !signatureDataUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1️⃣ Render HTML preview page → PDF using Puppeteer
    const baseUrl =
      new URL(req.url).origin;

    const previewUrl =
      `${baseUrl}/sv/power-of-attorney` +
      `?fullName=${encodeURIComponent(fullName)}` +
      `&bookingReference=${encodeURIComponent(bookingReference)}` +
      `&claimId=${encodeURIComponent(claimId)}` +
      `&final=true`;

    const htmlPdfBuffer = await renderAuthorityHtmlToPdf(
   previewUrl,
   signatureDataUrl
   );

    // 2️⃣ Load PDF into pdf-lib
    const pdfDoc = await PDFDocument.load(htmlPdfBuffer);

    let pages = pdfDoc.getPages();

if (pages.length === 3) {
  pdfDoc.removePage(2);
  pages = pdfDoc.getPages();
}

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
      // Concurrent/repeated requests must not overwrite a signed authority.
      const { data: existing, error: downloadError } = await supabase.storage
        .from("attachments").download(filePath);
      if (downloadError || !existing) {
        console.error("Authority storage failed", uploadError);
        return NextResponse.json({ error: "Authority storage failed" }, { status: 500 });
      }
      return new NextResponse(await existing.arrayBuffer(), {
        status: 200,
        headers: { "Content-Type": "application/pdf" },
      });
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