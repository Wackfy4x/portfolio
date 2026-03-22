import { useState } from 'react';
import data from '../../data/portfolio.json';
import { SectionHeader, SocialLinks } from '../ui/index.jsx';
import { Icon } from '../ui/Icons.jsx';

export default function Contact() {
  const { profile, contact } = data;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1000);
  };

  const contactItems = [
    { icon: 'mail',   label: 'Email',        value: profile.email    },
    { icon: 'phone',  label: 'Téléphone',    value: profile.phone    },
    { icon: 'mapPin', label: 'Localisation', value: profile.location },
  ];

  return (
    <section id="contact">
      <div className="container">
        <SectionHeader
          eyebrow="Contact"
          title="Contact"
          subtitle={contact.availability}
        />

        <div className="contact__inner">
          {/* Left — info */}
          <div className="contact__info">
            <p className="contact__response-time">
              <span className="contact__dot" />
              {contact.responseTime}
            </p>

            <div className="contact__items">
              {contactItems.map(item => (
                <div key={item.label} className="contact__item">
                  <div className="contact__item-icon">
                    <Icon name={item.icon} size={16} color="var(--accent)" />
                  </div>
                  <div>
                    <span className="contact__item-label">{item.label}</span>
                    <span className="contact__item-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact__social">
              <p className="contact__social-label">Retrouvez-moi sur</p>
              <SocialLinks social={profile.social} />
            </div>
          </div>

          {/* Right — form */}
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nom</label>
                <input id="name" name="name" className="form-input" value={form.name}
                  onChange={handleChange} placeholder="Jean Dupont" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="form-input" value={form.email}
                  onChange={handleChange} placeholder="jean@exemple.fr" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="subject">Sujet</label>
              <input id="subject" name="subject" className="form-input" value={form.subject}
                onChange={handleChange} placeholder="Sujet de votre message" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea id="message" name="message" className="form-textarea" value={form.message}
                onChange={handleChange} placeholder="Décrivez votre projet ou votre demande..." required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'} style={{ alignSelf: 'flex-start', gap: 8 }}>
              {status === 'idle'    && <><Icon name="send" size={14} /> Envoyer</>}
              {status === 'sending' && '...'}
              {status === 'sent'    && <><Icon name="checkCircle" size={14} /> Message envoyé !</>}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact__inner {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 72px;
          align-items: start;
        }
        .contact__response-time {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 11px;
          color: var(--text-secondary); margin-bottom: 28px;
        }
        .contact__dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent); flex-shrink: 0;
          animation: pulse-ring 2s ease-out infinite;
        }
        .contact__items { margin-bottom: 32px; }
        .contact__item {
          display: flex; align-items: center; gap: 16px;
          padding: 14px 0; border-bottom: 1px solid var(--border);
        }
        .contact__item:first-child { border-top: 1px solid var(--border); }
        .contact__item-icon {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          background: var(--accent-bg); border: 1px solid var(--border);
          border-radius: var(--radius-md); flex-shrink: 0;
        }
        .contact__item-label {
          display: block; font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 2px;
        }
        .contact__item-value { font-size: 14px; color: var(--text-primary); }
        .contact__social-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 12px;
        }
        .contact__form {
          display: flex; flex-direction: column; gap: 16px;
          background: var(--bg-surface); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 32px;
        }
        @media (max-width: 900px) {
          .contact__inner { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </section>
  );
}
