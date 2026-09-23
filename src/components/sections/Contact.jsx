import { useState } from 'react';
import data from '../../data/portfolio.json';
import { SplitText, SocialLinks, RollText } from '../ui/index.jsx';
import { Icon } from '../ui/Icons.jsx';
import { useReveal } from '../../hooks/useReveal.js';
import { useMagnetic } from '../../hooks/useMotion.js';

export default function Contact() {
  const { profile, contact } = data;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const bubbleRef = useMagnetic(0.4);
  const infoRef = useReveal();
  const formRef = useReveal();

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  /* No backend: the form hands a pre-filled draft to the visitor's mail app */
  const handleSubmit = e => {
    e.preventDefault();
    const subject = form.subject || `Contact depuis le portfolio — ${form.name}`;
    const body = `${form.message}\n\n${form.name}${form.email ? ` (${form.email})` : ''}`;
    window.location.href =
      `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <p className="contact__eyebrow">(09) Contact</p>

        <div className="contact__hero">
          <SplitText as="h2" text="Un projet, une idée ? *Parlons-en.*" className="contact__title" />
          <a ref={bubbleRef} href={`mailto:${profile.email}`} className="contact__bubble magnetic">
            <span>Écrire</span>
            <Icon name="arrowUpRight" size={26} />
          </a>
        </div>

        <div className="contact__inner">
          <div ref={infoRef} className="contact__info reveal">
            <p className="contact__availability">{contact.availability}</p>

            <button className="contact__email" onClick={copyEmail}>
              <span className="contact__email-value">{profile.email}</span>
              <span className="contact__email-hint">{copied ? 'Copié !' : 'Copier'}</span>
            </button>

            <ul className="contact__items">
              <li><span>Téléphone</span><a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a></li>
              <li><span>Localisation</span>{profile.location}</li>
              <li><span>Délai</span>{contact.responseTime}</li>
            </ul>

            <SocialLinks social={profile.social} className="contact__social" />
          </div>

          <form ref={formRef} className="contact__form reveal" onSubmit={handleSubmit}>
            <div className="contact__row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nom</label>
                <input id="name" name="name" className="form-input" value={form.name}
                  onChange={handleChange} placeholder="Jean Dupont" required autoComplete="name" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="form-input" value={form.email}
                  onChange={handleChange} placeholder="jean@exemple.fr" autoComplete="email" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="subject">Sujet</label>
              <input id="subject" name="subject" className="form-input" value={form.subject}
                onChange={handleChange} placeholder="Stage, alternance, projet…" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea id="message" name="message" className="form-textarea" value={form.message}
                onChange={handleChange} placeholder="Quelques mots sur votre besoin" required />
            </div>
            <button type="submit" className="btn btn-primary contact__submit">
              <RollText>Envoyer le message</RollText>
              <Icon name="send" size={15} className="btn__arrow" />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact { background: var(--ink); color: #fff; padding-bottom: 100px; }
        .contact__eyebrow { font-family: var(--font-mono); font-size: 12px; color: var(--accent-soft); margin-bottom: 28px; }

        .contact__hero {
          display: flex; align-items: flex-end; justify-content: space-between; gap: 32px;
          padding-bottom: 64px; margin-bottom: 64px; border-bottom: 1px solid var(--ink-line);
        }
        .contact__title {
          font-size: clamp(48px, 9vw, 136px); font-weight: 700;
          letter-spacing: -0.045em; line-height: 0.92; max-width: 900px;
        }
        .contact__title em { color: var(--accent-soft); }
        .contact__bubble {
          flex-shrink: 0; width: 180px; height: 180px; border-radius: 50%;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
          background: var(--accent); color: #fff; font-size: 20px; font-weight: 600;
          transition: transform 0.6s var(--ease-out), background var(--transition);
        }
        .contact__bubble:hover { background: #fff; color: var(--accent); }

        .contact__inner { display: grid; grid-template-columns: 1fr 1.25fr; gap: 80px; }
        .contact__availability { font-size: 18px; line-height: 1.55; color: var(--ink-text); max-width: 380px; margin-bottom: 32px; }
        .contact__email {
          display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap;
          text-align: left; margin-bottom: 32px;
        }
        .contact__email-value {
          font-size: clamp(22px, 2.4vw, 32px); font-weight: 600; letter-spacing: -0.03em;
          background: linear-gradient(currentColor, currentColor) 0 100% / 0 2px no-repeat;
          transition: background-size 0.6s var(--ease-out);
        }
        .contact__email:hover .contact__email-value { background-size: 100% 2px; }
        .contact__email-hint { font-family: var(--font-mono); font-size: 12px; color: var(--accent-soft); }

        .contact__items { margin-bottom: 36px; }
        .contact__items li {
          display: flex; justify-content: space-between; gap: 16px;
          padding: 14px 0; border-bottom: 1px solid var(--ink-line); font-size: 15px;
        }
        .contact__items li span { font-family: var(--font-mono); font-size: 12px; color: var(--ink-text); text-transform: uppercase; letter-spacing: 0.06em; }
        .contact__items a:hover { color: var(--accent-soft); }
        .contact__social .social-link { color: #fff; border-color: var(--ink-line); }

        .contact__form { display: flex; flex-direction: column; gap: 32px; }
        .contact__form .form-label { color: var(--ink-text); }
        .contact__form .form-input,
        .contact__form .form-textarea { border-bottom-color: var(--ink-line); }
        .contact__form .form-input::placeholder,
        .contact__form .form-textarea::placeholder { color: rgba(255,255,255,0.3); }
        .contact__form .form-input:focus,
        .contact__form .form-textarea:focus { border-bottom-color: var(--accent-soft); }
        .contact__row { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .contact__submit { align-self: flex-start; }
        .contact__submit::before { background: #fff; }
        .contact__submit:hover { color: var(--accent); }

        @media (max-width: 900px) {
          .contact__hero { flex-direction: column; align-items: flex-start; }
          .contact__bubble { width: 140px; height: 140px; align-self: flex-end; }
          .contact__inner { grid-template-columns: 1fr; gap: 56px; }
        }
        @media (max-width: 560px) {
          .contact__row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
