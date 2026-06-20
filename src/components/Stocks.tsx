import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import TrendingStocks from './TrendingStocks';
import Watchlist from './Watchlist';
import AIPicks from './AIPicks';
import { fetchAIPicks, type AIPick, type TrendingStock } from '../api/dashboard';

export default function Stocks() {
  const [watchlist, setWatchlist] = useState<TrendingStock[]>([]);
  const [search, setSearch] = useState('');
  const [aiPicks, setAIPicks] = useState<AIPick[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem('stock-dashboard-watchlist');
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch {
        setWatchlist([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('stock-dashboard-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    fetchAIPicks()
      .then((data) => setAIPicks(data))
      .catch(() => setAIPicks([]));
  }, []);

  const filteredWatchlist = useMemo(
    () =>
      watchlist.filter((stock) =>
        [stock.symbol, stock.name].some((value) => value.toLowerCase().includes(search.toLowerCase())),
      ),
    [search, watchlist],
  );

  const addToWatchlist = (stock: TrendingStock) => {
    setWatchlist((current) => {
      if (current.some((item) => item.symbol === stock.symbol)) {
        return current;
      }
      return [stock, ...current];
    });
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist((current) => current.filter((stock) => stock.symbol !== symbol));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <div className="rounded-[2rem] bg-white p-6 shadow-md border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Market watch</p>
            <h3 className="text-xl font-semibold">AI-powered stock scanner</h3>
          </div>
          <button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:from-indigo-700 hover:to-purple-700 shadow-md dark:shadow-indigo-500/30">
            Run scan
          </button>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Search watchlist</p>
            <div className="mt-3 flex items-center gap-3">
              <input
                type="text"
                placeholder="Search symbol or name"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-900"
              />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Watchlist size</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">{watchlist.length}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">AI picks</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">{aiPicks.length}</p>
              </div>
            </div>
          </div>

          <Watchlist watchlist={filteredWatchlist} onRemove={removeFromWatchlist} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          <AIPicks picks={aiPicks} />
          <div className="rounded-[2rem] bg-white p-6 shadow-md border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Trending</p>
                <h3 className="text-xl font-semibold">Live market movers</h3>
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-2 text-sm font-medium text-blue-700 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300">
                Updated now
              </div>
            </div>
            <TrendingStocks onAddToWatchlist={addToWatchlist} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
