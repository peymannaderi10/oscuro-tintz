import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Carbon IR, Ceramic IR, Ceramic Plus, tint removal, windshield, sunroof, sun strip, and overnight appointments in Yuba City, CA. Lifetime warranty on every install.',
  alternates: { canonical: '/services' },
};

const servicesStyles = `
  .quote-note { padding: clamp(28px, 4vw, 48px) 0 0; }
  .quote-note__card {
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.02);
    padding: clamp(20px, 3vw, 32px);
    display: grid;
    gap: 10px;
  }
  .quote-note__tag {
    font-family: 'Oswald', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--chrome-3);
  }
  .quote-note__card p {
    margin: 0;
    color: var(--ink-muted);
    font-size: 15px;
    line-height: 1.6;
  }
  .quote-note__card p strong { color: var(--ink); font-weight: 600; }

  .service-detail { padding: clamp(72px, 10vw, 120px) 0; }
  .service-detail:last-of-type { border-bottom: none; }
  .service-detail__grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(32px, 6vw, 88px); align-items: center; }
  .service-detail__img { aspect-ratio: 4/3; position: relative; overflow: hidden; border: 1px solid var(--line); }
  .service-detail__pricing--split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: baseline; }
  .service-detail__pricing--split > div { display: flex; align-items: baseline; gap: 14px; }
  @media (max-width: 520px) { .service-detail__pricing--split { grid-template-columns: 1fr; gap: 12px; } }
  .service-detail__tag {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    padding: 10px 16px;
    border: 1px solid var(--line-strong);
    margin-bottom: 24px;
    font-family: 'Oswald', sans-serif;
    font-size: 12px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--chrome-3);
  }
  .service-detail__tag::before {
    content: '';
    width: 6px; height: 6px;
    background: var(--chrome-3);
    border-radius: 50%;
  }
  .service-detail__icon { width: 64px; height: 64px; color: var(--chrome-3); margin-bottom: 28px; }
  .service-detail__body h2 { margin-bottom: 24px; }
  .service-detail__features { list-style: none; padding: 0; margin: 24px 0 32px; display: grid; gap: 14px; }
  .service-detail__features li { display: flex; gap: 14px; color: var(--ink-muted); font-size: 15px; }
  .service-detail__features li::before { content: ','; color: var(--chrome-3); flex-shrink: 0; }
  .service-detail__pricing { padding: 24px 0; margin: 24px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); display: flex; align-items: baseline; gap: 18px; }
  .service-detail__pricing dt { font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-dim); margin: 0; }
  .service-detail__pricing dd { font-family: 'Oswald', sans-serif; font-size: 32px; margin: 0; }
  .service-detail.is-reverse .service-detail__grid { grid-template-columns: 1.1fr 1fr; }
  .service-detail.is-reverse .service-detail__body { order: -1; }
  @media (max-width: 900px) {
    .service-detail__grid, .service-detail.is-reverse .service-detail__grid { grid-template-columns: 1fr; }
    .service-detail.is-reverse .service-detail__body { order: 2; }
    .service-detail.is-reverse .service-detail__img { order: 1; }
  }
`;

