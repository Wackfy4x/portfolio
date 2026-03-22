import { useState, useEffect } from 'react';
import data from '../../data/portfolio.json';
import { Icon } from '../ui/Icons.jsx';

const NAV_LINKS = [
  { href: '#about',          label: 'À Propos' },
  { href: '#skills',         label: 'Skills' },
  { href: '#projects',       label: 'Projets' },
  { href: '#experience',     label: 'Expérience' },
  { href: '#hackathons',     label: 'Hackathons' },
  { href: '#formations',     label: 'Formation' },
  { href: '#certifications', label: 'Certifs' },
  { href: '#contact',        label: 'Contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeSection, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <a href="#hero" className="navbar__logo">
          <span className="navbar__logo-bracket">&lt;/&gt;</span>
          <span>{data.profile.name.split(' ')[0]}</span>
        </a>

        <ul className="navbar__links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={`navbar__link${activeSection === href.slice(1) ? ' active' : ''}`}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          {data.profile.social.github && (
            <a href={data.profile.social.github} className="social-link" target="_blank" rel="noopener noreferrer" title="GitHub">
              <Icon name="github" size={16} />
            </a>
          )}
          {data.profile.social.gitlab && (
            <a href={data.profile.social.gitlab} className="social-link" target="_blank" rel="noopener noreferrer" title="GitLab">
              <Icon name="gitlab" size={16} />
            </a>
          )}
          {data.profile.cvLink && data.profile.cvLink !== '#' && (
            <a href={data.profile.cvLink} className="btn btn-outline" style={{ padding: '8px 18px', fontSize: '11px' }} target="_blank" rel="noopener noreferrer">
              <Icon name="download" size={12} /> CV
            </a>
          )}
        </div>

        <button
          className={`navbar__burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <Icon name="menu" size={20} color="var(--text-secondary)" />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href} className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
      </div>

      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: var(--nav-height);
          transition: background var(--transition), border-color var(--transition), box-shadow var(--transition);
          border-bottom: 1px solid transparent;
        }
        .navbar--scrolled {
          background: rgba(10, 14, 20, 0.9);
          backdrop-filter: blur(24px);
          border-bottom-color: var(--border);
          box-shadow: 0 4px 32px rgba(0,0,0,0.3);
        }
        .navbar__logo {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 14px; font-weight: 700;
          color: var(--text-primary); transition: color var(--transition);
        }
        .navbar__logo:hover { color: var(--accent); }
        .navbar__logo-bracket { color: var(--accent); }
        .navbar__links { display: flex; gap: 24px; align-items: center; list-style: none; }
        .navbar__link {
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--text-secondary); transition: color var(--transition);
          position: relative; padding-bottom: 2px;
        }
        .navbar__link::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px; background: var(--accent);
          transition: width var(--transition);
        }
        .navbar__link:hover, .navbar__link.active { color: var(--accent); }
        .navbar__link.active::after, .navbar__link:hover::after { width: 100%; }
        .navbar__actions { display: flex; align-items: center; gap: 10px; }
        .navbar__burger { display: none; background: none; border: none; padding: 4px; cursor: pointer; }

        .mobile-menu {
          position: fixed; top: var(--nav-height); left: 0; right: 0; z-index: 99;
          background: rgba(10,14,20,0.97); backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          display: flex; flex-direction: column; padding: 20px 28px; gap: 4px;
          transform: translateY(-100%); opacity: 0; pointer-events: none;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
        }
        .mobile-menu.open { transform: translateY(0); opacity: 1; pointer-events: all; }
        .mobile-menu__link {
          font-family: var(--font-mono); font-size: 13px;
          color: var(--text-secondary); padding: 12px 0;
          border-bottom: 1px solid var(--border);
          transition: color var(--transition);
        }
        .mobile-menu__link:last-child { border-bottom: none; }
        .mobile-menu__link:hover { color: var(--accent); }

        @media (max-width: 900px) {
          .navbar { padding: 0 24px; }
          .navbar__links, .navbar__actions { display: none; }
          .navbar__burger { display: flex; }
        }
      `}</style>
    </>
  );
}
