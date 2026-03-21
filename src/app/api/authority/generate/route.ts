import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import crypto from "crypto";
import { renderAuthorityHtmlToPdf } from "@/lib/authority/renderHtmlToPdf";
import { createClient } from "@supabase/supabase-js";

function dataUrlToUint8Array(dataUrl: string) {
  const base64 = dataUrl.split(",")[1] || "";
  return Uint8Array.from(Buffer.from(base64, "base64"));
}

export async function POST(req: Request) {
  console.log("ENV CHECK");
  console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
  console.log(
    "SUPABASE_SERVICE_ROLE:",
    process.env.SUPABASE_SERVICE_ROLE?.slice(0, 10)
  );

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
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const previewUrl =
      `${baseUrl}/sv/power-of-attorney` +
      `?fullName=${encodeURIComponent(fullName)}` +
      `&bookingReference=${encodeURIComponent(bookingReference)}` +
      `&claimId=${encodeURIComponent(claimId)}` +
      `&final=true`;

    const htmlPdfBuffer = await renderAuthorityHtmlToPdf(previewUrl);

    // 2️⃣ Load PDF into pdf-lib
    const pdfDoc = await PDFDocument.load(htmlPdfBuffer);

    const pages = pdfDoc.getPages();
    const page = pages[pages.length - 1]; // always last page

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // 3️⃣ Embed signature
    const sigBytes = dataUrlToUint8Array(signatureDataUrl);
    const sigPng = await pdfDoc.embedPng(sigBytes);

    const sigWidth = 220;
    const sigHeight = 80;
    const sigX = 50;
    const sigY = 110;

    page.drawImage(sigPng, {
      x: sigX,
      y: sigY,
      width: sigWidth,
      height: sigHeight,
    });

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

    await supabase.storage.from("attachments").upload(filePath, pdfBytes, {
      contentType: "application/pdf",
      upsert: true,
    });

    // save attachment reference in claims table
    const { data: claim } = await supabase
      .from("claims")
      .select("attachments")
      .filter("received_at", "eq", claimId)
      .single();

    const attachments = claim?.attachments || [];

    attachments.push({
      type: "authority",
      path: filePath,
    });

    await supabase
      .from("claims")
      .update({ attachments })
      .eq("received_at", claimId);

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