import { useEffect } from 'react';
import { useDarkModeStore } from '@/store/useDarkModeStore';

const useDarkMode = () => {
  const { mode, setMode, userSelected, initializeMode } = useDarkModeStore();

  useEffect(() => {
    initializeMode();
  }, [initializeMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent) => {
      if (userSelected) return;
      const newMode = event.matches ? 'dark' : 'light';
      setMode(newMode, false);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [setMode, userSelected]);

  return mode;
};

export default useDarkMode;
