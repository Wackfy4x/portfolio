import { useEffect, useState, useRef } from 'react';
import { Icon } from '../ui/Icons.jsx';

const R = 20;
const CIRC = 2 * Math.PI * R;

/* Back-to-top button whose ring doubles as the page scroll progress */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(y > window.innerHeight * 0.8);
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = CIRC * (1 - (max > 0 ? y / max : 0));
      }
      ticking.current = false;
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`scroll-top${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Remonter en haut de la page"
      tabIndex={visible ? 0 : -1}
    >
      <svg className="scroll-top__ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={R} />
        <circle ref={ringRef} cx="24" cy="24" r={R} strokeDasharray={CIRC} strokeDashoffset={CIRC} />
      </svg>
      <Icon name="chevronUp" size={18} strokeWidth={2} />

      <style>{`
        .scroll-top {
          position: fixed; bottom: 24px; right: 24px; z-index: 90;
          width: 56px; height: 56px; border-radius: 50%;
          display: grid; place-items: center;
          background: var(--glass-strong); color: var(--text-primary);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px -12px rgba(15, 23, 42, 0.3);
          opacity: 0; transform: translateY(16px) scale(0.8); pointer-events: none;
          transition: opacity 0.4s var(--ease-out), transform 0.5s var(--ease-out), background var(--transition), color var(--transition);
        }
        .scroll-top.visible { opacity: 1; transform: none; pointer-events: auto; }
        .scroll-top:hover { background: var(--accent); color: #fff; }
        .scroll-top > svg:last-child { grid-area: 1 / 1; transition: transform 0.4s var(--ease-out); }
        .scroll-top:hover > svg:last-child { transform: translateY(-3px); }
        .scroll-top__ring { grid-area: 1 / 1; width: 100%; height: 100%; transform: rotate(-90deg); }
        .scroll-top__ring circle { fill: none; stroke-width: 2; }
        .scroll-top__ring circle:first-child { stroke: var(--border); }
        .scroll-top__ring circle:last-child { stroke: var(--accent); stroke-linecap: round; }
        .scroll-top:hover .scroll-top__ring circle:last-child { stroke: #fff; }
        @media (max-width: 640px) {
          .scroll-top { bottom: 16px; right: 16px; width: 48px; height: 48px; }
        }
      `}</style>
    </button>
  );
}
