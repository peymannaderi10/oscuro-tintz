import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'A one-person window-tint shop in Yuba City, CA, built on word of mouth, premium Hitek film, and clean installs backed by a lifetime warranty.',
  alternates: { canonical: '/about' },
};

const aboutStyles = `
  .about-story { display: grid; grid-template-columns: 5fr 7fr; gap: clamp(32px, 6vw, 88px); align-items: flex-start; }
  .about-story__img { aspect-ratio: 3/4; border: 1px solid var(--line); position: relative; overflow: hidden; position: sticky; top: calc(var(--header-h) + 40px); }
  .about-story__body p { color: var(--ink-muted); font-size: 17px; line-height: 1.8; margin-bottom: 24px; }
  .about-story__body p:first-of-type::first-letter {
    font-family: 'Oswald', sans-serif;
    font-size: 72px;
    font-weight: 700;
    float: left;
    line-height: 0.9;
    margin: 6px 16px 0 0;
    color: var(--chrome-3);
  }
  .values { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); margin-top: 72px; }
  .values__item { padding: clamp(32px, 4vw, 56px) clamp(20px, 2vw, 32px); border-right: 1px solid var(--line); }
  .values__item:last-child { border-right: none; }
  .values__num { font-family: 'Oswald', sans-serif; font-size: 14px; letter-spacing: 0.32em; color: var(--ink-dim); margin-bottom: 24px; }
  .values__label { font-family: 'Oswald', sans-serif; font-size: 22px; text-transform: uppercase; margin-bottom: 10px; }
  .values__desc { color: var(--ink-muted); font-size: 14px; line-height: 1.6; }
  @media (max-width: 900px) {
    .about-story { grid-template-columns: 1fr; }
    .about-story__img { position: static; aspect-ratio: 16/10; }
    .values { grid-template-columns: repeat(2, 1fr); }
    .values__item:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
    .values__item:nth-child(2) { border-right: none; }
  }
  @media (max-width: 520px) {
    .values { grid-template-columns: 1fr; }
    .values__item { border-right: none; border-bottom: 1px solid var(--line); }
    .values__item:last-child { border-bottom: none; }
  }
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin: 72px 0 0; padding-top: 72px; border-top: 1px solid var(--line); }
  .stat { text-align: center; }
  .stat__num { font-family: 'Oswald', sans-serif; font-size: clamp(56px, 7vw, 96px); line-height: 1; margin-bottom: 12px; }
  .stat__label { font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-muted); }
  @media (max-width: 700px) { .stats { grid-template-columns: 1fr; } }
`;

export default function AboutPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: aboutStyles }} />

      <section className="pagehead">
        <div className="pagehead__bg"></div>
        <div className="container pagehead__inner reveal">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> <span className="sep">/</span> <span>About</span>
          </div>
          <span className="eyebrow">About Oscuro Tintz</span>
          <h1>
            The Hands
            <br />
            Behind The Tint
          </h1>
          <p>A one-person shop turned word-of-mouth business, built around clean installs and honest pricing.</p>
        </div>
      </section>

      <section className="section">
        <div className="container about-story">
          <div className="about-story__img reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Oscuro%20tints/cuttingfilm.webp"
              alt="Owner Portrait"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
            />
          </div>
          <div className="about-story__body reveal reveal--delay-1">
            <span className="eyebrow">The Story</span>
            <h2 style={{ margin: '20px 0 32px' }}>
              A Passion Turned
              <br />
              Into A Profession
            </h2>
            <p>
              I got into window tinting because I wanted my own car tinted but couldn&apos;t afford to pay someone else.
              So I bought a couple rolls and figured it out. It wasn&apos;t pretty at first, but I kept coming back and
              kept improving. Eventually I decided to take it seriously and put real time into learning the craft.
            </p>
            <p>
              Now Oscuro Tintz is built on clean, high-quality installs using premium Hitek film, with attention to
              detail on every job. What started as a hobby on my own vehicles became a business built on word of mouth
              and results that speak for themselves.
            </p>
            <p>
              Every job gets the same treatment, whether it&apos;s a daily driver, a weekend build, or a family SUV. No
              shortcuts, no rushed edges, no leaving a job until it&apos;s right.
            </p>

            <div className="stats">
              <div className="stat">
                <div className="stat__num chrome-text">500+</div>
                <div className="stat__label">Vehicles Tinted</div>
              </div>
              <div className="stat">
                <div className="stat__num chrome-text">5.0</div>
                <div className="stat__label">Google Rating</div>
              </div>
              <div className="stat">
                <div className="stat__num chrome-text">∞</div>
                <div className="stat__label">Lifetime Warranty</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">The Values</span>
            <h2>The Oscuro Standard</h2>
          </div>
        </div>
        <div className="values">
          <div className="values__item reveal">
            <div className="values__num">01</div>
            <div className="values__label">Craft</div>
            <p className="values__desc">
              Clean cuts, tight edges, and installs done with patience and precision. The details are what separate a
              clean job from a rushed one.
            </p>
          </div>
          <div className="values__item reveal reveal--delay-1">
            <div className="values__num">02</div>
            <div className="values__label">Honesty</div>
            <p className="values__desc">
              Straight answers on film options, pricing, and what actually makes sense for your vehicle—no pressure, no
              upsell games.
            </p>
          </div>
          <div className="values__item reveal reveal--delay-2">
            <div className="values__num">03</div>
            <div className="values__label">Quality</div>
            <p className="values__desc">
              We use premium HITEK film and proven install methods for long-term performance, clean looks, and reliable
              results.
            </p>
          </div>
          <div className="values__item reveal reveal--delay-3">
            <div className="values__num">04</div>
            <div className="values__label">Service</div>
            <p className="values__desc">
              Clear communication, respect for your time, and work we stand behind long after the install is done.
            </p>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta__bg"></div>
        <div className="final-cta__overlay"></div>
        <div className="reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            Let&apos;s Work
          </span>
          <h2 style={{ marginTop: 20 }}>Ready To Book?</h2>
          <p>Come see the difference a clean install makes.</p>
          <Link href="/book" className="btn btn--primary">
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}
