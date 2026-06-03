import Link from 'next/link';
import type { Metadata } from 'next';
import { EMAIL, PHONE, PHONE_TEL } from '@/lib/siteMeta';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Booking terms, deposit and cancellation policy, and lifetime warranty terms for Oscuro Tintz window tinting in Yuba City, CA.',
  alternates: { canonical: '/terms' },
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

export default function TermsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: legalStyles }} />

      <section className="pagehead">
        <div className="pagehead__bg"></div>
        <div className="container pagehead__inner reveal">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> <span className="sep">/</span> <span>Terms</span>
          </div>
          <span className="eyebrow">Legal</span>
          <h1>Terms of Service</h1>
          <p>Effective date: June 3, 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal">
          <h2>Booking &amp; Deposit</h2>
          <p>
            Online bookings require a <strong>$30 deposit</strong>, charged when you confirm your appointment. The
            deposit is applied in full toward your final invoice — it is not an extra fee.
          </p>

          <h2>Rescheduling &amp; Cancellation</h2>
          <ul>
            <li>
              <strong>24+ hours notice:</strong> reschedule or cancel free of charge — your deposit transfers to the
              new appointment or is refunded in full.
            </li>
            <li>
              <strong>Less than 24 hours notice or no-show:</strong> the deposit is forfeited to cover the reserved
              time slot.
            </li>
            <li>
              To reschedule or cancel, call or text <a href={`tel:${PHONE_TEL}`}>{PHONE}</a> or email{' '}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </li>
          </ul>

          <h2>Pricing</h2>
          <p>
            Prices shown on this site are starting estimates. Final pricing depends on your vehicle&apos;s year, make,
            model, glass configuration, and any existing film that needs removal. We confirm your exact price before
            work begins — no surprise charges.
          </p>

          <h2>Lifetime Warranty</h2>
          <p>
            Qualifying installs are covered against bubbling, peeling, fading, and manufacturer defects for as long as
            you own the vehicle. The warranty covers the film and our installation; it does not cover damage from
            accidents, vandalism, glass breakage, improper aftercare during the cure period, or film removal by another
            party. Keep your booking confirmation as proof of install.
          </p>

          <h2>California Tint Law Compliance</h2>
          <p>
            We install tint in compliance with California Vehicle Code 26708 and will advise you on legal limits for
            your vehicle. If you request darkness levels beyond the legal limit for front windows, you accept
            responsibility for any citations. See our{' '}
            <Link href="/california-window-tint-laws">California tint law guide</Link>.
          </p>

          <h2>Vehicle Care</h2>
          <p>
            We treat every vehicle as if it were our own. Please remove valuables before your appointment and let us
            know about any pre-existing glass damage (chips, cracks, aftermarket defroster issues) — tint installation
            can stress already-damaged glass.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call{' '}
            <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
