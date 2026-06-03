import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { PHONE, PHONE_TEL } from '@/lib/siteMeta';

export const metadata: Metadata = {
  title: 'California Window Tint Laws (CVC 26708) — 2026 Guide',
  description:
    'What window tint is legal in California? Front windows need 70%+ VLT, rear windows can be any darkness. CVC 26708 limits, windshield rules, medical exemptions, and penalties explained by a Yuba City tint shop.',
  alternates: { canonical: '/california-window-tint-laws' },
};

const guideStyles = `
  .guide { max-width: 800px; }
  .guide h2 { font-size: clamp(24px, 3.2vw, 34px); margin: 56px 0 18px; }
  .guide h3 { font-size: clamp(18px, 2.4vw, 22px); margin: 32px 0 12px; }
  .guide p, .guide li { color: var(--ink-muted); font-size: 16px; line-height: 1.8; margin-bottom: 16px; }
  .guide ul { padding-left: 22px; margin-bottom: 16px; }
  .guide li { margin-bottom: 8px; }
  .guide a { color: var(--ink); text-decoration: underline; }
  .guide table { width: 100%; border-collapse: collapse; margin: 24px 0 32px; font-size: 15px; }
  .guide th, .guide td { border: 1px solid var(--line); padding: 12px 14px; text-align: left; color: var(--ink-muted); }
  .guide th { color: var(--ink); font-family: var(--font-oswald), sans-serif; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; }
  .guide .note { border: 1px solid var(--line); background: rgba(255,255,255,0.02); padding: 20px 24px; margin: 24px 0; }
  .guide .note p { margin: 0; font-size: 14px; }
`;

