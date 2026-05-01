import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reviews',
  description:
    'Real customer reviews of Oscuro Tintz, premium window tinting in Yuba City, CA. 5.0 rating across Google reviews.',
  alternates: { canonical: '/reviews' },
};

const reviewStyles = `
  .review-summary { display: grid; grid-template-columns: auto 1fr auto; gap: 48px; align-items: center; padding: 40px; border: 1px solid var(--line); margin-bottom: 64px; background: var(--bg-2); }
  .review-summary__score { font-family: 'Oswald', sans-serif; font-size: 96px; line-height: 1; }
  .review-summary__stars { color: #fff; font-size: 22px; letter-spacing: 3px; margin-bottom: 6px; }
  .review-summary__count { font-size: 13px; color: var(--ink-muted); letter-spacing: 0.14em; text-transform: uppercase; }
  .review-summary__cta { align-self: center; }
  @media (max-width: 760px) { .review-summary { grid-template-columns: 1fr; text-align: center; gap: 20px; padding: 32px 24px; } }
  .reviews-all { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
  @media (max-width: 800px) { .reviews-all { grid-template-columns: 1fr; } }
`;

const REVIEWS = [
  { init: 'JM', name: 'Jake M.', text: '"Clean install, no bubbles, and the ceramic tint is a night-and-day difference on hot days. Already booked my wife’s car."' },
  { init: 'RC', name: 'Ricardo C.', text: '"Best tint shop in Yuba City, hands down. Fair pricing, clean work, and he actually cares about getting it right. Highly recommend."' },
  { init: 'TP', name: 'Tyler P.', text: '"Mobile service was clutch. Came to my house, knocked it out in a few hours, and my truck looks incredible. Professional from start to finish."' },
  { init: 'AS', name: 'Alyssa S.', text: '"Honest guy, honest price. Took his time and the finish is factory-quality. Zero complaints, will send my family his way."' },
  { init: 'DN', name: 'Devon N.', text: '"Ceramic tint on my Model 3 looks unreal. Way cooler inside and the deep black matches the car perfectly. Worth every dollar."' },
  { init: 'MV', name: 'Marcos V.', text: '"I’ve had tint done at bigger shops and always had issues. This is the first install I’ve had that came out perfect. Stop looking and book him."' },
  { init: 'KH', name: 'Kayla H.', text: '"Got the full windshield done ceramic 70%, can’t believe how much cooler the cabin is. Wish I’d done it sooner."' },
  { init: 'BG', name: 'Brian G.', text: '"Did my truck and my daughter’s car the same week. Both look amazing. You can tell he cares about the details."' },
];

export default function ReviewsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: reviewStyles }} />

      <section className="pagehead">
        <div className="pagehead__bg"></div>
        <div className="container pagehead__inner reveal">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> <span className="sep">/</span> <span>Reviews</span>
          </div>
          <span className="eyebrow">Customer Reviews</span>
          <h1>
            What People Are
            <br />
            Saying
          </h1>
          <p>
            Every review below came from a real customer. Read the full set on Google, or leave yours after your
            install.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="review-summary reveal">
            <div className="review-summary__score chrome-text">5.0</div>
            <div>
              <div className="review-summary__stars">★★★★★</div>
              <div className="review-summary__count">Based on 87 Google reviews</div>
            </div>
            <a href="#" className="btn btn--ghost review-summary__cta">
              View on Google
            </a>
          </div>

          <div className="reviews-all">
            {REVIEWS.map((r, i) => (
              <article key={i} className={`review reveal${i % 2 === 1 ? ' reveal--delay-1' : ''}`}>
                <div className="review__stars">★★★★★</div>
                <p className="review__text">{r.text}</p>
                <div className="review__author">
                  <div className="review__avatar">{r.init}</div>
                  <div>
                    <div className="review__name">{r.name}</div>
                    <div className="review__meta">Google · Verified</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta__bg"></div>
        <div className="final-cta__overlay"></div>
        <div className="reveal">
          <h2>Your Turn.</h2>
          <p>Join 500+ satisfied customers across Yuba City and Sutter County.</p>
          <Link href="/book" className="btn btn--primary">
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}
