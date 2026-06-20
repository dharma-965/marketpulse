import { motion } from 'framer-motion';
import type { AIPick } from '../api/dashboard';

type AIPicksProps = {
  picks: AIPick[];
};

export default function AIPicks({ picks }: AIPicksProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">AI top picks</p>
          <h3 className="text-xl font-semibold">Recommended positions</h3>
        </div>
        <span className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-md">
          Powered by AI
        </span>
      </div>

      <div className="space-y-4">
        {picks.map((pick) => (
          <motion.div
            key={pick.symbol}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{pick.symbol}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{pick.name}</p>
              </div>
              <span className="rounded-2xl bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
                Score {pick.score}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{pick.reason}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
