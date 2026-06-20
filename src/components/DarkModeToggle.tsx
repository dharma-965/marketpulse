import { useTheme } from '../hooks/useTheme';

export default function DarkModeToggle() {
  const { themeMode, setThemeMode } = useTheme();
  const enabled = themeMode === 'dark';

  const toggle = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggle}
      className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-[var(--brand-from)] hover:bg-[var(--brand-from)]/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-[var(--brand-to)]/10"
    >
      {enabled ? 'Switch to light' : 'Switch to dark'}
    </button>
  );
}
