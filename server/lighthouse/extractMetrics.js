const METRIC_THRESHOLDS = {
  "largest-contentful-paint": { good: 2500, poor: 4000 },   // MS
  "cumulative-layout-shift": { good: 0.1, poor: 0.25 },   //UNITLESS
  "first-contentful-paint": { good: 1800, poor: 3000 },   // MS
  "total-blocking-time": { good: 200, poor: 600 },    // MS
  "speed-index": { good: 3400, poor: 5800 },   // MS
};

const getRating = (id, numericValue) => {
  const t = METRIC_THRESHOLDS[id];
  if (!t || numericValue == null) return null;
  if (numericValue <= t.good) return "good";
  if (numericValue <= t.poor) return "needs-improvement";
  return "poor";
};

const METRIC_LABELS = {
  lcp: { key: "largest-contentful-paint", label: "Largest Contentful Paint", description: "How long until the main content is visible" },
  cls: { key: "cumulative-layout-shift", label: "Cumulative Layout Shift", description: "How much the page layout shifts unexpectedly" },
  fcp: { key: "first-contentful-paint", label: "First Contentful Paint", description: "How long until the first content appears" },
  tbt: { key: "total-blocking-time", label: "Total Blocking Time", description: "How long the main thread was blocked during load" },
  speedIndex: { key: "speed-index", label: "Speed Index", description: "How quickly content is visually populated" },
};

const extractMetrics = (audits) => {
  return Object.fromEntries(
    Object.entries(METRIC_LABELS).map(([shortKey, { key, label, description }]) => {
      const audit = audits[key];
      const numericValue = audit?.numericValue ?? null;
      return [
        shortKey,
        {
          label,
          description,
          displayValue: audit?.displayValue ?? null,
          numericValue,
          unit: audit?.numericUnit ?? null,
          rating: getRating(key, numericValue),
        },
      ];
    })
  );
};

export default extractMetrics;