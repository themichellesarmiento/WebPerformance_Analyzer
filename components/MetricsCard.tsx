import type { Metrics } from '@/types/report';
import MetricBar from '@/components/UI/MetricBar';

const metrics_config = [
  { key: 'lcp', label: 'Largest contentful paint', good: 2500, poor: 4000 },
  { key: 'fcp', label: 'First contentful paint', good: 1800, poor: 3000 },
  { key: 'tbt', label: 'Total blocking time', good: 200, poor: 600 },
  { key: 'cls', label: 'Cumulative layout shift', good: 0.1, poor: 0.25 },
  { key: 'speedIndex', label: 'Speed index', good: 3400, poor: 5800 },
] as const;

const ratingColor = {
  good: 'text-accent-three',
  'needs-improvement': 'text-accent-one',
  poor: 'text-accent-two',
};

const badgeColor = {
  good: 'bg-accent-three/40 text-accent-three',
  'needs-improvement': 'bg-accent-one/40 text-accent-one',
  poor: 'bg-accent-two/40 text-accent-two',
};

const badgeLabel = {
  good: 'Good',
  'needs-improvement': 'Fair',
  poor: 'Poor',
};

const MetricsCard = ({ metrics }: { metrics: Metrics }) => {
  return (
    <section aria-label='Core web vitals'>
      <h2 className='my-3 text-xs md:text-lg font-medium uppercase tracking-widest text-primary'>Core web vitals</h2>

      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
        {metrics_config.map(({ key, label, good, poor }) => {
          const metric = metrics[key];
          const rating = metric.rating;

          return (
            <div key={key} className='flex flex-col rounded-xl border border-primary bg-background p-4'>
              <div className='mb-3 flex items-center justify-between gap-2'>
                <span className='text-xs font-semibold uppercase tracking-wider text-primary'>{key}</span>
                {rating && (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${badgeColor[rating]}`}>
                    {badgeLabel[rating]}
                  </span>
                )}
              </div>
              <p className={`text-2xl font-medium leading-none ${rating ? ratingColor[rating] : 'text-primary'}`}>
                {metric.displayValue ?? '—'}
              </p>
              <p className='mt-1.5 text-xs leading-snug text-primary'>{label}</p>
              <div className='mt-auto'>
                <MetricBar rating={rating} numericValue={metric.numericValue} good={good} poor={poor} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MetricsCard;