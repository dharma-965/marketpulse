import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme, type AccentTheme, type ThemeMode } from '../hooks/useTheme';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    newsAlerts: false,
    tradeNotifications: true,
    email: true,
  });

  const [refreshRate, setRefreshRate] = useState('1m');
  const { themeMode, accentTheme, setThemeMode, setAccentTheme } = useTheme();

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const accentOptions: AccentTheme[] = ['indigo', 'emerald', 'cyan', 'rose'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <section className="rounded-[2rem] bg-white p-6 shadow-md border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Settings</p>
          <h3 className="text-xl font-semibold mt-1">Dashboard preferences</h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Notification Preferences */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm font-semibold mb-4">Notification preferences</p>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.priceAlerts}
                  onChange={() => toggleNotification('priceAlerts')}
                  className="w-4 h-4 rounded accent-indigo-600"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Price change alerts</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.newsAlerts}
                  onChange={() => toggleNotification('newsAlerts')}
                  className="w-4 h-4 rounded accent-indigo-600"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Market news alerts</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.tradeNotifications}
                  onChange={() => toggleNotification('tradeNotifications')}
                  className="w-4 h-4 rounded accent-indigo-600"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Trade notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => toggleNotification('email')}
                  className="w-4 h-4 rounded accent-indigo-600"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Email notifications</span>
              </label>
            </div>
          </div>

          {/* Data Refresh Settings */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm font-semibold mb-4">Data refresh rate</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Update frequency</label>
                <select
                  value={refreshRate}
                  onChange={(e) => setRefreshRate(e.target.value)}
                  className="w-full px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="15s">15 seconds</option>
                  <option value="30s">30 seconds</option>
                  <option value="1m">1 minute</option>
                  <option value="5m">5 minutes</option>
                  <option value="15m">15 minutes</option>
                </select>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Currently set to: <span className="font-semibold">{refreshRate}</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Settings */}
      <section className="rounded-[2rem] bg-white p-6 shadow-md border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 mb-4">Appearance</p>
        <div className="grid gap-3 md:grid-cols-3">
          {(['auto', 'light', 'dark'] as ThemeMode[]).map((t) => (
            <button
              key={t}
              onClick={() => setThemeMode(t)}
              className={`p-4 rounded-2xl border-2 transition capitalize font-medium ${
                themeMode === t
                  ? 'border-[var(--brand-from)] bg-[var(--brand-from)]/10 text-[var(--brand-from)] dark:bg-[var(--brand-to)]/20'
                  : 'border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300 hover:border-[var(--brand-from)]'
              }`}
            >
              {t === 'auto' ? '🔄 Auto' : t === 'light' ? '☀️ Light' : '🌙 Dark'}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-md border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 mb-4">Accent palette</p>
        <div className="grid gap-3 md:grid-cols-4">
          {accentOptions.map((accent) => (
            <button
              key={accent}
              onClick={() => setAccentTheme(accent)}
              className={`rounded-2xl border-2 px-4 py-3 text-sm font-medium transition ${
                accentTheme === accent
                  ? 'border-[var(--brand-from)] bg-[var(--brand-from)]/10 text-[var(--brand-from)] dark:bg-[var(--brand-to)]/20'
                  : 'border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300 hover:border-[var(--brand-from)]'
              }`}
            >
              {accent}
            </button>
          ))}
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="rounded-2xl bg-gradient-to-r from-[var(--brand-from)] to-[var(--brand-to)] px-8 py-3 text-sm font-medium text-white transition hover:brightness-110 shadow-md">
          Save Changes
        </button>
      </div>
    </motion.div>
  );
}
