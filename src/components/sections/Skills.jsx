import { useState } from 'react';
import data from '../../data/portfolio.json';
import { SectionHeader } from '../ui/index.jsx';
import { TechIcon } from '../ui/Icons.jsx';
import { useReveal } from '../../hooks/useReveal.js';

function SkillCard({ skill, index }) {
  return (
    <div className="skill-card" style={{ '--i': index }}>
      <div className="skill-card__icon-wrap">
        <TechIcon name={skill.name} size={32} />
      </div>
      <div className="skill-card__info">
        <span className="skill-card__name">{skill.name}</span>
        <span className="skill-card__category">{skill.category}</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const { skills } = data;
  const categories = ['Tous', ...new Set(skills.map(s => s.category))];
  const [activeCategory, setActiveCategory] = useState('Tous');
  const filtered = activeCategory === 'Tous'
    ? skills
    : skills.filter(s => s.category === activeCategory);
  const gridRef = useReveal();

  return (
    <section id="skills">
      <div className="container">
        <SectionHeader
          eyebrow="Skills"
          title="Compétences"
          subtitle="Technologies que je maîtrise et utilise au quotidien."
        />
        <div className="skills__filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn btn-ghost${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div ref={gridRef} className="skills__grid reveal-stagger">
          {filtered.map((skill, i) => <SkillCard key={skill.id} skill={skill} index={i} />)}
        </div>
      </div>

      <style>{`
        .skills__filters {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }
        .skills__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 14px;
        }
        .skill-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
          transition: border-color var(--transition), transform var(--transition);
          cursor: default;
        }
        .skill-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-4px);
        }
        .skill-card__icon-wrap {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-raised);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          padding: 8px;
          transition: border-color var(--transition);
        }
        .skill-card:hover .skill-card__icon-wrap {
          border-color: var(--border-hover);
        }
        .skill-card__info { width: 100%; }
        .skill-card__name {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 4px;
        }
        .skill-card__category {
          display: block;
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
      `}</style>
    </section>
  );
}
