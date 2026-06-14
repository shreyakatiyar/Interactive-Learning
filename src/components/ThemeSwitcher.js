import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppTheme } from '../ThemeContext';

const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1,   y: 0  }}
      transition={{ duration: 0.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.12 }}
      whileTap={{  scale: 0.88  }}
      style={{
        position:       'fixed',
        bottom:         '1.75rem',
        right:          '1.75rem',
        zIndex:         1001,
        width:          '50px',
        height:         '50px',
        borderRadius:   '50%',
        border:         '1px solid var(--border)',
        background:     'var(--bg-card)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow:      'var(--shadow-card)',
        cursor:         'pointer',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        fontSize:       '1.25rem',
        lineHeight:     1,
        outline:        'none',
        transition:     'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0,   opacity: 1, scale: 1   }}
          exit={{    rotate:  90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'block', lineHeight: 1 }}
        >
          {isDark ? '☀️' : '🌙'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeSwitcher;
