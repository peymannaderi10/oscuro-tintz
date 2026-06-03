import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { HomeReviews } from '@/components/HomeReviews';
import { SociableKitGoogleReviews } from '@/components/SociableKitGoogleReviews';
import { GOOGLE_REVIEW_URL, REVIEW_COUNT, REVIEW_RATING } from '@/lib/siteMeta';

export const metadata: Metadata = {
  title: 'Customer Reviews — 5-Star Window Tinting in Yuba City, CA',
  description: `Real customer reviews of Oscuro Tintz, premium window tinting in Yuba City, CA. ${REVIEW_RATING} rating across ${REVIEW_COUNT} Google reviews.`,
  alternates: { canonical: '/reviews' },
};

export default function ReviewsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Reviews', path: '/reviews' }]} />

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
            A {REVIEW_RATING} rating across {REVIEW_COUNT} Google reviews. Every review below came from a real
            customer in the Yuba City and Marysville area.
          </p>
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ marginTop: 24 }}>
            Leave A Google Review
          </a>
        </div>
      </section>

      {/* Static, crawlable review set — the live widget below is progressive enhancement. */}
      <section className="section">
        <HomeReviews />
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Live From Google</span>
            <h2>Latest Reviews</h2>
          </div>
          <SociableKitGoogleReviews embedId="25677661" />
        </div>
      </section>
    </>
  );
}
