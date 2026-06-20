import { motion } from 'framer-motion';
import type { InsightItem } from '../api/dashboard';

type InsightsCardsProps = {
  insights: InsightItem[];
};

export default function InsightsCards({ insights }: InsightsCardsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">AI insights</p>
          <h3 className="text-xl font-semibold">Intelligent guidance</h3>
        </div>
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-md">Premium</div>
      </div>
      <div className="grid gap-4">
        {insights.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition hover:border-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-700"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg font-semibold">{item.title}</p>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {item.badge}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
