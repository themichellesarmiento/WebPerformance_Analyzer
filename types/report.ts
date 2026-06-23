export type Rating = "good" | "needs-improvement" | "poor";
export type NumericUnit = "millisecond" | "byte" | "unitless" | string;

export type CategoryScore = {
  score: number;
  rating: Rating;
};

export type Scores = {
  performance: CategoryScore;
  accessibility: CategoryScore;
  seo: CategoryScore;
  bestPractices: CategoryScore;
};

export type Metric = {
  label: string;
  description: string;
  displayValue: string | null;
  numericValue: number | null;
  unit: NumericUnit | null;
  rating: Rating | null;
};

export type Metrics = {
  lcp: Metric;
  cls: Metric;
  fcp: Metric;
  tbt: Metric;
  speedIndex: Metric;
};

export type Recommendation = {
  id: string;
  title: string;
  description: string;
  score: number | null;
  displayValue: string | null;
  numericValue: number | null;
  numericUnit: NumericUnit | null;
  scoreDisplayMode: string;
  weight: number;
};

export type Recommendations = {
  performance: Recommendation[];
  accessibility: Recommendation[];
  seo: Recommendation[];
  bestPractices: Recommendation[];
};

export type AnalysisReport = {
  url: string;
  generatedAt: string;
  scores: Scores;
  metrics: Metrics;
  recommendations: Recommendations;
};