import { motion } from 'framer-motion';
import type { AnalyticsCard } from '../api/dashboard';

type AnalyticsCardsProps = {
  analytics: AnalyticsCard[];
};

export default function AnalyticsCards({ analytics }: AnalyticsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {analytics.map((card) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-[1.75rem] border border-slate-200 bg-white px-5 py-6 shadow-sm hover:shadow-md transition dark:border-slate-700 dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-700"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-500 text-xl text-white shadow-lg shadow-cyan-500/40">
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{card.title}</p>
              <p className="mt-1 text-2xl font-semibold">{card.value}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-emerald-500">{card.delta} vs yesterday</div>
        </motion.div>
      ))}
    </div>
  );
}
