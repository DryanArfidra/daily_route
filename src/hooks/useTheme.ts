import { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';

export const useTheme = () => {
  const { isDark, toggleTheme, setTheme } = useThemeStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    const isDarkMode = savedTheme ? JSON.parse(savedTheme) : false;
    setTheme(isDarkMode);
  }, [setTheme]);

  return {
    isDark,
    toggleTheme,
    setTheme
  };
};