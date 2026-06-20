import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

type StockDetailModalProps = {
  isOpen: boolean;
  stock: {
    symbol: string;
    name: string;
    price: string;
    change: string;
    chart?: Array<{ time: string; price: number }>;
  } | null;
  onClose: () => void;
  onAddToWatchlist?: (stock: { symbol: string; name: string; price: string; change: string }) => void;
};

export default function StockDetailModal({ isOpen, stock, onClose, onAddToWatchlist }: StockDetailModalProps) {
  const chartData = stock?.chart || [
    { time: '09:00', price: 185.2 },
    { time: '10:00', price: 187.5 },
    { time: '11:00', price: 186.8 },
    { time: '12:00', price: 189.9 },
    { time: '13:00', price: 191.7 },
    { time: '14:00', price: 193.0 },
    { time: '15:00', price: 195.6 },
    { time: '16:00', price: 197.4 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2"
          >
            <div className="rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Stock Details</p>
                  <h2 className="text-2xl font-bold mt-1">
                    {stock?.symbol} · {stock?.name}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-slate-800 dark:to-slate-900">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Current Price</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stock?.price}</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 dark:from-emerald-900/30 dark:to-emerald-800/30">
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">24h Change</p>
                  <p className={`text-2xl font-bold mt-1 ${stock?.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {stock?.change}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 mb-3">Price Chart (24h)</p>
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid opacity={0.12} vertical={false} />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} width={38} />
                      <Tooltip
                        contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px' }}
                        labelStyle={{ color: '#94a3b8' }}
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                      />
                      <Line type="monotone" dataKey="price" stroke="#4f46e5" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onClose}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (stock) {
                      onAddToWatchlist?.({
                        symbol: stock.symbol,
                        name: stock.name,
                        price: stock.price,
                        change: stock.change,
                      });
                    }
                  }}
                  className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:from-indigo-700 hover:to-purple-700 shadow-md"
                >
                  Add to Watchlist
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
