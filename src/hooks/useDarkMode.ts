// hooks/useDarkMode.ts
import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkClass = 'dark';
    const root = window.document.documentElement;
    const saved = localStorage.getItem('theme');

    if (saved === 'dark') {
      root.classList.add(darkClass);
      setIsDark(true);
    } else {
      root.classList.remove(darkClass);
      setIsDark(false);
    }
  }, []);

  const toggle = () => {
    const root = window.document.documentElement;
    const darkClass = 'dark';
    if (root.classList.contains(darkClass)) {
      root.classList.remove(darkClass);
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add(darkClass);
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return { isDark, toggle };
}
