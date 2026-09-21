import data from '../../data/portfolio.json';
import { SectionHeader } from '../ui/index.jsx';
import { Icon } from '../ui/Icons.jsx';
import { useReveal } from '../../hooks/useReveal.js';

/* Icône par soft skill */
const SOFT_ICONS = {
  'autonomie':      'zap',
  'rigueur':        'checkCircle',
  'esprit critique':'layers',
};

function LangBar({ percent }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="ssl__lang-bar reveal">
      <div className="ssl__lang-fill" style={{ '--pct': `${percent}%` }} />
    </div>
  );
}

export default function SoftSkillsLanguages() {
  const { softSkills, languages } = data;
  const softRef = useReveal();
  const langRef = useReveal();
  if (!softSkills?.length && !languages?.length) return null;

  return (
    <section id="soft-skills">
      <div className="container">
        <SectionHeader eyebrow="Human skills" title="Soft Skills & Langues" />
        <div className="ssl__grid">

          {/* Soft Skills */}
          {softSkills?.length > 0 && (
            <div ref={softRef} className="ssl__block reveal">
              <h3 className="ssl__block-title">Soft Skills</h3>
              <div className="ssl__soft-list">
                {softSkills.map(s => {
                  const iconName = SOFT_ICONS[s.label.toLowerCase()] || 'star';
                  return (
                    <div key={s.id} className="ssl__soft-item">
                      <div className="ssl__soft-icon-wrap">
                        <Icon name={iconName} size={18} color="var(--accent)" strokeWidth={1.75} />
                      </div>
                      <span className="ssl__soft-label">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Langues */}
          {languages?.length > 0 && (
            <div ref={langRef} className="ssl__block reveal">
              <h3 className="ssl__block-title">Langues</h3>
              <div className="ssl__lang-list">
                {languages.map(lang => (
                  <div key={lang.id} className="ssl__lang-item">
                    <div className="ssl__lang-header">
                      <span className="ssl__lang-name">
                        <Icon name="globe" size={14} color="var(--accent)" style={{ marginRight: 8, verticalAlign: 'middle' }} />
                        {lang.name}
                      </span>
                      <span className="ssl__lang-level">{lang.level}</span>
                    </div>
                    <LangBar percent={lang.percent} />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        .ssl__grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 40px; }
        .ssl__block {
          background: var(--bg-surface); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 28px;
        }
        .ssl__block-title {
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 20px;
        }
        .ssl__soft-list { display: flex; flex-direction: column; gap: 12px; }
        .ssl__soft-item {
          display: flex; align-items: center; gap: 14px;
          padding: 12px 16px; background: var(--bg-raised);
          border: 1px solid var(--border); border-radius: var(--radius-md);
          transition: border-color var(--transition), transform var(--transition);
        }
        .ssl__soft-item:hover { border-color: var(--border-hover); transform: translateX(4px); }
        .ssl__soft-icon-wrap {
          width: 36px; height: 36px; border-radius: 8px;
          background: var(--accent-bg); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ssl__soft-label {
          font-family: var(--font-display); font-size: 15px;
          font-weight: 700; color: var(--text-primary);
        }
        .ssl__lang-list { display: flex; flex-direction: column; gap: 20px; }
        .ssl__lang-header {
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;
        }
        .ssl__lang-name {
          font-family: var(--font-display); font-size: 16px;
          font-weight: 700; color: var(--text-primary);
          display: flex; align-items: center;
        }
        .ssl__lang-level {
          font-family: var(--font-mono); font-size: 10px;
          color: var(--text-muted); letter-spacing: .06em;
        }
        .ssl__lang-bar {
          height: 5px; background: var(--bg-raised); border-radius: 3px;
          overflow: hidden; border: 1px solid var(--border);
        }
        .ssl__lang-fill {
          height: 100%; width: var(--pct); background: var(--accent);
          border-radius: 3px; transform: scaleX(0); transform-origin: left;
          transition: transform 1s var(--ease-out);
        }
        .ssl__lang-bar.is-visible .ssl__lang-fill { transform: scaleX(1); }
        @media (max-width: 640px) { .ssl__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
