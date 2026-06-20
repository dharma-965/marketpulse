import { motion } from 'framer-motion';
import { useState } from 'react';

const transactionData = [
  { id: 1, type: 'BUY', symbol: 'AAPL', asset: 'Apple', shares: 50, price: '$154.20', total: '$7,710', date: '2024-05-22', status: 'Completed' },
  { id: 2, type: 'SELL', symbol: 'TSLA', asset: 'Tesla', shares: 25, price: '$210.50', total: '$5,262.50', date: '2024-05-21', status: 'Completed' },
  { id: 3, type: 'BUY', symbol: 'NVDA', asset: 'NVIDIA', shares: 15, price: '$462.80', total: '$6,942', date: '2024-05-20', status: 'Completed' },
  { id: 4, type: 'BUY', symbol: 'AMZN', asset: 'Amazon', shares: 30, price: '$138.40', total: '$4,152', date: '2024-05-19', status: 'Completed' },
  { id: 5, type: 'SELL', symbol: 'AAPL', asset: 'Apple', shares: 20, price: '$156.80', total: '$3,136', date: '2024-05-18', status: 'Completed' },
];

export default function Transactions() {
  const [filter, setFilter] = useState('all');

  const filteredTransactions = filter === 'all' 
    ? transactionData 
    : transactionData.filter(tx => tx.type === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <div className="rounded-[2rem] bg-white p-6 shadow-md border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Transaction History</p>
          <h3 className="text-xl font-semibold mt-1">Your trade activity</h3>
        </div>

        <div className="flex gap-3 mb-6">
          {['all', 'BUY', 'SELL'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                filter === type
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              {type === 'all' ? 'All Transactions' : type}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px] rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-4 px-5 py-4 text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 font-semibold">
              <span>Asset</span>
              <span>Type</span>
              <span>Shares</span>
              <span>Price</span>
              <span>Total</span>
              <span>Date</span>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredTransactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-4 px-5 py-4 items-center text-sm bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{tx.symbol}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{tx.asset}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                    tx.type === 'BUY'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
                  }`}>
                    {tx.type}
                  </span>
                  <span className="text-slate-700 dark:text-slate-200">{tx.shares}</span>
                  <span className="text-slate-700 dark:text-slate-200">{tx.price}</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{tx.total}</span>
                  <span className="text-slate-500 dark:text-slate-400">{tx.date}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[2rem] bg-white p-6 shadow-md border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Total Trades</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2">{transactionData.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">All time</p>
        </div>
        
        <div className="rounded-[2rem] bg-white p-6 shadow-md border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Buy Orders</p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{transactionData.filter(t => t.type === 'BUY').length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Purchases</p>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-md border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Sell Orders</p>
          <p className="text-3xl font-bold text-rose-600 dark:text-rose-400 mt-2">{transactionData.filter(t => t.type === 'SELL').length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sales</p>
        </div>
      </div>
    </motion.div>
  );
}
