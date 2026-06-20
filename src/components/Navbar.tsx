import { motion } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMarketTicker from '../hooks/useMarketTicker';

export default function Navbar() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const ticker = useMarketTicker();

  const handleNewAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-xl shadow-sm dark:border-slate-800 dark:bg-slate-950/95 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back, trader</p>
          <h2 className="text-2xl font-semibold">Portfolio Dashboard</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 text-sm font-medium text-emerald-700 dark:border-slate-800 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-300 sm:flex">
            <span className="rounded-full bg-white/70 px-2 py-1 text-xs font-semibold text-emerald-700">Live</span>
            <span>Market • {ticker.symbol} {ticker.change}</span>
          </div>
          <DarkModeToggle />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="flex flex-wrap items-center gap-3"
      >
        <button 
          onClick={handleNewAlert}
          className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg dark:shadow-indigo-500/30"
        >
          New Alert
        </button>
          <button
            onClick={() => navigate('/stocks')}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Market scan
          </button>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-medium text-white shadow-md"
          >
            ✓ Alert created successfully
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
