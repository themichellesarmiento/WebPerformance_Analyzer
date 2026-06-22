/* filter helpers */

export const filterBinaryFailures =(items) => {
  return items.filter(
    (a) =>
      a.scoreDisplayMode === "binary" &&
      a.score === 0
  );
}

export const filterPerformance=(items)=> {
  return items.filter(
    (a) =>
      a.scoreDisplayMode !== "notApplicable" &&
      a.score !== 1
  );
}