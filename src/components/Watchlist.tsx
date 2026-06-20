import { motion } from 'framer-motion';
import type { TrendingStock } from '../api/dashboard';

type WatchlistProps = {
  watchlist: TrendingStock[];
  onRemove: (symbol: string) => void;
};

export default function Watchlist({ watchlist, onRemove }: WatchlistProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Watchlist</p>
          <h3 className="text-xl font-semibold">Saved stocks</h3>
        </div>
        <span className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {watchlist.length} saved
        </span>
      </div>

      <div className="space-y-4">
        {watchlist.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
            Add stocks to your watchlist to monitor prices and AI signals in one place.
          </div>
        ) : (
          watchlist.map((stock) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-950"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{stock.symbol}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{stock.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{stock.price}</p>
                <button
                  type="button"
                  onClick={() => onRemove(stock.symbol)}
                  className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-rose-700 transition hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
