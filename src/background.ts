import type { AnalysisResult } from './types/analysis';

chrome.runtime.onInstalled.addListener(() => {
  console.log('Web Analyzer extension installed.');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ANALYZE_PAGE') {
    (async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.url) {
        const testId = new Date().getTime().toString();
        const mockResult: AnalysisResult = {
          testId: testId,
          domain: new URL(tab.url).hostname,
          timestamp: Date.now(),
          scores: {
            overall: Math.floor(Math.random() * 30) + 70, // 70-99
            performance: Math.floor(Math.random() * 30) + 70,
            security: Math.floor(Math.random() * 30) + 70,
          },
          performanceMetrics: {
            lcp: parseFloat((Math.random() * 2.5).toFixed(1)),
            cls: parseFloat((Math.random() * 0.1).toFixed(2)),
            inp: Math.floor(Math.random() * 100) + 50,
          },
          securityChecks: [
            { id: 'ssl', title: 'SSL Certificate', status: 'OK', description: 'Valid SSL certificate found.' },
            { id: 'https', title: 'HTTPS Redirect', status: 'Warning', description: 'HTTP traffic is not consistently redirected to HTTPS.' },
          ],
        };

        await chrome.storage.local.set({ [testId]: mockResult });
        sendResponse({ status: 'complete', testId: testId });
      } else {
        sendResponse({ status: 'error', message: 'Could not get active tab' });
      }
    })();
    return true; // Indicates asynchronous response
  }

  if (request.type === 'OPEN_DASHBOARD') {
    const dashboardUrl = `http://localhost:3000/dashboard/${request.testId}`;
    chrome.tabs.create({ url: dashboardUrl });
    return false;
  }
});
