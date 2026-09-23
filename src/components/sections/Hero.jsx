import { useState, useEffect } from 'react';
import data from '../../data/portfolio.json';
import { MagneticButton, CircleText, LocalTime, SplitText } from '../ui/index.jsx';
import { Icon } from '../ui/Icons.jsx';
import { useRevealOnce } from '../../hooks/useReveal.js';
import { useScrollFrame, clamp } from '../../hooks/useMotion.js';
import photo from '../../assets/profile.png';

const ROLES = ['applications web', 'agents IA', 'pipelines data', 'APIs robustes', 'apps mobiles'];

/* Words flip vertically one after another, like a split-flap board */
function RoleRoller() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="roller" aria-live="polite">
      {ROLES.map((role, i) => {
        const offset = (i - index + ROLES.length) % ROLES.length;
        const state = offset === 0 ? 'in' : offset === ROLES.length - 1 ? 'out' : 'wait';
        return (
          <span key={role} className={`roller__word roller__word--${state}`} aria-hidden={offset !== 0}>
            {role}
          </span>
        );
      })}
      {/* Keeps the box as wide as the longest label so the line never jumps */}
      <span className="roller__sizer" aria-hidden="true">applications web</span>
    </span>
  );
}

/* Counts a numeric value up once it scrolls into view; keeps any non-digit
   suffix (e.g. "5+") static so we don't have to parse/rebuild it. */
