import Link from 'next/link';
import type { Metadata } from 'next';
import { EMAIL, PHONE, PHONE_TEL } from '@/lib/siteMeta';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Oscuro Tintz collects, uses, and protects your personal information when you book window tinting services or contact us.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

const legalStyles = `
  .legal { max-width: 760px; }
  .legal h2 { font-size: clamp(22px, 3vw, 30px); margin: 48px 0 16px; }
  .legal p, .legal li { color: var(--ink-muted); font-size: 16px; line-height: 1.8; margin-bottom: 16px; }
  .legal ul { padding-left: 22px; margin-bottom: 16px; }
  .legal li { margin-bottom: 8px; }
  .legal a { color: var(--ink); text-decoration: underline; }
`;

export default function PrivacyPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: legalStyles }} />

      <section className="pagehead">
        <div className="pagehead__bg"></div>
        <div className="container pagehead__inner reveal">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> <span className="sep">/</span> <span>Privacy</span>
          </div>
          <span className="eyebrow">Legal</span>
          <h1>Privacy Policy</h1>
          <p>Effective date: June 3, 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal">
          <p>
            Oscuro Tintz (&quot;we,&quot; &quot;us&quot;) is a window tinting business in Yuba City, California. This
            policy explains what personal information we collect through this website, how we use it, and the choices
            you have. We keep it simple because our data practices are simple: we collect only what we need to schedule
            and perform your service.
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>
              <strong>Booking details</strong> — when you book an appointment we collect your name, phone number, email
              address, vehicle information (year, make, model), your selected service, date and time, and service
              location if you choose mobile service.
            </li>
            <li>
              <strong>Payment information</strong> — the $30 booking deposit is processed by Square, Inc. Your card
              number is sent directly to Square and tokenized; it never touches or gets stored on our servers. See{' '}
              <a href="https://squareup.com/us/en/legal/general/privacy" target="_blank" rel="noopener noreferrer">
                Square&apos;s Privacy Notice
              </a>
              .
            </li>
            <li>
              <strong>Contact form submissions</strong> — your name, contact details, and the message you send us.
            </li>
          </ul>

          <h2>How We Use It</h2>
          <ul>
            <li>Scheduling, confirming, and performing your appointment.</li>
            <li>Sending booking confirmations and responding to your inquiries.</li>
            <li>Collecting and applying your deposit toward your final invoice.</li>
          </ul>
          <p>
            We do <strong>not</strong> sell or share your personal information for advertising, and we do not send
            marketing emails.
          </p>

          <h2>Third-Party Services</h2>
          <p>Parts of this site are provided by third parties that may receive your IP address when they load:</p>
          <ul>
            <li>
              <strong>Square</strong> — payment processing for booking deposits.
            </li>
            <li>
              <strong>SociableKit</strong> — displays our live Google reviews on the reviews page.
            </li>
            <li>
              <strong>Map tiles (OpenStreetMap / CARTO)</strong> — renders the service-area map on the contact page.
            </li>
          </ul>

          <h2>Your California Privacy Rights (CCPA)</h2>
          <p>
            If you are a California resident, you have the right to know what personal information we have about you,
            request that we delete it, and opt out of any sale of personal information (we do not sell personal
            information). To exercise any of these rights, email{' '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call{' '}
            <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>. We will not discriminate against you for exercising your rights.
          </p>

          <h2>Data Retention</h2>
          <p>
            We keep booking and contact records only as long as needed for scheduling, warranty service, and basic
            business record-keeping, then delete them.
          </p>

          <h2>Changes &amp; Contact</h2>
          <p>
            If we change this policy, we will update the effective date above. Questions? Email{' '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
