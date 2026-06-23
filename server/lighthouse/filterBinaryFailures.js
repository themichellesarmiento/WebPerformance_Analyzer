const filterBinaryFailures = (items) => {
  return items
    .filter((a) => a.scoreDisplayMode === "binary" && a.score === 0)
    .sort((a, b) => b.weight - a.weight); // HIGHEST impact first
};

export default filterBinaryFailures;