export default function ServicesPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: servicesStyles }} />

      <section className="pagehead">
        <div className="pagehead__bg"></div>
        <div className="container pagehead__inner reveal">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> <span className="sep">/</span> <span>Services</span>
          </div>
          <span className="eyebrow">What We Do</span>
          <h1>Our Services</h1>
          <p>
            Carbon IR, Ceramic IR, Ceramic Plus, windshield, sunroof, sun strip, tint removal, and overnight
            appointments. Premium installs done right and backed by a lifetime warranty.
          </p>
        </div>
      </section>

      <section className="service-detail" id="carbon">
        <div className="container">
          <div className="service-detail__grid">
            <div className="service-detail__img reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Oscuro%20tints/15039.webp"
                alt="Carbon Install"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="service-detail__body reveal reveal--delay-1">
              <div className="service-detail__tag">Hitek Carbon IR</div>
              <h2>Carbon Window Tinting</h2>
              <p className="muted">
                Hitek Carbon IR film. A clean, reliable tint with solid heat and glare reduction. The right choice for
                most daily drivers who want a sharp look and meaningful comfort without paying for top-shelf ceramic.
              </p>
              <ul className="service-detail__features">
                <li>Solid IR heat rejection and glare control</li>
                <li>Deep, non-fading charcoal finish</li>
                <li>99% UV protection, protects skin &amp; interior</li>
                <li>No signal or GPS interference</li>
                <li>Lifetime warranty on film and install</li>
              </ul>
              <dl className="service-detail__pricing">
                <dt>Starting At</dt>
                <dd>$290</dd>
              </dl>
              <Link href="/book" className="btn btn--primary">
                Book Carbon
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail is-reverse" id="ceramic">
        <div className="container">
          <div className="service-detail__grid">
            <div className="service-detail__body reveal">
              <div className="service-detail__tag">Hitek Ceramic IR</div>
              <h2>Ceramic Window Tinting</h2>
              <p className="muted">
                Our upgraded ceramic option. HITEK Ceramic IR delivers up to 75% infrared heat rejection for a cooler,
                more comfortable cabin with premium clarity and long-term performance. A perfect step up for drivers
                who want stronger heat rejection than carbon without going all the way to our top-tier Ceramic Plus.
              </p>
              <ul className="service-detail__features">
                <li>Up to 75% infrared heat rejection</li>
                <li>Highest clarity, minimal interior distortion</li>
                <li>99% UV protection</li>
                <li>Zero interference with phone, GPS, or radar</li>
                <li>Lifetime warranty, no bubbles, no fade</li>
              </ul>
              <dl className="service-detail__pricing">
                <dt>Starting At</dt>
                <dd>$390</dd>
              </dl>
              <Link href="/book" className="btn btn--primary">
                Book Ceramic
              </Link>
            </div>
            <div className="service-detail__img reveal reveal--delay-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Oscuro%20tints/15286.webp"
                alt="Ceramic Install"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail" id="ceramic-plus">
        <div className="container">
          <div className="service-detail__grid">
            <div className="service-detail__img reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Oscuro%20tints/IMG_8148.webp"
                alt="Ceramic Plus Install"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="service-detail__body reveal reveal--delay-1">
              <div className="service-detail__tag">Hitek Ceramic Plus</div>
              <h2>Ceramic Plus Window Tinting</h2>
              <p className="muted">
                The best we offer. HITEK Ceramic Plus delivers up to 90% infrared heat rejection for maximum comfort,
                exceptional clarity, and premium long-term performance. Designed for drivers who want the highest
                level of heat protection without compromise.
              </p>
              <ul className="service-detail__features">
                <li>Up to 90% IR heat rejection</li>
                <li>99% UV protection</li>
                <li>Premium ceramic clarity</li>
                <li>Zero signal interference</li>
                <li>Lifetime warranty coverage</li>
              </ul>
              <dl className="service-detail__pricing">
                <dt>Starting At</dt>
                <dd>$500</dd>
              </dl>
              <Link href="/book" className="btn btn--primary">
                Book Ceramic Plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail is-reverse" id="removal">
        <div className="container">
          <div className="service-detail__grid">
            <div className="service-detail__body reveal">
              <div className="service-detail__tag">Old Film &amp; Adhesive</div>
              <h2>Tint Removal</h2>
              <p className="muted">
                Safe, professional removal of old, bubbled, faded, or damaged window film, including adhesive cleanup
                for a clean surface before reinstallation. Whether you need a single window stripped or a full vehicle
                refresh, we remove old tint with care.
              </p>
              <ul className="service-detail__features">
                <li>Full film and adhesive removal</li>
                <li>Careful removal process to minimize risk to glass and rear defroster lines</li>
                <li>Single-window or full-vehicle service available</li>
                <li>Bundle with a new tint install for package pricing</li>
              </ul>
              <dl className="service-detail__pricing">
                <dt>Starting At</dt>
                <dd>$50</dd>
              </dl>
              <Link href="/contact" className="btn btn--ghost">
                Get A Quote
              </Link>
            </div>
            <div className="service-detail__img reveal reveal--delay-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Oscuro%20tints/6636.webp"
                alt="Removal Process"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail" id="windshield">
        <div className="container">
          <div className="service-detail__grid">
            <div className="service-detail__img reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Oscuro%20tints/IMG_8046.webp"
                alt="Windshield Tint"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="service-detail__body reveal reveal--delay-1">
              <div className="service-detail__tag">Windshield</div>
              <h2>Windshield Tint</h2>
              <p className="muted">
                Upgrade your comfort with premium windshield film options designed to reduce heat, glare, and UV
                exposure while maintaining excellent visibility. Ideal for keeping your cabin cooler and protecting
                your interior from sun damage.
              </p>
              <ul className="service-detail__features">
                <li>Premium heat rejection</li>
                <li>Reduced glare &amp; interior heat buildup</li>
                <li>99% UV protection</li>
                <li>Clear ceramic options available for maximum heat rejection with minimal appearance change</li>
              </ul>
              <p className="muted" style={{ fontSize: 13, marginTop: -8, marginBottom: 12 }}>
                Windshield film options may vary based on California regulations and customer-specific exemptions.
              </p>
              <p className="muted" style={{ fontSize: 13, marginBottom: 24 }}>
                Final price varies by vehicle. Some vehicles (e.g. Ram trucks) require extra prep around the rain
                sensor / NVM behind the A-pillar, while others (e.g. Honda) don&apos;t. Send your year, make, and model
                for a confirmed quote.
              </p>
              <dl className="service-detail__pricing">
                <dt>Starting At</dt>
                <dd>$140</dd>
              </dl>
              <Link href="/book" className="btn btn--primary">
                Book Windshield
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail is-reverse" id="sunroof">
        <div className="container">
          <div className="service-detail__grid">
            <div className="service-detail__body reveal">
              <div className="service-detail__tag">Sunroof</div>
              <h2>Sunroof Tinting</h2>
              <p className="muted">
                Reduce overhead heat and glare on standard sunroofs with premium ceramic protection. Ceramic only.
                Quick install and a clean factory-style finish.
              </p>
              <ul className="service-detail__features">
                <li>Major heat reduction</li>
                <li>UV protection</li>
                <li>Improved comfort in hot weather</li>
                <li>Great add-on to full vehicle tint packages</li>
              </ul>
              <dl className="service-detail__pricing">
                <dt>Starting At</dt>
                <dd>$80</dd>
              </dl>
              <Link href="/book" className="btn btn--primary">
                Book Sunroof
              </Link>
            </div>
            <div className="service-detail__img reveal reveal--delay-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Oscuro%20tints/15383.webp"
                alt="Sunroof Tint"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail" id="panoramic">
        <div className="container">
          <div className="service-detail__grid">
            <div className="service-detail__img reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Oscuro%20tints/after8.webp"
                alt="Panoramic Sunroof Tint"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="service-detail__body reveal reveal--delay-1">
              <div className="service-detail__tag">Panoramic Sunroof</div>
              <h2>Panoramic Sunroof Tinting</h2>
              <p className="muted">
                Premium ceramic protection across full panoramic glass roofs. More glass to cover than a standard
                sunroof means more film, more time, and a different price. Ceramic only.
              </p>
              <ul className="service-detail__features">
                <li>Covers the full panoramic glass roof</li>
                <li>Major heat reduction across the entire cabin</li>
                <li>UV protection</li>
                <li>Pairs perfectly with full vehicle tints</li>
              </ul>
              <dl className="service-detail__pricing">
                <dt>Starting At</dt>
                <dd>$120</dd>
              </dl>
              <Link href="/book" className="btn btn--primary">
                Book Panoramic
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail is-reverse" id="sun-strip">
        <div className="container">
          <div className="service-detail__grid">
            <div className="service-detail__body reveal">
              <div className="service-detail__tag">Sun Strip</div>
              <h2>Windshield Sun Strip</h2>
              <p className="muted">
                A clean sun strip across the top of your windshield to cut overhead glare and heat from the sun
                without affecting your forward visibility. A simple upgrade that makes a real difference on bright
                drives.
              </p>
              <ul className="service-detail__features">
                <li>Cuts overhead glare from the sun</li>
                <li>Subtle, factory-clean look</li>
                <li>Pairs well with full windshield or full vehicle tints</li>
                <li>Quick install</li>
              </ul>
              <dl className="service-detail__pricing">
                <dt>Starting At</dt>
                <dd>$50</dd>
              </dl>
              <Link href="/book" className="btn btn--primary">
                Book Sun Strip
              </Link>
            </div>
            <div className="service-detail__img reveal reveal--delay-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Oscuro%20tints/after5.webp"
                alt="Sun Strip Tint"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail" id="overnight">
        <div className="container">
          <div className="service-detail__grid">
            <div className="service-detail__img reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Oscuro%20tints/15259.webp"
                alt="Overnight Appointment"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="service-detail__body reveal reveal--delay-1">
              <div className="service-detail__tag">After Hours</div>
              <h2>Overnight Appointments</h2>
              <p className="muted">
                Can&apos;t make it during business hours? Overnight appointments are available for customers who need
                their vehicle worked on after hours. Drop off in the evening, pick up clean and tinted the next
                morning.
              </p>
              <ul className="service-detail__features">
                <li>Drop off after hours, pick up the next day</li>
                <li>Same premium HITEK film and lifetime warranty</li>
                <li>Useful for daily drivers and work trucks</li>
                <li>Availability is limited, book ahead</li>
              </ul>
              <dl className="service-detail__pricing">
                <dt>Pricing</dt>
                <dd style={{ fontSize: 22 }}>Contact Us</dd>
              </dl>
              <Link href="/contact" className="btn btn--primary">
                Contact For Availability
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-note">
        <div className="container reveal">
          <div className="quote-note__card">
            <span className="quote-note__tag">Pricing Note</span>
            <p>
              All prices shown are <strong>starting estimates</strong>. Final pricing depends on your vehicle&apos;s
              year, make, model, and the windows being tinted. Send us your vehicle details and we&apos;ll send back a
              confirmed quote.
            </p>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta__bg"></div>
        <div className="final-cta__overlay"></div>
        <div className="reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            Ready When You Are
          </span>
          <h2 style={{ marginTop: 20 }}>Book Your Install</h2>
          <p>Most appointments are available within the week. Mobile service available.</p>
          <Link href="/book" className="btn btn--primary">
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}
