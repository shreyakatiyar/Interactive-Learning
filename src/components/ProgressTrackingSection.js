import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { icon: '📚', value: '10+', label: 'Courses Available' },
  { icon: '👥', value: '5',   label: 'Progress Reports' },
  { icon: '🏆', value: '100%', label: 'Success Tracking' },
];

const ProgressTrackingSection = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const stagger = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
    show: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={ref}
      style={{
        padding:    'var(--section-pad) 0',
        background: 'var(--bg-primary)',
        position:   'relative',
        overflow:   'hidden',
        textAlign:  'center',
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           '50%',
          left:          '50%',
          transform:     'translate(-50%,-50%)',
          width:         '700px',
          height:        '400px',
          background:    'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 68%)',
          filter:        'blur(60px)',
          pointerEvents: 'none',
          zIndex:        0,
        }}
      />

      <div
        style={{
          maxWidth: '760px',
          margin:   '0 auto',
          padding:  '0 2rem',
          position: 'relative',
          zIndex:   1,
        }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.div variants={fadeUp}>
            <span className="section-badge" style={{ marginBottom: '1.2rem', display: 'inline-block' }}>
              Progress
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily:    'var(--font-heading)',
              fontSize:      'clamp(2rem, 4vw, 3rem)',
              fontWeight:    800,
              letterSpacing: '-0.03em',
              color:         'var(--text-primary)',
              marginBottom:  '1rem',
            }}
          >
            Track Your{' '}
            <span
              style={{
                background:           'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
              }}
            >
              Progress
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              color:      'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
              fontSize:   '1rem',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
              maxWidth:   '500px',
              margin:     '0 auto 2.5rem',
            }}
          >
            Monitor your learning journey with detailed progress tracking features.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            style={{
              display:        'flex',
              justifyContent: 'center',
              gap:            'clamp(1.5rem, 4vw, 3rem)',
              flexWrap:       'wrap',
              marginBottom:   '2.5rem',
            }}
          >
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                style={{
                  background:   'var(--bg-card)',
                  border:       '1px solid var(--border)',
                  borderRadius: '14px',
                  padding:      '1.2rem 1.6rem',
                  minWidth:     '120px',
                  boxShadow:    'var(--shadow-card)',
                  cursor:       'default',
                }}
              >
                <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>{s.icon}</div>
                <div
                  style={{
                    fontFamily:           'var(--font-heading)',
                    fontSize:             '1.5rem',
                    fontWeight:           800,
                    background:           'var(--accent-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor:  'transparent',
                    backgroundClip:       'text',
                    lineHeight:           1.1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      '0.75rem',
                    color:         'var(--text-muted)',
                    marginTop:     '0.25rem',
                    fontWeight:    500,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link to="/progress-tracker" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 6px 28px var(--accent-glow)' }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding:      '0.9rem 2.2rem',
                  background:   'var(--accent-gradient)',
                  color:        '#fff',
                  border:       'none',
                  borderRadius: '12px',
                  fontSize:     '0.95rem',
                  fontWeight:   700,
                  fontFamily:   'var(--font-body)',
                  cursor:       'pointer',
                  boxShadow:    '0 4px 20px var(--accent-glow)',
                  letterSpacing: '0.01em',
                }}
              >
                View Progress Dashboard →
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgressTrackingSection;
