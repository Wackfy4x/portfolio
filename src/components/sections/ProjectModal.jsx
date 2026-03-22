import { useState, useEffect } from 'react';
import { Icon } from '../ui/Icons.jsx';
import { TagList } from '../ui/index.jsx';

/* ── Placeholder galerie ── */
function GalleryPlaceholder({ emoji }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--bg-raised)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 16,
      border: '1px dashed var(--border)',
    }}>
      <span style={{ fontSize: 64, opacity: 0.4, lineHeight: 1 }}>{emoji}</span>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'var(--text-muted)', letterSpacing: '0.08em',
        textAlign: 'center', maxWidth: 200, lineHeight: 1.5,
      }}>
        Ajoutez des images dans<br />
        <code style={{ color: 'var(--accent)' }}>portfolio.json → images[]</code>
      </p>
    </div>
  );
}

/* ── Galerie ── */
function Gallery({ images, emoji }) {
  const [active, setActive] = useState(0);
  const hasImages = images && images.length > 0;
  const total = hasImages ? images.length : 1;

  return (
    <div className="modal-gallery">
      <div className="modal-gallery__main">
        {hasImages ? (
          <img src={images[active]} alt={`Screenshot ${active + 1}`} className="modal-gallery__img" />
        ) : (
          <GalleryPlaceholder emoji={emoji} />
        )}
        {total > 1 && (
          <>
            <button className="modal-gallery__arrow modal-gallery__arrow--left"
              onClick={() => setActive(i => (i - 1 + total) % total)}>
              <Icon name="chevronLeft" size={20} />
            </button>
            <button className="modal-gallery__arrow modal-gallery__arrow--right"
              onClick={() => setActive(i => (i + 1) % total)}>
              <Icon name="chevronRight" size={20} />
            </button>
            <div className="modal-gallery__counter">{active + 1} / {total}</div>
          </>
        )}
      </div>
      {total > 1 && (
        <div className="modal-gallery__thumbs">
          {images.map((src, i) => (
            <button key={i} className={`modal-gallery__thumb${active === i ? ' active' : ''}`} onClick={() => setActive(i)}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Détecter gitlab ou github ── */
const isGitlab = url => url && url.includes('gitlab.com');

/* ── Modal principale ── */
export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose]);

  if (!project) return null;

  const repoUrl   = project.links?.github || '';
  const repoIcon  = isGitlab(repoUrl) ? 'gitlab' : 'github';
  const repoLabel = isGitlab(repoUrl) ? 'GitLab' : 'GitHub';

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="project-modal" role="dialog" aria-modal="true">

        {/* Header */}
        <div className="project-modal__header">
          <div className="project-modal__header-left">
            <span className="project-modal__emoji">{project.emoji}</span>
            <div>
              <h2 className="project-modal__title">{project.title}</h2>
              <div className="project-modal__tags">
                <TagList tags={project.tags} />
              </div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fermer">
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="project-modal__body">
          <Gallery images={project.images} emoji={project.emoji} />

          <div className="project-modal__info">

            {/* Description complète */}
            <div className="modal-section">
              <h3 className="modal-section__title">
                <Icon name="layers" size={14} /> Description
              </h3>
              <p className="modal-section__text">{project.description}</p>
            </div>

            {/* Stack technique */}
            <div className="modal-section">
              <h3 className="modal-section__title">
                <Icon name="zap" size={14} /> Stack technique
              </h3>
              <div className="modal-tags-wrap">
                <TagList tags={project.tags} />
              </div>
            </div>

            {/* Liens */}
            <div className="modal-links">
              {project.links?.demo && (
                <a href={project.links.demo} className="btn btn-primary modal-link-btn"
                  target="_blank" rel="noopener noreferrer">
                  <Icon name="externalLink" size={14} /> Voir la démo
                </a>
              )}
              {repoUrl && (
                <a href={repoUrl} className="btn btn-outline modal-link-btn"
                  target="_blank" rel="noopener noreferrer">
                  <Icon name={repoIcon} size={14} /> {repoLabel}
                </a>
              )}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(5, 8, 14, 0.85);
          backdrop-filter: blur(14px);
          z-index: 200;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: fadeBackdrop .25s ease;
        }
        @keyframes fadeBackdrop { from { opacity: 0; } to { opacity: 1; } }

        .project-modal {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          width: 100%; max-width: 920px;
          max-height: 90vh; overflow-y: auto;
          display: flex; flex-direction: column;
          animation: slideModal .3s cubic-bezier(.4,0,.2,1);
          box-shadow: 0 24px 64px rgba(0,0,0,.6), 0 0 0 1px rgba(0,229,195,.08);
        }
        @keyframes slideModal {
          from { opacity: 0; transform: translateY(20px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .project-modal::-webkit-scrollbar { width: 3px; }
        .project-modal::-webkit-scrollbar-thumb { background: var(--accent-dim); border-radius: 2px; }

        /* Header */
        .project-modal__header {
          display: flex; align-items: flex-start;
          justify-content: space-between;
          padding: 26px 28px 20px;
          border-bottom: 1px solid var(--border);
          gap: 16px; position: sticky; top: 0;
          background: var(--bg-surface); z-index: 1;
          backdrop-filter: blur(10px);
        }
        .project-modal__header-left { display: flex; align-items: flex-start; gap: 16px; flex: 1; min-width: 0; }
        .project-modal__emoji { font-size: 36px; flex-shrink: 0; line-height: 1; margin-top: 2px; }
        .project-modal__title {
          font-family: var(--font-display);
          font-size: clamp(18px, 3vw, 24px); font-weight: 800;
          color: var(--text-primary); margin-bottom: 10px; line-height: 1.2;
        }
        .project-modal__tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .modal-close-btn {
          width: 36px; height: 36px; border-radius: 8px;
          background: var(--bg-raised); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-secondary); cursor: pointer;
          transition: all var(--transition); flex-shrink: 0;
        }
        .modal-close-btn:hover { border-color: #ff4444; color: #ff4444; background: rgba(255,68,68,.08); }

        /* Body */
        .project-modal__body {
          display: grid; grid-template-columns: 1.1fr 1fr;
          min-height: 340px;
        }

        /* Gallery */
        .modal-gallery {
          padding: 24px; border-right: 1px solid var(--border);
          display: flex; flex-direction: column; gap: 12px;
        }
        .modal-gallery__main {
          position: relative; width: 100%; aspect-ratio: 16/10;
          border-radius: var(--radius-md); overflow: hidden;
          background: var(--bg-raised); border: 1px solid var(--border);
        }
        .modal-gallery__img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .modal-gallery__arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(10,14,20,.75); backdrop-filter: blur(8px);
          border: 1px solid var(--border); display: flex; align-items: center;
          justify-content: center; color: var(--text-primary);
          cursor: pointer; transition: all var(--transition); z-index: 2;
        }
        .modal-gallery__arrow:hover { background: rgba(0,229,195,.15); border-color: var(--accent); color: var(--accent); }
        .modal-gallery__arrow--left  { left: 10px; }
        .modal-gallery__arrow--right { right: 10px; }
        .modal-gallery__counter {
          position: absolute; bottom: 10px; right: 12px;
          font-family: var(--font-mono); font-size: 10px; color: var(--text-secondary);
          background: rgba(10,14,20,.7); padding: 3px 8px; border-radius: 10px; backdrop-filter: blur(4px);
        }
        .modal-gallery__thumbs { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
        .modal-gallery__thumb {
          width: 64px; height: 44px; border-radius: 6px; overflow: hidden;
          border: 2px solid var(--border); cursor: pointer; flex-shrink: 0;
          transition: border-color var(--transition); background: var(--bg-raised);
        }
        .modal-gallery__thumb:hover  { border-color: var(--text-secondary); }
        .modal-gallery__thumb.active { border-color: var(--accent); }

        /* Info panel */
        .project-modal__info {
          padding: 24px; display: flex; flex-direction: column; gap: 22px;
        }
        .modal-section {}
        .modal-section__title {
          display: flex; align-items: center; gap: 7px;
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 10px;
        }
        .modal-section__text {
          font-size: 13px; color: var(--text-secondary); line-height: 1.75;
        }
        .modal-tags-wrap { display: flex; flex-wrap: wrap; gap: 6px; }
        .modal-links {
          display: flex; gap: 10px; flex-wrap: wrap;
          margin-top: auto; padding-top: 8px; border-top: 1px solid var(--border);
        }
        .modal-link-btn { font-size: 11px; padding: 8px 14px; }

        @media (max-width: 700px) {
          .project-modal__body { grid-template-columns: 1fr; }
          .modal-gallery { border-right: none; border-bottom: 1px solid var(--border); }
          .modal-backdrop { padding: 12px; }
        }
      `}</style>
    </div>
  );
}
