import { AnalysisReport } from '@/types/report';
import ScoreCard from './ScoreCard';

const ScoreCardSection = ({ report }: { report: AnalysisReport }) => {
  return (
    <section aria-label='Scores'>
      <h2 className='my-3 text-xs md:text-lg font-medium uppercase tracking-widest text-text-primary'>Scores</h2>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <ScoreCard title='Performance' score={report.scores.performance.score} rating={report.scores.performance.rating} />
        <ScoreCard title='Accesibility' score={report.scores.accessibility.score} rating={report.scores.accessibility.rating} />
        <ScoreCard title='SEO' score={report.scores.seo.score} rating={report.scores.seo.rating} />
        <ScoreCard title='Best Practices' score={report.scores.bestPractices.score} rating={report.scores.bestPractices.rating} />
      </div>
    </section>
  )
}
export default ScoreCardSection;