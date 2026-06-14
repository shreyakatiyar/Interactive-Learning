import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const EVENTS = [
  {
    id: 1,
    image: 'https://i.ytimg.com/vi/i5ier3ldD_8/hqdefault.jpg?v=62a84408',
    title: 'React Hooks Deep Dive',
    description: 'Advanced techniques for managing state in React applications.',
    date: '2024-06-20',
    time: '10:00 PM',
    tag: 'React',
  },
  {
    id: 2,
    image: 'https://cdn.fs.teachablecdn.com/R5EG2Kp4SoaDOev0Immm',
    title: 'CSS Grid Layouts Workshop',
    description: 'Learn how to create complex layouts using CSS Grid.',
    date: '2024-06-21',
    time: '02:00 PM',
    tag: 'CSS',
  },
];

/* ── Circular-position helper ────────────────────────────── */
const circlePos = (i, total, r = 180) => {
  const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
  return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
};

/* ── Small card used during the circular animation phase ─── */
const CircleCard = ({ event, index, total, entering }) => {
  const pos = circlePos(index, total);
  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
      animate={{
        opacity: 1,
        x:       pos.x,
        y:       pos.y,
        scale:   0.78,
      }}
      exit={{
        opacity:    0,
        scale:      1.15,
        transition: { duration: 0.3, delay: index * 0.06 },
      }}
      transition={{
        duration: 0.55,
        delay:    index * 0.1,
        ease:     [0.16, 1, 0.3, 1],
      }}
      style={{
        position:  'absolute',
        left:      '50%',
        top:       '50%',
        width:     '220px',
        marginLeft: '-110px',
        marginTop:  '-70px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background:   'var(--bg-card)',
          border:       '1px solid var(--border)',
          borderRadius: '12px',
          padding:      '1rem',
          boxShadow:    'var(--shadow-card)',
        }}
      >
        <img
          src={event.image}
          alt={event.title}
          style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <p
          style={{
            fontFamily:  'var(--font-heading)',
            fontSize:    '0.8rem',
            fontWeight:  700,
            color:       'var(--text-primary)',
            marginTop:   '0.6rem',
            lineHeight:  1.3,
          }}
        >
          {event.title}
        </p>
      </div>
    </motion.div>
  );
};

/* ── Full grid card ──────────────────────────────────────── */
const EventCard = ({ event, index }) => {
  const ref    = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });

  const onMove = useCallback((e) => {
    const r  = ref.current.getBoundingClientRect();
    const nx = (e.clientX - r.left)  / r.width;
    const ny = (e.clientY - r.top)   / r.height;
    setTilt({ x: (ny - 0.5) * -10, y: (nx - 0.5) * 10 });
    setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  }, []);

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setSpot(s => ({ ...s, on: false }));
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: '900px' }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{
          background:     'var(--bg-card)',
          border:         '1px solid var(--border)',
          borderRadius:   '16px',
          overflow:       'hidden',
          boxShadow:      'var(--shadow-card)',
          position:       'relative',
          transformStyle: 'preserve-3d',
          transition:     'border-color 0.3s, box-shadow 0.3s',
          cursor:         'default',
        }}
      >
        {/* Spotlight */}
        {spot.on && (
          <div
            aria-hidden="true"
            style={{
              position:      'absolute',
              width:         '200px',
              height:        '200px',
              borderRadius:  '50%',
              background:    'radial-gradient(circle, var(--accent-glow) 0%, transparent 68%)',
              top:           spot.y - 100,
              left:          spot.x - 100,
              pointerEvents: 'none',
              zIndex:        0,
            }}
          />
        )}

        {/* Image with zoom-on-hover */}
        <div style={{ overflow: 'hidden', height: '200px', position: 'relative' }}>
          <motion.img
            src={event.image}
            alt={event.title}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              display:    'block',
            }}
          />
          {/* Tag chip */}
          <span
            style={{
              position:     'absolute',
              top:          '0.75rem',
              left:         '0.75rem',
              background:   'var(--accent-gradient)',
              color:        '#fff',
              fontSize:     '0.7rem',
              fontWeight:   700,
              fontFamily:   'var(--font-body)',
              padding:      '0.22rem 0.6rem',
              borderRadius: '100px',
              letterSpacing: '0.05em',
            }}
          >
            {event.tag}
          </span>
        </div>

        <div style={{ padding: '1.4rem', position: 'relative', zIndex: 1 }}>
          <h3
            style={{
              fontFamily:    'var(--font-heading)',
              fontSize:      '1.1rem',
              fontWeight:    700,
              color:         'var(--text-primary)',
              marginBottom:  '0.5rem',
              letterSpacing: '-0.01em',
            }}
          >
            {event.title}
          </h3>
          <p
            style={{
              fontSize:      '0.875rem',
              color:         'var(--text-secondary)',
              lineHeight:    1.65,
              marginBottom:  '1rem',
              fontFamily:    'var(--font-body)',
            }}
          >
            {event.description}
          </p>

          <div
            style={{
              display:     'flex',
              gap:         '1rem',
              fontSize:    '0.78rem',
              color:       'var(--text-muted)',
              fontFamily:  'var(--font-body)',
              marginBottom: '1.2rem',
            }}
          >
            <span>📅 {new Date(event.date).toLocaleDateString()}</span>
            <span>🕐 {event.time}</span>
          </div>

          <Link to="/live-sessions" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ x: 4 }}
              style={{
                display:     'inline-flex',
                alignItems:  'center',
                gap:         '0.4rem',
                background:  'var(--accent-gradient)',
                color:       '#fff',
                border:      'none',
                borderRadius: '8px',
                padding:     '0.55rem 1.1rem',
                fontSize:    '0.83rem',
                fontWeight:  600,
                fontFamily:  'var(--font-body)',
                cursor:      'pointer',
                boxShadow:   '0 3px 14px var(--accent-glow)',
              }}
            >
              Register <span style={{ opacity: 0.85 }}>→</span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Main section ────────────────────────────────────────── */
