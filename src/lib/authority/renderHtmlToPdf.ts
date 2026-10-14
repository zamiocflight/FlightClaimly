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

export async function renderAuthorityHtmlToPdf(
  url: string,
  signatureDataUrl?: string
) {
  const isProduction = process.env.NODE_ENV === "production";

  const executablePath = isProduction
    ? await chromium.executablePath()
    : findLocalChromeExecutable();

  if (!executablePath) {
    throw new Error(
      "No Chrome executable found locally. Install Google Chrome or set PUPPETEER_EXECUTABLE_PATH."
    );
  }

  // Chromium extraction on serverless can briefly race with another invocation.
  // Retry only transient executable-busy failures; do not mask other launch errors.
  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | undefined;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      browser = await puppeteer.launch({
        args: isProduction ? chromium.args : ["--no-sandbox", "--disable-setuid-sandbox"],
        executablePath,
        headless: true,
      });
      break;
    } catch (error) {
      if (!String(error).includes("ETXTBSY") || attempt === 2) throw error;
      await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
    }
  }
  if (!browser) throw new Error("Chromium launch failed");

  try {
    const page = await browser.newPage();

    await page.setViewport({
      width: 1200,
      height: 1600,
    });

    const response = await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });
    const status = response?.status() ?? 0;
    const finalUrl = page.url();
    const requested = new URL(url);
    const landed = new URL(finalUrl);
    if (landed.origin !== requested.origin || landed.pathname !== requested.pathname) {
      console.error("Authority template redirected unexpectedly", { requestedPath: requested.pathname, finalPath: landed.pathname });
      throw new Error("Authority template redirected unexpectedly");
    }
    if (status !== 200) {
      console.error("Authority template request failed", { status, host: new URL(finalUrl).host, pathname: new URL(finalUrl).pathname });
      throw new Error(`Authority template HTTP ${status}`);
    }
    const hasSignatureBox = await page.$("#authority-signature-box");
    if (!hasSignatureBox) {
      console.error("Authority template missing signature box", { host: new URL(finalUrl).host, pathname: new URL(finalUrl).pathname });
      throw new Error("Authority template did not render");
    }

   if (signatureDataUrl) {
  await page.evaluate(async (signature) => {
    const box = document.getElementById("authority-signature-box");

    if (!box) {
      throw new Error("Authority signature box not found");
    }

    box.innerHTML = "";

    const img = document.createElement("img");
    img.src = signature;
    img.alt = "Passenger signature";

    img.style.display = "block";
    img.style.maxWidth = "100%";
    img.style.maxHeight = "48px";
    img.style.width = "auto";
    img.style.height = "auto";
    img.style.objectFit = "contain";
    img.style.margin = "0 auto";

    box.appendChild(img);

    if (typeof img.decode === "function") {
      await img.decode();
    }
  }, signatureDataUrl);
}

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