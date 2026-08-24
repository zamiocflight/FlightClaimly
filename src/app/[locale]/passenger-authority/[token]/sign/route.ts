export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { renderAuthorityHtmlToPdf } from "@/lib/authority/renderHtmlToPdf";

function dataUrlToUint8Array(dataUrl: string) {
  const base64 = dataUrl.split(",")[1] || "";
  return Uint8Array.from(Buffer.from(base64, "base64"));
}

export async function POST(
  req: Request,
  context: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await context.params;
    const body = await req.json().catch(() => ({}));

    const { signatureDataUrl } = body ?? {};

    if (!token || !signatureDataUrl) {
      return NextResponse.json(
        { error: "Missing required information." },
        { status: 400 }
      );
    }

    const sb = supabaseAdmin();

    // 1. Find passenger authorization from secure invite token
    const { data: passenger, error: passengerError } = await sb
      .from("passenger_authorizations")
      .select("*")
      .eq("invite_token", token)
      .maybeSingle();

    if (passengerError) {
      console.error(
        "Failed to load passenger authorization:",
        passengerError
      );

      return NextResponse.json(
        { error: "Could not load the authorisation." },
        { status: 500 }
      );
    }

    if (!passenger) {
      return NextResponse.json(
        { error: "This authorisation link is invalid." },
        { status: 404 }
      );
    }

    // Do not allow a second signature
    if (passenger.status === "signed") {
      return NextResponse.json(
        { error: "This authorisation has already been signed." },
        { status: 409 }
      );
    }

    if (passenger.under_18) {
      return NextResponse.json(
        {
          error:
            "This passenger requires guardian authorisation.",
        },
        { status: 400 }
      );
    }

    // 2. Get parent claim
    const { data: claim, error: claimError } = await sb
      .from("claims")
      .select("*")
      .eq("received_at", passenger.claim_id)
      .maybeSingle();

    if (claimError || !claim) {
      console.error("Failed to load claim:", claimError);

      return NextResponse.json(
        { error: "The related claim could not be found." },
        { status: 404 }
      );
    }

    const fullName = `${passenger.first_name} ${passenger.last_name}`.trim();
    const bookingReference = claim.booking_number || "";
    const claimId = passenger.claim_id;

    if (!fullName || !bookingReference) {
      return NextResponse.json(
        { error: "The claim is missing required authority information." },
        { status: 400 }
      );
    }

    // 3. Render the same FlightClaimly authority document
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const previewUrl =
  `${baseUrl.replace(/\/$/, "")}/en/power-of-attorney` +
  `?fullName=${encodeURIComponent(fullName)}` +
  `&bookingReference=${encodeURIComponent(bookingReference)}` +
  `&claimId=${encodeURIComponent(claimId)}` +
  `&final=true` +
  `&signature=${encodeURIComponent(signatureDataUrl)}`;

    const htmlPdfBuffer = await renderAuthorityHtmlToPdf(previewUrl);

    // 4. Add passenger signature to PDF
    const pdfDoc = await PDFDocument.load(htmlPdfBuffer);

    const pages = pdfDoc.getPages();
    const page = pages[pages.length - 1];

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // 5. Digital verification stamp
    const stampPayload =
      `${claimId}|${bookingReference}|${fullName}|${passenger.id}`;

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

    // 6. IMPORTANT:
    // unique path so we NEVER overwrite the claim owner's authority
    const filePath =
      `claims/${claimId}/passenger-authorities/${passenger.id}.pdf`;

    const { error: uploadError } = await sb.storage
      .from("attachments")
      .upload(filePath, pdfBytes, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      console.error(
        "Passenger authority upload failed:",
        uploadError
      );

      return NextResponse.json(
        { error: "Could not save the authority document." },
        { status: 500 }
      );
    }

    const now = new Date().toISOString();

    // 7. Mark passenger authorization as completed
    const { error: updateError } = await sb
      .from("passenger_authorizations")
      .update({
        status: "signed",
        signed_at: now,
        authority_path: filePath,
        updated_at: now,
      })
      .eq("id", passenger.id);

    if (updateError) {
      console.error(
        "Failed to update passenger authorization:",
        updateError
      );

      return NextResponse.json(
        { error: "The signature was saved but could not be finalized." },
        { status: 500 }
      );
    }

    // 8. Also make the PDF visible among claim attachments
    const attachments = Array.isArray(claim.attachments)
      ? [...claim.attachments]
      : [];

    attachments.push({
      type: "passenger_authority",
      passengerAuthorizationId: passenger.id,
      passengerName: fullName,
      path: filePath,
    });

    const { error: attachmentsError } = await sb
      .from("claims")
      .update({
        attachments,
        updated_at: now,
      })
      .eq("received_at", claimId);

    if (attachmentsError) {
      console.error(
        "Failed to attach passenger authority to claim:",
        attachmentsError
      );

      // Do NOT fail the signature:
      // passenger authority is already safely stored and marked signed.
    }

    return NextResponse.json({
      ok: true,
      signedAt: now,
    });
  } catch (error) {
    console.error("Passenger authority signing failed:", error);

    return NextResponse.json(
      { error: "Failed to save the authorisation." },
      { status: 500 }
    );
  }
}