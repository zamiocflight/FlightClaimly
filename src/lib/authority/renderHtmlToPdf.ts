import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export async function renderAuthorityHtmlToPdf(url: string) {
  const isProduction = process.env.NODE_ENV === "production";

  const browser = await puppeteer.launch({
    args: isProduction ? chromium.args : [],
    executablePath: isProduction
      ? await chromium.executablePath()
      : process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.setViewport({
      width: 1200,
      height: 1600,
    });

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    await page.emulateMediaType("screen");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "0mm",
        bottom: "0mm",
        left: "0mm",
        right: "0mm",
      },
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
}