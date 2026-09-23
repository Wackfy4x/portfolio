import { TechIcon } from '../ui/Icons.jsx';

/**
 * Visual stand-in for a project screenshot: the project's number set big on
 * the accent colour, with the tech it uses. If the project has an `image`,
 * that is shown instead.
 */
export default function ProjectCover({ project, index, size = 'md' }) {
  if (project.image) {
    return (
      <div className={`pcover pcover--${size}`}>
        <img src={project.image} alt="" className="pcover__img" />
      </div>
    );
  }

  return (
    <div className={`pcover pcover--${size}`} aria-hidden="true">
      <span className="pcover__num">{String(index + 1).padStart(2, '0')}</span>
      <div className="pcover__icons">
        {project.tags.slice(0, 4).map(t => (
          <span key={t} className="pcover__icon"><TechIcon name={t} size={22} /></span>
        ))}
      </div>
      <span className="pcover__title">{project.title}</span>
    </div>
  );
}
