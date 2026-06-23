const extractCategoryRecommendations = (category, audits) => {
  return category.auditRefs
    .map((ref) => {
      const audit = audits[ref.id];
      if (!audit) return null;
      return {
        id: ref.id,
        title: audit.title,
        description: audit.description,
        score: audit.score,
        displayValue: audit.displayValue ?? null,
        numericValue: audit.numericValue ?? null,      // e.g. 1240 (ms saved)
        numericUnit: audit.numericUnit ?? null,
        scoreDisplayMode: audit.scoreDisplayMode,      // still needed by filters
        weight: ref.weight ?? 0
      };
    })
    .filter(Boolean);
};

export default extractCategoryRecommendations;