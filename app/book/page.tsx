import Link from 'next/link';
import type { Metadata } from 'next';
import { BookingFlow } from '@/components/BookingFlow';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Book Window Tinting in Yuba City, CA',
  description:
    'Book a window tinting appointment with Oscuro Tintz. Pick your service, date, time, and vehicle. Mobile service available across Yuba City and Sutter County.',
  alternates: { canonical: '/book' },
};

const bookStyles = `
  .book-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: clamp(32px, 5vw, 72px); align-items: flex-start; max-width: 100%; overflow: hidden; }
  @media (max-width: 900px) { .book-grid { grid-template-columns: 1fr; } }

  /* Steps — full cards on desktop, compact horizontal bar on mobile */
  .steps { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
  .steps li { padding: 20px 24px; border: 1px solid var(--line); background: var(--bg-2); display: grid; grid-template-columns: auto 1fr; gap: 18px; align-items: center; transition: border-color .2s; }
  .steps li.is-current { border-color: var(--ink); background: var(--bg-3); }
  .steps li.is-done { opacity: 0.6; }
  .steps__n { width: 40px; height: 40px; border: 1px solid var(--line-strong); display: flex; align-items: center; justify-content: center; font-family: var(--font-oswald), sans-serif; font-size: 16px; letter-spacing: 0.1em; }
  .steps li.is-current .steps__n { border-color: var(--ink); background: var(--ink); color: #000; }
  .steps__label { font-family: var(--font-oswald), sans-serif; font-size: 16px; letter-spacing: 0.08em; text-transform: uppercase; }
  .steps__sub { font-size: 12px; color: var(--ink-muted); letter-spacing: 0.04em; margin-top: 4px; }

  @media (max-width: 900px) {
    .steps { display: flex; gap: 0; }
    .steps li {
      flex: 1;
      padding: 10px 0;
      border: none;
      border-bottom: 2px solid var(--line);
      background: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    .steps li.is-current { border-bottom-color: var(--ink); background: transparent; }
    .steps li.is-done { opacity: 0.5; }
    .steps__n { width: 28px; height: 28px; font-size: 12px; }
    .steps li.is-current .steps__n { width: 28px; height: 28px; }
    .steps__label { font-size: 10px; letter-spacing: 0.04em; text-align: center; }
    .steps__sub { display: none; }
  }

  .booking-panel { border: 1px solid var(--line); background: var(--bg-2); padding: clamp(28px, 4vw, 48px); min-height: 560px; }
  .panel-title { font-family: var(--font-oswald), sans-serif; font-size: 28px; text-transform: uppercase; margin-bottom: 10px; }
  .panel-sub { color: var(--ink-muted); margin-bottom: 32px; }

  @media (max-width: 480px) {
    .booking-panel { padding: 20px 16px; min-height: auto; border-left: none; border-right: none; overflow-x: hidden; }
    .panel-title { font-size: 22px; }
    .panel-sub { margin-bottom: 20px; font-size: 14px; }
  }

  .tile-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px; }
  @media (max-width: 600px) { .tile-grid { grid-template-columns: repeat(2, 1fr); } }
  .tile { padding: 20px 18px; border: 1px solid var(--line); background: var(--bg); cursor: pointer; transition: all .2s; text-align: left; display: grid; gap: 6px; }
  .tile:hover { border-color: var(--line-strong); }
  .tile.is-selected { border-color: var(--ink); background: var(--bg-3); }
  .tile__label { font-family: var(--font-oswald), sans-serif; font-size: 15px; text-transform: uppercase; letter-spacing: 0.04em; }
  .tile__meta { font-size: 12px; color: var(--ink-muted); }

  @media (max-width: 480px) {
    .tile { padding: 14px 12px; gap: 4px; }
    .tile__label { font-size: 13px; }
    .tile__meta { font-size: 11px; }
  }

  .cal { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-bottom: 24px; }
  .cal__day, .cal__cell { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; border: 1px solid transparent; }
  .cal__day { color: var(--ink-dim); font-size: 10px; letter-spacing: 0.2em; aspect-ratio: auto; padding: 10px 0; }
  .cal__cell { background: var(--bg); border-color: var(--line); cursor: pointer; color: var(--ink); transition: all .15s; }
  .cal__cell:hover { border-color: var(--line-strong); background: var(--bg-3); }
  .cal__cell.is-disabled { color: var(--ink-dim); cursor: not-allowed; background: transparent; border-color: transparent; }
  .cal__cell.is-selected { background: var(--ink); color: #000; border-color: var(--ink); font-weight: 700; }

  @media (max-width: 480px) {
    .cal { gap: 2px; }
    .cal__day, .cal__cell { font-size: 12px; }
  }

  .times { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  @media (max-width: 600px) { .times { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 380px) { .times { grid-template-columns: repeat(2, 1fr); } }
  .time { padding: 12px 0; text-align: center; border: 1px solid var(--line); background: var(--bg); cursor: pointer; font-size: 13px; letter-spacing: 0.1em; transition: all .2s; }
  .time:hover { border-color: var(--line-strong); }
  .time.is-selected { background: var(--ink); color: #000; border-color: var(--ink); font-weight: 700; }

  .summary { border: 1px solid var(--line); padding: 24px; background: var(--bg); margin-top: 32px; display: grid; gap: 12px; }
  .summary-row { display: flex; justify-content: space-between; font-size: 14px; gap: 12px; }
  .summary-row dt { color: var(--ink-muted); letter-spacing: 0.08em; text-transform: uppercase; font-size: 11px; flex-shrink: 0; }
  .summary-row dd { margin: 0; font-family: var(--font-oswald), sans-serif; font-size: 14px; letter-spacing: 0.04em; text-transform: uppercase; text-align: right; word-break: break-word; }

  @media (max-width: 480px) {
    .summary { padding: 16px; gap: 8px; margin-top: 20px; }
    .summary-row { font-size: 12px; }
    .summary-row dd { font-size: 12px; }
  }

  .panel-nav { display: flex; justify-content: space-between; margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--line); gap: 14px; }

  @media (max-width: 480px) {
    .panel-nav { margin-top: 20px; padding-top: 16px; }
    .panel-nav .btn { padding: 12px 16px; font-size: 12px; }
  }

  .success { text-align: center; padding: 40px 20px; }
  .success__icon { width: 80px; height: 80px; border: 1px solid var(--chrome-3); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 32px; color: var(--chrome-3); }

  @media (max-width: 480px) {
    .success { padding: 24px 12px; }
    .success__icon { width: 60px; height: 60px; font-size: 24px; margin-bottom: 16px; }
  }
`;

export default function BookPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: bookStyles }} />
      <BreadcrumbJsonLd items={[{ name: 'Book Appointment', path: '/book' }]} />

      <section className="pagehead">
        <div className="pagehead__bg"></div>
        <div className="container pagehead__inner reveal">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> <span className="sep">/</span> <span>Book</span>
          </div>
          <span className="eyebrow">Reserve Your Install</span>
          <h1>Book An Appointment</h1>
          <p>Pick your service, choose a date, enter your vehicle details, and confirm with a $30 deposit. We&apos;ll confirm by text.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <BookingFlow />
        </div>
      </section>
    </>
  );
}
