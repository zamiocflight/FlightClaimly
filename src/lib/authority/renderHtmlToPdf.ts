import puppeteer from "puppeteer";

export async function renderAuthorityHtmlToPdf(url: string) {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1200,
    height: 1600,
  });

  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  // 🔴 VIKTIG RAD
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

  await browser.close();

  return pdfBuffer;
}