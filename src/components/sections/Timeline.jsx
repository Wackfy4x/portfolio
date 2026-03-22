import data from '../../data/portfolio.json';
import { SectionHeader, TagList } from '../ui/index.jsx';
import { Icon } from '../ui/Icons.jsx';

/* ── Shared TimelineItem ── */
function TimelineItem({ period, title, org, type, location, description, tags }) {
  return (
    <div className="timeline__item">
      <div className="timeline__dot" />
      <p className="timeline__period">{period}</p>
      <h3 className="timeline__title">{title}</h3>
      <p className="timeline__org">
        {org}
        {type && <span className="timeline__type">{type}</span>}
        {location && (
          <span className="timeline__location">
            <Icon name="mapPin" size={10} color="var(--text-muted)" style={{ marginRight: 3 }} />
            {location}
          </span>
        )}
      </p>
      <p className="timeline__desc">{description}</p>
      {tags?.length > 0 && <TagList tags={tags} />}
    </div>
  );
}

/* ── Experience ── */
export function Experience() {
  const { experiences } = data;
  return (
    <section id="experience">
      <div className="container">
        <SectionHeader
          eyebrow="Work"
          title="Expérience Professionnelle"
          subtitle="Mon parcours dans le monde du développement."
        />
        <div className="timeline">
          {experiences.map(exp => (
            <TimelineItem
              key={exp.id}
              period={exp.period}
              title={exp.title}
              org={exp.company}
              type={exp.type}
              location={exp.location}
              description={exp.description}
              tags={exp.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Formations ── */
export function Formations() {
  const { formations } = data;
  return (
    <section id="formations">
      <div className="container">
        <SectionHeader
          eyebrow="Education"
          title="Formation"
          subtitle="Mon parcours académique et mes diplômes."
        />
        <div className="timeline">
          {formations.map(f => (
            <TimelineItem
              key={f.id}
              period={f.period}
              title={f.degree}
              org={f.school}
              location={f.location}
              description={f.description}
              tags={f.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Hackathons ── */
export function Hackathons() {
  const { hackathons } = data;
  if (!hackathons?.length) return null;

  return (
    <section id="hackathons">
      <div className="container">
        <SectionHeader
          eyebrow="Challenges"
          title="Hackathons"
          subtitle="Compétitions et challenges techniques remportés."
        />
        <div className="hackathons__grid">
          {hackathons.map(h => (
            <article key={h.id} className="hackathon-card card">
              <div className="hackathon-card__header">
                <div className="hackathon-card__trophy">
                  <Icon name="trophy" size={24} color="#f0c040" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="hackathon-card__result">{h.result}</span>
                  <span className="hackathon-card__date">{h.date}</span>
                </div>
              </div>
              <h3 className="hackathon-card__name">{h.name}</h3>
              <p className="hackathon-card__organizer">{h.organizer}</p>
              <p className="hackathon-card__desc">{h.description}</p>
              <TagList tags={h.tags} style={{ marginTop: 12 }} />
              {h.gitlab && (
                <a href={h.gitlab} className="hackathon-card__gitlab" target="_blank" rel="noopener noreferrer">
                  <Icon name="gitlab" size={13} color="#fc6d26" /> Voir sur GitLab
                </a>
              )}
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .hackathons__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 22px;
        }
        .hackathon-card { padding: 26px; }
        .hackathon-card__header { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .hackathon-card__trophy {
          width: 52px; height: 52px; display: flex; align-items: center; justify-content: center;
          background: rgba(240, 192, 64, 0.08); border: 1px solid rgba(240, 192, 64, 0.2);
          border-radius: var(--radius-md); flex-shrink: 0;
        }
        .hackathon-card__result {
          display: block; font-family: var(--font-mono); font-size: 11px;
          color: #f0c040; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
        }
        .hackathon-card__date {
          display: block; font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); margin-top: 2px;
        }
        .hackathon-card__name {
          font-family: var(--font-display); font-size: 19px; font-weight: 800;
          color: var(--text-primary); margin-bottom: 4px;
        }
        .hackathon-card__organizer { font-size: 12px; color: var(--accent); margin-bottom: 10px; }
        .hackathon-card__desc { font-size: 13px; color: var(--text-secondary); line-height: 1.65; }
        .hackathon-card__gitlab {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 14px; font-family: var(--font-mono); font-size: 11px;
          color: #fc6d26; transition: opacity var(--transition);
        }
        .hackathon-card__gitlab:hover { opacity: 0.7; }
        .timeline__location {
          display: inline-flex; align-items: center;
          font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); margin-left: 10px;
        }
      `}</style>
    </section>
  );
}