export default function TintLawsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: guideStyles }} />
      <BreadcrumbJsonLd items={[{ name: 'California Window Tint Laws', path: '/california-window-tint-laws' }]} />

      <section className="pagehead">
        <div className="pagehead__bg"></div>
        <div className="container pagehead__inner reveal">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> <span className="sep">/</span> <span>California Tint Laws</span>
          </div>
          <span className="eyebrow">Know Before You Tint</span>
          <h1>
            California Window
            <br />
            Tint Laws
          </h1>
          <p>
            Everything California Vehicle Code 26708 actually says about window tint — explained in plain English by a
            shop that installs legal tint every day in Yuba City.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container guide">
          <p>
            California regulates window tint under{' '}
            <a
              href="https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=VEH&sectionNum=26708."
              target="_blank"
              rel="noopener noreferrer"
            >
              Vehicle Code Section 26708
            </a>
            . The rules come down to one principle: the windows a driver looks through to see traffic — the windshield
            and the front side windows — must stay clear enough to see through. Everything behind the driver can be as
            dark as you want. Here is exactly what that means for each window on your vehicle.
          </p>

          <h2>Legal Tint Limits By Window</h2>
          <table>
            <thead>
              <tr>
                <th>Window</th>
                <th>Legal Limit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Windshield</td>
                <td>Non-reflective tint allowed only above the AS-1 line (roughly the top 4–5 inches)</td>
              </tr>
              <tr>
                <td>Front side windows (driver &amp; passenger)</td>
                <td>Must allow more than 70% of light through (70%+ VLT)</td>
              </tr>
              <tr>
                <td>Rear side windows</td>
                <td>Any darkness</td>
              </tr>
              <tr>
                <td>Back windshield</td>
                <td>Any darkness — but you must have working side mirrors on both sides</td>
              </tr>
            </tbody>
          </table>

          <h2>What Is VLT?</h2>
          <p>
            VLT stands for <strong>Visible Light Transmission</strong> — the percentage of visible light that passes
            through the glass and film combined. A lower number means darker tint: 5% VLT is &quot;limo dark,&quot;
            while 70% VLT looks nearly clear. California&apos;s 70% rule for front side windows is measured on the
            <em> combination</em> of the film and the factory glass. Since factory glass already blocks some light,
            aftermarket film applied to front windows generally needs to be very light (the industry standard is film
            rated at 88% VLT or higher) to keep the combined transmission above 70%.
          </p>

          <h2>The Windshield AS-1 Line Rule</h2>
          <p>
            Look at the top corner of your windshield and you&apos;ll find a small &quot;AS-1&quot; marking etched into
            the glass. California allows a strip of <strong>non-reflective</strong> tint above that line — this is the
            &quot;sun strip&quot; or visor strip we install. Tint anywhere below the AS-1 line on the windshield is not
            legal, with the exception of clear UV-blocking films that meet specific transparency requirements.{' '}
            <Link href="/services#sun-strip">See our sun strip service</Link>.
          </p>

          <h2>Color and Reflectivity Rules</h2>
          <ul>
            <li>
              <strong>No red, amber, or blue tint.</strong> Those colors are reserved for emergency vehicles and are
              prohibited on passenger car windows.
            </li>
            <li>
              <strong>No mirror tint.</strong> Film cannot be more reflective than a standard window. Highly metallic
              or mirrored films are illegal in California regardless of darkness.
            </li>
          </ul>

          <h2>The Dual Mirror Requirement</h2>
          <p>
            If your back windshield is tinted dark enough to block the view through the rear-view mirror, California
            requires functioning side mirrors on <strong>both</strong> sides of the vehicle. Most modern vehicles
            already have both mirrors, so this is rarely an issue — but if a side mirror is broken or missing, fix it
            before tinting the rear glass.
          </p>

          <h2>Medical Exemptions</h2>
          <p>
            CVC 26708 includes an exemption for drivers with medical conditions that require protection from sunlight,
            such as lupus, photosensitivity, or melanoma risk. With a signed letter or prescription from a licensed
            physician, surgeon, dermatologist, or optometrist, you may use removable sun screens or specific tint
            arrangements on windows that would otherwise need to stay clear. Keep the documentation in the vehicle —
            you&apos;ll need to show it if you&apos;re stopped. If you think you qualify, bring your documentation and
            we&apos;ll walk you through compliant options.
          </p>

          <h2>What Happens If Your Tint Is Illegal?</h2>
          <p>
            Illegal front-window tint is usually enforced as a <strong>&quot;fix-it ticket&quot;</strong> (a
            correctable violation): you remove the film, get the correction signed off, and pay a small dismissal fee.
            Repeat offenses or ignoring the correction can escalate to a base fine plus court fees. Beyond tickets,
            illegal tint can complicate insurance claims after an accident. Removal also isn&apos;t free — if you ever
            need old film stripped, see our <Link href="/services#removal">tint removal service</Link>.
          </p>

          <h2>How We Keep Your Tint Legal (Without Giving Up Heat Rejection)</h2>
          <p>
            Dark tint isn&apos;t the only way to beat the Yuba City heat. Our{' '}
            <Link href="/services#ceramic">HITEK Ceramic IR</Link> and{' '}
            <Link href="/services#ceramic-plus">Ceramic Plus</Link> films reject up to 75–90% of infrared heat and 99%
            of UV even in light, street-legal shades — the heat rejection comes from the ceramic technology, not the
            darkness. A common legal setup we install: a light ceramic film on the front windows for heat rejection,
            any shade you like behind the driver, and a sun strip on the windshield.
          </p>

          <div className="note">
            <p>
              <strong>Disclaimer:</strong> This guide is provided for general information by Oscuro Tintz and is not
              legal advice. Vehicle Code enforcement can vary; always verify current law at{' '}
              <a
                href="https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=VEH&sectionNum=26708."
                target="_blank"
                rel="noopener noreferrer"
              >
                leginfo.legislature.ca.gov
              </a>{' '}
              or with the CHP. Last reviewed: June 2026.
            </p>
          </div>

          <h2>Questions About Your Vehicle?</h2>
          <p>
            We install California-legal tint every day and will tell you straight what&apos;s legal for your specific
            vehicle — no guesswork, no risk. Call or text{' '}
            <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>, or <Link href="/book">book your install online</Link>.
          </p>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta__bg"></div>
        <div className="final-cta__overlay"></div>
        <div className="reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            Legal Tint, Serious Heat Rejection
          </span>
          <h2 style={{ marginTop: 20 }}>Ready To Book?</h2>
          <p>We&apos;ll set you up with a street-legal install that still beats the Valley heat.</p>
          <Link href="/book" className="btn btn--primary">
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}
