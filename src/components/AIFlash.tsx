import { useEffect, useState } from 'react';
import { fetchAISummary, type AIInsight, type AISummary } from '../api/dashboard';

export default function AIFlash() {
  const [flash, setFlash] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;
    fetchAISummary()
      .then((data) => {
        if (!isMounted) return;
        setFlash(data.flash ?? data.aiSummary.summary);
        setSource(data.source);
      })
      .catch(() => {
        if (!isMounted) return;
        setFlash('Market flash is currently unavailable.');
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 text-slate-900 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Market Flash</p>
          <h4 className="text-lg font-semibold">{loading ? 'Loading flash…' : 'MarketPulse Flash'}</h4>
        </div>
        <div className="text-xs text-slate-500">{source === 'openai' ? 'AI-powered' : 'Rule-based'}</div>
      </div>
      <p className="mt-3 text-sm leading-6">{loading ? '...' : flash}</p>
    </div>
  );
}
