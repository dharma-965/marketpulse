import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
  { path: '/', label: 'Dashboard' },
  { path: '/stocks', label: 'Market' },
  { path: '/transactions', label: 'Transactions' },
  { path: '/settings', label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="relative z-20 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-md dark:border-slate-800 dark:bg-slate-950/95 lg:w-[320px] lg:border-b-0 lg:border-r lg:min-h-screen">
      <div className="mx-auto flex max-w-[320px] flex-col gap-8 px-5 py-6 lg:px-7">
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <img src="/src/assets/logo.svg" alt="MarketPulse logo" className="h-12 w-12 rounded-2xl shadow-lg" />
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">MarketPulse</p>
            <h1 className="text-2xl font-semibold">Flash Market</h1>
          </div>
        </motion.div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 dark:shadow-indigo-500/20'
                    : 'text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-5 text-white shadow-xl shadow-indigo-500/30 dark:shadow-indigo-500/20">
          <p className="text-sm uppercase tracking-[0.24em] text-indigo-200">Live feed</p>
          <p className="mt-3 text-lg font-semibold">AI forecast ready</p>
          <p className="mt-2 text-sm text-indigo-100">Market volatility is low, scanning top sectors for momentum entries.</p>
        </div>
      </div>
    </aside>
  );
}
