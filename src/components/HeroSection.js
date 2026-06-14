import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/* ── Particle canvas ─────────────────────────────────────── */
const PARTICLES = 55;

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const pts = Array.from({ length: PARTICLES }, () => ({
      x:  Math.random(),
      y:  Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r:  Math.random() * 1.6 + 0.4,
      o:  Math.random() * 0.45 + 0.1,
    }));

    let rafId;
    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--particle-color').trim() || '79, 127, 255';

      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${raw},${p.o})`;
        ctx.fill();
      });

      /* Connections */
      const D = Math.min(w, h) * 0.14;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = (pts[i].x - pts[j].x) * w;
          const dy = (pts[i].y - pts[j].y) * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < D) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x * w, pts[i].y * h);
            ctx.lineTo(pts[j].x * w, pts[j].y * h);
            ctx.strokeStyle = `rgba(${raw},${0.12 * (1 - dist / D)})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        0,
      }}
    />
  );
};

/* ── Magnetic button ─────────────────────────────────────── */
const MagneticButton = ({ to, children, primary }) => {
  const ref    = useRef(null);
  const x      = useMotionValue(0);
  const y      = useMotionValue(0);
  const sx     = useSpring(x, { stiffness: 220, damping: 16 });
  const sy     = useSpring(y, { stiffness: 220, damping: 16 });

  const onMove = useCallback((e) => {
    const r  = ref.current.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    x.set((e.clientX - cx) * 0.28);
    y.set((e.clientY - cy) * 0.28);
  }, [x, y]);

  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  const baseStyle = {
    padding:      '0.8rem 1.75rem',
    borderRadius: '10px',
    fontSize:     '0.92rem',
    fontWeight:   600,
    fontFamily:   'var(--font-body)',
    cursor:       'pointer',
    border:       'none',
    outline:      'none',
    display:      'inline-flex',
    alignItems:   'center',
    gap:          '0.4rem',
    transition:   'box-shadow 0.3s ease',
  };

  const primaryStyle = {
    ...baseStyle,
    background:  'var(--accent-gradient)',
    color:       '#ffffff',
    boxShadow:   '0 4px 22px var(--accent-glow)',
  };

  const secondaryStyle = {
    ...baseStyle,
    background:  'transparent',
    color:       'var(--text-primary)',
    border:      '1px solid var(--border)',
    backdropFilter: 'blur(8px)',
  };

  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <motion.button
        ref={ref}
        style={{ x: sx, y: sy, ...(primary ? primaryStyle : secondaryStyle) }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileTap={{ scale: 0.94 }}
      >
        {children}
      </motion.button>
    </Link>
  );
};

