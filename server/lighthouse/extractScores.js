const extractScores = (categories) => {
  return {
    performance: Math.round(categories.performance.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    seo: Math.round(categories.seo.score * 100),
    bestPractices: Math.round(
      categories["best-practices"].score * 100
    ),
  };
}

export default extractScores;
