import { useEffect, useRef, useState } from 'react';
import data from '../../data/portfolio.json';
import { SectionHeader } from '../ui/index.jsx';
import { Icon } from '../ui/Icons.jsx';
import { useReveal } from '../../hooks/useReveal.js';
import { hasFinePointer, prefersReducedMotion } from '../../hooks/useMotion.js';
import ProjectModal from './ProjectModal.jsx';
import ProjectCover from './ProjectCover.jsx';

/**
 * Floating preview that trails the pointer over the list. All covers are
 * stacked in one column and the column slides to the hovered project, so
 * moving between rows scrolls the preview rather than swapping it.
 */
function HoverPreview({ projects, active, listRef }) {
  const boxRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    const box = boxRef.current;
    if (!list || !box || !hasFinePointer()) return;

    const reduced = prefersReducedMotion();
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;

    const loop = () => {
      x += (tx - x) * (reduced ? 1 : 0.14);
      y += (ty - y) * (reduced ? 1 : 0.14);
      const tilt = reduced ? 0 : Math.max(-8, Math.min(8, (tx - x) * 0.05));
      box.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg)`;
      raf = requestAnimationFrame(loop);
    };
    const move = e => { tx = e.clientX + 32; ty = e.clientY - 120; };
    const enter = e => {
      move(e);
      x = tx; y = ty;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };
    const leave = () => cancelAnimationFrame(raf);

    list.addEventListener('pointermove', move);
    list.addEventListener('pointerenter', enter);
    list.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      list.removeEventListener('pointermove', move);
      list.removeEventListener('pointerenter', enter);
      list.removeEventListener('pointerleave', leave);
    };
  }, [listRef]);

  return (
    <div ref={boxRef} className={`pv${active >= 0 ? ' pv--on' : ''}`} aria-hidden="true">
      <div className="pv__inner">
        <div className="pv__track" style={{ transform: `translateY(${-Math.max(active, 0) * 100}%)` }}>
          {projects.map((p, i) => (
            <div key={p.id} className="pv__slide"><ProjectCover project={p} index={i} /></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { projects } = data;
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(null);
  const listRef = useRef(null);
  const revealRef = useReveal();

  const setRefs = el => { listRef.current = el; revealRef.current = el; };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <SectionHeader
          index="03"
          label="Projets"
          title="Ce que j'ai *construit.*"
          subtitle="Hackathons, projets d'équipe et missions en entreprise. Cliquez sur un projet pour le détail."
        />

        <ol ref={setRefs} className="plist reveal-stagger" onPointerLeave={() => setActive(-1)}>
          {projects.map((p, i) => (
            <li key={p.id} style={{ '--i': i }}>
              <button
                className="prow"
                onClick={() => setOpen({ project: p, index: i })}
                onPointerEnter={e => e.pointerType === 'mouse' && setActive(i)}
              >
                <span className="prow__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="prow__title">{p.title}</span>
                <span className="prow__tags">{p.tags.slice(0, 3).join(' · ')}</span>
                <span className="prow__arrow"><Icon name="arrowUpRight" size={22} /></span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <HoverPreview projects={projects} active={active} listRef={listRef} />

      {open && (
        <ProjectModal project={open.project} index={open.index} onClose={() => setOpen(null)} />
      )}

      <style>{`
        .plist { border-top: 1px solid var(--text-primary); }
        .prow {
          position: relative; isolation: isolate;
          width: 100%; text-align: left;
          display: grid; grid-template-columns: 70px 1fr 280px 48px;
          align-items: center; gap: 24px;
          padding: 30px 12px; border-bottom: 1px solid var(--border-hover);
          transition: color 0.4s var(--ease-out);
        }
        .prow::before {
          content: ''; position: absolute; inset: 0; z-index: -1;
          background: var(--accent);
          transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.5s var(--ease-out);
        }
        .prow:hover, .prow:focus-visible { color: #fff; outline: none; }
        .prow:hover::before, .prow:focus-visible::before { transform: scaleY(1); transform-origin: top; }

        .prow__num { font-family: var(--font-mono); font-size: 13px; color: var(--accent); transition: color 0.4s; }
        .prow:hover .prow__num, .prow:focus-visible .prow__num { color: #fff; }
        .prow__title {
          font-size: clamp(22px, 3vw, 40px); font-weight: 600;
          letter-spacing: -0.04em; line-height: 1.05;
          transition: transform 0.6s var(--ease-out);
        }
        .prow:hover .prow__title { transform: translateX(16px); }
        .prow__tags { font-family: var(--font-mono); font-size: 12px; opacity: 0.75; }
        .prow__arrow {
          width: 48px; height: 48px; border-radius: 50%;
          display: grid; place-items: center;
          border: 1px solid currentColor;
          transition: transform 0.6s var(--ease-out), background 0.3s, color 0.3s;
        }
        .prow:hover .prow__arrow { transform: rotate(45deg); background: #fff; color: var(--accent); }

        .pv {
          position: fixed; left: 0; top: 0; z-index: 50;
          width: 340px; height: 240px;
          pointer-events: none;
        }
        .pv__inner {
          width: 100%; height: 100%; overflow: hidden;
          border-radius: var(--radius-lg);
          box-shadow: 0 0 0 6px #fff, 0 30px 60px -20px rgba(15, 23, 42, 0.45);
          transform: scale(0); opacity: 0;
          transition: transform 0.5s var(--ease-out), opacity 0.3s;
        }
        .pv--on .pv__inner { transform: scale(1); opacity: 1; }
        .pv__track { height: 100%; transition: transform 0.7s var(--ease-io); }
        .pv__slide { height: 100%; }
        @media (hover: none), (pointer: coarse) { .pv { display: none; } }

        @media (max-width: 900px) {
          .prow { grid-template-columns: 44px 1fr 44px; gap: 14px; padding: 24px 4px; }
          .prow__tags { grid-column: 2; grid-row: 2; }
          .prow__arrow { grid-column: 3; grid-row: 1 / span 2; width: 40px; height: 40px; }
          .prow:hover .prow__title { transform: none; }
        }
      `}</style>
    </section>
  );
}
