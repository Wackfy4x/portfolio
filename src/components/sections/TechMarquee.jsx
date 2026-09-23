import { useEffect, useRef } from 'react';
import data from '../../data/portfolio.json';
import { prefersReducedMotion } from '../../hooks/useMotion.js';

/* Four-point spark used as a separator — drawn here rather than an emoji */
const Spark = () => (
  <svg className="band__spark" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z" />
  </svg>
);

/**
 * One scrolling band. Runs its own rAF loop only while on screen; the base
 * speed is boosted by how fast the page is being scrolled, and scrolling up
 * reverses it — the strip feels attached to the page instead of looping on
 * its own.
 */
function Band({ items, direction = 1, className }) {
  const bandRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const band = bandRef.current;
    const track = trackRef.current;
    if (!band || !track || prefersReducedMotion()) return;

    let x = 0, raf = 0, last = performance.now();
    let lastY = window.scrollY, velocity = 0, sign = 1;

    const loop = now => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (dy !== 0) sign = dy > 0 ? 1 : -1;
      velocity += (Math.abs(dy) * 18 - velocity) * 0.1;

      const half = track.scrollWidth / 2;
      x -= (60 + velocity) * dt * direction * sign;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) {
        last = performance.now();
        lastY = window.scrollY;
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(band);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [direction]);

  const row = items.map(name => (
    <span className="band__item" key={name}>{name}<Spark /></span>
  ));

  return (
    <div ref={bandRef} className={`band ${className}`}>
      <div ref={trackRef} className="band__track">
        <div className="band__group">{row}</div>
        <div className="band__group" aria-hidden="true">{row}</div>
      </div>
    </div>
  );
}

export default function TechMarquee() {
  const names = data.skills.map(s => s.name);
  const half = Math.ceil(names.length / 2);

  return (
    <div className="bands" aria-label="Technologies utilisées">
      <Band className="band--back" items={[...names.slice(half), ...names.slice(0, half)]} direction={-1} />
      <Band className="band--front" items={names} direction={1} />

      <style>{`
        .bands { position: relative; padding: 70px 0; overflow: hidden; }
        .band {
          position: relative; left: -5%; width: 110%;
          overflow: hidden; padding: 20px 0;
        }
        .band--front {
          background: var(--accent); color: #fff;
          transform: rotate(-3deg);
          z-index: 1;
        }
        .band--back {
          position: absolute; top: 50%;
          margin-top: -30px;
          background: var(--text-primary); color: #fff;
          transform: rotate(4deg);
        }
        .band__track { display: flex; width: max-content; will-change: transform; }
        .band__group { display: flex; }
        .band__item {
          display: inline-flex; align-items: center; gap: 30px;
          padding-right: 30px; white-space: nowrap;
          font-weight: 600; letter-spacing: -0.03em;
        }
        .band--front .band__item { font-size: clamp(24px, 3.2vw, 40px); }
        .band--back .band__item {
          font-family: var(--font-mono); font-weight: 400;
          font-size: 14px; letter-spacing: 0.04em; text-transform: uppercase;
        }
        .band__spark { width: 0.7em; height: 0.7em; fill: currentColor; opacity: 0.85; }
        .band--back .band__spark { fill: var(--accent); opacity: 1; }

        @media (prefers-reduced-motion: reduce) {
          .band { overflow-x: auto; }
        }
      `}</style>
    </div>
  );
}
