const INFORMATIONAL_IDS = new Set([
  "screenshot-thumbnails",
  "final-screenshot",
  "full-page-screenshot",
  "resource-summary",
  "network-requests",
  "main-thread-tasks",
  "diagnostics",
]);

const filterPerformance = (items) => {
  return items
    .filter((a) =>
      a.scoreDisplayMode !== "notApplicable" &&
      a.scoreDisplayMode !== "informative" &&
      !INFORMATIONAL_IDS.has(a.id) &&
      a.score !== null &&
      a.score < 1
    )
    .sort((a, b) => a.score - b.score);
};

export default filterPerformance;