import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { PHONE, PHONE_TEL } from '@/lib/siteMeta';

export const metadata: Metadata = {
  title: 'Mobile Window Tinting in Yuba City, CA — We Come To You',
  description:
    'Mobile window tinting across Yuba City, Marysville, Olivehurst, Live Oak, Plumas Lake, and Sutter County. Same HITEK film, same lifetime warranty, installed at your home or office.',
  alternates: { canonical: '/mobile-window-tinting-yuba-city' },
};

const mobileStyles = `
  .mguide { max-width: 800px; }
  .mguide h2 { font-size: clamp(24px, 3.2vw, 34px); margin: 56px 0 18px; }
  .mguide p, .mguide li { color: var(--ink-muted); font-size: 16px; line-height: 1.8; margin-bottom: 16px; }
  .mguide ul, .mguide ol { padding-left: 22px; margin-bottom: 16px; }
  .mguide li { margin-bottom: 8px; }
  .mguide a { color: var(--ink); text-decoration: underline; }
  .mguide .cities { display: flex; flex-wrap: wrap; gap: 10px; margin: 8px 0 24px; }
  .mguide .cities span {
    border: 1px solid var(--line-strong); padding: 8px 16px;
    font-family: var(--font-oswald), sans-serif; font-size: 12px;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--chrome-3);
  }
`;

export default function MobileTintingPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: mobileStyles }} />
      <BreadcrumbJsonLd items={[{ name: 'Mobile Window Tinting', path: '/mobile-window-tinting-yuba-city' }]} />

      <section className="pagehead">
        <div className="pagehead__bg"></div>
        <div className="container pagehead__inner reveal">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> <span className="sep">/</span> <span>Mobile Tinting</span>
          </div>
          <span className="eyebrow">We Come To You</span>
          <h1>
            Mobile Window Tinting
            <br />
            Yuba City, CA
          </h1>
          <p>
            Can&apos;t make it to the shop? We bring the full install to your driveway or workplace — same premium
            HITEK film, same precision, same lifetime warranty.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container mguide">
          <h2>Service Area</h2>
          <p>Mobile installs are available throughout the Yuba-Sutter area, including:</p>
          <div className="cities">
            <span>Yuba City</span>
            <span>Marysville</span>
            <span>Olivehurst</span>
            <span>Live Oak</span>
            <span>Plumas Lake</span>
            <span>Gridley</span>
            <span>Sutter County</span>
          </div>
          <p>
            Outside this area? <Link href="/contact">Contact us</Link> for availability and custom travel pricing — we
            regularly take jobs farther out when the schedule allows.
          </p>

          <h2>How Mobile Tinting Works</h2>
          <ol>
            <li>
              <strong>Book your slot</strong> — <Link href="/book">book online</Link> and choose &quot;mobile&quot; as
              your location, or call/text <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>.
            </li>
            <li>
              <strong>Prep a workspace</strong> — we need a clean, shaded spot out of direct wind and dust: a garage,
              carport, or shaded driveway all work. Film needs a controlled surface to cure cleanly.
            </li>
            <li>
              <strong>We install on-site</strong> — precision-cut patterns, the same process as an in-shop job. Most
              full vehicles take 2–4 hours.
            </li>
            <li>
              <strong>Aftercare</strong> — keep the windows up for 3–5 days while the film cures, then enjoy it. Every
              qualifying install carries the same <Link href="/services">lifetime warranty</Link> as shop work.
            </li>
          </ol>

          <h2>Same Films, Same Pricing</h2>
          <p>
            Mobile jobs use the exact same <Link href="/services#carbon">HITEK Carbon IR</Link> (from $290),{' '}
            <Link href="/services#ceramic">Ceramic IR</Link> (from $390), and{' '}
            <Link href="/services#ceramic-plus">Ceramic Plus</Link> (from $500) films as our Yuba City shop, with up to
            99% UV protection and up to 90% infrared heat rejection. Within our core service area there&apos;s no
            mobile surcharge — travel pricing only applies for longer trips, and we&apos;ll confirm it before you book.
          </p>

          <h2>Who Mobile Service Is Perfect For</h2>
          <ul>
            <li>Busy schedules — get tinted while you work from home or at the office.</li>
            <li>Families with one vehicle — no need to arrange a ride back from the shop.</li>
            <li>Fleet and multi-car jobs — we can tint several vehicles in one visit.</li>
            <li>New cars — protect the interior before the first Valley summer hits it.</li>
          </ul>

          <h2>Is Mobile Tint As Good As In-Shop?</h2>
          <p>
            Yes — when the workspace is right. The film, the cutting precision, and the installer are identical. The
            only thing that changes is the location, which is why we ask for a shaded, low-dust spot. If your space
            won&apos;t produce a result we&apos;d put our name on, we&apos;ll tell you up front and get you scheduled
            at the shop instead. Check the <Link href="/gallery">before &amp; after gallery</Link> — many of those
            installs were mobile jobs.
          </p>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta__bg"></div>
        <div className="final-cta__overlay"></div>
        <div className="reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            Driveway. Office. Anywhere.
          </span>
          <h2 style={{ marginTop: 20 }}>Book A Mobile Install</h2>
          <p>Pick a date and we&apos;ll bring the shop to you — anywhere in the Yuba-Sutter area.</p>
          <Link href="/book" className="btn btn--primary">
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}
