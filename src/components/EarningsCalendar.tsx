import { useEffect, useState } from 'react';
import { fetchEarnings, type EarningEvent } from '../api/dashboard';

export default function EarningsCalendar() {
  const [earnings, setEarnings] = useState<EarningEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchEarnings()
      .then((data) => {
        if (!mounted) return;
        setEarnings(data);
      })
      .catch(() => setEarnings([]))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 font-semibold">Upcoming Earnings</p>
      <div className="mt-3 grid gap-2">
        {loading ? (
          <p className="text-xs text-slate-500">Loading…</p>
        ) : earnings.length === 0 ? (
          <p className="text-xs text-slate-500">No earnings scheduled.</p>
        ) : (
          earnings.map((e) => (
            <div key={e.symbol} className="flex items-center justify-between rounded-xl px-3 py-2 bg-blue-50 dark:bg-blue-950/20">
              <div>
                <p className="text-sm font-semibold">{e.symbol} — {e.name}</p>
                <p className="text-xs text-slate-500">{e.date}</p>
              </div>
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Est: {e.estimate}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