const EventsSection = () => {
  const sectionRef   = useRef(null);
  const inView       = useInView(sectionRef, { once: true, margin: '-160px' });
  const triggered    = useRef(false);

  /* Animation phases:
     'idle'   → nothing shown
     'circle' → cards fly out into a spinning circular formation
     'grid'   → formation dissolves, cards appear in the normal grid
  */
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    if (!inView || triggered.current) return;
    triggered.current = true;

    setPhase('circle');
    /* After 2.4 s (appear + spin), transition to grid */
    const t = setTimeout(() => setPhase('grid'), 2400);
    return () => clearTimeout(t);
  }, [inView]);

  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      style={{
        padding:    'var(--section-pad) 0',
        background: 'var(--bg-secondary)',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      {/* Subtle top glow */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           '-60px',
          left:          '50%',
          transform:     'translateX(-50%)',
          width:         '600px',
          height:        '300px',
          background:    'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)',
          filter:        'blur(40px)',
          pointerEvents: 'none',
          zIndex:        0,
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin:   '0 auto',
          padding:  '0 2rem',
          position: 'relative',
          zIndex:   1,
        }}
      >
        {/* Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="section-badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            Events
          </span>
          <h2
            style={{
              fontFamily:    'var(--font-heading)',
              fontSize:      'clamp(1.9rem, 3.5vw, 2.8rem)',
              fontWeight:    800,
              letterSpacing: '-0.03em',
              color:         'var(--text-primary)',
            }}
          >
            Upcoming Events
          </h2>
        </motion.div>

        {/* ── Circular animation stage ─── */}
        <AnimatePresence>
          {phase === 'circle' && (
            <motion.div
              key="circle-stage"
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              style={{
                position:  'relative',
                height:    '420px',
                display:   'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: 'linear', delay: 0.5 }}
                style={{
                  position:  'absolute',
                  width:     '380px',
                  height:    '380px',
                  borderRadius: '50%',
                  border:    '1px dashed var(--border)',
                  opacity:   0.5,
                }}
              />

              {/* Centre pulse */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position:  'absolute',
                  width:     '60px',
                  height:    '60px',
                  borderRadius: '50%',
                  background: 'var(--accent-gradient)',
                  opacity:   0.3,
                  zIndex:    2,
                }}
              />

              {/* Cards orbiting */}
              {EVENTS.map((ev, i) => (
                <CircleCard
                  key={ev.id}
                  event={ev}
                  index={i}
                  total={EVENTS.length}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Real grid ─── */}
        {phase === 'grid' && (
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap:                 '1.4rem',
            }}
          >
            {EVENTS.map((ev, i) => (
              <EventCard key={ev.id} event={ev} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
