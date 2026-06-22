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
        scoreDisplayMode: audit.scoreDisplayMode,
      };
    })
    .filter(Boolean);
}

export default extractCategoryRecommendations
