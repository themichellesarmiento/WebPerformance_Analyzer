'use client'

import ScoreCard from '@/components/ScoreCard';
import { AnalysisReport } from '@/types/report';
import { useState } from 'react';

const Home = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AnalysisReport | null>(null);

  async function handleAnalysis() {
    if (!url) return;

    try {
      setLoading(true);

      const res = await fetch('/api/analyzer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      setReport(data);

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='w-full mx-auto p-8'>
      <h1 className='mb-6 text-center font-semibold text-lg md:text-3xl'>Performance Web Analyzer</h1>
      <div className='flex gap-3'>
        <input className='border rounded px-4 py-3 flex-1'
          type='text' placeholder='https://example.com' value={url} onChange={(e) => setUrl(e.target.value)} />
        <button className='px-6 py-3 rounded bg-text-primary text-background'
          disabled={loading} onClick={handleAnalysis}>
          {loading ? 'Analyzing' : 'Analyze'}
        </button>
      </div>
      {report && (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-10'>
          <ScoreCard title='Performance' score={report.scores.performance.score} rating={report.scores.performance.rating} />
          <ScoreCard title='Accesibility' score={report.scores.accessibility.score} rating={report.scores.accessibility.rating} />
          <ScoreCard title='SEO' score={report.scores.seo.score} rating={report.scores.seo.rating} />
          <ScoreCard title='Best Practices' score={report.scores.bestPractices.score} rating={report.scores.bestPractices.rating} />
        </div>
      )
      }
    </main>
  )
}

export default Home;