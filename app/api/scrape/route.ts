import { NextResponse } from "next/server";
import { chromium, BrowserType } from "playwright";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    console.log("Starting scraping tasks with chromium...");

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://hoy.uai.cl/");

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: " Descargar Excel" }).click();
    const download = await downloadPromise;

    const downloadDir = path.resolve("./public/files");
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    const filePath = path.join(downloadDir, download.suggestedFilename() || "downloaded_file.csv");
    await download.saveAs(filePath);

    await browser.close();

    return NextResponse.json({
      message: "Scraping completed successfully!",
      filePath: `/files/${path.basename(filePath)}`,
    });
  } catch (error) {
    console.error("Scraping failed:", error);
    return NextResponse.json({ error: "Failed to scrape data" }, { status: 500 });
  }
}
const downloadCSVFromPage = async (browserType: BrowserType) => {
  const browser = await browserType.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the first URL
  await page.goto("https://hoy.uai.cl/");

  // Wait for the CSV download button and click
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: " Descargar Excel" }).click();
  const download = await downloadPromise;

  // Save the downloaded file
  const downloadDir = path.resolve(__dirname, "../files");
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }
  await download.saveAs(path.join(downloadDir, download.suggestedFilename() || "downloaded_file.csv"));

  console.log("CSV downloaded successfully!");
  await browser.close();
};

const scrapeTableData = async (browserType: BrowserType) => {
  const browser = await browserType.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the intranet login page
  await page.goto("https://intranet.uai.cl/");
  await page.locator('input[name="wucLogin1\\$tUsnNm"]').fill("matolea@alumnos.uai.cl");
  await page.locator("#tUsrPaswd").fill("AQUI VA LA CONTRASEÑA");
  await page.getByRole("button", { name: "Log In" }).click();

  // Navigate to the target page after login
  await page.goto("https://intranet.uai.cl/WebPages/MisRamos/MisRamos.aspx");

  // Define the locator for the specific element
  const locator = page
    .locator("#contenido div")
    .filter({ hasText: "_tieneSylabousSiglaSecció" })
    .nth(2);

  // Wait for the locator to be visible or present
  await locator.waitFor();

  // Extract table data within the located element
  const tableData = await locator.evaluate((element) => {
    const table = element.querySelector("table.rgMasterTable");
    if (!table) {
      return [];
    }
    const rows = Array.from(table.querySelectorAll("tr"));
    return rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("th, td"));
      return cells.map((cell) => cell.textContent?.trim() || "");
    });
  });

  // Check if tableData is empty
  if (tableData.length === 0) {
    console.error("Table not found or no data extracted!");
  } else {
    // Convert table data to CSV format
    const csvContent = tableData.map((row) => row.join(",")).join("\n");

    // Save the CSV file
    const filePath = path.resolve(__dirname, "../files/horario.csv");
    fs.writeFileSync(filePath, csvContent);
    console.log("Table data saved to horario.csv");
  }

  await browser.close();
};

const runScrapingTasks = async () => {
  try {
    for (const browserTypeName of ["chromium"]) {
      const browserType = chromium;

      console.log(`Starting scraping tasks with ${browserTypeName}...`);

      // Task 1: Download CSV from the first page
      await downloadCSVFromPage(browserType);

      // Task 2: Scrape table data from the second page
      await scrapeTableData(browserType);

      console.log(`Scraping tasks with ${browserTypeName} completed.`);
    }
  } catch (error) {
    console.error("Error during scraping tasks:", error);
  }
};

runScrapingTasks();
