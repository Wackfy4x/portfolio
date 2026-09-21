import data from '../../data/portfolio.json';
import { SectionHeader } from '../ui/index.jsx';
import { Icon } from '../ui/Icons.jsx';
import { useReveal } from '../../hooks/useReveal.js';

/* Icône de certification selon l'émetteur */
function CertBadge({ cert }) {
  return (
    <div className="cert-card__icon" aria-hidden="true">
      <Icon name="award" size={24} color="var(--accent)" strokeWidth={1.5} />
    </div>
  );
}

function CertCard({ cert, index }) {
  return (
    <article className="cert-card card" style={{ '--i': index }}>
      <CertBadge cert={cert} />
      <div className="cert-card__body">
        <h3 className="cert-card__title">{cert.title}</h3>
        <p className="cert-card__issuer">{cert.issuer}</p>
        <div className="cert-card__meta">
          <span className="cert-card__date">
            <Icon name="calendar" size={11} color="var(--text-muted)" style={{ marginRight: 4, verticalAlign: 'middle' }} />
            {cert.date}
          </span>
          {cert.credentialId && (
            <span className="cert-card__id">ID: {cert.credentialId}</span>
          )}
        </div>
        {cert.link && cert.link !== '#' && (
          <a href={cert.link} className="cert-card__link" target="_blank" rel="noopener noreferrer">
            <Icon name="externalLink" size={11} /> Voir le certificat
          </a>
        )}
      </div>
    </article>
  );
}

export default function Certifications() {
  const { certifications } = data;
  const gridRef = useReveal();
  return (
    <section id="certifications">
      <div className="container">
        <SectionHeader
          eyebrow="Certifications"
          title="Certifications"
          subtitle="Certifications professionnelles obtenues."
        />
        <div ref={gridRef} className="certs__grid reveal-stagger">
          {certifications.map((cert, i) => <CertCard key={cert.id} cert={cert} index={i} />)}
        </div>
      </div>

      <style>{`
        .certs__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 18px;
        }
        .cert-card { display: flex; gap: 18px; padding: 22px; align-items: flex-start; }
        .cert-card__icon {
          width: 52px; height: 52px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--accent-bg); border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        .cert-card__body { flex: 1; min-width: 0; }
        .cert-card__title {
          font-family: var(--font-display); font-size: 14px; font-weight: 700;
          color: var(--text-primary); margin-bottom: 4px; line-height: 1.3;
        }
        .cert-card__issuer { font-size: 12px; color: var(--accent); margin-bottom: 8px; }
        .cert-card__meta { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 8px; align-items: center; }
        .cert-card__date {
          display: inline-flex; align-items: center;
          font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);
        }
        .cert-card__id { font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); }
        .cert-card__link {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--font-mono); font-size: 10px; color: var(--accent);
          transition: opacity var(--transition);
        }
        .cert-card__link:hover { opacity: 0.7; }
      `}</style>
    </section>
  );
}
