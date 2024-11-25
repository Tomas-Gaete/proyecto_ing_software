"use server";
const playwright = require("playwright");
import { chromium } from "playwright";
import * as XLSX from "xlsx";

export const authenticateWithIntranet = async (credentials: any) => {
	for (const browserType of ["chromium"]) {
		const browser = await playwright[browserType].launch();
		const context = await browser.newContext();
		const page = await context.newPage();

		await page.goto("https://intranet.uai.cl/");
		await page.locator('input[name="wucLogin1\\$tUsnNm"]').click();
		await page
			.locator('input[name="wucLogin1\\$tUsnNm"]')
			.fill(credentials.email);
		await page.locator("#tUsrPaswd").fill(credentials.password);
		await page.getByRole("button", { name: "Log In" }).click();
		await page.goto("https://intranet.uai.cl/WebPages/MisRamos/MisRamos.aspx");

		// Define the locator for the specific element
		const locator = page
			.locator("#contenido div")
			.filter({ hasText: "_tieneSylabousSiglaSecció" })
			.nth(2);

		// Wait for the locator to be visible or present
		await locator.waitFor();

		// Extract table data within the located element
		const tableData = await locator.evaluate((element: any) => {
			const table = element.querySelector("table.rgMasterTable"); // Adjust the selector if the table is not directly within this element
			if (!table) {
				return []; // Return an empty array if the table is not found
			}

			const rows = Array.from(
				table.querySelectorAll("tr")
			) as HTMLTableRowElement[];
			return rows.map((row) => {
				const cells = Array.from(row.querySelectorAll("th, td"));
				return cells.map((cell) => cell.textContent?.trim() || "");
			});
		});
		browser.close();

		// Check if tableData is empty
		if (tableData.length === 0) {
			console.error("Table not found or no data extracted!");
			return false;
		} else {
			// Convert table data to CSV format
			const csvContent = tableData.map((row: any) => row.join(",")).join("\n");

			return csvContent;
		}
	}
};

export async function getDayScheduleRaw() {
	try {
		const browser = await chromium.launch({ headless: true });
		const context = await browser.newContext();
		const page = await context.newPage();

		// Navigate to the website
		await page.goto("https://hoy.uai.cl/");

		// Wait for the download event when the button is clicked
		const downloadPromise = page.waitForEvent("download");
		await page.getByRole("button", { name: " Descargar Excel" }).click();
		const download = await downloadPromise;

		// Get the file stream and load it into a buffer
		const buffer = await download.createReadStream().then((stream) => {
			return new Promise((resolve, reject) => {
				const chunks: any[] = [];
				stream.on("data", (chunk) => chunks.push(chunk));
				stream.on("end", () => resolve(Buffer.concat(chunks)));
				stream.on("error", reject);
			});
		});

		// Process the buffer using XLSX
		const workbook = XLSX.read(buffer, { type: "buffer" });
		const sheet = workbook.Sheets[workbook.SheetNames[0]];
		const data = XLSX.utils.sheet_to_csv(sheet);
		// Cleanup
		await browser.close();
		return data;
	} catch (error) {
		console.error("Scraping failed:", error);
		return false;
	}
}
