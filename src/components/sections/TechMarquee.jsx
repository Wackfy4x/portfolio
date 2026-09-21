import data from '../../data/portfolio.json';
import { TechIcon } from '../ui/Icons.jsx';

/**
 * Auto-scrolling tech strip. Pure CSS transform animation (GPU-composited,
 * no JS loop) — the track is duplicated once so the loop is seamless, and
 * it pauses on hover/focus so it never fights a reader trying to look
 * closely. Respects prefers-reduced-motion globally (see globals.css).
 */
export default function TechMarquee() {
  const skills = data.skills;
  const track = [...skills, ...skills];

  return (
    <div className="tech-marquee" aria-hidden="true">
      <div className="tech-marquee__viewport">
        <div className="tech-marquee__track">
          {track.map((s, i) => (
            <span className="tech-marquee__item" key={`${s.id}-${i}`}>
              <TechIcon name={s.name} size={20} />
              {s.name}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .tech-marquee {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: var(--bg-surface);
          padding: 22px 0;
        }
        .tech-marquee__viewport { overflow: hidden; -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent); mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent); }
        .tech-marquee__track {
          display: flex; width: max-content;
          animation: marquee 42s linear infinite;
        }
        .tech-marquee:hover .tech-marquee__track,
        .tech-marquee:focus-within .tech-marquee__track { animation-play-state: paused; }
        .tech-marquee__item {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 0 28px; white-space: nowrap;
          font-family: var(--font-mono); font-size: 12px;
          letter-spacing: 0.03em; color: var(--text-secondary);
          border-right: 1px solid var(--border);
        }

        @media (prefers-reduced-motion: reduce) {
          .tech-marquee__viewport { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
          .tech-marquee__track { animation: none; }
        }
      `}</style>
    </div>
  );
}
