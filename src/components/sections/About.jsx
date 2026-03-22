import data from '../../data/portfolio.json';
import { SectionHeader, SocialLinks } from '../ui/index.jsx';
import { Icon } from '../ui/Icons.jsx';
import profilep from '../../assets/profile.png';

export default function About() {
  const { profile, about } = data;

  return (
    <section id="about">
      <div className="container">
        <div className="about__inner">
          {/* Photo */}
          <div className="about__photo-wrap">
            <div className="about__photo-frame">
              {profile.photo
                ? <img src={profilep} alt={profile.name} className="about__photo" />
                : <div className="about__photo-placeholder">👨‍💻</div>
              }
            </div>
            <div className="about__photo-accent" aria-hidden="true" />
            <div className="about__photo-badge">
              <Icon name="mapPin" size={11} color="var(--accent)" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Text */}
          <div className="about__content">
            <SectionHeader eyebrow="About me" title="À Propos de Moi" />
            <div className="about__paragraphs">
              {about.paragraphs.map((para, i) => (
                <p key={i} className="about__para">{para}</p>
              ))}
            </div>
            <div className="about__details">
              {about.details.map(item => (
                <div key={item.label} className="about__detail-item">
                  <span className="about__detail-label">{item.label}</span>
                  <span className="about__detail-value">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="about__footer">
              <SocialLinks social={profile.social} />
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                Me contacter <Icon name="arrowUpRight" size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about__inner {
          display: grid; grid-template-columns: 380px 1fr;
          gap: 80px; align-items: start;
        }
        .about__photo-wrap { position: relative; padding-bottom: 20px; padding-right: 20px; }
        .about__photo-frame {
          width: 100%; aspect-ratio: 4/5; border-radius: var(--radius-lg);
          overflow: hidden; border: 1px solid var(--border);
          background: var(--bg-raised); position: relative; z-index: 1;
        }
        .about__photo { width: 100%; height: 100%; object-fit: cover; }
        .about__photo-placeholder {
          width: 100%; height: 100%; display: flex;
          align-items: center; justify-content: center; font-size: 80px;
        }
        .about__photo-accent {
          position: absolute; bottom: 0; right: 0;
          width: calc(100% - 20px); height: calc(100% - 20px);
          border: 1px solid var(--border-hover); border-radius: var(--radius-lg);
          z-index: 0; opacity: 0.4;
        }
        .about__photo-badge {
          position: absolute; bottom: 28px; right: -16px;
          display: flex; align-items: center; gap: 6px;
          background: var(--bg-surface); border: 1px solid var(--border);
          border-radius: 20px; padding: 7px 14px;
          font-family: var(--font-mono); font-size: 11px;
          color: var(--text-secondary); z-index: 2; backdrop-filter: blur(10px);
        }
        .about__content { padding-top: 8px; }
        .about__paragraphs { margin-bottom: 28px; }
        .about__para { font-size: 15px; color: var(--text-secondary); line-height: 1.8; margin-bottom: 14px; }
        .about__para:last-child { margin-bottom: 0; }
        .about__details {
          display: grid; grid-template-columns: 1fr 1fr;
          border: 1px solid var(--border); border-radius: var(--radius-md);
          overflow: hidden; margin-bottom: 32px;
        }
        .about__detail-item {
          padding: 14px 18px; border-bottom: 1px solid var(--border); border-right: 1px solid var(--border);
        }
        .about__detail-item:nth-child(2n) { border-right: none; }
        .about__detail-item:nth-last-child(-n+2) { border-bottom: none; }
        .about__detail-label {
          display: block; font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 3px;
        }
        .about__detail-value { font-size: 14px; color: var(--text-primary); font-weight: 500; }
        .about__footer { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }

        @media (max-width: 1000px) {
          .about__inner { grid-template-columns: 1fr; gap: 48px; }
          .about__photo-wrap { max-width: 360px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
