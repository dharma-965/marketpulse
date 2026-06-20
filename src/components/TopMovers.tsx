import { useEffect, useState } from 'react';
import { fetchGainers, fetchLosers, type Gainer } from '../api/dashboard';

export default function TopMovers() {
  const [gainers, setGainers] = useState<Gainer[]>([]);
  const [losers, setLosers] = useState<Gainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchGainers(), fetchLosers()])
      .then(([g, l]) => {
        if (!mounted) return;
        setGainers(g);
        setLosers(l);
      })
      .catch(() => {
        if (!mounted) return;
        setGainers([]);
        setLosers([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400 font-semibold">Top Gainers</p>
        <div className="mt-3 grid gap-2">
          {loading ? (
            <p className="text-xs text-slate-500">Loading…</p>
          ) : gainers.length === 0 ? (
            <p className="text-xs text-slate-500">No data available.</p>
          ) : (
            gainers.map((s) => (
              <div key={s.symbol} className="flex items-center justify-between rounded-xl px-3 py-2 bg-emerald-50 dark:bg-emerald-950/20">
                <div>
                  <p className="text-sm font-semibold">{s.symbol}</p>
                  <p className="text-xs text-slate-500">{s.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600">{s.change}</p>
                  <p className="text-xs text-slate-500">{s.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm uppercase tracking-[0.24em] text-rose-600 dark:text-rose-400 font-semibold">Top Losers</p>
        <div className="mt-3 grid gap-2">
          {loading ? (
            <p className="text-xs text-slate-500">Loading…</p>
          ) : losers.length === 0 ? (
            <p className="text-xs text-slate-500">No data available.</p>
          ) : (
            losers.map((s) => (
              <div key={s.symbol} className="flex items-center justify-between rounded-xl px-3 py-2 bg-rose-50 dark:bg-rose-950/20">
                <div>
                  <p className="text-sm font-semibold">{s.symbol}</p>
                  <p className="text-xs text-slate-500">{s.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-rose-600">{s.change}</p>
                  <p className="text-xs text-slate-500">{s.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
