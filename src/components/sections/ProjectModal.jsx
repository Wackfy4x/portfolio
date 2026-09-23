import { useState, useEffect, useRef } from 'react';
import { Icon } from '../ui/Icons.jsx';
import { TagList } from '../ui/index.jsx';
import ProjectCover from './ProjectCover.jsx';

/* ── Galerie — falls back to the generated cover when there are no images ── */
function Gallery({ project, index }) {
  const [active, setActive] = useState(0);
  const images = project.images || [];
  const total = images.length;

  if (!total) {
    return <div className="modal-gallery__main"><ProjectCover project={project} index={index} size="lg" /></div>;
  }

  return (
    <div className="modal-gallery">
      <div className="modal-gallery__main">
        <img src={images[active]} alt={`${project.title} — capture ${active + 1}`} className="modal-gallery__img" />
        {total > 1 && (
          <>
            <button className="modal-gallery__arrow modal-gallery__arrow--left" aria-label="Image précédente"
              onClick={() => setActive(i => (i - 1 + total) % total)}>
              <Icon name="chevronLeft" size={20} />
            </button>
            <button className="modal-gallery__arrow modal-gallery__arrow--right" aria-label="Image suivante"
              onClick={() => setActive(i => (i + 1) % total)}>
              <Icon name="chevronRight" size={20} />
            </button>
            <div className="modal-gallery__counter">{active + 1} / {total}</div>
          </>
        )}
      </div>
    </div>
  );
}

const isGitlab = url => url && url.includes('gitlab.com');

/* ── Modal principale ── */
export default function ProjectModal({ project, index, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose]);

  if (!project) return null;

  const repoUrl   = project.links?.github || '';
  const repoIcon  = isGitlab(repoUrl) ? 'gitlab' : 'github';
  const repoLabel = isGitlab(repoUrl) ? 'Code sur GitLab' : 'Code sur GitHub';

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <button ref={closeRef} className="modal-close-btn" onClick={onClose} aria-label="Fermer">
          <Icon name="x" size={20} />
        </button>

        <Gallery project={project} index={index} />

        <div className="project-modal__info">
          <p className="project-modal__num">Projet {String(index + 1).padStart(2, '0')}</p>
          <h2 id="project-modal-title" className="project-modal__title">{project.title}</h2>
          <p className="project-modal__text">{project.description}</p>

          <div className="project-modal__foot">
            <TagList tags={project.tags} />
            <div className="project-modal__links">
              {project.links?.demo && (
                <a href={project.links.demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  <Icon name="externalLink" size={15} /> Voir le site
                </a>
              )}
              {repoUrl && (
                <a href={repoUrl} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                  <Icon name={repoIcon} size={15} /> {repoLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 200;
          background: var(--scrim);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          display: flex; align-items: flex-end; justify-content: center;
          padding: 24px 24px 0;
          animation: fadeBackdrop 0.4s ease both;
        }
        @keyframes fadeBackdrop { from { opacity: 0; } }

        .project-modal {
          position: relative;
          width: 100%; max-width: 1080px; max-height: calc(100svh - 48px);
          overflow-y: auto; overscroll-behavior: contain;
          background: var(--bg-base);
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
          display: grid; grid-template-columns: 1.1fr 1fr;
          animation: sheetUp 0.8s var(--ease-out) both;
        }
        @keyframes sheetUp { from { transform: translateY(100%); } }

        .modal-close-btn {
          position: absolute; top: 18px; right: 18px; z-index: 2;
          width: 48px; height: 48px; border-radius: 50%;
          display: grid; place-items: center;
          background: var(--text-primary); color: #fff;
          transition: transform 0.5s var(--ease-out), background var(--transition);
        }
        .modal-close-btn:hover { transform: rotate(90deg); background: var(--accent); }

        .modal-gallery { display: flex; }
        .modal-gallery__main { position: relative; width: 100%; min-height: 420px; overflow: hidden; }
        .modal-gallery__main > .pcover,
        .modal-gallery__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
        .modal-gallery__arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 42px; height: 42px; border-radius: 50%;
          background: var(--chip-dark); color: #fff;
          display: grid; place-items: center;
          transition: background var(--transition);
        }
        .modal-gallery__arrow:hover { background: var(--accent); }
        .modal-gallery__arrow--left  { left: 14px; }
        .modal-gallery__arrow--right { right: 14px; }
        .modal-gallery__counter {
          position: absolute; bottom: 14px; right: 14px;
          font-family: var(--font-mono); font-size: 11px; color: #fff;
          background: var(--chip-dark); padding: 4px 10px; border-radius: 999px;
        }

        .project-modal__info {
          padding: 48px 44px 40px;
          display: flex; flex-direction: column; gap: 20px;
          animation: rise 0.9s var(--ease-out) 0.25s both;
        }
        .project-modal__num { font-family: var(--font-mono); font-size: 12px; color: var(--accent); }
        .project-modal__title {
          font-size: clamp(28px, 3.4vw, 44px); font-weight: 700;
          letter-spacing: -0.045em; line-height: 1; padding-right: 48px;
        }
        .project-modal__text { font-size: 16px; line-height: 1.75; color: var(--text-secondary); }
        .project-modal__foot {
          margin-top: auto; padding-top: 24px; border-top: 1px solid var(--border-hover);
          display: flex; flex-direction: column; gap: 20px;
        }
        .project-modal__links { display: flex; gap: 10px; flex-wrap: wrap; }

        @media (max-width: 800px) {
          .modal-backdrop { padding: 12px 0 0; }
          .project-modal { grid-template-columns: 1fr; max-height: calc(100svh - 12px); }
          .modal-gallery__main { min-height: 260px; aspect-ratio: 16 / 10; }
          .project-modal__info { padding: 28px 16px 32px; }
        }
      `}</style>
    </div>
  );
}
