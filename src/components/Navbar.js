import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { to: '/',                   label: 'Home'        },
  { to: '/courses',            label: 'Courses'     },
  { to: '/quiz',               label: 'Quiz'        },
  { to: '/community',          label: 'Community'   },
  { to: '/live-sessions',      label: 'Live Sessions' },
  { to: '/progress-tracker',   label: 'Progress'    },
  { to: '/multimedia-content', label: 'Media'       },
];

/* ── Shared styles ───────────────────────────────────────── */
const linkBase = {
  display:        'block',
  padding:        '0.48rem 0.8rem',
  textDecoration: 'none',
  fontFamily:     'var(--font-body)',
  fontSize:       '0.875rem',
  borderRadius:   '8px',
  whiteSpace:     'nowrap',
  transition:     'color 0.2s ease',
  cursor:         'pointer',
};

const Navbar = () => {
  const location = useLocation();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  /* Detect scroll for glassmorphism effect */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1  }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position:             'fixed',
          top:                  0,
          left:                 0,
          right:                0,
          zIndex:               1000,
          height:               'var(--nav-height)',
          padding:              '0 2rem',
          display:              'flex',
          alignItems:           'center',
          justifyContent:       'space-between',
          background:           scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter:       scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom:         scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
          transition:           'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, padding 0.3s ease',
        }}
      >
        {/* ── Brand ─── */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{   scale: 0.96 }}
            style={{
              fontFamily:   'var(--font-heading)',
              fontSize:     '1.25rem',
              fontWeight:   800,
              background:   'var(--accent-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.035em',
              lineHeight:    1,
            }}
          >
            LearnIL
          </motion.div>
        </Link>

        {/* ── Desktop links ─── */}
        <ul
          className="desktop-nav"
          style={{
            display:    'flex',
            listStyle:  'none',
            margin:     0,
            padding:    0,
            gap:        '0.1rem',
          }}
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(link.to);
            return (
              <li
                key={link.to}
                style={{ position: 'relative' }}
                onMouseEnter={() => setHoveredLink(link.to)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link
                  to={link.to}
                  style={{
                    ...linkBase,
                    color:      active ? 'var(--accent)' : 'var(--text-secondary)',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {link.label}
                </Link>

                {/* Active underline — shared layoutId creates smooth transition */}
                {active && (
                  <motion.div
                    layoutId="nav-active-indicator"
                    style={{
                      position:     'absolute',
                      bottom:       '2px',
                      left:         '0.8rem',
                      right:        '0.8rem',
                      height:       '2px',
                      background:   'var(--accent-gradient)',
                      borderRadius: '1px',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  />
                )}

                {/* Hover background pill */}
                {hoveredLink === link.to && !active && (
                  <motion.div
                    layoutId="nav-hover-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{    opacity: 0 }}
                    style={{
                      position:     'absolute',
                      inset:        0,
                      background:   'var(--accent-glow)',
                      borderRadius: '8px',
                      zIndex:       -1,
                    }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* ── Mobile hamburger ─── */}
        <motion.button
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
          whileTap={{ scale: 0.88 }}
          className="mobile-menu-btn"
          style={{
            background:     'transparent',
            border:         '1px solid var(--border)',
            borderRadius:   '8px',
            width:          '40px',
            height:         '40px',
            cursor:         'pointer',
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '5px',
            padding:        '8px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={
                mobileOpen
                  ? { rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                      y:      i === 0 ?  7 : i === 2 ?  -7 : 0,
                      opacity: i === 1 ? 0 : 1 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.22 }}
              style={{
                display:         'block',
                width:           '18px',
                height:          '1.5px',
                background:      'var(--text-primary)',
                borderRadius:    '1px',
                transformOrigin: 'center',
              }}
            />
          ))}
        </motion.button>
      </motion.nav>

      {/* ── Mobile dropdown menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y:  0  }}
            exit={{    opacity: 0, y: -8  }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position:             'fixed',
              top:                  'var(--nav-height)',
              left:                 0,
              right:                0,
              zIndex:               999,
              background:           'var(--nav-bg)',
              backdropFilter:       'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderBottom:         '1px solid var(--nav-border)',
              padding:              '0.75rem 1.5rem 1.25rem',
              display:              'flex',
              flexDirection:        'column',
              gap:                  '0.2rem',
            }}
          >
            {NAV_LINKS.map((link, i) => {
              const active = isActive(link.to);
              return (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x:   0  }}
                  transition={{ delay: i * 0.04, duration: 0.22 }}
                >
                  <Link
                    to={link.to}
                    style={{
                      display:          'block',
                      padding:          '0.7rem 1rem',
                      textDecoration:   'none',
                      fontFamily:       'var(--font-body)',
                      fontSize:         '0.95rem',
                      fontWeight:       active ? 600 : 400,
                      color:            active ? 'var(--accent)' : 'var(--text-primary)',
                      background:       active ? 'var(--accent-glow)' : 'transparent',
                      borderRadius:     '10px',
                      border:           active ? '1px solid var(--border-hover)' : '1px solid transparent',
                      transition:       'background 0.2s, color 0.2s',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
