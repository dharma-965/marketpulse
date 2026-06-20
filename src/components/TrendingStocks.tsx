import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { TrendingStock } from '../api/dashboard';
import StockDetailModal from './StockDetailModal';

type TrendingStocksProps = {
  trendingStocks?: TrendingStock[];
  onAddToWatchlist?: (stock: TrendingStock) => void;
};

export default function TrendingStocks({ trendingStocks, onAddToWatchlist }: TrendingStocksProps) {
  const [selectedStock, setSelectedStock] = useState<TrendingStock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localTrending, setLocalTrending] = useState<TrendingStock[]>(trendingStocks ?? []);

  useEffect(() => {
    if (trendingStocks && trendingStocks.length > 0) {
      setLocalTrending(trendingStocks);
      return;
    }

    let isMounted = true;

    axios
      .get<TrendingStock[]>('/api/trending')
      .then((response) => {
        if (isMounted) {
          setLocalTrending(response.data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLocalTrending([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [trendingStocks]);

  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Trending</p>
          <h3 className="text-xl font-semibold">Hot picks</h3>
        </div>
        <div className="rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-2 text-sm font-medium text-blue-700 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300">
          24h movers
        </div>
      </div>
      <div className="space-y-4">
        {localTrending.map((stock) => (
          <div
            key={stock.symbol}
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900 pulse-highlight"
          >
            <button
              type="button"
              onClick={() => {
                setSelectedStock(stock);
                setIsModalOpen(true);
              }}
              className="flex w-full items-center justify-between text-left"
            >
              <div>
                <p className="text-sm font-semibold">{stock.symbol}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${stock.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{stock.change}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{stock.price}</p>
              </div>
            </button>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onAddToWatchlist?.(stock);
                }}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Add to watchlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
    <StockDetailModal
      isOpen={isModalOpen}
      stock={selectedStock}
      onClose={() => setIsModalOpen(false)}
      onAddToWatchlist={(stock) => {
        onAddToWatchlist?.(stock);
        setIsModalOpen(false);
      }}
    />
    </>
  );
}