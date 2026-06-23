const scoreRating = (score) => {
  if (score >= 90) return "good";
  if (score >= 50) return "needs-improvement";
  return "poor";
};

const extractScores = (categories) => {
  return Object.fromEntries(
    ["performance", "accessibility", "seo", "best-practices"].map((key) => {
      const score = Math.round(categories[key].score * 100);
      const shortKey = key === "best-practices" ? "bestPractices" : key;
      return [shortKey, { score, rating: scoreRating(score) }];
    })
  );
};

export default extractScores;
