import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type ThemeMode = 'auto' | 'light' | 'dark';
export type AccentTheme = 'indigo' | 'emerald' | 'cyan' | 'rose';

type ThemeContextType = {
  themeMode: ThemeMode;
  accentTheme: AccentTheme;
  themeClass: string;
  resolvedDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  setAccentTheme: (accent: AccentTheme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const themeModeKey = 'stock-dashboard-theme-mode';
const accentThemeKey = 'stock-dashboard-accent-theme';
const defaultThemeMode: ThemeMode = 'auto';
const defaultAccentTheme: AccentTheme = 'indigo';

function resolveDarkMode(mode: ThemeMode) {
  if (mode === 'dark') return true;
  if (mode === 'light') return false;

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultThemeMode);
  const [accentTheme, setAccentThemeState] = useState<AccentTheme>(defaultAccentTheme);
  const [resolvedDark, setResolvedDark] = useState(false);

  useEffect(() => {
    const storedMode = window.localStorage.getItem(themeModeKey) as ThemeMode | null;
    const storedAccent = window.localStorage.getItem(accentThemeKey) as AccentTheme | null;

    if (storedMode) {
      setThemeModeState(storedMode);
    }
    if (storedAccent) {
      setAccentThemeState(storedAccent);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateResolved = () => setResolvedDark(resolveDarkMode(themeMode));

    updateResolved();

    if (themeMode === 'auto') {
      mediaQuery.addEventListener('change', updateResolved);
      return () => mediaQuery.removeEventListener('change', updateResolved);
    }
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedDark);
  }, [resolvedDark]);

  useEffect(() => {
    window.localStorage.setItem(themeModeKey, themeMode);
  }, [themeMode]);

  useEffect(() => {
    window.localStorage.setItem(accentThemeKey, accentTheme);
  }, [accentTheme]);

  const value = useMemo(
    () => ({
      themeMode,
      accentTheme,
      resolvedDark,
      themeClass: `${accentTheme}-theme`,
      setThemeMode: setThemeModeState,
      setAccentTheme: setAccentThemeState,
    }),
    [accentTheme, resolvedDark, themeMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
