import { useEffect, useState } from 'react';
import { fetchSectors, type SectorPerformance } from '../api/dashboard';

export default function SectorPerformance() {
  const [sectors, setSectors] = useState<SectorPerformance[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchSectors()
      .then((data) => {
        if (!mounted) return;
        setSectors(data);
      })
      .catch(() => setSectors([]));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Sectors</p>
      <div className="mt-3 grid gap-2">
        {sectors.map((s) => (
          <div key={s.sector} className="flex items-center justify-between rounded-xl px-3 py-2 bg-slate-50 dark:bg-slate-950">
            <div className="text-sm font-medium">{s.sector}</div>
            <div className={`text-sm font-semibold ${s.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{s.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
