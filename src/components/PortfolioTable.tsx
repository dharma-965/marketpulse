import { motion } from 'framer-motion';
import type { PortfolioHolding } from '../api/dashboard';

type PortfolioTableProps = {
  holdings: PortfolioHolding[];
};

export default function PortfolioTable({ holdings }: PortfolioTableProps) {
  return (
    <div className="overflow-x-auto">
        <div className="min-w-[720px] rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="grid grid-cols-[1.6fr_0.9fr_0.9fr_0.9fr_0.8fr] gap-4 px-5 py-4 text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          <span>Asset</span>
          <span>Allocation</span>
          <span>Shares</span>
          <span>Current</span>
          <span>Profit</span>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {holdings.map((item, index) => (
            <motion.div
              key={item.symbol}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="grid grid-cols-[1.6fr_0.9fr_0.9fr_0.9fr_0.8fr] gap-4 px-5 py-4 items-center text-sm text-slate-700 dark:text-slate-200"
            >
              <div>
                <p className="font-semibold">{item.asset}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.symbol} • Avg ${item.avgPrice}</p>
              </div>
              <span>{item.allocation}</span>
              <span>{item.shares}</span>
              <span>{item.current}</span>
              <span className="text-emerald-500">{item.profit}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
