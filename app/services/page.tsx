import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Carbon tint, Ceramic tint, and tint removal, premium window tinting services in Yuba City, CA.',
  alternates: { canonical: '/services' },
};

const servicesStyles = `
  .service-detail { padding: clamp(72px, 10vw, 120px) 0; }
  .service-detail:last-of-type { border-bottom: none; }
  .service-detail__grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(32px, 6vw, 88px); align-items: center; }
  .service-detail__img { aspect-ratio: 4/3; position: relative; overflow: hidden; border: 1px solid var(--line); }
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
    .service-detail.is-reverse .service-detail__body { order: 0; }
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
          <p>Premium window tint installations and removals. Done right, backed by a lifetime warranty, priced honestly.</p>
        </div>
      </section>

      <section className="service-detail" id="carbon">
        <div className="container">
          <div className="service-detail__grid">
            <div className="service-detail__img reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1400&fm=webp"
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
                Our premium option. Hitek Ceramic IR rejects up to 75% of infrared heat for a noticeably cooler, more
                comfortable cabin. The clearest, deepest look we offer, and the best long-term investment.
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
                src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1400&fm=webp"
                alt="Ceramic Install"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail" id="removal">
        <div className="container">
          <div className="service-detail__grid">
            <div className="service-detail__img reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/13065692/pexels-photo-13065692.jpeg?auto=compress&cs=tinysrgb&w=1400&fm=webp"
                alt="Removal Process"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="service-detail__body reveal reveal--delay-1">
              <div className="service-detail__tag">Old Film &amp; Adhesive</div>
              <h2>Tint Removal</h2>
              <p className="muted">
                Safe, careful removal of old, bubbled, or damaged film, including the adhesive residue most shops skip.
                We prep the glass correctly so your new tint goes on clean.
              </p>
              <ul className="service-detail__features">
                <li>Full film &amp; adhesive removal</li>
                <li>No scratched glass, no damaged defrost lines</li>
                <li>Per-window pricing available</li>
                <li>Bundle with a new install for a package rate</li>
              </ul>
              <dl className="service-detail__pricing">
                <dt>Starting At</dt>
                <dd>$50</dd>
              </dl>
              <Link href="/contact" className="btn btn--ghost">
                Get A Quote
              </Link>
            </div>
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
