import { Fragment } from 'react';
import data from '../../data/portfolio.json';
import { SectionHeader, TagList, CircleText } from '../ui/index.jsx';
import { Icon } from '../ui/Icons.jsx';
import { useReveal } from '../../hooks/useReveal.js';
import { useScrollFrame, useTilt, clamp } from '../../hooks/useMotion.js';

/* ── Experience — cards pile up on each other while scrolling ── */
function Phases({ phases }) {
  const ref = useReveal();
  return (
    <ol ref={ref} className="xp-phases">
      {phases.map((label, i) => (
        <li key={label} className="xp-phases__step" style={{ '--i': i }}>
          <span className="xp-phases__dot" />
          {label}
        </li>
      ))}
    </ol>
  );
}

function ExperienceCard({ exp, index, total }) {
  return (
    <article className={`xp-card${exp.current ? ' xp-card--current' : ''}`}>
      <div className="xp-card__top">
        <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <span className="xp-card__type">{exp.type}</span>
        {exp.current && <span className="xp-card__now"><span />En cours</span>}
      </div>

      <div className="xp-card__body">
        <div className="xp-card__side">
          <p className="xp-card__period">{exp.period}</p>
          {exp.location && (
            <p className="xp-card__location"><Icon name="mapPin" size={13} /> {exp.location}</p>
          )}
        </div>
        <div className="xp-card__main">
          <h3 className="xp-card__title">{exp.title}</h3>
          <p className="xp-card__company">{exp.company}</p>
          {exp.phases?.length > 0 && <Phases phases={exp.phases} />}
          <p className="xp-card__desc">{exp.description}</p>
          <TagList tags={exp.tags} />
        </div>
      </div>
    </article>
  );
}

