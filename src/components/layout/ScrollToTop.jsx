import { useEffect, useState, useRef } from 'react';
import { Icon } from '../ui/Icons.jsx';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.8);
        ticking.current = false;
      });
    };
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
      <Icon name="chevronUp" size={16} />

      <style>{`
        .scroll-top {
          position: fixed; bottom: 24px; right: 24px; z-index: 90;
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: var(--bg-surface); border: 1px solid var(--border);
          color: var(--text-secondary);
          opacity: 0; transform: translateY(10px) scale(0.9);
          pointer-events: none;
          transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out),
                      border-color var(--transition), color var(--transition);
        }
        .scroll-top.visible { opacity: 1; transform: none; pointer-events: auto; }
        .scroll-top:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
        @media (max-width: 640px) {
          .scroll-top { bottom: 16px; right: 16px; width: 40px; height: 40px; }
        }
      `}</style>
    </button>
  );
}
