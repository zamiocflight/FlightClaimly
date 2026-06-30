import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import fs from "node:fs";

function findLocalChromeExecutable() {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean) as string[];

  return candidates.find((path) => fs.existsSync(path));
}

export async function renderAuthorityHtmlToPdf(url: string) {
  const isProduction = process.env.NODE_ENV === "production";

  const executablePath = isProduction
    ? await chromium.executablePath()
    : findLocalChromeExecutable();

  if (!executablePath) {
    throw new Error(
      "No Chrome executable found locally. Install Google Chrome or set PUPPETEER_EXECUTABLE_PATH."
    );
  }

  const browser = await puppeteer.launch({
    args: isProduction
      ? chromium.args
      : ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath,
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

    return await page.pdf({
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
  } finally {
    await browser.close();
  }
}