/*public API (service layer) */

import { runLighthouse } from "./runLighthouse.js";
import extractScores from "./extractScores.js";
import extractMetrics from "./extractMetrics.js";
import extractCategoryRecommendations from "./extractRecommendations.js";
import filterBinaryFailures from './filterBinaryFailures.js'
import filterPerformance from './filterPerformance.js'

export async function analyzeUrl(url) {
  const result = await runLighthouse(url);

  const categories = result.lhr.categories;
  const audits = result.lhr.audits;

  const raw = {
    performance: extractCategoryRecommendations(
      categories.performance,
      audits
    ),
    accessibility: extractCategoryRecommendations(
      categories.accessibility,
      audits
    ),
    seo: extractCategoryRecommendations(
      categories.seo,
      audits
    ),
    bestPractices: extractCategoryRecommendations(
      categories["best-practices"],
      audits
    ),
  };

  return {
    url,
    generatedAt: new Date().toISOString(),

    scores: extractScores(categories),
    metrics: extractMetrics(audits),

    recommendations: {
      performance: filterPerformance(raw.performance),
      accessibility: filterBinaryFailures(raw.accessibility),
      seo: filterBinaryFailures(raw.seo),
      bestPractices: filterBinaryFailures(raw.bestPractices),
    },
  };
}