/* ── Animation variants ──────────────────────────────────── */
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── HeroSection ─────────────────────────────────────────── */
const HeroSection = () => {
  const sectionRef = useRef(null);
  const mouseX     = useMotionValue(0.5);
  const mouseY     = useMotionValue(0.5);
  const glowX      = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const glowY      = useSpring(mouseY, { stiffness: 60, damping: 18 });

  const onMouseMove = useCallback((e) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="hero"
      onMouseMove={onMouseMove}
      style={{
        position:   'relative',
        overflow:   'hidden',
        minHeight:  '100vh',
        display:    'flex',
        alignItems: 'center',
        background: 'var(--bg-secondary)',
        paddingTop: 'calc(var(--nav-height) + 2rem)',
      }}
    >
      {/* Ambient top radial glow */}
      <div
        aria-hidden="true"
        style={{
          position:    'absolute',
          inset:       0,
          background:  'radial-gradient(ellipse 80% 55% at 50% -10%, var(--accent-glow), transparent 68%)',
          pointerEvents: 'none',
          zIndex:      0,
        }}
      />

      {/* Floating orb 1 */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 45, 0, -45, 0], y: [0, -35, 0, 35, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position:      'absolute',
          width:         '560px',
          height:        '560px',
          borderRadius:  '50%',
          background:    'radial-gradient(circle, var(--accent-glow) 0%, transparent 68%)',
          top:           '-200px',
          right:         '-80px',
          filter:        'blur(50px)',
          pointerEvents: 'none',
          zIndex:        0,
        }}
      />

      {/* Floating orb 2 */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -30, 0, 30, 0], y: [0, 40, 0, -40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        style={{
          position:      'absolute',
          width:         '380px',
          height:        '380px',
          borderRadius:  '50%',
          background:    'radial-gradient(circle, rgba(124,79,255,0.13) 0%, transparent 68%)',
          bottom:        '-120px',
          left:          '-80px',
          filter:        'blur(50px)',
          pointerEvents: 'none',
          zIndex:        0,
        }}
      />

      {/* Mouse-following glow */}
      <motion.div
        aria-hidden="true"
        style={{
          position:      'absolute',
          width:         '440px',
          height:        '440px',
          borderRadius:  '50%',
          background:    'radial-gradient(circle, var(--accent-glow) 0%, transparent 58%)',
          filter:        'blur(28px)',
          pointerEvents: 'none',
          zIndex:        0,
          opacity:       0.65,
          left:          glowX,
          top:           glowY,
          translateX:    '-50%',
          translateY:    '-50%',
        }}
      />

      {/* Particle layer */}
      <ParticleCanvas />

      {/* ── Content grid ─── */}
      <div
        className="hero-grid"
        style={{
          maxWidth:            '1200px',
          margin:              '0 auto',
          padding:             '3rem 2rem 4rem',
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 '4rem',
          alignItems:          'center',
          position:            'relative',
          zIndex:              1,
          width:               '100%',
        }}
      >
        {/* ── Left: copy ─── */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <span className="section-badge" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
              Interactive Learning Platform
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily:   'var(--font-heading)',
              fontSize:     'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight:   800,
              lineHeight:   1.1,
              letterSpacing: '-0.03em',
              marginBottom: '1.4rem',
              color:        'var(--text-primary)',
            }}
          >
            Welcome to Your{' '}
            <span
              style={{
                background:           'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
              }}
            >
              Learning Platform
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize:     'clamp(1rem, 1.4vw, 1.1rem)',
              color:        'var(--text-secondary)',
              lineHeight:   1.75,
              marginBottom: '2.5rem',
              fontFamily:   'var(--font-body)',
              maxWidth:     '460px',
            }}
          >
            Start your journey with our comprehensive courses and interactive content.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}
          >
            <MagneticButton to="/courses" primary>
              Explore Courses <span style={{ opacity: 0.85 }}>→</span>
            </MagneticButton>
            <MagneticButton to="/quiz">
              Take a Quiz
            </MagneticButton>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            style={{
              display:      'flex',
              gap:          '2rem',
              marginTop:    '3rem',
              flexWrap:     'wrap',
            }}
          >
            {[
              { num: '10+', label: 'Courses' },
              { num: '5',   label: 'Live Sessions' },
              { num: '100%', label: 'Free' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily:    'var(--font-heading)',
                    fontSize:      '1.6rem',
                    fontWeight:    800,
                    background:    'var(--accent-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor:  'transparent',
                    backgroundClip: 'text',
                    lineHeight:    1.1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   '0.8rem',
                    color:      'var(--text-muted)',
                    marginTop:  '0.2rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: image ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)', y: 30 }}
          animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)',  y: 0  }}
          transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
        >
          {/* Glow ring behind image */}
          <div
            aria-hidden="true"
            style={{
              position:     'absolute',
              inset:        '-24px',
              background:   'var(--accent-gradient)',
              borderRadius: '22px',
              opacity:      0.12,
              filter:       'blur(24px)',
              zIndex:       0,
            }}
          />
          <motion.img
            src="https://img.freepik.com/free-vector/students-using-e-learning-platform-video-laptop-graduation-cap_335657-3285.jpg"
            alt="Students learning online"
            whileHover={{ scale: 1.025, y: -4 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            style={{
              maxWidth:     '100%',
              height:       'auto',
              borderRadius: '18px',
              position:     'relative',
              zIndex:       1,
              border:       '1px solid var(--border)',
              boxShadow:    'var(--shadow-card)',
              display:      'block',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
