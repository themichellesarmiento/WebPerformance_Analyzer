const extractMetrics = (audits) => {
  return {
    lcp: audits["largest-contentful-paint"]?.displayValue ?? null,
    cls: audits["cumulative-layout-shift"]?.displayValue ?? null,
    fcp: audits["first-contentful-paint"]?.displayValue ?? null,
    tbt: audits["total-blocking-time"]?.displayValue ?? null,
    speedIndex: audits["speed-index"]?.displayValue ?? null,
  };
}

export default extractMetrics;