import { execSync } from "child_process";
import fs from "fs";

const pages = [
  { name: "rundown", url: "http://localhost:3005/rundown" },
  { name: "database-kampus", url: "http://localhost:3005/direktori-stan" },
  { name: "denah-acara", url: "http://localhost:3005/peta-kampus" },
  { name: "alumni", url: "http://localhost:3005/alumni" },
  { name: "tanya-jawab", url: "http://localhost:3005/tanya-jawab" },
];

const results = {};

for (const p of pages) {
  console.log(`Starting audit for ${p.name} (${p.url})...`);
  const outPath = `./lh-${p.name}.json`;
  try {
    execSync(
      `npx lighthouse ${p.url} --chrome-flags="--headless" --output=json --output-path=${outPath} --only-categories=performance,accessibility,best-practices,seo`,
      { stdio: "inherit" }
    );
    const data = JSON.parse(fs.readFileSync(outPath, "utf8"));
    results[p.name] = {
      categories: Object.fromEntries(
        Object.entries(data.categories).map(([k, v]) => [k, Math.round(v.score * 100)])
      ),
      metrics: {
        fcp: data.audits["first-contentful-paint"]?.displayValue,
        lcp: data.audits["largest-contentful-paint"]?.displayValue,
        tbt: data.audits["total-blocking-time"]?.displayValue,
        cls: data.audits["cumulative-layout-shift"]?.displayValue,
        speedIndex: data.audits["speed-index"]?.displayValue,
      },
    };
  } catch (err) {
    console.error(`Error auditing ${p.name}:`, err.message);
  }
}

fs.writeFileSync("./lighthouse-summary.json", JSON.stringify(results, null, 2));
console.log("ALL AUDITS COMPLETED SUCCESSFULLY!");
console.log(JSON.stringify(results, null, 2));
