"use client";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [csvUrl, setCsvUrl] = useState<string | null>(null);

  const handleScrape = async () => {
    setLoading(true);
    setCsvUrl(null);

    try {
      const response = await fetch("/api/scrape");
      if (!response.ok) throw new Error("Failed to scrape data");

      const data = await response.json();
      setCsvUrl(data.filePath); // URL to the downloaded CSV
    } catch (error) {
      console.error("Error scraping data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleScrape}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Scraping..." : "Scrape Data"}
      </button>

      {csvUrl && (
        <p>
          Data scraped successfully! Download the file:{" "}
          <a href={csvUrl} className="text-blue-500 underline" download>
            Download Excel file
          </a>
        </p>
      )}
    </div>
  );
}
