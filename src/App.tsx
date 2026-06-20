import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AppRouter from './AppRouter';
import { ThemeProvider, useTheme } from './hooks/useTheme';

function AppContent() {
  const { themeClass } = useTheme();

  return (
    <div className={`${themeClass}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 dark:text-slate-100">
        <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
          <Sidebar />
          <main className="flex-1">
            <Navbar />
            <AnimatePresence mode="wait">
              <motion.div
                key="dashboard-page"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="p-4 sm:p-6 lg:p-8"
              >
                <AppRouter />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
