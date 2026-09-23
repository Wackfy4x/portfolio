import data from '../../data/portfolio.json';
import { SectionHeader, CircleText } from '../ui/index.jsx';
import { Icon } from '../ui/Icons.jsx';
import { useReveal } from '../../hooks/useReveal.js';
import { useScrollFrame, clamp } from '../../hooks/useMotion.js';
import profilep from '../../assets/profile.png';

/* Words light up one by one as the paragraph travels up the viewport */
function ScrubText({ text }) {
  const words = text.split(' ');
  const ref = useScrollFrame((el, vh) => {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return;
    const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.25));
    const spans = el.querySelectorAll('.scrub__w');
    const n = spans.length;
    spans.forEach((s, i) => { s.style.opacity = 0.16 + 0.84 * clamp(p * n - i); });
  });

  return (
    <p ref={ref} className="scrub">
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true"><span className="scrub__w">{w}</span>{' '}</span>
      ))}
    </p>
  );
}

export default function About() {
  const { profile, about } = data;
  const photoRef = useReveal();
  const detailsRef = useReveal();
  const [lead, ...rest] = about.paragraphs;

  const parallaxRef = useScrollFrame((el, vh) => {
    const r = el.getBoundingClientRect();
    const p = clamp((vh - r.top) / (vh + r.height));
    el.style.setProperty('--py', `${(p - 0.5) * -14}%`);
  });

  return (
    <section id="about" className="about">
      <div className="container">
        <SectionHeader index="01" label="À propos" title="Du code, des *données* et de l'IA." />

        <div className="about__inner">
          <div ref={photoRef} className="about__photo-col reveal">
            <div ref={parallaxRef} className="about__photo-frame">
              <img src={profilep} alt={profile.name} className="about__photo" />
            </div>
            <span className="about__sticker">
              <Icon name="mapPin" size={13} /> {profile.location}
            </span>
            <CircleText text="Élève ingénieur · Double diplôme · " size={128} className="about__circle">
              <span className="about__circle-core">IA</span>
            </CircleText>
          </div>

          <div className="about__content">
            <ScrubText text={lead} />
            <div className="about__paragraphs">
              {rest.map((para, i) => <p key={i} className="about__para">{para}</p>)}
            </div>

            <dl ref={detailsRef} className="about__details reveal-stagger">
              {about.details.map((item, i) => (
                <div key={`${item.label}-${i}`} className="about__detail" style={{ '--i': i }}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <style>{`
        .about__inner {
          display: grid; grid-template-columns: 0.8fr 1.2fr;
          gap: 80px; align-items: start;
        }
        .about__photo-col { position: sticky; top: 110px; }
        .about__photo-frame {
          --py: 0%;
          aspect-ratio: 4 / 5; border-radius: var(--radius-xl);
          overflow: hidden; background: var(--bg-raised);
          clip-path: inset(100% 0 0 0 round var(--radius-xl));
          transition: clip-path 1.4s var(--ease-io);
        }
        .about__photo-col.is-visible .about__photo-frame { clip-path: inset(0 0 0 0 round var(--radius-xl)); }
        .about__photo {
          width: 100%; height: 100%; object-fit: cover;
          transform: translateY(var(--py)) scale(1.18);
        }
        .about__sticker {
          position: absolute; left: -14px; bottom: 44px;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 16px; border-radius: 999px;
          background: var(--text-primary); color: #fff;
          font-family: var(--font-mono); font-size: 12px;
          transform: rotate(-6deg);
        }
        .about__circle { position: absolute; top: -40px; right: -40px; color: var(--text-primary); }
        .about__circle-core {
          width: 56px; height: 56px; border-radius: 50%;
          display: grid; place-items: center;
          background: var(--accent); color: #fff;
          font-family: var(--font-serif); font-style: italic; font-size: 26px;
        }

        .scrub {
          font-size: clamp(22px, 2.4vw, 32px); line-height: 1.3;
          letter-spacing: -0.025em; font-weight: 500;
          margin-bottom: 40px;
        }
        .scrub__w { opacity: 0.16; transition: opacity 0.15s linear; }

        .about__paragraphs { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-bottom: 56px; }
        .about__para { font-size: 16px; color: var(--text-secondary); line-height: 1.75; }

        .about__details { border-top: 1px solid var(--text-primary); }
        .about__detail {
          display: flex; justify-content: space-between; align-items: baseline; gap: 20px;
          padding: 18px 0; border-bottom: 1px solid var(--border-hover);
          transition: padding 0.5s var(--ease-out), color var(--transition);
        }
        .about__detail:hover { padding-left: 12px; color: var(--accent); }
        .about__detail dt { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-secondary); }
        .about__detail dd { font-size: 18px; font-weight: 500; text-align: right; }

        @media (max-width: 1000px) {
          .about__inner { grid-template-columns: 1fr; gap: 72px; }
          .about__photo-col { position: relative; top: 0; max-width: 380px; }
          .about__circle { right: -20px; }
        }
        @media (max-width: 640px) {
          .about__paragraphs { grid-template-columns: 1fr; }
          .about__circle { top: -32px; right: -8px; transform: scale(0.8); }
          .about__sticker { left: 8px; }
          .about__detail dd { font-size: 16px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .scrub__w { opacity: 1 !important; }
          .about__photo-frame { clip-path: none !important; }
        }
      `}</style>
    </section>
  );
}
