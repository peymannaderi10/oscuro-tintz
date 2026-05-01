import Link from 'next/link';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { MapEmbed } from '@/components/MapEmbed';
import { EMAIL, PHONE, PHONE_TEL } from '@/lib/siteMeta';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Call, text, or message Oscuro Tintz for window tinting in Yuba City, Marysville, and Sutter County. Mobile service available.',
  alternates: { canonical: '/contact' },
};

const contactStyles = `
  .contact-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(32px, 5vw, 72px); align-items: flex-start; }
  @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }

  .form { display: grid; gap: 20px; }
  .form label { font-size: 11px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-muted); display: block; margin-bottom: 8px; }
  .form input, .form select, .form textarea {
    width: 100%; padding: 14px 16px; background: var(--bg); border: 1px solid var(--line);
    color: var(--ink); font-family: inherit; font-size: 15px; border-radius: var(--radius-sm);
    transition: border-color .2s, background .2s;
  }
  .form input:focus, .form select:focus, .form textarea:focus { outline: none; border-color: var(--ink); background: var(--bg-2); }
  .form textarea { min-height: 140px; resize: vertical; }
  .form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 560px) { .form__row { grid-template-columns: 1fr; } }
  .form__status { font-size: 13px; color: var(--chrome-3); padding: 12px 0; letter-spacing: 0.08em; }
  .form__status.is-ok { color: #b6e8c3; }

  .info-block { display: grid; gap: 28px; padding: 40px; border: 1px solid var(--line); background: var(--bg-2); }
  .info-item { display: grid; grid-template-columns: 44px 1fr; gap: 18px; align-items: flex-start; }
  .info-item__icon { width: 44px; height: 44px; border: 1px solid var(--line-strong); display: flex; align-items: center; justify-content: center; color: var(--chrome-3); }
  .info-item h4 { font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; margin: 0 0 6px; color: var(--ink-muted); font-family: Inter, sans-serif; font-weight: 700; }
  .info-item p, .info-item a { color: var(--ink); font-size: 15px; line-height: 1.5; margin: 0; }

  .map { aspect-ratio: 21/9; border: 1px solid var(--line); position: relative; overflow: hidden; background: #0a0a0a; margin-top: 72px; }
  .map__inner { position: absolute; inset: 0; }
  .map__inner .leaflet-container { background: #0a0a0a; font-family: 'Inter', sans-serif; }
  .map__inner .leaflet-control-attribution { background: rgba(0,0,0,0.7); color: var(--ink-dim); font-size: 10px; }
  .map__inner .leaflet-control-attribution a { color: var(--ink-muted); }
  .map__inner .leaflet-control-zoom a { background: rgba(0,0,0,0.85); color: var(--ink); border: 1px solid var(--line); }
  .map__inner .leaflet-control-zoom a:hover { background: var(--bg-3); color: var(--ink); }
  .map__pin-marker {
    width: 20px; height: 20px; border-radius: 50%; background: #fff;
    box-shadow: 0 0 0 6px rgba(255,255,255,0.18), 0 0 0 14px rgba(255,255,255,0.06);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 0 6px rgba(255,255,255,0.18), 0 0 0 14px rgba(255,255,255,0.06); }
    50%     { box-shadow: 0 0 0 10px rgba(255,255,255,0.10), 0 0 0 20px rgba(255,255,255,0.04); }
  }
  .map__inner .leaflet-popup-content-wrapper {
    background: var(--bg-2); color: var(--ink); border: 1px solid var(--line);
    border-radius: 0; box-shadow: 0 10px 40px rgba(0,0,0,0.6);
  }
  .map__inner .leaflet-popup-tip { background: var(--bg-2); }
  .map__inner .leaflet-popup-content { margin: 14px 18px; font-size: 13px; line-height: 1.5; }
  .map__inner .leaflet-popup-content strong { font-family: 'Oswald', sans-serif; letter-spacing: 0.06em; text-transform: uppercase; font-size: 13px; }
`;

export default function ContactPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: contactStyles }} />

      <section className="pagehead">
        <div className="pagehead__bg"></div>
        <div className="container pagehead__inner reveal">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> <span className="sep">/</span> <span>Contact</span>
          </div>
          <span className="eyebrow">Get In Touch</span>
          <h1>Contact</h1>
          <p>Questions, quotes, or anything else, send a message, call, or text. We usually respond within a few hours.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <ContactForm />

          <aside className="info-block reveal reveal--delay-1">
            <div className="info-item">
              <div className="info-item__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M5 4h3l2 5-2 1a12 12 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
              </div>
              <div>
                <h4>Call / Text</h4>
                <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
              </div>
            </div>
            <div className="info-item">
              <div className="info-item__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>
            <div className="info-item">
              <div className="info-item__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div>
                <h4>Service Area</h4>
                <p>Yuba City · Marysville · Sutter County · Surrounding areas. Mobile service available.</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-item__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <div>
                <h4>Hours</h4>
                <p>
                  Monday – Sunday
                  <br />
                  8:00 AM – 7:00 PM
                </p>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 24 }}>
              <Link href="/book" className="btn btn--primary" style={{ width: '100%' }}>
                Book Online
              </Link>
            </div>
          </aside>
        </div>

        <div className="container">
          <div className="map reveal">
            <MapEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
