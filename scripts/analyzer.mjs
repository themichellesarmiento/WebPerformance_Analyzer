import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const url = process.argv[2];

const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless"],
});

const result = await lighthouse(url, {
  logLevel: "silent",
  output: "json",
  onlyCategories: [
    "performance",
    "accessibility",
    "seo",
    "best-practices",
  ],
  port: chrome.port,
});

const categories = result.lhr.categories;

console.log(
  JSON.stringify({
    performance: Math.round(categories.performance.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    seo: Math.round(categories.seo.score * 100),
    bestPractices: Math.round(
      categories["best-practices"].score * 100
    ),
  })
);

chrome.kill();