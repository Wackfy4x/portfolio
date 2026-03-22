import { Icon } from './Icons.jsx';

/* ── SectionDivider ── */
export function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <div className="section-divider__dot" />
      <div className="section-divider__line" />
      <div className="section-divider__dot" />
    </div>
  );
}

/* ── SectionHeader ── */
export function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="section-header">
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

/* ── Avatar ── */
export function Avatar({ src, name, size = 80, className = '' }) {
  const initials = name
    ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';
  const style = {
    width: size, height: size, borderRadius: '50%',
    border: '2px solid var(--accent)', flexShrink: 0,
    overflow: 'hidden', display: 'flex', alignItems: 'center',
    justifyContent: 'center', background: 'var(--bg-raised)',
  };
  if (src) {
    return (
      <div style={style} className={className}>
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }
  return (
    <div style={style} className={className}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: size * 0.32, color: 'var(--accent)' }}>
        {initials}
      </span>
    </div>
  );
}

/* ── Tag ── */
export function Tag({ children }) {
  return <span className="tag">{children}</span>;
}

/* ── TagList ── */
export function TagList({ tags, style }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, ...style }}>
      {(tags || []).map(t => <Tag key={t}>{t}</Tag>)}
    </div>
  );
}

/* ── SocialLinks — depuis portfolio.json social{} ── */
export function SocialLinks({ social, size = 38 }) {
  const links = [
    { key: 'github',   href: social?.github,   label: 'GitHub',   icon: 'github'   },
    { key: 'gitlab',   href: social?.gitlab,   label: 'GitLab',   icon: 'gitlab'   },
    { key: 'linkedin', href: social?.linkedin, label: 'LinkedIn', icon: 'linkedin' },
    { key: 'twitter',  href: social?.twitter,  label: 'Twitter',  icon: 'twitter'  },
  ];
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {links.map(({ key, href, label, icon }) =>
        href ? (
          <a key={key} href={href} className="social-link" target="_blank" rel="noopener noreferrer" title={label}
            style={{ width: size, height: size }}>
            <Icon name={icon} size={16} />
          </a>
        ) : null
      )}
    </div>
  );
}
