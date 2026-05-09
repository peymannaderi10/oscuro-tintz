import Link from 'next/link';
import { EMAIL, HOURS, PHONE, PHONE_TEL, SERVICE_AREA } from '@/lib/siteMeta';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col footer__brand">
            <Link href="/" className="logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="footer__logo" src="/assets/oscuro-logo.png" alt="Oscuro Tintz" />
            </Link>
            <p>
              Premium automotive window tinting in Yuba City, CA using HITEK Carbon IR, Ceramic IR, and Ceramic Plus
              films, backed by lifetime warranty coverage.
            </p>
            <div className="footer__social">
              <a href="#" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 8.5a6.5 6.5 0 0 1-3.8-1.2v7.9a5.8 5.8 0 1 1-5-5.7v2.9a2.9 2.9 0 1 0 2 2.8V3h2.9a3.6 3.6 0 0 0 3.6 3.6h.3V8.5z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer__col">
            <h4>Explore</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li>
                <Link href="/#faq">FAQs</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li>
                <Link href="/contact">Serving Yuba City, Marysville &amp; Surrounding Areas</Link>
              </li>
              <li>
                <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <span style={{ color: 'var(--ink-muted)' }}>{HOURS}</span>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              <li>
                <Link href="/services#carbon">Carbon IR</Link>
              </li>
              <li>
                <Link href="/services#ceramic">Ceramic IR</Link>
              </li>
              <li>
                <Link href="/services#ceramic-plus">Ceramic Plus</Link>
              </li>
              <li>
                <Link href="/services#removal">Tint Removal</Link>
              </li>
              <li>
                <Link href="/services#mobile">Mobile Service</Link>
              </li>
              <li>
                <Link href="/book">Book Appointment</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <div>© 2026 Oscuro Tintz. All rights reserved.</div>
          <div className="tag">{SERVICE_AREA}</div>
        </div>
      </div>
    </footer>
  );
}
