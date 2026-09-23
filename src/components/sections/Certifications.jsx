import data from '../../data/portfolio.json';
import { SectionHeader } from '../ui/index.jsx';
import { Icon } from '../ui/Icons.jsx';
import { useReveal } from '../../hooks/useReveal.js';

function CertRow({ cert, index }) {
  const hasLink = cert.link && cert.link !== '#';
  const Tag = hasLink ? 'a' : 'div';
  const linkProps = hasLink ? { href: cert.link, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <li style={{ '--i': index }}>
      <Tag className="cert-row" {...linkProps}>
        <span className="cert-row__date">{cert.date}</span>
        <span className="cert-row__title">{cert.title}</span>
        <span className="cert-row__issuer">{cert.issuer}</span>
        <span className="cert-row__icon">
          <Icon name={hasLink ? 'arrowUpRight' : 'award'} size={18} />
        </span>
      </Tag>
    </li>
  );
}

export default function Certifications() {
  const { certifications } = data;
  const listRef = useReveal();
  return (
    <section id="certifications" className="certs">
      <div className="container">
        <SectionHeader index="07" label="Certifications" title="Certifié *&* validé." />
        <ul ref={listRef} className="certs__list reveal-stagger">
          {certifications.map((cert, i) => <CertRow key={cert.id} cert={cert} index={i} />)}
        </ul>
      </div>

      <style>{`
        .certs__list { border-top: 1px solid var(--text-primary); }
        .cert-row {
          display: grid; grid-template-columns: 180px 1fr 220px 44px;
          align-items: center; gap: 24px;
          padding: 26px 0; border-bottom: 1px solid var(--border-hover);
          transition: padding 0.5s var(--ease-out);
        }
        .cert-row:hover { padding-left: 16px; padding-right: 16px; }
        .cert-row__date { font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary); }
        .cert-row__title { font-size: clamp(20px, 2.2vw, 28px); font-weight: 600; letter-spacing: -0.035em; line-height: 1.1; }
        .cert-row__issuer { font-family: var(--font-serif); font-style: italic; font-size: 20px; color: var(--accent); }
        .cert-row__icon {
          width: 44px; height: 44px; border-radius: 50%;
          display: grid; place-items: center;
          background: var(--bg-raised); color: var(--accent);
          transition: background var(--transition), color var(--transition), transform 0.6s var(--ease-out);
        }
        .cert-row:hover .cert-row__icon { background: var(--accent); color: #fff; transform: rotate(-20deg) scale(1.08); }

        @media (max-width: 800px) {
          .cert-row { grid-template-columns: 1fr 44px; gap: 6px 16px; }
          .cert-row__date { grid-row: 1; }
          .cert-row__title { grid-row: 2; }
          .cert-row__issuer { grid-row: 3; }
          .cert-row__icon { grid-column: 2; grid-row: 1 / span 3; }
          .cert-row:hover { padding-left: 0; padding-right: 0; }
        }
      `}</style>
    </section>
  );
}
