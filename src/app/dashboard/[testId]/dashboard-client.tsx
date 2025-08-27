'use client';

import { useEffect, useState } from 'react';
import type { AnalysisResult } from '@/types/analysis';

interface DashboardClientProps {
  testId: string;
}

export default function DashboardClient({ testId }: DashboardClientProps) {
  const [data, setData] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (testId && typeof chrome.storage !== 'undefined') {
      chrome.storage.local.get(testId, (result) => {
        if (result[testId]) {
          setData(result[testId]);
        }
      });
    }
  }, [testId]);

  if (!data) {
    return <main className="p-8"><p>Loading analysis results...</p></main>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Analysis Report</h1>
      
      {/* Top Summary Area */}
      <div className="mb-8 p-4 border rounded-lg">
        <p><strong>Domain:</strong> {data.domain}</p>
        <p><strong>Analyzed At:</strong> {new Date(data.timestamp).toLocaleString()}</p>
        <p><strong>Overall Score:</strong> {data.scores.overall}/100</p>
        <p><strong>Performance:</strong> {data.scores.performance}/100</p>
        <p><strong>Security:</strong> {data.scores.security}/100</p>
      </div>

      {/* Tabs */}
      <div>
        {/* Tab buttons would go here */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Tab 1: Current Status + Detailed Metrics</h2>
          {/* Detailed metrics would be rendered here */}

          <h2 className="text-xl font-semibold mt-4 mb-2">Tab 2: Improvement Measures & Effects</h2>
          {/* Improvement suggestions would be rendered here */}
        </div>
      </div>

      <footer className="mt-8 text-sm text-gray-500">
        <p>Results can vary for the same address depending on the measurement context.</p>
      </footer>
    </main>
  );
}
