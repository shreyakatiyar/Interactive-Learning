import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [tabindex]';

const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const raf     = useRef(null);

  useEffect(() => {
    /* Only on pointer-capable devices */
    if (window.matchMedia('(hover: none)').matches) return;

    const dot  = dotRef.current;
    const rng  = ringRef.current;
    if (!dot || !rng) return;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => dot.classList.add('clicking');
    const onUp   = () => dot.classList.remove('clicking');

    const addHoverListeners = () => {
      document.querySelectorAll(INTERACTIVE).forEach(el => {
        el.addEventListener('mouseenter', () => {
          dot.classList.add('hovering');
          rng.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
          dot.classList.remove('hovering');
          rng.classList.remove('hovering');
        });
      });
    };

    const tick = () => {
      /* Dot follows instantly */
      dot.style.left = mouse.current.x + 'px';
      dot.style.top  = mouse.current.y + 'px';

      /* Ring lerps behind */
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);
      rng.style.left = ring.current.x + 'px';
      rng.style.top  = ring.current.y + 'px';

      raf.current = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);
    addHoverListeners();
    raf.current = requestAnimationFrame(tick);

    /* Re-attach listeners when DOM changes (SPA navigation) */
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
