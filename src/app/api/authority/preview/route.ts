import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const { fullName, bookingReference, claimId } = await req.json();

    if (!fullName || !bookingReference) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1️⃣ Load same template as final PDF
    const templatePath = path.join(
      process.cwd(),
      "public",
      "docs",
      "authority-template.pdf"
    );

    const templateBytes = await fs.readFile(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);
    const page = pdfDoc.getPages()[0];

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // 2️⃣ Add small preview mark (bottom)
    page.drawText("UNSIGNED PREVIEW – NOT VALID UNTIL SIGNED", {
      x: 50,
      y: 30,
      size: 8,
      font,
      color: rgb(0.6, 0.6, 0.6),
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=authority-preview.pdf",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Preview generation failed" },
      { status: 500 }
    );
  }
}