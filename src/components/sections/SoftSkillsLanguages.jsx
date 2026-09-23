import { useState } from 'react';
import data from '../../data/portfolio.json';
import { SectionHeader } from '../ui/index.jsx';
import { useReveal, useRevealOnce } from '../../hooks/useReveal.js';

const R = 52;
const CIRC = 2 * Math.PI * R;

/* Ring fills to the language level once, when it scrolls into view */
function LangRing({ lang, index }) {
  const [shown, setShown] = useState(false);
  const ref = useRevealOnce(() => setShown(true));
  const offset = shown ? CIRC * (1 - lang.percent / 100) : CIRC;

  return (
    <div ref={ref} className="lang" style={{ '--i': index }}>
      <div className="lang__ring">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r={R} className="lang__track" />
          <circle cx="60" cy="60" r={R} className="lang__fill"
            strokeDasharray={CIRC} strokeDashoffset={offset} />
        </svg>
        <span className="lang__pct">{lang.percent}<small>%</small></span>
      </div>
      <div>
        <p className="lang__name">{lang.name}</p>
        <p className="lang__level">{lang.level}</p>
      </div>
    </div>
  );
}

export default function SoftSkillsLanguages() {
  const { softSkills, languages } = data;
  const wordsRef = useReveal();
  if (!softSkills?.length && !languages?.length) return null;

  return (
    <section id="soft-skills" className="ssl">
      <div className="container">
        <SectionHeader index="08" label="Savoir-être & langues" title="Au-delà du *code.*" />

        <div className="ssl__grid">
          {softSkills?.length > 0 && (
            <ul ref={wordsRef} className="ssl__words reveal-stagger" aria-label="Soft skills">
              {softSkills.map((s, i) => (
                <li key={s.id} className="ssl__word" style={{ '--i': i }}>
                  <span className="ssl__word-num">0{i + 1}</span>
                  <span className="ssl__word-text">{s.label}</span>
                </li>
              ))}
            </ul>
          )}

          {languages?.length > 0 && (
            <div className="ssl__langs">
              {languages.map((lang, i) => <LangRing key={lang.id} lang={lang} index={i} />)}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .ssl { background: var(--bg-surface); }
        .ssl__grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 64px; align-items: center; }

        .ssl__word {
          display: flex; align-items: baseline; gap: 18px;
          padding: 10px 0; border-bottom: 1px solid var(--border-hover);
          cursor: default;
        }
        .ssl__word-num { font-family: var(--font-mono); font-size: 12px; color: var(--accent); }
        .ssl__word-text {
          font-size: clamp(40px, 6vw, 84px); font-weight: 700;
          letter-spacing: -0.045em; line-height: 1;
          transition: transform 0.6s var(--ease-out), color 0.3s;
        }
        .ssl__word:nth-child(even) .ssl__word-text {
          font-family: var(--font-serif); font-style: italic; font-weight: 400; letter-spacing: -0.02em;
        }
        .ssl__word:hover .ssl__word-text { transform: translateX(20px) skewX(-6deg); color: var(--accent); }

        .ssl__langs { display: flex; flex-direction: column; gap: 28px; }
        .lang {
          display: flex; align-items: center; gap: 24px;
          padding: 24px; border-radius: var(--radius-xl);
          background: var(--bg-base); border: 1px solid var(--border);
        }
        .lang__ring { position: relative; width: 112px; height: 112px; flex-shrink: 0; }
        .lang__ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
        .lang__track { fill: none; stroke: var(--bg-raised); stroke-width: 8; }
        .lang__fill {
          fill: none; stroke: var(--accent); stroke-width: 8; stroke-linecap: round;
          transition: stroke-dashoffset 1.6s var(--ease-out);
          transition-delay: calc(var(--i) * 0.2s);
        }
        .lang__pct {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; font-weight: 700; letter-spacing: -0.04em;
        }
        .lang__pct small { font-size: 14px; font-weight: 500; }
        .lang__name { font-size: 28px; font-weight: 700; letter-spacing: -0.04em; line-height: 1.1; }
        .lang__level { font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary); margin-top: 6px; }

        @media (max-width: 900px) {
          .ssl__grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 480px) {
          .lang { padding: 18px; gap: 18px; }
          .lang__ring { width: 88px; height: 88px; }
          .lang__pct { font-size: 22px; }
        }
      `}</style>
    </section>
  );
}
