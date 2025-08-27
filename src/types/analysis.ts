export interface AnalysisResult {
  testId: string;
  domain: string;
  timestamp: number;
  scores: {
    overall: number;
    performance: number;
    security: number;
  };
  performanceMetrics: {
    lcp: number;
    cls: number;
    inp: number;
  };
  securityChecks: SecurityCheck[];
}

export interface SecurityCheck {
  id: string;
  title: string;
  status: 'OK' | 'Warning' | 'Error';
  description: string;
  evidence?: string;
}
