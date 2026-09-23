import data from '../../data/portfolio.json';
import { SocialLinks, RollText, LocalTime } from '../ui/index.jsx';
import { useReveal } from '../../hooks/useReveal.js';

const NAV = [
  { href: '#about',          label: 'À propos' },
  { href: '#skills',         label: 'Skills' },
  { href: '#projects',       label: 'Projets' },
  { href: '#experience',     label: 'Expérience' },
  { href: '#hackathons',     label: 'Hackathons' },
  { href: '#formations',     label: 'Formation' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact',        label: 'Contact' },
];

export default function Footer() {
  const { profile, footer } = data;
  const markRef = useReveal();
  const [first, second] = profile.name.split(' ').slice(2);
  const letters = `${first} ${second}`.split('');

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <nav className="footer__nav" aria-label="Pied de page">
            {NAV.map(({ href, label }) => (
              <a key={href} href={href}><RollText>{label}</RollText></a>
            ))}
          </nav>
          <SocialLinks social={profile.social} className="footer__social" />
        </div>

        <p ref={markRef} className="footer__mark" aria-label={profile.name}>
          {letters.map((ch, i) => (
            <span key={i} aria-hidden="true" style={{ '--i': i }}>{ch === ' ' ? ' ' : ch}</span>
          ))}
        </p>

        <div className="footer__bottom">
          <span>© {footer.copyright} {profile.name}</span>
          <span>{profile.location} — <LocalTime /></span>
          <a href="#hero" className="footer__top-link"><RollText>Retour en haut ↑</RollText></a>
        </div>
      </div>

      <style>{`
        .footer { background: var(--ink); color: #fff; padding: 0 0 28px; overflow: hidden; }
        .footer__top {
          display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap;
          padding: 32px 0; border-top: 1px solid var(--ink-line);
        }
        .footer__nav { display: flex; flex-wrap: wrap; gap: 8px 24px; font-size: 15px; color: var(--ink-text); }
        .footer__nav a:hover { color: #fff; }
        .footer__social .social-link { color: #fff; border-color: var(--ink-line); }

        .footer__mark {
          display: flex; justify-content: space-between;
          /* the name is ~6.3em wide: size it to always fill the container */
          font-size: min(178px, calc((100vw - 2 * var(--container-pad)) / 6.6)); font-weight: 700;
          letter-spacing: -0.04em; line-height: 0.9;
          padding: 24px 0.05em 12px 0; overflow: hidden;
          white-space: nowrap;
        }
        .footer__mark span {
          display: inline-block;
          transform: translateY(100%);
          transition: transform 1s var(--ease-out), color 0.3s;
          transition-delay: calc(var(--i) * 35ms), 0s;
        }
        .footer__mark.is-visible span { transform: none; }
        .footer__mark span:hover { color: var(--accent-soft); transform: translateY(-8%); transition-delay: 0s; }

        .footer__bottom {
          display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap;
          padding-top: 20px; border-top: 1px solid var(--ink-line);
          font-family: var(--font-mono); font-size: 12px; color: var(--ink-text);
        }
        .footer__top-link:hover { color: #fff; }

        @media (max-width: 640px) {
          .footer__bottom { flex-direction: column; }
        }
        @media (prefers-reduced-motion: reduce) {
          .footer__mark span { transform: none !important; }
        }
      `}</style>
    </footer>
  );
}