function CountUp({ value }) {
  const [display, setDisplay] = useState('0');
  const target = parseInt(value, 10);
  const suffix = value.replace(/^[0-9]+/, '');

  const ref = useRevealOnce(() => {
    if (Number.isNaN(target) || target <= 0) { setDisplay(value); return; }
    const duration = 1400;
    const start = performance.now();
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(String(Math.round(eased * target)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  return <span ref={ref}>{Number.isNaN(target) ? value : display + suffix}</span>;
}

export default function Hero() {
  const { profile, hero } = data;
  const words = profile.name.split(' ');
  const surname = words.slice(0, 2).join(' ');
  const [first, second] = words.slice(2);

  /* Scroll-linked: the two name lines drift apart, the photo grows */
  const ref = useScrollFrame((el, vh) => {
    const p = clamp(window.scrollY / vh);
    el.style.setProperty('--hp', p.toFixed(4));
  });

  return (
    <section id="hero" className="hero" ref={ref}>
      <div className="hero__grid-lines" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className="container hero__container">
        <div className="hero__top">
          <p className="hero__meta hero-in" style={{ '--d': '0.1s' }}>
            <span className="hero__status">
              <span className="hero__status-dot" />
              {profile.available ? 'Ouvert aux opportunités' : 'En poste'}
            </span>
          </p>
          <p className="hero__meta hero-in" style={{ '--d': '0.2s' }}>
            {profile.location} — <LocalTime />
          </p>
        </div>

        <h1 className="hero__name">
          <span className="hero__surname hero-in" style={{ '--d': '0.15s' }}>{surname}</span>
          <span className="hero__line hero__line--1">
            <SplitText text={first} delay={150} />
          </span>
          <span className="hero__line hero__line--2">
            <span className="hero__photo" aria-hidden="true">
              <img src={photo} alt="" />
            </span>
            <SplitText text={`*${second}*`} delay={320} />
          </span>
        </h1>

        <div className="hero__bottom">
          <p className="hero__pitch hero-in" style={{ '--d': '0.7s' }}>
            {profile.title.split(' ')[0]} <strong>{profile.title.split(' ').slice(1).join(' ')}</strong>,
            je conçois et je livre des <RoleRoller />
          </p>

          <div className="hero__actions hero-in" style={{ '--d': '0.85s' }}>
            <MagneticButton href="#projects">Voir mes projets</MagneticButton>
            <MagneticButton href="#contact" variant="outline">Discutons</MagneticButton>
          </div>

          <a href="#about" className="hero__scroll hero-in" style={{ '--d': '1s' }} aria-label="Défiler vers la suite">
            <CircleText text="Fullstack · IA · Data · Scroll · " size={112}>
              <span className="hero__scroll-arrow">
                <Icon name="chevronDown" size={20} strokeWidth={2} />
              </span>
            </CircleText>
          </a>
        </div>

        <ul className="hero__stats">
          {hero.stats.map((stat, i) => (
            <li key={stat.id} className="hero-stat hero-in" style={{ '--d': `${1 + i * 0.1}s` }}>
              <span className="hero-stat__value"><CountUp value={stat.value} /></span>
              <span className="hero-stat__label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .hero {
          --hp: 0;
          min-height: 100svh;
          padding: calc(var(--nav-height) + 24px) 0 48px;
          overflow: hidden;
          display: flex; align-items: stretch;
        }
        .hero__container { width: 100%; display: flex; flex-direction: column; }

        .hero__grid-lines {
          position: absolute; inset: 0;
          display: grid; grid-template-columns: repeat(4, 1fr);
          max-width: var(--container-max); margin: 0 auto;
          padding: 0 var(--container-pad);
          pointer-events: none;
        }
        .hero__grid-lines span {
          border-left: 1px solid var(--bg-raised);
          transform-origin: top; animation: growLine 1.6s var(--ease-out) both;
        }
        .hero__grid-lines span:last-child { border-right: 1px solid var(--bg-raised); }
        .hero__grid-lines span:nth-child(2) { animation-delay: 0.1s; }
        .hero__grid-lines span:nth-child(3) { animation-delay: 0.2s; }
        .hero__grid-lines span:nth-child(4) { animation-delay: 0.3s; }
        @keyframes growLine { from { transform: scaleY(0); } }

        .hero-in { animation: rise 1s var(--ease-out) both; animation-delay: var(--d, 0s); }

        .hero__top {
          position: relative;
          display: flex; justify-content: space-between; align-items: center; gap: 16px;
          flex-wrap: wrap;
        }
        .hero__meta { font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary); }
        .hero__status {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 8px 14px; border-radius: 999px;
          background: var(--accent-bg); color: var(--accent-dim);
        }
        .hero__status-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--accent);
          animation: pulse-ring 2s ease-out infinite;
        }

        .hero__name {
          position: relative;
          margin: auto 0; padding: 48px 0 32px;
          font-family: var(--font-display);
          font-weight: 700; letter-spacing: -0.035em; line-height: 0.86;
          font-size: clamp(64px, 15.5vw, 212px);
        }
        .hero__surname {
          display: block; margin-bottom: 18px;
          font-family: var(--font-mono); font-weight: 400;
          font-size: clamp(12px, 1.1vw, 15px); letter-spacing: 0.02em; line-height: 1;
          color: var(--text-secondary);
        }
        .hero__surname::before { content: '— '; color: var(--accent); }
        .hero__line { display: flex; align-items: center; white-space: nowrap; will-change: transform; }
        .hero__line--1 { transform: translateX(calc(var(--hp) * -12%)); }
        .hero__line--2 {
          justify-content: flex-end; gap: 0.12em;
          transform: translateX(calc(var(--hp) * 10%));
        }
        .hero__line--2 em { padding-right: 0.06em; }

        .hero__photo {
          display: inline-block; flex-shrink: 0;
          width: 1.9em; height: 0.78em; border-radius: 999px;
          overflow: hidden; background: var(--bg-raised);
          animation: photoIn 1.4s var(--ease-io) 0.4s both;
        }
        .hero__photo img {
          width: 100%; height: 100%; object-fit: cover; object-position: 50% 22%;
          transform: scale(calc(1.25 - var(--hp) * 0.2));
        }
        @keyframes photoIn { from { width: 0; } }

        .hero__bottom {
          position: relative;
          display: grid; grid-template-columns: 1.2fr 1fr auto;
          align-items: center; gap: 32px;
          padding-top: 32px; border-top: 1px solid var(--border);
        }
        .hero__pitch { font-size: clamp(18px, 1.7vw, 23px); line-height: 1.45; letter-spacing: -0.015em; max-width: 520px; }
        .hero__pitch strong { font-weight: 600; }

        .roller { position: relative; display: inline-grid; vertical-align: bottom; overflow: hidden; }
        .roller__word, .roller__sizer {
          grid-area: 1 / 1;
          font-family: var(--font-serif); font-style: italic; color: var(--accent);
          font-size: 1.2em; line-height: 1.2; white-space: nowrap;
        }
        .roller__sizer { visibility: hidden; }
        .roller__word { transition: transform 0.8s var(--ease-out), opacity 0.8s var(--ease-out); }
        .roller__word--in   { transform: none; opacity: 1; }
        .roller__word--out  { transform: translateY(-100%); opacity: 0; }
        .roller__word--wait { transform: translateY(100%); opacity: 0; transition: none; }

        .hero__actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: flex-end; }

        .hero__scroll { color: var(--text-primary); display: block; }
        .hero__scroll-arrow {
          width: 44px; height: 44px; border-radius: 50%;
          display: grid; place-items: center;
          background: var(--accent); color: #fff;
          transition: transform 0.5s var(--ease-out);
        }
        .hero__scroll:hover .hero__scroll-arrow { transform: translateY(6px); }

        .hero__stats {
          position: relative;
          display: grid; grid-template-columns: repeat(3, 1fr);
          margin-top: 40px;
        }
        .hero-stat {
          display: flex; align-items: baseline; gap: 14px;
          padding: 4px 24px 0 0;
        }
        .hero-stat + .hero-stat { padding-left: 24px; border-left: 1px solid var(--border); }
        .hero-stat__value {
          font-size: clamp(38px, 4.6vw, 64px); font-weight: 700;
          letter-spacing: -0.05em; line-height: 1; color: var(--accent);
          font-variant-numeric: tabular-nums;
        }
        .hero-stat__label { font-size: 14px; line-height: 1.3; color: var(--text-secondary); max-width: 130px; }

        @media (max-width: 1000px) {
          .hero__bottom { grid-template-columns: 1fr auto; }
          .hero__actions { grid-column: 1 / -1; grid-row: 2; justify-content: flex-start; }
        }
        @media (max-width: 640px) {
          .hero__grid-lines { grid-template-columns: repeat(2, 1fr); }
          .hero__grid-lines span:nth-child(n+3) { display: none; }
          .hero__grid-lines span:nth-child(2) { border-right: 1px solid var(--bg-raised); }
          .hero__name { font-size: clamp(56px, 19vw, 110px); padding: 32px 0 24px; }
          .hero__line--2 { justify-content: flex-start; }
          .hero__bottom { grid-template-columns: 1fr; }
          .hero__scroll { display: none; }
          .hero__stats { grid-template-columns: 1fr; gap: 14px; margin-top: 32px; }
          .hero-stat, .hero-stat + .hero-stat { padding: 0; border: none; }
          .hero-stat__label { max-width: none; }
        }
      `}</style>
    </section>
  );
}
