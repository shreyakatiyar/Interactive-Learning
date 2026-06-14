import React, { useEffect, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import Lenis from 'lenis';

import { AppThemeProvider, useAppTheme } from './ThemeContext';

import Navbar      from './components/Navbar';
import Home        from './components/Home';
import Courses     from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Quiz        from './components/Quiz';
import Community   from './components/Community';
import LiveSessions from './components/LiveSessions';
import ProgressTracker from './components/ProgressTracker';
import MultimediaContent from './components/MultimediaContent';
import ThemeSwitcher from './components/ThemeSwitcher';
import CustomCursor  from './components/CustomCursor';

/* ── Page transition variants ─────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 18, filter: 'blur(4px)' },
  in:      { opacity: 1, y:  0, filter: 'blur(0px)' },
  out:     { opacity: 0, y: -10, filter: 'blur(4px)' },
};
const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.38,
};

/* ── Inner app — needs both Router + ThemeContext ─────────── */
function AppContent() {
  const location = useLocation();
  const { isDark } = useAppTheme();

  /* Dynamic MUI theme that mirrors the CSS-variable theme */
  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: isDark ? '#4f7fff' : '#2563eb',
      },
      background: {
        default: isDark ? '#080810' : '#f7f8fc',
        paper:   isDark ? '#12121e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
  }), [isDark]);

  /* Lenis smooth scroll — init once */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          transition: 'background-color 0.45s ease, color 0.45s ease',
        }}
      >
        <CustomCursor />
        <Navbar />

        {/* Offset for fixed navbar */}
        <div style={{ paddingTop: 'var(--nav-height)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
            >
              <Routes location={location}>
                <Route path="/"                   element={<Home />} />
                <Route path="/courses"            element={<Courses />} />
                <Route path="/courses/:id"        element={<CourseDetail />} />
                <Route path="/quiz"               element={<Quiz />} />
                <Route path="/community"          element={<Community />} />
                <Route path="/live-sessions"      element={<LiveSessions />} />
                <Route path="/progress-tracker"   element={<ProgressTracker />} />
                <Route path="/multimedia-content" element={<MultimediaContent />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>

        <ThemeSwitcher />
      </div>
    </MuiThemeProvider>
  );
}

/* ── Root — wraps with AppThemeProvider ─────────────────────── */
function App() {
  return (
    <AppThemeProvider>
      <AppContent />
    </AppThemeProvider>
  );
}

export default App;
