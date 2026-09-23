import data from '../../data/portfolio.json';
import { SectionHeader } from '../ui/index.jsx';
import { TechIcon } from '../ui/Icons.jsx';
import { useReveal } from '../../hooks/useReveal.js';

function SkillRow({ category, skills, index }) {
  const ref = useReveal();
  return (
    <li ref={ref} className="skill-row">
      <div className="skill-row__head">
        <span className="skill-row__num">0{index + 1}</span>
        <h3 className="skill-row__title">{category}</h3>
      </div>
      <ul className="skill-row__chips">
        {skills.map((skill, i) => (
          <li key={skill.id} className="skill-chip" style={{ '--i': i }}>
            <span className="skill-chip__icon"><TechIcon name={skill.name} size={20} /></span>
            {skill.name}
          </li>
        ))}
      </ul>
      <span className="skill-row__count">{String(skills.length).padStart(2, '0')}</span>
    </li>
  );
}

export default function Skills() {
  const { skills } = data;
  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <SectionHeader
          index="02"
          label="Compétences"
          title="Ma *boîte* à outils."
          subtitle="Du backend au déploiement, en passant par la donnée et les modèles d'IA."
        />
        <ul className="skills__rows">
          {categories.map((cat, i) => (
            <SkillRow key={cat} category={cat} index={i} skills={skills.filter(s => s.category === cat)} />
          ))}
        </ul>
      </div>

      <style>{`
        .skills { background: var(--bg-surface); }
        .skills__rows { border-top: 1px solid var(--text-primary); }
        .skill-row {
          position: relative;
          display: grid; grid-template-columns: 280px 1fr 48px;
          gap: 32px; align-items: center;
          padding: 30px 0; border-bottom: 1px solid var(--border-hover);
        }
        .skill-row::before {
          content: ''; position: absolute; left: 0; bottom: -1px;
          width: 100%; height: 1px; background: var(--accent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.8s var(--ease-out);
        }
        .skill-row:hover::before { transform: scaleX(1); }

        .skill-row__head { display: flex; align-items: baseline; gap: 14px; }
        .skill-row__num { font-family: var(--font-mono); font-size: 12px; color: var(--accent); }
        .skill-row__title {
          font-size: clamp(26px, 3vw, 38px); font-weight: 600;
          letter-spacing: -0.04em; line-height: 1;
          transition: transform 0.6s var(--ease-out);
        }
        .skill-row:hover .skill-row__title { transform: translateX(10px); }
        .skill-row__count {
          font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); text-align: right;
        }

        .skill-row__chips { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill-chip {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 6px 16px 6px 6px; border-radius: 999px;
          background: var(--bg-base); border: 1px solid var(--border);
          font-size: 15px; font-weight: 500; cursor: default;
          opacity: 0; transform: translateY(16px) scale(0.92);
          transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out),
                      background var(--transition), color var(--transition), border-color var(--transition);
          transition-delay: calc(var(--i) * 45ms), calc(var(--i) * 45ms), 0s, 0s, 0s;
        }
        .skill-row.is-visible .skill-chip { opacity: 1; transform: none; }
        .skill-row.is-visible .skill-chip:hover {
          background: var(--text-primary); color: #fff; border-color: var(--text-primary);
          transform: translateY(-3px) rotate(-3deg);
          transition-delay: 0s;
        }
        .skill-chip__icon {
          width: 32px; height: 32px; border-radius: 50%;
          display: grid; place-items: center; background: var(--bg-raised);
          transition: transform 0.6s var(--ease-out), background var(--transition);
        }
        .skill-chip:hover .skill-chip__icon { transform: rotate(360deg); background: #fff; }

        @media (max-width: 900px) {
          .skill-row { grid-template-columns: 1fr auto; gap: 20px; }
          .skill-row__chips { grid-column: 1 / -1; grid-row: 2; }
          .skill-row__count { grid-row: 1; grid-column: 2; }
        }
        @media (prefers-reduced-motion: reduce) {
          .skill-chip { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
