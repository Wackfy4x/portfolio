import data from '../../data/portfolio.json';
import { Icon } from '../ui/Icons.jsx';

export default function Footer() {
  const { profile, footer } = data;

  const navLinks = ['#about','#skills','#projects','#experience','#hackathons','#formations','#certifications','#contact'];

  const socialLinks = [
    { key: 'github',   href: profile.social?.github,   icon: 'github',   label: 'GitHub'   },
    { key: 'gitlab',   href: profile.social?.gitlab,   icon: 'gitlab',   label: 'GitLab'   },
    { key: 'linkedin', href: profile.social?.linkedin, icon: 'linkedin', label: 'LinkedIn' },
    { key: 'twitter',  href: profile.social?.twitter,  icon: 'twitter',  label: 'Twitter'  },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <a href="#hero" className="footer__logo">
            <span style={{ color: 'var(--accent)' }}>&lt;/&gt;</span> {profile.name.split(' ')[0]}
          </a>

          <div className="footer__nav">
            {navLinks.map(href => (
              <a key={href} href={href} className="footer__nav-link">
                {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
              </a>
            ))}
          </div>

          <div className="footer__social">
            {socialLinks.map(({ key, href, icon, label }) =>
              href ? (
                <a key={key} href={href} className="social-link" target="_blank" rel="noopener noreferrer" title={label} style={{ width: 34, height: 34 }}>
                  <Icon name={icon} size={15} />
                </a>
              ) : null
            )}
          </div>

          <p className="footer__copy">
            © {footer.copyright} — Construit avec {footer.builtWith}
          </p>
        </div>
      </div>

      <style>{`
        .footer { border-top: 1px solid var(--border); padding: 48px 0; }
        .footer__inner {
          display: flex; flex-direction: column;
          align-items: center; gap: 24px; text-align: center;
        }
        .footer__logo {
          font-family: var(--font-mono); font-size: 14px; font-weight: 700;
          color: var(--text-secondary); transition: color var(--transition);
        }
        .footer__logo:hover { color: var(--text-primary); }
        .footer__nav { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
        .footer__nav-link {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-muted); transition: color var(--transition);
        }
        .footer__nav-link:hover { color: var(--accent); }
        .footer__social { display: flex; gap: 10px; }
        .footer__copy { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
      `}</style>
    </footer>
  );
}
