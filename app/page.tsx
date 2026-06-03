import Link from 'next/link';
import type { Metadata } from 'next';
import { preload } from 'react-dom';
import { HomeReviews } from '@/components/HomeReviews';
import { LazyVideo } from '@/components/LazyVideo';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/siteMeta';

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME}, Premium Window Tinting in Yuba City, CA` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  // The hero background is a CSS background-image, discovered late by the browser —
  // preloading it moves the LCP fetch to the start of the page load.
  preload('/images/hero-bg.webp', { as: 'image', fetchPriority: 'high' });

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero" data-screen-label="01 Hero">
        <div className="hero__bg"></div>
        <div className="hero__overlay"></div>
        <div className="hero__content">
          <div className="hero__badge lg c-fade-up" style={{ ['--c-delay' as string]: '0.15s' } as React.CSSProperties}>
            <span className="hero__badge-pill">New</span>
            <span className="hero__badge-text">Premium Window Tinting · Yuba City, CA</span>
          </div>
          <h1 className="c-blur" data-blur-text>
            <span className="visually-hidden">Window Tinting in Yuba City, CA — </span>
            <span className="line">Protect Your Ride.</span>
            <span className="line accent">Beat The Heat.</span>
          </h1>
          <p className="hero__sub c-fade-up" style={{ ['--c-delay' as string]: '0.45s' } as React.CSSProperties}>
            Hitek Carbon IR, Ceramic IR, and Ceramic Plus films. Up to 99% UV protection, serious heat rejection, and a
            lifetime warranty on every install, done right the first time.
          </p>
          <div className="hero__ctas c-fade-up" style={{ ['--c-delay' as string]: '0.6s' } as React.CSSProperties}>
            <Link href="/book" className="btn-c btn-c--primary">
              Book Now
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17 L17 7 M9 7 H17 V15" />
              </svg>
            </Link>
            <Link href="/services" className="btn-c btn-c--glass">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 4 L20 12 L5 20 Z" />
              </svg>
              Our Services
            </Link>
          </div>
        </div>

        <div className="hero__partners">
          <span
            className="hero__partners-label lg c-fade-up"
            style={{ ['--c-delay' as string]: '0.85s' } as React.CSSProperties}
          >
            Trusted Films We Use
          </span>
          <div className="hero__partners-row c-fade-up" style={{ ['--c-delay' as string]: '1s' } as React.CSSProperties}>
            <span>Hitek Carbon IR</span>
            <span>Hitek Ceramic IR</span>
            <span>Hitek Ceramic Plus</span>
          </div>
        </div>
      </section>

      {/* ============ TEXT MARQUEE ============ */}
      <section className="marquee marquee--text" aria-hidden="true">
        <div className="marquee__track">
          <span className="marquee__item">Carbon</span>
          <span className="marquee__sep"></span>
          <span className="marquee__item is-outline">Ceramic</span>
          <span className="marquee__sep"></span>
          <span className="marquee__item">Mobile Service</span>
          <span className="marquee__sep"></span>
          <span className="marquee__item is-outline">Lifetime Warranty</span>
          <span className="marquee__sep"></span>
          <span className="marquee__item">Yuba City, CA</span>
          <span className="marquee__sep"></span>
          <span className="marquee__item">Carbon</span>
          <span className="marquee__sep"></span>
          <span className="marquee__item is-outline">Ceramic</span>
          <span className="marquee__sep"></span>
          <span className="marquee__item">Mobile Service</span>
          <span className="marquee__sep"></span>
          <span className="marquee__item is-outline">Lifetime Warranty</span>
          <span className="marquee__sep"></span>
          <span className="marquee__item">Yuba City, CA</span>
          <span className="marquee__sep"></span>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="section section--alt" id="services" data-screen-label="02 Services">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Find The Right Fit</span>
            <h2>Our Services</h2>
            <p className="muted">
              Our most popular installs, all built around premium HITEK film and the kind of install detail that holds
              up year after year. View all services for the full lineup including windshield, sunroof, sun strip, and
              more.
            </p>
          </div>

          <div className="services__grid">
            <article className="service-card reveal">
              <div className="service-card__header">
                <span className="service-card__eyebrow">Hitek Carbon IR</span>
              </div>
              <h3 className="service-card__title">
                Carbon Window
                <br />
                Tinting
              </h3>
              <p className="service-card__desc">
                Clean, reliable tint with solid heat and glare reduction. Hitek Carbon IR film. A great upgrade that
                looks sharp and performs.
              </p>
              <div className="service-card__price">
                <span>Starting At</span>
                <strong>$290</strong>
              </div>
              <Link href="/services#carbon" className="service-card__link">
                Learn More<span className="visually-hidden"> about Carbon Window Tinting</span>
              </Link>
            </article>

            <article className="service-card reveal reveal--delay-1">
              <div className="service-card__header">
                <span className="service-card__eyebrow">Hitek Ceramic IR</span>
              </div>
              <h3 className="service-card__title">
                Ceramic Window
                <br />
                Tinting
              </h3>
              <p className="service-card__desc">
                Our premium option. Up to 75% infrared heat rejection for a cooler, more comfortable ride. Hitek
                Ceramic IR, top of the line.
              </p>
              <div className="service-card__price">
                <span>Starting At</span>
                <strong>$390</strong>
              </div>
              <Link href="/services#ceramic" className="service-card__link">
                Learn More<span className="visually-hidden"> about Ceramic Window Tinting</span>
              </Link>
            </article>

            <article className="service-card reveal reveal--delay-2">
              <div className="service-card__header">
                <span className="service-card__eyebrow">Old Film &amp; Adhesive</span>
              </div>
              <h3 className="service-card__title">
                Tint
                <br />
                Removal
              </h3>
              <p className="service-card__desc">
                Safe removal of old or damaged film and adhesive to prep for a fresh install. No scratched glass, no
                shortcuts.
              </p>
              <div className="service-card__price">
                <span>Starting At</span>
                <strong>$50</strong>
              </div>
              <Link href="/services#removal" className="service-card__link">
                Learn More<span className="visually-hidden"> about Tint Removal</span>
              </Link>
            </article>
          </div>

          <div className="gallery__cta reveal">
            <Link href="/services" className="btn btn--ghost">
              View More Services
            </Link>
          </div>
        </div>
      </section>

      {/* ============ BADGE MARQUEE ============ */}
      <section className="marquee marquee--badges marquee--reverse marquee--slow" aria-hidden="true">
        <div className="marquee__track">
          <span className="marquee__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2 L4 6 V12 C4 18 8 21 12 22 C16 21 20 18 20 12 V6 Z" /></svg>
            Lifetime Warranty
          </span>
          <span className="marquee__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M12 7 V12 L15 14" /></svg>
            Same Week Booking
          </span>
          <span className="marquee__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12 L6 15 L21 4" /></svg>
            99% UV Protection
          </span>
          <span className="marquee__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="6" width="18" height="14" rx="1" /><path d="M3 10 H21 M8 6 V20 M16 6 V20" /></svg>
            Hitek Premium Film
          </span>
          <span className="marquee__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 11 L9 11 V8 H15 V11 H19 L19 19 H5 Z" /><circle cx="9" cy="19" r="2" /><circle cx="15" cy="19" r="2" /></svg>
            Mobile Service
          </span>
          <span className="marquee__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3 L15 9 L21 10 L17 14 L18 21 L12 18 L6 21 L7 14 L3 10 L9 9 Z" /></svg>
            200+ Installs
          </span>
          <span className="marquee__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2 L4 6 V12 C4 18 8 21 12 22 C16 21 20 18 20 12 V6 Z" /></svg>
            Lifetime Warranty
          </span>
          <span className="marquee__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M12 7 V12 L15 14" /></svg>
            Same Week Booking
          </span>
          <span className="marquee__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12 L6 15 L21 4" /></svg>
            99% UV Protection
          </span>
          <span className="marquee__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="6" width="18" height="14" rx="1" /><path d="M3 10 H21 M8 6 V20 M16 6 V20" /></svg>
            Hitek Premium Film
          </span>
          <span className="marquee__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 11 L9 11 V8 H15 V11 H19 L19 19 H5 Z" /><circle cx="9" cy="19" r="2" /><circle cx="15" cy="19" r="2" /></svg>
            Mobile Service
          </span>
          <span className="marquee__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3 L15 9 L21 10 L17 14 L18 21 L12 18 L6 21 L7 14 L3 10 L9 9 Z" /></svg>
            200+ Installs
          </span>
        </div>
      </section>

      {/* ============ MOBILE SERVICE BANNER ============ */}
      <section className="banner" data-screen-label="03 Mobile Service">
        <div
          className="banner__bg"
          style={{
            backgroundImage: "url('/Oscuro%20tints/tint_from_insideview-1600.webp')",
          }}
        ></div>
        <div className="banner__overlay banner__overlay--left"></div>
        <div className="container">
          <div className="banner__content reveal">
            <span className="eyebrow">On-Site · On Time</span>
            <h2>
              Mobile Service
              <br />
              Available
            </h2>
            <p>
              We bring the shop to you. Serving Yuba City, Marysville, Olivehurst, Live Oak, Plumas Lake, Gridley, and
              the rest of Sutter and Yuba County. Driveways, offices, or anywhere you need us. Same premium install,
              same lifetime warranty.
            </p>
            <p style={{ marginTop: 12, fontSize: 14, color: 'var(--ink-muted)' }}>
              Need service farther out? Contact us for availability and custom travel pricing.
            </p>
            <div className="banner__ctas">
              <Link href="/book" className="btn btn--primary">
                Book Appointment
              </Link>
              <Link href="/mobile-window-tinting-yuba-city" className="btn btn--ghost">
                About Mobile Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Why Oscuro</span>
            <h2>
              The Standard
              <br />
              We Build To
            </h2>
          </div>
        </div>
        <div className="container">
          <div className="reasons">
            <article className="reason reveal">
              <div className="reason__num">01</div>
              <div className="reason__icon">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M6 26 L16 6 L26 26 Z" />
                  <path d="M11 22 L16 12 L21 22" />
                </svg>
              </div>
              <h3 className="reason__title">Precision Installs</h3>
              <div className="reason__split">
                <div className="reason__row">
                  <span className="reason__tag">Difference</span>
                  <p>Every cut and every install is done with attention to detail.</p>
                </div>
                <div className="reason__row">
                  <span className="reason__tag reason__tag--accent">Benefit</span>
                  <p>Clean edges, no bubbles, no shortcuts.</p>
                </div>
              </div>
            </article>

            <article className="reason reveal reveal--delay-1">
              <div className="reason__num">02</div>
              <div className="reason__icon">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <rect x="6" y="6" width="20" height="20" />
                  <path d="M6 14 H26 M14 6 V26" />
                  <circle cx="20" cy="20" r="2.5" fill="currentColor" />
                </svg>
              </div>
              <h3 className="reason__title">Premium Hitek Film</h3>
              <div className="reason__split">
                <div className="reason__row">
                  <span className="reason__tag">Difference</span>
                  <p>We use premium HITEK Carbon IR, Ceramic IR &amp; Ceramic Plus window films.</p>
                </div>
                <div className="reason__row">
                  <span className="reason__tag reason__tag--accent">Benefit</span>
                  <p>Up to 99% UV protection and 90% IR rejection. Serious heat rejection, and zero interference with phone, GPS, Bluetooth, or keyless entry.</p>
                </div>
              </div>
            </article>

            <article className="reason reveal reveal--delay-2">
              <div className="reason__num">03</div>
              <div className="reason__icon">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M16 4 L26 9 V15 C26 22 21 27 16 28 C11 27 6 22 6 15 V9 Z" />
                  <path d="M11 16 L15 20 L21 13" />
                </svg>
              </div>
              <h3 className="reason__title">Lifetime Warranty</h3>
              <div className="reason__split">
                <div className="reason__row">
                  <span className="reason__tag">Difference</span>
                  <p>Every install is backed by a full lifetime warranty.</p>
                </div>
                <div className="reason__row">
                  <span className="reason__tag reason__tag--accent">Benefit</span>
                  <p>Long-term peace of mind. If it ever bubbles, peels, or fades, we make it right.</p>
                </div>
              </div>
            </article>

            <article className="reason reveal reveal--delay-3">
              <div className="reason__num">04</div>
              <div className="reason__icon">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M6 26 V20 C6 16 9 13 13 13 H19 C23 13 26 16 26 20 V26" />
                  <circle cx="16" cy="9" r="4" />
                </svg>
              </div>
              <h3 className="reason__title">Customer-First Service</h3>
              <div className="reason__split">
                <div className="reason__row">
                  <span className="reason__tag">Difference</span>
                  <p>Clear communication, honest recommendations, no upsell nonsense.</p>
                </div>
                <div className="reason__row">
                  <span className="reason__tag reason__tag--accent">Benefit</span>
                  <p>You get the right film for your needs and budget.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="cprocess section--alt" data-screen-label="04b Process">
        <div className="container">
          <div className="section-head cprocess__head">
            <span className="eyebrow">How It Works</span>
            <h2 className="c-blur" data-blur-text>
              Four Steps. Done Right.
            </h2>
          </div>

          <div className="cprocess__grid">
            <div className="cprocess__step">
              <span className="cprocess__num">01</span>
              <h3 className="cprocess__title">Quote</h3>
              <p className="cprocess__body">Send us your vehicle details for fast, transparent pricing, no guesswork, no surprise charges.</p>
            </div>
            <div className="cprocess__step">
              <span className="cprocess__num">02</span>
              <h3 className="cprocess__title">Pick Your Shade</h3>
              <p className="cprocess__body">We carry 2%, 5%, 15%, 20%, 35%, 50%, and 70% tint options, and we&apos;ll help you choose the right balance of privacy, heat rejection, and style.</p>
            </div>
            <div className="cprocess__step">
              <span className="cprocess__num">03</span>
              <h3 className="cprocess__title">Professional Installation</h3>
              <p className="cprocess__body">Installed in-shop or at your location using precision-cut patterns and proven installation methods for a clean, factory-quality finish.</p>
            </div>
            <div className="cprocess__step">
              <span className="cprocess__num">04</span>
              <h3 className="cprocess__title">Drive Away Protected</h3>
              <p className="cprocess__body">Leave with cooler comfort, UV protection, warranty coverage, and aftercare instructions so your tint lasts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="cstats" data-screen-label="04c Stats">
        <LazyVideo className="cstats__bg" src="/Oscuro%20tints/video1-bg.webm" />
        <div className="cstats__fade-t"></div>
        <div className="cstats__fade-b"></div>

        <div className="container">
          <div className="cstats__head">
            <span className="eyebrow">By The Numbers</span>
            <h2 className="c-blur" data-blur-text>
              Quality Over Shortcuts.
            </h2>
          </div>

          <div className="cstats__card lg">
            <div className="cstats__grid">
              <div className="cstat">
                <span className="cstat__value" data-count-to="200" data-suffix="+">200+</span>
                <span className="cstat__label">Vehicles Tinted</span>
              </div>
              <div className="cstat">
                <span className="cstat__value" data-count-to="22" data-suffix="+">22+</span>
                <span className="cstat__label">5-Star Reviews</span>
              </div>
              <div className="cstat">
                <span className="cstat__value">
                  24<span className="cstat__small">hr</span>
                </span>
                <span className="cstat__label">Quote Response</span>
              </div>
              <div className="cstat">
                <span className="cstat__value">
                  2<span className="cstat__small">yr</span>
                </span>
                <span className="cstat__label">Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GALLERY PREVIEW ============ */}
      <section className="section" id="gallery" data-screen-label="05 Gallery">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Our Work</span>
            <h2>Recent Installs</h2>
            <p className="muted">
              A look at recent jobs, clean ceramic tints, factory-match finishes, and full builds from our Yuba City
              shop.
            </p>
          </div>
          <div className="gallery__grid reveal">
            {[
              { file: 'after9-thumb.webp', alt: 'Rear window tint install on a sedan at Oscuro Tintz in Yuba City, CA' },
              { file: 'after7-thumb.webp', alt: 'HITEK ceramic window tint on rear side windows, Yuba City, CA' },
              { file: 'after6-thumb.webp', alt: 'Full vehicle window tinting result with dark ceramic film, Yuba City, CA' },
              { file: 'backright-lexus-thumb.webp', alt: 'Ceramic tint on the back-right window of a Lexus, Yuba City, CA' },
              { file: 'after2-thumb.webp', alt: 'Freshly tinted side windows after professional install, Yuba City, CA' },
              { file: 'after3-thumb.webp', alt: 'Window tint install with clean factory-match finish, Yuba City, CA' },
              { file: 'IMG_8148-thumb.webp', alt: 'Precision window tint installation by Oscuro Tintz, Yuba City, CA' },
            ].map((item, i) => (
              <div key={i} className="gallery__item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/Oscuro%20tints/${item.file}`}
                  alt={item.alt}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
          <div className="gallery__cta reveal">
            <Link href="/gallery" className="btn btn--ghost">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WARRANTY BANNER ============ */}
      <section className="banner" data-screen-label="06b Warranty">
        <div
          className="banner__bg"
          style={{
            backgroundImage: "url('/Oscuro%20tints/IMG_8148-1600.webp')",
          }}
        ></div>
        <div className="banner__overlay banner__overlay--center"></div>
        <div className="container">
          <div className="banner__content is-center reveal">
            <span className="eyebrow">Backed For Life</span>
            <h2>
              Lifetime
              <br />
              Warranty.
            </h2>
            <p>
              Every qualifying install is backed for as long as you own the vehicle. If your film bubbles, peels, fades,
              or shows manufacturer defects, we&apos;ll make it right.
            </p>
            <p style={{ marginTop: 16, fontSize: 13, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
              Clean, trustworthy, strong.
            </p>
            <div className="banner__ctas is-center">
              <Link href="/book" className="btn btn--primary">
                Book Your Install
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section" data-screen-label="07 Reviews">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Testimonials</span>
            <h2>
              Reviews From
              <br />
              Our Customers
            </h2>
          </div>
        </div>
        <HomeReviews />
        <div className="container">
          <div className="gallery__cta reveal" style={{ marginTop: 56 }}>
            <Link href="/reviews" className="btn btn--ghost">
              Read All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ============ ABOUT TEASER ============ */}
      <section className="aboutcta" data-screen-label="05b About Teaser">
        <div
          className="aboutcta__bg"
          style={{ backgroundImage: "url('/Oscuro%20tints/cuttingfilm.webp')" }}
        ></div>
        <div className="aboutcta__overlay"></div>
        <div className="container aboutcta__inner reveal">
          <div className="aboutcta__text">
            <span className="eyebrow">About Oscuro Tintz</span>
            <h2>One Shop. One Standard.</h2>
            <p>
              As an owner-operated business, every install reflects my name and reputation. That means cleaner work,
              better communication, and attention to the details bigger shops often miss.
            </p>
          </div>
          <Link href="/about" className="btn btn--ghost aboutcta__btn">
            Read More About Us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17 L17 7 M9 7 H17 V15" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section section--alt" data-screen-label="06 FAQ" id="faq">
        <div className="container">
          <div
            className="section-head reveal"
            style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', alignItems: 'flex-start' }}
          >
            <span className="eyebrow">FAQs</span>
            <h2>
              Frequently Asked
              <br />
              Questions
            </h2>
          </div>
          <div className="faq reveal">
            {[
              {
                q: "What's the difference between your tint options?",
                a: (
                  <>
                    <p style={{ marginBottom: 16 }}>
                      Three tiers of HITEK film: Carbon IR for value, Ceramic IR for premium comfort, and Ceramic Plus
                      for maximum heat rejection and long-term performance.
                    </p>
                    <div className="faq-chart">
                      <table>
                        <thead>
                          <tr>
                            <th>Feature</th>
                            <th>Carbon IR</th>
                            <th>Ceramic IR</th>
                            <th>Ceramic Plus</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>UV Protection</td>
                            <td>✓</td>
                            <td>✓</td>
                            <td>✓</td>
                          </tr>
                          <tr>
                            <td>Heat Rejection</td>
                            <td>Good</td>
                            <td>Better</td>
                            <td>Best</td>
                          </tr>
                          <tr>
                            <td>Infrared Rejection</td>
                            <td>Good</td>
                            <td>High</td>
                            <td>Maximum</td>
                          </tr>
                          <tr>
                            <td>Signal Interference</td>
                            <td>None</td>
                            <td>None</td>
                            <td>None</td>
                          </tr>
                          <tr>
                            <td>Best For</td>
                            <td>Value</td>
                            <td>Premium</td>
                            <td>Maximum Performance</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ),
              },
              {
                q: 'How long does tinting take?',
                a: "Most full vehicles take 2–4 hours. Larger SUVs or trucks may run a bit longer. We'll give you a firm time estimate when you book.",
              },
              {
                q: 'Is window tinting legal in California?',
                a: (
                  <>
                    <p style={{ marginBottom: 12 }}>
                      Yes, within limits set by California Vehicle Code 26708. Front driver and passenger windows must
                      allow more than 70% of light through (70%+ VLT). Rear side windows and the back windshield can be
                      any darkness — but if your back windshield is tinted, you need working side mirrors on both
                      sides. On the windshield itself, only a non-reflective strip above the manufacturer&apos;s AS-1
                      line (roughly the top 4–5 inches) is allowed.
                    </p>
                    <p>
                      Medical exemptions exist for drivers with documented light-sensitive conditions. We&apos;ll walk
                      you through exactly what&apos;s legal for your vehicle —{' '}
                      <Link href="/california-window-tint-laws">read our full California tint law guide</Link>.
                    </p>
                  </>
                ),
              },
              {
                q: 'Do you offer mobile service?',
                a: 'Yes, we offer mobile installs throughout Yuba City, Marysville, Sutter County, and the surrounding area. We just need a clean, shaded spot to work.',
              },
              {
                q: 'Is there a warranty?',
                a: 'Yes. Our qualifying installs include lifetime warranty coverage against bubbling, peeling, fading, and manufacturer defects for as long as you own the vehicle.',
              },
              {
                q: 'Do you remove old tint?',
                a: 'Yes, old tint removal is available. Pricing depends on the condition of the existing film and adhesive.',
              },
              {
                q: 'Do you tint windshields?',
                a: "Yes. We offer windshield tint options for heat rejection, glare reduction, and added comfort while maintaining visibility. If you're unsure what's legal or best for your vehicle, we'll walk you through your options.",
              },
              {
                q: 'How long before I can roll my windows down?',
                a: 'Please keep your windows rolled up for 3–5 days after installation to allow the film to properly cure and bond to the glass. Cure time may vary depending on weather conditions.',
              },
              {
                q: 'How do I get a quote?',
                a: "Getting a quote is easy. Send us your vehicle year, make, model, and which windows you'd like tinted, and we'll get back to you with pricing as quickly as possible.",
              },
              {
                q: 'How do I care for my tint after install?',
                a: "Leave the windows up for 3–5 days while the film cures. After that, clean with a soft microfiber and any ammonia-free glass cleaner. That's it.",
              },
            ].map((f, i) => (
              <div key={i} className="faq__item">
                <button className="faq__q">
                  <span>{f.q}</span>
                  <span className="faq__icon"></span>
                </button>
                <div className="faq__a">
                  <div className="faq__a-inner">
                    {typeof f.a === 'string' ? <p>{f.a}</p> : f.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="final-cta" data-screen-label="08 Book CTA">
        <div className="final-cta__bg"></div>
        <div className="final-cta__overlay"></div>
        <div className="reveal">
          <span className="eyebrow" style={{ justifyContent: 'center', color: 'var(--chrome-3)' }}>
            Ready When You Are
          </span>
          <h2 style={{ marginTop: 20 }}>Ready To Book?</h2>
          <p>Lock in a date, pick your film, and we&apos;ll handle the rest. Most appointments are available within the week.</p>
          <Link href="/book" className="btn btn--primary">
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}
