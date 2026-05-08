import Link from 'next/link';
import type { Metadata } from 'next';
import { HomeReviews } from '@/components/HomeReviews';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/siteMeta';

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME}, Premium Window Tinting in Yuba City, CA` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
};

export default function HomePage() {
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
            <span className="line">Protect Your Ride.</span>
            <span className="line accent">Beat The Heat.</span>
          </h1>
          <p className="hero__sub c-fade-up" style={{ ['--c-delay' as string]: '0.95s' } as React.CSSProperties}>
            Hitek Carbon &amp; Ceramic films. Up to 99% UV protection, serious heat rejection, and a lifetime warranty
            on every install, done right the first time.
          </p>
          <div className="hero__ctas c-fade-up" style={{ ['--c-delay' as string]: '1.15s' } as React.CSSProperties}>
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
            style={{ ['--c-delay' as string]: '1.4s' } as React.CSSProperties}
          >
            Trusted Films We Use
          </span>
          <div className="hero__partners-row c-fade-up" style={{ ['--c-delay' as string]: '1.55s' } as React.CSSProperties}>
            <span>Hitek IR</span>
            <span>Hitek Ceramic</span>
            <span>Carbon Pro</span>
            <span>Crystalline</span>
            <span>Nano Ceramic</span>
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
              Three core services, each built around premium Hitek film and the kind of install detail that holds up
              year after year.
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
                Learn More
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
                Learn More
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
                Learn More
              </Link>
            </article>
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
            500+ Installs
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
            500+ Installs
          </span>
        </div>
      </section>

      {/* ============ MOBILE SERVICE BANNER ============ */}
      <section className="banner" data-screen-label="03 Mobile Service">
        <div
          className="banner__bg"
          style={{
            backgroundImage: "url('/Oscuro%20tints/tint_from_insideview.webp')",
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
              We bring the shop to you. Serving Yuba City, Marysville, Sutter County, and surrounding areas. Driveways,
              offices, or anywhere you need us. Same premium install, same lifetime warranty.
            </p>
            <div className="banner__ctas">
              <Link href="/book" className="btn btn--primary">
                Book Appointment
              </Link>
              <Link href="/services" className="btn btn--ghost">
                View Services
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
                  <p>We use Hitek Carbon IR and Ceramic IR films.</p>
                </div>
                <div className="reason__row">
                  <span className="reason__tag reason__tag--accent">Benefit</span>
                  <p>Up to 99% UV protection and serious heat rejection on every install.</p>
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
                  <p>If it ever bubbles, peels, or fades, we fix it.</p>
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
              <p className="cprocess__body">Text us a few photos of your vehicle. We send a fixed price the same day, no surprises.</p>
            </div>
            <div className="cprocess__step">
              <span className="cprocess__num">02</span>
              <h3 className="cprocess__title">Pick Your Shade</h3>
              <p className="cprocess__body">5%, 20%, 35%, 50%. We hold real samples to your glass so you see the exact look before we cut.</p>
            </div>
            <div className="cprocess__step">
              <span className="cprocess__num">03</span>
              <h3 className="cprocess__title">Install</h3>
              <p className="cprocess__body">In our shop or at your location. Computer-cut, hand-installed, dust-free, every time.</p>
            </div>
            <div className="cprocess__step">
              <span className="cprocess__num">04</span>
              <h3 className="cprocess__title">Drive Off</h3>
              <p className="cprocess__body">Care card, warranty paperwork, and a follow-up text. Most cars are ready in under 3 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="cstats" data-screen-label="04c Stats">
        <video className="cstats__bg" autoPlay loop muted playsInline aria-hidden="true">
          <source src="/Oscuro%20tints/video1.webm" type="video/webm" />
        </video>
        <div className="cstats__fade-t"></div>
        <div className="cstats__fade-b"></div>

        <div className="container">
          <div className="cstats__head">
            <span className="eyebrow">By The Numbers</span>
            <h2 className="c-blur" data-blur-text>
              Five Years. Zero Shortcuts.
            </h2>
          </div>

          <div className="cstats__card lg">
            <div className="cstats__grid">
              <div className="cstat">
                <span className="cstat__value" data-count-to="500" data-suffix="+">500+</span>
                <span className="cstat__label">Cars Tinted</span>
              </div>
              <div className="cstat">
                <span className="cstat__value" data-count-to="200" data-suffix="+">200+</span>
                <span className="cstat__label">5-Star Reviews</span>
              </div>
              <div className="cstat">
                <span className="cstat__value">
                  24<span className="cstat__small">h</span>
                </span>
                <span className="cstat__label">Quote Turnaround</span>
              </div>
              <div className="cstat">
                <span className="cstat__value">
                  10<span className="cstat__small">yr</span>
                </span>
                <span className="cstat__label">Installer Experience</span>
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
              'after9.webp',
              'after7.webp',
              'after6.webp',
              'IMG_8046.webp',
              'after2.webp',
              'after3.webp',
              'IMG_8148.webp',
            ].map((file, i) => (
              <div key={i} className="gallery__item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/Oscuro%20tints/${file}`}
                  alt={`Recent Install ${i + 1}`}
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
            backgroundImage: "url('/Oscuro%20tints/IMG_8148.webp')",
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
              Every install is covered for as long as you own the vehicle. Bubbles, peeling, fading, we fix it. No fine
              print, no excuses.
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
            <h2>A Passion Turned Into A Profession</h2>
            <p>One person, one shop, one standard. Built on word-of-mouth and clean installs.</p>
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
                q: "What's the difference between Carbon and Ceramic tint?",
                a: 'Carbon is a reliable everyday film with solid heat and glare control at a great price. Ceramic is our premium option, far better infrared heat rejection, no signal interference, and a cleaner deep-black look that lasts.',
              },
              {
                q: 'How long does tinting take?',
                a: "Most full vehicles take 2–4 hours. Larger SUVs or trucks may run a bit longer. We'll give you a firm time estimate when you book.",
              },
              {
                q: 'Is window tinting legal in California?',
                a: "Yes, within limits. California allows non-reflective tint on the top portion of the windshield and any darkness on rear and back-side windows; front driver/passenger windows must allow more than 70% VLT. We'll walk you through what's legal for your vehicle.",
              },
              {
                q: 'Do you offer mobile service?',
                a: 'Yes, we offer mobile installs throughout Yuba City, Marysville, Sutter County, and the surrounding area. We just need a clean, shaded spot to work.',
              },
              {
                q: 'Is there a warranty?',
                a: "Every install is backed by a full lifetime warranty. If the film ever bubbles, peels, or fades, we'll make it right.",
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
                    <p>{f.a}</p>
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
