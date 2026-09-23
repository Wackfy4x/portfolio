import { useEffect, useId, useState } from 'react';
import { Icon } from './Icons.jsx';
import { useReveal } from '../../hooks/useReveal.js';
import { useMagnetic } from '../../hooks/useMotion.js';

/* ── SplitText — words slide up one after another.
      Wrap a word in *asterisks* to set it in the serif accent. ── */
const ACCENT = /^\*(.+)\*([.,!?;:]*)$/;

export function SplitText({ text, as: Tag = 'span', className = '', delay = 0, stagger = 55 }) {
  const ref = useReveal();
  const words = text.split(/\s+/);

  return (
    <Tag ref={ref} className={`split ${className}`}>
      <span className="sr-only">{text.replace(/\*/g, '')}</span>
      {words.map((word, i) => {
        const m = word.match(ACCENT);
        return (
          <span key={i}>
            <span className="split__mask" aria-hidden="true">
              <span className="split__word" style={{ '--d': `${delay + i * stagger}ms` }}>
                {m ? <><em>{m[1]}</em>{m[2]}</> : word}
              </span>
            </span>
            {i < words.length - 1 && ' '}
          </span>
        );
      })}
    </Tag>
  );
}

/* ── SectionHeader ── */
export function SectionHeader({ index, label, title, subtitle }) {
  const ref = useReveal();
  return (
    <header ref={ref} className="section-header">
      <p className="section-header__meta">
        {index && <span className="section-header__index">({index})</span>}
        <span>{label}</span>
        <span className="section-header__line" aria-hidden="true" />
      </p>
      <SplitText as="h2" text={title} className="section-title" />
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </header>
  );
}

/* ── RollText — hover swaps the label for a copy rolling in from below ── */
export function RollText({ children }) {
  return (
    <span className="roll">
      <span className="roll__inner" data-text={children}>{children}</span>
    </span>
  );
}

/* ── MagneticButton ── */
export function MagneticButton({ href, children, variant = 'primary', className = '', ...rest }) {
  const ref = useMagnetic(0.3);
  return (
    <a ref={ref} href={href} className={`btn btn-${variant} magnetic ${className}`} {...rest}>
      <RollText>{children}</RollText>
      <Icon name="arrowUpRight" size={16} className="btn__arrow" />
    </a>
  );
}

/* ── CircleText — text set on a spinning circle ── */
export function CircleText({ text, size = 120, className = '', children }) {
  const id = `circle-${useId().replace(/:/g, '')}`;
  return (
    <div className={`circle-text ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="circle-text__svg" aria-hidden="true">
        <defs>
          <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text>
          <textPath href={`#${id}`} textLength="236" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <div className="circle-text__center">{children}</div>
    </div>
  );
}

/* ── LocalTime — Limoges time, refreshed every 20s ── */
const timeFmt = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit',
});

export function LocalTime() {
  const [now, setNow] = useState(() => timeFmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(timeFmt.format(new Date())), 20000);
    return () => clearInterval(id);
  }, []);
  return <time>{now}</time>;
}

/* ── Tag ── */
export function Tag({ children }) {
  return <span className="tag">{children}</span>;
}

/* ── TagList ── */
export function TagList({ tags, style }) {
  if (!tags?.length) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, ...style }}>
      {tags.map(t => <Tag key={t}>{t}</Tag>)}
    </div>
  );
}

/* ── SocialLinks — depuis portfolio.json social{} ── */
export function SocialLinks({ social, className = '' }) {
  const links = [
    { key: 'github',   href: social?.github,   label: 'GitHub',   icon: 'github'   },
    { key: 'gitlab',   href: social?.gitlab,   label: 'GitLab',   icon: 'gitlab'   },
    { key: 'linkedin', href: social?.linkedin, label: 'LinkedIn', icon: 'linkedin' },
    { key: 'twitter',  href: social?.twitter,  label: 'Twitter',  icon: 'twitter'  },
  ];
  return (
    <div className={className} style={{ display: 'flex', gap: 10 }}>
      {links.map(({ key, href, label, icon }) =>
        href ? (
          <a key={key} href={href} className="social-link" target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
            <Icon name={icon} size={17} />
          </a>
        ) : null
      )}
    </div>
  );
}
