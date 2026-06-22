export type Recommendation = {
  id: string;
  title: string;
  description: string;
  score: number | null;
  displayValue: string | null;
  scoreDisplayMode: string;
};

export type AnalysisReport = {
  url: string;
  generatedAt: string;

  scores: {
    performance: number;
    accessibility: number;
    seo: number;
    bestPractices: number;
  };

  metrics: {
    lcp: string | null;
    cls: string | null;
    fcp: string | null;
    tbt: string | null;
    speedIndex: string | null;
  };

  recommendations: {
    performance: Recommendation[];
    accessibility: Recommendation[];
    seo: Recommendation[];
    bestPractices: Recommendation[];
  };
};