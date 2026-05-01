import Link from 'next/link';
import type { Metadata } from 'next';
import { SociableKitGoogleReviews } from '@/components/SociableKitGoogleReviews';

export const metadata: Metadata = {
  title: 'Reviews',
  description:
    'Real customer reviews of Oscuro Tintz, premium window tinting in Yuba City, CA. 5.0 rating across Google reviews.',
  alternates: { canonical: '/reviews' },
};

export default function ReviewsPage() {
  return (
    <>
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
          <SociableKitGoogleReviews embedId="25677661" />
        </div>
      </section>
    </>
  );
}