export function Experience() {
  const { experiences } = data;

  /* Each card shrinks and fades back as the next one slides over it */
  const stackRef = useScrollFrame(el => {
    const slots = el.children;
    for (let i = 0; i < slots.length - 1; i++) {
      const cur = slots[i].getBoundingClientRect();
      const next = slots[i + 1].getBoundingClientRect();
      const p = clamp(1 - (next.top - cur.top) / cur.height);
      const card = slots[i].firstElementChild;
      card.style.transform = `scale(${1 - p * 0.06})`;
      card.style.setProperty('--dim', (p * 0.3).toFixed(3));
    }
  });

  return (
    <section id="experience" className="xp">
      <div className="container">
        <SectionHeader
          index="04"
          label="Expérience"
          title="Mon parcours *pro.*"
          subtitle="Stages, missions et alternance : là où j'ai appris à livrer."
        />
        <div ref={stackRef} className="xp__stack">
          {experiences.map((exp, i) => (
            <div key={exp.id} className="xp__slot" style={{ '--i': i }}>
              <ExperienceCard exp={exp} index={i} total={experiences.length} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .xp__slot {
          position: sticky; top: calc(100px + var(--i) * 24px);
          padding-bottom: 32px;
        }
        .xp__slot:last-child { padding-bottom: 0; }
        .xp-card {
          --dim: 0;
          position: relative; overflow: hidden;
          min-height: 380px;
          padding: 32px 40px 40px;
          border-radius: var(--radius-xl);
          background: var(--bg-surface); border: 1px solid var(--border);
          transform-origin: center top;
          display: flex; flex-direction: column; gap: 40px;
        }
        .xp-card::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: var(--text-primary); opacity: var(--dim);
        }
        .xp-card--current { background: var(--accent); color: #fff; border-color: var(--accent); }

        .xp-card__top {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
          font-family: var(--font-mono); font-size: 12px;
          padding-bottom: 20px; border-bottom: 1px solid var(--border-hover);
        }
        .xp-card--current .xp-card__top { border-color: rgba(255,255,255,0.3); }
        .xp-card__type { padding: 4px 12px; border-radius: 999px; border: 1px solid currentColor; }
        .xp-card__now {
          display: inline-flex; align-items: center; gap: 8px; margin-left: auto;
          padding: 4px 12px; border-radius: 999px; background: #fff; color: var(--accent);
        }
        .xp-card__now span { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: pulse-ring 2s infinite; }

        .xp-card__body { display: grid; grid-template-columns: 260px 1fr; gap: 40px; }
        .xp-card__period { font-size: 20px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.25; }
        .xp-card__location {
          display: flex; align-items: center; gap: 6px; margin-top: 10px;
          font-family: var(--font-mono); font-size: 12px; opacity: 0.7;
        }
        .xp-card__title { font-size: clamp(28px, 3.4vw, 46px); font-weight: 700; letter-spacing: -0.045em; line-height: 1; }
        .xp-card__company {
          margin: 10px 0 22px;
          font-family: var(--font-serif); font-style: italic; font-size: clamp(22px, 2.2vw, 30px);
          color: var(--accent); line-height: 1.1;
        }
        .xp-card--current .xp-card__company { color: #fff; }
        .xp-card__desc { font-size: 16px; line-height: 1.7; max-width: 640px; margin-bottom: 20px; opacity: 0.85; }
        .xp-card--current .tag { color: #fff; border-color: rgba(255,255,255,0.5); }

        .xp-phases {
          position: relative; display: flex; gap: 0; margin-bottom: 22px;
          font-family: var(--font-mono); font-size: 12px;
        }
        .xp-phases__step {
          position: relative; flex: 1;
          display: flex; flex-direction: column; gap: 10px;
          padding-top: 0; opacity: 0; transform: translateX(-12px);
          transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
          transition-delay: calc(0.2s + var(--i) * 0.5s);
        }
        .xp-phases__step:not(:last-child)::after {
          content: ''; position: absolute; left: 14px; right: 8px; top: 6px;
          height: 2px; background: currentColor; opacity: 0.5;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.6s var(--ease-out) 0.45s;
        }
        .xp-phases__dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid currentColor; }
        .xp-phases__step:last-child .xp-phases__dot { background: currentColor; }
        .xp-phases.is-visible .xp-phases__step { opacity: 1; transform: none; }
        .xp-phases.is-visible .xp-phases__step::after { transform: scaleX(1); }

        @media (max-width: 800px) {
          .xp__slot { position: relative; top: 0; }
          .xp-card { padding: 24px 20px 28px; min-height: 0; gap: 24px; }
          .xp-card__body { grid-template-columns: 1fr; gap: 16px; }
          .xp-card__now { margin-left: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .xp-phases__step { opacity: 1 !important; transform: none !important; }
          .xp-phases__step::after { transform: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Formations — two engineering cycles joined into one double degree ── */
function EduCard({ f, index }) {
  const ref = useReveal();
  return (
    <article ref={ref} className="edu-card reveal" style={{ transitionDelay: `${index * 0.15}s` }}>
      <div className="edu-card__head">
        <span className="edu-card__cycle">Cycle {index + 1}</span>
        <span className="edu-card__country">{f.country || f.location}</span>
      </div>
      <h3 className="edu-card__school">{f.school}</h3>
      <p className="edu-card__degree">{f.degree}</p>
      <p className="edu-card__meta">
        <Icon name="calendar" size={13} /> {f.period}
        <span>·</span>
        <Icon name="mapPin" size={13} /> {f.location}
      </p>
      <p className="edu-card__desc">{f.description}</p>
      <TagList tags={f.tags} />
    </article>
  );
}

export function Formations() {
  const { formations, education } = data;
  const linkRef = useReveal();

  return (
    <section id="formations" className="edu">
      <div className="container">
        <SectionHeader
          index="06"
          label="Formation"
          title="Double *diplôme* d'ingénieur."
          subtitle={education?.summary}
        />
        <div className="edu__grid">
          {formations.map((f, i) => (
            <Fragment key={f.id}>
              {i > 0 && (
                <div ref={i === 1 ? linkRef : undefined} className="edu__link" aria-hidden="true">
                  <CircleText text="Double diplôme · Ingénieur · " size={112} className="edu__badge">
                    <span className="edu__badge-core">×2</span>
                  </CircleText>
                </div>
              )}
              <EduCard f={f} index={i} />
            </Fragment>
          ))}
        </div>
      </div>

      <style>{`
        .edu__grid { display: grid; grid-template-columns: 1fr auto 1fr; align-items: stretch; }
        .edu-card {
          display: flex; flex-direction: column; gap: 14px;
          padding: 36px; border-radius: var(--radius-xl);
          border: 1px solid var(--border-hover); background: var(--bg-base);
          transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out), border-color var(--transition);
        }
        .edu-card:hover { border-color: var(--accent); }
        .edu-card__head { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 12px; }
        .edu-card__cycle { color: var(--accent); }
        .edu-card__country { color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.08em; }
        .edu-card__school { font-size: clamp(30px, 3.4vw, 48px); font-weight: 700; letter-spacing: -0.05em; line-height: 1; margin-top: 16px; }
        .edu-card__degree { font-family: var(--font-serif); font-style: italic; font-size: 22px; line-height: 1.2; color: var(--accent); }
        .edu-card__meta {
          display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
          font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary);
        }
        .edu-card__desc { font-size: 15px; line-height: 1.7; color: var(--text-secondary); flex: 1; }

        .edu__link {
          position: relative; width: 140px;
          display: flex; align-items: center; justify-content: center;
        }
        .edu__link::before {
          content: ''; position: absolute; left: 0; right: 0; top: 50%;
          border-top: 2px dashed var(--accent);
          transform: scaleX(0); transition: transform 1s var(--ease-out) 0.3s;
        }
        .edu__link.is-visible::before { transform: scaleX(1); }
        .edu__badge {
          position: relative; color: var(--text-primary); background: var(--bg-base); border-radius: 50%;
          transform: scale(0) rotate(-90deg);
          transition: transform 1s var(--ease-out) 0.6s;
        }
        .edu__link.is-visible .edu__badge { transform: none; }
        .edu__badge-core {
          width: 52px; height: 52px; border-radius: 50%;
          display: grid; place-items: center;
          background: var(--accent); color: #fff; font-weight: 700; font-size: 18px; letter-spacing: -0.04em;
        }

        @media (max-width: 900px) {
          .edu__grid { grid-template-columns: 1fr; }
          .edu__link { width: auto; height: 130px; }
          .edu__link::before {
            left: 50%; right: auto; top: 0; bottom: 0;
            border-top: none; border-left: 2px dashed var(--accent);
            transform: scaleY(0);
          }
          .edu__link.is-visible::before { transform: scaleY(1); }
          .edu-card { padding: 26px 20px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .edu__link::before, .edu__badge { transform: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Hackathons ── */
const COUNT_WORDS = { 1: 'Une', 2: 'Deux', 3: 'Trois', 4: 'Quatre', 5: 'Cinq' };

function HackathonCard({ h, index }) {
  const tiltRef = useTilt(7);
  return (
    <article ref={tiltRef} className="hack-card" style={{ '--i': index }}>
      <span className="hack-card__year" aria-hidden="true">{h.date}</span>
      <div className="hack-card__head">
        <CircleText text={`${h.result} · ${h.result} · `} size={96} className="hack-card__badge">
          <Icon name="trophy" size={24} strokeWidth={1.75} />
        </CircleText>
      </div>
      <h3 className="hack-card__name">{h.name}</h3>
      <p className="hack-card__org">{h.organizer}</p>
      <p className="hack-card__desc">{h.description}</p>
      <TagList tags={h.tags} />
    </article>
  );
}

export function Hackathons() {
  const { hackathons } = data;
  const gridRef = useReveal();
  if (!hackathons?.length) return null;

  return (
    <section id="hackathons" className="hacks">
      <div className="container">
        <SectionHeader
          index="05"
          label="Hackathons"
          title={`${COUNT_WORDS[hackathons.length] || hackathons.length} fois *lauréat.*`}
          subtitle="Quelques jours, une équipe, un prototype qui tourne devant le jury."
        />
        <div ref={gridRef} className="hacks__grid reveal-stagger">
          {hackathons.map((h, i) => <HackathonCard key={h.id} h={h} index={i} />)}
        </div>
      </div>

      <style>{`
        .hacks { background: var(--ink); color: #fff; }
        .hacks .section-title { color: #fff; }
        .hacks .section-header__meta, .hacks .section-subtitle { color: var(--ink-text); }
        .hacks .section-header__line { background: var(--ink-line); }
        .hacks .split em { color: var(--accent-soft); }

        .hacks__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; perspective: 1200px; }
        .hack-card {
          --rx: 0deg; --ry: 0deg; --mx: 50%; --my: 50%;
          position: relative; overflow: hidden;
          display: flex; flex-direction: column; gap: 12px;
          padding: 36px; min-height: 460px;
          border-radius: var(--radius-xl);
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--ink-line);
          transform: rotateX(var(--rx)) rotateY(var(--ry));
          transition: transform 0.6s var(--ease-out), border-color var(--transition), opacity 0.7s var(--ease-out);
        }
        .hack-card::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(420px circle at var(--mx) var(--my), rgba(37,99,235,0.35), transparent 60%);
          opacity: 0; transition: opacity 0.4s;
        }
        .hack-card:hover { border-color: var(--accent); }
        .hack-card:hover::before { opacity: 1; }
        .hacks__grid.is-visible > .hack-card { transform: rotateX(var(--rx)) rotateY(var(--ry)); }

        .hack-card__year {
          position: absolute; right: -0.06em; bottom: -0.22em;
          font-size: 200px; font-weight: 700; letter-spacing: -0.07em; line-height: 1;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.08);
          pointer-events: none;
        }
        .hack-card__head { margin-bottom: auto; }
        .hack-card__badge { color: #fff; }
        .hack-card__badge .circle-text__center { color: #fff; }
        .hack-card__badge .circle-text__center svg {
          width: 48px; height: 48px; padding: 12px; border-radius: 50%; background: var(--accent); box-sizing: border-box;
        }
        .hack-card__name { position: relative; font-size: clamp(30px, 3.4vw, 48px); font-weight: 700; letter-spacing: -0.05em; line-height: 1; margin-top: 48px; }
        .hack-card__org { position: relative; font-family: var(--font-serif); font-style: italic; font-size: 20px; color: var(--accent-soft); }
        .hack-card__desc { position: relative; font-size: 15px; line-height: 1.7; color: var(--ink-text); max-width: 440px; }
        .hack-card .tag { position: relative; color: #fff; border-color: var(--ink-line); }

        @media (max-width: 900px) {
          .hacks__grid { grid-template-columns: 1fr; }
          .hack-card { min-height: 0; padding: 28px 22px; }
          .hack-card__year { font-size: 140px; }
        }
      `}</style>
    </section>
  );
}
