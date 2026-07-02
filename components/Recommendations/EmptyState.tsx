const EmptyState = () => {
  return (
    <div className="flex flex-col items-center gap-1 py-10 text-center">
      <span className="text-2xl">✓</span>
      <p className="text-xl font-medium text-text-primary">All good here</p>
      <p className="text-lg text-text-primary">No issues found in this category</p>
    </div>
  );
}

export default EmptyState;