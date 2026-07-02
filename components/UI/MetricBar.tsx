type MetricBarProps = {
  rating: 'good' | 'needs-improvement' | 'poor' | null;
  numericValue: number | null;
  good: number;
  poor: number;
};

const MetricBar = ({ rating, numericValue, poor }: MetricBarProps) => {
  if (!rating || numericValue === null) {
    return <div className='mt-3 h-1 w-full rounded-full bg-accent-three' />;
  }

  const ceiling = poor * 1.2;
  const width = Math.round(Math.min(numericValue / ceiling, 1) * 100);

  const color =
    rating === 'good' ? 'bg-accent-three' : rating === 'poor' ? 'bg-accent-two' : 'bg-accent-one';

  return (
    <div className='mt-3 h-1 w-full rounded-full bg-zinc-300'>
      <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${width}%` }} />
    </div>
  );
}

export default MetricBar;