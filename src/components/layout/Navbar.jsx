import { useState, useEffect, useRef } from 'react';
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
  const progressRef = useRef(null);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1));
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 24);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${pct})`;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && scrollY >= el.offsetTop - 140) {
          setActive(sections[i]);
          break;
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div ref={progressRef} className="scroll-progress__fill" />
      </div>

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
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
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
        .scroll-progress {
          position: fixed; top: 0; left: 0; right: 0; height: 2px;
          z-index: 101; background: transparent;
        }
        .scroll-progress__fill {
          height: 100%; width: 100%; background: var(--accent);
          transform: scaleX(0); transform-origin: left;
        }

        .navbar {
          position: fixed; top: var(--nav-offset); left: 50%;
          transform: translateX(-50%);
          z-index: 100; width: min(calc(100% - 40px), 960px);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 8px 0 20px; height: 56px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--glass);
          backdrop-filter: blur(18px);
          transition: background var(--transition), border-color var(--transition), width var(--transition);
        }
        .navbar--scrolled {
          background: var(--glass-strong);
          border-color: var(--border-hover);
        }
        .navbar__logo {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 14px; font-weight: 700;
          color: var(--text-primary); transition: color var(--transition);
        }
        .navbar__logo:hover { color: var(--accent); }
        .navbar__logo-bracket { color: var(--accent); }
        .navbar__links { display: flex; gap: 20px; align-items: center; list-style: none; }
        .navbar__link {
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.05em; text-transform: uppercase;
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
        .navbar__actions { display: flex; align-items: center; gap: 8px; }

        .navbar__burger {
          display: none; width: 36px; height: 36px; border-radius: 50%;
          background: none; border: none; cursor: pointer;
          flex-direction: column; align-items: center; justify-content: center; gap: 4px;
        }
        .navbar__burger span {
          width: 16px; height: 1.5px; background: var(--text-secondary);
          transition: transform var(--transition), opacity var(--transition), background var(--transition);
        }
        .navbar__burger.open span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); background: var(--accent); }
        .navbar__burger.open span:nth-child(2) { opacity: 0; }
        .navbar__burger.open span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); background: var(--accent); }

        .mobile-menu {
          position: fixed; top: calc(var(--nav-offset) + 56px + 10px); left: 20px; right: 20px; z-index: 99;
          background: var(--glass-strong); backdrop-filter: blur(20px);
          border: 1px solid var(--border); border-radius: var(--radius-lg);
          display: flex; flex-direction: column; padding: 10px 20px; gap: 2px;
          transform: translateY(-8px) scale(0.98); opacity: 0; pointer-events: none;
          transition: transform var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out);
        }
        .mobile-menu.open { transform: translateY(0) scale(1); opacity: 1; pointer-events: all; }
        .mobile-menu__link {
          font-family: var(--font-mono); font-size: 13px;
          color: var(--text-secondary); padding: 13px 0;
          border-bottom: 1px solid var(--border);
          transition: color var(--transition);
        }
        .mobile-menu__link:last-child { border-bottom: none; }
        .mobile-menu__link:hover { color: var(--accent); }

        @media (max-width: 900px) {
          .navbar { width: calc(100% - 32px); padding: 0 6px 0 18px; }
          .navbar__links, .navbar__actions { display: none; }
          .navbar__burger { display: flex; }
        }
      `}</style>
    </>
  );
}
