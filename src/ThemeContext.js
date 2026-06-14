import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const AppThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('il-theme');
      return saved ? saved === 'dark' : true; // dark by default
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try { localStorage.setItem('il-theme', isDark ? 'dark' : 'light'); } catch {}
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used inside AppThemeProvider');
  return ctx;
};
