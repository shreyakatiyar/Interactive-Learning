import React, { useContext, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataContext';
import { motion, useInView } from 'framer-motion';

/* ── 3-D tilt card with mouse-spotlight ─────────────────── */
const CourseCard = ({ course, index }) => {
  const cardRef  = useRef(null);
  const [tilt,   setTilt]   = useState({ x: 0, y: 0 });
  const [spot,   setSpot]   = useState({ x: 0, y: 0, on: false });

  const inView = useInView(cardRef, { once: true, margin: '-60px' });

  const onMove = useCallback((e) => {
    const r  = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - r.left)  / r.width;   // 0 → 1
    const ny = (e.clientY - r.top)   / r.height;
    setTilt({ x: (ny - 0.5) * -14, y: (nx - 0.5) * 14 });
    setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  }, []);

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setSpot(s => ({ ...s, on: false }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 44, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{
          background:     'var(--bg-card)',
          border:         '1px solid var(--border)',
          borderRadius:   '14px',
          padding:        '1.6rem',
          height:         '100%',
          display:        'flex',
          flexDirection:  'column',
          gap:            '0.7rem',
          boxShadow:      'var(--shadow-card)',
          position:       'relative',
          overflow:       'hidden',
          transformStyle: 'preserve-3d',
          transition:     'border-color 0.3s ease, box-shadow 0.3s ease',
          cursor:         'default',
        }}
      >
        {/* Mouse spotlight */}
        {spot.on && (
          <div
            aria-hidden="true"
            style={{
              position:   'absolute',
              width:      '220px',
              height:     '220px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 68%)',
              top:        spot.y - 110,
              left:       spot.x - 110,
              pointerEvents: 'none',
              zIndex:     0,
              opacity:    0.9,
            }}
          />
        )}

        {/* Top accent line */}
        <div
          aria-hidden="true"
          style={{
            position:     'absolute',
            top:          0,
            left:         '1.6rem',
            right:        '1.6rem',
            height:       '2px',
            background:   'var(--accent-gradient)',
            borderRadius: '0 0 2px 2px',
            opacity:      0.6,
          }}
        />

        {/* Course number */}
        <span
          style={{
            fontFamily:    'var(--font-heading)',
            fontSize:      '0.7rem',
            fontWeight:    700,
            color:         'var(--accent)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity:       0.7,
            position:      'relative',
            zIndex:        1,
          }}
        >
          Course {String(index + 1).padStart(2, '0')}
        </span>

        <h3
          style={{
            fontFamily:    'var(--font-heading)',
            fontSize:      '1.05rem',
            fontWeight:    700,
            color:         'var(--text-primary)',
            lineHeight:    1.3,
            letterSpacing: '-0.01em',
            position:      'relative',
            zIndex:        1,
          }}
        >
          {course.title}
        </h3>

        <p
          style={{
            fontSize:   '0.87rem',
            color:      'var(--text-secondary)',
            lineHeight: 1.65,
            flexGrow:   1,
            fontFamily: 'var(--font-body)',
            position:   'relative',
            zIndex:     1,
          }}
        >
          {course.description}
        </p>

        <Link to={`/courses/${course.id}`} style={{ textDecoration: 'none', position: 'relative', zIndex: 1 }}>
          <motion.button
            whileHover={{ x: 5, borderColor: 'var(--border-hover)' }}
            transition={{ duration: 0.18 }}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '0.4rem',
              background:     'transparent',
              border:         '1px solid var(--border)',
              borderRadius:   '8px',
              padding:        '0.48rem 1rem',
              color:          'var(--accent)',
              fontFamily:     'var(--font-body)',
              fontSize:       '0.83rem',
              fontWeight:     500,
              cursor:         'pointer',
              outline:        'none',
              transition:     'border-color 0.2s, background 0.2s',
            }}
          >
            View Details <span style={{ opacity: 0.7, fontSize: '1rem' }}>→</span>
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

/* ── Section ─────────────────────────────────────────────── */
const CoursesSection = () => {
  const { courses } = useContext(DataContext);
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section
      style={{
        padding:    'var(--section-pad) 0',
        background: 'var(--bg-primary)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="section-badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            Curriculum
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
            All Courses
          </h2>
          <p
            style={{
              marginTop:  '0.85rem',
              color:      'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
              fontSize:   '1rem',
              maxWidth:   '480px',
              margin:     '0.85rem auto 0',
            }}
          >
            Explore our full curriculum — from fundamentals to advanced techniques.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display:               'grid',
            gridTemplateColumns:   'repeat(auto-fill, minmax(290px, 1fr))',
            gap:                   '1.2rem',
          }}
        >
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
