'use client';

import { useState } from 'react';

export default function Popup() {
  const [status, setStatus] = useState('idle'); // idle, loading, done
  const [testId, setTestId] = useState<string | null>(null);

  const handleAnalyze = () => {
    setStatus('loading');
    chrome.runtime.sendMessage({ type: 'ANALYZE_PAGE' }, (response) => {
      if (response.status === 'complete') {
        setTestId(response.testId);
        setStatus('done');
      } else {
        // Handle error
        setStatus('idle');
      }
    });
  };

  const handleViewDetails = () => {
    if (testId) {
      chrome.runtime.sendMessage({ type: 'OPEN_DASHBOARD', testId: testId });
    }
  };

  return (
    <div style={{ width: 300, padding: 16 }}>
      <h1 className="text-lg font-bold mb-2">Web Analyzer</h1>
      
      {status === 'idle' && (
        <div>
          <p className="mb-4">Click the button to analyze the current page.</p>
          <button onClick={handleAnalyze} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Analyze
          </button>
        </div>
      )}

      {status === 'loading' && (
        <p>Analyzing, please wait...</p>
      )}

      {status === 'done' && (
        <div>
          <p className="mb-2">Analysis Complete!</p>
          {/* Summary scores would be displayed here */}
          <div className="p-2 border rounded mb-4">
            <p>Overall: 85</p>
            <p>Performance: 90</p>
            <p>Security: 80</p>
          </div>
          <button onClick={handleViewDetails} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
            View Details
          </button>
        </div>
      )}
    </div>
  );
}
