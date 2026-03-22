import { useState } from 'react';
import data from '../../data/portfolio.json';
import { SectionHeader, TagList } from '../ui/index.jsx';
import { Icon } from '../ui/Icons.jsx';
import ProjectModal from './ProjectModal.jsx';

/* Détecte si un lien est GitLab */
const isGitlab = url => url && url.includes('gitlab.com');
const isGithub = url => url && url.includes('github.com');

function ProjectCard({ project, onOpen }) {
  /* Lien repo unique (github ou gitlab) */
  const repoUrl  = project.links?.github || '';
  const repoIcon = isGitlab(repoUrl) ? 'gitlab' : 'github';
  const repoLabel = isGitlab(repoUrl) ? 'GitLab' : 'GitHub';

  return (
    <article
      className={`project-card card${project.featured ? ' project-card--featured' : ''}`}
      onClick={() => onOpen(project)}
      style={{ cursor: 'pointer' }}
    >
      {/* Thumbnail */}
      <div className="project-card__thumb">
        <div className="project-card__emoji-wrap">
          <span className="project-card__emoji-char">{project.emoji}</span>
        </div>
        {project.featured && (
          <span className="project-card__featured-badge">
            <Icon name="star" size={9} strokeWidth={2.5} /> Featured
          </span>
        )}
        <div className="project-card__overlay">
          <Icon name="maximize2" size={22} color="var(--accent)" />
          <span>Voir le projet</span>
        </div>
      </div>

      {/* Body */}
      <div className="project-card__body">
        <TagList tags={project.tags} style={{ marginBottom: 10 }} />
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__links" onClick={e => e.stopPropagation()}>
          {project.links?.demo && (
            <a href={project.links.demo} className="project-link" target="_blank" rel="noopener noreferrer">
              <Icon name="externalLink" size={12} /> Demo
            </a>
          )}
          {repoUrl && (
            <a href={repoUrl} className="project-link" target="_blank" rel="noopener noreferrer">
              <Icon name={repoIcon} size={12} /> {repoLabel}
            </a>
          )}
          <button className="project-link project-link--details" onClick={() => onOpen(project)}>
            <Icon name="layers" size={12} /> Détails
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { projects } = data;
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  const visible = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects">
      <div className="container">
        <SectionHeader
          eyebrow="Works"
          title="Projets"
          subtitle="Une sélection de projets sur lesquels j'ai travaillé. Cliquez pour en savoir plus."
        />

        <div className="projects__grid">
          {visible.map(project => (
            <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />
          ))}
        </div>

        {projects.length > 3 && (
          <div className="projects__more">
            <button className="btn btn-outline" onClick={() => setShowAll(o => !o)}>
              {showAll
                ? <><Icon name="chevronLeft" size={14} style={{ transform: 'rotate(90deg)' }} /> Voir moins</>
                : <><Icon name="images" size={14} /> Voir tous ({projects.length})</>
              }
            </button>
          </div>
        )}
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      <style>{`
        .projects__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 22px;
        }
        .project-card { display: flex; flex-direction: column; overflow: hidden; }
        .project-card--featured { border-color: rgba(0,229,195,0.22); }

        .project-card__thumb {
          position: relative;
          height: 160px;
          background: var(--bg-raised);
          overflow: hidden;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .project-card__emoji-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: var(--bg-overlay);
          border: 1px solid var(--border);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .project-card:hover .project-card__emoji-wrap {
          transform: scale(1.1);
          box-shadow: 0 0 24px rgba(0,229,195,0.15);
          border-color: var(--border-hover);
        }
        .project-card__emoji-char {
          font-size: 38px;
          line-height: 1;
          display: block;
        }

        .project-card__overlay {
          position: absolute; inset: 0;
          background: rgba(5, 8, 14, 0.72);
          backdrop-filter: blur(4px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px; opacity: 0;
          transition: opacity 0.25s ease;
        }
        .project-card:hover .project-card__overlay { opacity: 1; }
        .project-card__overlay span {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--accent); letter-spacing: 0.08em;
        }

        .project-card__featured-badge {
          position: absolute; top: 12px; right: 12px;
          display: inline-flex; align-items: center; gap: 4px;
          font-family: var(--font-mono); font-size: 9px;
          padding: 3px 9px; background: var(--accent);
          color: var(--bg-base); border-radius: 10px;
          font-weight: 700; letter-spacing: 0.05em; z-index: 1;
        }

        .project-card__body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
        .project-card__title {
          font-family: var(--font-display); font-size: 17px;
          font-weight: 700; color: var(--text-primary); margin-bottom: 7px;
        }
        .project-card__desc {
          font-size: 13px; color: var(--text-secondary); line-height: 1.65;
          flex: 1; margin-bottom: 14px;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }

        .project-card__links { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
        .project-link {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--font-mono); font-size: 11px;
          color: var(--accent); transition: opacity var(--transition);
          background: none; border: none; cursor: pointer; padding: 0;
        }
        .project-link:hover { opacity: 0.7; }
        .project-link--details {
          margin-left: auto; color: var(--text-secondary);
          border: 1px solid var(--border); padding: 4px 10px;
          border-radius: 6px; transition: all var(--transition);
        }
        .project-link--details:hover {
          border-color: var(--accent); color: var(--accent); opacity: 1;
        }
        .projects__more { display: flex; justify-content: center; margin-top: 40px; }
      `}</style>
    </section>
  );
}
