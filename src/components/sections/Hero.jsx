import { useState, useEffect } from 'react';
import data from '../../data/portfolio.json';
import { Avatar, SocialLinks } from '../ui/index.jsx';
import { Icon } from '../ui/Icons.jsx';
import { useRevealOnce } from '../../hooks/useReveal.js';

function TypingText({ text }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 55);
    return () => clearInterval(timer);
  }, [text]);
  return (
    <span>
      {displayed}
      <span className="typing-cursor" aria-hidden="true" />
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
    const duration = 900;
    const start = performance.now();
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(String(Math.round(eased * target)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  return <span ref={ref}>{Number.isNaN(target) ? value : display + suffix}</span>;
}

export default function Hero() {
  const { profile, hero } = data;

  const nameWords = profile.name.split(' ');
  const mid = Math.ceil(nameWords.length / 2);
  const nameLine1 = nameWords.slice(0, mid).join(' ');
  const nameLine2 = nameWords.slice(mid).join(' ');

  return (
    <section id="hero" className="hero">
      <div className="topo-bg" aria-hidden="true" />
      <div className="container">
        <div className="hero__inner">

          {/* ── Left ── */}
          <div className="hero__content">
            <div className="hero__eyebrow-row animate-fadeup delay-1">
              <p className="hero__greeting">{hero.greeting}</p>
              {profile.available && (
                <span className="hero__available">
                  <span className="hero__available-dot" />
                  Disponible
                </span>
              )}
            </div>

            <h1 className="hero__name animate-fadeup delay-2">
              <span className="hero__name-line">{nameLine1}</span>
              <span className="hero__name-line hero__name-accent">{nameLine2}</span>
            </h1>

            <p className="hero__title animate-fadeup delay-3">
              <TypingText text={profile.title} />
            </p>

            <p className="hero__bio animate-fadeup delay-4">{profile.bio}</p>

            {/* Badges */}
            <div className="hero__badges animate-fadeup delay-4">
              {profile.seekingRole && (
                <span className="hero__badge hero__badge--seek">
                  <Icon name="zap" size={12} color="var(--accent)" />
                  {profile.seekingRole}
                </span>
              )}
              {profile.mobility && (
                <span className="hero__badge hero__badge--mobility">
                  <Icon name="mapPin" size={12} color="var(--text-secondary)" />
                  {profile.mobility}
                </span>
              )}
            </div>

            <div className="hero__actions animate-fadeup delay-5">
              <a href="#contact" className="btn btn-primary">
                Discutons <Icon name="arrowUpRight" size={14} />
              </a>
              {profile.cvLink && profile.cvLink !== '#' && (
                <a href={profile.cvLink} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                  <Icon name="download" size={14} /> Télécharger CV
                </a>
              )}
              {profile.website && (
                <a href={profile.website} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                  <Icon name="globe" size={14} /> Site web
                </a>
              )}
            </div>

            <div className="animate-fadeup delay-6">
              <SocialLinks social={profile.social} />
            </div>
          </div>

          {/* ── Right — card ── */}
          <div className="hero__sidebar animate-fadeup delay-3">
            <div className="hero-card card">
              <Avatar src={profile.avatar} name={profile.name} size={76} />

              <div className="hero-card__info">
                <p className="hero-card__name">{profile.name}</p>
                <p className="hero-card__email">{profile.email}</p>
                <p className="hero-card__location">
                  <Icon name="mapPin" size={11} color="var(--text-muted)" style={{ marginRight: 4 }} />
                  {profile.location}
                </p>
              </div>

              <div className="hero-card__divider" />

              <div className="hero-card__stats">
                {hero.stats.map(stat => (
                  <div key={stat.id} className="hero-stat">
                    <span className="hero-stat__value"><CountUp value={stat.value} /></span>
                    <span className="hero-stat__label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          min-height: 100vh; display: flex; align-items: center;
          padding-top: var(--nav-height); overflow: hidden;
        }
        .hero__inner {
          display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: 80px; align-items: center; padding: 60px 0;
        }
        .hero__eyebrow-row {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 18px;
        }
        .hero__greeting {
          font-family: var(--font-mono); font-size: 12px;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--accent);
        }
        .hero__available {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-mono); font-size: 10px;
          color: var(--accent-dim); background: var(--accent-bg);
          border: 1px solid var(--border); padding: 4px 10px; border-radius: 20px;
        }
        .hero__available-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
          animation: pulse-ring 2s ease-out infinite;
        }
        .hero__name {
          font-family: var(--font-display);
          font-size: clamp(24px, 2.9vw, 38px);
          font-weight: 800; line-height: 1.16;
          letter-spacing: -0.015em; margin-bottom: 18px;
        }
        .hero__name-line { display: block; }
        .hero__name-accent { color: var(--accent); }
        .hero__title {
          font-family: var(--font-mono);
          font-size: clamp(13px, 1.4vw, 17px);
          color: var(--text-secondary); margin-bottom: 20px; min-height: 26px;
        }
        .typing-cursor {
          display: inline-block; width: 2px; height: 1em;
          background: var(--accent); vertical-align: text-bottom;
          margin-left: 2px; animation: blink 1s step-end infinite;
        }
        .hero__bio {
          font-size: 14px; color: var(--text-secondary);
          line-height: 1.8; margin-bottom: 20px; max-width: 500px;
        }
        .hero__badges { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 28px; }
        .hero__badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-mono); font-size: 11px;
          padding: 5px 12px; border-radius: 20px; border: 1px solid var(--border);
        }
        .hero__badge--seek { color: var(--accent-dim); background: var(--accent-bg); border-color: var(--border-hover); }
        .hero__badge--mobility { color: var(--text-secondary); background: var(--bg-raised); }
        .hero__actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }

        /* Card */
        .hero-card { padding: 30px 22px 26px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .hero-card__info { margin-top: 16px; }
        .hero-card__name { font-family: var(--font-display); font-size: 15px; font-weight: 700; line-height: 1.3; }
        .hero-card__email { font-family: var(--font-mono); font-size: 10px; color: var(--text-secondary); margin-top: 4px; }
        .hero-card__location {
          font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);
          margin-top: 4px; display: flex; align-items: center; justify-content: center;
        }
        .hero-card__divider { width: 100%; height: 1px; background: var(--border); margin: 18px 0; }
        .hero-card__stats { width: 100%; display: flex; flex-direction: column; gap: 8px; }
        .hero-stat {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 14px; background: var(--bg-raised);
          border-radius: var(--radius-md); border: 1px solid var(--border);
        }
        .hero-stat__value { font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--accent); }
        .hero-stat__label { font-size: 12px; color: var(--text-secondary); }

        @media (max-width: 900px) {
          .hero__inner { grid-template-columns: 1fr; gap: 48px; padding: 40px 0; }
          .hero__sidebar { max-width: 380px; }
        }
      `}</style>
    </section>
  );
}
