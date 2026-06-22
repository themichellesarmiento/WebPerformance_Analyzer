/*RUNS chrome and lighthouse  (execution layer)*/

import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

export async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless"],
  });

  try {
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

    return result;
  } finally {
    chrome.kill();
  }
}