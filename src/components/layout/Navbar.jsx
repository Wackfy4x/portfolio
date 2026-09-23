import { useState, useEffect } from 'react';
import data from '../../data/portfolio.json';
import { RollText, LocalTime } from '../ui/index.jsx';

const NAV_LINKS = [
  { href: '#about',          label: 'À propos' },
  { href: '#skills',         label: 'Skills' },
  { href: '#projects',       label: 'Projets' },
  { href: '#experience',     label: 'Expérience' },
  { href: '#formations',     label: 'Formation' },
  { href: '#contact',        label: 'Contact' },
];

export default function Navbar() {
  const [hidden,   setHidden]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState('');

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Hide while reading downwards, come back as soon as the user scrolls up
      if (Math.abs(y - lastY) > 6) setHidden(y > lastY && y > 400);
      lastY = y;

      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 200) current = id;
      }
      setActive(current);
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = e => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const [first, second] = data.profile.name.split(' ').slice(2);

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}${hidden && !menuOpen ? ' navbar--hidden' : ''}`}>
        <a href="#hero" className="navbar__logo" aria-label="Retour en haut">
          <span className="navbar__mark">wc</span>
          <span className="navbar__logo-name">
            <RollText>{`${first} ${second}`}</RollText>
          </span>
        </a>

        <ul className="navbar__links">
          {NAV_LINKS.slice(0, -1).map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={`navbar__link${active === href.slice(1) ? ' active' : ''}`}>
                <RollText>{label}</RollText>
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="navbar__cta">
          <span className="navbar__cta-dot" />
          <RollText>Me contacter</RollText>
        </a>

        <button
          className={`navbar__burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="mobile-menu__list">
          {NAV_LINKS.map(({ href, label }, i) => (
            <li key={href} style={{ '--i': i }}>
              <a href={href} className="mobile-menu__link" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
                <span className="mobile-menu__num">0{i + 1}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__foot">
          <span>{data.profile.location}</span>
          <LocalTime />
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed; top: 16px; left: 50%; z-index: 100;
          width: min(calc(100% - 32px), 1100px);
          transform: translateX(-50%);
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          height: 60px; padding: 0 8px 0 10px;
          border-radius: 999px;
          border: 1px solid transparent;
          transition: transform 0.6s var(--ease-out), background var(--transition), border-color var(--transition), box-shadow var(--transition);
        }
        .navbar--scrolled {
          background: var(--glass-strong);
          backdrop-filter: blur(16px) saturate(1.4);
          -webkit-backdrop-filter: blur(16px) saturate(1.4);
          border-color: var(--border);
          box-shadow: 0 10px 30px -18px rgba(15, 23, 42, 0.25);
        }
        .navbar--hidden { transform: translate(-50%, -140%); }

        .navbar__logo { display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 15px; }
        .navbar__mark {
          width: 40px; height: 40px; border-radius: 12px;
          display: grid; place-items: center;
          background: var(--accent); color: #fff;
          font-weight: 800; font-size: 15px; letter-spacing: -0.04em;
          transition: transform 0.6s var(--ease-out), border-radius 0.6s var(--ease-out);
        }
        .navbar__logo:hover .navbar__mark { transform: rotate(-90deg); border-radius: 50%; }

        .navbar__links { display: flex; gap: 4px; }
        .navbar__link {
          position: relative; display: block;
          padding: 8px 14px; border-radius: 999px;
          font-size: 14px; font-weight: 500; color: var(--text-secondary);
          transition: color var(--transition), background var(--transition);
        }
        .navbar__link:hover { color: var(--text-primary); }
        .navbar__link.active { color: var(--text-primary); background: var(--bg-raised); }

        .navbar__cta {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 20px; border-radius: 999px;
          background: var(--text-primary); color: #fff;
          font-size: 14px; font-weight: 600;
          transition: background var(--transition);
        }
        .navbar__cta:hover { background: var(--accent); }
        .navbar__cta-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #4ade80;
          animation: pulse-ring 2s ease-out infinite;
        }

        .navbar__burger {
          display: none; width: 48px; height: 48px; border-radius: 50%;
          background: var(--text-primary);
          flex-direction: column; align-items: center; justify-content: center; gap: 6px;
        }
        .navbar__burger span {
          width: 18px; height: 2px; border-radius: 2px; background: #fff;
          transition: transform 0.5s var(--ease-out);
        }
        .navbar__burger.open span:nth-child(1) { transform: translateY(4px) rotate(45deg); }
        .navbar__burger.open span:nth-child(2) { transform: translateY(-4px) rotate(-45deg); }

        .mobile-menu {
          position: fixed; inset: 0; z-index: 99;
          background: var(--accent); color: #fff;
          display: flex; flex-direction: column; justify-content: space-between;
          padding: 110px 24px 32px;
          clip-path: circle(0% at calc(100% - 48px) 46px);
          transition: clip-path 0.8s var(--ease-io);
          pointer-events: none;
        }
        .mobile-menu.open { clip-path: circle(150% at calc(100% - 48px) 46px); pointer-events: auto; }
        .mobile-menu__list li {
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .mobile-menu__link {
          display: flex; align-items: baseline; gap: 14px;
          padding: 12px 0;
          font-size: clamp(34px, 10vw, 56px); font-weight: 700;
          letter-spacing: -0.04em; line-height: 1.05;
          transform: translateY(110%);
          transition: transform 0.7s var(--ease-out);
        }
        .mobile-menu.open .mobile-menu__link {
          transform: none;
          transition-delay: calc(0.25s + var(--i) * 0.06s);
        }
        .mobile-menu__num { font-family: var(--font-mono); font-size: 12px; font-weight: 400; opacity: 0.7; letter-spacing: 0; }
        .mobile-menu__foot {
          display: flex; justify-content: space-between;
          font-family: var(--font-mono); font-size: 12px; opacity: 0.8;
        }

        @media (max-width: 1000px) {
          .navbar__links, .navbar__cta { display: none; }
          .navbar__burger { display: flex; }
          .navbar { top: 12px; height: 64px; }
        }
        @media (max-width: 380px) {
          .navbar__logo-name { display: none; }
        }
      `}</style>
    </>
  );
}
