import { useEffect, useState } from 'react';

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('dashboard-dark-mode');
    const value = stored ? JSON.parse(stored) : false;
    setIsDarkMode(value);
  }, []);

  return { isDarkMode };
}
