import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

const LINKS = [
  { to: '/',                   label: 'Home'        },
  { to: '/courses',            label: 'Courses'     },
  { to: '/quiz',               label: 'Quiz'        },
  { to: '/community',          label: 'Community'   },
  { to: '/live-sessions',      label: 'Live Sessions' },
  { to: '/progress-tracker',   label: 'Progress'    },
  { to: '/multimedia-content', label: 'Media'       },
];

const Footer = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1, y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const stagger = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };

  return (
    <footer
      ref={ref}
      style={{
        background:     'var(--bg-secondary)',
        borderTop:      '1px solid var(--border)',
        padding:        '3.5rem 2rem 2rem',
        position:       'relative',
        overflow:       'hidden',
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        '-40px',
          left:          '50%',
          transform:     'translateX(-50%)',
          width:         '500px',
          height:        '200px',
          background:    'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)',
          filter:        'blur(40px)',
          pointerEvents: 'none',
          zIndex:        0,
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        style={{
          maxWidth:       '1200px',
          margin:         '0 auto',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '2rem',
          position:       'relative',
          zIndex:         1,
          textAlign:      'center',
        }}
      >
        {/* Brand */}
        <motion.div variants={fadeUp}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span
              style={{
                fontFamily:           'var(--font-heading)',
                fontSize:             '1.5rem',
                fontWeight:           800,
                background:           'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
                letterSpacing:        '-0.03em',
              }}
            >
              LearnIL
            </span>
          </Link>
          <p
            style={{
              marginTop:  '0.4rem',
              color:      'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              fontSize:   '0.82rem',
            }}
          >
            Your interactive learning companion
          </p>
        </motion.div>

        {/* Nav links */}
        <motion.nav
          variants={fadeUp}
          style={{
            display:   'flex',
            flexWrap:  'wrap',
            justifyContent: 'center',
            gap:       '0.3rem 0.5rem',
          }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                padding:        '0.4rem 0.75rem',
                textDecoration: 'none',
                color:          'var(--text-muted)',
                fontFamily:     'var(--font-body)',
                fontSize:       '0.84rem',
                borderRadius:   '6px',
                transition:     'color 0.2s ease, background 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.background = 'var(--accent-glow)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {l.label}
            </Link>
          ))}
        </motion.nav>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          style={{
            width:      '100%',
            height:     '1px',
            background: 'var(--border)',
            maxWidth:   '600px',
          }}
        />

        {/* Credit */}
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '0.85rem',
            color:      'var(--text-muted)',
          }}
        >
          Made with{' '}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'inline-block' }}
          >
            ❤️
          </motion.span>
          {' '}by{' '}
          <span
            style={{
              background:           'var(--accent-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip:       'text',
              fontWeight:           600,
            }}
          >
            Shreya
          </span>
        </motion.p>
      </motion.div>
    </footer>
  );
};

export default Footer;
